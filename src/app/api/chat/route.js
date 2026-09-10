import { NextResponse } from 'next/server';
import { queryGemma, buildSystemPrompt } from '@/lib/huggingface';
import { searchWeb, needsWebSearch } from '@/lib/tavily';
import { places } from '@/lib/placesData';

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // สร้าง context จากประวัติการสนทนา (เฉพาะ 5 ข้อความล่าสุด)
    const recentHistory = history.slice(-5);
    let context = '';
    if (recentHistory.length > 0) {
      context = recentHistory
        .map((m) => `${m.role === 'user' ? 'ผู้ใช้' : 'ผู้ช่วย'}: ${m.content}`)
        .join('\n');
    }

    // ระบบ prompt
    const systemPrompt = buildSystemPrompt();

    // ตรวจสอบว่าต้องใช้ Web Search หรือไม่
    let searchResult = '';
    if (needsWebSearch(message)) {
      try {
        searchResult = await searchWeb(message + ' สมุทรปราการ');
      } catch (e) {
        console.warn('Web search failed, continuing without it:', e.message);
      }
    }

    // สร้าง prompt เต็มรูปแบบ
    let fullPrompt = `${systemPrompt}\n\n`;
    if (context) {
      fullPrompt += `ประวัติการสนทนา:\n${context}\n\n`;
    }
    if (searchResult) {
      fullPrompt += `ข้อมูลเพิ่มเติมจากการค้นหาเว็บ:\n${searchResult}\n\n`;
    }
    fullPrompt += `ผู้ใช้: ${message}\n\nผู้ช่วย:`;

    // เรียก Gemma
    const response = await queryGemma(fullPrompt, {
      max_new_tokens: 512,
      temperature: 0.7,
      top_p: 0.95,
    });

    // ตัดส่วน prompt ที่ซ้ำออก (ถ้าตอบกลับมาทั้งหมด)
    let cleanResponse = response;
    if (cleanResponse.includes('ผู้ช่วย:')) {
      const parts = cleanResponse.split('ผู้ช่วย:');
      cleanResponse = parts[parts.length - 1].trim();
    }
    // ถ้ายังมีข้อความซ้ำซ้อนให้ตัดเพิ่ม
    if (cleanResponse.startsWith('ผู้ใช้:')) {
      const parts2 = cleanResponse.split('ผู้ใช้:');
      cleanResponse = parts2[0].trim();
    }

    return NextResponse.json({ response: cleanResponse || 'ขออภัย ฉันไม่สามารถตอบคำถามนี้ได้ในขณะนี้' });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
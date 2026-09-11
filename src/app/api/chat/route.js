import { NextResponse } from 'next/server';
import { queryModel, buildSystemPrompt } from '@/lib/huggingface';
import { searchWeb, needsWebSearch } from '@/lib/tavily';
import { places, searchPlaces } from '@/lib/placesData';

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // ประวัติการสนทนา (เก็บสั้นลงเหลือ 3 ข้อความล่าสุด เพื่อลดโอกาสที่โมเดลขนาดเล็กจะสับสน
    // และไปติดอยู่กับหัวข้อเก่าแทนที่จะตอบคำถามปัจจุบัน)
    const recentHistory = history.slice(-3);
    let context = '';
    if (recentHistory.length > 0) {
      context = recentHistory
        .map((m) => `${m.role === 'user' ? 'ผู้ใช้' : 'ผู้ช่วย'}: ${m.content}`)
        .join('\n');
    }

    const systemPrompt = buildSystemPrompt();

    // ค้นหาสถานที่ที่เกี่ยวข้องกับ "ข้อความปัจจุบัน" โดยตรง (ไม่ใช่ทั้งบทสนทนา)
    // เพื่อฉีดข้อมูลที่ถูกต้องแม่นยำเข้าไปเฉพาะรอบนี้ ลดการเดาของโมเดล
    const matchedPlaces = searchPlaces(message).slice(0, 2);
    let placeContext = '';
    if (matchedPlaces.length > 0) {
      placeContext = matchedPlaces
        .map(
          (p) =>
            `- ${p.name} (${p.category}): ${p.highlight} | เวลาเปิด: ${p.time} | ค่าเข้า: ${p.fee} | ที่อยู่: ${p.address} | รายละเอียด: ${p.description}`
        )
        .join('\n');
    }

    // ตรวจสอบว่าต้องใช้ Web Search หรือไม่ (เฉพาะกรณีไม่พบข้อมูลสถานที่ที่ตรงกัน)
    let searchResult = '';
    if (matchedPlaces.length === 0 && needsWebSearch(message)) {
      try {
        searchResult = await searchWeb(message + ' สมุทรปราการ');
      } catch (e) {
        console.warn('Web search failed, continuing without it:', e.message);
      }
    }

    // ถ้าไม่พบสถานที่ที่ตรงเป๊ะ และไม่มีผลค้นหาเว็บ ให้ส่งรายชื่อสถานที่ทั้งหมดแบบย่อไปแทน
    // เพื่อให้โมเดลแนะนำจากตัวเลือกจริงได้ (เช่นคำถามเปิดกว้างอย่าง "เย็นนี้ไปเที่ยวไหนดี")
    // แทนที่จะเดา/แต่งสถานที่ที่ไม่มีอยู่จริงขึ้นมาเอง
    let catalogContext = '';
    if (matchedPlaces.length === 0 && !searchResult) {
      catalogContext = places
        .map((p) => `- ${p.name} (${p.category}): ${p.highlight} | เวลาเปิด: ${p.time}`)
        .join('\n');
    }

    // สร้าง prompt เต็มรูปแบบ
    let fullPrompt = `${systemPrompt}\n\n`;
    if (context) {
      fullPrompt += `ประวัติการสนทนา (สำหรับบริบทเท่านั้น อย่านำมาตอบซ้ำ):\n${context}\n\n`;
    }
    if (placeContext) {
      fullPrompt += `ข้อมูลสถานที่ที่เกี่ยวข้องกับคำถามปัจจุบัน (ใช้ข้อมูลนี้เท่านั้น ห้ามแต่งเติม):\n${placeContext}\n\n`;
    } else if (searchResult) {
      fullPrompt += `ข้อมูลเพิ่มเติมจากการค้นหาเว็บ:\n${searchResult}\n\n`;
    } else if (catalogContext) {
      fullPrompt += `รายชื่อสถานที่ท่องเที่ยวทั้งหมดที่มีในระบบ (เลือกแนะนำจากรายการนี้เท่านั้น ห้ามแต่งสถานที่ใหม่):\n${catalogContext}\n\n`;
    }
    fullPrompt += `คำถามปัจจุบันของผู้ใช้ (ตอบเฉพาะข้อความนี้เท่านั้น): ${message}\n\nผู้ช่วย:`;

    let response;
    try {
      response = await queryModel(fullPrompt, {
        max_new_tokens: 700,
        temperature: 0.3,
        top_p: 0.9,
      });
    } catch (err) {
      // ข้อความที่เป็นมิตรกว่าเมื่อผู้ให้บริการเต็มความจุชั่วคราว
      if (err.message.includes('503') || err.message.includes('capacity_exhausted')) {
        return NextResponse.json({
          response: 'ขออภัยค่ะ ระบบ AI กำลังมีผู้ใช้งานหนาแน่น กรุณาลองใหม่อีกครั้งในอีกสักครู่ 🙏',
        });
      }
      throw err;
    }

    // ตัดส่วน prompt ที่ซ้ำออก (ถ้าตอบกลับมาทั้งหมด)
    let cleanResponse = response;
    if (cleanResponse.includes('ผู้ช่วย:')) {
      const parts = cleanResponse.split('ผู้ช่วย:');
      cleanResponse = parts[parts.length - 1].trim();
    }
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
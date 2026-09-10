import { NextResponse } from 'next/server';
import { searchWeb } from '@/lib/tavily';

export async function POST(request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }
    // ใช้ fetch เรียก Tavily API โดยตรง
    const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
    if (!TAVILY_API_KEY) {
      return NextResponse.json({ error: 'TAVILY_API_KEY not configured' }, { status: 500 });
    }
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        search_depth: 'basic',
        max_results: 5,
        include_answer: true,
        include_images: false,
        include_raw_content: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Tavily API error: ${errorText}`);
    }

    const data = await response.json();
    
    // สร้างข้อความจากผลลัพธ์
    let resultText = '';
    if (data.answer) {
      resultText += `คำตอบสรุป: ${data.answer}\n\n`;
    }
    if (data.results && data.results.length > 0) {
      resultText += 'ข้อมูลเพิ่มเติม:\n';
      data.results.forEach((r, idx) => {
        resultText += `${idx + 1}. ${r.title}: ${r.content}\n`;
      });
    }
    return NextResponse.json({ result: resultText.trim() || 'ไม่พบข้อมูลเพิ่มเติม' });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
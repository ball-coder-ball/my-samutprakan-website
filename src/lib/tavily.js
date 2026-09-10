const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

if (!TAVILY_API_KEY) {
  console.warn('TAVILY_API_KEY is not set in environment variables');
}

/**
 * ค้นหาข้อมูลจากเว็บผ่าน Tavily API
 * @param {string} query - คำค้น
 * @param {number} maxResults - จำนวนผลลัพธ์สูงสุด
 * @returns {Promise<string>} - ข้อความสรุปจากผลการค้นหา
 */
export async function searchWeb(query, maxResults = 5) {
  if (!TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY not configured');
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        search_depth: 'basic',
        max_results: maxResults,
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
    return resultText.trim() || 'ไม่พบข้อมูลเพิ่มเติม';
  } catch (error) {
    console.error('Tavily search error:', error);
    return 'ไม่สามารถค้นหาข้อมูลเพิ่มเติมได้ในขณะนี้';
  }
}

/**
 * ตรวจสอบว่าคำถามต้องค้นหาเว็บเพิ่มหรือไม่
 */
export function needsWebSearch(message) {
  const keywords = ['ข่าว', 'ล่าสุด', 'วันนี้', 'เดือนนี้', 'ปีนี้', 'ราคา', 'โปรโมชั่น', 'เปิดใหม่', 'ปรับปรุง'];
  const lower = message.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}

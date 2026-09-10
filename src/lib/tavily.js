import { tavily } from '@tavily/js-sdk';

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

if (!TAVILY_API_KEY) {
  console.warn('TAVILY_API_KEY is not set in environment variables');
}

let tvly = null;
try {
  if (TAVILY_API_KEY) {
    tvly = tavily({ apiKey: TAVILY_API_KEY });
  }
} catch (error) {
  console.error('Failed to initialize Tavily:', error);
}

/**
 * ค้นหาข้อมูลจากเว็บผ่าน Tavily API
 * @param {string} query - คำค้น
 * @param {number} maxResults - จำนวนผลลัพธ์สูงสุด
 * @returns {Promise<string>} - ข้อความสรุปจากผลการค้นหา
 */
export async function searchWeb(query, maxResults = 5) {
  if (!tvly) {
    throw new Error('Tavily client not initialized. Check TAVILY_API_KEY');
  }

  try {
    const response = await tvly.search(query, {
      searchDepth: 'basic',
      maxResults,
      includeAnswer: true,
      includeImages: false,
      includeRawContent: false,
    });

    // สร้างข้อความจากผลลัพธ์
    let resultText = '';
    if (response.answer) {
      resultText += `คำตอบสรุป: ${response.answer}\n\n`;
    }
    if (response.results && response.results.length > 0) {
      resultText += 'ข้อมูลเพิ่มเติม:\n';
      response.results.forEach((r, idx) => {
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
 * ตรวจสอบว่าคำถามต้องค้นหาเว็บเพิ่มหรือไม่ (เบื้องต้น ใช้ heuristic)
 */
export function needsWebSearch(message) {
  const keywords = ['ข่าว', 'ล่าสุด', 'วันนี้', 'เดือนนี้', 'ปีนี้', 'ราคา', 'โปรโมชั่น', 'เปิดใหม่', 'ปรับปรุง'];
  const lower = message.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}
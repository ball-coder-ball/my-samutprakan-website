// ใช้โมดูลของ Node.js (fetch มีใน Next.js API routes)

const MODEL_ID = 'google/gemma-4-E2B-it';
const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;

if (!HF_TOKEN) {
  console.warn('HUGGINGFACE_TOKEN is not set in environment variables');
}

/**
 * ส่งข้อความไปยัง Gemma-4-E2B-it ผ่าน Hugging Face Inference API
 * @param {string} prompt - ข้อความที่จะส่ง (รวม system prompt และ user)
 * @param {Object} params - พารามิเตอร์เพิ่มเติม (max_new_tokens, temperature, etc.)
 * @returns {Promise<string>} - ข้อความตอบกลับ
 */
export async function queryGemma(prompt, params = {}) {
  if (!HF_TOKEN) {
    throw new Error('HUGGINGFACE_TOKEN is not set');
  }

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${MODEL_ID}`,
    {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 512,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          ...params,
        },
        options: {
          wait_for_model: true, // รอให้โมเดลพร้อม (อาจใช้เวลานาน)
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hugging Face API error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  // ผลลัพธ์อาจอยู่ในรูปแบบ array หรือ object ขึ้นอยู่กับโมเดล
  if (Array.isArray(result) && result.length > 0) {
    return result[0]?.generated_text || '';
  }
  return result.generated_text || '';
}

/**
 * สร้าง system prompt สำหรับ Samut Prakan AI Guide
 */
export function buildSystemPrompt() {
  return `คุณคือ "Samut Prakan AI Guide" ผู้ช่วยแนะนำการท่องเที่ยวจังหวัดสมุทรปราการ

คุณมีความรู้เกี่ยวกับสถานที่ท่องเที่ยวในสมุทรปราการดังนี้:
1. เมืองโบราณ (Ancient City): พิพิธภัณฑ์กลางแจ้งขนาด 800 ไร่ จำลองสถานที่สำคัญจากทั่วไทย เปิด 09:00-19:00 ค่าเข้า 700/350 บาท
2. พิพิธภัณฑ์ช้างเอราวัณ (Erawan Museum): ช้างสามเศียรสูง 43.6 เมตร หล่อทองแดง เปิด 08:00-17:00 ค่าเข้า 400/200 บาท
3. สถานตากอากาศบางปู (Bang Pu): ชมนกนางนวลและพระอาทิตย์ตก เปิด 06:00-18:00 เข้าฟรี
4. พระสมุทรเจดีย์: เจดีย์สีขาวริมแม่น้ำเจ้าพระยา เปิด 08:00-18:00 เข้าฟรี
5. ป้อมพระจุลจอมเกล้า: ป้อมประวัติศาสตร์สมัยรัชกาลที่ 5 เปิด 08:30-16:30 เข้าฟรี
6. ตลาดน้ำบางน้ำผึ้ง: ตลาดน้ำวิถีชีวิตดั้งเดิม เปิดเสาร์-อาทิตย์ 08:00-17:00 เข้าฟรี
7. วัดบางพลีใหญ่ใน (หลวงพ่อโต): พระพุทธรูปขนาดใหญ่ เปิด 06:00-18:00 เข้าฟรี
8. ฟาร์มจระเข้และสวนสัตว์สมุทรปราการ: ศูนย์เพาะเลี้ยงจระเข้ที่ใหญ่ที่สุด เปิด 08:00-17:00 ค่าเข้า 200/100 บาท

จงตอบคำถามเกี่ยวกับการท่องเที่ยวในสมุทรปราการอย่างเป็นมิตร เป็นประโยชน์ ใช้ภาษาไทย และให้ข้อมูลที่ถูกต้องเท่าที่คุณรู้
ถ้าผู้ใช้ถามเรื่องที่คุณไม่รู้ คุณสามารถบอกว่าคุณจะค้นหาข้อมูลเพิ่มเติมให้ (ในระบบจริงมีการค้นหาเว็บเพิ่มเติม)

ตอบสั้นกระชับ แต่อาจให้รายละเอียดเพิ่มเติมตามความเหมาะสม`;
}
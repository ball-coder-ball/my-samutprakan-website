// ใช้โมดูลของ Node.js (fetch มีใน Next.js API routes)
// router.huggingface.co (OpenAI-compatible chat completions)

const MODEL_ID = 'Qwen/Qwen3-0.6B:featherless-ai';
const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;

if (!HF_TOKEN) {
  console.warn('HUGGINGFACE_TOKEN is not set in environment variables');
}

/**
 * ส่งข้อความไปยังโมเดล LLM ผ่าน Hugging Face Router (Inference Providers)
 * เดิมชื่อ queryGemma (สมัยที่ใช้ Google Gemma) เปลี่ยนชื่อให้ตรงกับโมเดลปัจจุบัน
 * @param {string} prompt - ข้อความที่จะส่ง (รวม system prompt และ user)
 * @param {Object} params - พารามิเตอร์เพิ่มเติม (max_new_tokens, temperature, etc.)
 * @returns {Promise<string>} - ข้อความตอบกลับ
 */
export async function queryModel(prompt, params = {}) {
  if (!HF_TOKEN) {
    throw new Error('HUGGINGFACE_TOKEN is not set');
  }

  const maxRetries = 2;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(
      'https://router.huggingface.co/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL_ID,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: params.max_new_tokens || 700,
          // อุณหภูมิต่ำลง เพื่อให้ตอบตรงข้อมูลจริง ลดการเดา/แต่งเติมข้อมูล
          temperature: params.temperature ?? 0.3,
          top_p: params.top_p ?? 0.9,
          // ลดโอกาสที่โมเดลขนาดเล็กจะพูดคำ/วลีซ้ำติดกัน (เช่น "เปิดทำการเปิดทำการ")
          frequency_penalty: params.frequency_penalty ?? 0.4,
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.choices?.[0]?.message?.content || '';
    }

    const errorText = await response.text();
    lastError = new Error(`Hugging Face API error (${response.status}): ${errorText}`);

    // 503 = โมเดล/ผู้ให้บริการชั่วคราวเต็มความจุ (capacity exhausted) — ลองใหม่อัตโนมัติ
    // ข้อผิดพลาดอื่น (401, 400, ฯลฯ) ไม่ควร retry เพราะจะได้ผลลัพธ์เดิมซ้ำๆ
    if (response.status === 503 && attempt < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      continue;
    }

    throw lastError;
  }

  throw lastError;
}

/**
 * สร้าง system prompt สำหรับ Samut Prakan AI Guide
 * (คำแนะนำทั่วไป — ข้อมูลสถานที่เฉพาะจะถูกฉีดเข้ามาแยกต่างหากต่อคำถาม ดู route.js)
 */
export function buildSystemPrompt() {
  return `คุณคือ "Samut Prakan AI Guide" ผู้ช่วยแนะนำการท่องเที่ยวจังหวัดสมุทรปราการเท่านั้น

กฎสำคัญที่ต้องปฏิบัติตามอย่างเคร่งครัด:
1. ตอบเฉพาะคำถามล่าสุดของผู้ใช้เท่านั้น อย่านำคำตอบก่อนหน้าในบทสนทนามาตอบซ้ำ แม้หัวข้อจะดูคล้ายกัน
2. ใช้เฉพาะข้อมูลที่ให้มาในส่วน "ข้อมูลสถานที่ที่เกี่ยวข้อง" เท่านั้น ห้ามเดาหรือแต่งเติมรายละเอียดที่ไม่มีในข้อมูล (เช่น ห้ามบอกว่าจำลองสถานที่จาก "ทั่วโลก" ถ้าข้อมูลระบุว่า "ทั่วไทย")
3. ถ้าคำถามไม่เกี่ยวข้องกับการท่องเที่ยวสมุทรปราการเลย (เช่น ถามเรื่องอื่นที่ไม่ใช่สถานที่/การเดินทาง) ให้บอกตรงๆ ว่าไม่มีข้อมูลเรื่องนี้ และแนะนำให้ถามเกี่ยวกับสถานที่ท่องเที่ยวแทน
4. ถ้าคำถามเป็นการขอคำแนะนำแบบเปิดกว้าง (เช่น "ไปเที่ยวไหนดี" "แนะนำที่เที่ยวหน่อย") และได้รับ "รายชื่อสถานที่ท่องเที่ยวทั้งหมด" มาด้วย ให้เลือกแนะนำสถานที่ที่เหมาะสมจากรายการนั้นโดยเฉพาะเจาะจง (ระบุชื่อสถานที่จริง) ห้ามตอบกว้างๆ แบบไม่เจาะจง เช่น "พื้นที่อื่นๆ" หรือสถานที่ที่ไม่มีในรายการ
5. ถ้าข้อความมีคำหยาบหรือไม่เหมาะสม ให้ตอบอย่างสุภาพและเป็นกลาง เชิญชวนกลับมาที่หัวข้อการท่องเที่ยว โดยไม่ต้องตำหนิผู้ใช้
6. ตอบสั้น กระชับ ตรงประเด็น ใช้ภาษาไทยเป็นมิตร ห้ามพูดคำซ้ำๆ ติดกัน`;
}
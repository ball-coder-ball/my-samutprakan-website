export default function AIProcessPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <h1 className="text-2xl font-bold text-[#1e5a3a] mb-4">🤖 เบื้องหลัง AI</h1>
      <p className="text-gray-600 mb-6">ดูรายละเอียดว่าเครื่องมือ AI ตัวไหนทำอะไรบ้างในเว็บไซต์นี้</p>
      <a
        href="https://docs.google.com/document/d/1xOTYOuRcE9D6nnjSsgOZJQuyLK-OvhTfW_UkWHZHPHs/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#1e5a3a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#164a2e] transition"
      >
        📄 ดู AI Process Log
      </a>
    </div>
  );
}
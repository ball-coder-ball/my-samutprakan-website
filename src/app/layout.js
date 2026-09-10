import './../styles/globals.css';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

export const metadata = {
  title: 'เที่ยวสมุทรปราการ - คู่มือท่องเที่ยวสมุทรปราการ',
  description: 'รวมที่เที่ยวสมุทรปราการ เมืองโบราณ ช้างเอราวัณ บางปู พร้อมแผนที่และรีวิว',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 py-6 max-w-6xl">
          {children}
        </main>
        <Chatbot />
        <footer className="bg-[#1e3a2f] text-white text-center py-6 mt-12">
          <div className="container mx-auto px-4">
            <p>🌏 <span className="text-yellow-300">เที่ยว</span>สมุทรปราการ — โปรเจกต์เว็บไซต์ท่องเที่ยวสำหรับนักเรียน</p>
            <p className="text-sm text-gray-400 mt-1">จัดทำโดย นาย สมชาย ใจดี รหัส 66123456 | ชั้น ม.6/1</p>
            <p className="text-xs text-gray-500 mt-2">ข้อมูลอ้างอิงจากแหล่งทางการ | ใช้ AI ช่วยในการสร้างเนื้อหา</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
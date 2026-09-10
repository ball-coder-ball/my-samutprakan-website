'use client';

import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'สวัสดีค่ะ! ฉันคือ Samut Prakan AI Guide ถามเกี่ยวกับสถานที่ท่องเที่ยวสมุทรปราการได้เลย 😊',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'ขออภัยค่ะ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* ปุ่มเปิดแชท */}
      <button
        data-chat-toggle
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-[#1e5a3a] text-white rounded-full px-6 py-3 shadow-lg hover:bg-[#143d27] transition flex items-center gap-2 text-lg font-semibold"
      >
        💬 {isOpen ? 'ปิด' : 'ถาม AI Guide'}
      </button>

      {/* หน้าต่างแชท */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[90vw] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-[#1e5a3a] text-white p-3 flex justify-between items-center">
            <span className="font-semibold">🤖 Samut Prakan AI Guide</span>
            <button onClick={toggleChat} className="text-xl hover:text-gray-200">
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f9fbf9]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message max-w-[85%] p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-[#1e5a3a] text-white self-end ml-auto'
                    : 'bg-[#e6f0e6] text-[#1e3a2f] self-start'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="message max-w-[85%] p-3 rounded-xl bg-[#e6f0e6] text-[#1e3a2f] self-start">
                กำลังคิด...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t p-2 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="พิมพ์คำถาม..."
              className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-[#1e5a3a]"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-[#1e5a3a] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#143d27] transition disabled:opacity-50"
            >
              ส่ง
            </button>
          </div>
        </div>
      )}
    </>
  );
}
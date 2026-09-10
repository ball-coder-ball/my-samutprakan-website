'use client';

import { useState } from 'react';

export default function TripPlanner() {
  const [formData, setFormData] = useState({
    place: '',
    visitors: 1,
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // นำข้อมูลไปใช้ในการวางแผนเที่ยว
    console.log('Trip plan data:', formData);
    alert('ส่งแบบฟอร์มเรียบร้อยแล้ว!');
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#1e5a3a] mb-6">🗺️ วางแผนเที่ยวของคุณ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1e3a2f] mb-2">เลือกสถานที่</label>
          <select
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5a3a]"
          >
            <option value="">-- เลือกสถานที่ --</option>
            {places.map((place) => (
              <option key={place.id} value={place.name}>
                {place.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1e3a2f] mb-2">จำนวนผู้เข้าพัก</label>
          <input
            type="number"
            name="visitors"
            value={formData.visitors}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5a3a]"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1e3a2f] mb-2">วันที่วางแผน</label>
          <input
            type="date"
            name="date"
            value={formData.date.toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5a3a]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#1e5a3a] text-white py-3 rounded-lg font-semibold hover:bg-[#143d27] transition"
        >
          บันทึกแผนการเที่ยว
        </button>
      </form>
    </div>
  );
}
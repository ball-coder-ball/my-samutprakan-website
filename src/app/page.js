'use client';

import { useState } from 'react';
import PlaceCard from './components/PlaceCard';
import { places } from '@/lib/placesData';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult(null);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = places.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.category.includes(q)
    );
    setSearchResult(results);
  };

  const displayedPlaces = searchResult !== null ? searchResult : places.slice(0, 4);

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#1e5a3a] mb-2">🌿 เที่ยวสมุทรปราการ</h1>
      <p className="text-xl text-[#3a6b4f] mb-6">ใกล้กรุงเทพฯ เที่ยวได้ครบ จบที่สมุทรปราการ</p>

      <div className="bg-[#e6f0e6] rounded-2xl p-6 mb-8 text-center">
        <p className="text-lg">🔍 ค้นหาสถานที่เที่ยวที่ใช่สำหรับคุณ</p>
        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 justify-center mt-4">
          <input
            type="text"
            placeholder="ชื่อสถานที่..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-5 py-3 rounded-full border border-gray-300 flex-1 min-w-[200px] max-w-md"
          />
          <button
            type="submit"
            className="bg-[#1e5a3a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#143d27] transition"
          >
            ค้นหา
          </button>
        </form>
        {searchResult !== null && (
          <p className="mt-3 text-sm text-[#1e5a3a]">
            {searchResult.length > 0
              ? `พบ ${searchResult.length} รายการ`
              : 'ไม่พบสถานที่ที่คุณค้นหา'}
          </p>
        )}
      </div>

      <section className="my-8">
        <h2 className="text-xl font-bold text-[#1e5a3a] mb-3">🎬 แนะนำสมุทรปราการใน 20 วินาที</h2>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://youtu.be/6FYCEvt1XKM?si=QR5cXQ9NbAkMM-5Y"
            title="แนะนำเที่ยวสมุทรปราการ"
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
      </section>

      <h2 className="text-2xl font-semibold text-[#1e5a3a] mb-4">🔥 สถานที่แนะนำ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-sm">
        <p className="text-xl">🤖 ต้องการคำแนะนำ? ถาม <strong>Samut Prakan AI Guide</strong> ได้เลย!</p>
        <button
          onClick={() => document.querySelector('[data-chat-toggle]')?.click()}
          className="mt-4 bg-[#1e5a3a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#143d27] transition"
        >
          💬 ถาม AI Guide
        </button>
      </div>
    </div>
  );
}
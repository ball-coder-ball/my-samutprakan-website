'use client';

import { useState } from 'react';
import Image from 'next/image';
import { truncateText } from '@/lib/utils';

export default function PlaceCard({ place }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border-l-4 border-[#1e5a3a] overflow-hidden"
        onClick={() => setShowDetail(true)}
      >
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <span className="inline-block bg-[#d9ead3] text-[#1e5a3a] text-xs font-semibold px-3 py-1 rounded-full mb-2">
            {place.category}
          </span>
          <h3 className="text-lg font-bold text-[#1e5a3a]">{place.name}</h3>
          <p className="text-sm text-gray-600">📍 {place.address}</p>
          <p className="text-sm text-gray-500 mt-1">{truncateText(place.highlight, 60)}</p>
          <span className="text-xs text-[#1e5a3a] font-medium mt-2 inline-block">ดูรายละเอียด →</span>
        </div>
      </div>

      {/* Modal รายละเอียด */}
      {showDetail && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
              onClick={() => setShowDetail(false)}
            >
              ✕
            </button>
            <div className="relative w-full h-64 bg-gray-200 rounded-lg mb-4">
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#1e5a3a]">{place.name}</h2>
            <span className="inline-block bg-[#d9ead3] text-[#1e5a3a] text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {place.category}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-[#f4f9f4] p-3 rounded-lg my-3">
              <span>📍 {place.address}</span>
              <span>🕐 {place.time}</span>
              <span>💰 {place.fee}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{place.description}</p>
            {place.gallery && place.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {place.gallery.map((img, idx) => (
                  <div key={idx} className="relative w-full h-32 bg-gray-200 rounded">
                    <Image
                      src={img}
                      alt={`${place.name} ${idx + 1}`}
                      fill
                      className="object-cover rounded"
                      sizes="50vw"
                    />
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400 mt-4">แหล่งข้อมูล: {place.source}</p>
          </div>
        </div>
      )}
    </>
  );
}
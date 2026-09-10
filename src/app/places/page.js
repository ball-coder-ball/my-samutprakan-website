'use client';

import { useState } from 'react';
import PlaceCard from '../components/PlaceCard';
import { places } from '@/lib/placesData';

export default function PlacesPage() {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(places.map((p) => p.category))];

  const filteredPlaces =
    filter === 'all' ? places : places.filter((p) => p.category === filter);

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#1e5a3a] mb-4">🗺️ สถานที่ท่องเที่ยวทั้งหมด</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === cat
                ? 'bg-[#1e5a3a] text-white'
                : 'bg-[#d9ead3] text-[#1e5a3a] hover:bg-[#c5dcc1]'
            }`}
          >
            {cat === 'all' ? 'ทั้งหมด' : cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}
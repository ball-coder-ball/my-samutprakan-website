'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const links = [
    { href: '/', label: 'หน้าแรก' },
    { href: '/places', label: 'สถานที่' },
  ];

  return (
    <nav className="bg-[#1e5a3a] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <div className="text-xl font-bold">
          🌏 <span className="text-yellow-300">เที่ยว</span>สมุทรปราการ
        </div>
        <ul className="flex gap-4 flex-wrap">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`pb-1 border-b-2 transition ${
                  isActive(link.href)
                    ? 'border-yellow-300 text-yellow-300'
                    : 'border-transparent hover:border-yellow-300 hover:text-yellow-300'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
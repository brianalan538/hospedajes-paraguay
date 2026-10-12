'use client';

import Link from 'next/link';
import { useState } from 'react';

const OWNER_WA =
  'https://wa.me/595985798538?text=' +
  encodeURIComponent('HOLA TENGO UN LOCAL TURISTICO, QUIERO APARECER EN TU PÁGINA');

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm ring-1 ring-stone-200 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-extrabold text-stone-900">
          🇵🇾 Hospedajes<span className="text-emerald-700">PY</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-bold text-stone-800 hover:text-emerald-700">Inicio</Link>
          <Link href="/hospedajes" className="text-sm font-bold text-stone-800 hover:text-emerald-700">Hospedajes</Link>
          <Link href="/nosotros" className="text-sm font-bold text-stone-800 hover:text-emerald-700">Nosotros</Link>
          <a
            href={OWNER_WA}
            className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-extrabold text-white hover:bg-emerald-800"
          >
            📢 Publica tu local
          </a>
        </nav>
        <button
          className="rounded-lg px-3 py-2 text-2xl font-bold text-stone-900 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? '✖' : '☰'}
        </button>
      </div>
      {open && (
        <nav className="border-t border-stone-200 bg-white px-4 py-3 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="block py-2 font-bold text-stone-900">🏠 Inicio</Link>
          <Link href="/hospedajes" onClick={() => setOpen(false)} className="block py-2 font-bold text-stone-900">🏨 Hospedajes</Link>
          <Link href="/nosotros" onClick={() => setOpen(false)} className="block py-2 font-bold text-stone-900">🧉 Nosotros</Link>
          <a href={OWNER_WA} className="mt-2 block rounded-xl bg-emerald-700 px-4 py-3 text-center font-extrabold text-white">
            📢 Publica tu local
          </a>
        </nav>
      )}
    </header>
  );
}

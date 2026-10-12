'use client';

import { useState } from 'react';

export interface Foto {
  id: string;
  url: string;
  orden: number;
}

export default function Galeria({ fotos, nombre }: { fotos: Foto[]; nombre: string }) {
  const ordenadas = [...fotos].sort((a, b) => a.orden - b.orden);
  const [sel, setSel] = useState(0);
  if (ordenadas.length === 0) {
    return <p className="text-sm text-stone-500">Sin fotos aún.</p>;
  }
  const actual = ordenadas[Math.min(sel, ordenadas.length - 1)];
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={actual.url}
        alt={nombre}
        className="aspect-[4/3] w-full rounded-2xl object-cover shadow"
      />
      <p className="mt-1 text-right text-xs text-stone-500">
        {Math.min(sel, ordenadas.length - 1) + 1} / {ordenadas.length}
      </p>
      {/* Cuadrícula 3x3 en desktop, 3 por fila en celu */}
      <div className="mt-2 grid grid-cols-3 gap-2">
        {ordenadas.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setSel(i)}
            className={`overflow-hidden rounded-xl border-2 ${i === sel ? 'border-emerald-600' : 'border-transparent opacity-80 hover:opacity-100'}`}
            aria-label={`Ver foto ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.url} alt={`${nombre} ${i + 1}`} className="aspect-square w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

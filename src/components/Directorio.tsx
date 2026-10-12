'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Lugar } from '@/lib/hospedajes';
import { waLink } from '@/lib/hospedajes';

function preview(lugar: Lugar) {
  const fotos = [...(lugar.lugar_fotos || [])].sort((a, b) => a.orden - b.orden);
  return fotos[0]?.url ?? null;
}

export default function Directorio({ lugares }: { lugares: Lugar[] }) {
  const [q, setQ] = useState('');
  const [depto, setDepto] = useState('');
  const [ciudad, setCiudad] = useState('');

  const deptos = useMemo(
    () => [...new Set(lugares.map((l) => l.departamento).filter(Boolean))].sort(),
    [lugares]
  );
  const ciudades = useMemo(() => {
    const base = depto ? lugares.filter((l) => l.departamento === depto) : lugares;
    return [...new Set(base.map((l) => l.ciudad).filter(Boolean))].sort();
  }, [lugares, depto]);

  const filtrados = useMemo(() => {
    const query = q.trim().toLowerCase();
    return lugares.filter((l) => {
      if (depto && l.departamento !== depto) return false;
      if (ciudad && l.ciudad !== ciudad) return false;
      if (query) {
        const hay = `${l.nombre} ${l.ciudad} ${l.departamento} ${l.instagram ?? ''}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [lugares, q, depto, ciudad]);

  return (
    <div>
      {/* Filtros estilo perfumes: buscador + selects */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, ciudad o Instagram..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <select
            value={depto}
            onChange={(e) => { setDepto(e.target.value); setCiudad(''); }}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="">🗺️ Todos los departamentos</option>
            {deptos.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="">📍 Todos los distritos</option>
            {ciudades.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {(q || depto || ciudad) && (
          <button
            onClick={() => { setQ(''); setDepto(''); setCiudad(''); }}
            className="mt-2 text-sm font-bold text-emerald-800 underline"
          >
            ✖ Limpiar filtros
          </button>
        )}
      </div>

      <p className="mb-3 mt-4 text-sm font-bold text-stone-600">
        {filtrados.length} hospedaje{filtrados.length === 1 ? '' : 's'} encontrado{filtrados.length === 1 ? '' : 's'}
      </p>

      <div className="grid gap-4">
        {filtrados.map((l) => {
          const foto = preview(l);
          return (
            <article key={l.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md">
              <div className="flex flex-col sm:flex-row">
                <div className="relative sm:w-64 sm:shrink-0">
                  <Link href={`/lugar/${l.slug}`} title={`Ver fotos de ${l.nombre}`}>
                    {foto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={foto} alt={l.nombre} className="h-48 w-full object-cover sm:h-full sm:min-h-52" />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-stone-200 text-sm font-bold text-stone-500 sm:h-full">Sin foto</div>
                    )}
                  </Link>
                  {l.is_destacado && (
                    <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2 py-1 text-xs font-extrabold text-stone-900">⭐ Destacado</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/lugar/${l.slug}`} title={`Ver fotos de ${l.nombre}`} className="hover:underline">
                      <h2 className="text-lg font-extrabold leading-snug text-stone-900">{l.nombre} 📷</h2>
                    </Link>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-stone-700">
                    📍 {l.ciudad} · 🗺️ {l.departamento}
                  </p>
                  <p className="mt-1 text-sm">
                    {l.instagram ? (
                      <a className="font-bold text-pink-700 underline" href={`https://instagram.com/${l.instagram}`}>📸 @{l.instagram}</a>
                    ) : null}
                    {(l.lugar_fotos?.length ?? 0) > 0 && (
                      <span className="font-semibold text-stone-600"> · 📷 {(l.lugar_fotos?.length ?? 0)} fotos</span>
                    )}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-stone-800">{l.descripcion}</p>
                  {l.precio_desde ? (
                    <p className="mt-1 text-sm font-extrabold text-emerald-800">💰 Desde Gs. {l.precio_desde.toLocaleString('es-PY')}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {l.whatsapp && (
                      <a className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white" href={waLink(l.whatsapp, `Hola! Vi ${l.nombre} en Hospedajes Paraguay y quiero reservar`)}>
                        💬 Reservar
                      </a>
                    )}
                    {l.maps_url && (
                      <a className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-stone-900 ring-1 ring-stone-400" href={l.maps_url}>
                        📍 Cómo llegar
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filtrados.length === 0 && (
        <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-stone-200">
          <p className="font-bold text-stone-700">😕 No encontramos hospedajes con esos filtros.</p>
          <p className="mt-1 text-sm text-stone-500">Probá con otra búsqueda o limpiá los filtros.</p>
        </div>
      )}
    </div>
  );
}

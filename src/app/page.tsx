import Link from 'next/link';
import { getTodosLugares, waLink } from '@/lib/hospedajes';

export default async function Home() {
  const lugares = await getTodosLugares();
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-extrabold">Hospedajes Paraguay 🇵🇾</h1>
      <p className="mt-2 text-zinc-600">
        Directorio demo — {lugares.length} lugares cargados desde Supabase (misma base de perfumes, tabla lugares).
      </p>
      <div className="mt-6 grid gap-4">
        {lugares.map((l) => (
          <div key={l.id} className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{l.nombre}</h2>
              <span className="text-xs rounded-full bg-zinc-100 px-2 py-1">
                {l.is_active ? '✅ visible' : '🚧 demo oculto'}
                {l.is_destacado ? ' ⭐' : ''}
              </span>
            </div>
            <p className="text-sm text-zinc-600">{l.ciudad} {l.instagram ? `· @${l.instagram}` : ''}</p>
            <p className="mt-2 text-sm">{l.descripcion}</p>
            <p className="mt-1 text-xs text-zinc-500">slug: {l.slug} · fotos: {l.lugar_fotos?.length ?? 0}</p>
            <div className="mt-3 flex gap-2">
              <Link className="rounded-xl bg-black px-4 py-2 text-white text-sm" href={`/lugar/${l.slug}`}>
                Ver ficha
              </Link>
              <a className="rounded-xl bg-green-600 px-4 py-2 text-white text-sm" href={waLink(l.whatsapp, `Hola! Vi ${l.nombre} en Hospedajes Paraguay y quiero reservar`)}>
                Reservar
              </a>
              {l.maps_url && (
                <a className="rounded-xl border px-4 py-2 text-sm" href={l.maps_url}>
                  Cómo llegar
                </a>
              )}
            </div>
          </div>
        ))}
        {lugares.length === 0 && (
          <p className="text-red-600 font-bold">0 lugares: revisa .env.local o RLS en Supabase.</p>
        )}
      </div>
    </main>
  );
}

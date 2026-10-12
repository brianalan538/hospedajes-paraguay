import Link from 'next/link';
import { getTodosLugares, waLink } from '@/lib/hospedajes';

const OWNER_WA =
  'https://wa.me/595985798538?text=' +
  encodeURIComponent('HOLA TENGO UN LOCAL TURISTICO, QUIERO APARECER EN TU PÁGINA');

export default async function Home() {
  const lugares = await getTodosLugares();
  const destacados = [...lugares]
    .sort((a, b) => Number(b.is_destacado) - Number(a.is_destacado))
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-emerald-800 via-teal-700 to-amber-600 px-6 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-widest text-white">Paraguay · Turismo local</p>
          <h1 className="mt-1 text-4xl font-extrabold text-white sm:text-5xl">Hospedajes Paraguay 🇵🇾</h1>
          <p className="mt-2 max-w-xl font-semibold text-white">
            Hoteles, spas y cabañas con reserva directa por WhatsApp. Sin comisiones, fotos reales y ubicación verificada.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/hospedajes" className="rounded-xl bg-white px-5 py-3 font-extrabold text-emerald-900">
              🔍 Ver hospedajes
            </Link>
            <Link href="/nosotros" className="rounded-xl bg-white/20 px-5 py-3 font-extrabold text-white ring-1 ring-white/40">
              🧉 Por qué nosotros
            </Link>
          </div>
        </div>
      </header>

      {/* CTA DUEÑOS bien arriba, con tu fondo */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/fondo.jpg" alt="Turismo en Paraguay" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-stone-950/70" />
        <div className="relative mx-auto max-w-5xl px-6 py-10 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            🏨 ¿QUIERES QUE TU LOCAL APAREZCA AQUÍ?
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-semibold text-white/90">
            Fotos, botón de reserva a tu WhatsApp y cómo llegar. Sin comisiones por reserva.
          </p>
          <a
            href={OWNER_WA}
            className="mt-4 inline-block rounded-xl bg-green-500 px-6 py-3 text-lg font-extrabold text-white shadow-lg hover:bg-green-600"
          >
            💬 CONTACTANOS
          </a>
        </div>
      </section>

      {/* Destacados */}
      <section className="mx-auto max-w-5xl p-4 sm:p-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-stone-900">⭐ Destacados</h2>
          <Link href="/hospedajes" className="text-sm font-extrabold text-emerald-800 underline">
            Ver todos →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {destacados.map((l) => {
            const fotos = [...(l.lugar_fotos || [])].sort((a, b) => a.orden - b.orden);
            const foto = fotos[0]?.url ?? null;
            return (
              <article key={l.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md">
                <Link href={`/lugar/${l.slug}`} className="block" title={`Ver fotos de ${l.nombre}`}>
                  {foto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={foto} alt={l.nombre} className="h-44 w-full object-cover" />
                  ) : (
                    <div className="flex h-44 items-center justify-center bg-stone-200 text-sm font-bold text-stone-500">Sin foto</div>
                  )}
                </Link>
                <div className="p-4">
                  <Link href={`/lugar/${l.slug}`} className="hover:underline" title={`Ver fotos de ${l.nombre}`}>
                    <h3 className="font-extrabold leading-snug text-stone-900">{l.nombre} 📷</h3>
                  </Link>
                  <p className="mt-1 text-sm font-semibold text-stone-700">📍 {l.ciudad}</p>
                  <div className="mt-3 flex gap-2">
                    <a href={waLink(l.whatsapp, `Hola! Vi ${l.nombre} en Hospedajes Paraguay y quiero reservar`)} className="flex-1 rounded-xl bg-green-600 px-3 py-2 text-center text-sm font-bold text-white">
                      💬 Reservar
                    </a>
                    {l.maps_url && (
                      <a href={l.maps_url} className="flex-1 rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-stone-900 ring-1 ring-stone-400">
                        📍 Cómo llegar
                      </a>
                    )}
                  </div>
                  <Link href={`/lugar/${l.slug}`} className="mt-2 block text-center text-xs font-bold text-stone-500 underline">
                    Toca la foto o el nombre para ver todas las fotos →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        {lugares.length === 0 && (
          <p className="mt-4 font-bold text-red-600">0 lugares: revisa .env.local o RLS en Supabase.</p>
        )}
      </section>
    </main>
  );
}

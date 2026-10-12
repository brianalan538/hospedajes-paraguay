import Link from 'next/link';
import { getTodosLugares, waLink } from '@/lib/hospedajes';

function preview(lugar: { lugar_fotos?: { url: string; orden: number }[] }) {
  const fotos = [...(lugar.lugar_fotos || [])].sort((a, b) => a.orden - b.orden);
  return fotos[0]?.url ?? null;
}

export default async function Home() {
  const lugares = await getTodosLugares();
  return (
    <main className="min-h-screen">
      {/* Hero claro, sin negro */}
      <header className="bg-gradient-to-br from-emerald-700 via-teal-700 to-amber-600 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-widest opacity-90">Carmen del Paraná · Itapúa</p>
          <h1 className="mt-1 text-4xl font-extrabold">Hospedajes Paraguay 🇵🇾</h1>
          <p className="mt-2 max-w-xl text-white/90">
            Hoteles, spas y cabañas con reserva directa por WhatsApp. Sin comisiones, sin vueltas.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl p-4 sm:p-6">
        <div className="grid gap-4">
          {lugares.map((l) => {
            const foto = preview(l);
            return (
              <article key={l.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
                <div className="flex flex-col sm:flex-row">
                  {/* Preview: foto al lado de la info */}
                  <div className="relative sm:w-64 sm:shrink-0">
                    {foto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={foto} alt={l.nombre} className="h-48 w-full object-cover sm:h-full sm:min-h-48" />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-stone-200 text-sm text-stone-500 sm:h-full">Sin foto</div>
                    )}
                    {l.is_destacado && (
                      <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2 py-1 text-xs font-extrabold">⭐ Destacado</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-lg font-extrabold leading-snug">{l.nombre}</h2>
                      {!l.is_active && (
                        <span className="shrink-0 rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold">🚧 demo</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-stone-600">
                      📍 {l.ciudad}
                      {l.instagram ? (
                        <> · <a className="font-bold text-pink-700 underline" href={`https://instagram.com/${l.instagram}`}>@{l.instagram}</a></>
                      ) : null}
                      {(l.lugar_fotos?.length ?? 0) > 0 && (
                        <span className="text-stone-500"> · 📷 {(l.lugar_fotos?.length ?? 0)} fotos</span>
                      )}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-stone-700">{l.descripcion}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-bold text-white" href={`/lugar/${l.slug}`}>
                        Ver fotos
                      </Link>
                      <a className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white" href={waLink(l.whatsapp, `Hola! Vi ${l.nombre} en Hospedajes Paraguay y quiero reservar`)}>
                        Reservar
                      </a>
                      {l.maps_url && (
                        <a className="rounded-xl bg-white px-4 py-2 text-sm font-bold ring-1 ring-stone-300" href={l.maps_url}>
                          Cómo llegar
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          {lugares.length === 0 && (
            <p className="font-bold text-red-600">0 lugares: revisa .env.local o RLS en Supabase.</p>
          )}
        </div>
        <footer className="mt-8 text-center text-xs text-stone-500">
          Hospedajes Paraguay · Reserva directa por WhatsApp · ¿Tienes un hospedaje? Escríbenos para aparecer aquí.
        </footer>
      </div>
    </main>
  );
}

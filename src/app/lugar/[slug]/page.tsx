import { notFound } from 'next/navigation';
import Galeria from '@/components/Galeria';
import { getLugarPorSlug, waLink } from '@/lib/hospedajes';

export default async function Ficha({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lugar = await getLugarPorSlug(slug);
  if (!lugar) return notFound();
  return (
    <main className="min-h-screen bg-stone-100">
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <a href="/" className="text-sm font-bold text-emerald-800 underline">← Volver al directorio</a>
        <div className="mt-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200 sm:p-6">
          <h1 className="text-2xl font-extrabold leading-snug text-stone-900 sm:text-3xl">{lugar.nombre}</h1>
          <p className="mt-1 text-sm font-semibold text-stone-700">
            📍 {lugar.ciudad} · 🗺️ {lugar.departamento}
            {lugar.instagram ? (
              <> · <a className="font-bold text-pink-700 underline" href={`https://instagram.com/${lugar.instagram}`}>📸 Instagram @{lugar.instagram}</a></>
            ) : null}
          </p>
          {!lugar.is_active && <p className="mt-3 rounded-xl bg-yellow-100 p-3 text-sm font-bold">🚧 DEMO oculta — solo visible con link directo hasta que el cliente pague.</p>}
          <p className="mt-3 text-stone-700">{lugar.descripcion}</p>
          {lugar.precio_desde ? <p className="mt-2 font-extrabold">Desde Gs. {lugar.precio_desde.toLocaleString('es-PY')}</p> : null}
          <div className="mt-4">
            <Galeria fotos={lugar.lugar_fotos || []} nombre={lugar.nombre} />
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            {lugar.whatsapp && (
              <a className="rounded-xl bg-green-600 px-5 py-3 text-center font-extrabold text-white" href={waLink(lugar.whatsapp, `Hola! Quiero reservar en ${lugar.nombre}`)}>
                💬 Reservar por WhatsApp
              </a>
            )}
            {lugar.maps_url && (
              <a className="rounded-xl bg-white px-5 py-3 text-center font-extrabold text-stone-900 ring-1 ring-stone-400" href={lugar.maps_url}>
                📍 Cómo llegar
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

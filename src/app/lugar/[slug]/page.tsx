import { notFound } from 'next/navigation';
import { getLugarPorSlug, waLink } from '@/lib/hospedajes';

export default async function Ficha({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lugar = await getLugarPorSlug(slug);
  if (!lugar) return notFound();
  const fotos = [...(lugar.lugar_fotos || [])].sort((a, b) => a.orden - b.orden);
  return (
    <main className="mx-auto max-w-3xl p-6">
      <a href="/" className="text-sm underline">← Volver al directorio</a>
      <h1 className="mt-2 text-3xl font-extrabold">{lugar.nombre}</h1>
      <p className="text-zinc-600">{lugar.ciudad} {lugar.instagram ? `· Instagram @${lugar.instagram}` : ''}</p>
      {!lugar.is_active && <p className="mt-2 rounded-xl bg-yellow-100 p-3 text-sm font-bold">🚧 DEMO oculta — solo visible con link directo hasta que el cliente pague.</p>}
      <p className="mt-4">{lugar.descripcion}</p>
      {lugar.precio_desde ? <p className="mt-2 font-bold">Desde Gs. {lugar.precio_desde.toLocaleString('es-PY')}</p> : null}
      <div className="mt-4 grid gap-2">
        {fotos.length === 0 && <p className="text-sm text-zinc-500">Sin fotos aún — sube a bucket hospedajes y registra en lugar_fotos.</p>}
        {fotos.map((f) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={f.id} src={f.url} alt={lugar.nombre} className="w-full rounded-2xl" />
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <a className="rounded-xl bg-green-600 px-5 py-3 text-white font-bold" href={waLink(lugar.whatsapp, `Hola! Quiero reservar en ${lugar.nombre}`)}>
          Reservar por WhatsApp
        </a>
        {lugar.maps_url && (
          <a className="rounded-xl border px-5 py-3 font-bold" href={lugar.maps_url}>
            Cómo llegar
          </a>
        )}
      </div>
      <p className="mt-6 text-xs text-zinc-500">QR puerta → apunta a esta URL: /lugar/{lugar.slug}</p>
    </main>
  );
}

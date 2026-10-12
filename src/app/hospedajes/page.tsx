import { getTodosLugares } from '@/lib/hospedajes';
import Directorio from '@/components/Directorio';

export const metadata = {
  title: 'Hospedajes | Hospedajes Paraguay',
};

export default async function HospedajesPage() {
  const lugares = await getTodosLugares();
  return (
    <main className="relative min-h-screen">
      {/* Tu fondo detrás de las cards, con velo claro para que se lea todo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/fondo.jpg" alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-stone-100/90" />
      <div className="relative mx-auto max-w-5xl p-4 sm:p-6">
        <h1 className="rounded-2xl bg-white/90 px-4 py-3 text-3xl font-extrabold text-stone-900 shadow-sm ring-1 ring-stone-200">
          🏨 Todos los hospedajes
        </h1>
        <p className="mt-2 rounded-xl bg-white/90 px-4 py-2 font-semibold text-stone-700 ring-1 ring-stone-200">
          Filtra por departamento, distrito o busca por nombre. Reserva directa, sin comisiones.
        </p>
        <div className="mt-4">
          <Directorio lugares={lugares} />
        </div>
      </div>
    </main>
  );
}

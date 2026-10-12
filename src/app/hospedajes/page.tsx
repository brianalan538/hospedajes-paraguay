import { getTodosLugares } from '@/lib/hospedajes';
import Directorio from '@/components/Directorio';

export const metadata = {
  title: 'Hospedajes | Hospedajes Paraguay',
};

export default async function HospedajesPage() {
  const lugares = await getTodosLugares();
  return (
    <main className="mx-auto max-w-5xl p-4 sm:p-6">
      <h1 className="text-3xl font-extrabold text-stone-900">🏨 Todos los hospedajes</h1>
      <p className="mt-1 font-semibold text-stone-600">
        Filtra por departamento, distrito o busca por nombre. Reserva directa, sin comisiones.
      </p>
      <div className="mt-4">
        <Directorio lugares={lugares} />
      </div>
    </main>
  );
}

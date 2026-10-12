const OWNER_WA =
  'https://wa.me/595985798538?text=' +
  encodeURIComponent('HOLA TENGO UN LOCAL TURISTICO, QUIERO APARECER EN TU PÁGINA');

export const metadata = {
  title: 'Nosotros | Hospedajes Paraguay',
};

export default function NosotrosPage() {
  return (
    <main className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="text-3xl font-extrabold text-stone-900">🧉 Quiénes somos</h1>
      <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        <p className="text-stone-800">
          Somos un equipo paraguayo que ama viajar por nuestro país. Creamos <strong>Hospedajes Paraguay</strong> porque
          estábamos cansados de lo mismo de siempre: plataformas que se quedan con hasta 18% de comisión, fotos que no
          se parecen a la realidad, precios en dólares que nadie entiende y reservas donde nunca hablas con el dueño.
        </p>
        <p className="mt-3 text-stone-800">
          Acá es simple: <strong>visitamos los lugares, sacamos fotos reales, verificamos la ubicación</strong> y te
          conectamos directo por WhatsApp con el hospedaje. Sin intermediarios, sin letra chica. Queremos que Paraguay
          se conozca por todos: cada reserva acá apoya a una familia paraguaya, no a una multinacional.
        </p>
        <div className="mt-4 grid gap-2 text-sm font-bold text-stone-900 sm:grid-cols-2">
          <p>🚫 Nada de estafas con fotos robadas: verificamos cada lugar.</p>
          <p>💰 Precios claros en guaraníes, sin cargos sorpresa.</p>
          <p>📍 Cómo llegar real con Google Maps.</p>
          <p>💬 Hablas con el dueño, no con un bot.</p>
        </div>
      </div>
      <div className="relative mt-4 overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/fondo.jpg" alt="Turismo en Paraguay" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-stone-950/70" />
        <div className="relative p-6 text-center">
          <h2 className="text-xl font-extrabold text-white">🏨 ¿Tienes un hospedaje?</h2>
          <p className="mx-auto mt-1 max-w-md font-semibold text-white/90">
            Aparece con fotos, reserva a tu WhatsApp y cómo llegar. Sin comisiones por reserva.
          </p>
          <a href={OWNER_WA} className="mt-3 inline-block rounded-xl bg-green-500 px-6 py-3 font-extrabold text-white">
            💬 CONTACTANOS
          </a>
        </div>
      </div>
    </main>
  );
}

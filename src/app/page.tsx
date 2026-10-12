import { getTodosLugares } from '@/lib/hospedajes';
import Directorio from '@/components/Directorio';

export default async function Home() {
  const lugares = await getTodosLugares();
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-emerald-800 via-teal-700 to-amber-600 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-widest text-white">Paraguay · Turismo local</p>
          <h1 className="mt-1 text-4xl font-extrabold text-white">Hospedajes Paraguay 🇵🇾</h1>
          <p className="mt-2 max-w-xl font-semibold text-white">
            Hoteles, spas y cabañas con reserva directa por WhatsApp. Sin comisiones, fotos reales y ubicación verificada.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold">
            <span className="rounded-full bg-white/20 px-3 py-1">✅ Sin comisión</span>
            <span className="rounded-full bg-white/20 px-3 py-1">📸 Fotos reales</span>
            <span className="rounded-full bg-white/20 px-3 py-1">💬 Dueño directo</span>
            <span className="rounded-full bg-white/20 px-3 py-1">💰 Precios en Gs.</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl p-4 sm:p-6">
        <Directorio lugares={lugares} />

        {/* Quiénes somos */}
        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-extrabold text-stone-900">🧉 Quiénes somos</h2>
          <p className="mt-2 text-stone-800">
            Somos un equipo paraguayo que ama viajar por nuestro país. Creamos <strong>Hospedajes Paraguay</strong> porque
            estábamos cansados de lo mismo de siempre: plataformas que se quedan con hasta 18% de comisión, fotos que no
            se parecen a la realidad, precios en dólares que nadie entiende y reservas donde nunca hablas con el dueño.
          </p>
          <p className="mt-2 text-stone-800">
            Acá es simple: <strong>visitamos los lugares, sacamos fotos reales, verificamos la ubicación</strong> y te
            conectamos directo por WhatsApp con el hospedaje. Sin intermediarios, sin letra chica. Queremos que Paraguay
            se conozca por todos: cada reserva acá apoya a una familia paraguaya, no a una multinacional.
          </p>
          <div className="mt-3 grid gap-2 text-sm font-bold text-stone-900 sm:grid-cols-2">
            <p>🚫 Nada de estafas con fotos robadas: verificamos cada lugar.</p>
            <p>💰 Precios claros en guaraníes, sin cargos sorpresa.</p>
            <p>📍 Cómo llegar real con Google Maps + QR en puerta.</p>
            <p>💬 Hablas con el dueño, no con un bot.</p>
          </div>
        </section>

        {/* Para negocios */}
        <section className="mt-4 rounded-2xl bg-stone-900 p-6 text-white">
          <h2 className="text-2xl font-extrabold text-white">🏨 ¿Tienes un hospedaje?</h2>
          <p className="mt-2 text-white/90">
            Aparece en el directorio con fotos, botón de reserva directo a tu WhatsApp y cómo llegar.
            Sin comisiones por reserva: te quedas con el 100% de lo que vendas. Solo pagas una membresía fija por estar visible.
          </p>
          <p className="mt-2 text-sm font-bold text-white/70">
            Viajero: reservar por acá no te cuesta nada extra. El precio lo pone el hospedaje.
          </p>
          <a
            className="mt-4 inline-block rounded-xl bg-green-500 px-5 py-3 font-extrabold text-white"
            href="https://wa.me/595985798538?text=Hola!%20Quiero%20aparecer%20en%20Hospedajes%20Paraguay"
          >
            💬 Quiero aparecer aquí
          </a>
        </section>

        <footer className="mt-8 text-center text-xs font-semibold text-stone-500">
          Hospedajes Paraguay · Hecho con 🧉 en Paraguay · Reserva directa por WhatsApp
        </footer>
      </div>
    </main>
  );
}

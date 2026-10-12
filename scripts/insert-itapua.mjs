// Carga masiva Itapúa (info pública del usuario). Demos ocultos, sin fotos.
// Uso: node scripts/insert-itapua.mjs
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
globalThis.WebSocket = WebSocket;
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');

function loadEnv(path) {
  const out = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

const env = loadEnv(join(ROOT, '.env.local'));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const DEMO = ' (Ficha demo con info pública.)';

const rows = [
  {
    slug: 'hotel-itapua-encarnacion',
    nombre: 'HOTEL ITAPÚA - Encarnación',
    ciudad: 'Encarnación', departamento: 'Itapúa', instagram: null,
    whatsapp: '595982225930',
    maps_url: 'https://maps.google.com/?q=Hotel+Itapua+Encarnacion+Terminal',
    descripcion: 'A media cuadra de la Terminal de Ómnibus. Habitaciones cómodas con desayuno buffet incluido. Ideal familias, trabajo o delegaciones. Tel fijo 071 205 045.' + DEMO,
    precio_desde: null, is_active: false, is_destacado: false,
  },
  {
    slug: 'hospedaje-encarnacion-centro',
    nombre: 'HOSPEDAJE ENCARNACIÓN - Centro',
    ciudad: 'Encarnación', departamento: 'Itapúa', instagram: null,
    whatsapp: null,
    maps_url: 'https://maps.google.com/?q=Proceres+de+Mayo+361+Encarnacion',
    descripcion: 'Próceres de Mayo 361. Desayuno, Wi-Fi, estacionamiento gratuito, pet-friendly y aire acondicionado.' + DEMO,
    precio_desde: 272550, is_active: false, is_destacado: false,
  },
  {
    slug: 'savoy-hotel-encarnacion',
    nombre: 'SAVOY HOTEL - Encarnación',
    ciudad: 'Encarnación', departamento: 'Itapúa', instagram: null,
    whatsapp: null,
    maps_url: 'https://maps.google.com/?q=Savoy+Hotel+Encarnacion+Costanera',
    descripcion: 'Hotel 5 estrellas sobre la Av. Costanera. Restaurante, piscina al aire libre, bar de cócteles y vista al río.' + DEMO,
    precio_desde: null, is_active: false, is_destacado: true,
  },
  {
    slug: 'awa-resort-encarnacion',
    nombre: 'AWA RESORT HOTEL - Encarnación',
    ciudad: 'Encarnación', departamento: 'Itapúa',
    instagram: 'awaresortpy',
    whatsapp: '595983566667',
    maps_url: 'https://maps.google.com/?q=Awa+Resort+Hotel+Encarnacion',
    descripcion: 'Resort 5 estrellas en Ruta 1 km 367 (Tajy y Naranjal). Piscina, jacuzzi, amplios jardines y confort de alta gama.' + DEMO,
    precio_desde: null, is_active: false, is_destacado: true,
  },
  {
    slug: 'hotel-estancia-itapua-bogado',
    nombre: 'HOTEL ESTANCIA ITAPÚA - Cnel. Bogado',
    ciudad: 'Coronel Bogado', departamento: 'Itapúa', instagram: null,
    whatsapp: null,
    maps_url: 'https://maps.google.com/?q=Hotel+Estancia+Itapua+Coronel+Bogado',
    descripcion: 'Colonia Mbutuy, capital de la chipa. Experiencia campestre: gastronomía típica, paseos a caballo y pesca. Desde 150.000 a 250.000 Gs por pareja con desayuno.' + DEMO,
    precio_desde: 150000, is_active: false, is_destacado: false,
  },
  {
    slug: 'hotel-hohenau',
    nombre: 'HOTEL HOHENAU - Hohenau',
    ciudad: 'Hohenau', departamento: 'Itapúa', instagram: null,
    whatsapp: '595994862766',
    maps_url: 'https://maps.google.com/?q=Hotel+Hohenau+Ruta+6',
    descripcion: 'Hotel 3 estrellas sobre Ruta 6. Desayuno, Wi-Fi, piscina y gimnasio.' + DEMO,
    precio_desde: 572338, is_active: false, is_destacado: false,
  },
  {
    slug: 'hospedaje-tia-doris-bella-vista',
    nombre: 'HOSPEDAJE TÍA DORIS / POSADA SAN JORGE - Bella Vista',
    ciudad: 'Bella Vista Sur', departamento: 'Itapúa', instagram: null,
    whatsapp: '595985756396',
    maps_url: 'https://maps.google.com/?q=Ruta+6+Km+44+Bella+Vista+Itapua',
    descripcion: 'Ruta 6ta Km 44, Bella Vista. Posada turística familiar.' + DEMO,
    precio_desde: null, is_active: false, is_destacado: false,
  },
];

for (const r of rows) {
  const { error } = await supabase.from('lugares').upsert(r, { onConflict: 'slug' });
  console.log(`${r.slug}: ${error ? 'ERROR ' + error.message : 'ok'}`);
}
console.log('Listo: 7 upserts Itapúa.');

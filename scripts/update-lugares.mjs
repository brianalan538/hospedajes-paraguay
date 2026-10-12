// Actualiza whatsapp/maps/instagram de los 2 lugares demo.
// Uso: node scripts/update-lugares.mjs
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

const cambios = [
  {
    slug: 'delaepy-carmen',
    nombre: 'SPA & HOSPEDAJE BOUTIQUE DELAE - CARMEN DEL PARANÁ',
    whatsapp: '595983804090',
    maps_url: 'https://maps.app.goo.gl/8zTSzLU672ZQdwr89',
    instagram: 'delaepy',
    descripcion: 'Spa & hospedaje boutique en Carmen del Paraná. Ideal para escapadas y relax.',
  },
  {
    slug: 'hotel-san-expedito-carmen',
    nombre: 'HOTEL SAN EXPEDITO - CARMEN DEL PARANÁ',
    whatsapp: '595983244043',
    maps_url: 'https://maps.app.goo.gl/zkzeo78KGizt6ceWA',
    instagram: 'hotel_san_expedito',
    descripcion: 'Hotel San Expedito en Carmen del Paraná. Cómodo, familiar y bien ubicado.',
  },
];

for (const c of cambios) {
  const { error } = await supabase.from('lugares').update({
    nombre: c.nombre,
    whatsapp: c.whatsapp,
    maps_url: c.maps_url,
    instagram: c.instagram,
    descripcion: c.descripcion,
  }).eq('slug', c.slug);
  console.log(`${c.slug}: ${error ? 'ERROR ' + error.message : 'ok'}`);
}
console.log('Listo.');

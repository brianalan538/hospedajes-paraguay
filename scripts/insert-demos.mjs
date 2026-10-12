// Carga demos de otras zonas (info pública). Sin fotos: se ven con "Sin foto" hasta activar.
// Uso: node scripts/insert-demos.mjs
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

const demos = [
  {
    slug: 'awa-resort-encarnacion',
    nombre: 'AWA RESORT HOTEL - Encarnación',
    ciudad: 'Encarnación',
    departamento: 'Itapúa',
    instagram: 'awaresortpy',
    whatsapp: '595983566667',
    maps_url: 'https://maps.google.com/?q=Awa+Resort+Hotel+Encarnacion',
    descripcion: 'Resort 5 estrellas en Quiteria, Encarnación. 87 habitaciones, spa, piscina y salones de eventos.',
    precio_desde: null,
    is_active: false,
    is_destacado: true,
  },
  {
    slug: 'encanto-rural-bella-vista',
    nombre: 'HOTEL ENCANTO RURAL - Bella Vista',
    ciudad: 'Bella Vista Sur',
    departamento: 'Itapúa',
    instagram: null,
    whatsapp: '595985510510',
    maps_url: 'https://maps.google.com/?q=Hotel+Encanto+Rural+Bella+Vista+Itapua',
    descripcion: 'Complejo turístico y recreativo en Bella Vista Sur: habitaciones amplias, piscina, camping y salón de eventos.',
    precio_desde: null,
    is_active: false,
    is_destacado: false,
  },
];

for (const d of demos) {
  const { error } = await supabase.from('lugares').upsert(d, { onConflict: 'slug' });
  console.log(`${d.slug}: ${error ? 'ERROR ' + error.message : 'ok'}`);
}
console.log('Listo. Quedan como demo oculto (is_active=false).');

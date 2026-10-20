// Alta de Hospedaje Panambi (Carmen del Paraná).
// Uso: node scripts/insert-panambi.mjs
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

const lugar = {
  slug: 'hospedaje-panambi-carmen',
  nombre: 'HOSPEDAJE PANAMBI - CARMEN DEL PARANÁ',
  ciudad: 'Carmen del Paraná',
  departamento: 'Itapúa',
  instagram: null,
  whatsapp: '595987455489',
  maps_url: 'https://maps.google.com/?q=Hospedaje+Panambi+Carmen+del+Parana',
  descripcion:
    'Escapada en Carmen del Paraná, cerca de la costanera y las playas. Habitaciones amobladas con aire acondicionado y Wi-Fi, piscina para relajarse, quincho con parrilla y estacionamiento amplio y seguro. Ideal para familias y grupos. Calificación 5/5.',
  precio_desde: null,
  is_active: false,
  is_destacado: false,
};

const { error } = await supabase.from('lugares').upsert(lugar, { onConflict: 'slug' });
console.log(`${lugar.slug}: ${error ? 'ERROR ' + error.message : 'ok'}`);

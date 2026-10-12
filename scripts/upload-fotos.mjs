// Sube fotos-hospedajes/<slug>/* al bucket 'hospedajes' y registra en lugar_fotos.
// Uso: node scripts/upload-fotos.mjs
// Lee .env.local del proyecto (NO imprime keys).
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
globalThis.WebSocket = WebSocket;
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const ENV_PATH = join(ROOT, '.env.local');
const FOTOS_DIR = join(dirname(ROOT), 'fotos-hospedajes');

function loadEnv(path) {
  const out = {};
  const txt = readFileSync(path, 'utf8');
  for (const line of txt.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

const env = loadEnv(ENV_PATH);
const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) {
  console.error('Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}
if (!existsSync(FOTOS_DIR)) {
  console.error('No existe carpeta: ' + FOTOS_DIR);
  process.exit(1);
}

const supabase = createClient(URL, KEY);
const slugs = readdirSync(FOTOS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

console.log(`Slugs encontrados: ${slugs.join(', ')}`);

for (const slug of slugs) {
  // 1) buscar lugar_id
  const { data: lugar, error: e1 } = await supabase
    .from('lugares')
    .select('id, slug')
    .eq('slug', slug)
    .single();
  if (e1 || !lugar) {
    console.log(`- ${slug}: NO existe en tabla lugares (crealo o revisa slug). Skip.`);
    continue;
  }
  const dir = join(FOTOS_DIR, slug);
  const files = readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  console.log(`- ${slug}: ${files.length} fotos locales, lugar_id ${String(lugar.id).slice(0, 8)}...`);

  // 2) subir cada foto (upsert)
  const urls = [];
  let orden = 1;
  for (const file of files) {
    const buf = readFileSync(join(dir, file));
    const ext = file.split('.').pop().toLowerCase();
    const ct = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    const path = `${slug}/${file}`;
    const { error: upErr } = await supabase.storage
      .from('hospedajes')
      .upload(path, buf, { contentType: ct, upsert: true });
    if (upErr) {
      console.log(`  x ${file}: upload error ${upErr.message}`);
      continue;
    }
    const { data } = supabase.storage.from('hospedajes').getPublicUrl(path);
    urls.push({ lugar_id: lugar.id, url: data.publicUrl, orden: orden++ });
    console.log(`  ok ${file}`);
  }

  // 3) reemplazar registros (borra anteriores de ese lugar e inserta nuevos)
  if (urls.length > 0) {
    const { error: delErr } = await supabase.from('lugar_fotos').delete().eq('lugar_id', lugar.id);
    if (delErr) console.log(`  ! delete previas: ${delErr.message}`);
    const { error: insErr } = await supabase.from('lugar_fotos').insert(urls);
    if (insErr) console.log(`  x insert lugar_fotos: ${insErr.message}`);
    else console.log(`  -> registradas ${urls.length} fotos en lugar_fotos`);
  }
}
console.log('Listo. Verifica en / y /lugar/<slug>.');

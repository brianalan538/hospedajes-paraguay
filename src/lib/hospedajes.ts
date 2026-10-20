import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface LugarFoto {
  id: string;
  url: string;
  orden: number;
}

export interface Lugar {
  id: string;
  slug: string;
  nombre: string;
  ciudad: string;
  departamento: string;
  instagram: string | null;
  whatsapp: string | null;
  maps_url: string | null;
  descripcion: string;
  precio_desde: number | null;
  is_active: boolean;
  is_destacado: boolean;
  lugar_fotos: LugarFoto[];
}

export const DESTACADO_PRINCIPAL = 'hospedaje-panambi-carmen';

// Orden lindo: principal, luego con fotos (más fotos primero), luego destacados, luego nombre.
function ordenarLindo(lista: Lugar[]): Lugar[] {
  return [...lista].sort((a, b) => {
    const pa = a.is_destacado && a.slug === DESTACADO_PRINCIPAL;
    const pb = b.is_destacado && b.slug === DESTACADO_PRINCIPAL;
    if (pa !== pb) return pa ? -1 : 1;
    const fa = a.lugar_fotos?.length ?? 0;
    const fb = b.lugar_fotos?.length ?? 0;
    if ((fb > 0 ? 1 : 0) !== (fa > 0 ? 1 : 0)) return (fb > 0 ? 1 : 0) - (fa > 0 ? 1 : 0);
    if (fb !== fa) return fb - fa;
    if (Number(b.is_destacado) !== Number(a.is_destacado)) return Number(b.is_destacado) - Number(a.is_destacado);
    return a.nombre.localeCompare(b.nombre);
  });
}

export async function getTodosLugares(): Promise<Lugar[]> {
  const { data, error } = await supabase
    .from('lugares')
    .select('*, lugar_fotos(*)')
    .order('nombre');
  if (error) {
    console.error('Error lugares:', error);
    return [];
  }
  return ordenarLindo((data || []) as Lugar[]);
}

export async function getLugaresActivos(): Promise<Lugar[]> {
  const { data, error } = await supabase
    .from('lugares')
    .select('*, lugar_fotos(*)')
    .eq('is_active', true)
    .order('is_destacado', { ascending: false });
  if (error) return [];
  return ordenarLindo((data || []) as Lugar[]);
}

export async function getLugarPorSlug(slug: string): Promise<Lugar | null> {
  const { data, error } = await supabase
    .from('lugares')
    .select('*, lugar_fotos(*)')
    .eq('slug', slug)
    .single();
  if (error || !data) return null;
  return data as Lugar;
}

export function waLink(whatsapp: string | null, texto: string) {
  if (!whatsapp) return '#';
  const num = whatsapp.replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(texto)}`;
}

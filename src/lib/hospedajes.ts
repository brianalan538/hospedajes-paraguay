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

export async function getTodosLugares(): Promise<Lugar[]> {
  const { data, error } = await supabase
    .from('lugares')
    .select('*, lugar_fotos(*)')
    .order('nombre');
  if (error) {
    console.error('Error lugares:', error);
    return [];
  }
  return (data || []) as Lugar[];
}

export async function getLugaresActivos(): Promise<Lugar[]> {
  const { data, error } = await supabase
    .from('lugares')
    .select('*, lugar_fotos(*)')
    .eq('is_active', true)
    .order('is_destacado', { ascending: false });
  if (error) return [];
  return (data || []) as Lugar[];
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

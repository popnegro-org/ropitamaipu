export type GarmentCategory = 'Vestidos' | 'Blusas y camisas' | 'Abrigos' | 'Pantalones' | 'Faldas' | 'Tejidos';
export type GarmentSize = 'S' | 'M' | 'L' | 'XL';
export type GarmentAvailability = 'available' | 'reserved' | 'sold' | 'pending';

export interface Garment {
  id: string;
  name: string;
  category?: GarmentCategory;
  size?: GarmentSize;
  condition?: 'Impecable' | 'Muy bueno' | 'Bueno';
  notes?: string;
  priceArs?: number;
  imageUrl: string;
  availability: GarmentAvailability;
}

export const categories: GarmentCategory[] = [
  'Vestidos', 'Blusas y camisas', 'Abrigos', 'Pantalones', 'Faldas', 'Tejidos',
];

// Las 16 fotografías están visibles como fichas preliminares. Los datos comerciales
// permanecen pendientes de revisión y confirmación humana.
const photoFiles = [
  'Gemini_Generated_Image_5sn0d35sn0d35sn0.jpeg',
  'Gemini_Generated_Image_8lx5998lx5998lx5.jpeg',
  'Gemini_Generated_Image_bgdje8bgdje8bgdj.jpeg',
  'Gemini_Generated_Image_dbzf9vdbzf9vdbzf.jpeg',
  'Gemini_Generated_Image_eefmyfeefmyfeefm.jpeg',
  'Gemini_Generated_Image_fzttntfzttntfztt.jpeg',
  'Gemini_Generated_Image_im5gv4im5gv4im5g.jpeg',
  'Gemini_Generated_Image_mj1tlgmj1tlgmj1t.jpeg',
  'Gemini_Generated_Image_mj7zywmj7zywmj7z.jpeg',
  'Gemini_Generated_Image_n3ieu6n3ieu6n3ie.jpeg',
  'Gemini_Generated_Image_xb3tjvxb3tjvxb3t.jpeg',
  'Gemini_Generated_Image_xmvihjxmvihjxmvi.jpeg',
  'blusa-amarilla-public.jpeg',
  'blusa-bordó-fim.jpeg',
  'minifalda-gris.jpeg',
  'musculosa-blanca-sarkany.jpeg',
];

export const garments: Garment[] = photoFiles.map((file, index) => ({
  id: `RC-${String(index + 1).padStart(3, '0')}`,
  name: `Prenda ${String(index + 1).padStart(2, '0')}`,
  imageUrl: `/prendas/${encodeURIComponent(file)}`,
  availability: 'pending',
  notes: 'Información pendiente de completar y validar.',
}));

export function garmentWhatsappMessage(garment: Garment): string {
  return [
    '¡Hola, Ropero Circular!',
    `Vi la ${garment.name} (código ${garment.id}).`,
    '¿Podrían compartirme la información y confirmar su disponibilidad?',
  ].join(' ');
}

export interface GarmentFilters {
  category?: GarmentCategory | 'Todas';
  size?: GarmentSize | 'Todos';
  onlyAvailable?: boolean;
  query?: string;
}

export function filterGarments(items: Garment[], filters: GarmentFilters): Garment[] {
  const term = filters.query?.trim().toLocaleLowerCase('es-AR') ?? '';

  return items.filter((garment) => {
    if (filters.category && filters.category !== 'Todas' && garment.category !== filters.category) return false;
    if (filters.size && filters.size !== 'Todos' && garment.size !== filters.size) return false;
    if (filters.onlyAvailable && garment.availability !== 'available') return false;
    if (term && ![garment.name, garment.notes ?? '', garment.category ?? '', garment.id]
      .join(' ').toLocaleLowerCase('es-AR').includes(term)) return false;
    return true;
  });
}

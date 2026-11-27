import { useMemo, useState } from 'react';
import type { GarmentCategory, GarmentSize } from '@/data/garments';
import { categories, filterGarments, garments } from '@/data/garments';
import { Search, SearchX } from 'lucide-react';
import GarmentCard from '@/components/GarmentCard';

type CategoryFilter = GarmentCategory | 'Todas';
type SizeFilter = GarmentSize | 'Todos';
const sizeFilters: SizeFilter[] = ['Todos', 'S', 'M', 'L', 'XL'];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Todas');
  const [activeSize, setActiveSize] = useState<SizeFilter>('Todos');
  const [query, setQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const availableSizes = useMemo(() => {
    const sizes = new Set(garments.map((garment) => garment.size));
    return sizeFilters.filter((size) => size === 'Todos' || sizes.has(size));
  }, []);

  const filtered = useMemo(() => filterGarments(garments, {
    category: activeCategory,
    size: activeSize,
    onlyAvailable,
    query,
  }), [activeCategory, activeSize, onlyAvailable, query]);

  const availableCount = garments.filter((garment) => garment.availability === 'available').length;
  const resetFilters = () => {
    setActiveCategory('Todas');
    setActiveSize('Todos');
    setOnlyAvailable(false);
    setQuery('');
  };

  return (
    <section id="catalogo" className="bg-forest-50/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive-700">Catálogo</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-forest-900 sm:text-5xl">Nuestro catálogo</h2>
            <p className="mt-3 text-forest-800/70" aria-live="polite">
              {garments.length} {garments.length === 1 ? 'prenda en catálogo' : 'prendas en catálogo'} · {availableCount} disponibles.
            </p>
          </div>
          {garments.length > 0 && (
            <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-forest-800">
              <input type="checkbox" checked={onlyAvailable} onChange={(event) => setOnlyAvailable(event.target.checked)} className="h-4 w-4 accent-forest-700" />
              Mostrar solo disponibles
            </label>
          )}
        </div>

        {garments.length > 0 ? (
          <>
            <div className="mt-8 flex flex-col gap-4 border-y border-forest-900/10 py-5">
              <label className="relative block max-w-md">
                <Search size={17} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-forest-800/50" />
                <span className="sr-only">Buscar prendas</span>
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por prenda, categoría o código"
                  className="w-full rounded-full border border-forest-900/15 bg-cream-50 py-3 pl-11 pr-4 text-sm text-forest-900 outline-none transition focus:border-olive-600 focus:ring-2 focus:ring-olive-600/15" />
              </label>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
                  {(['Todas', ...categories] as const).map((category) => (
                    <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${activeCategory === category ? 'bg-forest-800 text-cream-100' : 'border border-forest-900/15 text-forest-800 hover:border-forest-800/50'}`}>
                      {category}
                    </button>
                  ))}
                </div>
                <div role="group" aria-label="Filtrar por talle" className="flex items-center gap-2">
                  <span className="mr-1 text-xs uppercase tracking-[0.15em] text-forest-800/60">Talle</span>
                  {availableSizes.map((size) => (
                    <button key={size} type="button" onClick={() => setActiveSize(size)} aria-pressed={activeSize === size}
                      className={`h-9 min-w-9 rounded-full px-2 text-sm transition-colors ${activeSize === size ? 'bg-olive-600 text-cream-100' : 'border border-forest-900/15 text-forest-800 hover:border-olive-600'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {filtered.length ? (
              <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((garment) => <GarmentCard key={garment.id} garment={garment} />)}
              </ul>
            ) : (
              <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-forest-900/20 bg-cream-50 px-6 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive-50 text-olive-700"><SearchX size={24} aria-hidden /></span>
                <h3 className="mt-5 font-display text-2xl text-forest-900">No encontramos prendas</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-forest-800/70">Probá con otra búsqueda o quitá alguno de los filtros.</p>
                <button type="button" onClick={resetFilters} className="mt-6 rounded-full border border-forest-800/25 px-6 py-2.5 text-sm font-medium text-forest-800">Limpiar búsqueda y filtros</button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-forest-900/20 bg-cream-50 px-6 py-14 text-center sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive-700">Muy pronto</p>
            <h3 className="mt-3 font-display text-2xl text-forest-900 sm:text-3xl">Estamos preparando el catálogo</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-forest-800/70">
              Las prendas se publicarán aquí cuando estén listas. Mientras tanto, escribinos por WhatsApp y contanos qué estás buscando.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

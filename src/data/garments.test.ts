import { describe, expect, it } from 'vitest';
import { filterGarments, garmentWhatsappMessage, type Garment } from './garments';

const sample: Garment[] = [
  { id: 'RC-001', name: 'Vestido floral', category: 'Vestidos', size: 'M', condition: 'Muy bueno', notes: 'Estampado azul', priceArs: 12000, availability: 'available' },
  { id: 'RC-002', name: 'Camisa blanca', category: 'Blusas y camisas', size: 'S', condition: 'Impecable', notes: 'Algodón', availability: 'reserved' },
  { id: 'RC-003', name: 'Abrigo de lana', category: 'Abrigos', size: 'L', condition: 'Bueno', notes: 'Para invierno', availability: 'sold' },
];

describe('filterGarments', () => {
  it('returns all items when no filters are selected', () => {
    expect(filterGarments(sample, {})).toHaveLength(3);
  });

  it('filters by category and size together', () => {
    expect(filterGarments(sample, { category: 'Vestidos', size: 'M' }).map((item) => item.id)).toEqual(['RC-001']);
  });

  it('searches case-insensitively by name, notes, category and code', () => {
    expect(filterGarments(sample, { query: 'AZUL' }).map((item) => item.id)).toEqual(['RC-001']);
    expect(filterGarments(sample, { query: 'rc-003' }).map((item) => item.id)).toEqual(['RC-003']);
  });

  it('shows only available items when requested', () => {
    expect(filterGarments(sample, { onlyAvailable: true }).map((item) => item.id)).toEqual(['RC-001']);
  });

  it('returns an empty list when no item matches', () => {
    expect(filterGarments(sample, { query: 'inexistente' })).toEqual([]);
  });
});

describe('garmentWhatsappMessage', () => {
  it('includes the garment name, code and size without inventing price', () => {
    const message = garmentWhatsappMessage(sample[0]);
    expect(message).toContain('Vestido floral');
    expect(message).toContain('RC-001');
    expect(message).toContain('talle M');
    expect(message).not.toContain('$');
  });
});

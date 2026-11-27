import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Catalog from './Catalog';

describe('Catalog', () => {
  it('renders all 16 photo cards without inventing product details or availability', () => {
    render(<Catalog />);
    expect(screen.getByRole('heading', { name: 'Nuestro catálogo' })).toBeInTheDocument();
    expect(screen.getByText('16 prendas en catálogo · 0 disponibles.')).toBeInTheDocument();
    expect(screen.getAllByText('Datos pendientes')).toHaveLength(16);
    expect(screen.getAllByText('Precio pendiente')).toHaveLength(16);
    expect(screen.getAllByRole('img')).toHaveLength(16);
    expect(screen.queryByRole('link', { name: 'Consultar por esta prenda' })).not.toBeInTheDocument();
  });
});

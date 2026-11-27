# Ropero Circular — Sitio web PMV

Landing comercial de **Ropero Circular**, emprendimiento de ropa usada y prendas de segunda mano de Maipú, Mendoza, Argentina.

- Eslogan: *Ropa usada, nuevas oportunidades.*
- WhatsApp: [+54 9 261 670-6710](https://wa.me/5492616706710)
- Instagram: pendiente de configurar.

## Stack

Vite + React + TypeScript + Tailwind CSS. Sin backend, base de datos, carrito, pagos ni autenticación, según el alcance del PMV.

## Arquitectura

- `src/data/site.ts`: datos comerciales y configuración de Instagram.
- `src/data/garments.ts`: modelo tipado y catálogo editable.
- `src/components`: navegación, portada, catálogo, compra, información y contacto.

## Actualizar el catálogo

Editá `src/data/garments.ts`. El arreglo `garments` comienza vacío intencionalmente: no se publican productos de ejemplo como si fueran inventario real. Agregá únicamente prendas verificadas y con disponibilidad confirmada.

Cada prenda utiliza este modelo:

```ts
{
  id: 'vst-01',                    // identificador único
  name: 'Nombre real de la prenda',
  category: 'Vestidos',
  size: 'M',                       // S | M | L | XL
  condition: 'Muy bueno',          // Impecable | Muy bueno | Bueno
  notes: 'Descripción comprobada.',
  priceArs: 15000,                 // opcional; precio confirmado en ARS
  imageUrl: 'https://...',         // opcional; fotografía real y pública
  availability: 'available',      // available | reserved | sold
}
```

No cargues precios, fotografías ni atributos que no hayan sido confirmados. Las tarjetas muestran un marcador neutro cuando falta la fotografía y permiten consultar el precio por WhatsApp cuando no está informado. Los filtros incluyen categoría, talle, disponibilidad y búsqueda por nombre, descripción o código.

## Instagram

La URL del perfil no está inventada ni publicada. Cuando el propietario la comparta, configurar `src/data/site.ts`. Mientras `url` sea `null`, no se enlaza a un perfil inexistente.

## Comandos

```bash
npm install
npm run dev
npm test
npm run test:watch        # modo interactivo
npm run lint
npm run typecheck
npm run build
```

## Tests y CI

- Vitest ejecuta pruebas unitarias y de componentes en jsdom.
- Testing Library verifica la interfaz desde la perspectiva del usuario.
- `npm test` ejecuta la suite una vez; `npm run test:watch` inicia el modo interactivo.
- GitHub Actions ejecuta tests, lint, typecheck y build en cada PR hacia `main` y en pushes a `main`.

## Privacidad

- No se publica la dirección residencial: solo “Maipú, Mendoza” y la coordinación del retiro por WhatsApp.
- No se inventan horarios, precios, productos reales ni perfiles sociales.
- El catálogo permanece vacío hasta cargar prendas reales verificadas.

## Estado de la entrega

- [x] Landing responsive con identidad visual verde bosque, oliva y crema.
- [x] Catálogo tipado con estados disponible, reservado y vendido.
- [x] Consultas por WhatsApp con mensaje personalizado por prenda.
- [x] Instagram configurable sin URL ficticia.
- [x] SEO básico y estructura accesible.
- [x] Suite automatizada Vitest + Testing Library.
- [x] CI de GitHub Actions para tests, lint, typecheck y build.
- [x] Lint, typecheck y build ejecutados localmente en la rama candidata.
- [x] QA visual local de la landing completa: catálogo vacío, sin inventario ficticio.
- [ ] Pendientes del propietario: URL de Instagram, fotos y precios reales de prendas, y confirmación de modalidad/horarios de retiro.

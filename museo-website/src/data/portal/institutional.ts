import type { PortalCollectionItem, PortalQuickLink } from './types'

export const portalQuickLinks: PortalQuickLink[] = [
  { id: 'ql-1', label: 'Su visita', to: '/visitas' },
  { id: 'ql-2', label: 'Exposiciones', to: '/coleccion' },
  { id: 'ql-3', label: 'El museo', to: '/museo' },
  { id: 'ql-4', label: 'Colecciones', to: '/coleccion' },
  { id: 'ql-5', label: 'Servicios educativos', to: '/programacion' },
  { id: 'ql-6', label: 'Otros servicios', to: '/patrimonio' },
  { id: 'ql-7', label: 'Publicaciones', to: '/investigacion' },
]

export const portalCollections: PortalCollectionItem[] = [
  {
    id: 'collection-1',
    title: 'Cuadernos de curaduría',
    summary:
      'Revista virtual semestral con resultados de investigación de curadurías de arte, etnografía, historia y arqueología.',
    href: '/investigacion',
    image: '/home-sections/investigacion.jpg',
  },
  {
    id: 'collection-2',
    title: 'Piezas en diálogo y pieza del mes',
    summary:
      'Lecturas curatoriales de colecciones del museo para conectar públicos con objetos, relatos y contextos históricos.',
    href: '/coleccion',
    image: '/home-sections/coleccion.jpg',
  },
  {
    id: 'collection-3',
    title: 'Publicaciones virtuales',
    summary:
      'Catálogos, cuadernillos y recursos editoriales desarrollados por el museo para investigación y mediación educativa.',
    href: '/investigacion',
    image: '/home-sections/patrimonio.jpg',
  },
]

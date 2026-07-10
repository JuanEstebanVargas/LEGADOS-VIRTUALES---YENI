import type { PortalExhibitionItem } from './types'

export const portalExhibitions: PortalExhibitionItem[] = [
  {
    id: 'exhibition-1',
    status: 'Actual',
    title: 'Luz y devoción',
    summary:
      'Lectura curatorial sobre la relación entre iconografía, espacio y experiencia visual en la pintura sacra.',
    href: '/coleccion',
    image: '/home-sections/museo.jpg',
  },
  {
    id: 'exhibition-2',
    status: 'Próxima',
    title: 'Talleres de mediación patrimonial',
    summary:
      'Actividades familiares y educativas para crear vínculos entre técnica artística, contexto y memoria local.',
    href: '/programacion',
    image: '/home-sections/patrimonio.jpg',
  },
  {
    id: 'exhibition-3',
    status: 'Pasada',
    title: 'Patrimonio vivo',
    summary:
      'Selección retrospectiva de piezas restauradas y documentación de procesos de conservación.',
    href: '/patrimonio',
    image: '/home-sections/historia.jpg',
  },
]

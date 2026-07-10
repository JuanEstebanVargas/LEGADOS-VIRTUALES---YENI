import type { PortalEventItem } from './types'

export const portalEvents: PortalEventItem[] = [
  {
    id: 'event-1',
    title: 'Vuelve al Museo',
    summary:
      '¡Anímate a visitarnos! Te esperamos de martes a domingo desde las 9:00 a.m. hasta las 5:00 p.m.',
    startsAt: '2026-07-05T09:00:00-05:00',
    location: 'Museo Nacional de Colombia',
    href: '/visitas',
  },
  {
    id: 'event-2',
    title: 'Prográmate con el Museo',
    summary:
      'Entérate de las charlas, conciertos, talleres y demás actividades del mes entrando a este espacio.',
    startsAt: '2026-07-12T10:00:00-05:00',
    location: 'Agenda mensual',
    href: '/programacion',
  },
  {
    id: 'event-3',
    title: 'Recorridos comentados de exposiciones temporales',
    summary:
      'Programación de mediación cultural para públicos generales, grupos escolares y visitantes internacionales.',
    startsAt: '2026-07-19T11:00:00-05:00',
    location: 'Salas del museo',
    href: '/coleccion',
  },
]

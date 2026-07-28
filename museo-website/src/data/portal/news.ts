import type { PortalNewsItem } from './types'

export const basePortalNews: PortalNewsItem[] = [
  {
    id: 'news-1',
    title: 'El Museo de la ciudad de Ocaña Antón García de Bonilla reabrió sus puertas con sus salas renovadas',
    summary:
      'El museo regional reabrió oficialmente al público como parte de los museos de la nación, con una propuesta renovada para públicos diversos.',
    ctaLabel: 'Mayor información',
    href: '/programacion',
    image: '/home-sections/programacion.jpg',
  },
  {
    id: 'news-2',
    title: 'Dos obras de Beatriz González presentes en el Astrup Fearnley Museet de Oslo',
    summary:
      'Los suicidas del Sisga III y Retratos mudos, piezas de la colección del museo, participan en una exposición internacional.',
    ctaLabel: 'Mayor información',
    href: '/investigacion',
    image: '/home-sections/investigacion.jpg',
  },
  {
    id: 'news-3',
    title: 'Pasados en retorno: nuevas lecturas curatoriales en diálogo con la memoria nacional',
    summary:
      'Una propuesta expositiva y editorial que activa conversaciones entre patrimonio, ciudadanía y narrativas del presente.',
    ctaLabel: 'Mayor información',
    href: '/coleccion',
    image: '/home-sections/coleccion.jpg',
  },
]

export const portalNews: PortalNewsItem[] = basePortalNews

export const getPortalNewsItems = (): PortalNewsItem[] => {
  return basePortalNews
}

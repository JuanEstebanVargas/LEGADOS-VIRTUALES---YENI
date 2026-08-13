export type PortalNewsItem = {
  id: string
  title: string
  summary: string
  ctaLabel: string
  href: string
  image: string
}

export type PortalEventItem = {
  id: string
  title: string
  summary: string
  startsAt: string
  location: string
  href: string
}

export type PortalExhibitionItem = {
  id: string
  status: 'Actual' | 'Próxima' | 'Pasada'
  title: string
  summary: string
  href: string
  image: string
}

export type PortalCollectionItem = {
  id: string
  title: string
  summary: string
  href: string
  image: string
}

export type PortalQuickLink = {
  id: string
  label: string
  to: string
}

export type PortalDirectorItem = {
  id: string
  name: string
  role: string
  period: string
  tag: string
  description: string
  image: string
}

export type PortalCustodianItem = {
  id: string
  name: string
  role: string
  period: string
  tag: string
  description: string
  image: string
}

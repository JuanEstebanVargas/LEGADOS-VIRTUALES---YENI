import type { PortalNewsItem } from './types'

type SaveServerCarouselItemInput = {
  title: string
  href: string
  imageDataUrl?: string
  summary?: string
  position?: number
}

const API_BASE = '/api/carousel'

const parseItemsPayload = (payload: unknown): PortalNewsItem[] => {
  if (!Array.isArray(payload)) {
    return []
  }

  return payload.filter((item): item is PortalNewsItem => {
    if (typeof item !== 'object' || item === null) {
      return false
    }

    const candidate = item as Partial<PortalNewsItem>
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.title === 'string' &&
      typeof candidate.summary === 'string' &&
      typeof candidate.ctaLabel === 'string' &&
      typeof candidate.href === 'string' &&
      typeof candidate.image === 'string'
    )
  })
}

const readErrorMessage = async (response: Response) => {
  try {
    const parsed = (await response.json()) as { error?: string }
    return parsed.error || 'Error al comunicarse con el servidor.'
  } catch {
    return 'Error al comunicarse con el servidor.'
  }
}

export const fetchServerCarouselItems = async () => {
  const response = await fetch(`${API_BASE}/items`, {
    method: 'GET',
    credentials: 'same-origin',
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  const parsed = (await response.json()) as { items?: unknown }
  return parseItemsPayload(parsed.items)
}

export const saveServerCarouselItem = async (input: SaveServerCarouselItemInput) => {
  const response = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  const parsed = (await response.json()) as { item?: PortalNewsItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió el elemento guardado.')
  }

  return parsed.item
}

export const removeServerCarouselItem = async (id: string) => {
  const response = await fetch(`${API_BASE}/items/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }
}

export const updateServerCarouselItem = async (id: string, input: SaveServerCarouselItemInput) => {
  const response = await fetch(`${API_BASE}/items/${encodeURIComponent(id)}`, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  const parsed = (await response.json()) as { item?: PortalNewsItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió el elemento actualizado.')
  }

  return parsed.item
}

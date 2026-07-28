import type { Artwork } from '../content'

export type CollectionServerItem = Artwork & { id: string; href: string; image: string }

type SaveServerCollectionItemInput = {
  title: string
  artist: string
  year: string
  period: string
  medium: string
  href: string
  imageDataUrl?: string
}

const API_BASE = '/api/collection'

const parseItemsPayload = (payload: unknown): CollectionServerItem[] => {
  if (!Array.isArray(payload)) {
    return []
  }

  return payload.filter((item): item is CollectionServerItem => {
    if (typeof item !== 'object' || item === null) {
      return false
    }

    const candidate = item as Partial<CollectionServerItem>
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.title === 'string' &&
      typeof candidate.artist === 'string' &&
      typeof candidate.year === 'string' &&
      typeof candidate.period === 'string' &&
      typeof candidate.medium === 'string' &&
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

export const fetchServerCollectionItems = async () => {
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

export const saveServerCollectionItem = async (input: SaveServerCollectionItemInput) => {
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

  const parsed = (await response.json()) as { item?: CollectionServerItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió la obra guardada.')
  }

  return parsed.item
}

export const removeServerCollectionItem = async (id: string) => {
  const response = await fetch(`${API_BASE}/items/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }
}

export const updateServerCollectionItem = async (id: string, input: SaveServerCollectionItemInput) => {
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

  const parsed = (await response.json()) as { item?: CollectionServerItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió la obra actualizada.')
  }

  return parsed.item
}

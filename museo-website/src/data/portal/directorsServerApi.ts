import type { PortalDirectorItem } from './types'

export type SaveServerDirectorItemInput = {
  name: string
  role: string
  period: string
  tag: string
  description: string
  imageDataUrl?: string
  position?: number
}

const API_BASE = '/api/directors'

const parseItemsPayload = (payload: unknown): PortalDirectorItem[] => {
  if (!Array.isArray(payload)) {
    return []
  }

  return payload.filter((item): item is PortalDirectorItem => {
    if (typeof item !== 'object' || item === null) {
      return false
    }

    const candidate = item as Partial<PortalDirectorItem>
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.name === 'string' &&
      typeof candidate.role === 'string' &&
      typeof candidate.period === 'string' &&
      typeof candidate.tag === 'string' &&
      typeof candidate.description === 'string' &&
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

export const fetchServerDirectorItems = async () => {
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

export const saveServerDirectorItem = async (input: SaveServerDirectorItemInput) => {
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

  const parsed = (await response.json()) as { item?: PortalDirectorItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió la directora guardada.')
  }

  return parsed.item
}

export const removeServerDirectorItem = async (id: string) => {
  const response = await fetch(`${API_BASE}/items/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }
}

export const updateServerDirectorItem = async (id: string, input: SaveServerDirectorItemInput) => {
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

  const parsed = (await response.json()) as { item?: PortalDirectorItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió la directora actualizada.')
  }

  return parsed.item
}

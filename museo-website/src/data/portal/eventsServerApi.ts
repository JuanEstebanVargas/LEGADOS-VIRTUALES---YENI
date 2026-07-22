import type { PortalEventItem } from './types'

type SaveServerEventItemInput = {
  title: string
  summary: string
  startsAt: string
  location: string
  href: string
}

const API_BASE = '/api/events'

const parseItemsPayload = (payload: unknown): PortalEventItem[] => {
  if (!Array.isArray(payload)) {
    return []
  }

  return payload.filter((item): item is PortalEventItem => {
    if (typeof item !== 'object' || item === null) {
      return false
    }

    const candidate = item as Partial<PortalEventItem>
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.title === 'string' &&
      typeof candidate.summary === 'string' &&
      typeof candidate.startsAt === 'string' &&
      typeof candidate.location === 'string' &&
      typeof candidate.href === 'string'
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

export const fetchServerEventItems = async () => {
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

export const saveServerEventItem = async (input: SaveServerEventItemInput) => {
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

  const parsed = (await response.json()) as { item?: PortalEventItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió el evento guardado.')
  }

  return parsed.item
}

export const removeServerEventItem = async (id: string) => {
  const response = await fetch(`${API_BASE}/items/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }
}

import type { PortalCustodianItem } from './types'

export type SaveServerCustodianItemInput = {
  name: string
  role: string
  period: string
  tag: string
  description: string
  imageDataUrl?: string
  position?: number
}

const API_BASE = '/api/custodians'

const parseItemsPayload = (payload: unknown): PortalCustodianItem[] => {
  if (!Array.isArray(payload)) {
    return []
  }

  return payload.filter((item): item is PortalCustodianItem => {
    if (typeof item !== 'object' || item === null) {
      return false
    }

    const candidate = item as Partial<PortalCustodianItem>
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

export const fetchServerCustodianItems = async () => {
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

export const saveServerCustodianItem = async (input: SaveServerCustodianItemInput) => {
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

  const parsed = (await response.json()) as { item?: PortalCustodianItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió el custodio guardado.')
  }

  return parsed.item
}

export const removeServerCustodianItem = async (id: string) => {
  const response = await fetch(`${API_BASE}/items/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }
}

export const updateServerCustodianItem = async (id: string, input: SaveServerCustodianItemInput) => {
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

  const parsed = (await response.json()) as { item?: PortalCustodianItem }
  if (!parsed.item) {
    throw new Error('El servidor no devolvió el custodio actualizado.')
  }

  return parsed.item
}

import type { PortalEventItem } from './types'

const EVENTS_STORAGE_KEY = 'museo:events-custom-items:v1'

const MAX_CUSTOM_ITEMS = 30
const MAX_TITLE_LENGTH = 140
const MAX_SUMMARY_LENGTH = 500
const MAX_LOCATION_LENGTH = 160
const MAX_HREF_LENGTH = 500

const isBrowser = () => typeof window !== 'undefined'

const sanitizePlainText = (value: string, maxLength: number) =>
  value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, maxLength)

const isValidInternalHref = (value: string) => /^\/(?!\/)[^\s]*$/i.test(value)

const isValidExternalHref = (value: string) => {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const normalizeAndValidateHref = (value: string) => {
  const candidate = value.trim().slice(0, MAX_HREF_LENGTH)

  if (isValidInternalHref(candidate) || isValidExternalHref(candidate)) {
    return candidate
  }

  return null
}

const normalizeAndValidateStartsAt = (value: string) => {
  const candidate = value.trim()
  const date = new Date(candidate)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toISOString()
}

const parseStoredItems = (rawValue: string | null): PortalEventItem[] => {
  if (!rawValue) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(rawValue)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .map((item) => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        const candidate = item as Partial<PortalEventItem>
        if (
          typeof candidate.id !== 'string' ||
          typeof candidate.title !== 'string' ||
          typeof candidate.summary !== 'string' ||
          typeof candidate.startsAt !== 'string' ||
          typeof candidate.location !== 'string' ||
          typeof candidate.href !== 'string'
        ) {
          return null
        }

        const href = normalizeAndValidateHref(candidate.href)
        const startsAt = normalizeAndValidateStartsAt(candidate.startsAt)
        if (!href || !startsAt) {
          return null
        }

        const title = sanitizePlainText(candidate.title, MAX_TITLE_LENGTH)
        const summary = sanitizePlainText(candidate.summary, MAX_SUMMARY_LENGTH)
        const location = sanitizePlainText(candidate.location, MAX_LOCATION_LENGTH)

        if (!title || !summary || !location) {
          return null
        }

        return {
          id: candidate.id,
          title,
          summary,
          startsAt,
          location,
          href,
        } as PortalEventItem
      })
      .filter((item): item is PortalEventItem => Boolean(item))
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

export const getCustomEventItems = (): PortalEventItem[] => {
  if (!isBrowser()) {
    return []
  }

  return parseStoredItems(window.localStorage.getItem(EVENTS_STORAGE_KEY))
}

const saveCustomEventItems = (items: PortalEventItem[]) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(items))
}

type SaveCustomEventItemInput = {
  title: string
  summary: string
  startsAt: string
  location: string
  href: string
}

export const saveCustomEventItem = ({ title, summary, startsAt, location, href }: SaveCustomEventItemInput) => {
  const normalizedTitle = sanitizePlainText(title, MAX_TITLE_LENGTH)
  const normalizedSummary = sanitizePlainText(summary, MAX_SUMMARY_LENGTH)
  const normalizedLocation = sanitizePlainText(location, MAX_LOCATION_LENGTH)
  const normalizedHref = normalizeAndValidateHref(href)
  const normalizedStartsAt = normalizeAndValidateStartsAt(startsAt)

  if (!normalizedTitle || !normalizedSummary || !normalizedLocation) {
    throw new Error('Título, resumen y ubicación son obligatorios.')
  }

  if (!normalizedHref) {
    throw new Error('Debes ingresar un enlace válido (ruta interna o URL HTTPS).')
  }

  if (!normalizedStartsAt) {
    throw new Error('Debes ingresar una fecha y hora válidas para el evento.')
  }

  const newItem: PortalEventItem = {
    id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `event-${Date.now()}`,
    title: normalizedTitle,
    summary: normalizedSummary,
    startsAt: normalizedStartsAt,
    location: normalizedLocation,
    href: normalizedHref,
  }

  const updatedItems = [newItem, ...getCustomEventItems()].slice(0, MAX_CUSTOM_ITEMS)
  saveCustomEventItems(updatedItems)

  return newItem
}

export const removeCustomEventItem = (id: string) => {
  saveCustomEventItems(getCustomEventItems().filter((item) => item.id !== id))
}

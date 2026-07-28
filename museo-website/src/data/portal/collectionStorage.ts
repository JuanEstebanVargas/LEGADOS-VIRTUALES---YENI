import type { Artwork } from '../content'

const COLLECTION_STORAGE_KEY = 'museo:collection-custom-items:v1'

const MAX_CUSTOM_ITEMS = 30
const MAX_TITLE_LENGTH = 140
const MAX_ARTIST_LENGTH = 120
const MAX_YEAR_LENGTH = 40
const MAX_PERIOD_LENGTH = 80
const MAX_MEDIUM_LENGTH = 120
const MAX_HREF_LENGTH = 500
const MAX_IMAGE_DATA_URL_LENGTH = 2_800_000

const SAFE_IMAGE_DATA_URL_REGEX = /^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=\s]+$/i

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

const isSafeImageDataUrl = (value: string) => {
  if (value.length === 0 || value.length > MAX_IMAGE_DATA_URL_LENGTH) {
    return false
  }

  return SAFE_IMAGE_DATA_URL_REGEX.test(value)
}

type StoredArtwork = Artwork & { id: string; image: string; href: string }

const parseStoredItems = (rawValue: string | null): StoredArtwork[] => {
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

        const candidate = item as Partial<StoredArtwork>
        if (
          typeof candidate.id !== 'string' ||
          typeof candidate.title !== 'string' ||
          typeof candidate.artist !== 'string' ||
          typeof candidate.year !== 'string' ||
          typeof candidate.period !== 'string' ||
          typeof candidate.medium !== 'string' ||
          typeof candidate.href !== 'string' ||
          typeof candidate.image !== 'string'
        ) {
          return null
        }

        const href = normalizeAndValidateHref(candidate.href)
        if (!href || !isSafeImageDataUrl(candidate.image)) {
          return null
        }

        const title = sanitizePlainText(candidate.title, MAX_TITLE_LENGTH)
        const artist = sanitizePlainText(candidate.artist, MAX_ARTIST_LENGTH)
        const year = sanitizePlainText(candidate.year, MAX_YEAR_LENGTH)
        const period = sanitizePlainText(candidate.period, MAX_PERIOD_LENGTH)
        const medium = sanitizePlainText(candidate.medium, MAX_MEDIUM_LENGTH)

        if (!title || !artist || !year || !period || !medium) {
          return null
        }

        return {
          id: candidate.id,
          title,
          artist,
          year,
          period,
          medium,
          href,
          image: candidate.image,
          variant: '',
        }
      })
      .filter((item): item is StoredArtwork => Boolean(item))
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

export const getCustomCollectionItems = (): StoredArtwork[] => {
  if (!isBrowser()) {
    return []
  }

  return parseStoredItems(window.localStorage.getItem(COLLECTION_STORAGE_KEY))
}

const saveCustomCollectionItems = (items: StoredArtwork[]) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(items))
}

type SaveCustomCollectionItemInput = {
  title: string
  artist: string
  year: string
  period: string
  medium: string
  href: string
  imageDataUrl: string
}

export const saveCustomCollectionItem = ({ title, artist, year, period, medium, href, imageDataUrl }: SaveCustomCollectionItemInput) => {
  const normalizedTitle = sanitizePlainText(title, MAX_TITLE_LENGTH)
  const normalizedArtist = sanitizePlainText(artist, MAX_ARTIST_LENGTH)
  const normalizedYear = sanitizePlainText(year, MAX_YEAR_LENGTH)
  const normalizedPeriod = sanitizePlainText(period, MAX_PERIOD_LENGTH)
  const normalizedMedium = sanitizePlainText(medium, MAX_MEDIUM_LENGTH)
  const normalizedHref = normalizeAndValidateHref(href)
  const normalizedImageDataUrl = imageDataUrl.trim()

  if (!normalizedTitle || !normalizedArtist || !normalizedYear || !normalizedPeriod || !normalizedMedium) {
    throw new Error('Todos los campos de la obra son obligatorios.')
  }

  if (!normalizedHref) {
    throw new Error('Debes ingresar un enlace válido (ruta interna o URL HTTPS).')
  }

  if (!isSafeImageDataUrl(normalizedImageDataUrl)) {
    throw new Error('La imagen no tiene un formato permitido o excede el tamaño máximo.')
  }

  const newItem: StoredArtwork = {
    id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `collection-${Date.now()}`,
    title: normalizedTitle,
    artist: normalizedArtist,
    year: normalizedYear,
    period: normalizedPeriod,
    medium: normalizedMedium,
    href: normalizedHref,
    image: normalizedImageDataUrl,
    variant: '',
  }

  const updatedItems = [newItem, ...getCustomCollectionItems()].slice(0, MAX_CUSTOM_ITEMS)
  saveCustomCollectionItems(updatedItems)

  return newItem
}

export const removeCustomCollectionItem = (id: string) => {
  saveCustomCollectionItems(getCustomCollectionItems().filter((item) => item.id !== id))
}

export const updateCustomCollectionItem = (id: string, input: SaveCustomCollectionItemInput) => {
  const normalizedTitle = sanitizePlainText(input.title, MAX_TITLE_LENGTH)
  const normalizedArtist = sanitizePlainText(input.artist, MAX_ARTIST_LENGTH)
  const normalizedYear = sanitizePlainText(input.year, MAX_YEAR_LENGTH)
  const normalizedPeriod = sanitizePlainText(input.period, MAX_PERIOD_LENGTH)
  const normalizedMedium = sanitizePlainText(input.medium, MAX_MEDIUM_LENGTH)
  const normalizedHref = normalizeAndValidateHref(input.href)
  const normalizedImageDataUrl = input.imageDataUrl.trim()

  if (!normalizedTitle || !normalizedArtist || !normalizedYear || !normalizedPeriod || !normalizedMedium) {
    throw new Error('Todos los campos de la obra son obligatorios.')
  }

  if (!normalizedHref) {
    throw new Error('Debes ingresar un enlace válido (ruta interna o URL HTTPS).')
  }

  if (!isSafeImageDataUrl(normalizedImageDataUrl)) {
    throw new Error('La imagen no tiene un formato permitido o excede el tamaño máximo.')
  }

  const updatedItems = getCustomCollectionItems().map((item) =>
    item.id === id
      ? {
          ...item,
          title: normalizedTitle,
          artist: normalizedArtist,
          year: normalizedYear,
          period: normalizedPeriod,
          medium: normalizedMedium,
          href: normalizedHref,
          image: normalizedImageDataUrl,
        }
      : item,
  )

  saveCustomCollectionItems(updatedItems)
}

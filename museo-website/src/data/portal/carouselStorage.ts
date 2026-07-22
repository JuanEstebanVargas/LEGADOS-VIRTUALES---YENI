import type { PortalNewsItem } from './types'

const CAROUSEL_STORAGE_KEY = 'museo:carousel-custom-news:v1'
const ADMIN_AUTH_STORAGE_KEY = 'museo:carousel-admin-auth:v1'
const ADMIN_ATTEMPTS_STORAGE_KEY = 'museo:carousel-admin-attempts:v1'
const CAROUSEL_ADMIN_PASSWORD = 'YeniJuan2026'

const ADMIN_SESSION_TTL_MS = 15 * 60 * 1000
const ADMIN_MAX_FAILED_ATTEMPTS = 5
const ADMIN_LOCKOUT_MS = 10 * 60 * 1000

const MAX_CUSTOM_ITEMS = 20
const MAX_TITLE_LENGTH = 120
const MAX_SUMMARY_LENGTH = 300
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

const secureEquals = (left: string, right: string) => {
  const maxLength = Math.max(left.length, right.length)
  let mismatch = left.length ^ right.length

  for (let index = 0; index < maxLength; index += 1) {
    const leftCode = left.charCodeAt(index) || 0
    const rightCode = right.charCodeAt(index) || 0
    mismatch |= leftCode ^ rightCode
  }

  return mismatch === 0
}

type AdminSessionState = {
  authenticated: true
  issuedAt: number
}

type AdminAttemptState = {
  failedAttempts: number
  lockUntil: number
}

const parseJson = <T>(rawValue: string | null): T | null => {
  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as T
  } catch {
    return null
  }
}

const getAttemptState = (): AdminAttemptState => {
  if (!isBrowser()) {
    return { failedAttempts: 0, lockUntil: 0 }
  }

  const parsed = parseJson<Partial<AdminAttemptState>>(window.localStorage.getItem(ADMIN_ATTEMPTS_STORAGE_KEY))
  const failedAttempts = Number.isFinite(parsed?.failedAttempts) ? Number(parsed?.failedAttempts) : 0
  const lockUntil = Number.isFinite(parsed?.lockUntil) ? Number(parsed?.lockUntil) : 0

  return {
    failedAttempts: Math.max(0, failedAttempts),
    lockUntil: Math.max(0, lockUntil),
  }
}

const saveAttemptState = (state: AdminAttemptState) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(ADMIN_ATTEMPTS_STORAGE_KEY, JSON.stringify(state))
}

const clearAttemptState = () => {
  saveAttemptState({ failedAttempts: 0, lockUntil: 0 })
}

const isCurrentlyLocked = (state: AdminAttemptState, now: number) => state.lockUntil > now

const getAuthSessionState = (): AdminSessionState | null => {
  if (!isBrowser()) {
    return null
  }

  const parsed = parseJson<Partial<AdminSessionState>>(window.sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY))

  if (parsed?.authenticated !== true || typeof parsed.issuedAt !== 'number') {
    return null
  }

  return {
    authenticated: true,
    issuedAt: parsed.issuedAt,
  }
}

const saveAuthSessionState = () => {
  if (!isBrowser()) {
    return
  }

  const state: AdminSessionState = {
    authenticated: true,
    issuedAt: Date.now(),
  }

  window.sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(state))
}

const parseStoredItems = (rawValue: string | null): PortalNewsItem[] => {
  if (!rawValue) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(rawValue)
    if (!Array.isArray(parsed)) {
      return []
    }

    const sanitizedItems = parsed
      .map((item) => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        const candidate = item as Partial<PortalNewsItem>
        if (
          typeof candidate.id !== 'string' ||
          typeof candidate.title !== 'string' ||
          typeof candidate.summary !== 'string' ||
          typeof candidate.href !== 'string' ||
          typeof candidate.image !== 'string'
        ) {
          return null
        }

        const sanitizedHref = normalizeAndValidateHref(candidate.href)
        if (!sanitizedHref || !isSafeImageDataUrl(candidate.image)) {
          return null
        }

        return {
          id: candidate.id,
          title: sanitizePlainText(candidate.title, MAX_TITLE_LENGTH),
          summary: sanitizePlainText(candidate.summary, MAX_SUMMARY_LENGTH),
          ctaLabel: 'Mayor información',
          href: sanitizedHref,
          image: candidate.image,
        } as PortalNewsItem
      })
      .filter((item): item is PortalNewsItem => Boolean(item && item.title.length > 0 && item.summary.length > 0))

    return sanitizedItems.slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

export const getCustomCarouselItems = (): PortalNewsItem[] => {
  if (!isBrowser()) {
    return []
  }

  return parseStoredItems(window.localStorage.getItem(CAROUSEL_STORAGE_KEY))
}

const saveCustomCarouselItems = (items: PortalNewsItem[]) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(CAROUSEL_STORAGE_KEY, JSON.stringify(items))
}

type SaveCarouselItemInput = {
  title: string
  href: string
  imageDataUrl: string
  summary?: string
}

export const saveCustomCarouselItem = ({ title, href, imageDataUrl, summary }: SaveCarouselItemInput) => {
  const sanitizedTitle = sanitizePlainText(title, MAX_TITLE_LENGTH)
  const sanitizedSummary = sanitizePlainText(summary ?? '', MAX_SUMMARY_LENGTH)
  const sanitizedHref = normalizeAndValidateHref(href)
  const normalizedImageDataUrl = imageDataUrl.trim()

  if (!sanitizedHref) {
    throw new Error('El enlace no es válido. Solo se admite ruta interna (/ruta) o URL HTTPS.')
  }

  if (sanitizedTitle.length === 0) {
    throw new Error('El título es obligatorio.')
  }

  if (!isSafeImageDataUrl(normalizedImageDataUrl)) {
    throw new Error('La imagen no tiene un formato permitido o excede el tamaño máximo.')
  }

  const newItem: PortalNewsItem = {
    id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `custom-news-${Date.now()}`,
    title: sanitizedTitle,
    summary: sanitizedSummary.length > 0 ? sanitizedSummary : 'Contenido agregado desde el panel privado.',
    ctaLabel: 'Mayor información',
    href: sanitizedHref,
    image: normalizedImageDataUrl,
  }

  const existingItems = getCustomCarouselItems()
  const updatedItems = [newItem, ...existingItems].slice(0, MAX_CUSTOM_ITEMS)
  saveCustomCarouselItems(updatedItems)

  return newItem
}

export const removeCustomCarouselItem = (id: string) => {
  const updatedItems = getCustomCarouselItems().filter((item) => item.id !== id)
  saveCustomCarouselItems(updatedItems)
}

export const isCarouselAdminAuthenticated = () => {
  if (!isBrowser()) {
    return false
  }

  const state = getAuthSessionState()
  if (!state) {
    return false
  }

  const isExpired = Date.now() - state.issuedAt > ADMIN_SESSION_TTL_MS
  if (isExpired) {
    window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
    return false
  }

  return true
}

export const getCarouselAdminLockRemainingMs = () => {
  const state = getAttemptState()
  const now = Date.now()

  if (!isCurrentlyLocked(state, now)) {
    return 0
  }

  return state.lockUntil - now
}

type VerifyPasswordResult = {
  success: boolean
  reason?: 'INVALID_PASSWORD' | 'LOCKED'
  lockRemainingMs?: number
}

export const verifyCarouselAdminPassword = (password: string): VerifyPasswordResult => {
  const now = Date.now()
  const attemptState = getAttemptState()

  if (isCurrentlyLocked(attemptState, now)) {
    return {
      success: false,
      reason: 'LOCKED',
      lockRemainingMs: attemptState.lockUntil - now,
    }
  }

  const normalizedPassword = password.trim()
  const isValid = secureEquals(normalizedPassword, CAROUSEL_ADMIN_PASSWORD)

  if (isBrowser()) {
    if (isValid) {
      clearAttemptState()
      saveAuthSessionState()
    } else {
      window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
      const nextFailedAttempts = attemptState.failedAttempts + 1
      const mustLock = nextFailedAttempts >= ADMIN_MAX_FAILED_ATTEMPTS

      saveAttemptState({
        failedAttempts: mustLock ? 0 : nextFailedAttempts,
        lockUntil: mustLock ? now + ADMIN_LOCKOUT_MS : 0,
      })

      if (mustLock) {
        return {
          success: false,
          reason: 'LOCKED',
          lockRemainingMs: ADMIN_LOCKOUT_MS,
        }
      }
    }
  }

  if (!isValid) {
    return {
      success: false,
      reason: 'INVALID_PASSWORD',
    }
  }

  return { success: true }
}

export const clearCarouselAdminSession = () => {
  if (!isBrowser()) {
    return
  }

  window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
}

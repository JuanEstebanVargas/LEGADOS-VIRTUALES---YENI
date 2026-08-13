import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DIST_DIR = path.resolve(__dirname, 'dist')
const BASE_CONTENT_DIR = path.resolve(
  __dirname,
  '..',
  'MULTIMEDIA',
  'C5488_26-8.3 PÁGINA WEB - JUAN ESTEBAN VARGAS',
)

const HOME_PAGE_DIR = path.join(BASE_CONTENT_DIR, 'HOME_PAGE')
const COLLECTION_PAGE_DIR = path.join(BASE_CONTENT_DIR, 'COLECCION_PAGE')
const HISTORY_PAGE_DIR = path.join(BASE_CONTENT_DIR, 'HISTORIA_PAGE')

const CAROUSEL_DIR = path.join(HOME_PAGE_DIR, 'CARRUSEL')
const EVENTS_DIR = path.join(HOME_PAGE_DIR, 'EVENTOS_Y_ACTIVIDADES')
const COLLECTION_DIR = path.join(COLLECTION_PAGE_DIR, 'OBRAS_DESTACADAS')
const DIRECTORS_DIR = path.join(HISTORY_PAGE_DIR, 'DIRECTORAS')
const CUSTODIANS_DIR = path.join(HISTORY_PAGE_DIR, 'CUSTODIOS')
const PUBLIC_DIR = path.resolve(__dirname, 'public')
const SOLICITUD_DIR = path.resolve(__dirname, '..', 'MULTIMEDIA', 'SOLICITUD IMAGENES')

const SOLICITUD_FILES = {
  'tarifas-video.pdf': '2024-08-09_Tarifas y Condiciones de Video.pdf.pdf',
  'tarifas-fotografias.pdf': '2025-01-27_Tarifas y Condiciones Uso Fotografias Museo Arquidiocesano.pdf',
  'formato-solicitud.docx': '2024-08-09_Formato Solicitud Uso de Fotografia.docx.docx',
}

const CAROUSEL_METADATA_FILE = path.join(CAROUSEL_DIR, 'carousel-items.json')
const EVENTS_METADATA_FILE = path.join(EVENTS_DIR, 'events-items.json')
const COLLECTION_METADATA_FILE = path.join(COLLECTION_DIR, 'collection-items.json')
const DIRECTORS_METADATA_FILE = path.join(DIRECTORS_DIR, 'directoras-items.json')
const CUSTODIANS_METADATA_FILE = path.join(CUSTODIANS_DIR, 'custodios-items.json')

const LEGACY_CAROUSEL_METADATA_FILE = path.join(HOME_PAGE_DIR, 'carousel-items.json')
const LEGACY_EVENTS_METADATA_FILE = path.join(HOME_PAGE_DIR, 'events-items.json')

const MAX_CUSTOM_ITEMS = 20
const MAX_TITLE_LENGTH = 120
const MAX_SUMMARY_LENGTH = 300
const MAX_HREF_LENGTH = 500
const MAX_IMAGE_DATA_URL_LENGTH = 2_800_000
const MAX_LOCATION_LENGTH = 160
const MAX_ARTIST_LENGTH = 120
const MAX_YEAR_LENGTH = 40
const MAX_PERIOD_LENGTH = 80
const MAX_MEDIUM_LENGTH = 120
const MAX_NAME_LENGTH = 200
const MAX_ROLE_LENGTH = 200
const MAX_TAG_LENGTH = 200
const MAX_DESCRIPTION_LENGTH = 4000
const SAFE_IMAGE_DATA_URL_REGEX = /^data:image\/(png|jpe?g|webp|gif);base64,([a-z0-9+/=\s]+)$/i

const app = express()
app.use(express.json({ limit: '4mb' }))

const ensureDir = async (dirPath) => fs.mkdir(dirPath, { recursive: true })

const sanitizePlainText = (value, maxLength) =>
  value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, maxLength)

const isValidInternalHref = (value) => /^\/(?!\/)[^\s]*$/i.test(value)

const isValidExternalHref = (value) => {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const normalizeAndValidateHref = (value) => {
  const candidate = String(value ?? '')
    .trim()
    .slice(0, MAX_HREF_LENGTH)

  if (isValidInternalHref(candidate) || isValidExternalHref(candidate)) {
    return candidate
  }

  return null
}

const normalizeAndValidateStartsAt = (value) => {
  const candidate = String(value ?? '').trim()
  const date = new Date(candidate)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toISOString()
}

const insertItemAtPosition = (items, newItem, positionInput) => {
  const count = items.length
  const position = Number(positionInput)

  let index
  if (Number.isInteger(position) && position >= 1 && position <= count + 1) {
    index = position - 1
  } else {
    index = 0
  }

  return [...items.slice(0, index), newItem, ...items.slice(index)].slice(0, MAX_CUSTOM_ITEMS)
}

const moveItemToPosition = (items, id, positionInput) => {
  const position = Number(positionInput)
  const currentIndex = items.findIndex((item) => item.id === id)

  if (currentIndex === -1) {
    return items
  }

  if (!Number.isInteger(position) || position < 1 || position > items.length) {
    return items
  }

  const targetIndex = position - 1
  if (targetIndex === currentIndex) {
    return items
  }

  const [moved] = items.splice(currentIndex, 1)
  items.splice(targetIndex, 0, moved)
  return items
}

const readJsonArrayFromFile = async (filePath) => {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const parsed = JSON.parse(raw)

    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

const readFirstJsonArray = async (filePaths) => {
  for (const filePath of filePaths) {
    const parsed = await readJsonArrayFromFile(filePath)
    if (parsed) {
      return parsed
    }
  }

  return []
}

const parseCarouselMetadataItems = async () => {
  await ensureDir(CAROUSEL_DIR)

  try {
    const parsed = await readFirstJsonArray([CAROUSEL_METADATA_FILE, LEGACY_CAROUSEL_METADATA_FILE])

    return parsed
      .map((item) => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        const href = normalizeAndValidateHref(item.href)
        if (!href || typeof item.id !== 'string' || typeof item.imageFilename !== 'string') {
          return null
        }

        const title = sanitizePlainText(String(item.title ?? ''), MAX_TITLE_LENGTH)
        const summary = sanitizePlainText(String(item.summary ?? ''), MAX_SUMMARY_LENGTH)

        if (!title || !summary) {
          return null
        }

        return {
          id: item.id,
          title,
          summary,
          ctaLabel: 'Mayor información',
          href,
          imageFilename: item.imageFilename,
          seedKey: typeof item.seedKey === 'string' ? item.seedKey : undefined,
        }
      })
      .filter(Boolean)
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

const writeCarouselMetadataItems = async (items) => {
  await ensureDir(CAROUSEL_DIR)
  await fs.writeFile(CAROUSEL_METADATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

const parseEventsMetadataItems = async () => {
  await ensureDir(EVENTS_DIR)

  try {
    const parsed = await readFirstJsonArray([EVENTS_METADATA_FILE, LEGACY_EVENTS_METADATA_FILE])

    return parsed
      .map((item) => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        const href = normalizeAndValidateHref(item.href)
        const startsAt = normalizeAndValidateStartsAt(item.startsAt)

        if (!href || !startsAt || typeof item.id !== 'string') {
          return null
        }

        const title = sanitizePlainText(String(item.title ?? ''), MAX_TITLE_LENGTH)
        const summary = sanitizePlainText(String(item.summary ?? ''), MAX_SUMMARY_LENGTH)
        const location = sanitizePlainText(String(item.location ?? ''), MAX_LOCATION_LENGTH)

        if (!title || !summary || !location) {
          return null
        }

        return {
          id: item.id,
          title,
          summary,
          startsAt,
          location,
          href,
          seedKey: typeof item.seedKey === 'string' ? item.seedKey : undefined,
        }
      })
      .filter(Boolean)
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

const writeEventsMetadataItems = async (items) => {
  await ensureDir(EVENTS_DIR)
  await fs.writeFile(EVENTS_METADATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

const parseCollectionMetadataItems = async () => {
  await ensureDir(COLLECTION_DIR)

  try {
    const parsed = await readFirstJsonArray([COLLECTION_METADATA_FILE])

    return parsed
      .map((item) => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        const href = normalizeAndValidateHref(item.href)
        if (!href || typeof item.id !== 'string' || typeof item.imageFilename !== 'string') {
          return null
        }

        const title = sanitizePlainText(String(item.title ?? ''), MAX_TITLE_LENGTH)
        const artist = sanitizePlainText(String(item.artist ?? ''), MAX_ARTIST_LENGTH)
        const year = sanitizePlainText(String(item.year ?? ''), MAX_YEAR_LENGTH)
        const period = sanitizePlainText(String(item.period ?? ''), MAX_PERIOD_LENGTH)
        const medium = sanitizePlainText(String(item.medium ?? ''), MAX_MEDIUM_LENGTH)

        if (!title || !artist || !year || !period || !medium) {
          return null
        }

        return {
          id: item.id,
          title,
          artist,
          year,
          period,
          medium,
          href,
          imageFilename: item.imageFilename,
          variant: '',
          seedKey: typeof item.seedKey === 'string' ? item.seedKey : undefined,
        }
      })
      .filter(Boolean)
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

const writeCollectionMetadataItems = async (items) => {
  await ensureDir(COLLECTION_DIR)
  await fs.writeFile(COLLECTION_METADATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

const parseDirectorsMetadataItems = async () => {
  await ensureDir(DIRECTORS_DIR)

  try {
    const parsed = await readJsonArrayFromFile(DIRECTORS_METADATA_FILE)

    return parsed
      .map((item) => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        if (typeof item.id !== 'string' || typeof item.imageFilename !== 'string') {
          return null
        }

        const name = sanitizePlainText(String(item.name ?? ''), MAX_NAME_LENGTH)
        const role = sanitizePlainText(String(item.role ?? ''), MAX_ROLE_LENGTH)
        const period = sanitizePlainText(String(item.period ?? ''), MAX_PERIOD_LENGTH)
        const tag = sanitizePlainText(String(item.tag ?? ''), MAX_TAG_LENGTH)
        const description = sanitizePlainText(String(item.description ?? ''), MAX_DESCRIPTION_LENGTH)

        if (!name || !role || !period || !tag || !description) {
          return null
        }

        return {
          id: item.id,
          name,
          role,
          period,
          tag,
          description,
          imageFilename: item.imageFilename,
          seedKey: typeof item.seedKey === 'string' ? item.seedKey : undefined,
        }
      })
      .filter(Boolean)
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

const writeDirectorsMetadataItems = async (items) => {
  await ensureDir(DIRECTORS_DIR)
  await fs.writeFile(DIRECTORS_METADATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

const parseCustodiansMetadataItems = async () => {
  await ensureDir(CUSTODIANS_DIR)

  try {
    const parsed = await readJsonArrayFromFile(CUSTODIANS_METADATA_FILE)

    return parsed
      .map((item) => {
        if (typeof item !== 'object' || item === null) {
          return null
        }

        if (typeof item.id !== 'string' || typeof item.imageFilename !== 'string') {
          return null
        }

        const name = sanitizePlainText(String(item.name ?? ''), MAX_NAME_LENGTH)
        const role = sanitizePlainText(String(item.role ?? ''), MAX_ROLE_LENGTH)
        const period = sanitizePlainText(String(item.period ?? ''), MAX_PERIOD_LENGTH)
        const tag = sanitizePlainText(String(item.tag ?? ''), MAX_TAG_LENGTH)
        const description = sanitizePlainText(String(item.description ?? ''), MAX_DESCRIPTION_LENGTH)

        if (!name || !role || !period || !tag || !description) {
          return null
        }

        return {
          id: item.id,
          name,
          role,
          period,
          tag,
          description,
          imageFilename: item.imageFilename,
          seedKey: typeof item.seedKey === 'string' ? item.seedKey : undefined,
        }
      })
      .filter(Boolean)
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

const writeCustodiansMetadataItems = async (items) => {
  await ensureDir(CUSTODIANS_DIR)
  await fs.writeFile(CUSTODIANS_METADATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

const copyPublicImageInto = async (srcRelativePath, targetDir) => {
  const sourcePath = path.join(PUBLIC_DIR, srcRelativePath)
  const extension = path.extname(sourcePath)
  const imageFilename = `seed-${Date.now()}-${crypto.randomUUID()}${extension}`
  const targetPath = path.join(targetDir, imageFilename)

  await ensureDir(targetDir)
  await fs.copyFile(sourcePath, targetPath)
  return imageFilename
}

const toCarouselClientItem = (item) => ({
  id: item.id,
  title: item.title,
  summary: item.summary,
  ctaLabel: 'Mayor información',
  href: item.href,
  image: `/api/carousel/files/${encodeURIComponent(item.imageFilename)}`,
})

const toCollectionClientItem = (item) => ({
  id: item.id,
  title: item.title,
  artist: item.artist,
  year: item.year,
  period: item.period,
  medium: item.medium,
  href: item.href,
  image: `/api/collection/files/${encodeURIComponent(item.imageFilename)}`,
  variant: '',
})

const toDirectorClientItem = (item) => ({
  id: item.id,
  name: item.name,
  role: item.role,
  period: item.period,
  tag: item.tag,
  description: item.description,
  image: `/api/directors/files/${encodeURIComponent(item.imageFilename)}`,
})

const toCustodianClientItem = (item) => ({
  id: item.id,
  name: item.name,
  role: item.role,
  period: item.period,
  tag: item.tag,
  description: item.description,
  image: `/api/custodians/files/${encodeURIComponent(item.imageFilename)}`,
})

app.get('/api/carousel/items', async (_req, res) => {
  try {
    const items = await parseCarouselMetadataItems()
    res.json({ items: items.map(toCarouselClientItem) })
  } catch {
    res.status(500).json({ error: 'No se pudieron leer los elementos del carrusel.' })
  }
})

app.get('/api/events/items', async (_req, res) => {
  try {
    const items = await parseEventsMetadataItems()
    res.json({ items })
  } catch {
    res.status(500).json({ error: 'No se pudieron leer los eventos.' })
  }
})

app.get('/api/collection/items', async (_req, res) => {
  try {
    const items = await parseCollectionMetadataItems()
    res.json({ items: items.map(toCollectionClientItem) })
  } catch {
    res.status(500).json({ error: 'No se pudieron leer las obras de colección.' })
  }
})

app.get('/api/directors/items', async (_req, res) => {
  try {
    const items = await parseDirectorsMetadataItems()
    res.json({ items: items.map(toDirectorClientItem) })
  } catch {
    res.status(500).json({ error: 'No se pudieron leer las directoras.' })
  }
})

app.get('/api/custodians/items', async (_req, res) => {
  try {
    const items = await parseCustodiansMetadataItems()
    res.json({ items: items.map(toCustodianClientItem) })
  } catch {
    res.status(500).json({ error: 'No se pudieron leer los custodios.' })
  }
})

app.post('/api/carousel/items', async (req, res) => {
  const title = sanitizePlainText(String(req.body?.title ?? ''), MAX_TITLE_LENGTH)
  const summaryInput = sanitizePlainText(String(req.body?.summary ?? ''), MAX_SUMMARY_LENGTH)
  const href = normalizeAndValidateHref(req.body?.href)
  const imageDataUrl = String(req.body?.imageDataUrl ?? '').trim()

  if (!title) {
    res.status(400).json({ error: 'El título es obligatorio.' })
    return
  }

  if (!href) {
    res.status(400).json({ error: 'El enlace no es válido. Solo se admite ruta interna (/ruta) o URL HTTPS.' })
    return
  }

  if (imageDataUrl.length === 0 || imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
    res.status(400).json({ error: 'La imagen no tiene un tamaño permitido.' })
    return
  }

  const imageMatch = imageDataUrl.match(SAFE_IMAGE_DATA_URL_REGEX)
  if (!imageMatch) {
    res.status(400).json({ error: 'La imagen no tiene un formato permitido.' })
    return
  }

  const mime = imageMatch[1].toLowerCase()
  const base64Payload = imageMatch[2].replace(/\s/g, '')
  const extension = mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime

  try {
    const binary = Buffer.from(base64Payload, 'base64')
    if (binary.length === 0) {
      res.status(400).json({ error: 'La imagen está vacía.' })
      return
    }

    await ensureDir(CAROUSEL_DIR)

    const imageFilename = `carousel-${Date.now()}-${crypto.randomUUID()}.${extension}`
    const imagePath = path.join(CAROUSEL_DIR, imageFilename)

    await fs.writeFile(imagePath, binary)

    const existingItems = await parseCarouselMetadataItems()
    const newItem = {
      id: crypto.randomUUID(),
      title,
      summary: summaryInput || 'Contenido agregado desde el panel privado.',
      href,
      imageFilename,
    }

    const updatedItems = insertItemAtPosition(existingItems, newItem, req.body?.position)
    await writeCarouselMetadataItems(updatedItems)

    res.status(201).json({ item: toCarouselClientItem(newItem) })
  } catch {
    res.status(500).json({ error: 'No se pudo guardar la imagen en el servidor.' })
  }
})

app.post('/api/events/items', async (req, res) => {
  const title = sanitizePlainText(String(req.body?.title ?? ''), MAX_TITLE_LENGTH)
  const summary = sanitizePlainText(String(req.body?.summary ?? ''), MAX_SUMMARY_LENGTH)
  const location = sanitizePlainText(String(req.body?.location ?? ''), MAX_LOCATION_LENGTH)
  const href = normalizeAndValidateHref(req.body?.href)
  const startsAt = normalizeAndValidateStartsAt(req.body?.startsAt)

  if (!title || !summary || !location) {
    res.status(400).json({ error: 'Título, resumen y ubicación son obligatorios.' })
    return
  }

  if (!href) {
    res.status(400).json({ error: 'El enlace no es válido. Solo se admite ruta interna (/ruta) o URL HTTPS.' })
    return
  }

  if (!startsAt) {
    res.status(400).json({ error: 'La fecha/hora del evento no es válida.' })
    return
  }

  try {
    const existingItems = await parseEventsMetadataItems()

    const newItem = {
      id: crypto.randomUUID(),
      title,
      summary,
      startsAt,
      location,
      href,
    }

    const updatedItems = insertItemAtPosition(existingItems, newItem, req.body?.position)
    await writeEventsMetadataItems(updatedItems)

    res.status(201).json({ item: newItem })
  } catch {
    res.status(500).json({ error: 'No se pudo guardar el evento en el servidor.' })
  }
})

app.post('/api/collection/items', async (req, res) => {
  const title = sanitizePlainText(String(req.body?.title ?? ''), MAX_TITLE_LENGTH)
  const artist = sanitizePlainText(String(req.body?.artist ?? ''), MAX_ARTIST_LENGTH)
  const year = sanitizePlainText(String(req.body?.year ?? ''), MAX_YEAR_LENGTH)
  const period = sanitizePlainText(String(req.body?.period ?? ''), MAX_PERIOD_LENGTH)
  const medium = sanitizePlainText(String(req.body?.medium ?? ''), MAX_MEDIUM_LENGTH)
  const href = normalizeAndValidateHref(req.body?.href)
  const imageDataUrl = String(req.body?.imageDataUrl ?? '').trim()

  if (!title || !artist || !year || !period || !medium) {
    res.status(400).json({ error: 'Todos los campos de la obra son obligatorios.' })
    return
  }

  if (!href) {
    res.status(400).json({ error: 'El enlace no es válido. Solo se admite ruta interna (/ruta) o URL HTTPS.' })
    return
  }

  if (imageDataUrl.length === 0 || imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
    res.status(400).json({ error: 'La imagen no tiene un tamaño permitido.' })
    return
  }

  const imageMatch = imageDataUrl.match(SAFE_IMAGE_DATA_URL_REGEX)
  if (!imageMatch) {
    res.status(400).json({ error: 'La imagen no tiene un formato permitido.' })
    return
  }

  const mime = imageMatch[1].toLowerCase()
  const base64Payload = imageMatch[2].replace(/\s/g, '')
  const extension = mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime

  try {
    const binary = Buffer.from(base64Payload, 'base64')
    if (binary.length === 0) {
      res.status(400).json({ error: 'La imagen está vacía.' })
      return
    }

    await ensureDir(COLLECTION_DIR)

    const imageFilename = `collection-${Date.now()}-${crypto.randomUUID()}.${extension}`
    const imagePath = path.join(COLLECTION_DIR, imageFilename)

    await fs.writeFile(imagePath, binary)

    const existingItems = await parseCollectionMetadataItems()
    const newItem = {
      id: crypto.randomUUID(),
      title,
      artist,
      year,
      period,
      medium,
      href,
      imageFilename,
    }

    const updatedItems = insertItemAtPosition(existingItems, newItem, req.body?.position)
    await writeCollectionMetadataItems(updatedItems)

    res.status(201).json({ item: toCollectionClientItem(newItem) })
  } catch {
    res.status(500).json({ error: 'No se pudo guardar la obra de colección en el servidor.' })
  }
})

app.post('/api/directors/items', async (req, res) => {
  const name = sanitizePlainText(String(req.body?.name ?? ''), MAX_NAME_LENGTH)
  const role = sanitizePlainText(String(req.body?.role ?? ''), MAX_ROLE_LENGTH)
  const period = sanitizePlainText(String(req.body?.period ?? ''), MAX_PERIOD_LENGTH)
  const tag = sanitizePlainText(String(req.body?.tag ?? ''), MAX_TAG_LENGTH)
  const description = sanitizePlainText(String(req.body?.description ?? ''), MAX_DESCRIPTION_LENGTH)
  const imageDataUrl = String(req.body?.imageDataUrl ?? '').trim()

  if (!name || !role || !period || !tag || !description) {
    res.status(400).json({ error: 'Nombre, rol, periodo, etiqueta y descripción son obligatorios.' })
    return
  }

  if (imageDataUrl.length === 0 || imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
    res.status(400).json({ error: 'La imagen no tiene un tamaño permitido.' })
    return
  }

  const imageMatch = imageDataUrl.match(SAFE_IMAGE_DATA_URL_REGEX)
  if (!imageMatch) {
    res.status(400).json({ error: 'La imagen no tiene un formato permitido.' })
    return
  }

  const mime = imageMatch[1].toLowerCase()
  const base64Payload = imageMatch[2].replace(/\s/g, '')
  const extension = mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime

  try {
    const binary = Buffer.from(base64Payload, 'base64')
    if (binary.length === 0) {
      res.status(400).json({ error: 'La imagen está vacía.' })
      return
    }

    await ensureDir(DIRECTORS_DIR)

    const imageFilename = `directora-${Date.now()}-${crypto.randomUUID()}.${extension}`
    const imagePath = path.join(DIRECTORS_DIR, imageFilename)

    await fs.writeFile(imagePath, binary)

    const existingItems = await parseDirectorsMetadataItems()
    const newItem = {
      id: crypto.randomUUID(),
      name,
      role,
      period,
      tag,
      description,
      imageFilename,
    }

    const updatedItems = insertItemAtPosition(existingItems, newItem, req.body?.position)
    await writeDirectorsMetadataItems(updatedItems)

    res.status(201).json({ item: toDirectorClientItem(newItem) })
  } catch {
    res.status(500).json({ error: 'No se pudo guardar la directora en el servidor.' })
  }
})

app.post('/api/custodians/items', async (req, res) => {
  const name = sanitizePlainText(String(req.body?.name ?? ''), MAX_NAME_LENGTH)
  const role = sanitizePlainText(String(req.body?.role ?? ''), MAX_ROLE_LENGTH)
  const period = sanitizePlainText(String(req.body?.period ?? ''), MAX_PERIOD_LENGTH)
  const tag = sanitizePlainText(String(req.body?.tag ?? ''), MAX_TAG_LENGTH)
  const description = sanitizePlainText(String(req.body?.description ?? ''), MAX_DESCRIPTION_LENGTH)
  const imageDataUrl = String(req.body?.imageDataUrl ?? '').trim()

  if (!name || !role || !period || !tag || !description) {
    res.status(400).json({ error: 'Nombre, rol, periodo, etiqueta y descripción son obligatorios.' })
    return
  }

  if (imageDataUrl.length === 0 || imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
    res.status(400).json({ error: 'La imagen no tiene un tamaño permitido.' })
    return
  }

  const imageMatch = imageDataUrl.match(SAFE_IMAGE_DATA_URL_REGEX)
  if (!imageMatch) {
    res.status(400).json({ error: 'La imagen no tiene un formato permitido.' })
    return
  }

  const mime = imageMatch[1].toLowerCase()
  const base64Payload = imageMatch[2].replace(/\s/g, '')
  const extension = mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime

  try {
    const binary = Buffer.from(base64Payload, 'base64')
    if (binary.length === 0) {
      res.status(400).json({ error: 'La imagen está vacía.' })
      return
    }

    await ensureDir(CUSTODIANS_DIR)

    const imageFilename = `custodio-${Date.now()}-${crypto.randomUUID()}.${extension}`
    const imagePath = path.join(CUSTODIANS_DIR, imageFilename)

    await fs.writeFile(imagePath, binary)

    const existingItems = await parseCustodiansMetadataItems()
    const newItem = {
      id: crypto.randomUUID(),
      name,
      role,
      period,
      tag,
      description,
      imageFilename,
    }

    const updatedItems = insertItemAtPosition(existingItems, newItem, req.body?.position)
    await writeCustodiansMetadataItems(updatedItems)

    res.status(201).json({ item: toCustodianClientItem(newItem) })
  } catch {
    res.status(500).json({ error: 'No se pudo guardar el custodio en el servidor.' })
  }
})

app.put('/api/carousel/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')
  const title = sanitizePlainText(String(req.body?.title ?? ''), MAX_TITLE_LENGTH)
  const summaryInput = sanitizePlainText(String(req.body?.summary ?? ''), MAX_SUMMARY_LENGTH)
  const href = normalizeAndValidateHref(req.body?.href)
  const imageDataUrl = typeof req.body?.imageDataUrl === 'string' ? req.body.imageDataUrl.trim() : ''

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  if (!title) {
    res.status(400).json({ error: 'El título es obligatorio.' })
    return
  }

  if (!href) {
    res.status(400).json({ error: 'El enlace no es válido. Solo se admite ruta interna (/ruta) o URL HTTPS.' })
    return
  }

  try {
    const existingItems = await parseCarouselMetadataItems()
    const currentItem = existingItems.find((item) => item.id === id)

    if (!currentItem) {
      res.status(404).json({ error: 'No se encontró el elemento a actualizar.' })
      return
    }

    let imageFilename = currentItem.imageFilename

    if (imageDataUrl) {
      if (imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
        res.status(400).json({ error: 'La imagen no tiene un tamaño permitido.' })
        return
      }

      const imageMatch = imageDataUrl.match(SAFE_IMAGE_DATA_URL_REGEX)
      if (!imageMatch) {
        res.status(400).json({ error: 'La imagen no tiene un formato permitido.' })
        return
      }

      const mime = imageMatch[1].toLowerCase()
      const base64Payload = imageMatch[2].replace(/\s/g, '')
      const extension = mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime
      const binary = Buffer.from(base64Payload, 'base64')

      if (binary.length === 0) {
        res.status(400).json({ error: 'La imagen está vacía.' })
        return
      }

      const nextImageFilename = `carousel-${Date.now()}-${crypto.randomUUID()}.${extension}`
      const nextImagePath = path.join(CAROUSEL_DIR, nextImageFilename)
      await fs.writeFile(nextImagePath, binary)
      await fs.rm(path.join(CAROUSEL_DIR, currentItem.imageFilename), { force: true })
      imageFilename = nextImageFilename
    }

    const updatedRecord = {
      ...currentItem,
      title,
      summary: summaryInput || 'Contenido agregado desde el panel privado.',
      href,
      imageFilename,
    }

    const updatedItems = existingItems.map((item) => (item.id === id ? updatedRecord : item))
    const reorderedItems = moveItemToPosition(updatedItems, id, req.body?.position)
    await writeCarouselMetadataItems(reorderedItems)

    res.status(200).json({ item: toCarouselClientItem(updatedRecord) })
  } catch {
    res.status(500).json({ error: 'No se pudo actualizar el elemento del carrusel.' })
  }
})

app.put('/api/events/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')
  const title = sanitizePlainText(String(req.body?.title ?? ''), MAX_TITLE_LENGTH)
  const summary = sanitizePlainText(String(req.body?.summary ?? ''), MAX_SUMMARY_LENGTH)
  const location = sanitizePlainText(String(req.body?.location ?? ''), MAX_LOCATION_LENGTH)
  const href = normalizeAndValidateHref(req.body?.href)
  const startsAt = normalizeAndValidateStartsAt(req.body?.startsAt)

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  if (!title || !summary || !location) {
    res.status(400).json({ error: 'Título, resumen y ubicación son obligatorios.' })
    return
  }

  if (!href) {
    res.status(400).json({ error: 'El enlace no es válido. Solo se admite ruta interna (/ruta) o URL HTTPS.' })
    return
  }

  if (!startsAt) {
    res.status(400).json({ error: 'La fecha/hora del evento no es válida.' })
    return
  }

  try {
    const existingItems = await parseEventsMetadataItems()
    const currentItem = existingItems.find((item) => item.id === id)

    if (!currentItem) {
      res.status(404).json({ error: 'No se encontró el evento a actualizar.' })
      return
    }

    const updatedRecord = {
      ...currentItem,
      title,
      summary,
      location,
      href,
      startsAt,
    }

    const updatedItems = existingItems.map((item) => (item.id === id ? updatedRecord : item))
    const reorderedItems = moveItemToPosition(updatedItems, id, req.body?.position)
    await writeEventsMetadataItems(reorderedItems)

    res.status(200).json({ item: updatedRecord })
  } catch {
    res.status(500).json({ error: 'No se pudo actualizar el evento.' })
  }
})

app.put('/api/collection/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')
  const title = sanitizePlainText(String(req.body?.title ?? ''), MAX_TITLE_LENGTH)
  const artist = sanitizePlainText(String(req.body?.artist ?? ''), MAX_ARTIST_LENGTH)
  const year = sanitizePlainText(String(req.body?.year ?? ''), MAX_YEAR_LENGTH)
  const period = sanitizePlainText(String(req.body?.period ?? ''), MAX_PERIOD_LENGTH)
  const medium = sanitizePlainText(String(req.body?.medium ?? ''), MAX_MEDIUM_LENGTH)
  const href = normalizeAndValidateHref(req.body?.href)
  const imageDataUrl = typeof req.body?.imageDataUrl === 'string' ? req.body.imageDataUrl.trim() : ''

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  if (!title || !artist || !year || !period || !medium) {
    res.status(400).json({ error: 'Todos los campos de la obra son obligatorios.' })
    return
  }

  if (!href) {
    res.status(400).json({ error: 'El enlace no es válido. Solo se admite ruta interna (/ruta) o URL HTTPS.' })
    return
  }

  try {
    const existingItems = await parseCollectionMetadataItems()
    const currentItem = existingItems.find((item) => item.id === id)

    if (!currentItem) {
      res.status(404).json({ error: 'No se encontró la obra a actualizar.' })
      return
    }

    let imageFilename = currentItem.imageFilename

    if (imageDataUrl) {
      if (imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
        res.status(400).json({ error: 'La imagen no tiene un tamaño permitido.' })
        return
      }

      const imageMatch = imageDataUrl.match(SAFE_IMAGE_DATA_URL_REGEX)
      if (!imageMatch) {
        res.status(400).json({ error: 'La imagen no tiene un formato permitido.' })
        return
      }

      const mime = imageMatch[1].toLowerCase()
      const base64Payload = imageMatch[2].replace(/\s/g, '')
      const extension = mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime
      const binary = Buffer.from(base64Payload, 'base64')

      if (binary.length === 0) {
        res.status(400).json({ error: 'La imagen está vacía.' })
        return
      }

      const nextImageFilename = `collection-${Date.now()}-${crypto.randomUUID()}.${extension}`
      const nextImagePath = path.join(COLLECTION_DIR, nextImageFilename)
      await fs.writeFile(nextImagePath, binary)
      await fs.rm(path.join(COLLECTION_DIR, currentItem.imageFilename), { force: true })
      imageFilename = nextImageFilename
    }

    const updatedRecord = {
      ...currentItem,
      title,
      artist,
      year,
      period,
      medium,
      href,
      imageFilename,
    }

    const updatedItems = existingItems.map((item) => (item.id === id ? updatedRecord : item))
    const reorderedItems = moveItemToPosition(updatedItems, id, req.body?.position)
    await writeCollectionMetadataItems(reorderedItems)

    res.status(200).json({ item: toCollectionClientItem(updatedRecord) })
  } catch {
    res.status(500).json({ error: 'No se pudo actualizar la obra de colección.' })
  }
})

app.put('/api/directors/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')
  const name = sanitizePlainText(String(req.body?.name ?? ''), MAX_NAME_LENGTH)
  const role = sanitizePlainText(String(req.body?.role ?? ''), MAX_ROLE_LENGTH)
  const period = sanitizePlainText(String(req.body?.period ?? ''), MAX_PERIOD_LENGTH)
  const tag = sanitizePlainText(String(req.body?.tag ?? ''), MAX_TAG_LENGTH)
  const description = sanitizePlainText(String(req.body?.description ?? ''), MAX_DESCRIPTION_LENGTH)
  const imageDataUrl = typeof req.body?.imageDataUrl === 'string' ? req.body.imageDataUrl.trim() : ''

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  if (!name || !role || !period || !tag || !description) {
    res.status(400).json({ error: 'Nombre, rol, periodo, etiqueta y descripción son obligatorios.' })
    return
  }

  try {
    const existingItems = await parseDirectorsMetadataItems()
    const currentItem = existingItems.find((item) => item.id === id)

    if (!currentItem) {
      res.status(404).json({ error: 'No se encontró la directora a actualizar.' })
      return
    }

    let imageFilename = currentItem.imageFilename

    if (imageDataUrl) {
      if (imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
        res.status(400).json({ error: 'La imagen no tiene un tamaño permitido.' })
        return
      }

      const imageMatch = imageDataUrl.match(SAFE_IMAGE_DATA_URL_REGEX)
      if (!imageMatch) {
        res.status(400).json({ error: 'La imagen no tiene un formato permitido.' })
        return
      }

      const mime = imageMatch[1].toLowerCase()
      const base64Payload = imageMatch[2].replace(/\s/g, '')
      const extension = mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime
      const binary = Buffer.from(base64Payload, 'base64')

      if (binary.length === 0) {
        res.status(400).json({ error: 'La imagen está vacía.' })
        return
      }

      const nextImageFilename = `directora-${Date.now()}-${crypto.randomUUID()}.${extension}`
      const nextImagePath = path.join(DIRECTORS_DIR, nextImageFilename)
      await fs.writeFile(nextImagePath, binary)
      await fs.rm(path.join(DIRECTORS_DIR, currentItem.imageFilename), { force: true })
      imageFilename = nextImageFilename
    }

    const updatedRecord = {
      ...currentItem,
      name,
      role,
      period,
      tag,
      description,
      imageFilename,
    }

    const updatedItems = existingItems.map((item) => (item.id === id ? updatedRecord : item))
    const reorderedItems = moveItemToPosition(updatedItems, id, req.body?.position)
    await writeDirectorsMetadataItems(reorderedItems)

    res.status(200).json({ item: toDirectorClientItem(updatedRecord) })
  } catch {
    res.status(500).json({ error: 'No se pudo actualizar la directora.' })
  }
})

app.put('/api/custodians/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')
  const name = sanitizePlainText(String(req.body?.name ?? ''), MAX_NAME_LENGTH)
  const role = sanitizePlainText(String(req.body?.role ?? ''), MAX_ROLE_LENGTH)
  const period = sanitizePlainText(String(req.body?.period ?? ''), MAX_PERIOD_LENGTH)
  const tag = sanitizePlainText(String(req.body?.tag ?? ''), MAX_TAG_LENGTH)
  const description = sanitizePlainText(String(req.body?.description ?? ''), MAX_DESCRIPTION_LENGTH)
  const imageDataUrl = typeof req.body?.imageDataUrl === 'string' ? req.body.imageDataUrl.trim() : ''

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  if (!name || !role || !period || !tag || !description) {
    res.status(400).json({ error: 'Nombre, rol, periodo, etiqueta y descripción son obligatorios.' })
    return
  }

  try {
    const existingItems = await parseCustodiansMetadataItems()
    const currentItem = existingItems.find((item) => item.id === id)

    if (!currentItem) {
      res.status(404).json({ error: 'No se encontró el custodio a actualizar.' })
      return
    }

    let imageFilename = currentItem.imageFilename

    if (imageDataUrl) {
      if (imageDataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
        res.status(400).json({ error: 'La imagen no tiene un tamaño permitido.' })
        return
      }

      const imageMatch = imageDataUrl.match(SAFE_IMAGE_DATA_URL_REGEX)
      if (!imageMatch) {
        res.status(400).json({ error: 'La imagen no tiene un formato permitido.' })
        return
      }

      const mime = imageMatch[1].toLowerCase()
      const base64Payload = imageMatch[2].replace(/\s/g, '')
      const extension = mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime
      const binary = Buffer.from(base64Payload, 'base64')

      if (binary.length === 0) {
        res.status(400).json({ error: 'La imagen está vacía.' })
        return
      }

      const nextImageFilename = `custodio-${Date.now()}-${crypto.randomUUID()}.${extension}`
      const nextImagePath = path.join(CUSTODIANS_DIR, nextImageFilename)
      await fs.writeFile(nextImagePath, binary)
      await fs.rm(path.join(CUSTODIANS_DIR, currentItem.imageFilename), { force: true })
      imageFilename = nextImageFilename
    }

    const updatedRecord = {
      ...currentItem,
      name,
      role,
      period,
      tag,
      description,
      imageFilename,
    }

    const updatedItems = existingItems.map((item) => (item.id === id ? updatedRecord : item))
    const reorderedItems = moveItemToPosition(updatedItems, id, req.body?.position)
    await writeCustodiansMetadataItems(reorderedItems)

    res.status(200).json({ item: toCustodianClientItem(updatedRecord) })
  } catch {
    res.status(500).json({ error: 'No se pudo actualizar el custodio.' })
  }
})

app.delete('/api/carousel/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  try {
    const existingItems = await parseCarouselMetadataItems()
    const targetItem = existingItems.find((item) => item.id === id)

    if (!targetItem) {
      res.status(404).json({ error: 'No se encontró el elemento a eliminar.' })
      return
    }

    const updatedItems = existingItems.filter((item) => item.id !== id)
  await writeCarouselMetadataItems(updatedItems)

  const imagePath = path.join(CAROUSEL_DIR, targetItem.imageFilename)
    await fs.rm(imagePath, { force: true })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'No se pudo eliminar el elemento seleccionado.' })
  }
})

app.delete('/api/collection/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  try {
    const existingItems = await parseCollectionMetadataItems()
    const targetItem = existingItems.find((item) => item.id === id)

    if (!targetItem) {
      res.status(404).json({ error: 'No se encontró la obra a eliminar.' })
      return
    }

    const updatedItems = existingItems.filter((item) => item.id !== id)
    await writeCollectionMetadataItems(updatedItems)

    const imagePath = path.join(COLLECTION_DIR, targetItem.imageFilename)
    await fs.rm(imagePath, { force: true })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'No se pudo eliminar la obra seleccionada.' })
  }
})

app.delete('/api/directors/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  try {
    const existingItems = await parseDirectorsMetadataItems()
    const targetItem = existingItems.find((item) => item.id === id)

    if (!targetItem) {
      res.status(404).json({ error: 'No se encontró la directora a eliminar.' })
      return
    }

    const updatedItems = existingItems.filter((item) => item.id !== id)
    await writeDirectorsMetadataItems(updatedItems)

    const imagePath = path.join(DIRECTORS_DIR, targetItem.imageFilename)
    await fs.rm(imagePath, { force: true })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'No se pudo eliminar la directora seleccionada.' })
  }
})

app.delete('/api/custodians/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  try {
    const existingItems = await parseCustodiansMetadataItems()
    const targetItem = existingItems.find((item) => item.id === id)

    if (!targetItem) {
      res.status(404).json({ error: 'No se encontró el custodio a eliminar.' })
      return
    }

    const updatedItems = existingItems.filter((item) => item.id !== id)
    await writeCustodiansMetadataItems(updatedItems)

    const imagePath = path.join(CUSTODIANS_DIR, targetItem.imageFilename)
    await fs.rm(imagePath, { force: true })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'No se pudo eliminar el custodio seleccionado.' })
  }
})

app.delete('/api/events/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  try {
    const existingItems = await parseEventsMetadataItems()
    const targetItem = existingItems.find((item) => item.id === id)

    if (!targetItem) {
      res.status(404).json({ error: 'No se encontró el evento a eliminar.' })
      return
    }

    const updatedItems = existingItems.filter((item) => item.id !== id)
    await writeEventsMetadataItems(updatedItems)

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'No se pudo eliminar el evento seleccionado.' })
  }
})

app.get('/api/carousel/files/:filename', async (req, res) => {
  const filename = path.basename(String(req.params?.filename ?? ''))

  if (!filename) {
    res.status(404).send('Not found')
    return
  }

  const filePath = path.join(CAROUSEL_DIR, filename)
  res.sendFile(filePath, (error) => {
    if (error) {
      res.status(404).send('Not found')
    }
  })
})

app.get('/api/collection/files/:filename', async (req, res) => {
  const filename = path.basename(String(req.params?.filename ?? ''))

  if (!filename) {
    res.status(404).send('Not found')
    return
  }

  const filePath = path.join(COLLECTION_DIR, filename)
  res.sendFile(filePath, (error) => {
    if (error) {
      res.status(404).send('Not found')
    }
  })
})

app.get('/api/directors/files/:filename', async (req, res) => {
  const filename = path.basename(String(req.params?.filename ?? ''))

  if (!filename) {
    res.status(404).send('Not found')
    return
  }

  const filePath = path.join(DIRECTORS_DIR, filename)
  res.sendFile(filePath, (error) => {
    if (error) {
      res.status(404).send('Not found')
    }
  })
})

app.get('/api/custodians/files/:filename', async (req, res) => {
  const filename = path.basename(String(req.params?.filename ?? ''))

  if (!filename) {
    res.status(404).send('Not found')
    return
  }

  const filePath = path.join(CUSTODIANS_DIR, filename)
  res.sendFile(filePath, (error) => {
    if (error) {
      res.status(404).send('Not found')
    }
  })
})

app.get('/api/solicitud/files/:name', (req, res) => {
  const name = path.basename(String(req.params?.name ?? ''))
  const realName = SOLICITUD_FILES[name]

  if (!realName) {
    res.status(404).send('Not found')
    return
  }

  const filePath = path.join(SOLICITUD_DIR, realName)
  const disposition = name === 'formato-solicitud.docx' ? 'attachment' : 'inline'

  res.setHeader('Content-Disposition', `${disposition}; filename*=UTF-8''${encodeURIComponent(realName)}`)
  res.sendFile(filePath, (error) => {
    if (error) {
      res.status(404).send('Not found')
    }
  })
})

app.use(express.static(DIST_DIR))

app.use((_req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

const SEED_CAROUSEL = [
  {
    seedKey: 'carousel-reapertura-ocana',
    title: 'El Museo de la ciudad de Ocaña Antón García de Bonilla reabrió sus puertas con sus salas renovadas',
    summary:
      'El museo regional reabrió oficialmente al público como parte de los museos de la nación, con una propuesta renovada para públicos diversos.',
    href: '/programacion',
    image: '/home-sections/programacion.jpg',
  },
  {
    seedKey: 'carousel-beatriz-gonzalez',
    title: 'Dos obras de Beatriz González presentes en el Astrup Fearnley Museet de Oslo',
    summary:
      'Los suicidas del Sisga III y Retratos mudos, piezas de la colección del museo, participan en una exposición internacional.',
    href: '/investigacion',
    image: '/home-sections/investigacion.jpg',
  },
  {
    seedKey: 'carousel-pasados-retorno',
    title: 'Pasados en retorno: nuevas lecturas curatoriales en diálogo con la memoria nacional',
    summary:
      'Una propuesta expositiva y editorial que activa conversaciones entre patrimonio, ciudadanía y narrativas del presente.',
    href: '/coleccion',
    image: '/home-sections/coleccion.jpg',
  },
]

const SEED_EVENTS = [
  {
    seedKey: 'event-vuelve-al-museo',
    title: 'Vuelve al Museo',
    summary: '¡Anímate a visitarnos! Te esperamos de martes a domingo desde las 9:00 a.m. hasta las 5:00 p.m.',
    startsAt: '2026-07-05T09:00:00-05:00',
    location: 'Museo Nacional de Colombia',
    href: '/visitas',
  },
  {
    seedKey: 'event-progratate',
    title: 'Prográmate con el Museo',
    summary: 'Entérate de las charlas, conciertos, talleres y demás actividades del mes entrando a este espacio.',
    startsAt: '2026-07-12T10:00:00-05:00',
    location: 'Agenda mensual',
    href: '/programacion',
  },
  {
    seedKey: 'event-recorridos-comentados',
    title: 'Recorridos comentados de exposiciones temporales',
    summary:
      'Programación de mediación cultural para públicos generales, grupos escolares y visitantes internacionales.',
    startsAt: '2026-07-19T11:00:00-05:00',
    location: 'Salas del museo',
    href: '/coleccion',
  },
]

const SEED_COLLECTION = [
  {
    seedKey: 'collection-gloria-celestial',
    title: 'La Gloria Celestial',
    artist: 'Maestro anónimo barroco',
    year: '1680-1690',
    period: 'Barroco',
    medium: 'Fresco',
    href: '/coleccion',
    imageSrc: 'C. PESTA\u00d1A 3_MULTIMEDIA/ADORACI\u00d3N DE LAS CINCO RAZAS.jpg',
  },
  {
    seedKey: 'collection-madonna-nino',
    title: 'Madonna con el Niño',
    artist: 'Escuela renacentista',
    year: '1520',
    period: 'Renacentista',
    medium: 'Óleo sobre tabla',
    href: '/coleccion',
    imageSrc: 'C. PESTA\u00d1A 3_MULTIMEDIA/VIRGEN EL PURGATORIO.jpg',
  },
  {
    seedKey: 'collection-cartografia-memoria',
    title: 'Cartografía de la memoria',
    artist: 'Colectivo contemporáneo',
    year: '2026',
    period: 'Contemporáneo',
    medium: 'Instalación mixta',
    href: '/coleccion',
    imageSrc: 'C. PESTA\u00d1A 3_MULTIMEDIA/DOCUMENTOS .jpg',
  },
]

const SEED_DIRECTORS = [
  {
    seedKey: 'director-silvia-ayerbe',
    role: 'Primera directora · Fundadora',
    name: 'Silvia Ayerbe de Caicedo',
    period: '1972 – 1989',
    description:
      'Asumió la dirección del Museo desde su nacimiento institucional en 1972, siendo parte del grupo fundacional que transformó la visión del Arzobispo Arce Vivas en una realidad museística. Acompañó la adquisición de la sede, la restauración del inmueble entre 1976 y 1979, y la inauguración oficial en septiembre de 1979. Vivió también el momento más crítico de la institución: el terremoto del 31 de marzo de 1983, que dejó la sede gravemente averiada. Bajo su dirección, las obras fueron rescatadas y depositadas en el Banco de la República para garantizar su salvaguarda.',
    tag: 'Directora fundadora · 17 años al frente',
    image: '/hero-portada-museo.png',
  },
  {
    seedKey: 'director-maria-eugenia',
    role: 'Segunda directora',
    name: 'María Eugenia Valencia de Redondo',
    period: '1989 – 2003',
    description:
      'Ingresó al Museo como secretaria de Silvia Ayerbe de Caicedo y asumió la dirección en 1989, en pleno proceso de recuperación postsísmica. Lideró la etapa más exigente de la institución: la restauración de la colección, el retorno de las obras desde el Banco de la República y la reapertura del Museo al público. Bajo su conducción, el Museo volvió a ser un espacio vivo para la comunidad payanesa, consolidando su papel cultural y patrimonial en el suroccidente colombiano. Su labor es el puente entre el Museo que fue y el Museo que es hoy.',
    tag: 'Etapa de renacimiento · 14 años al frente',
    image: '/hero-ornamento-dorado.png',
  },
  {
    seedKey: 'director-carmen-elisa',
    role: 'Tercera directora',
    name: 'Carmen Elisa Hernández',
    period: '2004 – 2022',
    description:
      'Ingresó al Museo en 1992 como secretaria, cargo desde el cual conoció a fondo cada aspecto de la institución. Nombrada Subdirectora por el Arzobispo Iván Antonio Marín en 2002, y Directora en 2004. Condujo el Museo durante 18 años, el período más extenso de dirección en su historia. Su gestión abarcó la declaratoria como Bien de Interés Cultural de la Nación (Resolución 0395 de 2006), la actualización de los estatutos institucionales (Decreto 1.306 de 2017) y el fortalecimiento de la colección. Ejerció el cargo hasta marzo de 2022.',
    tag: 'Etapa de consolidación · 18 años al frente',
    image: '/MUSEOARTERELIGIOSOARQUIPOPAYAN-12.png',
  },
  {
    seedKey: 'director-yenifer-castano',
    role: 'Directora actual',
    name: 'Yenifer Andrea Castaño Vargas',
    period: '2022 — Presente',
    description:
      'Licenciada en Educación Artística y Cultural y magíster en Educación de la Universidad del Cauca. Asumió la dirección en marzo de 2022, inaugurando una nueva etapa marcada por la educación patrimonial crítica, la apertura comunitaria y la proyección digital del Museo. Impulsora del Plan Educativo institucional, el Laboratorio de Guías, el Seminario de Arte y Cultura Colonial y el proyecto VOCES DEL PATRIMONIO. Autora del libro Museos como espacios de transformación cultural: estrategias para la Educación Patrimonial (2025), publicación que recoge su investigación de maestría y posiciona al Museo como referente educativo nacional.',
    tag: 'Educación patrimonial · Proyección digital',
    image: '/MUSEOARTERELIGIOSOARQUIPOPAYAN-17.png',
  },
]

const SEED_CUSTODIANS = [
  {
    seedKey: 'custodian-miguel-angel-arce',
    period: '1965 – 1976',
    name: 'Mons. Miguel Ángel Arce Vivas',
    role: '32.° Arzobispo · Fundador del Museo',
    description:
      'Nacido en Popayán el 1 de marzo de 1904, hijo predilecto de la ciudad. Arzobispo de Popayán desde 1965 hasta 1976. Visionario fundador del Museo en 1972 mediante los Decretos Arzobispales 365 y 386, impulsado por su profundo amor al patrimonio artístico de la ciudad. También fue promotor del Instituto Don Bosco, del Instituto Catequístico Arquidiocesano y de la Fundación Juan del Valle. Falleció el 27 de mayo de 1987. Sus pertenencias personales reposan en una vitrina del Museo como homenaje a su legado.',
    tag: 'Fundador del Museo · 1972',
    image: '/MUSEOARTERELIGIOSOARQUIPOPAYAN-12.png',
  },
  {
    seedKey: 'custodian-samuel-buitrago',
    period: '1976 – 1990',
    name: 'Mons. Samuel Silverio Buitrago Trujillo, C.M.',
    role: '33.° Arzobispo',
    description:
      'Nacido el 21 de junio de 1930, miembro de la Congregación de la Misión. Asumió el arzobispado en el momento del mayor desafío del Museo: el terremoto del 31 de marzo de 1983, que sacudió a Popayán en 18 segundos. Su respuesta fue inmediata: junto a las instituciones nacionales, lideró el rescate de las obras del Museo y su depósito en el Banco de la República. En 1988, presidió el Comité Regional de Restauración que permitió la recuperación de la colección y del inmueble. Falleció el 11 de abril de 1990.',
    tag: 'Restauración del Museo · 1988',
    image: '/hero-cristo-caspicara.jpg',
  },
  {
    seedKey: 'custodian-alberto-giraldo',
    period: '1990 – 1997',
    name: 'Mons. Alberto Giraldo Jaramillo, P.S.S.',
    role: '34.° Arzobispo',
    description:
      'Natural de Manizales, ordenado obispo en 1974 como auxiliar del Arzobispo Arce Vivas. Designado Arzobispo de Popayán en diciembre de 1990, recibió el palio arzobispal de manos del Papa Juan Pablo II en 1991. Durante su gestión se consolidó la reapertura y normalización del Museo en la posguerra del terremoto. Fue presidente de la Conferencia Episcopal de Colombia (1996–2002). Trasladado a Medellín en 1997. Firmó los documentos de personería del Museo en 1992 y 1996.',
    tag: 'Consolidación patrimonial · 1996',
    image: '/hero-manual-marca-13.png',
  },
  {
    seedKey: 'custodian-ivan-marin',
    period: '1997 – 2018',
    name: 'Mons. Iván Antonio Marín López',
    role: '35.° Arzobispo',
    description:
      'Nacido en Jardín, Antioquia, el 13 de mayo de 1938. Licenciado en Teología por la Pontificia Universidad Javeriana. Ordenado sacerdote en 1964. El más longevo de los Arzobispos en el período del Museo: 21 años de gestión pastoral. En 2006 gestionó la Resolución 0395 que declaró el Museo Bien de Interés Cultural de la Nación. En 2017 expidió el Decreto No. 1.306, estatutos vigentes del Museo. Nombró Subdirectora a Carmen Elisa Hernández en 2002 y Directora en 2004. Arzobispo emérito desde 2018.',
    tag: 'Bien de Interés Cultural · 2006',
    image: '/hero-portada-museo.png',
  },
  {
    seedKey: 'custodian-luis-rueda',
    period: '2018 – 2020',
    name: 'Mons. Luis José Rueda Aparicio',
    role: '36.° Arzobispo',
    description:
      'Nacido en San Gil, Santander, el 3 de marzo de 1962. Ordenado sacerdote en 1989. Licenciado en Teología Moral por la Academia Alfonsiana de Roma. Arzobispo de Popayán desde julio de 2018 hasta abril de 2020, cuando el Papa Francisco lo designó Arzobispo de Bogotá y Primado de Colombia. Creado Cardenal por el Papa Francisco en septiembre de 2023. Su breve paso por la Arquidiócesis mantuvo el compromiso institucional con el Museo.',
    tag: 'Hoy Cardenal Arzobispo de Bogotá',
    image: '/hero-ornamento-dorado.png',
  },
  {
    seedKey: 'custodian-omar-alberto',
    period: '2020 — Presente',
    name: 'Mons. Omar Alberto Sánchez Cubillos, O.P.',
    role: '37.° Arzobispo · Custodio actual',
    description:
      'Nacido en Cogua, Cundinamarca, el 20 de septiembre de 1963. Miembro de la Orden de Predicadores (dominicos). Ordenado sacerdote en 1990. Doctor en Teología Dogmática por la Pontificia Universidad Santo Tomás de Roma. Nombrado Arzobispo de Popayán por el Papa Francisco el 12 de octubre de 2020; tomó posesión canónica el 12 de diciembre de 2020. Como representante legal del Museo y máximo custodio de su colección, acompaña la nueva etapa de apertura cultural, educación patrimonial y proyección digital de la institución.',
    tag: 'Representante legal · Custodio del Museo',
    image: '/MUSEOARTERELIGIOSOARQUIPOPAYAN-17.png',
  },
]

const readOrCreateItems = async (filePath, seedRecords, { needsImage = true } = {}) => {
  const existing = await readJsonArrayFromFile(filePath)
  const existingKeys = new Set(existing?.map((item) => String(item.seedKey ?? '')).filter(Boolean))
  const existingTitles = new Set(existing?.map((item) => String(item.title ?? item.name ?? '')) ?? [])
  const seedKeyOf = (seed) => String(seed.seedKey ?? seed.title ?? seed.name ?? '')

  const seedByTitleOrName = new Map(
    (seedRecords ?? []).map((seed) => [String(seed.title ?? seed.name ?? ''), String(seed.seedKey ?? '')]),
  )

  let changed = false

  const backfilled = (existing ?? []).map((item) => {
    if (item && typeof item === 'object' && !item.seedKey) {
      const matchKey = String(item.title ?? item.name ?? '')
      const backfillKey = seedByTitleOrName.get(matchKey)
      if (backfillKey) {
        changed = true
        return { ...item, seedKey: backfillKey }
      }
    }
    return item
  })

  const pendingSeeds = (seedRecords ?? []).filter((seed) => {
    const key = seedKeyOf(seed)
    return !existingKeys.has(key) && !existingTitles.has(key)
  })

  const targetDir = path.dirname(filePath)

  const items = await Promise.all(
    pendingSeeds.map(async (seed) => {
      const { image: _ignored, imageSrc: _ignoredSrc, ...rest } = seed
      if (!needsImage) {
        return { id: crypto.randomUUID(), ...rest }
      }
      const imageFilename = await copyPublicImageInto(seed.image, targetDir)
      return { id: crypto.randomUUID(), ...rest, imageFilename }
    }),
  )

  if (pendingSeeds.length === 0 && !changed) {
    return backfilled
  }

  const merged = [...items, ...backfilled].slice(0, MAX_CUSTOM_ITEMS)

  await ensureDir(targetDir)
  await fs.writeFile(filePath, JSON.stringify(merged, null, 2), 'utf8')
  return merged
}

const readOrCreateCollectionItems = async () => {
  const existing = await readJsonArrayFromFile(COLLECTION_METADATA_FILE)
  const existingKeys = new Set(existing?.map((item) => String(item.seedKey ?? '')).filter(Boolean))
  const existingTitles = new Set(existing?.map((item) => String(item.title ?? '')) ?? [])

  const seedByTitle = new Map(SEED_COLLECTION.map((seed) => [String(seed.title ?? ''), String(seed.seedKey ?? '')]))

  let changed = false

  const backfilled = (existing ?? []).map((item) => {
    if (item && typeof item === 'object' && !item.seedKey) {
      const backfillKey = seedByTitle.get(String(item.title ?? ''))
      if (backfillKey) {
        changed = true
        return { ...item, seedKey: backfillKey }
      }
    }
    return item
  })

  const pendingSeeds = SEED_COLLECTION.filter((seed) => {
    const key = String(seed.seedKey ?? seed.title ?? '')
    return !existingKeys.has(key) && !existingTitles.has(key)
  })

  const items = await Promise.all(
    pendingSeeds.map(async (seed) => {
      const imageFilename = await copyFileFromSourceDir(seed.imageSrc, COLLECTION_DIR, 'collection')
      const { imageSrc: _ignored, ...rest } = seed
      return { id: crypto.randomUUID(), ...rest, imageFilename }
    }),
  )

  if (pendingSeeds.length === 0 && !changed) {
    return backfilled
  }

  const merged = [...items, ...backfilled].slice(0, MAX_CUSTOM_ITEMS)

  await ensureDir(COLLECTION_DIR)
  await fs.writeFile(COLLECTION_METADATA_FILE, JSON.stringify(merged, null, 2), 'utf8')
  return merged
}

const copyFileFromSourceDir = async (sourceRelativePath, targetDir, prefix) => {
  const sourcePath = path.join(BASE_CONTENT_DIR, sourceRelativePath)
  const extension = path.extname(sourcePath)
  const imageFilename = `${prefix}-seed-${Date.now()}-${crypto.randomUUID()}${extension}`
  const targetPath = path.join(targetDir, imageFilename)

  await ensureDir(targetDir)
  await fs.copyFile(sourcePath, targetPath)
  return imageFilename
}

const ensureSeededData = async () => {
  await Promise.all([
    readOrCreateItems(CAROUSEL_METADATA_FILE, SEED_CAROUSEL),
    readOrCreateItems(EVENTS_METADATA_FILE, SEED_EVENTS, { needsImage: false }),
    readOrCreateCollectionItems(),
    readOrCreateItems(DIRECTORS_METADATA_FILE, SEED_DIRECTORS),
    readOrCreateItems(CUSTODIANS_METADATA_FILE, SEED_CUSTODIANS),
  ])
}

const port = Number(process.env.PORT) || 4173
app.listen(port, async () => {
  try {
    await ensureSeededData()
    console.log('Datos iniciales verificados/migrados correctamente.')
  } catch (error) {
    console.error('No se pudieron migrar los datos iniciales:', error)
  }

  console.log(`Servidor iniciado en http://localhost:${port}`)
  console.log(`Carpeta carrusel: ${CAROUSEL_DIR}`)
  console.log(`Carpeta eventos: ${EVENTS_DIR}`)
  console.log(`Carpeta colección: ${COLLECTION_DIR}`)
  console.log(`Carpeta directoras: ${DIRECTORS_DIR}`)
  console.log(`Carpeta custodios: ${CUSTODIANS_DIR}`)
})

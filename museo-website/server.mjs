import express from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DIST_DIR = path.resolve(__dirname, 'dist')
const TARGET_DIR = path.resolve(
  __dirname,
  '..',
  'MULTIMEDIA',
  'C5488_26-8.3 PÁGINA WEB - JUAN ESTEBAN VARGAS',
  'HOME_PAGE',
)
const METADATA_FILE = path.join(TARGET_DIR, 'carousel-items.json')
const EVENTS_METADATA_FILE = path.join(TARGET_DIR, 'events-items.json')

const MAX_CUSTOM_ITEMS = 20
const MAX_TITLE_LENGTH = 120
const MAX_SUMMARY_LENGTH = 300
const MAX_HREF_LENGTH = 500
const MAX_IMAGE_DATA_URL_LENGTH = 2_800_000
const MAX_LOCATION_LENGTH = 160
const SAFE_IMAGE_DATA_URL_REGEX = /^data:image\/(png|jpe?g|webp|gif);base64,([a-z0-9+/=\s]+)$/i

const app = express()
app.use(express.json({ limit: '4mb' }))

const ensureTargetDir = async () => {
  await fs.mkdir(TARGET_DIR, { recursive: true })
}

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

const parseMetadataItems = async () => {
  await ensureTargetDir()

  try {
    const raw = await fs.readFile(METADATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

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
        }
      })
      .filter(Boolean)
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

const writeMetadataItems = async (items) => {
  await ensureTargetDir()
  await fs.writeFile(METADATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

const parseEventsMetadataItems = async () => {
  await ensureTargetDir()

  try {
    const raw = await fs.readFile(EVENTS_METADATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

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
        }
      })
      .filter(Boolean)
      .slice(0, MAX_CUSTOM_ITEMS)
  } catch {
    return []
  }
}

const writeEventsMetadataItems = async (items) => {
  await ensureTargetDir()
  await fs.writeFile(EVENTS_METADATA_FILE, JSON.stringify(items, null, 2), 'utf8')
}

const toClientItem = (item) => ({
  id: item.id,
  title: item.title,
  summary: item.summary,
  ctaLabel: 'Mayor información',
  href: item.href,
  image: `/api/carousel/files/${encodeURIComponent(item.imageFilename)}`,
})

app.get('/api/carousel/items', async (_req, res) => {
  try {
    const items = await parseMetadataItems()
    res.json({ items: items.map(toClientItem) })
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

    await ensureTargetDir()

    const imageFilename = `carousel-${Date.now()}-${crypto.randomUUID()}.${extension}`
    const imagePath = path.join(TARGET_DIR, imageFilename)

    await fs.writeFile(imagePath, binary)

    const existingItems = await parseMetadataItems()
    const newItem = {
      id: crypto.randomUUID(),
      title,
      summary: summaryInput || 'Contenido agregado desde el panel privado.',
      href,
      imageFilename,
    }

    const updatedItems = [newItem, ...existingItems].slice(0, MAX_CUSTOM_ITEMS)
    await writeMetadataItems(updatedItems)

    res.status(201).json({ item: toClientItem(newItem) })
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

    const updatedItems = [newItem, ...existingItems].slice(0, MAX_CUSTOM_ITEMS)
    await writeEventsMetadataItems(updatedItems)

    res.status(201).json({ item: newItem })
  } catch {
    res.status(500).json({ error: 'No se pudo guardar el evento en el servidor.' })
  }
})

app.delete('/api/carousel/items/:id', async (req, res) => {
  const id = String(req.params?.id ?? '')

  if (!id) {
    res.status(400).json({ error: 'Debe indicar un identificador válido.' })
    return
  }

  try {
    const existingItems = await parseMetadataItems()
    const targetItem = existingItems.find((item) => item.id === id)

    if (!targetItem) {
      res.status(404).json({ error: 'No se encontró el elemento a eliminar.' })
      return
    }

    const updatedItems = existingItems.filter((item) => item.id !== id)
    await writeMetadataItems(updatedItems)

    const imagePath = path.join(TARGET_DIR, targetItem.imageFilename)
    await fs.rm(imagePath, { force: true })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'No se pudo eliminar el elemento seleccionado.' })
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

  const filePath = path.join(TARGET_DIR, filename)
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

const port = Number(process.env.PORT) || 4173
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`)
  console.log(`Carpeta de guardado del carrusel: ${TARGET_DIR}`)
})

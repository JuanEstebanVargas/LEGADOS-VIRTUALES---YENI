import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from 'react'
import {
  fetchServerCarouselItems,
  removeServerCarouselItem,
  saveServerCarouselItem,
  updateServerCarouselItem,
} from '../data/portal/carouselServerApi'
import {
  fetchServerEventItems,
  removeServerEventItem,
  saveServerEventItem,
  updateServerEventItem,
} from '../data/portal/eventsServerApi'
import {
  fetchServerCollectionItems,
  removeServerCollectionItem,
  saveServerCollectionItem,
  type CollectionServerItem,
  updateServerCollectionItem,
} from '../data/portal/collectionServerApi'
import {
  clearCarouselAdminSession,
  getCarouselAdminLockRemainingMs,
  isCarouselAdminAuthenticated,
  verifyCarouselAdminPassword,
} from '../data/portal/carouselStorage'
import { usePageTitle } from './usePageTitle'

const MAX_IMAGE_BYTES = 2 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'])

const toDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('No se pudo leer la imagen seleccionada.'))
        return
      }

      resolve(reader.result)
    }

    reader.onerror = () => reject(new Error('No se pudo leer la imagen seleccionada.'))
    reader.readAsDataURL(file)
  })

const isValidTargetLink = (value: string) => {
  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return false
  }

  if (/^\/(?!\/)/.test(trimmed)) {
    return true
  }

  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const formatMinutes = (milliseconds: number) => Math.max(1, Math.ceil(milliseconds / 60000))

const toDateTimeLocalValue = (isoDate: string) => {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const offsetMs = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16)
}

export function AdminCarouselPage() {
  usePageTitle('Administrar contenidos')
  const [activeModule, setActiveModule] = useState<'carousel' | 'events' | 'collection'>('carousel')

  const [isAuthenticated, setIsAuthenticated] = useState(isCarouselAdminAuthenticated)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [lockRemainingMs, setLockRemainingMs] = useState(getCarouselAdminLockRemainingMs)

  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [summary, setSummary] = useState('')
  const [imageDataUrl, setImageDataUrl] = useState('')
  const [imageName, setImageName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [editingCarouselId, setEditingCarouselId] = useState<string | null>(null)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [customItems, setCustomItems] = useState<Awaited<ReturnType<typeof fetchServerCarouselItems>>>([])
  const [isLoadingItems, setIsLoadingItems] = useState(false)
  const [serverStorageEnabled, setServerStorageEnabled] = useState(true)

  const [eventTitle, setEventTitle] = useState('')
  const [eventSummary, setEventSummary] = useState('')
  const [eventStartsAt, setEventStartsAt] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventLink, setEventLink] = useState('')
  const [isSavingEvent, setIsSavingEvent] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [eventsFormError, setEventsFormError] = useState('')
  const [eventsFormSuccess, setEventsFormSuccess] = useState('')
  const [customEventItems, setCustomEventItems] = useState<Awaited<ReturnType<typeof fetchServerEventItems>>>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)

  const [collectionTitle, setCollectionTitle] = useState('')
  const [collectionArtist, setCollectionArtist] = useState('')
  const [collectionYear, setCollectionYear] = useState('')
  const [collectionPeriod, setCollectionPeriod] = useState('')
  const [collectionMedium, setCollectionMedium] = useState('')
  const [collectionLink, setCollectionLink] = useState('')
  const [collectionImageDataUrl, setCollectionImageDataUrl] = useState('')
  const [collectionImageName, setCollectionImageName] = useState('')
  const [isSavingCollection, setIsSavingCollection] = useState(false)
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null)
  const [collectionFormError, setCollectionFormError] = useState('')
  const [collectionFormSuccess, setCollectionFormSuccess] = useState('')
  const [customCollectionItems, setCustomCollectionItems] = useState<CollectionServerItem[]>([])
  const [isLoadingCollection, setIsLoadingCollection] = useState(false)
  const isLocked = lockRemainingMs > 0

  const lockMessage = useMemo(() => {
    if (!isLocked) {
      return ''
    }

    return `Acceso bloqueado temporalmente. Intenta de nuevo en ${formatMinutes(lockRemainingMs)} minuto(s).`
  }, [isLocked, lockRemainingMs])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    let isMounted = true
    setIsLoadingItems(true)
    setIsLoadingEvents(true)
    setIsLoadingCollection(true)

    const loadItems = async () => {
      try {
        const serverItems = await fetchServerCarouselItems()
        if (!isMounted) {
          return
        }

        setCustomItems(serverItems)
        setServerStorageEnabled(true)
      } catch {
        if (!isMounted) {
          return
        }

        setCustomItems([])
        setServerStorageEnabled(false)
      }

      try {
        const serverEvents = await fetchServerEventItems()
        if (!isMounted) {
          return
        }

        setCustomEventItems(serverEvents)
      } catch {
        if (!isMounted) {
          return
        }

        setCustomEventItems([])
      }

      try {
        const serverCollection = await fetchServerCollectionItems()
        if (!isMounted) {
          return
        }

        setCustomCollectionItems(serverCollection)
      } catch {
        if (!isMounted) {
          return
        }

        setCustomCollectionItems([])
      } finally {
        if (isMounted) {
          setIsLoadingItems(false)
          setIsLoadingEvents(false)
          setIsLoadingCollection(false)
        }
      }
    }

    void loadItems()

    return () => {
      isMounted = false
    }
  }, [isAuthenticated])

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = verifyCarouselAdminPassword(password)
    if (!result.success) {
      if (result.reason === 'LOCKED') {
        const nextRemainingMs = result.lockRemainingMs ?? getCarouselAdminLockRemainingMs()
        setLockRemainingMs(nextRemainingMs)
        setPasswordError(`Acceso bloqueado temporalmente. Intenta de nuevo en ${formatMinutes(nextRemainingMs)} minuto(s).`)
        return
      }

      setPasswordError('Contraseña incorrecta. Intenta de nuevo.')
      return
    }

    setPassword('')
    setPasswordError('')
    setLockRemainingMs(0)
    setIsAuthenticated(true)
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setFormError('')
    setFormSuccess('')

    const selectedFile = event.target.files?.[0]
    if (!selectedFile) {
      setImageDataUrl('')
      setImageName('')
      return
    }

    if (!ALLOWED_IMAGE_TYPES.has(selectedFile.type.toLowerCase())) {
      setFormError('Solo se permiten archivos de imagen.')
      event.target.value = ''
      setImageDataUrl('')
      setImageName('')
      return
    }

    if (selectedFile.size > MAX_IMAGE_BYTES) {
      setFormError('La imagen excede el tamaño máximo permitido de 2 MB.')
      event.target.value = ''
      setImageDataUrl('')
      setImageName('')
      return
    }

    try {
      const dataUrl = await toDataUrl(selectedFile)
      setImageDataUrl(dataUrl)
      setImageName(selectedFile.name)
    } catch {
      setFormError('No fue posible procesar la imagen.')
      setImageDataUrl('')
      setImageName('')
    }
  }

  const handleCollectionImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setCollectionFormError('')
    setCollectionFormSuccess('')

    const selectedFile = event.target.files?.[0]
    if (!selectedFile) {
      setCollectionImageDataUrl('')
      setCollectionImageName('')
      return
    }

    if (!ALLOWED_IMAGE_TYPES.has(selectedFile.type.toLowerCase())) {
      setCollectionFormError('Solo se permiten archivos de imagen.')
      event.target.value = ''
      setCollectionImageDataUrl('')
      setCollectionImageName('')
      return
    }

    if (selectedFile.size > MAX_IMAGE_BYTES) {
      setCollectionFormError('La imagen excede el tamaño máximo permitido de 2 MB.')
      event.target.value = ''
      setCollectionImageDataUrl('')
      setCollectionImageName('')
      return
    }

    try {
      const dataUrl = await toDataUrl(selectedFile)
      setCollectionImageDataUrl(dataUrl)
      setCollectionImageName(selectedFile.name)
    } catch {
      setCollectionFormError('No fue posible procesar la imagen de la colección.')
      setCollectionImageDataUrl('')
      setCollectionImageName('')
    }
  }

  const resetCarouselForm = () => {
    setTitle('')
    setLink('')
    setSummary('')
    setImageDataUrl('')
    setImageName('')
    setEditingCarouselId(null)
  }

  const resetEventForm = () => {
    setEventTitle('')
    setEventSummary('')
    setEventStartsAt('')
    setEventLocation('')
    setEventLink('')
    setEditingEventId(null)
  }

  const resetCollectionForm = () => {
    setCollectionTitle('')
    setCollectionArtist('')
    setCollectionYear('')
    setCollectionPeriod('')
    setCollectionMedium('')
    setCollectionLink('')
    setCollectionImageDataUrl('')
    setCollectionImageName('')
    setEditingCollectionId(null)
  }

  const startEditCarousel = (id: string) => {
    const target = customItems.find((item) => item.id === id)
    if (!target) {
      return
    }

    setEditingCarouselId(id)
    setTitle(target.title)
    setLink(target.href)
    setSummary(target.summary)
    setImageDataUrl(target.image)
    setImageName('')
    setFormError('')
    setFormSuccess('')
  }

  const startEditEvent = (id: string) => {
    const target = customEventItems.find((item) => item.id === id)
    if (!target) {
      return
    }

    setEditingEventId(id)
    setEventTitle(target.title)
    setEventSummary(target.summary)
    setEventStartsAt(toDateTimeLocalValue(target.startsAt))
    setEventLocation(target.location)
    setEventLink(target.href)
    setEventsFormError('')
    setEventsFormSuccess('')
  }

  const startEditCollection = (id: string) => {
    const target = customCollectionItems.find((item) => item.id === id)
    if (!target) {
      return
    }

    setEditingCollectionId(id)
    setCollectionTitle(target.title)
    setCollectionArtist(target.artist)
    setCollectionYear(target.year)
    setCollectionPeriod(target.period)
    setCollectionMedium(target.medium)
    setCollectionLink(target.href)
    setCollectionImageDataUrl(target.image)
    setCollectionImageName('')
    setCollectionFormError('')
    setCollectionFormSuccess('')
  }

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')
    setFormSuccess('')

    if (title.trim().length === 0) {
      setFormError('Debes ingresar un título para el contenido del carrusel.')
      return
    }

    if (!isValidTargetLink(link)) {
      setFormError('Debes ingresar un enlace válido. Usa una URL completa o una ruta interna que empiece por /.')
      return
    }

    if (!imageDataUrl && !editingCarouselId) {
      setFormError('Debes seleccionar una imagen para el carrusel.')
      return
    }

    setIsSaving(true)

    try {
      if (editingCarouselId) {
        await updateServerCarouselItem(editingCarouselId, {
          title,
          href: link,
          imageDataUrl: imageName ? imageDataUrl : undefined,
          summary,
        })
      } else {
        await saveServerCarouselItem({
          title,
          href: link,
          imageDataUrl,
          summary,
        })
      }

      const serverItems = await fetchServerCarouselItems()
      setCustomItems(serverItems)
      setServerStorageEnabled(true)
      setFormSuccess(editingCarouselId ? 'Elemento actualizado correctamente.' : 'Contenido guardado en el servidor. Ya aparecerá en el carrusel del inicio.')
      resetCarouselForm()
    } catch (error) {
      setServerStorageEnabled(false)
      setFormError(error instanceof Error ? error.message : 'No fue posible guardar el contenido en el servidor.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setFormError('')
    setFormSuccess('')

    try {
      await removeServerCarouselItem(id)
      const serverItems = await fetchServerCarouselItems()
      setCustomItems(serverItems)
      setServerStorageEnabled(true)
      setFormSuccess('Elemento eliminado del carrusel.')
    } catch (error) {
      setServerStorageEnabled(false)
      setFormError(error instanceof Error ? error.message : 'No fue posible eliminar el elemento en el servidor.')
    }
  }

  const handleLogout = () => {
    clearCarouselAdminSession()
    setIsAuthenticated(false)
    setPassword('')
    setPasswordError('')
    setFormSuccess('')
    setFormError('')
      setEventsFormSuccess('')
    setEventsFormError('')
    setCollectionFormSuccess('')
    setCollectionFormError('')
      resetCarouselForm()
      resetEventForm()
      resetCollectionForm()
  }

  const handleSaveEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEventsFormError('')
    setEventsFormSuccess('')

    if (eventTitle.trim().length === 0 || eventSummary.trim().length === 0 || eventLocation.trim().length === 0) {
      setEventsFormError('Debes completar título, resumen y ubicación.')
      return
    }

    if (!isValidTargetLink(eventLink)) {
      setEventsFormError('Debes ingresar un enlace válido. Usa una URL HTTPS o una ruta interna que empiece por /.')
      return
    }

    if (eventStartsAt.trim().length === 0) {
      setEventsFormError('Debes indicar fecha y hora del evento.')
      return
    }

    setIsSavingEvent(true)

    try {
      if (editingEventId) {
        await updateServerEventItem(editingEventId, {
          title: eventTitle,
          summary: eventSummary,
          startsAt: eventStartsAt,
          location: eventLocation,
          href: eventLink,
        })
      } else {
        await saveServerEventItem({
          title: eventTitle,
          summary: eventSummary,
          startsAt: eventStartsAt,
          location: eventLocation,
          href: eventLink,
        })
      }

      const serverEvents = await fetchServerEventItems()
      setCustomEventItems(serverEvents)
      setEventsFormSuccess(editingEventId ? 'Evento actualizado correctamente.' : 'Evento guardado en el servidor. Ya aparecerá en “Eventos y Actividades”.')
      resetEventForm()
    } catch (error) {
      setServerStorageEnabled(false)
      setEventsFormError(error instanceof Error ? error.message : 'No fue posible guardar el evento en el servidor.')
    } finally {
      setIsSavingEvent(false)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    setEventsFormError('')
    setEventsFormSuccess('')

    try {
      await removeServerEventItem(id)
      const serverEvents = await fetchServerEventItems()
      setCustomEventItems(serverEvents)
      setEventsFormSuccess('Evento eliminado correctamente.')
    } catch (error) {
      setServerStorageEnabled(false)
      setEventsFormError(error instanceof Error ? error.message : 'No fue posible eliminar el evento.')
    }
  }

  const handleSaveCollection = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCollectionFormError('')
    setCollectionFormSuccess('')

    if (
      collectionTitle.trim().length === 0 ||
      collectionArtist.trim().length === 0 ||
      collectionYear.trim().length === 0 ||
      collectionPeriod.trim().length === 0 ||
      collectionMedium.trim().length === 0
    ) {
      setCollectionFormError('Debes completar todos los campos de la obra.')
      return
    }

    if (!isValidTargetLink(collectionLink)) {
      setCollectionFormError('Debes ingresar un enlace válido. Usa una URL HTTPS o una ruta interna que empiece por /.')
      return
    }

    if (!collectionImageDataUrl && !editingCollectionId) {
      setCollectionFormError('Debes cargar una imagen para la obra.')
      return
    }

    setIsSavingCollection(true)

    try {
      if (editingCollectionId) {
        await updateServerCollectionItem(editingCollectionId, {
          title: collectionTitle,
          artist: collectionArtist,
          year: collectionYear,
          period: collectionPeriod,
          medium: collectionMedium,
          href: collectionLink,
          imageDataUrl: collectionImageName ? collectionImageDataUrl : undefined,
        })
      } else {
        await saveServerCollectionItem({
          title: collectionTitle,
          artist: collectionArtist,
          year: collectionYear,
          period: collectionPeriod,
          medium: collectionMedium,
          href: collectionLink,
          imageDataUrl: collectionImageDataUrl,
        })
      }

      const serverCollection = await fetchServerCollectionItems()
      setCustomCollectionItems(serverCollection)
      setCollectionFormSuccess(editingCollectionId ? 'Obra actualizada correctamente.' : 'Obra guardada en el servidor. Ya aparece en la Colección.')
      resetCollectionForm()
    } catch (error) {
      setServerStorageEnabled(false)
      setCollectionFormError(error instanceof Error ? error.message : 'No fue posible guardar la obra de colección.')
    } finally {
      setIsSavingCollection(false)
    }
  }

  const handleDeleteCollection = async (id: string) => {
    setCollectionFormError('')
    setCollectionFormSuccess('')

    try {
      await removeServerCollectionItem(id)
      const serverCollection = await fetchServerCollectionItems()
      setCustomCollectionItems(serverCollection)
      setCollectionFormSuccess('Obra eliminada correctamente.')
    } catch (error) {
      setServerStorageEnabled(false)
      setCollectionFormError(error instanceof Error ? error.message : 'No fue posible eliminar la obra.')
    }
  }

  if (!isAuthenticated) {
    return (
      <main id="main-content" className="portal-main">
        <div className="o-container admin-carousel">
          <section className="admin-carousel__card" aria-label="Acceso privado para carrusel">
            <h1 className="admin-carousel__title">Acceso privado</h1>
            <p className="admin-carousel__text">
              Esta ruta requiere contraseña para administrar las imágenes y enlaces del carrusel principal.
            </p>

            <form className="admin-carousel__form" onSubmit={handleLoginSubmit}>
              <label htmlFor="admin-password">Contraseña</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                maxLength={60}
                required
              />

              {lockMessage ? <p className="admin-carousel__error">{lockMessage}</p> : null}
              {passwordError ? <p className="admin-carousel__error">{passwordError}</p> : null}

              <button className="admin-carousel__button" type="submit" disabled={isLocked}>
                Ingresar
              </button>
            </form>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="portal-main">
      <div className="o-container admin-carousel o-stack o-stack--lg">
        <section className="admin-carousel__card">
          <div className="admin-carousel__header-row">
            <h1 className="admin-carousel__title">Administración de contenidos</h1>
            <button className="admin-carousel__button admin-carousel__button--secondary" type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>

          <p className="admin-carousel__meta">
            {serverStorageEnabled
              ? 'Modo servidor activo: los datos se guardan en carpetas separadas por módulo.'
              : 'No hay conexión con el backend. Revisa el servidor para guardar en carpeta física.'}
          </p>

          <div className="admin-modules-nav" role="tablist" aria-label="Seleccionar módulo de administración">
            <button
              type="button"
              role="tab"
              aria-selected={activeModule === 'carousel'}
              className={`admin-modules-nav__button${activeModule === 'carousel' ? ' is-active' : ''}`}
              onClick={() => setActiveModule('carousel')}
            >
              Home · Carrusel
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeModule === 'events'}
              className={`admin-modules-nav__button${activeModule === 'events' ? ' is-active' : ''}`}
              onClick={() => setActiveModule('events')}
            >
              Home · Eventos
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeModule === 'collection'}
              className={`admin-modules-nav__button${activeModule === 'collection' ? ' is-active' : ''}`}
              onClick={() => setActiveModule('collection')}
            >
              Colección · Obras
            </button>
          </div>
        </section>

        {activeModule === 'carousel' ? (
          <>
            <section className="admin-carousel__card admin-module admin-module--carousel" aria-label="Panel de administración del carrusel">
              <span className="admin-module__tag">Módulo 1 · Home Carrusel</span>

              <p className="admin-carousel__text">
                Desde aquí puedes agregar una nueva imagen y su enlace. La información se guarda en el servidor.
              </p>

              <form className="admin-carousel__form" onSubmit={handleSave}>
                {editingCarouselId ? <p className="admin-carousel__meta">Editando elemento existente.</p> : null}
                <label htmlFor="carousel-title">Título</label>
                <input id="carousel-title" type="text" maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} required />

                <label htmlFor="carousel-link">Enlace (URL completa o ruta interna)</label>
                <input id="carousel-link" type="text" maxLength={500} placeholder="/programacion o https://..." value={link} onChange={(event) => setLink(event.target.value)} required />

                <label htmlFor="carousel-summary">Resumen (opcional)</label>
                <textarea id="carousel-summary" rows={3} maxLength={300} value={summary} onChange={(event) => setSummary(event.target.value)} />

                <label htmlFor="carousel-image">Imagen</label>
                <input id="carousel-image" type="file" accept="image/*" onChange={handleImageChange} required={!editingCarouselId} />
                {imageName ? <p className="admin-carousel__meta">Archivo seleccionado: {imageName}</p> : null}
                {editingCarouselId ? <p className="admin-carousel__meta">Si no seleccionas imagen nueva, se conserva la actual.</p> : null}

                {imageDataUrl ? <img className="admin-carousel__preview" src={imageDataUrl} alt="Vista previa de la imagen" /> : null}

                {formError ? <p className="admin-carousel__error">{formError}</p> : null}
                {formSuccess ? <p className="admin-carousel__success">{formSuccess}</p> : null}

                <button className="admin-carousel__button" type="submit" disabled={isSaving}>
                  {isSaving ? 'Guardando...' : editingCarouselId ? 'Actualizar carrusel' : 'Guardar en carrusel'}
                </button>
                {editingCarouselId ? (
                  <button className="admin-carousel__button admin-carousel__button--secondary" type="button" onClick={resetCarouselForm}>
                    Cancelar edición
                  </button>
                ) : null}
              </form>
            </section>

            <section className="admin-carousel__card admin-module admin-module--carousel" aria-label="Elementos personalizados guardados">
              <h2 className="admin-carousel__subtitle">Elementos personalizados guardados</h2>

              {isLoadingItems ? <p className="admin-carousel__text">Cargando elementos del servidor...</p> : null}

              {!isLoadingItems && customItems.length === 0 ? (
                <p className="admin-carousel__text">Aún no hay elementos personalizados.</p>
              ) : (
                <ul className="admin-carousel__list">
                  {customItems.map((item) => (
                    <li key={item.id} className="admin-carousel__item">
                      <img className="admin-carousel__thumb" src={item.image} alt={item.title} />
                      <div className="admin-carousel__item-content">
                        <h3>{item.title}</h3>
                        <p>{item.href}</p>
                      </div>
                      <button
                        type="button"
                        className="admin-carousel__button admin-carousel__button--secondary"
                        onClick={() => startEditCarousel(item.id)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="admin-carousel__button admin-carousel__button--danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        ) : null}

        {activeModule === 'events' ? (
          <>
            <section className="admin-carousel__card admin-module admin-module--events" aria-label="Panel de administración de eventos y actividades">
              <span className="admin-module__tag">Módulo 2 · Home Eventos y Actividades</span>
              <h2 className="admin-carousel__subtitle">Eventos y Actividades (Home)</h2>
              <p className="admin-carousel__text">
                Agrega eventos para la sección “EVENTOS Y ACTIVIDADES” del inicio.
              </p>

              <form className="admin-carousel__form" onSubmit={handleSaveEvent}>
                {editingEventId ? <p className="admin-carousel__meta">Editando evento existente.</p> : null}
                <label htmlFor="event-title">Título del evento</label>
                <input id="event-title" type="text" maxLength={140} value={eventTitle} onChange={(event) => setEventTitle(event.target.value)} required />

                <label htmlFor="event-summary">Resumen</label>
                <textarea id="event-summary" rows={3} maxLength={500} value={eventSummary} onChange={(event) => setEventSummary(event.target.value)} required />

                <label htmlFor="event-starts-at">Fecha y hora</label>
                <input id="event-starts-at" type="datetime-local" value={eventStartsAt} onChange={(event) => setEventStartsAt(event.target.value)} required />

                <label htmlFor="event-location">Ubicación</label>
                <input id="event-location" type="text" maxLength={160} value={eventLocation} onChange={(event) => setEventLocation(event.target.value)} required />

                <label htmlFor="event-link">Enlace (URL HTTPS o ruta interna)</label>
                <input id="event-link" type="text" maxLength={500} placeholder="/programacion o https://..." value={eventLink} onChange={(event) => setEventLink(event.target.value)} required />

                {eventsFormError ? <p className="admin-carousel__error">{eventsFormError}</p> : null}
                {eventsFormSuccess ? <p className="admin-carousel__success">{eventsFormSuccess}</p> : null}

                <button className="admin-carousel__button" type="submit" disabled={isSavingEvent}>
                  {isSavingEvent ? 'Guardando...' : editingEventId ? 'Actualizar evento' : 'Guardar evento'}
                </button>
                {editingEventId ? (
                  <button className="admin-carousel__button admin-carousel__button--secondary" type="button" onClick={resetEventForm}>
                    Cancelar edición
                  </button>
                ) : null}
              </form>
            </section>

            <section className="admin-carousel__card admin-module admin-module--events" aria-label="Eventos personalizados guardados">
              <h2 className="admin-carousel__subtitle">Eventos guardados</h2>

              {isLoadingEvents ? <p className="admin-carousel__text">Cargando eventos del servidor...</p> : null}

              {!isLoadingEvents && customEventItems.length === 0 ? (
                <p className="admin-carousel__text">Aún no hay eventos personalizados.</p>
              ) : (
                <ul className="admin-carousel__list">
                  {customEventItems.map((item) => (
                    <li key={item.id} className="admin-carousel__item">
                      <div className="admin-carousel__item-content">
                        <h3>{item.title}</h3>
                        <p>{new Date(item.startsAt).toLocaleString('es-CO')}</p>
                        <p>{item.location}</p>
                        <p>{item.href}</p>
                      </div>
                      <button
                        type="button"
                        className="admin-carousel__button admin-carousel__button--secondary"
                        onClick={() => startEditEvent(item.id)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="admin-carousel__button admin-carousel__button--danger"
                        onClick={() => handleDeleteEvent(item.id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        ) : null}

        {activeModule === 'collection' ? (
          <>
            <section className="admin-carousel__card admin-module admin-module--collection" aria-label="Panel de administración de colección">
              <span className="admin-module__tag">Módulo 3 · Colección / Obras</span>
              <h2 className="admin-carousel__subtitle">ColecciónPage · Obras destacadas</h2>
              <p className="admin-carousel__text">
                Agrega obras con imagen para la página de colección.
              </p>

              <form className="admin-carousel__form" onSubmit={handleSaveCollection}>
                {editingCollectionId ? <p className="admin-carousel__meta">Editando obra existente.</p> : null}
                <label htmlFor="collection-title">Título de la obra</label>
                <input id="collection-title" type="text" maxLength={140} value={collectionTitle} onChange={(event) => setCollectionTitle(event.target.value)} required />

                <label htmlFor="collection-artist">Autor</label>
                <input id="collection-artist" type="text" maxLength={120} value={collectionArtist} onChange={(event) => setCollectionArtist(event.target.value)} required />

                <label htmlFor="collection-year">Año</label>
                <input id="collection-year" type="text" maxLength={40} value={collectionYear} onChange={(event) => setCollectionYear(event.target.value)} required />

                <label htmlFor="collection-period">Periodo</label>
                <input id="collection-period" type="text" maxLength={80} value={collectionPeriod} onChange={(event) => setCollectionPeriod(event.target.value)} required />

                <label htmlFor="collection-medium">Técnica / Medio</label>
                <input id="collection-medium" type="text" maxLength={120} value={collectionMedium} onChange={(event) => setCollectionMedium(event.target.value)} required />

                <label htmlFor="collection-link">Enlace (URL HTTPS o ruta interna)</label>
                <input id="collection-link" type="text" maxLength={500} placeholder="/coleccion o https://..." value={collectionLink} onChange={(event) => setCollectionLink(event.target.value)} required />

                <label htmlFor="collection-image">Imagen de la obra</label>
                <input id="collection-image" type="file" accept="image/*" onChange={handleCollectionImageChange} required={!editingCollectionId} />
                {collectionImageName ? <p className="admin-carousel__meta">Archivo seleccionado: {collectionImageName}</p> : null}
                {editingCollectionId ? <p className="admin-carousel__meta">Si no seleccionas imagen nueva, se conserva la actual.</p> : null}

                {collectionImageDataUrl ? <img className="admin-carousel__preview" src={collectionImageDataUrl} alt="Vista previa de la obra" /> : null}

                {collectionFormError ? <p className="admin-carousel__error">{collectionFormError}</p> : null}
                {collectionFormSuccess ? <p className="admin-carousel__success">{collectionFormSuccess}</p> : null}

                <button className="admin-carousel__button" type="submit" disabled={isSavingCollection}>
                  {isSavingCollection ? 'Guardando...' : editingCollectionId ? 'Actualizar obra' : 'Guardar obra'}
                </button>
                {editingCollectionId ? (
                  <button className="admin-carousel__button admin-carousel__button--secondary" type="button" onClick={resetCollectionForm}>
                    Cancelar edición
                  </button>
                ) : null}
              </form>
            </section>

            <section className="admin-carousel__card admin-module admin-module--collection" aria-label="Obras personalizadas guardadas">
              <h2 className="admin-carousel__subtitle">Obras guardadas</h2>

              {isLoadingCollection ? <p className="admin-carousel__text">Cargando obras de colección...</p> : null}

              {!isLoadingCollection && customCollectionItems.length === 0 ? (
                <p className="admin-carousel__text">Aún no hay obras personalizadas.</p>
              ) : (
                <ul className="admin-carousel__list">
                  {customCollectionItems.map((item) => (
                    <li key={item.id} className="admin-carousel__item">
                      <img className="admin-carousel__thumb" src={item.image} alt={item.title} />
                      <div className="admin-carousel__item-content">
                        <h3>{item.title}</h3>
                        <p>{item.artist}</p>
                        <p>{item.year} · {item.period}</p>
                        <p>{item.medium}</p>
                        <p>{item.href}</p>
                      </div>
                      <button
                        type="button"
                        className="admin-carousel__button admin-carousel__button--secondary"
                        onClick={() => startEditCollection(item.id)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="admin-carousel__button admin-carousel__button--danger"
                        onClick={() => handleDeleteCollection(item.id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        ) : null}
      </div>
    </main>
  )
}

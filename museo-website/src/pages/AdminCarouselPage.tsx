import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from 'react'
import {
  fetchServerCarouselItems,
  removeServerCarouselItem,
  saveServerCarouselItem,
} from '../data/portal/carouselServerApi'
import {
  fetchServerEventItems,
  removeServerEventItem,
  saveServerEventItem,
} from '../data/portal/eventsServerApi'
import {
  getCustomEventItems,
  removeCustomEventItem,
  saveCustomEventItem,
} from '../data/portal/eventsStorage'
import {
  clearCarouselAdminSession,
  getCarouselAdminLockRemainingMs,
  getCustomCarouselItems,
  isCarouselAdminAuthenticated,
  removeCustomCarouselItem,
  saveCustomCarouselItem,
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

export function AdminCarouselPage() {
  usePageTitle('Administrar carrusel')

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
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [customItems, setCustomItems] = useState(getCustomCarouselItems)
  const [isLoadingItems, setIsLoadingItems] = useState(false)
  const [serverStorageEnabled, setServerStorageEnabled] = useState(true)

  const [eventTitle, setEventTitle] = useState('')
  const [eventSummary, setEventSummary] = useState('')
  const [eventStartsAt, setEventStartsAt] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventLink, setEventLink] = useState('')
  const [isSavingEvent, setIsSavingEvent] = useState(false)
  const [eventsFormError, setEventsFormError] = useState('')
  const [eventsFormSuccess, setEventsFormSuccess] = useState('')
  const [customEventItems, setCustomEventItems] = useState(getCustomEventItems)
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
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

        setCustomItems(getCustomCarouselItems())
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

        setCustomEventItems(getCustomEventItems())
      } finally {
        if (isMounted) {
          setIsLoadingItems(false)
          setIsLoadingEvents(false)
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

    if (!imageDataUrl) {
      setFormError('Debes seleccionar una imagen para el carrusel.')
      return
    }

    setIsSaving(true)

    try {
      await saveServerCarouselItem({
        title,
        href: link,
        imageDataUrl,
        summary,
      })

      const serverItems = await fetchServerCarouselItems()
      setCustomItems(serverItems)
      setServerStorageEnabled(true)

      setTitle('')
      setLink('')
      setSummary('')
      setImageDataUrl('')
      setImageName('')
      setFormSuccess('Contenido guardado en el servidor. Ya aparecerá en el carrusel del inicio.')
    } catch (error) {
      try {
        saveCustomCarouselItem({
          title,
          href: link,
          imageDataUrl,
          summary,
        })
        setCustomItems(getCustomCarouselItems())
        setServerStorageEnabled(false)
        setTitle('')
        setLink('')
        setSummary('')
        setImageDataUrl('')
        setImageName('')
        setFormSuccess('Servidor no disponible. El contenido quedó guardado localmente en este navegador.')
      } catch {
        setFormError(error instanceof Error ? error.message : 'No fue posible guardar el contenido en el servidor.')
      }
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
      removeCustomCarouselItem(id)
      setCustomItems(getCustomCarouselItems())
      setServerStorageEnabled(false)
      setFormError(error instanceof Error ? `${error.message} Se eliminó solo la copia local.` : 'No fue posible eliminar el elemento en el servidor.')
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
      await saveServerEventItem({
        title: eventTitle,
        summary: eventSummary,
        startsAt: eventStartsAt,
        location: eventLocation,
        href: eventLink,
      })

      const serverEvents = await fetchServerEventItems()
      setCustomEventItems(serverEvents)

      setEventTitle('')
      setEventSummary('')
      setEventStartsAt('')
      setEventLocation('')
      setEventLink('')
      setEventsFormSuccess('Evento guardado en el servidor. Ya aparecerá en “Eventos y Actividades”.')
    } catch (error) {
      try {
        saveCustomEventItem({
          title: eventTitle,
          summary: eventSummary,
          startsAt: eventStartsAt,
          location: eventLocation,
          href: eventLink,
        })
        setCustomEventItems(getCustomEventItems())
        setServerStorageEnabled(false)
        setEventTitle('')
        setEventSummary('')
        setEventStartsAt('')
        setEventLocation('')
        setEventLink('')
        setEventsFormSuccess('Servidor no disponible. El evento quedó guardado localmente en este navegador.')
      } catch {
        setEventsFormError(error instanceof Error ? error.message : 'No fue posible guardar el evento en el servidor.')
      }
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
      removeCustomEventItem(id)
      setCustomEventItems(getCustomEventItems())
      setServerStorageEnabled(false)
      setEventsFormError(error instanceof Error ? `${error.message} Se eliminó solo la copia local.` : 'No fue posible eliminar el evento.')
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
        <section className="admin-carousel__card" aria-label="Panel de administración del carrusel">
          <div className="admin-carousel__header-row">
            <h1 className="admin-carousel__title">Administración de carrusel</h1>
            <button className="admin-carousel__button admin-carousel__button--secondary" type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>

          <p className="admin-carousel__text">
            Desde aquí puedes agregar una nueva imagen y su enlace. La información se guarda en el servidor.
          </p>

          <p className="admin-carousel__meta">
            {serverStorageEnabled
              ? 'Modo servidor activo: los datos se guardan en la carpeta HOME_PAGE del servidor.'
              : 'No hay conexión con el backend. Revisa el servidor para guardar en carpeta física.'}
          </p>

          <form className="admin-carousel__form" onSubmit={handleSave}>
            <label htmlFor="carousel-title">Título</label>
            <input id="carousel-title" type="text" maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} required />

            <label htmlFor="carousel-link">Enlace (URL completa o ruta interna)</label>
            <input id="carousel-link" type="text" maxLength={500} placeholder="/programacion o https://..." value={link} onChange={(event) => setLink(event.target.value)} required />

            <label htmlFor="carousel-summary">Resumen (opcional)</label>
            <textarea id="carousel-summary" rows={3} maxLength={300} value={summary} onChange={(event) => setSummary(event.target.value)} />

            <label htmlFor="carousel-image">Imagen</label>
            <input id="carousel-image" type="file" accept="image/*" onChange={handleImageChange} required />
            {imageName ? <p className="admin-carousel__meta">Archivo seleccionado: {imageName}</p> : null}

            {imageDataUrl ? <img className="admin-carousel__preview" src={imageDataUrl} alt="Vista previa de la imagen" /> : null}

            {formError ? <p className="admin-carousel__error">{formError}</p> : null}
            {formSuccess ? <p className="admin-carousel__success">{formSuccess}</p> : null}

            <button className="admin-carousel__button" type="submit" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar en carrusel'}
            </button>
          </form>
        </section>

        <section className="admin-carousel__card" aria-label="Elementos personalizados guardados">
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

        <section className="admin-carousel__card" aria-label="Panel de administración de eventos y actividades">
          <h2 className="admin-carousel__subtitle">Eventos y Actividades (Home)</h2>
          <p className="admin-carousel__text">
            Agrega eventos para la sección “EVENTOS Y ACTIVIDADES” del inicio.
          </p>

          <form className="admin-carousel__form" onSubmit={handleSaveEvent}>
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
              {isSavingEvent ? 'Guardando...' : 'Guardar evento'}
            </button>
          </form>
        </section>

        <section className="admin-carousel__card" aria-label="Eventos personalizados guardados">
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
      </div>
    </main>
  )
}

import { useEffect, useState } from 'react'
import { ArtworkCard } from '../components/artwork/ArtworkCard'
import { HeroCarousel } from '../components/layout/HeroCarousel'
import { SolicitudImagenesModal } from '../components/solicitud/SolicitudImagenesModal'
import { useGlobalCarouselItems } from '../hooks/useGlobalCarouselItems'
import type { Artwork } from '../data/content'
import { collectionTechniques, featuredArtworks } from '../data/content'
import { fetchServerCollectionItems } from '../data/portal/collectionServerApi'
import { TechniqueIcon } from './SectionElements'
import { usePageTitle } from './usePageTitle'

export function ColeccionPage() {
  usePageTitle('Colección')
  const carouselItems = useGlobalCarouselItems()
  const [artworks, setArtworks] = useState<Artwork[]>(featuredArtworks)
  const [solicitudAbierta, setSolicitudAbierta] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadCollection = async () => {
      try {
        const serverItems = await fetchServerCollectionItems()
        if (!isMounted) {
          return
        }

        setArtworks(serverItems)
      } catch {
        if (!isMounted) {
          return
        }

        setArtworks(featuredArtworks)
      }
    }

    void loadCollection()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSolicitarImagenes = () => {
    setSolicitudAbierta(true)
  }

  return (
    <main id="main-content" className="section-page-main">
      <HeroCarousel
        items={carouselItems}
        title="Colección"
        kicker="Museo Arquidiocesano de Popayán"
        description="Técnicas, obras destacadas y patrimonios que reúnen cuatro siglos de arte religioso del suroccidente colombiano."
        contentAlign="left"
        actions={[
          {
            label: 'Solicitar imágenes de la colección',
            variant: 'primary',
            onClick: handleSolicitarImagenes,
          },
        ]}
      />

      <section className="content-section" id="coleccion">
        <div className="tecnicas-grid">
          {collectionTechniques.map((technique) => (
            <article className="tecnica-item" key={technique.title}>
              <div className="tecnica-icon" aria-hidden="true">
                <TechniqueIcon icon={technique.icon} />
              </div>
              <div className="tecnica-nom">{technique.title}</div>
              <div className="tecnica-desc">{technique.description}</div>
            </article>
          ))}
        </div>

        <div className="artwork-grid">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id ?? `${artwork.title}-${artwork.year}`} artwork={artwork} />
          ))}
        </div>

        <div className="coleccion-action">
          <p className="coleccion-action-note">
            ¿Te interesa obtener imágenes de las obras de la colección para un proyecto académico, editorial o
            audiovisual?
          </p>
          <button
            type="button"
            className="button button--accent"
            onClick={() => setSolicitudAbierta(true)}
          >
            <span className="button-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M4 6a2 2 0 0 1 2-2h3.5l1.5 2H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M8 13h8M8 9.5h5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            Solicitar imágenes de la colección
          </button>
        </div>
      </section>

      <SolicitudImagenesModal isOpen={solicitudAbierta} onClose={() => setSolicitudAbierta(false)} />
    </main>
  )
}

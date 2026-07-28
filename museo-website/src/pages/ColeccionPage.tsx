import { useEffect, useState } from 'react'
import { ArtworkCard } from '../components/artwork/ArtworkCard'
import type { Artwork } from '../data/content'
import { collectionTechniques, featuredArtworks } from '../data/content'
import { fetchServerCollectionItems } from '../data/portal/collectionServerApi'
import { TechniqueIcon } from './SectionElements'
import { usePageTitle } from './usePageTitle'

export function ColeccionPage() {
  usePageTitle('Colección')
  const [artworks, setArtworks] = useState<Artwork[]>(featuredArtworks)

  useEffect(() => {
    let isMounted = true

    const loadCollection = async () => {
      try {
        const serverItems = await fetchServerCollectionItems()
        if (!isMounted) {
          return
        }

        setArtworks([...serverItems, ...featuredArtworks])
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

  return (
    <main id="main-content" className="section-page-main">
      <section className="content-section" id="coleccion">
        <div className="section-heading section-heading-compact">
          <h1>Colección, técnicas y obras destacadas</h1>
        </div>

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
      </section>
    </main>
  )
}

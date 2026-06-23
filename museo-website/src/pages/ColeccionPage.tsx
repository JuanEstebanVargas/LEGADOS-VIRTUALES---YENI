import { ArtworkCard } from '../components/artwork/ArtworkCard'
import { collectionTechniques, featuredArtworks } from '../data/content'
import { TechniqueIcon } from './SectionElements'
import { usePageTitle } from './usePageTitle'

export function ColeccionPage() {
  usePageTitle('Colección')

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
          {featuredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.title} artwork={artwork} />
          ))}
        </div>
      </section>
    </main>
  )
}

import { institutionalValues, storyBlocks } from '../data/content'
import { HeroCarousel } from '../components/layout/HeroCarousel'
import { useGlobalCarouselItems } from '../hooks/useGlobalCarouselItems'
import { getPreviewText } from './sectionUtils'
import { usePageTitle } from './usePageTitle'

export function MuseoPage() {
  usePageTitle('El Museo')
  const carouselItems = useGlobalCarouselItems()

  return (
    <main id="main-content" className="section-page-main">
      <HeroCarousel
        items={carouselItems}
        title="El Museo"
        kicker="Museo Arquidiocesano de Popayán"
        description="El Museo Arquidiocesano de Arte Religioso de Popayán resguarda cuatro siglos de memoria visual del suroccidente colombiano."
        contentAlign="left"
        actions={[
          { label: 'Historia', href: '/historia', variant: 'ghost' },
          { label: 'Ver la colección', href: '/coleccion', variant: 'primary' },
        ]}
      />

      <section className="content-section" id="museo">
        <div className="descripcion-destacada">
          <p>
            El Museo Arquidiocesano de Arte Religioso de Popayán resguarda cuatro siglos de memoria visual del suroccidente colombiano.
          </p>
          <p>
            La colección habita una casona del siglo XVIII, proyectada por Marcelino Pérez de Arroyo y declarada Bien de Interés Cultural de la Nación.
          </p>
          <p>
            Pintura, escultura, orfebrería y textiles de los siglos XVI al XIX conectan el pasado colonial con las preguntas del presente.
          </p>
        </div>

        <div className="manifiesto-box">
          <blockquote>
            Cuatro siglos de pincel y gubia hablan en estas paredes. No como monumentos congelados, sino como

            ¿quién nombró estas imágenes? ¿A quiénes sirvieron? ¿Qué dicen hoy, desde el sur, desde lo colectivo, desde lo que aún no ha sido dicho? El Museo es el lugar donde esas preguntas tienen espacio, donde el patrimonio deja de ser propiedad de unos pocos y se convierte en conversación de muchos.
          </blockquote>
          <div className="firma">Propósito cultural — Museo Arquidiocesano de Arte Religioso · Popayán</div>
        </div>

        <div className="mv-grid mv-grid-compact">
          {storyBlocks.map((block, index) => (
            <details className="mv-card mv-accordion" key={block.title} open={index === 0}>
              <summary>
                <div>
                  <div className="mv-label">{block.title}</div>
                  <p className="accordion-preview">{getPreviewText(block.description, 135)}</p>
                </div>
                <span className="accordion-action"></span>
              </summary>
              <p>{block.description}</p>
            </details>
          ))}
        </div>

        <div className="section-heading section-heading-compact">
          <h2>Valores institucionales</h2>
        </div>

        <div className="valores-grid valores-grid-compact">
          {institutionalValues.map((value) => (
            <article className="valor-card valor-card-compact" key={value.number}>
              <div className="valor-head">
                <div className="valor-num">{value.number}</div>
                <div className="valor-nom">{value.title}</div>
              </div>
              <div className="valor-desc valor-desc-compact">{value.description}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

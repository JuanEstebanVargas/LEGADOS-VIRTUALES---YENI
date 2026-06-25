import { SectionSummary } from './SectionElements'
import { usePageTitle } from './usePageTitle'

const PublicationTypeIcon = ({ type }: { type: 'book' | 'document' }) => {
  if (type === 'book') {
    return (
      <svg viewBox="0 0 24 24" role="presentation" focusable="false">
        <path d="M6.5 4.5h9a2.5 2.5 0 0 1 2.5 2.5v11.2a1.3 1.3 0 0 1-1.9 1.2l-1.3-.7a1.7 1.7 0 0 0-1.6 0l-1.3.7a1.3 1.3 0 0 1-1.2 0l-1.3-.7a1.7 1.7 0 0 0-1.6 0l-1.3.7A1.3 1.3 0 0 1 5 18.2V6a1.5 1.5 0 0 1 1.5-1.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8.2 8.2h6.6M8.2 11.4h6.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <path d="M7 4.8h7.3l3.7 3.7v9.7a1.8 1.8 0 0 1-1.8 1.8H7a1.8 1.8 0 0 1-1.8-1.8V6.6A1.8 1.8 0 0 1 7 4.8Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14.3 4.8v3.1a.9.9 0 0 0 .9.9h2.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.6 12h6.8M8.6 15.1h6.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

const ExternalResearchIcon = ({ type }: { type: 'heritage' | 'accessibility' | 'studies' }) => {
  switch (type) {
    case 'heritage':
      return (
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <path d="M4.5 10h15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6.2 10v7.2M9.8 10v7.2M14.2 10v7.2M17.8 10v7.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4.6 17.2h14.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 4.8 4.8 8.2h14.4L12 4.8Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'accessibility':
      return (
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <circle cx="12.6" cy="5.8" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12.6 8.2v3.4m0 0 3.8.8m-3.8-.8-3.4 2.2m3.2.2 1.7 3.8m-5.2-5.7a3.2 3.2 0 1 0 3.4 5.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.8 9.2h4.1m9.6 0h1" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <rect x="5.2" y="4.8" width="10.8" height="14.2" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.2 8.2h4.8M8.2 11.2h4.8M8.2 14.2h3.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M16.2 7.4h2.6a1 1 0 0 1 1 1v10.2a1 1 0 0 1-1 1h-9.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
  }
}

export function InvestigacionPage() {
  usePageTitle('Investigación')

  return (
    <main id="main-content" className="section-page-main">
      <section className="content-section" id="investigacion">
        <div className="section-heading section-heading-compact">
          <h1>Investigación y publicaciones</h1>
        </div>

        <SectionSummary
          title="Investigación"
          what="Un repositorio en crecimiento con producción editorial del Museo y bibliografía especializada externa."
          audience="Investigadores, docentes, estudiantes universitarios y equipos de mediación cultural."
          action="Consultar publicaciones institucionales, revisar referencias clave y dar seguimiento al catálogo académico."
        />

        <div className="program-accordion-list">
          <details className="program-axis-card program-axis-card-wide" open>
            <summary>
              <div>
                <div className="program-axis-id">Publicaciones institucionales propias</div>
                <h2>Producción editorial del Museo</h2>
                <p className="accordion-preview">Libros y lineamientos vigentes para educación patrimonial y actividades académicas.</p>
              </div>
              <span className="accordion-action">Ver detalle</span>
            </summary>

            <ul className="program-axis-list">
              <li>
                <span className="investigacion-publication-icon" aria-hidden="true">
                  <PublicationTypeIcon type="book" />
                </span>
                <strong>Museos como espacios de transformación cultural: estrategias para la Educación Patrimonial.</strong><br />
                Yenifer Andrea Castaño Vargas · Arquidiócesis de Popayán · Museo Arquidiocesano · 2025.
              </li>
              <li>
                <span className="investigacion-publication-icon" aria-hidden="true">
                  <PublicationTypeIcon type="document" />
                </span>
                <strong>Guía de Lineamientos para Actividades Académicas y de Exhibición.</strong><br />
                Yenifer Andrea Castaño Vargas · Documento institucional vigente · Museo Arquidiocesano · 2025.
              </li>
            </ul>
          </details>

          <details className="program-axis-card program-axis-card-wide">
            <summary>
              <div>
                <div className="program-axis-id">Investigaciones externas</div>
                <h2>Bibliografía y estudios en actualización</h2>
                <p className="accordion-preview">Selección académica sobre la colección y el inmueble, en proceso de curaduría editorial.</p>
              </div>
              <span className="accordion-action">Ver detalle</span>
            </summary>

            <p>
              Esta sección reúne referencias académicas relevantes sobre la colección y la sede histórica del Museo. El catálogo digital se amplía de forma progresiva para garantizar una publicación ordenada y contextualizada.
            </p>

            <ul className="program-axis-list">
              <li>
                <span className="investigacion-publication-icon" aria-hidden="true">
                  <ExternalResearchIcon type="heritage" />
                </span>
                <strong>Las casas rojas de la Ciudad Blanca: aportes desde lo patrimonial.</strong><br />
                Incluye análisis de la sede del Museo y del papel de Marcelino Pérez de Arroyo · Referencia académica.
              </li>
              <li>
                <span className="investigacion-publication-icon" aria-hidden="true">
                  <ExternalResearchIcon type="accessibility" />
                </span>
                <strong>Accesibilidad PcD en el Museo Arquidiocesano de Arte Religioso.</strong><br />
                Tania Marcela Ibarra Ruano · Universidad del Cauca · Programa de Turismo · 2024.
              </li>
              <li>
                <span className="investigacion-publication-icon" aria-hidden="true">
                  <ExternalResearchIcon type="studies" />
                </span>
                <strong>Artículos y estudios sobre obras de la colección.</strong><br />
                Investigadores de Universidad del Cauca, Unicolmayor y otras instituciones · Catálogo en actualización.
              </li>
            </ul>
          </details>
        </div>
      </section>
    </main>
  )
}

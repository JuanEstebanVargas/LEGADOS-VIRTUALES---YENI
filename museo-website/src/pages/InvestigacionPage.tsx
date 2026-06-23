import { SectionSummary } from './SectionElements'
import { usePageTitle } from './usePageTitle'

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
                📗 <strong>Museos como espacios de transformación cultural: estrategias para la Educación Patrimonial.</strong><br />
                Yenifer Andrea Castaño Vargas · Arquidiócesis de Popayán · Museo Arquidiocesano · 2025.
              </li>
              <li>
                📄 <strong>Guía de Lineamientos para Actividades Académicas y de Exhibición.</strong><br />
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
                🏛 <strong>Las casas rojas de la Ciudad Blanca: aportes desde lo patrimonial.</strong><br />
                Incluye análisis de la sede del Museo y del papel de Marcelino Pérez de Arroyo · Referencia académica.
              </li>
              <li>
                ♿ <strong>Accesibilidad PcD en el Museo Arquidiocesano de Arte Religioso.</strong><br />
                Tania Marcela Ibarra Ruano · Universidad del Cauca · Programa de Turismo · 2024.
              </li>
              <li>
                📚 <strong>Artículos y estudios sobre obras de la colección.</strong><br />
                Investigadores de Universidad del Cauca, Unicolmayor y otras instituciones · Catálogo en actualización.
              </li>
            </ul>
          </details>
        </div>
      </section>
    </main>
  )
}

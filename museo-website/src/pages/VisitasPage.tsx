import {
  visitAccessibilityIntro,
  visitAccessibilityNote,
  visitAccessibilityPoints,
  visitInfoSections,
  visitRegulationRows,
} from '../data/content'
import { usePageTitle } from './usePageTitle'

type VisitasPageProps = {
  whatsappHref: string
}

export function VisitasPage({ whatsappHref }: VisitasPageProps) {
  usePageTitle('Visitas')

  const scheduleSection = visitInfoSections.find((section) => section.title === 'Horarios de atención')
  const ratesSection = visitInfoSections.find((section) => section.title === 'Tarifas de ingreso')
  const locationSection = visitInfoSections.find((section) => section.title === 'Cómo llegar')

  const todaySchedule = (() => {
    if (!scheduleSection) {
      return 'Consulta horarios actualizados en taquilla.'
    }

    const day = new Date().getDay()

    if (day === 0) {
      return scheduleSection.rows.find((row) => row.label === 'Domingos y festivos')?.value ?? 'Cerrado'
    }

    if (day === 6) {
      return scheduleSection.rows.find((row) => row.label === 'Sábados')?.value ?? '9:00 a.m. – 2:00 p.m.'
    }

    return scheduleSection.rows.find((row) => row.label === 'Lunes – Viernes')?.value ?? '8:00 a.m. – 12:30 p.m. · 2:00 p.m. – 5:00 p.m.'
  })()

  const generalRate = ratesSection?.rows.find((row) => row.label === 'Público general')?.value ?? 'Consultar en taquilla'
  const shortAddress = locationSection?.rows.find((row) => row.label === 'Dirección')?.value.split('–')[0].trim() ?? 'Centro Histórico de Popayán'

  return (
    <main id="main-content" className="section-page-main">
      <section className="content-section" id="visitas">
        <div className="section-heading section-heading-compact">
          <h1>Horarios, ubicación, accesibilidad y planificación de la visita</h1>
        </div>

        <article className="visit-planner-card" aria-label="Planifica tu visita">
          <div className="visit-planner-head">
            <p className="visit-planner-kicker">Información rápida</p>
            <h2>Planifica tu visita</h2>
          </div>

          <div className="visit-planner-grid">
            <div className="visit-planner-item">
              <span className="visit-planner-label">Horario de hoy</span>
              <span className="visit-planner-value">{todaySchedule}</span>
            </div>
            <div className="visit-planner-item">
              <span className="visit-planner-label">Tarifa general</span>
              <span className="visit-planner-value">{generalRate}</span>
            </div>
            <div className="visit-planner-item">
              <span className="visit-planner-label">Dirección</span>
              <span className="visit-planner-value">{shortAddress}</span>
            </div>
          </div>

          <div className="hero-actions visit-planner-actions">
            <a className="button visit-planner-cta visit-planner-cta-directions" href="#como-llegar">
              <span className="visit-planner-cta-icon" aria-hidden="true">
                ⌖
              </span>
              <span className="visit-planner-cta-copy">
                <span className="visit-planner-cta-title">Cómo llegar</span>
                <span className="visit-planner-cta-subtitle">Ver mapa y ruta sugerida</span>
              </span>
            </a>
            <a
              className="button visit-planner-cta visit-planner-cta-whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="visit-planner-cta-icon" aria-hidden="true">
                ✆
              </span>
              <span className="visit-planner-cta-copy">
                <span className="visit-planner-cta-title">Escribir por WhatsApp</span>
                <span className="visit-planner-cta-subtitle">Recibir apoyo para tu visita</span>
              </span>
            </a>
          </div>
        </article>

        <div className="visit-accordion-list">
          {visitInfoSections
            .filter((section) => section.title !== 'Cómo llegar')
            .map((section) => (
              <details className="visit-detail-card" key={section.title} open={section.title === 'Horarios de atención'}>
                <summary>
                  <div>
                    <h2>{section.title}</h2>
                    <p className="accordion-preview">{section.preview}</p>
                  </div>
                  <span className="accordion-action">Ver detalle</span>
                </summary>

                <div className="visit-rows">
                  {section.rows.map((row) => (
                    <div className="visit-row" key={`${section.title}-${row.label}`}>
                      <span className="visit-lbl">{row.label}</span>
                      <span className="visit-val">{row.value}</span>
                    </div>
                  ))}
                </div>
              </details>
            ))}

          <details className="visit-detail-card" open>
            <summary>
              <div>
                <h2>Reglamento de visita</h2>
                <p className="accordion-preview">Fotografía, alimentos, grupos y lineamientos generales de recorrido.</p>
              </div>
              <span className="accordion-action">Ver detalle</span>
            </summary>

            <div className="visit-rows">
              {visitRegulationRows.map((row) => (
                <div className="visit-row" key={`reglamento-${row.label}`}>
                  <span className="visit-lbl">{row.label}</span>
                  <span className="visit-val">{row.value}</span>
                </div>
              ))}
            </div>
          </details>

          <details className="visit-detail-card">
            <summary>
              <div>
                <h2>Accesibilidad</h2>
                <p className="accordion-preview">Condiciones actuales de acceso y apoyos para distintos perfiles de visitantes.</p>
              </div>
              <span className="accordion-action">Ver detalle</span>
            </summary>

            <p className="visit-access-intro">{visitAccessibilityIntro}</p>

            <div className="visit-access-grid">
              {visitAccessibilityPoints.map((point) => (
                <article className="visit-access-item" key={point.title}>
                  <span className="visit-access-icon" aria-hidden="true">
                    {point.icon}
                  </span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="nota visit-note">
              <p>{visitAccessibilityNote}</p>
            </div>
          </details>

          {visitInfoSections
            .filter((section) => section.title === 'Cómo llegar')
            .map((section) => (
              <details className="visit-detail-card visit-detail-card-wide" key={section.title} open id="como-llegar">
                <summary>
                  <div>
                    <h2>{section.title}</h2>
                    <p className="accordion-preview">{section.preview}</p>
                  </div>
                  <span className="accordion-action">Ver detalle</span>
                </summary>

                <div className="visit-rows">
                  {section.rows.map((row) => (
                    <div className="visit-row" key={`${section.title}-${row.label}`}>
                      <span className="visit-lbl">{row.label}</span>
                      <span className="visit-val">{row.value}</span>
                    </div>
                  ))}
                </div>

                {section.mapEmbedUrl ? (
                  <div className="visit-map-embed-wrap">
                    <iframe
                      className="visit-map-embed"
                      title={`Mapa de ${section.title}`}
                      src={section.mapEmbedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : null}

                {section.mapUrl ? (
                  <a className="visit-map-link" href={section.mapUrl} target="_blank" rel="noopener noreferrer">
                    Ver ubicación en Google Maps
                  </a>
                ) : null}
              </details>
            ))}
        </div>
      </section>
    </main>
  )
}

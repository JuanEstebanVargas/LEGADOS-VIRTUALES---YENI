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
          <h1>Horarios y planifica tu visita</h1>
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
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" focusable="false">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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
                  <span className="accordion-action"></span>
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
              <span className="accordion-action"></span>
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
              <span className="accordion-action"></span>
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
                  <span className="accordion-action"></span>
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

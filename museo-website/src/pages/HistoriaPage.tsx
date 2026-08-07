import { custodianEntries, historyTimeline, leadershipEntries, legalMilestones } from '../data/content'
import { usePageTitle } from './usePageTitle'

export function HistoriaPage() {
  usePageTitle('Historia')

  return (
    <main id="main-content" className="section-page-main">
      <section className="content-section" id="historia">
        <div className="section-heading section-heading-compact">
          <h1>Historia del museo</h1>
        </div>

        <div className="historia-resumen-grid">
          <article className="historia-mini-card">
            <h2>Origen</h2>
            <p>Desde 1546, los templos de Popayán reúnen obras sacras que luego conforman el acervo del Museo.</p>
          </article>
          <article className="historia-mini-card">
            <h2>Sede histórica</h2>
            <p>
              La casa proyectada por Marcelino Pérez de Arroyo resume el “Estilo Popayán” y hoy es parte central de la narrativa patrimonial.
            </p>
          </article>
          <article className="historia-mini-card">
            <h2>Fundación y etapa actual</h2>
            <p>El Museo se crea formalmente en 1972, atraviesa restauración y hoy fortalece su enfoque educativo y digital.</p>
          </article>
        </div>

        <div className="timeline timeline-compact">
          {historyTimeline.map((entry) => (
            <article className="tl-item tl-item-compact" key={`${entry.year}-${entry.title}`}>
              <div className="tl-dot" aria-hidden="true" />
              <div className="tl-anio">{entry.year}</div>
              <div className="tl-titulo">{entry.title}</div>
              <div className="tl-texto">{entry.description}</div>
            </article>
          ))}
        </div>

        <div className="directoras-toggle">
          <div className="history-group-head">
            <h2>Las directoras del Museo</h2>
          </div>
          <div className="directoras-list-compact">
            {leadershipEntries.map((entry, index) => (
              <details className="directora-item-toggle" key={entry.name} open={index === 0}>
                <summary className="directora-row-compact">
                  <div className="dir-periodo">{entry.period}</div>
                  <div className="dir-main">
                    <div className="dir-nombre">{entry.name}</div>
                    <div className="dir-num">{entry.role}</div>
                  </div>
                  <span className="dir-tag">{entry.tag}</span>
                  <span className="accordion-action">Ver perfil</span>
                </summary>
                <div className="dir-bio-compact">{entry.description}</div>
              </details>
            ))}
          </div>
        </div>

        <h2 className="historia-subtitle">Marco legal y patrimonial</h2>
        <div className="decreto-chip-grid">
          {legalMilestones.map((item) => (
            <article className="decreto-item decreto-item-compact" key={item.title}>
              <div className="decreto-titulo">{item.title}</div>
              <div className="decreto-desc">{item.description}</div>
            </article>
          ))}
        </div>

        <div className="custodios-toggle">
          <div className="history-group-head">
            <h2>Los custodios del Patrimonio</h2>
          </div>
          <p className="custodios-intro">
            Desde su fundación en 1972, el Museo Arquidiocesano de Arte Religioso ha estado bajo el cuidado pastoral y la representación legal de los Arzobispos de Popayán.
          </p>
          <div className="custodios-list">
            {custodianEntries.map((item, index) => (
              <details className="custodio-item-toggle" key={item.name} open={index === 0}>
                <summary className="custodio-row-compact">
                  <div className="custodio-periodo">{item.period}</div>
                  <div className="custodio-main">
                    <div className="custodio-nombre">{item.name}</div>
                    <div className="custodio-rol">{item.role}</div>
                  </div>
                  <span className="custodio-tag">{item.tag}</span>
                  <span className="accordion-action">Ver perfil</span>
                </summary>
                <div className="custodio-bio">{item.description}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

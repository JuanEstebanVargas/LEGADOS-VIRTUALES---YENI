import { programAxes, programConditions } from '../data/content'
import { usePageTitle } from './usePageTitle'

export function ProgramacionPage() {
  usePageTitle('Programación')

  return (
    <main id="main-content" className="section-page-main">
      <section className="content-section" id="programacion">
        <div className="section-heading section-heading-compact">
          <h1>Programación educativa, cultural y académica</h1>
        </div>

        <div className="program-accordion-list patrimonio-accordion-list">
          {programAxes.map((axis, index) => (
            <details
              className={`program-axis-card${axis.id.includes('03') ? ' program-axis-card-wide' : ''}`}
              key={axis.id}
              open={index < 2}
            >
              <summary>
                <div>
                  <div className="program-axis-id">{axis.id}</div>
                  <h2>{axis.title}</h2>
                  <p className="accordion-preview">{axis.items[0]}</p>
                </div>
                <span className="accordion-action">Ver detalle</span>
              </summary>

              <ul className="program-axis-list">
                {axis.items.map((item) => (
                  <li key={`${axis.id}-${item}`}>{item}</li>
                ))}
              </ul>
            </details>
          ))}

          <details className="program-axis-card program-axis-card-wide">
            <summary>
              <div>
                <div className="program-axis-id">Condiciones</div>
                <h2>Condiciones de participación</h2>
                <p className="accordion-preview">Requisitos operativos para recorridos y actividades educativas.</p>
              </div>
              <span className="accordion-action">Ver detalle</span>
            </summary>

            <ul className="program-axis-list">
              {programConditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </details>
        </div>
      </section>
    </main>
  )
}

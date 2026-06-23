import { SectionSummary } from './SectionElements'
import { usePageTitle } from './usePageTitle'

export function PatrimonioPage() {
  usePageTitle('Patrimonio')

  return (
    <main id="main-content" className="section-page-main">
      <section className="content-section" id="patrimonio">
        <div className="section-heading section-heading-compact">
          <h1>Patrimonio Vivo</h1>
        </div>

        <SectionSummary
          title="Patrimonio Vivo"
          what="Un frente de mediación donde el patrimonio se activa con recursos pedagógicos y creación colectiva."
          audience="Comunidades educativas, jóvenes creadores, mediadores culturales y público local."
          action="Explorar recursos, conocer proyectos colaborativos y consultar publicaciones educativas del Museo."
        />

        <div className="info-band">
          <div>
            <p className="eyebrow eyebrow-inverse">Patrimonio Vivo</p>
            <h2>Proyectos de mediación, recursos pedagógicos y creación colectiva.</h2>
          </div>
          <p>
            "Patrimonio Vivo" es el espacio donde el Museo muestra su dimensión más contemporánea: los proyectos de mediación, los recursos pedagógicos y los procesos de creación colectiva que convierten el patrimonio en recurso de las comunidades del presente.
          </p>
        </div>

        <div className="program-accordion-list">
          <details className="program-axis-card" open>
            <summary>
              <div>
                <div className="program-axis-id">Recurso educativo</div>
                <h2>Maleta Pedagógica</h2>
                <p className="accordion-preview">Material para instituciones de básica y media, disponible para préstamo y alquiler.</p>
              </div>
              <span className="accordion-action">Ver detalle</span>
            </summary>

            <p>Recurso para instituciones de básica y media que permite preparar la visita desde el aula.</p>
            <p>
              Incluye fichas de obras, juegos de técnicas, análisis iconográfico y ejercicios de creación. Se articula con la Cátedra Popayán y puede solicitarse directamente al Museo.
            </p>
            <ul className="program-axis-list">
              <li><strong>Público:</strong> Instituciones educativas · Docentes de básica y media.</li>
              <li><strong>Modalidad:</strong> Préstamo y alquiler · Requiere reserva previa.</li>
              <li><strong>Contacto:</strong> Consultar en Sección Contacto.</li>
              <li><strong>Materiales digitales:</strong> En proceso de digitalización para acceso abierto.</li>
            </ul>
          </details>

          <details className="program-axis-card">
            <summary>
              <div>
                <div className="program-axis-id">Serie colaborativa</div>
                <h2>Voces del Patrimonio</h2>
                <p className="accordion-preview">Pódcast, cápsulas sonoras, piezas visuales con QR e intervenciones urbanas.</p>
              </div>
              <span className="accordion-action">Ver detalle</span>
            </summary>

            <p>
              <strong>Serie de pódcast y creación colectiva.</strong> VOCES DEL PATRIMONIO es una serie de producciones sonoras y visuales creadas colectivamente con jóvenes universitarios de Popayán.
            </p>
            <p>
              El proyecto resignifica las obras del Museo desde voces contemporáneas y diversas. Produce seis cápsulas sonoras y seis piezas visuales con códigos QR para radios comunitarias, plataformas digitales e intervenciones urbanas.
            </p>
            <ul className="program-axis-list">
              <li><strong>Modalidad:</strong> Pódcast · Cápsulas sonoras · Piezas visuales con QR · Intervenciones urbanas.</li>
              <li><strong>Aliados:</strong> U. del Cauca · FUP · SENA · Emisoras comunitarias · Colectivos artísticos locales.</li>
              <li><strong>Micrositio digital:</strong> En desarrollo · Repositorio de acceso público con todos los productos.</li>
              <li><strong>Acceso actual:</strong> Próximamente disponible en redes del Museo.</li>
            </ul>
          </details>

          <details className="program-axis-card program-axis-card-wide">
            <summary>
              <div>
                <div className="program-axis-id">Publicación institucional</div>
                <h2>Plan Educativo del Museo Arquidiocesano</h2>
                <p className="accordion-preview">Libro base del modelo educativo patrimonial del Museo (2025).</p>
              </div>
              <span className="accordion-action">Ver detalle</span>
            </summary>

            <p>
              <strong>Museos como espacios de transformación cultural: estrategias para la Educación Patrimonial.</strong> Autoría: Yenifer Andrea Castaño Vargas. Publicación de la Arquidiócesis de Popayán, 2025.
            </p>
            <p>
              El libro desarrolla tres ejes: Formación académica de públicos, Escuela y Museo, y Museo como Centro Cultural. Su enfoque propone transformar el “patrimonio potencial” en “patrimonio efectivo”.
            </p>
          </details>
        </div>
      </section>
    </main>
  )
}

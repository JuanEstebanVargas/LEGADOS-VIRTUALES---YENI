import './App.css'
import './App.responsive.css'
import { ArtworkCard } from './components/artwork/ArtworkCard'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import {
  collectionTechniques,
  featuredArtworks,
  historyTimeline,
  institutionalValues,
  custodianEntries,
  legalMilestones,
  leadershipEntries,
  programAxes,
  programConditions,
  siteHighlights,
  storyBlocks,
  visitAccessibilityIntro,
  visitAccessibilityNote,
  visitAccessibilityPoints,
  visitInfoSections,
  visitRegulationRows,
} from './data/content'

const getPreviewText = (text: string, maxLength = 110) => {
  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength).trimEnd()}...`
}

type SectionSummaryProps = {
  title: string
  what: string
  audience: string
  action: string
}

const SectionSummary = ({ title, what, audience, action }: SectionSummaryProps) => (
  <article className="section-summary" aria-label={`Resumen de ${title}`}>
    <p className="section-summary-kicker">Resumen rápido</p>
    <h3>{title}</h3>
    <ul className="section-summary-list">
      <li>
        <strong>Qué es:</strong> {what}
      </li>
      <li>
        <strong>Para quién:</strong> {audience}
      </li>
      <li>
        <strong>Qué puedo hacer aquí:</strong> {action}
      </li>
    </ul>
  </article>
)

function App() {
  const whatsappPhone = '573127887309'
  const whatsappMessage = 'Hola, quiero planear una visita al Museo Arquidiocesano de Arte Religioso de Popayán.'
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`

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
    <div className="site-shell">
      <Header />

      <main id="main-content">
        <header className="portada" id="inicio">
          <div className="portada-ornamento" />
          <div className="portada-sello" aria-hidden="true">
            <svg viewBox="0 0 48 48" role="presentation" focusable="false">
              <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M24 12l4.2 8.5 9.4 1.4-6.8 6.6 1.6 9.3-8.4-4.4-8.4 4.4 1.6-9.3-6.8-6.6 9.4-1.4z" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="portada-tipo">Arquidiócesis de Popayán</p>
          <h1>
            Museo Arquidiocesano de
          </h1>
          <p className="portada-title-emphasis"><em>Arte Religioso</em> de Popayán</p>

          <div className="portada-badges" aria-label="Resumen rápido">
            {siteHighlights.map((highlight) => (
              <span className="badge" key={highlight}>
                {highlight}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#visita">
              Planear visita
            </a>
            <a className="button button-secondary" href="#identidad">
              Explorar el museo
            </a>
          </div>

          <div className="portada-scroll">Explorar</div>
        </header>

        {/* Módulo 00 eliminado */}

        <section className="content-section" id="identidad">
          <div className="section-heading section-heading-compact">
            <p className="section-label"> 01 - Pestaña El Museo</p>
            <h2>Identidad Institucional</h2>

          </div>

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
              Cuatro siglos de pincel y gubia hablan en estas paredes.
              No como monumentos congelados, sino como
              <span className="verde"> preguntas abiertas:</span>
              ¿quién nombró estas imágenes? ¿A quiénes sirvieron?
              ¿Qué dicen hoy, desde el sur, desde lo colectivo, desde lo
              que aún no ha sido dicho? El Museo es el lugar donde esas
              preguntas tienen espacio, donde el patrimonio deja de ser
              propiedad de unos pocos y se convierte en conversación de
              muchos.
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
                  <span className="accordion-action">Ver más</span>
                </summary>
                <p>{block.description}</p>
              </details>
            ))}
          </div>
          <div className="section-heading section-heading-compact">
            <h3>Valores institucionales</h3>
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

        <section className="content-section content-section-dark" id="historia">
          <div className="section-heading section-heading-compact">
            <p className="section-label section-label-inverse"> 02 - Pestaña El Museo</p>
            <h2>Historia del museo</h2>
            <p className="section-intro section-intro-inverse">
              Síntesis del recorrido histórico, la sede, la dirección institucional, el marco legal y los custodios del patrimonio.
            </p>
          </div>

          <SectionSummary
            title="Historia del Museo"
            what="Una línea de tiempo de los hitos que dieron forma a la institución y a su sede histórica."
            audience="Personas que visitan el Museo por primera vez, estudiantes e investigadoras de patrimonio."
            action="Revisar hitos clave, conocer sus directoras, consultar el marco legal y ubicar a los custodios del patrimonio."
          />

          <div className="historia-resumen-grid">
            <article className="historia-mini-card">
              <h3>Origen</h3>
              <p>
                Desde 1546, los templos de Popayán reúnen obras sacras que luego conforman el acervo del Museo.
              </p>
            </article>
            <article className="historia-mini-card">
              <h3>Sede histórica</h3>
              <p>
                La casa proyectada por Marcelino Pérez de Arroyo resume el “Estilo Popayán” y hoy es parte central de la narrativa patrimonial.
              </p>
            </article>
            <article className="historia-mini-card">
              <h3>Fundación y etapa actual</h3>
              <p>
                El Museo se crea formalmente en 1972, atraviesa restauración y hoy fortalece su enfoque educativo y digital.
              </p>
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
              <h3>Las directoras del Museo</h3>
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
                  <div className="dir-bio dir-bio-compact">{entry.description}</div>
                </details>
              ))}
            </div>
          </div>

          <h3 className="historia-subtitle">Marco legal y patrimonial</h3>
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
              <h3>Los custodios del Patrimonio</h3>
            </div>
            <p className="custodios-intro">
              Desde su fundación en 1972, el Museo Arquidiocesano de Arte Religioso ha estado bajo el cuidado pastoral y la representación legal de los Arzobispos de Popayán. Cada uno ha dejado su huella en la historia de la institución.
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

        <section className="content-section" id="coleccion">
          <div className="section-heading section-heading-compact">
            <p className="section-label">03 - Pestaña Multimedia</p>
            <h2>Colección, técnicas, obras destacadas y navegación visual.</h2>
            <p className="section-intro">
              La colección del Museo Arquidiocesano destaca como una de las más importantes de arte colonial en Colombia. Reúne obras de los siglos XVI al XIX, centradas en el barroco latinoamericano, especialmente de las escuelas quiteña y payanesa, provenientes de templos históricos de Popayán. Además, refleja una doble historia: fue creada como herramienta de evangelización, pero también reinterpretada por las comunidades locales.
            </p>

          </div>

          <div className="tecnicas-grid">
            {collectionTechniques.map((technique) => (
              <article className="tecnica-item" key={technique.title}>
                <div className="tecnica-icon" aria-hidden="true">{technique.icon ?? '✦'}</div>
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

        <section className="content-section content-section-dark" id="visita">
          <div className="section-heading section-heading-compact">
            <p className="section-label section-label-inverse"> 04 - Pestaña Visitas</p>
            <h2>Horarios, ubicación, accesibilidad y planificación de la visita.</h2>
            <p className="section-intro section-intro-inverse">
              La información práctica se conserva y se presenta como un bloque de orientación claro y responsivo.
            </p>
          </div>

          <article className="visit-planner-card" aria-label="Planifica tu visita">
            <div className="visit-planner-head">
              <p className="visit-planner-kicker">Información rápida</p>
              <h3>Planifica tu visita</h3>
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
              <a className="button button-primary visit-planner-cta" href="#como-llegar">
                Cómo llegar
              </a>
              <a className="button button-whatsapp visit-planner-cta visit-planner-cta-secondary" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Escribir por WhatsApp
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
                    <h3>{section.title}</h3>
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

            <details className="visit-detail-card" open>
              <summary>
                <div>
                  <h3>Reglamento de visita</h3>
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
                  <h3>Accesibilidad</h3>
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
                      <h4>{point.title}</h4>
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
                      <h3>{section.title}</h3>
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

        <section className="content-section" id="programacion">
          <div className="section-heading section-heading-compact">
            <p className="section-label"> 05 - Pestaña Programación</p>
            <h2>Programación educativa, cultural y académica del Museo.</h2>
            <p className="section-intro">
              Esta sección organiza la oferta formativa del Museo por ejes para facilitar decisiones rápidas según perfil, objetivo y tiempo disponible.
            </p>
          </div>

          <SectionSummary
            title="Programación"
            what="Una agenda estructurada en ejes educativos y culturales con actividades para públicos diversos."
            audience="Docentes, grupos escolares, universidades, turistas y ciudadanía interesada en cultura colonial."
            action="Elegir un eje, revisar actividades disponibles y confirmar condiciones de participación antes de reservar."
          />

          <div className="program-accordion-list patrimonio-accordion-list">
            {programAxes.map((axis, index) => (
              <details className="program-axis-card" key={axis.id} open={index < 2}>
                <summary>
                  <div>
                    <div className="program-axis-id">{axis.id}</div>
                    <h3>{axis.title}</h3>
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
                  <h3>Condiciones de participación</h3>
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

        <section className="content-section content-section-dark" id="patrimonio">
          <div className="section-heading section-heading-compact">
            <p className="section-label section-label-inverse"> 06 - Pestaña Patrimonio Vivo</p>
            <h2>Patrimonio Vivo.</h2>
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
                  <h3>Maleta Pedagógica</h3>
                  <p className="accordion-preview">Material para instituciones de básica y media, disponible para préstamo y alquiler.</p>
                </div>
                <span className="accordion-action">Ver detalle</span>
              </summary>

              <p>
                Recurso para instituciones de básica y media que permite preparar la visita desde el aula.
              </p>
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
                  <h3>Voces del Patrimonio</h3>
                  <p className="accordion-preview">Pódcast, cápsulas sonoras, piezas visuales con QR e intervenciones urbanas.</p>
                </div>
                <span className="accordion-action">Ver detalle</span>
              </summary>

              <p>
                <strong>Serie de pódcast y creación colectiva.</strong> VOCES DEL PATRIMONIO es una serie de producciones sonoras y visuales creadas colectivamente con jóvenes universitarios de Popayán, que articula la memoria comunitaria con el patrimonio artístico y cultural de la ciudad.
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
                  <h3>Plan Educativo del Museo Arquidiocesano</h3>
                  <p className="accordion-preview">Libro base del modelo educativo patrimonial del Museo (2025).</p>
                </div>
                <span className="accordion-action">Ver detalle</span>
              </summary>

              <p>
                <strong>Museos como espacios de transformación cultural: estrategias para la Educación Patrimonial.</strong> Autoría: Yenifer Andrea Castaño Vargas. Una publicación de la Arquidiócesis de Popayán desde el Museo Arquidiocesano de Arte Religioso, con dirección de investigación del Dr. Gerardo Hernán Jiménez López (Universidad del Cauca), 2025.
              </p>
              <p>
                El libro desarrolla tres ejes: Formación académica de públicos, Escuela y Museo, y Museo como Centro Cultural. Su enfoque propone transformar el “patrimonio potencial” en “patrimonio efectivo”.
              </p>
            </details>
          </div>
        </section>

        <section className="content-section" id="investigacion">
          <div className="section-heading section-heading-compact">
            <p className="section-label"> 07 - Pestaña Investigación</p>
            <h2>Investigación y Publicaciones</h2>
            <p className="section-intro">
              El Museo Arquidiocesano es también un centro de investigación sobre el arte colonial latinoamericano. Esta sección reúne publicaciones, artículos e informes producidos por investigadoras e investigadores que han estudiado la colección, el inmueble y los procesos culturales del Museo.
            </p>
          </div>

          <SectionSummary
            title="Investigación"
            what="Un repositorio en crecimiento con producción editorial del Museo y bibliografía especializada externa."
            audience="Investigadores, docentes, estudiantes universitarios y equipos de mediación cultural."
            action="Consultar publicaciones institucionales, revisar referencias clave y dar seguimiento al catálogo académico en actualización."
          />

          <div className="program-accordion-list">
            <details className="program-axis-card program-axis-card-wide" open>
              <summary>
                <div>
                  <div className="program-axis-id">Publicaciones institucionales propias</div>
                  <h3>Producción editorial del Museo</h3>
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
                  <h3>Bibliografía y estudios en actualización</h3>
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

        <section className="content-section contact-section content-section-dark" id="contacto">
          <div className="section-heading section-heading-compact">
            <p className="section-label section-label-inverse"> 08 - Pestaña Contacto</p>
            <h2>Canales digitales, redes sociales y atención institucional.</h2>
          </div>

          <div className="contact-grid contact-grid-compact">
            <article className="info-card">
              <h3>Información de contacto</h3>
              <p><strong>Dirección:</strong><br />Calle 4A No. 4-56<br />Centro Histórico, Popayán, Cauca.</p>
              <p>
                <strong>Teléfono:</strong><br />
                <a href="tel:+573127887309">+57 312 788 7309</a>
              </p>
              <p>
                <strong>Email:</strong><br />
                <a href="mailto:museo@arquidiocesisdepopayan.org">museo@arquidiocesisdepopayan.org</a>
              </p>
              <a className="button button-whatsapp contact-whatsapp-cta" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Escribir por WhatsApp
              </a>
            </article>

            <article className="info-card">
              <h3>Entidad administradora</h3>
              <p><strong>Institución:</strong><br />Arquidiócesis de Popayán</p>
              <p><strong>Web:</strong><br />www.arquidiocesisdepopayan.org</p>
              <p><strong>Dirección Curia:</strong><br />Popayán, Cauca – Colombia</p>
            </article>

            <article className="info-card">
              <h3>Canales digitales</h3>
              <ul className="program-axis-list">
                <li>
                  📘 <strong>Facebook:</strong>{' '}
                  <a href="https://www.facebook.com/arquimuseo.popayan/" target="_blank" rel="noopener noreferrer">
                    facebook.com/arquimuseo.popayan
                  </a>
                </li>
                <li>
                  📸 <strong>Instagram:</strong>{' '}
                  <a href="https://www.instagram.com/arquimuseo.popayan/" target="_blank" rel="noopener noreferrer">
                    @arquimuseo.popayan
                  </a>
                </li>
                <li>
                  📍 <strong>Google Maps:</strong>{' '}
                  <a href="https://maps.app.goo.gl/ZgefXEr5kK6JcuGE8" target="_blank" rel="noopener noreferrer">
                    Ver ubicación en Google Maps
                  </a>
                </li>
              </ul>

              <div className="visit-map-embed-wrap">
                <iframe
                  className="visit-map-embed"
                  title="Mapa del Museo Arquidiocesano"
                  src="https://www.google.com/maps?q=2.4418349,-76.6043796&z=17&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </article>
          </div>
        </section>
      </main>

      <a className="contacto-fab" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
        WhatsApp
      </a>

      <Footer />
    </div>
  )
}

export default App

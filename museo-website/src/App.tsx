import './App.css'
import { ArtworkCard } from './components/artwork/ArtworkCard'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import {
  contactChannels,
  collectionTechniques,
  exhibitionHighlights,
  featuredArtworks,
  heritageCards,
  historyTimeline,
  institutionalValues,
  leadershipEntries,
  programmingCards,
  researchCards,
  siteHighlights,
  storyBlocks,
  visitDetails,
} from './data/content'

function App() {
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
          <h1><em>Arte Religioso</em> de Popayán</h1>

          <div className="portada-badges" aria-label="Resumen rápido">
            {siteHighlights.map((highlight) => (
              <span className="badge" key={highlight}>
                {highlight}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#identidad">
              Explorar el museo
            </a>
            <a className="button button-secondary" href="#contacto">
              Contacto institucional
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
            Guardián de la memoria visual del suroccidente colombiano,
            el Museo Arquidiocesano de Arte Religioso de Popayán custodia
            cuatro siglos de producción artística latinoamericana en una
            casona del siglo XVIII proyectada por Marcelino Pérez de Arroyo,
            declarada Bien de Interés Cultural de la Nación. Sus colecciones
            de pintura, escultura, orfebrería y textiles de los siglos
            XVI al XIX abren conversaciones entre el pasado colonial y los
            presentes plurales de nuestra región.
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

          <div className="mv-grid">
            {storyBlocks.map((block) => (
              <article className="mv-card" key={block.title}>
                <div className="mv-label">{block.title}</div>
                <p>{block.description}</p>
              </article>
            ))}
          </div>
          <div className="section-heading section-heading-compact">
            <h3>Valores institucionales</h3>
          </div>

          <div className="valores-grid">
            {institutionalValues.map((value) => (
              <article className="valor-card" key={value.number}>
                <div className="valor-num">{value.number}</div>
                <div className="valor-nom">{value.title}</div>
                <div className="valor-desc">{value.description}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section content-section-dark" id="historia">
          <div className="section-heading section-heading-compact">
            <p className="section-label section-label-inverse"> 02 - Pestaña El Museo</p>
            <h2>Historia del museo</h2>
            <p className="section-intro section-intro-inverse">
              Esta sección agrupa la narrativa histórica y mantiene los elementos funcionales del proyecto en una lectura más vertical.
            </p>
          </div>

          <div className="historia-recuadro">
            <h3>Recorrido histórico</h3>
            <p>
              La memoria institucional se despliega en una secuencia de hitos que explican la creación del museo, su consolidación y su proyección actual.
            </p>
          </div>

          <div className="timeline">
            {historyTimeline.map((entry) => (
              <article className="tl-item" key={`${entry.year}-${entry.title}`}>
                <div className="tl-dot" aria-hidden="true" />
                <div className="tl-anio">{entry.year}</div>
                <div className="tl-titulo">{entry.title}</div>
                <div className="tl-texto">{entry.description}</div>
              </article>
            ))}
          </div>

          <div className="directoras-grid">
            {leadershipEntries.map((entry) => (
              <article
                className={`directora-card ${entry.role === 'Primera directora' ? 'fundadora' : ''} ${entry.role === 'Directora actual' ? 'actual' : ''
                  }`}
                key={entry.name}
              >
                <div className="dir-num">{entry.role}</div>
                <div className="dir-nombre">
                  {entry.name.split(' ').slice(0, 2).join(' ')}
                  <br />
                  {entry.name.split(' ').slice(2).join(' ')}
                </div>
                <div className="dir-periodo">{entry.period}</div>
                <div className="dir-bio">{entry.description}</div>
                <span className="dir-tag">{entry.tag}</span>
              </article>
            ))}
          </div>

          <div className="decreto-stack">
            <article className="decreto-item">
              <div className="decreto-titulo">Decreto No. 365 · 17 de abril de 1972</div>
              <div className="decreto-desc">
                Constitución de la Junta Arquidiocesana Pro Museo de Arte Religioso.
              </div>
            </article>
            <article className="decreto-item">
              <div className="decreto-titulo">Decreto Arzobispal No. 386 · 10 de octubre de 1972</div>
              <div className="decreto-desc">Creación formal del Museo como entidad cultural y social.</div>
            </article>
            <article className="decreto-item">
              <div className="decreto-titulo">Decreto 2248 · 11 de diciembre de 1996</div>
              <div className="decreto-desc">Declaratoria del inmueble y la colección como Monumento Nacional.</div>
            </article>
          </div>
        </section>

        <section className="content-section" id="coleccion">
          <div className="section-heading section-heading-compact">
            <p className="section-label">Carpeta 03 · Pestaña Multimedia</p>
            <h2>Colección, técnicas, obras destacadas y navegación visual.</h2>
            <p className="section-intro">
              Se reutiliza el componente de obras existente para preservar la lógica visual actual mientras la estructura adopta el nuevo esquema editorial.
            </p>
          </div>

          <div className="tecnicas-grid">
            {collectionTechniques.map((technique) => (
              <article className="tecnica-item" key={technique.title}>
                <div className="tecnica-icon" aria-hidden="true">✦</div>
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
            <p className="section-label section-label-inverse">Carpeta 04 · Pestaña Visitas</p>
            <h2>Horarios, ubicación, accesibilidad y planificación de la visita.</h2>
            <p className="section-intro section-intro-inverse">
              La información práctica se conserva y se presenta como un bloque de orientación claro y responsivo.
            </p>
          </div>

          <div className="info-grid">
            {visitDetails.map((detail) => (
              <article className="info-card" key={detail.title}>
                <h3>{detail.title}</h3>
                <p>{detail.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="programacion">
          <div className="section-heading section-heading-compact">
            <p className="section-label">Carpeta 05 · Pestaña Programación</p>
            <h2>Eventos, talleres y programación cultural activa.</h2>
          </div>

          <div className="timeline-list">
            {programmingCards.map((item) => (
              <article className="timeline-item" key={item.title}>
                <span>{item.title}</span>
                <h3>{item.description}</h3>
              </article>
            ))}
            {exhibitionHighlights.map((item) => (
              <article className="timeline-item" key={item.title}>
                <span>{item.status}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section content-section-dark" id="patrimonio">
          <div className="section-heading section-heading-compact">
            <p className="section-label section-label-inverse">Carpeta 06 · Pestaña Patrimonio Vivo</p>
            <h2>Maleta pedagógica, mediación y proyectos para activar la memoria.</h2>
          </div>

          <div className="info-band">
            <div>
              <p className="eyebrow eyebrow-inverse">Patrimonio Vivo</p>
              <h2>Hotspots, mediación y vista de salas pensadas para explorar y aprender.</h2>
            </div>
            <p>
              Este bloque funciona como entrada al tour virtual y a proyectos pedagógicos, con espacio para panoramas, mapas de sala y recursos educativos.
            </p>
          </div>

          <div className="story-grid">
            {heritageCards.map((card) => (
              <article className="info-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="investigacion">
          <div className="section-heading section-heading-compact">
            <p className="section-label">Carpeta 07 · Pestaña Investigación</p>
            <h2>Publicaciones, documentos y consulta para investigación y archivo.</h2>
          </div>

          <div className="contact-grid">
            {researchCards.map((card) => (
              <article className="info-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section contact-section content-section-dark" id="contacto">
          <div className="section-heading section-heading-compact">
            <p className="section-label section-label-inverse">Carpeta 08 · Pestaña Contacto</p>
            <h2>Canales digitales, redes sociales y formulario de contacto.</h2>
          </div>

          <div className="contact-grid contact-grid-compact">
            {contactChannels.map((channel) => (
              <article className="info-card" key={channel.title}>
                <h3>{channel.title}</h3>
                <p>{channel.detail}</p>
              </article>
            ))}
          </div>

          <div className="nota">
            <p>
              El sitio conserva su estructura funcional actual, pero ahora la organización de la página sigue la secuencia visual de la plantilla de referencia.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App

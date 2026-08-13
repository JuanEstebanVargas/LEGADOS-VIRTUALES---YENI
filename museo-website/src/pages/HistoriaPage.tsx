import { useEffect, useState } from 'react'
import { custodianEntries, historyTimeline, leadershipEntries, legalMilestones } from '../data/content'
import { HeroCarousel } from '../components/layout/HeroCarousel'
import { useGlobalCarouselItems } from '../hooks/useGlobalCarouselItems'
import { fetchServerCustodianItems } from '../data/portal/custodiansServerApi'
import { fetchServerDirectorItems } from '../data/portal/directorsServerApi'
import { usePageTitle } from './usePageTitle'

type ProfileEntry = {
  image?: string
  name: string
  period: string
  role: string
  description: string
  tag: string
}

function ProfileItem({
  variant,
  entry,
  defaultOpen = false,
}: {
  variant: 'directora' | 'custodio'
  entry: ProfileEntry
  defaultOpen?: boolean
}) {
  const isDir = variant === 'directora'
  const cls = (base: string, alt: string) => (isDir ? base : alt)
  const itemCls = cls('directora-item-toggle', 'custodio-item-toggle')
  const rowCls = cls('directora-row-compact', 'custodio-row-compact')
  const periodoCls = cls('dir-periodo', 'custodio-periodo')
  const mainCls = cls('dir-main', 'custodio-main')
  const nombreCls = cls('dir-nombre', 'custodio-nombre')
  const rolCls = cls('dir-num', 'custodio-rol')
  const tagCls = cls('dir-tag', 'custodio-tag')
  const bioCls = cls('dir-bio-compact', 'custodio-bio')

  return (
    <details className={itemCls} open={defaultOpen}>
      <summary className={rowCls}>
        <span className="personaje-avatar" aria-hidden="true">
          {entry.image ? (
            <img src={entry.image} alt="" loading="lazy" />
          ) : (
            <span className="personaje-avatar-fallback">{entry.name.charAt(0)}</span>
          )}
        </span>
        <span className={periodoCls}>{entry.period}</span>
        <span className={mainCls}>
          <span className={nombreCls}>{entry.name}</span>
          <span className={rolCls}>{entry.role}</span>
        </span>
        <span className={tagCls}>{entry.tag}</span>
        <span className="accordion-action">Ver perfil</span>
      </summary>
      <div className="personaje-detail">
        <div className={bioCls}>{entry.description}</div>
        <figure className="personaje-photo">
          {entry.image ? (
            <img src={entry.image} alt={entry.name} loading="lazy" />
          ) : (
            <span className="personaje-photo-fallback">{entry.name}</span>
          )}
        </figure>
      </div>
    </details>
  )
}

export function HistoriaPage() {
  usePageTitle('Historia')
  const carouselItems = useGlobalCarouselItems()
  const [directoras, setDirectoras] = useState<ProfileEntry[]>(leadershipEntries)
  const [custodios, setCustodios] = useState<ProfileEntry[]>(custodianEntries)

  useEffect(() => {
    let isMounted = true

    const loadHistoryContent = async () => {
      try {
        const serverDirectors = await fetchServerDirectorItems()
        if (isMounted) {
          setDirectoras(serverDirectors)
        }
      } catch {
        if (isMounted) {
          setDirectoras(leadershipEntries)
        }
      }

      try {
        const serverCustodians = await fetchServerCustodianItems()
        if (isMounted) {
          setCustodios(serverCustodians)
        }
      } catch {
        if (isMounted) {
          setCustodios(custodianEntries)
        }
      }
    }

    void loadHistoryContent()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main id="main-content" className="section-page-main historia-page">
      <HeroCarousel
        items={carouselItems}
        title="Historia"
        kicker="Museo Arquidiocesano de Popayán"
        description="Cuatro siglos de arte religioso: desde los templos de la Popayán colonial hasta la casa que Marcelino Pérez de Arroyo proyectó para rescatar la memoria del suroccidente."
        contentAlign="left"
      />

      <section className="content-section" id="historia">
        <div className="historia-resumen-grid">
          <article className="historia-mini-card">
            <h2>Origen</h2>
            <p>Desde 1546, los templos de Popayán reúnen obras sacras que luego conforman el acervo del Museo.</p>
          </article>
          <article className="historia-mini-card">
            <h2>Sede histórica</h2>
            <p>
              La casa proyectada por Marcelino Pérez de Arroyo resume el "Estilo Popayán" y hoy es parte central de la narrativa patrimonial.
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
            {directoras.map((entry, index) => (
              <ProfileItem key={entry.name} variant="directora" entry={entry} defaultOpen={index === 0} />
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
            {custodios.map((item, index) => (
              <ProfileItem key={item.name} variant="custodio" entry={item} defaultOpen={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

import { Link } from 'react-router-dom'

type SectionPreviewCardProps = {
  title: string
  summary: string
  to: string
  ctaLabel: string
  backgroundImage: string
  icon: 'museo' | 'historia' | 'coleccion' | 'visitas' | 'programacion' | 'patrimonio' | 'investigacion' | 'contacto'
}

function SectionIcon({ icon }: { icon: SectionPreviewCardProps['icon'] }) {
  switch (icon) {
    case 'museo':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 3 3.5 7.5v1.8h17V7.5L12 3Zm-6.8 8.5h2v6h-2v-6Zm5.4 0h2v6h-2v-6Zm5.4 0h2v6h-2v-6ZM3 20v-1.8h18V20H3Z" fill="currentColor" />
        </svg>
      )
    case 'historia':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4.5 5.2A2.2 2.2 0 0 1 6.7 3h11v16.4h-10a2.2 2.2 0 0 0-2.2 2.2V5.2Zm2.2-.4c-.4 0-.7.3-.7.7v12.4c.5-.3 1.1-.5 1.7-.5h8.5V4.8H6.7ZM9 7.5h5.8v1.4H9V7.5Zm0 3.1h5.8V12H9v-1.4Z" fill="currentColor" />
        </svg>
      )
    case 'coleccion':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5 6.2A2.2 2.2 0 0 1 7.2 4h5.6A2.2 2.2 0 0 1 15 6.2v11.6A2.2 2.2 0 0 1 12.8 20H7.2A2.2 2.2 0 0 1 5 17.8V6.2Zm10-1.1h1.8A2.2 2.2 0 0 1 19 7.3v9.4a2.2 2.2 0 0 1-2.2 2.2H15v-1.5h1.8a.7.7 0 0 0 .7-.7V7.3a.7.7 0 0 0-.7-.7H15V5.1Z" fill="currentColor" />
        </svg>
      )
    case 'visitas':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M7 3.2h1.8v2H7v-2Zm8.2 0H17v2h-1.8v-2ZM5.8 6h12.4a2.2 2.2 0 0 1 2.2 2.2v10a2.2 2.2 0 0 1-2.2 2.2H5.8a2.2 2.2 0 0 1-2.2-2.2v-10A2.2 2.2 0 0 1 5.8 6Zm0 3v9.2h12.4V9H5.8Zm2.2 2h2.2v2H8v-2Zm3.4 0h2.2v2h-2.2v-2Zm3.4 0H17v2h-2.2v-2Z" fill="currentColor" />
        </svg>
      )
    case 'programacion':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M8.2 11.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Zm7.6 0a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM12 17.8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 18c.4-2.8 2.6-4.6 4.7-4.6 1 0 2 .4 2.8 1.1a4 4 0 0 0-1.2 3.2H3.5Zm10.7-.4a4 4 0 0 0-1.2-3.2c.8-.7 1.8-1.1 2.8-1.1 2.1 0 4.3 1.8 4.7 4.6h-6.3Z" fill="currentColor" />
        </svg>
      )
    case 'patrimonio':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 3 6.9 7.2l1.9 6.2H15l2-6.2L12 3Zm-6.6 6.7 3.2 2.2-1.2 4H3.6l1.8-6.2Zm15 0 1.8 6.2h-3.8l-1.2-4 3.2-2.2ZM6.4 17.3h11.2V20H6.4v-2.7Z" fill="currentColor" />
        </svg>
      )
    case 'investigacion':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M10.8 4.2a6.6 6.6 0 1 1-4.7 11.2 6.6 6.6 0 0 1 4.7-11.2Zm0 1.8a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm5.9 9.8 4.1 4.1-1.3 1.3-4.1-4.1 1.3-1.3Z" fill="currentColor" />
        </svg>
      )
    case 'contacto':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4.8 5.5h14.4A2.2 2.2 0 0 1 21.4 7.7v8.6a2.2 2.2 0 0 1-2.2 2.2H4.8a2.2 2.2 0 0 1-2.2-2.2V7.7a2.2 2.2 0 0 1 2.2-2.2Zm0 1.8-.4.1 7.6 5.8 7.6-5.8-.4-.1H4.8Zm14.4 9.4.4-.1V9l-7 5.4a1 1 0 0 1-1.2 0L4.4 9v7.6l.4.1h14.4Z" fill="currentColor" />
        </svg>
      )
  }
}

export function SectionPreviewCard({ title, summary, to, ctaLabel, backgroundImage, icon }: SectionPreviewCardProps) {
  return (
    <article className="section-preview-card" aria-label={`Resumen de ${title}`}>
      <div className="section-preview-card__media" style={{ backgroundImage: `url(${backgroundImage})` }} aria-hidden="true">
        <span className="section-preview-card__icon">
          <SectionIcon icon={icon} />
        </span>
      </div>

      <div className="section-preview-card__body">
        <h3>{title}</h3>
        <p>{summary}</p>
      </div>

      <Link className="button section-preview-card__cta" to={to} aria-label={`${ctaLabel} de ${title}`}>
        <span>{ctaLabel}</span>
        <span aria-hidden="true" className="section-preview-card__arrow">
          →
        </span>
      </Link>
    </article>
  )
}

import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

type ContentCardProps = {
  title: string
  summary: string
  href: string
  image?: string
  meta?: string
  label?: string
}

const isExternalHref = (href: string) => /^https?:\/\//i.test(href)

export function ContentCard({ title, summary, href, image, meta, label = 'Mayor información' }: ContentCardProps) {
  return (
    <article className="c-card">
      <div className="c-card__media" style={image ? ({ '--card-image': `url(${image})` } as CSSProperties) : undefined} />
      <div className="c-card__body">
        {meta ? <p className="c-card__meta">{meta}</p> : null}
        <h3 className="c-card__title">{title}</h3>
        <p>{summary}</p>
      </div>
      <div className="c-card__footer">
        {isExternalHref(href) ? (
          <a className="c-card__link" href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ) : (
          <Link className="c-card__link" to={href}>
            {label}
          </Link>
        )}
      </div>
    </article>
  )
}

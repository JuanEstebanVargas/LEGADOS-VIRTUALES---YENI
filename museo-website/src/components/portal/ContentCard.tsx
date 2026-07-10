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
        <Link className="c-card__link" to={href}>
          {label}
        </Link>
      </div>
    </article>
  )
}

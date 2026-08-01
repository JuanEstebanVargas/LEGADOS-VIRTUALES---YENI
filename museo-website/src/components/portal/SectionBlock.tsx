import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type SectionBlockProps = {
  id: string
  title: string
  summary?: string
  linkTo?: string
  linkLabel?: string
  className?: string
  children: ReactNode
}

export function SectionBlock({ id, title, summary, linkTo, linkLabel = 'Ver todo', className, children }: SectionBlockProps) {
  return (
    <section className={`c-section${className ? ` ${className}` : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="c-section__header">
        <div className="c-section__headings">
          <h2 className="c-section__title" id={`${id}-title`}>
            {title}
          </h2>
          {summary ? <p className="c-section__summary">{summary}</p> : null}
        </div>
        {linkTo ? (
          <Link className="c-section__link" to={linkTo}>
            {linkLabel}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  )
}

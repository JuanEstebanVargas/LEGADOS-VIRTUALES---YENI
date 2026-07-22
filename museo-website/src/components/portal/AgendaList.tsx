import { Link } from 'react-router-dom'
import type { PortalEventItem } from '../../data/portal/types'

type AgendaListProps = {
  items: PortalEventItem[]
}

const isExternalHref = (href: string) => /^https?:\/\//i.test(href)

const formatDate = (isoDate: string) => {
  const formatter = new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return formatter.format(new Date(isoDate))
}

export function AgendaList({ items }: AgendaListProps) {
  return (
    <ul className="c-agenda" aria-label="Agenda cultural">
      {items.map((item) => (
        <li className="c-agenda__item" key={item.id}>
          <p className="c-agenda__date">{formatDate(item.startsAt)}</p>
          <div className="c-agenda__body">
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <p className="c-agenda__location">{item.location}</p>
          </div>
          {isExternalHref(item.href) ? (
            <a className="c-agenda__link" href={item.href} target="_blank" rel="noopener noreferrer">
              Mayor información
            </a>
          ) : (
            <Link className="c-agenda__link" to={item.href}>
              Mayor información
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

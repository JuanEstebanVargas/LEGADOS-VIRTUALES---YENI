import { Link } from 'react-router-dom'
import type { PortalQuickLink } from '../../data/portal/types'

type QuickLinksStripProps = {
  links: PortalQuickLink[]
}

export function QuickLinksStrip({ links }: QuickLinksStripProps) {
  return (
    <nav className="c-quick-links" aria-label="Accesos rápidos institucionales">
      {links.map((link) => (
        <Link className="c-quick-links__item" key={link.id} to={link.to}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

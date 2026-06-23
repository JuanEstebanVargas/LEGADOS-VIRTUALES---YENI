type SectionSummaryProps = {
  title: string
  what: string
  audience: string
  action: string
}

export const SectionSummary = ({ title, what, audience, action }: SectionSummaryProps) => (
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

export const TechniqueIcon = ({ icon }: { icon?: string }) => {
  switch (icon) {
    case 'palette':
      return (
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <path d="M12 3.5c-5 0-9 3.6-9 8.1 0 2.4 1.8 4.4 4.1 4.4h2.1c.8 0 1.5.7 1.5 1.5v.1c0 1.7 1.4 3.1 3.1 3.1h.6c3.9 0 6.6-3 6.6-6.8C21 8.4 17 3.5 12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="8" cy="10" r="1" fill="currentColor" />
          <circle cx="11.5" cy="8" r="1" fill="currentColor" />
          <circle cx="15" cy="9" r="1" fill="currentColor" />
          <circle cx="16.5" cy="12.5" r="1" fill="currentColor" />
        </svg>
      )
    case 'wood':
      return (
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <path d="M6.5 4.5h11a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18V6a1.5 1.5 0 0 1 1.5-1.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 7.5c1.8 1.2 1.8 3 0 4.2s-1.8 3 0 4.3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13 7.5c1.8 1.2 1.8 3 0 4.2s-1.8 3 0 4.3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'chalice':
      return (
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <path d="M7 5h10v1.3c0 2.9-2.3 5.2-5.2 5.2h-.6C8.3 11.5 6 9.2 6 6.3V5h1Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10.5 11.5v3.1c0 .6-.4 1.1-1 1.3L7.6 16.6v1.9h8.8v-1.9l-1.9-.7c-.6-.2-1-.7-1-1.3v-3.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.2 20h7.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'textile':
      return (
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <path d="M6.5 4.5h11a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18V6a1.5 1.5 0 0 1 1.5-1.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 8h8M8 12h8M8 16h8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M9.4 7.1v9.8M12 7.1v9.8M14.6 7.1v9.8" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity=".75" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" role="presentation" focusable="false">
          <path d="M12 3.8l2.2 4.5 5 .7-3.6 3.6.8 5-4.4-2.3-4.4 2.3.8-5-3.6-3.6 5-.7L12 3.8Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
  }
}

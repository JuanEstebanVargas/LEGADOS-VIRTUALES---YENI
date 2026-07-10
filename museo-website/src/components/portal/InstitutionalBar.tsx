type InstitutionalBarProps = {
  onToggleMotion: () => void
}

export function InstitutionalBar({ onToggleMotion }: InstitutionalBarProps) {
  return (
    <div className="c-utility-bar" role="region" aria-label="Barra de utilidad institucional">
      <div className="o-container c-utility-bar__content">
        <a className="c-govco" href="https://www.gov.co" target="_blank" rel="noreferrer" aria-label="Ir a GOV.CO">
          <span className="c-govco__emblem" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <path d="M12 3.5L16.8 6v6.2c0 3.4-2 6.5-4.8 8.2-2.8-1.7-4.8-4.8-4.8-8.2V6L12 3.5z" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
              <path d="M9.1 10.1h5.8M9.1 12.2h5.8M12 8.2v7.1" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="c-govco__text">GOV.CO</span>
        </a>

        <div className="c-utility-bar__links">
          <a href="/contacto">Contacto</a>
          <a href="/museo">Mapa del sitio</a>
          <a href="/patrimonio">Nos apoyan</a>
          <a href="/investigacion">Información al ciudadano</a>
        </div>

        <button className="sr-only" type="button" onClick={onToggleMotion}>
          Desactivar animaciones
        </button>
      </div>
    </div>
  )
}

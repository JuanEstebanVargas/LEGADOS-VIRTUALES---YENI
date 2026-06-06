import { useState } from 'react'

const navigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Mapa', href: '#mapa' },
  { label: 'El Museo', href: '#identidad' },
  { label: 'Historia', href: '#historia' },
  { label: 'Colección', href: '#coleccion' },
  { label: 'Visitas', href: '#visita' },
  { label: 'Programación', href: '#programacion' },
  { label: 'Patrimonio', href: '#patrimonio' },
  { label: 'Investigación', href: '#investigacion' },
  { label: 'Contacto', href: '#contacto' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="header-bar" aria-label="Navegación principal">
      <div className="header-inner">
        <a className="brand-mark" href="#inicio" aria-label="Ir al inicio del museo">
          <span className="brand-mark__title">Museo Arquidiocesano</span>
          <span className="brand-mark__detail">Popayán</span>
        </a>

        <button
          type="button"
          className="header-toggle"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`header-nav ${isMenuOpen ? 'is-open' : ''}`} id="mobile-navigation">
          {navigation.map((item) => (
            <li key={item.label}>
              <a
                className={
                  item.label === 'Inicio'
                    ? 'header-nav__link header-nav__link--home'
                    : item.label === 'Contacto'
                      ? 'header-nav__link header-nav__link--cta'
                      : 'header-nav__link'
                }
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Inicio', to: '/' },
  { label: 'El Museo', to: '/museo' },
  { label: 'Historia', to: '/historia' },
  { label: 'Colección', to: '/coleccion' },
  { label: 'Visitas', to: '/visitas' },
  { label: 'Programación', to: '/programacion' },
  { label: 'Patrimonio', to: '/patrimonio' },
  { label: 'Investigación', to: '/investigacion' },
  { label: 'Contacto', to: '/contacto' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navContainerRef = useRef<HTMLElement | null>(null)

  const handleInlineMenuToggle = () => {
    setIsMenuOpen((current) => !current)
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleClickOutside = (event: PointerEvent) => {
      const container = navContainerRef.current

      if (!container) {
        return
      }

      if (!container.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const closeMenuOnDesktop = () => {
      if (window.innerWidth > 639) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', closeMenuOnDesktop)

    return () => {
      window.removeEventListener('resize', closeMenuOnDesktop)
    }
  }, [])

  const handleNavigationClick = () => {
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <nav className="header-bar" aria-label="Navegación principal" ref={navContainerRef}>
      <div className="header-inner">
        <Link
          className="brand-mark"
          to="/"
          aria-label="Ir al inicio del museo"
          onClick={handleNavigationClick}
        >
          <span className="brand-mark__title">Museo Arquidiocesano</span>
          <span className="brand-mark__detail">Popayán</span>
        </Link>

        <button
          type="button"
          className="header-toggle header-toggle-inline"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={handleInlineMenuToggle}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`header-nav ${isMenuOpen ? 'is-open' : ''}`} id="main-navigation">
          {navigation.map((item) => (
            <li key={item.label}>
              <NavLink
                className={({ isActive }) =>
                  item.label === 'Contacto'
                    ? `header-nav__link header-nav__link--cta ${isActive ? 'header-nav__link--active' : ''}`
                    : `header-nav__link ${item.label === 'Inicio' ? 'header-nav__link--home' : ''} ${isActive ? 'header-nav__link--active' : ''}`
                }
                to={item.to}
                onClick={handleNavigationClick}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
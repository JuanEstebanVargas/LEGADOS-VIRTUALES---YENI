import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Inicio', to: '/', accent: '#e09c42' },
  { label: 'El Museo', to: '/museo', accent: '#ef6b78' },
  { label: 'Historia', to: '/historia', accent: '#e38aad' },
  { label: 'Colección', to: '/coleccion', accent: '#c9a29b' },
  { label: 'Visitas', to: '/visitas', accent: '#8f78cd' },
  { label: 'Programación', to: '/programacion', accent: '#5a8ed8' },
  { label: 'Patrimonio', to: '/patrimonio', accent: '#13b4c3' },
  { label: 'Investigación', to: '/investigacion', accent: '#18c4b0' },
  { label: 'Contacto', to: '/contacto', accent: '#88c561' },
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
    <header className="c-header" ref={navContainerRef}>
      <div className="o-container c-header__inner">
        <div className="c-header__top">
          <Link
            className="c-brand"
            to="/"
            aria-label="Ir al inicio del museo"
            onClick={handleNavigationClick}
          >
            <img
              className="c-brand__image"
              src="/MUSEOARTERELIGIOSOARQUIPOPAYAN-12.png"
              alt="Museo Arquidiocesano de Arte Religioso de Popayán"
            />
          </Link>

          <div className="c-header__tools">
            <form className="c-header__search" role="search" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="global-search" className="sr-only">
                Buscar contenidos en el portal
              </label>
              <input id="global-search" name="search" type="search" placeholder="Búsqueda..." />
              <button type="submit" aria-label="Realizar búsqueda">
                <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                  <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M14.6 14.7l4.4 4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </div>

          <button
            type="button"
            className="c-header__toggle"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={handleInlineMenuToggle}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav aria-label="Navegación principal">
          <ul className={`c-header__nav ${isMenuOpen ? 'is-open' : ''}`} id="main-navigation">
            {navigation.map((item) => (
              <li key={item.label}>
                <NavLink
                  className={({ isActive }) =>
                    `c-header__nav-link ${isActive ? 'is-active' : ''}`
                  }
                  to={item.to}
                  onClick={handleNavigationClick}
                  style={{ '--nav-accent': item.accent } as CSSProperties}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
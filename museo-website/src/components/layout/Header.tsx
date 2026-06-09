import { useEffect, useRef, useState, type MouseEvent } from 'react'

const navigation = [
  { label: 'Inicio', href: '#inicio' },
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

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      return
    }

    event.preventDefault()
    setIsMenuOpen(false)

    const targetId = href.slice(1)
    const targetElement = document.getElementById(targetId)

    if (!targetElement) {
      return
    }

    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    targetElement.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
      inline: 'nearest',
    })

    window.history.replaceState(null, '', href)
  }

  return (
    <nav className="header-bar" aria-label="Navegación principal" ref={navContainerRef}>
      <div className="header-inner">
        <a
          className="brand-mark"
          href="#inicio"
          aria-label="Ir al inicio del museo"
          onClick={(event) => handleNavigationClick(event, '#inicio')}
        >
          <span className="brand-mark__title">Museo Arquidiocesano</span>
          <span className="brand-mark__detail">Popayán</span>
        </a>

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
              <a
                className={
                  item.label === 'Inicio'
                    ? 'header-nav__link header-nav__link--home'
                    : item.label === 'Contacto'
                      ? 'header-nav__link header-nav__link--cta'
                      : 'header-nav__link'
                }
                href={item.href}
                onClick={(event) => handleNavigationClick(event, item.href)}
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
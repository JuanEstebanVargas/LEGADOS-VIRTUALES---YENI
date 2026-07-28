import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { FormEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

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

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const clearSearchHighlights = (scope: HTMLElement | null) => {
  if (!scope) {
    return
  }

  const highlights = scope.querySelectorAll('mark[data-search-highlight="true"]')
  highlights.forEach((highlight) => {
    const parent = highlight.parentNode
    if (!parent) {
      return
    }

    parent.replaceChild(document.createTextNode(highlight.textContent ?? ''), highlight)
    parent.normalize()
  })
}

const highlightMatchesInScope = (scope: HTMLElement, query: string) => {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) {
    return [] as HTMLElement[]
  }

  const matcher = new RegExp(escapeRegExp(trimmedQuery), 'gi')
  const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const value = node.textContent ?? ''
      if (!value.trim()) {
        return NodeFilter.FILTER_REJECT
      }

      const parent = node.parentElement
      if (!parent) {
        return NodeFilter.FILTER_REJECT
      }

      if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'MARK'].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT
      }

      return NodeFilter.FILTER_ACCEPT
    },
  })

  const textNodes: Text[] = []
  let currentNode = walker.nextNode()
  while (currentNode) {
    textNodes.push(currentNode as Text)
    currentNode = walker.nextNode()
  }

  const highlights: HTMLElement[] = []

  for (const textNode of textNodes) {
    const value = textNode.textContent ?? ''
    matcher.lastIndex = 0
    if (!matcher.test(value)) {
      continue
    }

    matcher.lastIndex = 0
    const fragment = document.createDocumentFragment()
    let lastIndex = 0
    let match = matcher.exec(value)

    while (match) {
      const start = match.index
      const end = start + match[0].length

      if (start > lastIndex) {
        fragment.append(value.slice(lastIndex, start))
      }

      const mark = document.createElement('mark')
      mark.className = 'c-search-highlight'
      mark.dataset.searchHighlight = 'true'
      mark.textContent = value.slice(start, end)
      fragment.append(mark)
      highlights.push(mark)

      lastIndex = end
      match = matcher.exec(value)
    }

    if (lastIndex < value.length) {
      fragment.append(value.slice(lastIndex))
    }

    textNode.parentNode?.replaceChild(fragment, textNode)
  }

  return highlights
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [matchCount, setMatchCount] = useState(0)
  const [activeMatchIndex, setActiveMatchIndex] = useState(0)
  const navContainerRef = useRef<HTMLElement | null>(null)
  const highlightedNodesRef = useRef<HTMLElement[]>([])
  const location = useLocation()

  const handleInlineMenuToggle = () => {
    setIsMenuOpen((current) => !current)
  }

  useEffect(() => {
    if (!isMenuOpen && !isSearchOpen) {
      return
    }

    const handleClickOutside = (event: PointerEvent) => {
      const container = navContainerRef.current

      if (!container) {
        return
      }

      if (!container.contains(event.target as Node)) {
        setIsMenuOpen(false)
        setIsSearchOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isMenuOpen, isSearchOpen])

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

  useEffect(() => {
    const mainContent = document.getElementById('main-content')
    clearSearchHighlights(mainContent)
    highlightedNodesRef.current = []
    setSearchQuery('')
    setIsSearchOpen(false)
    setMatchCount(0)
    setActiveMatchIndex(0)
  }, [location.pathname])

  const handleNavigationClick = () => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setSearchQuery('')
    clearCurrentSearch()
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const clearCurrentSearch = () => {
    const mainContent = document.getElementById('main-content')
    clearSearchHighlights(mainContent)
    highlightedNodesRef.current = []
    setMatchCount(0)
    setActiveMatchIndex(0)
  }

  const focusMatch = (targetIndex: number, options?: { scroll?: boolean }) => {
    const matches = highlightedNodesRef.current
    if (matches.length === 0) {
      return
    }

    const nextIndex = ((targetIndex % matches.length) + matches.length) % matches.length
    setActiveMatchIndex(nextIndex)

    matches.forEach((node, index) => {
      node.dataset.activeSearchMatch = index === nextIndex ? 'true' : 'false'
    })

    if (options?.scroll ?? true) {
      matches[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const runSearchInCurrentSection = (query: string, options?: { scrollToFirst?: boolean }) => {
    const mainContent = document.getElementById('main-content')
    if (!mainContent) {
      return
    }

    const trimmedQuery = query.trim()
    if (trimmedQuery.length < 2) {
      clearCurrentSearch()
      return
    }

    clearSearchHighlights(mainContent)
    const highlights = highlightMatchesInScope(mainContent, trimmedQuery)

    highlightedNodesRef.current = highlights
    setMatchCount(highlights.length)

    if (highlights.length > 0) {
      focusMatch(0, { scroll: options?.scrollToFirst ?? false })
      return
    }

    setActiveMatchIndex(0)
  }

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSearchOpen(true)
    runSearchInCurrentSection(searchQuery, { scrollToFirst: true })
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
            <form className="c-header__search" role="search" onSubmit={handleSearchSubmit}>
              <label htmlFor="global-search" className="sr-only">
                Buscar contenidos en el portal
              </label>
              <input
                id="global-search"
                name="search"
                type="search"
                placeholder="Buscar en esta sección..."
                autoComplete="off"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(event) => {
                  const value = event.target.value
                  setSearchQuery(value)
                  setIsSearchOpen(true)

                  if (!value.trim()) {
                    clearCurrentSearch()
                    return
                  }

                  runSearchInCurrentSection(value)
                }}
                aria-expanded={isSearchOpen}
                aria-controls="global-search-results"
              />
              <button type="submit" aria-label="Realizar búsqueda">
                <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                  <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M14.6 14.7l4.4 4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              {isSearchOpen ? (
                <div className="c-header__search-results" id="global-search-results" role="status" aria-live="polite">
                  {searchQuery.trim().length < 2 ? (
                    <p className="c-header__search-result is-empty">Escribe al menos 2 caracteres.</p>
                  ) : matchCount > 0 ? (
                    <div className="c-header__search-feedback">
                      <p className="c-header__search-count">
                        {matchCount} coincidencia{matchCount > 1 ? 's' : ''} en esta sección.
                      </p>
                      <div className="c-header__search-nav">
                        <p className="c-header__search-position">Resultado {activeMatchIndex + 1} de {matchCount}</p>
                        <div className="c-header__search-actions">
                          <button type="button" onClick={() => focusMatch(activeMatchIndex - 1)}>
                            Anterior
                          </button>
                          <button type="button" onClick={() => focusMatch(activeMatchIndex + 1)}>
                            Siguiente
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('')
                              clearCurrentSearch()
                            }}
                          >
                            Limpiar
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="c-header__search-result is-empty">Sin coincidencias en esta sección.</p>
                  )}
                </div>
              ) : null}
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
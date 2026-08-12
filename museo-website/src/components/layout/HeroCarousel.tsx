import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { PortalNewsItem } from '../../data/portal/types'

type HeroCarouselAction = {
  label: string
  variant: 'primary' | 'ghost'
  href?: string
  onClick?: () => void
}

type HeroCarouselProps = {
  items: PortalNewsItem[]
  title: string
  kicker?: string
  description?: string
  actions?: HeroCarouselAction[]
  contentAlign?: 'left' | 'center'
}

const isExternalHref = (href: string) => /^https?:\/\//i.test(href)

export function HeroCarousel({
  items,
  title,
  kicker,
  description,
  actions = [],
  contentAlign = 'left',
}: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const hasItems = items.length > 0

  const goToPrev = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % items.length)
  }

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') {
      return true
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!hasItems || isPaused || prefersReducedMotion) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 6500)

    return () => {
      window.clearInterval(timer)
    }
  }, [hasItems, isPaused, items.length, prefersReducedMotion])

  if (!hasItems) {
    return null
  }

  const contentClass = contentAlign === 'center' ? 'c-hero__content c-hero__content--center' : 'c-hero__content c-hero__content--left'

  return (
    <section className="c-hero" aria-label="Carrusel principal" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="c-hero__slides" aria-live="polite">
        {items.map((item, index) => (
          isExternalHref(item.href) ? (
            <a
              key={item.id}
              className={`c-hero__slide${index === activeIndex ? ' is-active' : ''}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ir al contenido: ${item.title}`}
              aria-hidden={index !== activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              style={{ '--hero-image': `url(${item.image})` } as CSSProperties}
            />
          ) : (
            <Link
              key={item.id}
              className={`c-hero__slide${index === activeIndex ? ' is-active' : ''}`}
              to={item.href}
              aria-label={`Ir al contenido: ${item.title}`}
              aria-hidden={index !== activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              style={{ '--hero-image': `url(${item.image})` } as CSSProperties}
            />
          )
        ))}
      </div>

      <div className={contentClass}>
        {kicker && <p className="c-hero__kicker">{kicker}</p>}
        <h1 className="display-title c-hero__title">{title}</h1>
        {description && <p className="c-hero__description">{description}</p>}
        {actions.length > 0 && (
          <div className="c-hero__actions">
            {actions.map((action, index) => {
              const className = `c-button c-button--${action.variant} c-hero__cta`
              const key = `${action.label}-${index}`

              if (action.onClick && !action.href) {
                return (
                  <button key={key} type="button" className={className} onClick={action.onClick}>
                    {action.label}
                  </button>
                )
              }

              if (action.href && isExternalHref(action.href)) {
                return (
                  <a key={key} className={className} href={action.href} target="_blank" rel="noopener noreferrer">
                    {action.label}
                  </a>
                )
              }

              if (action.href && action.href.startsWith('#')) {
                return (
                  <a key={key} className={className} href={action.href}>
                    {action.label}
                  </a>
                )
              }

              return (
                <Link key={key} className={className} to={action.href ?? '/'} onClick={action.onClick}>
                  {action.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <button className="c-hero__nav c-hero__nav--prev" type="button" aria-label="Imagen anterior" onClick={goToPrev}>
        <svg className="c-hero__nav-icon" viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
          <path d="M15 4L7 12L15 20" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button className="c-hero__nav c-hero__nav--next" type="button" aria-label="Imagen siguiente" onClick={goToNext}>
        <svg className="c-hero__nav-icon" viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
          <path d="M9 4L17 12L9 20" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}
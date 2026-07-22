import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { PortalNewsItem } from '../../data/portal/types'

type HeroNewsCarouselProps = {
  items: PortalNewsItem[]
}

const isExternalHref = (href: string) => /^https?:\/\//i.test(href)

export function HeroNewsCarousel({ items }: HeroNewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const hasItems = items.length > 0

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

      <div className="c-hero__controls" role="tablist" aria-label="Seleccionar imagen del carrusel">
        {items.map((item, index) => (
          <button
            key={item.id}
            className={`c-hero__dot${index === activeIndex ? ' is-active' : ''}`}
            type="button"
            role="tab"
            aria-label={`Ir a imagen ${index + 1}`}
            aria-selected={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}

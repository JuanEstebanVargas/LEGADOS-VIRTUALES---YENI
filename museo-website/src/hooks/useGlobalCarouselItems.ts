import { useEffect, useState } from 'react'
import { fetchServerCarouselItems } from '../data/portal/carouselServerApi'
import { basePortalNews } from '../data/portal/news'
import type { PortalNewsItem } from '../data/portal/types'

export function useGlobalCarouselItems(): PortalNewsItem[] {
  const [items, setItems] = useState<PortalNewsItem[]>(basePortalNews)

  useEffect(() => {
    let isMounted = true

    const loadServerItems = async () => {
      try {
        const serverItems = await fetchServerCarouselItems()
        if (!isMounted) {
          return
        }

        setItems([...serverItems, ...basePortalNews])
      } catch {
        if (!isMounted) {
          return
        }

        setItems(basePortalNews)
      }
    }

    void loadServerItems()

    return () => {
      isMounted = false
    }
  }, [])

  return items
}
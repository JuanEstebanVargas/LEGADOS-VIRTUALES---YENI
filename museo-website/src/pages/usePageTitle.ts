import { useEffect } from 'react'

export const SITE_TITLE = 'Museo Arquidiocesano de Popayán'

export function usePageTitle(_title: string) {
  useEffect(() => {
    document.title = SITE_TITLE
  }, [])
}

import { useEffect } from 'react'

export const SITE_TITLE_SUFFIX = 'Museo Arquidiocesano'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${SITE_TITLE_SUFFIX}`
  }, [title])
}

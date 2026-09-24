import { useEffect } from 'react'
import { site } from '../data/projectData'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.title}` : `${site.title} — ${site.artist} · ${site.unit}`
  }, [title])
}

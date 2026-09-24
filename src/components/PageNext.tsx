import { Link } from 'react-router-dom'
import { pages } from '../data/projectData'

/** "Next →" at the bottom of each page so the folio reads as one journey. */
export function PageNext({ slug }: { slug: string }) {
  const i = pages.findIndex((p) => p.slug === slug)
  const next = pages[i + 1]
  const target = next ?? pages[0]
  return (
    <nav className="next frame" aria-label="Next page">
      <Link to={target.path} className="ed next__link">
        <span className="ed__side tiny">
          <span>{next ? 'Next' : 'Back to the start'}</span>
          <span className="muted">{target.n}</span>
        </span>
        <span className="ed__main">
          <span className="next__title">
            {target.nav} <span className="next__arrow">→</span>
          </span>
        </span>
      </Link>
    </nav>
  )
}

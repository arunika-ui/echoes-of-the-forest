import { Link } from 'react-router-dom'
import { pages } from '../data/projectData'

/** Horizontal trail linking every page in order — the site as one walk. */
export function JourneyMap() {
  const stops = pages.filter((p) => p.slug !== 'home')
  return (
    <nav className="journey" aria-label="Journey through the folio">
      <ol className="journey__track">
        {stops.map((p) => (
          <li key={p.slug} className={`journey__stop tone-${p.tone}`}>
            <Link to={p.path}>
              <span className="journey__dot" aria-hidden="true" />
              <span className="tiny muted">{p.n}</span>
              <span className="journey__name">{p.nav}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

import { Link } from 'react-router-dom'
import { site } from '../data/projectData'

export function Footer() {
  return (
    <footer className="footer">
      <div className="frame footer__inner tiny">
        <span>
          {site.title} <span className="muted">— {site.artist} · {site.unit} · {site.year}</span>
        </span>
        <span className="footer__end">
          <Link to="/references">Ethics &amp; References</Link>
          <a href="#top">Back to top ↑</a>
        </span>
      </div>
    </footer>
  )
}

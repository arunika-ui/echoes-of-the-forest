import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { groups, pages, site } from '../data/projectData'

/** Full index of all pages, grouped (native <dialog>: focus trap, Esc, focus return). */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    document.documentElement.classList.toggle('is-locked', open)
  }, [open])

  return (
    <dialog ref={ref} id="mobile-menu" className="menu" aria-label="Folio index" onClose={onClose}>
      <div className="frame menu__bar">
        <Link to="/" className="nav__mark" onClick={onClose}>
          ECHOES / INDEX
        </Link>
        <button type="button" className="nav__toggle is-visible" onClick={onClose} autoFocus>
          Close
        </button>
      </div>
      <nav className="frame menu__grid" aria-label="All pages">
        <div className="menu__group">
          <NavLink to="/" end onClick={onClose} className="menu__link">
            <span className="tiny muted">00</span> Home
          </NavLink>
        </div>
        {groups.map((g) => (
          <div key={g.id} className="menu__group">
            <p className="tiny muted menu__label">{g.label}</p>
            <ul>
              {pages
                .filter((p) => p.group === g.id)
                .map((p) => (
                  <li key={p.slug}>
                    <NavLink to={p.path} onClick={onClose} className="menu__link">
                      <span className="tiny muted">{p.n}</span> {p.nav}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>
      <p className="frame menu__foot tiny muted">
        {site.artist} · {site.unit} · {site.year}
      </p>
    </dialog>
  )
}

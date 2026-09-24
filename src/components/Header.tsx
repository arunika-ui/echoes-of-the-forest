import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { groups, pages } from '../data/projectData'
import { MobileMenu } from './MobileMenu'

/** Sticky nav: mark on the left, the five groups on the right, full page index in a menu. */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const current = pages.find((p) => p.path === pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="frame nav__inner">
        <Link to="/" className="nav__mark" aria-label="Echoes of the Forest — home">
          ECHOES / {current?.n ?? '00'}
        </Link>
        <nav className="nav__links" aria-label="Primary">
          <ul>
            {groups.map((g) => {
              const first = pages.find((p) => p.group === g.id)!
              const active = current?.group === g.id
              return (
                <li key={g.id}>
                  <NavLink to={first.path} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>
                    {g.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          Index
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}

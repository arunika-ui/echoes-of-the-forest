import { NavLink } from 'react-router-dom'
import { groups, pages, type PageDef } from '../data/projectData'

/** Sibling pages within the current group (e.g. Research · Moodboard · Learning). */
export function SubNav({ page }: { page: PageDef }) {
  const siblings = pages.filter((p) => p.group === page.group)
  const group = groups.find((g) => g.id === page.group)
  if (siblings.length < 2) return null
  return (
    <nav className="subnav frame" aria-label={`${group?.label} pages`}>
      <span className="eyebrow muted">{group?.label}</span>
      <ul>
        {siblings.map((p) => (
          <li key={p.slug}>
            <NavLink to={p.path} end>
              <span className="muted">{p.n}</span> {p.nav}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

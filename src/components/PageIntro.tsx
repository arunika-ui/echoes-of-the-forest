import { useLayoutEffect, useRef, type ReactNode } from 'react'
import type { PageDef } from '../data/projectData'
import { gsap, reducedMotion } from '../lib/motion'
import { SubNav } from './SubNav'

/** Page header: mono label left, large serif title, short intro — plus sibling tabs. */
export function PageIntro({ page, children }: { page: PageDef; children?: ReactNode }) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-head]', { autoAlpha: 0, y: 14, duration: 1.2, stagger: 0.1, ease: 'power2.out' })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <header ref={ref} className="ph frame">
        <div className="ed">
          <p className="ed__side tiny" data-head>
            {page.n} / {page.nav}
          </p>
          <div className="ed__main">
            <h1 className="ph__title" data-head>
              {page.title}
            </h1>
            <p className="ph__text" data-head>
              {page.intro}
            </p>
            {children && <div data-head>{children}</div>}
          </div>
        </div>
      </header>
      <SubNav page={page} />
    </>
  )
}

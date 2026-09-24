import { useEffect, useId, useState, type ReactNode } from 'react'
import { ScrollTrigger } from '../lib/motion'

/** Understated text toggle, e.g. "Read project brief +". */
export function Disclosure({
  label,
  children,
  defaultOpen = false,
  className = '',
}: {
  label: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => window.clearTimeout(t)
  }, [open])

  return (
    <div className={`disclosure ${open ? 'is-open' : ''} ${className}`}>
      <button type="button" className="disclosure__btn tiny" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {label} <span className="disclosure__icon" aria-hidden="true">+</span>
      </button>
      <div id={id} className="disclosure__panel" inert={!open}>
        <div className="disclosure__inner">{children}</div>
      </div>
    </div>
  )
}

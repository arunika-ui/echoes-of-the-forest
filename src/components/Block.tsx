import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/** Page section: mono label in the side column, serif heading + content in the main column. */
export function Block({
  id,
  label,
  title,
  lede,
  children,
  wide = false,
  className = '',
}: {
  id?: string
  label: string
  title?: ReactNode
  lede?: ReactNode
  children?: ReactNode
  /** Let content span the full frame width under the heading. */
  wide?: boolean
  className?: string
}) {
  const hid = id ? `${id}-h` : undefined
  return (
    <section id={id} className={`block frame ${className}`} aria-labelledby={title ? hid : undefined} aria-label={title ? undefined : label}>
      <Reveal className="ed">
        <p className="ed__side tiny">{label}</p>
        <div className="ed__main">
          {title && (
            <h2 id={hid} className="block__title">
              {title}
            </h2>
          )}
          {lede && <div className="block__lede">{lede}</div>}
          {!wide && children}
        </div>
      </Reveal>
      {wide && <div className="block__wide">{children}</div>}
    </section>
  )
}

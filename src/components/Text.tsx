/** Plain text passthrough (kept for components that label comparisons). */
export function T({ children }: { children: string }) {
  return <>{children}</>
}

/** Paragraphs with a readable measure. Empty strings are skipped. */
export function Prose({ paras, className = '' }: { paras: string[]; className?: string }) {
  const list = paras.filter((p) => p.trim())
  if (!list.length) return null
  return (
    <div className={`prose ${className}`}>
      {list.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  )
}

/** Label / value metadata. Rows with an empty value are hidden. */
export function MetaList({ items, className = '' }: { items: { label: string; value: string }[]; className?: string }) {
  const rows = items.filter((it) => it.value.trim())
  if (!rows.length) return null
  return (
    <dl className={`meta ${className}`}>
      {rows.map((it) => (
        <div key={it.label} className="meta__item">
          <dt>{it.label}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Renders only while running `npm run dev` — never on the published site. */
export function DevNote({ children }: { children: React.ReactNode }) {
  if (!import.meta.env.DEV) return null
  return (
    <p className="dev-note">
      <span>Dev only</span> {children}
    </p>
  )
}

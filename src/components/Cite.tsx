import { Link } from 'react-router-dom'
import { references, refNumber } from '../data/projectData'

/** Footnote-style Harvard citation linking to the References page. */
export function Cite({ ids }: { ids: string[] }) {
  if (!ids.length) return null
  return (
    <sup className="cite">
      {ids.map((id, i) => {
        const r = references.find((x) => x.id === id)
        return (
          <span key={id}>
            {i > 0 && ','}
            <Link to={`/references#ref-${id}`} title={r?.text.replace(/\*/g, '')} aria-label={`Reference ${refNumber(id)}`}>
              {refNumber(id)}
            </Link>
          </span>
        )
      })}
    </sup>
  )
}

/** Renders a Harvard entry, italicising the *title* part. */
export function RefText({ text }: { text: string }) {
  const parts = text.split('*')
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <cite key={i}>{p}</cite> : <span key={i}>{p}</span>))}
    </>
  )
}

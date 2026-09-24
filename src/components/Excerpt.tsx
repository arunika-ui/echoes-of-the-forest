import { Disclosure } from './Disclosure'

const firstSentence = (t: string) => t.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? t

/**
 * Shows only the first sentence of long academic text; the rest sits behind
 * "Read more". Pass several paragraphs to fold them all after the first sentence.
 */
export function Excerpt({ text, label = 'Read more' }: { text: string | string[]; label?: string }) {
  const paras = Array.isArray(text) ? text : [text]
  const lead = firstSentence(paras[0])
  const rest = [paras[0].slice(lead.length).trim(), ...paras.slice(1)].filter(Boolean)
  return (
    <div className="excerpt">
      <p>{lead}</p>
      {rest.length > 0 && (
        <Disclosure label={label}>
          <div className="prose">
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Disclosure>
      )}
    </div>
  )
}

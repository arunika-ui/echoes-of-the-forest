/** Clearly styled placeholder for evidence that does not exist yet. Never fake content. */
export function PendingCard({
  kind,
  title,
  note,
  status = 'Coming soon',
  ratio = '16/9',
}: {
  kind: string
  title?: string
  note?: string
  status?: 'Coming soon' | 'In development' | 'Not started'
  ratio?: string
}) {
  return (
    <div className="pending" style={{ aspectRatio: ratio }} role="note" aria-label={`${kind}${title ? `: ${title}` : ''} — ${status}`}>
      <span className="pending__status">{status}</span>
      <span className="pending__kind tiny">{kind}</span>
      {title && <span className="pending__title">{title}</span>}
      {note && <span className="pending__note">{note}</span>}
    </div>
  )
}

/** Quiet placeholder for evidence that hasn't been added yet. Never fake content. */
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
    <div className="pending" style={{ aspectRatio: ratio }} role="note" aria-label={`${title ?? kind}: ${status}`}>
      {title && <span className="pending__title">{title}</span>}
      <span className="pending__meta">
        {kind} · {status}
      </span>
      {note && <span className="pending__note">{note}</span>}
    </div>
  )
}

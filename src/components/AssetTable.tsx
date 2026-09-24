import type { Status } from '../data/projectData'

const label: Record<Status, string> = { complete: 'Complete', 'in-progress': 'In progress', 'not-started': 'Not started' }

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge badge--${status}`}>{label[status]}</span>
}

/** Accessible, horizontally scrollable tracker table. */
export function AssetTable<T extends { name: string; status: Status }>({
  caption,
  columns,
  rows,
}: {
  caption: string
  columns: { key: keyof T; label: string }[]
  rows: T[]
}) {
  return (
    <div className="table-wrap" role="region" aria-label={caption} tabIndex={0}>
      <table className="table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} scope="col">
                {c.label}
              </th>
            ))}
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className={r.status === 'complete' ? 'is-complete' : ''}>
              {columns.map((c, i) =>
                i === 0 ? (
                  <th key={String(c.key)} scope="row">
                    {String(r[c.key])}
                  </th>
                ) : (
                  <td key={String(c.key)}>{String(r[c.key])}</td>
                ),
              )}
              <td>
                <StatusBadge status={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

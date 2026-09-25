import { Block } from '../components/Block'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { finalPlan, pageBySlug, timeline, type PlanStatus } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

const planLabel: Record<PlanStatus, string> = { complete: 'Completed', 'in-progress': 'In progress', planned: 'Planned' }

export function TimelinePage() {
  const page = pageBySlug('timeline')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />
      <Block label="Weeks 13–16" title="Final folio plan" wide>
        <div className="table-wrap" role="region" aria-label="Final folio plan, weeks 13 to 16" tabIndex={0}>
          <table className="table gantt">
            <thead>
              <tr>
                <th scope="col">Task</th>
                {finalPlan.weeks.map((w) => (
                  <th key={w} scope="col" className="gantt__wk">
                    W{w}
                  </th>
                ))}
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {finalPlan.tasks.map((t) => (
                <tr key={t.task}>
                  <th scope="row">{t.task}</th>
                  {finalPlan.weeks.map((w) => (
                    <td key={w} className="gantt__cell">
                      {w >= t.start && w <= t.end && <span className={`gantt__bar is-${t.status}`} aria-label={`Week ${w}`} />}
                    </td>
                  ))}
                  <td>
                    <span className={`badge badge--${t.status}`}>{planLabel[t.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a className="text-link mt-sm" href={finalPlan.file.href} download>
          Download {finalPlan.file.label} ↓
        </a>
      </Block>
      <section className="frame block" aria-label="Milestones">
        <div className="ed">
          <p className="ed__side tiny">Milestones</p>
          <Reveal as="ol" className="timeline ed__main" stagger>
            {timeline.map((t) => (
              <li key={t.title} className={`timeline__item is-${t.kind}`}>
                <span className="timeline__dot" aria-hidden="true" />
                <p className="tiny timeline__date">
                  {t.date}
                  {t.kind === 'decision' && ' · Decision'}
                  {t.kind === 'future' && ' · Planned'}
                </p>
                <h2 className="timeline__title">{t.title}</h2>
                <p className="muted">{t.text}</p>
                {t.evidence && <p className="tiny timeline__evidence">Evidence: {t.evidence}</p>}
              </li>
            ))}
          </Reveal>
        </div>
      </section>
      <PageNext slug="timeline" />
    </>
  )
}

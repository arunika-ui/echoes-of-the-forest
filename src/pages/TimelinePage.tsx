import { Block } from '../components/Block'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { pageBySlug, timeline } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function TimelinePage() {
  const page = pageBySlug('timeline')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <Block label="Milestones" title={`${timeline.length} milestones, all completed`} wide>
        <ol className="milestones">
          {timeline.map((m) => (
            <li key={`${m.when}-${m.title}`} className="milestone">
              <span className="milestone__when">{m.when}</span>
              <div className="milestone__body">
                <p className="milestone__title">{m.title}</p>
                {m.detail && <p className="milestone__detail">{m.detail}</p>}
                {m.files && <p className="tiny">{m.files}</p>}
              </div>
              <span className="milestone__status">Completed</span>
            </li>
          ))}
        </ol>
      </Block>

      <PageNext slug="timeline" />
    </>
  )
}

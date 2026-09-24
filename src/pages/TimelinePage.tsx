import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { pageBySlug, timeline } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function TimelinePage() {
  const page = pageBySlug('timeline')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />
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

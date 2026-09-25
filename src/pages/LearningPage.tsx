import { Excerpt } from '../components/Excerpt'
import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { learning, pageBySlug } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function LearningPage() {
  const page = pageBySlug('learning')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <Block label="Skill gaps" title="Least confident areas" lede={<Excerpt text={learning.gapText} />}>
        <ul className="chips">
          {learning.gaps.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </Block>

      <Block label="Learning plan" title="Simple first, then complex" lede={<Excerpt text={learning.planText} />} wide>
        <Reveal as="ol" className="plan" stagger>
          {learning.plan.map((p, i) => (
            <li key={p.stage}>
              <span className="tiny muted">Step {i + 1}</span>
              <p className="plan__stage">{p.stage}</p>
              <p className="muted">{p.items.join(' · ')}</p>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Resources" title="Where the learning comes from" wide>
        <Reveal as="ul" className="grid-4" stagger>
          {learning.resources.map((r) => (
            <li key={r.title}>
              <a className="resource" href={r.url} target="_blank" rel="noopener noreferrer">
                <span className="tiny muted">{r.by}</span>
                <span className="resource__title">{r.title} ↗</span>
                <span className="muted">{r.use}</span>
              </a>
              <Cite ids={[r.ref]} />
            </li>
          ))}
        </Reveal>
      </Block>


      <PageNext slug="learning" />
    </>
  )
}

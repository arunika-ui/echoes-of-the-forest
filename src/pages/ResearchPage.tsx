import { Excerpt } from '../components/Excerpt'
import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { pageBySlug, research } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

function ChoiceCards({ items }: { items: { id: string; title: string; visual: string; why: string; theme: string }[] }) {
  return (
    <Reveal as="ul" className="cards" stagger>
      {items.map((c) => (
        <li key={c.id} className={`card card--${c.id}`}>
          <h3 className="card__title">{c.title}</h3>
          <p className="card__visual">{c.visual}</p>
          <dl>
            <div>
              <dt className="tiny muted">Why I chose it</dt>
              <dd>{c.why}</dd>
            </div>
            <div>
              <dt className="tiny muted">How it supports the theme</dt>
              <dd>{c.theme}</dd>
            </div>
          </dl>
        </li>
      ))}
    </Reveal>
  )
}

export function ResearchPage() {
  const page = pageBySlug('research')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <Block label="XR platform research" title="Presence, constraints and comfort" lede={<Excerpt text={research.intro} />} wide>
        <Reveal as="ul" className="grid-4" stagger>
          {research.xr.map((x) => (
            <li key={x.title} className="note">
              <h3 className="note__title">{x.title}</h3>
              <p>
                {x.text}
                <Cite ids={x.cites} />
              </p>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Low-poly art style" title="Why low-poly" wide>
        <Reveal as="dl" className="qa" stagger>
          {research.lowPoly.map((q) => (
            <div key={q.q}>
              <dt>{q.q}</dt>
              <dd>{q.a}</dd>
            </div>
          ))}
        </Reveal>
      </Block>

      <Block label="Colour palette" title="Greens, amber and cool blue" wide>
        <Reveal as="ul" className="palette" stagger>
          {research.palette.map((p) => (
            <li key={p.id}>
              <div className="palette__swatches" aria-hidden="true">
                {p.swatches.map((s) => (
                  <span key={s} style={{ background: s }} />
                ))}
              </div>
              <p className="palette__name">{p.name}</p>
              <p className="tiny muted">{p.swatches.join(' · ')}</p>
              <p className="muted">{p.reason}</p>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Lighting" title="Four lighting stages" wide>
        <ChoiceCards items={research.lighting} />
      </Block>

      <Block label="Environmental design" title="Guiding without an interface" wide>
        <ChoiceCards items={research.environment} />
      </Block>

      <Block label="Influence" title="How this research shaped the project">
        <Excerpt text={research.influence} />
      </Block>

      <PageNext slug="research" />
    </>
  )
}

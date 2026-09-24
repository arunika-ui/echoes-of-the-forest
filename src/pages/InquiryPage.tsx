import { Excerpt } from '../components/Excerpt'
import { Block } from '../components/Block'
import { InquiryDiagram } from '../components/InquiryDiagram'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { inquiry, pageBySlug, site } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function InquiryPage() {
  const page = pageBySlug('inquiry')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <section className="frame inquiry-hero" aria-label="The inquiry">
        <Reveal className="ed">
          <p className="ed__side tiny">The question</p>
          <div className="ed__main">
            <blockquote className="quote quote--xl">{site.inquiry}</blockquote>
            <p className="block__lede">{inquiry.note}</p>
          </div>
        </Reveal>
      </section>

      <Block label="Introduction" title="Why this question">
        <Excerpt text={inquiry.intro} label="Read the full introduction" />
      </Block>

      <Block label="XR platform" title="Standalone Meta Quest">
        <div className="split-2">
          <Excerpt text={inquiry.platform} />
          <div>
            <p className="tiny muted">What it constrains</p>
            <ul className="ticklist">
              {inquiry.constraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      <Block label="Objectives" title="What the project will deliver" lede={<p>{inquiry.objectivesText}</p>} wide>
        <Reveal as="ol" className="objectives" stagger>
          {inquiry.objectives.map((o) => (
            <li key={o.label}>
              <span className="objectives__n">{o.n}</span>
              <p className="objectives__label">{o.label}</p>
              <p className="muted">{o.text}</p>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Expected outcome" title="A calm, convincing world">
        <Excerpt text={inquiry.outcome} />
      </Block>

      <Block label="How the folio answers it" title="Three inputs, one experience" wide>
        <InquiryDiagram />
      </Block>

      <PageNext slug="inquiry" />
    </>
  )
}

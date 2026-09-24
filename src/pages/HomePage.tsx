import { Link } from 'react-router-dom'
import { AmbientToggle } from '../components/AmbientToggle'
import { Block } from '../components/Block'
import { Hero } from '../components/Hero'
import { JourneyMap } from '../components/JourneyMap'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { home, site } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function HomePage() {
  usePageTitle()
  return (
    <>
      <Hero
        media={home.heroImage}
        mediaCaption={
          <>
            <span>Visual moodboard</span>
            <Link to="/moodboard">View full moodboard →</Link>
          </>
        }
      >
        <p className="hx-subtitle">{site.subtitle}</p>
        <div className="hx-meta">
          <p>
            <strong>{home.credit}</strong>
            3D environment design / Blender / Meta Quest
          </p>
          <p>
            <strong>Theme</strong>
            <span className="tag">{site.theme}</span>
          </p>
        </div>
        <AmbientToggle />
      </Hero>

      <section className="frame summary" aria-label="Summary">
        <Reveal as="p" className="summary__text">
          {site.summary}
        </Reveal>
      </section>

      <section className="frame" aria-label="Quick facts">
        <Reveal as="dl" className="facts" stagger>
          {home.quickFacts.map((f) => (
            <div key={f.label}>
              <dt className="tiny muted">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </Reveal>
      </section>

      <Block label="The journey" title="Follow the trail" lede={<p>The folio reads like the walk itself — from concept, through research and development, to the finished forest at night.</p>} wide>
        <JourneyMap />
      </Block>

      <Block label="Folio inquiry" title={<span className="quote">{site.inquiry}</span>}>
        <Link to="/inquiry" className="text-link">
          How each section answers it →
        </Link>
      </Block>

      <PageNext slug="home" />
    </>
  )
}

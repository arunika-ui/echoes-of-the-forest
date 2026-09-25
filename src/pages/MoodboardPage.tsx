import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { useLightbox } from '../components/useLightbox'
import { MediaFigure } from '../components/Media'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { moodboard, pageBySlug } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function MoodboardPage() {
  const page = pageBySlug('moodboard')
  usePageTitle(page.nav)
  const lb = useLightbox([{ ...moodboard.image, caption: 'Echoes of the Forest visual moodboard' }])
  return (
    <>
      <PageIntro page={page} />

      <section className="frame moodboard" aria-label="Visual moodboard">
        <Reveal>
          <MediaFigure media={moodboard.image} onOpen={() => lb.open(0)} eager fit="contain" sizes="100vw" />
        </Reveal>
        <div className="moodboard__bar">
          <span className="tiny muted">Click the image to zoom</span>
          <a className="text-link" href={moodboard.fullResolution} download>
            Download full resolution ({moodboard.fullResolutionInfo})
          </a>
        </div>
        {lb.node}
      </section>

      <Block label="Annotation" title="What the board sets out">
        <p className="prose">{moodboard.annotation}</p>
      </Block>

      <Block label="Influences" title="References behind the board" wide>
        <Reveal as="ol" className="influences" stagger>
          {moodboard.influences.map((f) => (
            <li key={f.title}>
              <p className="influences__title">
                {f.title}
                <Cite ids={[f.ref]} />
              </p>
              <p className="tiny muted">{f.role}</p>
              {f.why && <p className="influences__why">{f.why}</p>}
            </li>
          ))}
        </Reveal>
      </Block>

      <PageNext slug="moodboard" />
    </>
  )
}

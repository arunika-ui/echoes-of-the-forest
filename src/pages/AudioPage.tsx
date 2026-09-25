import { Excerpt } from '../components/Excerpt'
import { AudioPlayer } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { useLightbox } from '../components/Lightbox'
import { MediaFigure } from '../components/Media'
import { Reveal } from '../components/Reveal'
import { pageBySlug, sonic, sonicMoodboard } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function AudioPage() {
  const page = pageBySlug('audio')
  usePageTitle(page.nav)
  const lb = useLightbox(sonic.editingShots)
  return (
    <>
      <PageIntro page={page} />

      <Block label="Why audio matters" title="Sound marks the passage of time">
        <Excerpt text={sonic.why} />
      </Block>

      <Block
        label="Sonic moodboard"
        title="Sourced reference sounds"
        lede={
          <p>
            Nine clips collected for the sonic moodboard. They are <strong>sourced, unedited reference material</strong> — not the final edited assets.
          </p>
        }
        wide
      >
        <Reveal as="ul" className="audio-grid" stagger>
          {sonicMoodboard.map((c) => (
            <li key={c.ref}>
              <AudioPlayer
                item={c.audio}
                credit={
                  <>
                    {c.contributor} · Pixabay
                    <Cite ids={[c.ref]} />
                  </>
                }
              />
              <p className="audio-grid__file tiny muted">
                {c.file} · {c.duration}
              </p>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Editing process" title="From source to edited asset" wide>
        <ul className="chips">
          {sonic.edits.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <Reveal as="ul" className="grid-3 shots mt" stagger>
          {sonic.editingShots.map((shot, i) => (
            <li key={shot.key}>
              <MediaFigure media={shot} fit="contain" onOpen={() => lb.open(i)} sizes="(min-width: 900px) 30vw, 100vw" />
            </li>
          ))}
        </Reveal>
        <p className="tiny muted mt">Click a screenshot to enlarge.</p>
        {lb.node}
      </Block>

      <PageNext slug="audio" />
    </>
  )
}

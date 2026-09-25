import { Excerpt } from '../components/Excerpt'
import { AudioPlayer } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { PendingCard } from '../components/PendingCard'
import { Reveal } from '../components/Reveal'
import { pageBySlug, sonic, sonicMoodboard } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function AudioPage() {
  const page = pageBySlug('audio')
  usePageTitle(page.nav)
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
        <div className="grid-3 mt">
          <PendingCard kind="Screenshot" title="Editing screenshot 1" />
          <PendingCard kind="Screenshot" title="Editing screenshot 2" />
          <PendingCard kind="Screenshot" title="Editing screenshot 3" />
        </div>
      </Block>

      <PageNext slug="audio" />
    </>
  )
}

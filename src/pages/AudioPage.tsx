import { Excerpt } from '../components/Excerpt'
import { AudioPlayer } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { useLightbox } from '../components/useLightbox'
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

      <Block label="Sound design" title="Creating sound from scratch" lede={<p>A recording of me creating an original sound from scratch.</p>} wide>
        <div className="portrait-video">
          <MediaFigure media={sonic.fromScratch} />
        </div>
      </Block>

      <Block
        label="Sonic moodboard"
        title="Sourced reference sounds"
        lede={<p>Nine clips collected as reference. They are sourced and unedited, not the final assets.</p>}
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
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Editing process" title="From source to edited asset" lede={<p>Edited in Audacity using {sonic.editedWith}.</p>} wide>
        <Reveal as="ul" className="grid-3 shots" stagger>
          {sonic.editingShots.map((shot, i) => (
            <li key={shot.key}>
              <MediaFigure media={shot} fit="contain" onOpen={() => lb.open(i)} sizes="(min-width: 900px) 30vw, 100vw" />
            </li>
          ))}
        </Reveal>
        {lb.node}
      </Block>

      <PageNext slug="audio" />
    </>
  )
}

import { AudioPlayer, hasAudio } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { PendingCard } from '../components/PendingCard'
import { Reveal } from '../components/Reveal'
import { SoundMixer } from '../components/SoundMixer'
import { pageBySlug, soundscape } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function SoundscapePage() {
  const page = pageBySlug('soundscape')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <Block label="Day → night" title="Soundscape prototype" lede={<p>Crossfade between day layers (birds, forest, leaves) and night layers (wind, crickets, campfire). Built from the sourced moodboard clips for now.</p>} wide>
        <SoundMixer day={soundscape.mixer.day} night={soundscape.mixer.night} />
      </Block>

      <Block label="Final assets" title="Ten edited environmental sounds" wide>
        <Reveal as="ul" className="grid-3" stagger>
          {soundscape.finals.map((f) => (
            <li key={f.name}>
              {f.audio && hasAudio(f.audio) ? (
                <AudioPlayer item={f.audio} />
              ) : (
                <PendingCard kind={`WAV · 48 kHz · ${f.duration}`} title={f.name} status="Not started" ratio="auto" />
              )}
            </li>
          ))}
        </Reveal>
      </Block>

      <PageNext slug="soundscape" />
    </>
  )
}

import { AudioPlayer } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
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

      <Block label="Final assets" title="Edited environmental sounds" lede={<p>More sounds will be added as they are edited.</p>} wide>
        <Reveal as="ul" className="grid-2 sounds" stagger>
          {soundscape.finals.map((f) => (
            <li key={f.name}>
              <AudioPlayer item={f.audio} credit={`WAV · ${f.duration}`} />
            </li>
          ))}
        </Reveal>
      </Block>

      <PageNext slug="soundscape" />
    </>
  )
}

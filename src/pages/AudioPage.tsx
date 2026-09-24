import { Excerpt } from '../components/Excerpt'
import { AudioPlayer } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { EvidenceCard } from '../components/EvidenceCard'
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
          <PendingCard kind="Audio · before" title="Source clip" note="Before/after pairs appear once edits exist." ratio="auto" />
          <PendingCard kind="Audio · after" title="Edited clip" ratio="auto" />
          <EvidenceCard kind="image" title="DAW screenshot" media={sonic.dawScreenshot} inquiry="Shows how sourced audio is substantially modified." />
        </div>
      </Block>

      <Block label="Voice memos" title="Process recordings" wide>
        {sonic.voiceMemos.length ? (
          <div className="grid-2">
            {sonic.voiceMemos.map((v) => (
              <EvidenceCard key={v.audio.key} kind="audio" title={v.audio.title} audio={v.audio} date={v.date}>
                <details className="transcript">
                  <summary className="tiny">Transcript</summary>
                  <p>{v.transcript}</p>
                </details>
              </EvidenceCard>
            ))}
          </div>
        ) : (
          <div className="grid-2">
            <PendingCard kind="Voice memo" title="Process recording" note="Each memo will include a transcript." ratio="auto" />
            <PendingCard kind="Google Drive" title="Source folders" note="Links will appear here as “Listen on Drive ↗”." ratio="auto" />
          </div>
        )}
        {sonic.driveLinks.length > 0 && (
          <ul className="link-list">
            {sonic.driveLinks.map((d) => (
              <li key={d.url}>
                <a href={d.url} target="_blank" rel="noopener noreferrer">
                  {d.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </Block>

      <Block label="Ethics" title="Credited and substantially modified">
        <p className="prose">{sonic.ethics}</p>
      </Block>

      <PageNext slug="audio" />
    </>
  )
}

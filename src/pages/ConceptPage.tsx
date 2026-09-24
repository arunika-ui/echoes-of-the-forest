import { AudioPlayer } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { concept, pageBySlug } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function ConceptPage() {
  const page = pageBySlug('concept')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <Block label="Project overview" title="The trail and the campsite" lede={<p>{concept.overview}</p>}>
        <div className="two-lists">
          <div>
            <p className="tiny muted">Along the trail</p>
            <ul className="chips">
              {concept.landmarks.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="tiny muted">At the secluded campsite</p>
            <ul className="chips chips--warm">
              {concept.campsite.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      <Block label="Environmental storytelling" title="Someone has been here recently">
        <p className="prose">{concept.storytelling}</p>
      </Block>

      <Block label="Day → night" title="Light and sound change together" lede={<p>{concept.transitionIntro}</p>} wide>
        <Reveal as="ol" className="stages" stagger>
          {concept.stages.map((s, i) => (
            <li key={s.id} className={`stage stage--${s.id}`}>
              <p className="tiny">
                {String(i + 1).padStart(2, '0')} · {s.label}
              </p>
              <dl>
                <div>
                  <dt className="tiny muted">Light</dt>
                  <dd>{s.light}</dd>
                </div>
                <div>
                  <dt className="tiny muted">Sound</dt>
                  <dd>{s.sound}</dd>
                </div>
              </dl>
              <AudioPlayer item={s.clip} credit="Sourced moodboard clip — unedited" />
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Theme justification" title="Experience & Exploration">
        <div className="prose">
          {concept.themeJustification.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Block>

      <Block label="Audience & comfort" title="Who it is for">
        <div className="split-2">
          <div className="prose">
            {concept.audience.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div>
            <p className="tiny muted">Designed for comfort</p>
            <ul className="ticklist">
              {concept.comfort.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      <PageNext slug="concept" />
    </>
  )
}

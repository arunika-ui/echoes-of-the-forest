import { Block } from '../components/Block'
import { EvidenceCard } from '../components/EvidenceCard'
import { ModelViewer } from '../components/ModelViewer'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { finalEnvironment as fe, pageBySlug } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function FinalPage() {
  const page = pageBySlug('final')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <section className="frame" aria-label="Interactive scene">
        <ModelViewer src={fe.scene.src} alt={fe.scene.alt} ratio="16/9" />
        <p className="viewer-meta tiny muted">
          {fe.scene.title}
        </p>
      </section>

      <Block label="Walkthrough" title="Day and night" lede={<p>Two walkthroughs of the finished scene, with sound. Press play and turn your volume up.</p>} wide>
        <div className="grid-2">
          {fe.films.map((f) => (
            <EvidenceCard key={f.title} kind="video" title={f.title} media={f.media} caption={<p>{f.note}</p>} />
          ))}
        </div>
      </Block>


      <PageNext slug="final" />
    </>
  )
}

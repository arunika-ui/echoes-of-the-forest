import { Block } from '../components/Block'
import { EvidenceCard } from '../components/EvidenceCard'
import { ModelViewer } from '../components/ModelViewer'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { finalEnvironment as fe, pageBySlug } from '../data/projectData'
import { mb } from '../lib/format'
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
          {fe.scene.title} · {fe.scene.tris} triangles · {mb(fe.scene.size)} (compressed GLB) · 3D_SceneModel.glb
        </p>
      </section>

      <Block label="Renders" title="Four lighting stages" wide>
        <div className="grid-2">
          {fe.renders.map((r) => (
            <EvidenceCard key={r.title} kind="image" title={r.title} media={r.media} inquiry="Shows how lighting changes the atmosphere from afternoon to night." />
          ))}
        </div>
      </Block>

      <Block label="Walkthrough" title="Quest capture" wide>
        <EvidenceCard kind="video" title="Walkthrough / Quest capture" media={fe.walkthrough} inquiry="Evidence of the experience running as standalone VR." />
      </Block>

      <PageNext slug="final" />
    </>
  )
}

import { ModelViewer } from '../components/ModelViewer'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { finalModels, pageBySlug } from '../data/projectData'
import { mb } from '../lib/format'
import { resolveMedia } from '../lib/media'
import { usePageTitle } from './usePageTitle'

export function ModelsPage() {
  const page = pageBySlug('models')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />
      <section className="frame block" aria-label="Four final models">
        <Reveal as="ul" className="models" stagger>
          {finalModels.map((mdl, i) => {
            const glb = mdl.src && resolveMedia(mdl.src)
            const stats = [
              { label: 'Poly budget', value: mdl.polyBudget },
              { label: 'Triangles', value: mdl.tris },
              { label: 'Textures', value: mdl.textures },
              { label: 'File size', value: mdl.size && mb(mdl.size) },
            ].filter((s) => s.value)
            return (
              <li key={i} className="model">
                {glb ? (
                  <ModelViewer src={mdl.src!} alt={mdl.alt!} ratio="1/1" />
                ) : (
                  <a className="pending model__sketchfab" style={{ aspectRatio: '1/1' }} href={mdl.sketchfabUrl} target="_blank" rel="noopener noreferrer">
                    <span className="pending__title">{mdl.name}</span>
                    <span className="pending__meta">Interactive 3D model · Open on Sketchfab ↗</span>
                  </a>
                )}
                <div className="model__body">
                  <p className="tiny muted">Model {String(i + 1).padStart(2, '0')} · Complete</p>
                  <h2 className="model__name">{mdl.name}</h2>
                  <dl className="model__stats">
                    {stats.map((s) => (
                      <div key={s.label}>
                        <dt className="tiny muted">{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {!glb && mdl.sketchfabUrl && (
                    <a className="text-link" href={mdl.sketchfabUrl} target="_blank" rel="noopener noreferrer">
                      View on Sketchfab ↗
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </Reveal>
      </section>
      <PageNext slug="models" />
    </>
  )
}

import { ModelViewer } from '../components/ModelViewer'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { PendingCard } from '../components/PendingCard'
import { Reveal } from '../components/Reveal'
import { finalModels, pageBySlug } from '../data/projectData'
import { mb } from '../lib/format'
import { usePageTitle } from './usePageTitle'

export function ModelsPage() {
  const page = pageBySlug('models')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />
      <section className="frame block" aria-label="Four final models">
        <Reveal as="ul" className="models" stagger>
          {finalModels.map((mdl, i) =>
            mdl.status === 'complete' ? (
              <li key={i} className="model">
                <ModelViewer src={mdl.src!} alt={mdl.alt!} ratio="1/1" />
                <div className="model__body">
                  <p className="tiny muted">Model {String(i + 1).padStart(2, '0')} · Complete</p>
                  <h2 className="model__name">{mdl.name}</h2>
                  <dl className="model__stats">
                    <div>
                      <dt className="tiny muted">Poly budget</dt>
                      <dd>{mdl.polyBudget}</dd>
                    </div>
                    <div>
                      <dt className="tiny muted">Triangles</dt>
                      <dd>{mdl.tris}</dd>
                    </div>
                    <div>
                      <dt className="tiny muted">Textures</dt>
                      <dd>{mdl.textures}</dd>
                    </div>
                    <div>
                      <dt className="tiny muted">File size</dt>
                      <dd>{mb(mdl.size!)}</dd>
                    </div>
                  </dl>
                  {mdl.sketchfabUrl ? (
                    <a className="text-link" href={mdl.sketchfabUrl} target="_blank" rel="noopener noreferrer">
                      View on Sketchfab ↗
                    </a>
                  ) : (
                    <p className="tiny muted">Sketchfab link coming soon</p>
                  )}
                </div>
              </li>
            ) : (
              <li key={i} className="model">
                <PendingCard kind={`Model ${String(i + 1).padStart(2, '0')}`} status="In development" note="Not yet chosen; one of the tracker assets." ratio="1/1" />
              </li>
            ),
          )}
        </Reveal>
      </section>
      <PageNext slug="models" />
    </>
  )
}

import { ModelViewer } from '../components/ModelViewer'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { finalModels, pageBySlug } from '../data/projectData'
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
          {finalModels.map((mdl, i) => (
            <li key={i} className="model">
              {mdl.src && resolveMedia(mdl.src) ? (
                <ModelViewer src={mdl.src} alt={mdl.alt!} ratio="1/1" />
              ) : (
                <a className="pending model__sketchfab" style={{ aspectRatio: '1/1' }} href={mdl.sketchfabUrl} target="_blank" rel="noopener noreferrer">
                  <span className="pending__title">{mdl.name}</span>
                  <span className="pending__meta">Open on Sketchfab ↗</span>
                </a>
              )}
              <div className="model__body">
                <p className="tiny muted">Model {String(i + 1).padStart(2, '0')}</p>
                <h2 className="model__name">{mdl.name}</h2>
              </div>
            </li>
          ))}
        </Reveal>
      </section>
      <PageNext slug="models" />
    </>
  )
}

import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { EvidenceCard } from '../components/EvidenceCard'
import { MediaFigure } from '../components/Media'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { blenderProcess as bp, pageBySlug } from '../data/projectData'
import { mb } from '../lib/format'
import { usePageTitle } from './usePageTitle'



export function ProcessPage() {
  const page = pageBySlug('process')
  usePageTitle(page.nav)
  const maxBefore = Math.max(...bp.optimisation.map((o) => o.before))
  return (
    <>
      <PageIntro page={page} />

      <Block label="Workflow" title="From blockout to Quest-ready" wide>
        <Reveal as="ol" className="workflow" stagger>
          {bp.workflow.map((w, i) => (
            <li key={w.step}>
              <span className="tiny muted">{String(i + 1).padStart(2, '0')}</span>
              <p className="workflow__step">{w.step}</p>
              <p className="muted">{w.note}</p>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Organisation" title="Naming conventions and file structure" wide>
        <div className="split-2">
          <pre className="filetree" aria-label="Project folder structure">{bp.tree.join('\n')}</pre>
          <dl className="naming">
            {bp.naming.map((n) => (
              <div key={n.pattern}>
                <dt>
                  <code>{n.pattern}</code>
                </dt>
                <dd className="muted">{n.example}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Block>

      <Block label="Textures" title="Four 1K PBR sets" lede={<p>{bp.textureMaps}</p>} wide>
        <Reveal as="ul" className="textures" stagger>
          {bp.textures.map((t) => (
            <li key={t.id}>
              <MediaFigure media={t.media} sizes="(min-width: 900px) 22vw, 50vw" />
              <p className="textures__name">
                {t.id}
                <Cite ids={[t.ref]} />
              </p>
              <p className="tiny muted">{t.folder}</p>
              <p className="muted">{t.use} · ambientCG, CC0</p>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Optimisation" title="Budgets, triangles and file size" lede={<p>{bp.optimisationNote}</p>} wide>
        <div className="table-wrap" role="region" aria-label="Optimisation results" tabIndex={0}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Poly budget</th>
                <th scope="col">Actual triangles</th>
                <th scope="col">Textures</th>
                <th scope="col">GLB before</th>
                <th scope="col">GLB after</th>
                <th scope="col">Saved</th>
              </tr>
            </thead>
            <tbody>
              {bp.optimisation.map((o) => (
                <tr key={o.model}>
                  <th scope="row">
                    {o.model}
                    <span className="tiny muted table__sub">{o.file}</span>
                  </th>
                  <td>{o.budget}</td>
                  <td>{o.tris}</td>
                  <td>1024 → WebP</td>
                  <td>{mb(o.before)}</td>
                  <td>{mb(o.after)}</td>
                  <td>{Math.round((1 - o.after / o.before) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Reveal as="ul" className="bars" stagger>
          {bp.optimisation.map((o) => (
            <li key={o.model}>
              <span className="bars__label">{o.model}</span>
              <span className="bars__track" aria-hidden="true">
                <i className="bars__before" style={{ width: `${(o.before / maxBefore) * 100}%` }} />
                <i className="bars__after" style={{ width: `${(o.after / maxBefore) * 100}%` }} />
              </span>
              <span className="tiny muted">
                {mb(o.before)} → {mb(o.after)}
              </span>
            </li>
          ))}
        </Reveal>
        <div className="tiers">
          <p className="tiny muted">Texture resolution tiers (asset tracker)</p>
          <ul>
            {bp.resolutionTiers.map((t) => (
              <li key={t.res}>
                <span className="tiers__res">{t.res}</span>
                <span className="muted">{t.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </Block>

      <Block label="Screenshots" title="Blender process" wide>
        <div className="grid-2">
          {bp.screenshots.map((s) => (
            <EvidenceCard key={s.title} kind="image" title={s.title} media={s.media} inquiry="Documents how the original low-poly models were built." />
          ))}
        </div>
      </Block>

      <PageNext slug="process" />
    </>
  )
}

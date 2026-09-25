import { Block } from '../components/Block'
import { Cite } from '../components/Cite'
import { EvidenceCard } from '../components/EvidenceCard'
import { MediaFigure } from '../components/Media'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { PendingCard } from '../components/PendingCard'
import { Reveal } from '../components/Reveal'
import { blenderProcess as bp, pageBySlug } from '../data/projectData'
import { usePageTitle } from './usePageTitle'



export function ProcessPage() {
  const page = pageBySlug('process')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <Block label="Textures" title="Texture sets" lede={<p>{bp.textureMaps}</p>} wide>
        <Reveal as="ul" className="textures" stagger>
          {bp.textures.map((t) => (
            <li key={t.id}>
              <MediaFigure media={t.media} sizes="(min-width: 900px) 22vw, 50vw" />
              <p className="textures__name">
                {t.id}
                {'ref' in t && t.ref && <Cite ids={[t.ref]} />}
              </p>
              <p className="muted">{'ref' in t ? `${t.use} · ambientCG, CC0` : t.use}</p>
            </li>
          ))}
        </Reveal>
        <div className="grid-2 mt">
          <PendingCard kind="Screenshots" title="Texturing in Blender" ratio="auto" />
          <a className="download-card" href={bp.texturesZip.href} download>
            <span className="tiny muted">ZIP · {bp.texturesZip.size}</span>
            <span className="download-card__title">Download texture files ↓</span>
          </a>
        </div>
      </Block>

      <Block label="Optimisation" title="Optimisation report" wide>
        <PendingCard kind="PDF" title="Optimisation report" ratio="auto" />
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

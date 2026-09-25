import { Block } from '../components/Block'
import { MediaFigure } from '../components/Media'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
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
        <div className="texsets">
          {bp.textureSets.map((set) => (
            <section key={set.name} className="texset" aria-label={set.name}>
              <h3 className="texset__name">
                {set.name} <span className="tiny muted">{set.maps.length} maps</span>
              </h3>
              <Reveal as="ul" className="textures" stagger>
                {set.maps.map((map) => (
                  <li key={map.file}>
                    <MediaFigure media={map.media} sizes="(min-width: 900px) 18vw, 50vw" />
                    <p className="textures__map">{map.label}</p>
                    <p className="tiny muted">{map.file}</p>
                  </li>
                ))}
              </Reveal>
            </section>
          ))}
        </div>
        <a className="download-card mt" href={bp.texturesZip.href} download>
          <span className="tiny muted">ZIP · {bp.texturesZip.size}</span>
          <span className="download-card__title">Download all texture files ↓</span>
        </a>
      </Block>

      <PageNext slug="process" />
    </>
  )
}

import { Block } from '../components/Block'
import { MediaFigure } from '../components/Media'
import { PageIntro } from '../components/PageIntro'
import { useLightbox } from '../components/useLightbox'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { blenderProcess as bp, pageBySlug } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function ProcessPage() {
  const page = pageBySlug('process')
  usePageTitle(page.nav)
  const lb = useLightbox(bp.screenshots)
  return (
    <>
      <PageIntro page={page} />

      <Block label="Screenshots" title="Building the forest in Blender" wide>
        <Reveal as="ul" className="grid-3 shots" stagger>
          {bp.screenshots.map((shot, i) => (
            <li key={shot.key}>
              <MediaFigure media={shot} fit="contain" onOpen={() => lb.open(i)} sizes="(min-width: 900px) 30vw, 100vw" />
            </li>
          ))}
        </Reveal>
        {lb.node}
      </Block>

      <Block label="Textures" title="Texture sets" lede={<p>{bp.textureMaps}</p>} wide>
        <div className="texsets">
          {bp.textureSets.map((set) => (
            <section key={set.name} className="texset" aria-label={set.name}>
              <h3 className="texset__name">{set.name}</h3>
              <Reveal as="ul" className="textures" stagger>
                {set.maps.map((map) => (
                  <li key={map.file}>
                    <MediaFigure media={map.media} sizes="(min-width: 900px) 18vw, 50vw" />
                    <p className="textures__map" title={map.file}>
                      {map.label}
                    </p>
                  </li>
                ))}
              </Reveal>
            </section>
          ))}
        </div>
        <a className="download-card mt" href={bp.texturesZip.href} download>
          <span className="download-card__title">Download all texture files</span>
          <span className="tiny">ZIP, {bp.texturesZip.size}</span>
        </a>
      </Block>

      <PageNext slug="process" />
    </>
  )
}

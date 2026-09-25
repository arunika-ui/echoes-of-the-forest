import { AssetTable } from '../components/AssetTable'
import { AudioPlayer } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { MediaFigure } from '../components/Media'
import { useLightbox } from '../components/useLightbox'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { assetManagement, audioAssets, pageBySlug, visualAssets } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function AssetsPage() {
  const page = pageBySlug('assets')
  usePageTitle(page.nav)
  const lb = useLightbox([assetManagement])
  const done = visualAssets.filter((v) => v.status === 'complete').length
  return (
    <>
      <PageIntro page={page}>
        <dl className="facts facts--inline">
          <div>
            <dt className="tiny muted">Visual assets complete</dt>
            <dd>
              {done} / {visualAssets.length}
            </dd>
          </div>
          <div>
            <dt className="tiny muted">Edited sounds</dt>
            <dd>{audioAssets.length}</dd>
          </div>
        </dl>
      </PageIntro>

      <Block label="Asset management" title="Project folder structure" lede={<p>How the project files are organised, from models and textures to renders and audio.</p>} wide>
        <MediaFigure media={assetManagement} fit="contain" onOpen={() => lb.open(0)} />
        {lb.node}
      </Block>

      <Block label="Visual asset tracker" title="3D assets" lede={<p>From the project’s asset tracker. The tree, tent, boulder and campfire became the four final models.</p>} wide>
        <AssetTable
          caption="Visual asset tracker"
          rows={visualAssets}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category' },
            { key: 'description', label: 'Description' },
            { key: 'texture', label: 'Texture' },
            { key: 'resolution', label: 'Resolution' },
            { key: 'lighting', label: 'Lighting' },
            { key: 'relatedTo', label: 'Related to' },
            { key: 'polys', label: 'Poly count' },
          ]}
        />
      </Block>

      <Block label="Edited audio" title="Final audio assets" wide>
        <Reveal as="ul" className="grid-2 sounds" stagger>
          {audioAssets.map((s) => (
            <li key={s.name}>
              <AudioPlayer item={s.audio} credit={`WAV · ${s.duration}`} />
            </li>
          ))}
        </Reveal>
      </Block>

      <PageNext slug="assets" />
    </>
  )
}

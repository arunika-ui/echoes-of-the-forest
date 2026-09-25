import { AssetTable } from '../components/AssetTable'
import { AudioPlayer } from '../components/AudioPlayer'
import { Block } from '../components/Block'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { audioAssets, pageBySlug, visualAssets } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function AssetsPage() {
  const page = pageBySlug('assets')
  usePageTitle(page.nav)
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

      <Block label="Visual asset tracker" title="3D assets" lede={<p>From the project’s asset tracker. Only the pine tree and camping tent are complete; the final four models will be drawn from this list.</p>} wide>
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

      <Block label="Edited audio" title="Environmental audio" lede={<p>Cleaned WAVs, 48 kHz stereo. Press play — one sound plays at a time.</p>} wide>
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

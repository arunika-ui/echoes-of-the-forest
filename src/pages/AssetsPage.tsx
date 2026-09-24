import { AssetTable } from '../components/AssetTable'
import { Block } from '../components/Block'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { audioAssets, pageBySlug, visualAssets } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

export function AssetsPage() {
  const page = pageBySlug('assets')
  usePageTitle(page.nav)
  const done = visualAssets.filter((v) => v.status === 'complete').length
  const audioDone = audioAssets.filter((v) => v.status === 'complete').length
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
            <dt className="tiny muted">Audio assets complete</dt>
            <dd>
              {audioDone} / {audioAssets.length}
            </dd>
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

      <Block label="Audio asset tracker" title="Environmental audio" lede={<p>Ten planned edited WAV assets at 48 kHz. None have been started yet — the sourced sonic moodboard clips are reference material only.</p>} wide>
        <AssetTable
          caption="Audio asset tracker"
          rows={audioAssets}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category' },
            { key: 'description', label: 'Description' },
            { key: 'format', label: 'Format' },
            { key: 'duration', label: 'Duration' },
            { key: 'relatedTo', label: 'Related to' },
            { key: 'sampleRate', label: 'Sample rate' },
          ]}
        />
      </Block>

      <PageNext slug="assets" />
    </>
  )
}

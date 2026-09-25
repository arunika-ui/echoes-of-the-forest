import { Block } from '../components/Block'
import { RefText } from '../components/Cite'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { ethics, pageBySlug, references } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

const GROUPS = ['Academic & technical', 'Artistic & visual', 'Textures', 'Audio'] as const

export function ReferencesPage() {
  const page = pageBySlug('references')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />

      <Block label="Ethics" title="Ethical considerations" wide>
        <Reveal as="ul" className="grid-4" stagger>
          {ethics.map((e) => (
            <li key={e.title} className="note">
              <h3 className="note__title">{e.title}</h3>
              <p>{e.text}</p>
            </li>
          ))}
        </Reveal>
      </Block>

      <Block label="Harvard references" title="Reference list" lede={<p>Numbers match the footnotes used across the site. Entries marked “to verify” contain details that could not be confirmed from the project files.</p>}>
        {GROUPS.map((g) => (
          <div key={g} className="refgroup">
            <p className="tiny muted">{g}</p>
            <ol className="refs">
              {references
                .map((r, i) => ({ r, n: i + 1 }))
                .filter(({ r }) => r.group === g)
                .map(({ r, n }) => (
                  <li key={r.id} id={`ref-${r.id}`}>
                    <span className="refs__n tiny">{n}</span>
                    <span>
                      <RefText text={r.text} />
                      {r.url && (
                        <>
                          {' '}
                          Available at:{' '}
                          <a href={r.url} target="_blank" rel="noopener noreferrer">
                            {r.url}
                          </a>
                        </>
                      )}
                      {r.accessed && ` (Accessed: ${r.accessed})`}
                      {r.url && !r.accessed && ' (Accessed: to verify)'}.
                      {r.toVerify && <span className="verify tiny"> To verify: {r.toVerify}</span>}
                    </span>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </Block>

      <PageNext slug="references" />
    </>
  )
}

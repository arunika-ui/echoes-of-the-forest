import { Block } from '../components/Block'
import { Disclosure } from '../components/Disclosure'
import { PageIntro } from '../components/PageIntro'
import { PageNext } from '../components/PageNext'
import { Reveal } from '../components/Reveal'
import { pageBySlug, reflection } from '../data/projectData'
import { usePageTitle } from './usePageTitle'

const firstSentence = (t: string) => t.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? t

export function ReflectionPage() {
  const page = pageBySlug('reflection')
  usePageTitle(page.nav)
  return (
    <>
      <PageIntro page={page} />
      <Block label="Final submission" title="Final reflection" lede={<p>Progressive Folio 2 and the final submission, answered through the four reflection prompts.</p>}>
        <ol className="reflections">
          {reflection.final.map((r, i) => (
            <Reveal as="li" key={r.id} id={r.id} className="ed reflection">
              <p className="ed__side tiny">{String(i + 1).padStart(2, '0')}</p>
              <div className="ed__main">
                <h2 className="reflection__title">{r.title}</h2>
                <p className="reflection__prompt tiny muted">{r.prompt}</p>
                <p className="prose">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Block>
      <section className="frame block" aria-label="Weeks 1–4 reflections">
        <p className="tiny muted">Weeks 1–4 · Self reflection</p>
        <ol className="reflections">
          {reflection.sections.map((r, i) => {
            const lede = firstSentence(r.text)
            return (
              <Reveal as="li" key={r.id} id={r.id} className="ed reflection">
                <p className="ed__side tiny">{String(i + 1).padStart(2, '0')}</p>
                <div className="ed__main">
                  <h2 className="reflection__title">{r.title}</h2>
                  <p className="reflection__lede">{lede}</p>
                  <Disclosure label="Read full reflection">
                    <p className="prose">{r.text.slice(lede.length).trim()}</p>
                  </Disclosure>
                </div>
              </Reveal>
            )
          })}
        </ol>
        <Reveal className="ed closing">
          <p className="ed__side tiny">Back to the inquiry</p>
          <p className="ed__main closing__text">{reflection.closing}</p>
        </Reveal>
      </section>
      <PageNext slug="reflection" />
    </>
  )
}

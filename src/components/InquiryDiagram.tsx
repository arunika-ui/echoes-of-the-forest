import { Link } from 'react-router-dom'
import { inquiry, pageBySlug } from '../data/projectData'

/** Visual assets · Audio · Atmosphere → Relaxing, immersive, standalone-VR-ready. */
export function InquiryDiagram() {
  const d = inquiry.diagram
  return (
    <figure className="diagram">
      <div className="diagram__inputs">
        {d.inputs.map((i) => (
          <div key={i.label} className="diagram__input">
            <p className="diagram__label">{i.label}</p>
            <p className="muted">{i.detail}</p>
            <p className="diagram__pages tiny">
              {i.pages.map((s) => (
                <Link key={s} to={pageBySlug(s).path}>
                  {pageBySlug(s).nav}
                </Link>
              ))}
            </p>
          </div>
        ))}
      </div>
      <div className="diagram__arrow" aria-hidden="true">
        <span />
      </div>
      <div className="diagram__outcome">
        <p className="tiny muted">The experience is</p>
        {d.outcomes.map((o) => (
          <p key={o} className="diagram__quality">
            {o}
          </p>
        ))}
      </div>
      <figcaption className="sr-only">
        Visual assets, audio and atmosphere together make the experience relaxing, immersive and ready for standalone VR.
      </figcaption>
    </figure>
  )
}

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { site } from '../data/projectData'
import type { MediaItem } from '../lib/media'
import { gsap, reducedMotion } from '../lib/motion'
import { MediaFill } from './Media'

/** Replit-style home hero, dark: ECHOES / of the / FOREST beside a tall media frame. */
export function Hero({ media, mediaCaption, children }: { media: MediaItem; mediaCaption: ReactNode; children?: ReactNode }) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hx-eyebrow', { autoAlpha: 0, duration: 1.2 }, 0)
        .from('.hx-title .mask__inner', { yPercent: 105, duration: 1.6, stagger: 0.14 }, 0.1)
        .from('.hx-after > *', { autoAlpha: 0, y: 10, duration: 1.2, stagger: 0.1 }, 0.7)
        .fromTo('.hx-media', { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: 'power1.out' }, 0.4)
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="frame hx" aria-labelledby="hx-title">
      <div className="hx-text">
        <p className="eyebrow hx-eyebrow">
          {site.unit} · Academic eFolio · {site.year}
        </p>
        <h1 id="hx-title" className="hx-title" aria-label={site.title}>
          <span className="mask" aria-hidden="true">
            <span className="mask__inner">ECHOES</span>
          </span>
          <span className="mask" aria-hidden="true">
            <em className="mask__inner">of the</em>
          </span>
          <span className="mask" aria-hidden="true">
            <span className="mask__inner">FOREST</span>
          </span>
        </h1>
        <div className="hx-after">{children}</div>
      </div>
      <figure className="hx-side">
        <div className="hx-media">
          <div className="hx-media__inner">
            <MediaFill media={media} eager sizes="(min-width: 900px) 45vw, 100vw" />
          </div>
        </div>
        <figcaption className="hx-index eyebrow">{mediaCaption}</figcaption>
      </figure>
    </section>
  )
}

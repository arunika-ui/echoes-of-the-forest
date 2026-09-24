import { useLayoutEffect, type RefObject } from 'react'
import { gsap, reducedMotion } from './motion'

/**
 * Reveals every [data-clip] media frame inside `scope` with a clip-path wipe
 * and a gentle settle of the image inside it, as it scrolls into view.
 */
export function useMediaReveal(scope: RefObject<HTMLElement | null>, key?: unknown) {
  useLayoutEffect(() => {
    const el = scope.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((frame) => {
        const inner = frame.querySelectorAll('.media-el, .placeholder')
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 88%', once: true } })
        tl.fromTo(
          frame,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' },
        ).from(inner, { scale: 1.08, duration: 1.8, ease: 'power2.out' }, 0)
      })
    }, el)
    return () => ctx.revert()
  }, [scope, key])
}

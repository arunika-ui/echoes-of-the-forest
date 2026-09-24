import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, reducedMotion } from '../lib/motion'

/**
 * Restrained scroll reveal (GSAP + ScrollTrigger). With `stagger`, direct
 * children animate in sequence — used for galleries and grids.
 */
export function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = false,
  children,
  ...rest
}: { as?: ElementType; className?: string; delay?: number; stagger?: boolean; children: ReactNode } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el
      gsap.from(targets, {
        autoAlpha: 0,
        y: 20,
        delay: delay / 1000,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [delay, stagger])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

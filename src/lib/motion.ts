import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.out', duration: 0.9 })

/** True for prefers-reduced-motion, or when the URL has ?still (used for static screenshots). */
export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.location.search.includes('still'))

export { gsap, ScrollTrigger }

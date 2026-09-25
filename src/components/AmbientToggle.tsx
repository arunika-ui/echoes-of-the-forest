import { useEffect, useRef, useState } from 'react'
import { home } from '../data/projectData'
import { AUDIO_EVENT, resolveMedia } from '../lib/media'

const AMBIENT = 'ambient'

/** Optional quiet forest loop. Off by default; never autoplays. */
export function AmbientToggle() {
  const ref = useRef<HTMLAudioElement>(null)
  const [on, setOn] = useState(false)
  const url = resolveMedia(home.ambient.key)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.volume = 0.18
    if (!on) {
      el.pause()
      return
    }
    window.dispatchEvent(new CustomEvent(AUDIO_EVENT, { detail: AMBIENT }))
    el.play().catch(() => setOn(false))
  }, [on])

  useEffect(() => {
    const off = (e: Event) => {
      if ((e as CustomEvent).detail !== AMBIENT) setOn(false)
    }
    window.addEventListener(AUDIO_EVENT, off)
    return () => window.removeEventListener(AUDIO_EVENT, off)
  }, [])

  if (!url) return null
  return (
    <>
      <button type="button" className={`ambient ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => setOn((v) => !v)}>
        <span className="ambient__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="tiny">Forest ambience {on ? 'on' : 'off'}</span>
      </button>
      <audio ref={ref} src={url} loop preload="none" />
    </>
  )
}

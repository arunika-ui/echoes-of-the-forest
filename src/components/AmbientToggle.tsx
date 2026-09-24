import { useEffect, useRef, useState } from 'react'
import { home } from '../data/projectData'
import { resolveMedia } from '../lib/media'

/** Optional quiet forest loop. Off by default; never autoplays. */
export function AmbientToggle() {
  const ref = useRef<HTMLAudioElement>(null)
  const [on, setOn] = useState(false)
  const url = resolveMedia(home.ambient.key)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.volume = 0.18
    if (on) void el.play()
    else el.pause()
  }, [on])

  useEffect(() => {
    const off = () => setOn(false)
    window.addEventListener('efolio:audio', off)
    return () => window.removeEventListener('efolio:audio', off)
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

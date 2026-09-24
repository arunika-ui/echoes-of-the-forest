import { useEffect, useRef, useState } from 'react'
import type { SourceClip } from '../data/projectData'
import { resolveMedia } from '../lib/media'

/**
 * Day → night crossfade prototype using the sourced (unedited) moodboard clips.
 * Nothing plays until the visitor presses Play.
 */
export function SoundMixer({ day, night }: { day: SourceClip[]; night: SourceClip[] }) {
  const [playing, setPlaying] = useState(false)
  const [mix, setMix] = useState(0)
  const refs = useRef<(HTMLAudioElement | null)[]>([])
  const layers = [...day.map((c) => ({ c, side: 'day' as const })), ...night.map((c) => ({ c, side: 'night' as const }))]

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      const side = layers[i].side
      const v = side === 'day' ? 1 - mix / 100 : mix / 100
      el.volume = Math.max(0, Math.min(1, v * 0.8))
    })
  })

  useEffect(() => {
    const stop = () => {
      refs.current.forEach((el) => el?.pause())
      setPlaying(false)
    }
    window.addEventListener('efolio:audio', stop)
    return () => {
      window.removeEventListener('efolio:audio', stop)
      refs.current.forEach((el) => el?.pause())
    }
  }, [])

  const toggle = () => {
    if (playing) {
      refs.current.forEach((el) => el?.pause())
      setPlaying(false)
    } else {
      window.dispatchEvent(new CustomEvent('efolio:audio', { detail: null }))
      refs.current.forEach((el) => void el?.play())
      setPlaying(true)
    }
  }

  const label = mix < 34 ? 'Afternoon' : mix < 67 ? 'Evening' : 'Night'

  return (
    <div className="mixer">
      <div className="mixer__head">
        <button type="button" className={`mixer__play ${playing ? 'is-on' : ''}`} onClick={toggle} aria-pressed={playing}>
          <span className={playing ? 'icon-pause' : 'icon-play'} aria-hidden="true" />
          {playing ? 'Pause soundscape' : 'Play soundscape'}
        </button>
        <span className="tiny muted">Prototype · sourced clips, unedited</span>
      </div>
      <label className="mixer__slider">
        <span className="tiny">Day</span>
        <input type="range" min={0} max={100} value={mix} onChange={(e) => setMix(Number(e.target.value))} aria-valuetext={label} aria-label="Crossfade from day to night" />
        <span className="tiny">Night</span>
      </label>
      <p className="mixer__state">{label}</p>
      <div className="mixer__layers">
        {layers.map(({ c, side }, i) => {
          const v = side === 'day' ? 100 - mix : mix
          return (
            <div key={c.ref} className="mixer__layer">
              <span>{c.audio.title}</span>
              <span className="mixer__bar" aria-hidden="true">
                <i style={{ width: `${v}%` }} />
              </span>
              <audio ref={(el) => void (refs.current[i] = el)} src={resolveMedia(c.audio.key)} loop preload="none" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

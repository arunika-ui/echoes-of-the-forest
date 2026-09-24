import { useEffect, useRef, useState } from 'react'
import { resolveMedia, type AudioItem } from '../lib/media'

const fmt = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00')
const isUrl = (u?: string) => !!u && /^https:\/\//.test(u)

/** Minimal site audio player. Renders nothing until the audio file exists. */
export function AudioPlayer({ item, credit }: { item: AudioItem; credit?: React.ReactNode }) {
  const url = resolveMedia(item.key)
  if (!url) return null
  return <Player item={item} url={url} credit={credit} />
}

function Player({ item, url, credit }: { item: AudioItem; url: string; credit?: React.ReactNode }) {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)

  // Only one clip plays at a time.
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== ref.current) ref.current?.pause()
    }
    window.addEventListener('efolio:audio', onOther)
    return () => window.removeEventListener('efolio:audio', onOther)
  }, [])

  const toggle = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) {
      window.dispatchEvent(new CustomEvent('efolio:audio', { detail: el }))
      void el.play()
    } else el.pause()
  }

  return (
    <div className={`audio ${playing ? 'is-playing' : ''}`}>
      <button type="button" className="audio__btn" onClick={toggle} aria-label={`${playing ? 'Pause' : 'Play'} ${item.title}`}>
        <span className={playing ? 'icon-pause' : 'icon-play'} aria-hidden="true" />
      </button>
      <div className="audio__main">
        <div className="audio__row">
          <span className="audio__title">{item.title}</span>
          {item.stage && <span className="audio__tag">{item.stage}</span>}
          <span className="audio__time">
            {fmt(time)} / {fmt(dur)}
          </span>
        </div>
        <input
          className="audio__seek"
          type="range"
          min={0}
          max={dur || 0}
          step={0.1}
          value={time}
          aria-label={`Seek ${item.title}`}
          style={{ '--p': dur ? `${(time / dur) * 100}%` : '0%' } as React.CSSProperties}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (ref.current) ref.current.currentTime = v
            setTime(v)
          }}
        />
        {(item.description || credit || isUrl(item.sourceUrl)) && (
          <div className="audio__foot">
            {item.description && <span>{item.description}</span>}
            {credit && <span className="audio__credit">{credit}</span>}
            {isUrl(item.sourceUrl) && (
              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="audio__source">
                Listen on Drive ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
      <audio
        ref={ref}
        src={url}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      />
    </div>
  )
}

export const hasAudio = (item?: AudioItem) => !!item && !!resolveMedia(item.key)

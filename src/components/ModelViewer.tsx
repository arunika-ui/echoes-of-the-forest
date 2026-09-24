import { createElement, useEffect, useRef, useState } from 'react'
import { resolveMedia } from '../lib/media'

/**
 * Google <model-viewer> with orbit controls. The web component is only
 * downloaded once a viewer scrolls near the viewport (lazy).
 */
export function ModelViewer({ src, alt, poster, ratio = '4/3' }: { src: string; alt: string; poster?: string; ratio?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const url = resolveMedia(src)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect()
          import('@google/model-viewer').then(() => setReady(true))
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="viewer" style={{ aspectRatio: ratio }}>
      {ready && url ? (
        createElement('model-viewer', {
          src: url,
          alt,
          poster,
          'camera-controls': true,
          'touch-action': 'pan-y',
          'auto-rotate': true,
          'rotation-per-second': '12deg',
          'interaction-prompt': 'none',
          'shadow-intensity': '0.8',
          exposure: '1',
          loading: 'lazy',
          style: { width: '100%', height: '100%', background: 'transparent', '--poster-color': 'transparent' },
        })
      ) : (
        <span className="viewer__loading tiny">Loading 3D model…</span>
      )}
      <span className="viewer__hint tiny" aria-hidden="true">
        Drag to orbit · scroll to zoom
      </span>
    </div>
  )
}

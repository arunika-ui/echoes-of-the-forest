import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { hasMedia, isVideo, resolveMedia, type MediaItem } from '../lib/media'

/** Fills its positioned parent with the media, or a quiet neutral frame. */
export function MediaFill({
  media,
  eager = false,
  fit = 'cover',
  sizes = '100vw',
  ambient = false,
}: {
  media: MediaItem
  eager?: boolean
  fit?: 'cover' | 'contain'
  sizes?: string
  ambient?: boolean
}) {
  const url = resolveMedia(media.key)
  const [loaded, setLoaded] = useState(false)

  if (!url) return <Placeholder label={media.label} />

  if (isVideo(url)) {
    return (
      <video
        className={`media-el is-loaded fit-${fit}`}
        src={url}
        muted={ambient}
        loop={ambient}
        autoPlay={ambient}
        playsInline
        preload={eager ? 'auto' : 'metadata'}
        aria-label={media.alt}
      />
    )
  }

  return (
    <img
      className={`media-el fit-${fit} ${loaded ? 'is-loaded' : ''}`}
      src={url}
      alt={media.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      ref={(el) => {
        if (el?.complete && !loaded) setLoaded(true)
      }}
    />
  )
}

/** Neutral frame for key imagery that hasn't been added yet. No paths, no instructions. */
export function Placeholder({ label }: { label: string }) {
  return (
    <div className="placeholder" role="img" aria-label={`${label} (image to come)`}>
      <span className="placeholder__label">{label}</span>
    </div>
  )
}

/**
 * Figure with reserved aspect ratio (no layout shift) and optional caption.
 * - `optional`: render nothing when the file doesn't exist yet.
 * - `onOpen`: opens the lightbox.
 * - `parallax`: subtle scroll-linked drift of the image inside its frame.
 */
export function MediaFigure({
  media,
  className = '',
  eager,
  fit,
  sizes,
  caption,
  onOpen,
  ratio,
  optional = false,
  parallax = false,
  clip = true,
}: {
  media: MediaItem
  className?: string
  eager?: boolean
  fit?: 'cover' | 'contain'
  sizes?: string
  caption?: React.ReactNode
  onOpen?: () => void
  ratio?: string
  optional?: boolean
  parallax?: boolean
  /** Opt in/out of the scroll clip reveal (used where useMediaReveal runs). */
  clip?: boolean
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const exists = hasMedia(media)
  const drift = parallax && exists

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!drift || !frame || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.media-drift',
        { yPercent: -4 },
        { yPercent: 4, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    }, frame)
    return () => ctx.revert()
  }, [drift])

  if (optional && !exists) return null

  const fill = <MediaFill media={media} eager={eager} fit={fit} sizes={sizes} />
  const frame = (
    <div ref={frameRef} className="media-frame" data-clip={clip || undefined} style={{ aspectRatio: ratio ?? media.ratio ?? '16/9' }}>
      {drift ? <div className="media-drift">{fill}</div> : fill}
    </div>
  )
  const cap = caption ?? media.caption

  return (
    <figure className={`media-figure ${onOpen && exists ? 'is-interactive' : ''} ${className}`}>
      {onOpen && exists ? (
        <button type="button" className="media-figure__btn" onClick={onOpen} aria-label={`Enlarge: ${media.alt}`}>
          {frame}
        </button>
      ) : (
        frame
      )}
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  )
}

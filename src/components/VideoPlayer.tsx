import { resolveMedia, type MediaItem } from '../lib/media'
import { Placeholder } from './Media'

/** HTML5 video (or external embed). Preserves aspect ratio; loads metadata only. */
export function VideoPlayer({
  video,
  poster,
  embedUrl,
  title,
}: {
  video: MediaItem
  poster?: MediaItem
  embedUrl?: string
  title: string
}) {
  const src = resolveMedia(video.key)
  const posterUrl = resolveMedia(poster?.key)
  return (
    <div className="media-frame video" style={{ aspectRatio: video.ratio ?? '16/9' }}>
      {embedUrl ? (
        <iframe src={embedUrl} title={title} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      ) : src ? (
        <video className="media-el is-loaded fit-contain" src={src} poster={posterUrl} controls playsInline preload="metadata">
          Your browser does not support HTML5 video.
        </video>
      ) : (
        <Placeholder label={video.label} />
      )}
    </div>
  )
}

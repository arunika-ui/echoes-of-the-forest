import type { ReactNode } from 'react'
import { hasMedia, type AudioItem, type MediaItem } from '../lib/media'
import { AudioPlayer, hasAudio } from './AudioPlayer'
import { MediaFigure } from './Media'
import { ModelViewer } from './ModelViewer'
import { PendingCard } from './PendingCard'

/**
 * Reusable evidence card: an image / video / audio / model slot, caption,
 * date and a "Links to inquiry" line. Missing media → a pending card.
 */
export function EvidenceCard({
  kind,
  title,
  media,
  audio,
  model,
  caption,
  date,
  inquiry,
  onOpen,
  status = 'Coming soon',
  children,
}: {
  kind: 'image' | 'video' | 'audio' | 'model'
  title: string
  media?: MediaItem
  audio?: AudioItem
  model?: { src: string; alt: string }
  caption?: ReactNode
  date?: string
  inquiry?: string
  onOpen?: () => void
  status?: 'Coming soon' | 'In development' | 'Not started'
  children?: ReactNode
}) {
  const label = { image: 'Image', video: 'Video', audio: 'Audio', model: '3D model' }[kind]
  let slot: ReactNode
  if (kind === 'model' && model) slot = <ModelViewer src={model.src} alt={model.alt} />
  else if (kind === 'audio') slot = audio && hasAudio(audio) ? <AudioPlayer item={audio} /> : <PendingCard kind={label} title={title} status={status} ratio="auto" />
  else slot = media && hasMedia(media) ? <MediaFigure media={media} onOpen={onOpen} /> : <PendingCard kind={label} title={title} status={status} ratio={media?.ratio} />

  return (
    <article className="evidence">
      <div className="evidence__slot">{slot}</div>
      <div className="evidence__body">
        <div className="evidence__row">
          <h3 className="evidence__title">{title}</h3>
          {date && <span className="tiny muted">{date}</span>}
        </div>
        {caption && <div className="evidence__caption">{caption}</div>}
        {children}
        {inquiry && (
          <p className="evidence__inquiry">
            <span className="tiny">Links to inquiry:</span> {inquiry}
          </p>
        )}
      </div>
    </article>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MediaItem } from '../lib/media'
import { MediaFill } from './Media'
import { T } from './Text'

/** Accessible image lightbox built on the native <dialog> (focus trap + Esc). */
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: MediaItem[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = index !== null

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    document.documentElement.classList.toggle('is-locked', open)
  }, [open])

  const step = useCallback(
    (dir: number) => {
      if (index === null) return
      onIndex((index + dir + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  const item = index !== null ? items[index] : null
  const ratio = item?.ratio ?? '16/9'
  const [rw, rh] = ratio.split('/').map(Number)
  const ratioNum = rw / (rh || 1)

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Image viewer"
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {item && (
        <div className="lightbox__inner">
          <div className="lightbox__bar">
            <span className="label">
              {String(index! + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button type="button" className="text-btn" onClick={onClose} autoFocus>
              Close ✕
            </button>
          </div>
          <figure className="lightbox__figure">
            <div className="lightbox__media" style={{ aspectRatio: ratio, width: `min(100%, calc((100svh - 220px) * ${ratioNum}))` }}>
              <MediaFill media={item} fit="contain" eager />
            </div>
            {item.caption && (
              <figcaption>
                <T>{item.caption}</T>
              </figcaption>
            )}
          </figure>
          {items.length > 1 && (
            <div className="lightbox__nav">
              <button type="button" className="text-btn" onClick={() => step(-1)} aria-label="Previous image">
                ← Prev
              </button>
              <button type="button" className="text-btn" onClick={() => step(1)} aria-label="Next image">
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}

export function useLightbox(items: MediaItem[]) {
  const [index, setIndex] = useState<number | null>(null)
  return {
    open: (i: number) => setIndex(i),
    node: <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />,
  }
}

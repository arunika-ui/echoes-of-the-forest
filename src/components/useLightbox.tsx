import { useState } from 'react'
import type { MediaItem } from '../lib/media'
import { Lightbox } from './Lightbox'

/** Lightbox state for a list of images: call `open(i)` and render `node`. */
export function useLightbox(items: MediaItem[]) {
  const [index, setIndex] = useState<number | null>(null)
  return {
    open: (i: number) => setIndex(i),
    node: <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />,
  }
}

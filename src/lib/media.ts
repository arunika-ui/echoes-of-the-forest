/**
 * Media resolver.
 *
 * Every image / video on the site is referenced in `src/data/projectData.ts`
 * by a KEY such as "final/render-01". To replace a placeholder, drop a file
 * with that name into `src/media/` using any supported extension:
 *
 *   src/media/final/render-01.jpg   (or .png / .webp / .avif / .mp4 / .webm)
 *
 * No code changes are needed — the file is picked up at build time.
 * Missing optional media is simply not rendered; missing key imagery shows a
 * quiet neutral frame with a short label (never a file path).
 * A key may also be a full https:// URL if the media is hosted elsewhere.
 */

const files = import.meta.glob('../media/**/*.{jpg,jpeg,png,webp,avif,gif,mp4,webm,mp3,wav,m4a,ogg,glb,JPG,JPEG,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const index = new Map<string, string>()
for (const [path, url] of Object.entries(files)) {
  const key = path.replace('../media/', '').replace(/\.[^.]+$/, '')
  index.set(key, url)
}

export function resolveMedia(key?: string): string | undefined {
  if (!key) return undefined
  if (/^https?:\/\//.test(key)) return key
  return index.get(key)
}

export function isVideo(url?: string) {
  return !!url && /\.(mp4|webm)(\?|$)/i.test(url)
}

/** True when the file for this media item exists. */
export const hasMedia = (item?: MediaItem) => !!item && !!resolveMedia(item.key)

/** A single piece of media, described once and reused anywhere. */
export interface MediaItem {
  /** Key relative to src/media without extension, e.g. "process/blockout-01" */
  key: string
  /** Meaningful alt text — describe what the image actually shows. */
  alt: string
  /** Short public label shown in the neutral frame until the file exists, e.g. "Blockout" */
  label: string
  /** CSS aspect ratio, e.g. "16/9". Reserves space to avoid layout shift. */
  ratio?: string
  caption?: string
}

export function m(key: string, label: string, alt: string, ratio = '16/9', caption?: string): MediaItem {
  return { key, label, alt, ratio, caption }
}

/** Audio clip (environmental audio, voice memo). Only rendered once the file exists. */
export interface AudioItem {
  key: string
  title: string
  description?: string
  /** Google Drive (or similar) link to the original file — shown as "Source file ↗". */
  sourceUrl?: string
  /** Sonic moodboard group: 'day' | 'transition' | 'night' */
  group?: string
  /** e.g. 'Raw', 'Edited', 'Final', 'Voice memo' */
  stage?: string
}

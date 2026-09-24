import { useId, useState } from 'react'
import type { Comparison } from '../data/projectData'
import { MediaFill } from './Media'
import { T } from './Text'

/** Drag / keyboard comparison slider. The native range input keeps it accessible. */
export function BeforeAfter({ data, caption }: { data: Comparison; caption?: string }) {
  const [pos, setPos] = useState(50)
  const id = useId()
  return (
    <figure className="compare">
      <div className="compare__stage" style={{ aspectRatio: data.after.ratio ?? '16/9' }}>
        <div className="compare__layer">
          <MediaFill media={data.after} />
        </div>
        <div className="compare__layer compare__before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <MediaFill media={data.before} />
        </div>
        <div className="compare__handle" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="compare__knob">⟷</span>
        </div>
        <span className="compare__tag compare__tag--l label">
          <T>{data.beforeLabel}</T>
        </span>
        <span className="compare__tag compare__tag--r label">
          <T>{data.afterLabel}</T>
        </span>
        <label htmlFor={id} className="sr-only">
          Comparison position: drag to reveal {data.beforeLabel} or {data.afterLabel}
        </label>
        <input
          id={id}
          className="compare__range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
        />
      </div>
      {caption && (
        <figcaption>
          <T>{caption}</T>
        </figcaption>
      )}
    </figure>
  )
}

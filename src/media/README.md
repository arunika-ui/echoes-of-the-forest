# Media

Drop images and videos here. **No code changes needed** — each file name matches a
key in `src/data/projectData.ts`, and the site picks it up automatically.
Until a file exists, the site shows a labelled placeholder with the exact path to use.

Supported: `.jpg .jpeg .png .webp .avif .gif` (images) and `.mp4 .webm` (video).
The extension doesn't matter — `final/render-01.jpg` and `final/render-01.webp` both work.

| Folder       | What goes here                                              |
| ------------ | ----------------------------------------------------------- |
| `hero/`      | `hero-render` (home hero still), `hero-film` (optional muted loop .mp4) |
| `project/`   | introduction, concept sketches, design direction            |
| `research/`  | visual research, reference → result pairs                   |
| `moodboard/` | `mood-01` … `mood-10`                                       |
| `process/`   | Blender viewport screenshots per stage, before/after pairs, iterations |
| `assets/`    | per asset: `<slug>-thumb`, `-final`, `-reference`, `-wireframe`, `-dev-01`, `-material-01` … |
| `timeline/`  | `week-01-1`, `week-02-1`, `week-02-2` …                     |
| `final/`     | `film.mp4`, `film-poster`, `environment`, `render-01…04`, `detail-01…04`, `wireframe`, `final-matching`, `closing` |

Tips
- Export renders at ~2400px on the long edge as `.jpg` (quality ~82) or `.webp`.
- Keep the film under ~50 MB, or host it on YouTube/Vimeo and paste the embed URL
  into `final.film.embedUrl`.
- Aspect ratios are set per slot in `projectData.ts` (`'16/9'`, `'4/5'` …). Change
  the ratio there if your image has a different shape — images are cropped with
  `object-fit: cover`, never stretched.
- Also update the `alt` text for every image you add.

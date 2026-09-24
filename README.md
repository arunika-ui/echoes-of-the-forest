# Echoes of the Forest — SIT253 eFolio

Yaksh Khanna · 2026 · Vite + React + TypeScript + React Router · GSAP · `<model-viewer>`

```bash
npm install
npm run dev      # http://localhost:5178
npm run build
```

## Where things live

| What | Where |
| --- | --- |
| All text, trackers, references, timeline | `src/data/projectData.ts` |
| Images / renders / screenshots | `src/media/<folder>/<name>.jpg` (auto-detected by name) |
| Audio | `src/media/audio/…` (`sonic/` holds the 9 sourced moodboard MP3s) |
| 3D models (optimised GLB) | `src/media/models/` |
| Full-resolution moodboard download | `public/downloads/` |

Source of truth for all content: `~/Downloads/SIT253_ForestEscape` (Folio Enquiry, Research & Reference,
Self Reflection, asset tracker). Nothing is invented — anything missing renders as a
“Coming soon / In development” card.

## Adding evidence

- **Renders**: `src/media/final/render-afternoon.jpg`, `render-golden-hour`, `render-campfire`, `render-moonlight`; walkthrough → `final/walkthrough.mp4`.
- **Process screenshots**: `src/media/process/blockout.jpg`, `modelling-tree`, `uv-unwrap`, `scene`, `tutorial-01`, `practice-simple`.
- **Edited audio**: add the WAV to `src/media/audio/` and set `audio: a('audio/<file>', '<Name>')` on the matching entry in `soundscape.finals`; update its `status` in `audioAssets`.
- **Voice memos / Drive links**: `sonic.voiceMemos` (with a transcript) and `sonic.driveLinks`.
- **Models 3 & 4**: fill the two `in-development` entries in `finalModels` and flip their tracker rows to `complete`.
- **Sketchfab**: `sketchfabUrl` on each entry in `finalModels`.
- **References**: entries with `toVerify` show a “to verify” note until you confirm them.

## Optimising a new GLB

```bash
npx @gltf-transform/cli optimize in.glb out.glb --compress false --texture-compress webp --texture-size 1024
```
(Geometry compression is off so `<model-viewer>` needs no external decoder.)

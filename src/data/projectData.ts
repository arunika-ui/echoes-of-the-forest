/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ECHOES OF THE FOREST — SIT253 eFolio · all content lives here.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Source of truth: ~/Downloads/SIT253_ForestEscape
 *    Documents/FOLIO ENQUIRY.docx · Research & Refrences/RESEARCH AND REFERENCE.docx
 *    Submission/SELF REFLECTION.docx · 3d models/visual and audio asset.docx
 *
 *  RULES  Nothing here is invented. Missing evidence renders as an
 *         "In development / Coming soon" placeholder card — fill the field
 *         (or drop the file into src/media/…) and the real thing appears.
 *  MEDIA  m('folder/name', …) → src/media/folder/name.(jpg|png|webp|mp4|glb)
 *  AUDIO  a('audio/…', …)     → src/media/audio/….(mp3|wav)
 */

import { m, type AudioItem, type MediaItem } from '../lib/media'

/** Before/after image pair for the comparison slider. */
export interface Comparison {
  before: MediaItem
  after: MediaItem
  beforeLabel: string
  afterLabel: string
}

export const a = (key: string, title: string, extra: Partial<AudioItem> = {}): AudioItem => ({ key, title, ...extra })

/* ── Site ─────────────────────────────────────────────────────────────── */

export const site = {
  title: 'Echoes of the Forest',
  subtitle: 'A Low-Poly VR Camping and Exploration Experience',
  artist: 'Yaksh Khanna',
  unit: 'SIT253',
  year: '2026',
  theme: 'Experience & Exploration',
  summary:
    'Echoes of the Forest investigates how original low-poly 3D assets, environmental audio and changing atmosphere can work together to create a calm, immersive forest exploration experience for standalone VR.',
  inquiry:
    'How can original low-poly 3D models and environmental audio be designed to create a relaxing and immersive forest exploration experience suitable for standalone virtual reality?',
  /** Public Sketchfab profile — add when available. */
  sketchfabProfile: '',
}

/* ── Pages, groups & day→night tone ───────────────────────────────────── */

/** Atmosphere of each page — the site darkens from afternoon to night. */
export type Tone = 'afternoon' | 'golden' | 'forest' | 'dusk' | 'night'
export type GroupId = 'start' | 'project' | 'research' | 'development' | 'final' | 'close'

export interface PageDef {
  n: string
  slug: string
  path: string
  nav: string
  title: string
  intro: string
  group: GroupId
  tone: Tone
}

export const groups: { id: GroupId; label: string }[] = [
  { id: 'project', label: 'Project' },
  { id: 'research', label: 'Research' },
  { id: 'development', label: 'Development' },
  { id: 'final', label: 'Final Work' },
  { id: 'close', label: 'Reflection' },
]

export const pages: PageDef[] = [
  { n: '00', slug: 'home', path: '/', nav: 'Home', title: 'Echoes of the Forest', intro: site.summary, group: 'start', tone: 'afternoon' },
  { n: '01', slug: 'concept', path: '/concept', nav: 'Concept', title: 'The Concept', intro: 'A woodland trail at late afternoon, a secluded campsite, and a story told only by the environment.', group: 'project', tone: 'afternoon' },
  { n: '02', slug: 'inquiry', path: '/inquiry', nav: 'Folio Inquiry', title: 'Folio Inquiry', intro: 'The question that directs the project’s planning, research, asset development and assessment.', group: 'project', tone: 'afternoon' },
  { n: '03', slug: 'research', path: '/research', nav: 'Research', title: 'Research', intro: 'XR platform research, the low-poly style, colour, lighting and environmental design.', group: 'research', tone: 'golden' },
  { n: '04', slug: 'moodboard', path: '/moodboard', nav: 'Moodboard', title: 'Visual Moodboard', intro: 'One composed moodboard that fixes the visual identity of the forest and campsite.', group: 'research', tone: 'golden' },
  { n: '05', slug: 'learning', path: '/learning', nav: 'Technical Learning', title: 'Technical Learning', intro: 'Identified skill gaps, a learning plan, and the resources used to close them.', group: 'research', tone: 'golden' },
  { n: '06', slug: 'process', path: '/process', nav: 'Blender Process', title: 'Blender Process', intro: 'The texture sets used in Blender.', group: 'development', tone: 'forest' },
  { n: '07', slug: 'assets', path: '/assets', nav: 'Asset Development', title: 'Asset Development', intro: 'The visual and audio asset trackers — planned assets, budgets and honest status.', group: 'development', tone: 'forest' },
  { n: '08', slug: 'audio', path: '/audio', nav: 'Sonic Development', title: 'Sonic Development', intro: 'Sound changes alongside light to communicate the passage of time.', group: 'development', tone: 'forest' },
  { n: '09', slug: 'timeline', path: '/timeline', nav: 'Timeline', title: 'Timeline', intro: 'Every milestone, from research to final submission.', group: 'development', tone: 'dusk' },
  { n: '10', slug: 'final', path: '/final', nav: 'Final Environment', title: 'Final VR Environment', intro: 'The assembled forest scene, ready to explore in the browser.', group: 'final', tone: 'dusk' },
  { n: '11', slug: 'models', path: '/models', nav: 'Final Models', title: 'Final Models', intro: 'Four original low-poly models: two complete, two in development.', group: 'final', tone: 'dusk' },
  { n: '12', slug: 'soundscape', path: '/soundscape', nav: 'Final Soundscape', title: 'Final Soundscape', intro: 'Edited environmental audio assets, and a day → night soundscape prototype.', group: 'final', tone: 'night' },
  { n: '13', slug: 'reflection', path: '/reflection', nav: 'Reflection', title: 'Reflection', intro: 'Four reflections from the first weeks of the project.', group: 'close', tone: 'night' },
  { n: '14', slug: 'references', path: '/references', nav: 'Ethics & References', title: 'Ethics & References', intro: 'Ethical considerations and the Harvard reference list.', group: 'close', tone: 'night' },
]

export const pageBySlug = (slug: string) => pages.find((p) => p.slug === slug)!

/* ── References (Harvard) ─────────────────────────────────────────────── */

export interface Reference {
  id: string
  /** Harvard entry; the title part is wrapped in *asterisks* for italics. */
  text: string
  url?: string
  accessed?: string
  /** Details that could not be confirmed from the project files. */
  toVerify?: string
  group: 'Academic & technical' | 'Artistic & visual' | 'Textures' | 'Audio'
}

const pix = (id: string, user: string, title: string, slug: string): Reference => ({
  id,
  text: `${user} (n.d.) *${title}* [Sound effect]. Pixabay.`,
  url: `https://pixabay.com/sound-effects/${slug}/`,
  toVerify: 'Year and exact page URL inferred from the downloaded file name.',
  group: 'Audio',
})

export const references: Reference[] = [
  // From RESEARCH AND REFERENCE.docx
  { id: 'blender-manual', text: 'Blender Foundation (2025) *Blender Manual*.', url: 'https://docs.blender.org/manual/en/latest/', group: 'Academic & technical' },
  { id: 'bob-ross', text: 'Bob Ross Inc. (n.d.) *Bob Ross*.', url: 'https://www.bobross.com/', accessed: '31 July 2026', group: 'Artistic & visual' },
  { id: 'bowman-2007', text: 'Bowman, D.A. and McMahan, R.P. (2007) ‘Virtual Reality: How Much Immersion Is Enough?’, *Computer*, 40(7), pp. 36–43. doi:10.1109/MC.2007.257.', group: 'Academic & technical' },
  { id: 'jerald-2016', text: 'Jerald, J. (2016) *The VR Book: Human-Centered Design for Virtual Reality*. New York: Association for Computing Machinery.', group: 'Academic & technical' },
  { id: 'meta-docs', text: 'Meta (n.d.) *Meta Quest Developer Documentation*.', url: 'https://developers.meta.com/horizon/documentation/', group: 'Academic & technical' },
  { id: 'mononoke', text: 'Miyazaki, H. (Director) (1997) *Princess Mononoke* [Film]. Studio Ghibli.', url: 'https://letterboxd.com/film/princess-mononoke/', accessed: '31 July 2026', group: 'Artistic & visual' },
  { id: 'joy-of-painting', text: 'Ross, B. (1983–1994) *The Joy of Painting* [Television series]. PBS.', group: 'Artistic & visual' },
  { id: 'god-of-war', text: 'Santa Monica Studio (2022) *God of War*.', url: 'https://store.steampowered.com/app/1593500/God_of_War/', accessed: '31 July 2026', group: 'Artistic & visual' },
  { id: 'schell-2020', text: 'Schell, J. (2020) *The Art of Game Design: A Book of Lenses*. 3rd edn. Boca Raton: CRC Press.', group: 'Academic & technical' },
  // Learning resources & visual sources named in the project
  { id: 'blender-guru', text: 'Price, A. (n.d.) *Blender Guru*.', url: 'https://www.blenderguru.com/', toVerify: 'Author, year and access date.', group: 'Academic & technical' },
  { id: 'grant-abbitt', text: 'Abbitt, G. (n.d.) *Grant Abbitt* [YouTube channel].', url: 'https://www.youtube.com/@grabbitt', toVerify: 'Year, channel URL and access date.', group: 'Academic & technical' },
  { id: 'synty', text: 'Synty Studios (n.d.) *POLYGON Asset Packs*.', url: 'https://syntystore.com/', accessed: '31 July 2026', group: 'Artistic & visual' },
  { id: 'fab', text: 'Epic Games (n.d.) *Fab – 3D Assets Marketplace*.', url: 'https://www.fab.com/', accessed: '31 July 2026', group: 'Artistic & visual' },
  { id: 'unsplash-forest', text: 'Unsplash (n.d.) *Forest Photography*.', url: 'https://unsplash.com/s/photos/forest', accessed: '31 July 2026', group: 'Artistic & visual' },
  { id: 'unsplash-camping', text: 'Unsplash (n.d.) *Camping Photography*.', url: 'https://unsplash.com/s/photos/camping', accessed: '31 July 2026', group: 'Artistic & visual' },
  // Textures (ambientCG, CC0)
  { id: 'ambientcg-bark014', text: 'ambientCG (n.d.) *Bark 014* [PBR texture set, CC0].', url: 'https://ambientcg.com/view?id=Bark014', toVerify: 'Year and access date.', group: 'Textures' },
  { id: 'ambientcg-fabric046', text: 'ambientCG (n.d.) *Fabric 046* [PBR texture set, CC0].', url: 'https://ambientcg.com/view?id=Fabric046', toVerify: 'Year and access date.', group: 'Textures' },
  { id: 'ambientcg-leafset029', text: 'ambientCG (n.d.) *Leaf Set 029* [PBR texture set, CC0].', url: 'https://ambientcg.com/view?id=LeafSet029', toVerify: 'Year and access date.', group: 'Textures' },
  { id: 'ambientcg-grass002', text: 'ambientCG (n.d.) *Grass 002* [PBR texture set, CC0].', url: 'https://ambientcg.com/view?id=Grass002', toVerify: 'Year and access date.', group: 'Textures' },
  // Sonic moodboard sources (from file names)
  pix('snd-forest-ambience', 'audiopapkin', 'Forest Ambience', 'forest-ambience-296528'),
  pix('snd-bird-song', 'freesound_community', 'Bird Song', 'bird-song-17925'),
  pix('snd-footsteps', 'freesound_community', 'Footsteps Dirt Gravel', 'footsteps-dirt-gravel-6823'),
  pix('snd-wood-creak', 'freesound_community', 'Wood Creak', 'wood-creak-72307'),
  pix('snd-leaves-1', 'soul_serenity_sounds', 'Leaves Rustling', 'leaves-rustling-236742'),
  pix('snd-campfire', 'soundreality', 'Campfire Crackling Sound', 'campfire-crackling-sound-439573'),
  pix('snd-leaves-2', 'tanweraman', 'Leaves Rustling 2', 'leaves-rustling-2-329002'),
  pix('snd-wind', 'traian1984', 'Ambience Wind Blowing Through Trees 01', 'ambience-wind-blowing-through-trees-01-186986'),
  pix('snd-crickets', 'u_uy2kad5rlq', 'Crickets', 'crickets-395138'),
]

/** 1-based footnote number used by <Cite>. */
export const refNumber = (id: string) => references.findIndex((r) => r.id === id) + 1

/* ── 00 Home ──────────────────────────────────────────────────────────── */

export const home = {
  credit: `${site.artist} · ${site.unit} · ${site.year}`,
  heroImage: m('moodboard/moodboard', 'Visual moodboard', 'The Echoes of the Forest visual moodboard: pine forests, warm campsite light and low-poly references', '4/5'),
  quickFacts: [
    { label: 'Platform', value: 'Meta Quest' },
    { label: 'Style', value: 'Low-poly' },
    { label: 'Output', value: '4 models + 10 audio assets' },
    { label: 'Tools', value: 'Blender' },
  ],
  /** Quiet forest loop for the optional ambient toggle (sourced, unedited). */
  ambient: a('audio/sonic/audiopapkin-forest-ambience-296528', 'Forest ambience', { stage: 'Sourced reference · Pixabay' }),
}

/* ── 01 Concept (FOLIO ENQUIRY.docx) ──────────────────────────────────── */

export const concept = {
  overview:
    'The low-poly virtual reality game Echoes of the Forest is centered on tranquil exploration and environmental narrative. In the late afternoon, the user starts at a woodland trail’s entrance and proceeds deeper into the forest along a natural path. Before arriving at a secret campsite, the user travels by natural markers like trees, rocks, fallen logs, wooden path signs, and a small bridge.',
  landmarks: ['Trees', 'Rocks', 'Fallen logs', 'Wooden path signs', 'A small bridge'],
  campsite: ['Camping tent', 'Backpack', 'Campfire', 'Lamp'],
  storytelling:
    'A camping tent, a backpack, a campfire, and a lamp are among the items at the campsite that indicate someone has been there recently. Instead of using dialogue or prearranged events, these things aid in telling the story through the setting itself.',
  transitionIntro:
    'The lighting progressively shifts from warm afternoon sunlight to a serene nighttime setting as the user spends time in the space. Simultaneously, the noises of the surrounding environment change from birds and running water to crickets, a little wind, and the crackling of the bonfire.',
  stages: [
    { id: 'afternoon', label: 'Afternoon', light: 'Warm afternoon sunlight filtering through the trees', sound: 'Birds and running water', clip: a('audio/sonic/freesound_community-bird-song-17925', 'Bird song', { stage: 'Sourced reference' }) },
    { id: 'evening', label: 'Evening', light: 'Golden-hour light with richer orange and golden tones', sound: 'Wind through the trees', clip: a('audio/sonic/traian1984-ambience-wind-blowing-through-trees-01-186986', 'Wind through trees', { stage: 'Sourced reference' }) },
    { id: 'night', label: 'Night', light: 'Cool blue moonlight against the warm campfire glow', sound: 'Crickets and campfire crackling', clip: a('audio/sonic/u_uy2kad5rlq-crickets-395138', 'Crickets', { stage: 'Sourced reference' }) },
  ],
  themeJustification: [
    'The topic of Experience and Exploration was chosen because it supports the project’s goal of establishing a tranquil setting that promotes inquiry and learning. Instead than creating a competitive or action-oriented experience, this initiative lets players explore a natural environment at their own speed. Because minute elements in the terrain can convey information without disrupting the user’s immersion, the forest offers a perfect setting for environmental storytelling.',
    'The low-poly visual style was selected because it is appropriate for virtual reality applications, practical for a novice developer, and enhances the tranquil ambiance. The streamlined geometric shapes preserve a clear and appealing artistic approach while eliminating superfluous visual complexity. By creating optimized assets suitable for standalone VR devices, this method also facilitates real-time rendering.',
  ],
  audience: [
    'Teenagers and adults who appreciate the outdoors, camping, and leisurely exploration are the main target demographic for Echoes of the Forest. Users that prefer serene settings and environmental storytelling over fast-paced gameplay are the target audience for this project. It is appropriate for both seasoned VR users and novices who want to experience virtual reality in a pleasant and approachable manner because it emphasizes observation and exploration.',
    'Stressful gaming mechanics, dramatic visual effects, and abrupt movement are purposefully avoided in the design. Rather, the setting invites visitors to explore the forest at their own pace, eventually finding the campground and taking in the shifting ambiance as day gives way to night.',
  ],
  comfort: ['No abrupt movement, stressful mechanics or dramatic effects', 'Leisurely, self-paced exploration', 'Information delivered through both visual and audio cues'],
}

/* ── 02 Folio Inquiry (FOLIO ENQUIRY.docx) ────────────────────────────── */

export const inquiry = {
  note: 'This inquiry serves as the foundation for the folio and directs all of the project’s planning, research, asset development, and assessment. Each and every audio and visual resource produced throughout development will help address this question.',
  intro: [
    'Virtual reality has transformed because virtual reality offers immersive experiences that promote exploration and engagement, it has completely changed how people interact with digital worlds. Immersion settings let players explore a virtual world at their own speed, in contrast to traditional games that primarily focus on objectives, battle, or competitiveness. This study investigates how a serene and captivating virtual reality experience might be produced by combining thoughtfully created visual materials with ambient audio.',
    'The idea is to create a stylized low-poly woodland setting where users can stroll along a peaceful trail that eventually leads to a remote camping. Without spoken words or written narration, the story is conveyed throughout the encounter by the surroundings. Rather, environmental elements like camping gear, the surrounding landscape, ambient lighting, and authentic environmental sounds are used to create the mood. The project intends to show how an immersive virtual reality experience may be created with straightforward visual design and well-planned audio while still being technically feasible for real-time rendering.',
  ],
  platform:
    'The Meta Quest standalone virtual reality headset is the project’s target platform. In order to maintain seamless performance and offer an immersive user experience, standalone VR systems need assets that have been meticulously tuned. Therefore, this project will concentrate on developing effective low-poly models, suitably sized textures, and optimized audio elements that can help create a comfortable and responsive virtual world.',
  constraints: ['Limited processing power and graphics speed', 'Limited memory and battery life', 'No external sensors or wires — fully self-contained', 'Steady frame rate needed for comfort'],
  objectivesText:
    'This project’s main goal is to create an immersive low-poly woodland setting that uses audio and visual elements to effectively portray environmental stories.',
  objectives: [
    { n: '4', label: 'Original low-poly 3D models', text: 'Unique models appropriate for real-time virtual reality applications.' },
    { n: '10', label: 'Edited environmental audio assets', text: 'Audio that enhances the experience’s sense of immersion.' },
    { n: 'VR', label: 'Optimisation', text: 'Techniques that keep assets compatible with standalone VR while preserving visual quality and consistency.' },
    { n: 'PM', label: 'Project management', text: 'Documented asset planning, workflow organisation, naming standards and development progress.' },
  ],
  outcome:
    'When the folio is finished, it will showcase a unified set of optimized low-poly visual and audio elements that work together to produce a captivating virtual reality exploration experience. Echoes of the Forest seeks to show how very inexpensive assets can create a convincing and calming virtual world through the use of environmental storytelling, meticulously crafted 3D models, immersive environmental sound, and deliberate lighting.',
  diagram: {
    inputs: [
      { label: 'Visual assets', detail: 'Original low-poly models, textures, colour', pages: ['process', 'assets', 'models'] },
      { label: 'Audio', detail: 'Environmental sound, edited and layered', pages: ['audio', 'soundscape'] },
      { label: 'Atmosphere', detail: 'Lighting stages, afternoon → night', pages: ['research', 'moodboard', 'final'] },
    ],
    outcomes: ['Relaxing', 'Immersive', 'Standalone-VR-ready'],
  },
}

/* ── 03 Research (RESEARCH AND REFERENCE.docx) ────────────────────────── */

export const research = {
  intro:
    'Before starting production, research is done to make sure the project is based on current industry practices and supported by reliable sources rather than conjecture. The data collected will serve as a solid basis for the folio’s technological choices, asset planning, audio design, and visual style.',
  xr: [
    { title: 'Presence', text: 'The potential of virtual reality (VR) to give users a sense of presence—the perception that they are physically there in the virtual world—is one of its main advantages. Users are encouraged to pay greater attention to environmental elements and become more involved with their surroundings.', cites: ['bowman-2007', 'jerald-2016'] },
    { title: 'Standalone constraints', text: 'Assets must be carefully optimized because processing power, graphics speed, memory, and battery life are more constrained than on desktop PCs. Instead of seeing these restrictions as drawbacks, they push developers to use effective production methods.', cites: ['meta-docs'] },
    { title: 'Designing for comfort', text: 'Maintaining immersion while lowering the chance of motion sickness is made possible by solid performance, comfortable movement, and steady visual feedback — especially for people who might not be familiar with virtual reality.', cites: ['jerald-2016'] },
    { title: 'Relevance to the project', text: 'The low-poly graphic style, straightforward geometry, effective textures, and thoughtfully layered environmental audio are meant to produce a visually coherent experience that is still appropriate for real-time rendering on standalone hardware.', cites: [] as string[] },
  ],
  lowPoly: [
    { q: 'What is low-poly art?', a: 'Low-poly art is a type of 3D modeling where environments and objects are created using comparatively few polygons. Low-poly models employ straightforward geometric shapes, crisp outlines, and little detail to create a stylized visual impression rather than striving for extremely accurate detail.' },
    { q: 'Why games use it', a: 'It provides a balance between visual quality and performance. Models with fewer polygons require less computing power, the streamlined design cuts production time, and it gives developers a consistent artistic direction.' },
    { q: 'Why it suits standalone VR', a: 'Standalone headsets like the Meta Quest have less computing power than gaming PCs. Low-poly models enable visually appealing, immersive scenes while lessening the rendering workload — keeping a steady frame rate and a comfortable experience.' },
    { q: 'Why it was chosen', a: 'The natural colour scheme and reduced geometry create a serene, stylized woodland without extraneous detail. It is also a feasible technique for a novice Blender learner to produce unique objects while honing their modelling abilities.' },
  ],
  palette: [
    { id: 'green', name: 'Natural greens', swatches: ['#2f4a33', '#4f6b43', '#7e9563'], reason: 'Green is commonly linked to nature, peace, and progress — it encourages people to feel at ease while they explore.' },
    { id: 'amber', name: 'Warm amber & orange', swatches: ['#8a4b1f', '#c7782f', '#e6a85a'], reason: 'Used for the lantern, campfire and wooden items to create a welcoming focal point at the end of the trail.' },
    { id: 'blue', name: 'Cool blues', swatches: ['#1c2a44', '#35507a', '#7f9cc4'], reason: 'Grows in the sky, distant scenery and shadows as evening arrives — serenity and the change from day to night.' },
  ],
  lighting: [
    { id: 'afternoon', title: 'Warm Afternoon', visual: 'Warm afternoon sunlight filtering through the trees.', why: 'A cheerful, welcoming, and cozy atmosphere with good visibility of the forest and path.', theme: 'Players can explore without feeling hurried or intimidated; the forest appears secure and welcoming.' },
    { id: 'golden', title: 'Golden Hour', visual: 'Richer orange and golden tones as players continue along the trail.', why: 'Adds warmth and depth; makes the forest appear more lively and realistic.', theme: 'The changing light rewards progress and motivates players to carry on toward the campground.' },
    { id: 'campfire', title: 'Campfire', visual: 'A warm orange glow around the tent, backpack and nearby objects.', why: 'Conveys warmth, coziness and safety, and directs attention to the objects that tell the story.', theme: 'The campfire is the prize at the end of the journey — a place to pause and unwind.' },
    { id: 'moonlight', title: 'Cool Moonlight', visual: 'Cool blue moonlight contrasting with the warm campfire glow.', why: 'Makes the night peaceful and the campsite visually striking; conveys day turning to night.', theme: 'The warm–cool contrast encourages users to slow down and take in the surroundings.' },
  ],
  environment: [
    { id: 'trails', title: 'Trails', visual: 'A clearly defined trail from the forest entrance to the hidden campsite.', why: 'A natural path without maps, arrows or on-screen directions.', theme: 'Players walk at their own speed; the trip becomes leisurely rather than goal-oriented.' },
    { id: 'landmarks', title: 'Landmarks', visual: 'A wooden bridge, rock formations, unique pine trees, trail signs and the campsite lantern.', why: 'Memorable points of reference that help orientation without a user interface.', theme: 'Each landmark rewards exploration and draws users deeper into the forest.' },
    { id: 'focal', title: 'Focal Points', visual: 'The campsite, lit by campfire and lantern, is the primary focal point.', why: 'A strong focus point naturally draws attention and gives the journey a destination.', theme: 'The campsite is the reward — a serene resting spot after the forest.' },
    { id: 'spaces', title: 'Open vs Enclosed', visual: 'Enclosed forest paths alternating with open clearings, ending at the campsite.', why: 'Dense forest fosters curiosity; open space invites the player to take it in.', theme: 'The shifting spaces create a natural rhythm and a sense of advancement.' },
  ],
  influence:
    'Echoes of the Forest now has a distinct creative direction thanks to the research. The project will employ a stylized low poly aesthetic, natural colors, and environmental storytelling to provide a serene exploration experience rather than a highly detailed or action-focused setting. To ensure uniformity throughout the setting, all of the intended models—including the tent, bonfire, bag, and lantern—will have the same visual aesthetic.',
}

/* ── 04 Moodboard ─────────────────────────────────────────────────────── */

export const moodboard = {
  image: m('moodboard/moodboard', 'Visual moodboard', 'The complete Echoes of the Forest visual moodboard: pine forests, low-poly assets, warm campsite light and cool night tones', '2000/1414'),
  fullResolution: '/downloads/yaksh-moodboard-full-resolution.png',
  fullResolutionInfo: 'PNG · 4961 × 3508 · 16.9 MB',
  annotation:
    'The moodboard emphasizes natural materials, camping gear, forest scenery, and warm lighting to create a unified visual identity that complements the Experience & Exploration concept.',
  influences: [
    { title: 'Bob Ross', role: 'Atmosphere · colour', ref: 'bob-ross', why: 'Bob Ross’s landscape paintings capture the beauty of forests through soft lighting, balanced colour palettes, and peaceful natural scenery. These qualities closely match the relaxing environment I want to create in Echoes of the Forest.' },
    { title: 'God of War (2018)', role: 'Composition · lighting · guiding players', ref: 'god-of-war', why: 'The forest environments in God of War demonstrate how lighting, vegetation, and natural landmarks can guide players through an environment without excessive interface elements.' },
    { title: 'Princess Mononoke (1997)', role: 'Living, immersive forests', ref: 'mononoke', why: 'Princess Mononoke portrays forests as living, peaceful, and mysterious environments. Its use of rich greenery, natural lighting, and harmonious landscapes inspires the atmosphere I want to create.' },
    { title: 'Synty Studios', role: 'Low-poly visual language', ref: 'synty', why: '' },
    { title: 'Fab', role: '3D asset reference research', ref: 'fab', why: '' },
    { title: 'Unsplash', role: 'Real-world forest & camping photography', ref: 'unsplash-forest', why: '' },
  ],
}

/* ── 05 Technical Learning (SELF REFLECTION.docx) ─────────────────────── */

export const learning = {
  gaps: ['Blender modelling', 'Box modelling', 'UV unwrapping', 'Texture application', 'Environmental audio editing'],
  gapText:
    'Making 3D models in Blender, especially box modeling, UV unwrapping, and properly applying textures, is currently my least confident area. I anticipate that these tasks will require the greatest practice because I have never used Blender before. Additionally, I need to get better at audio editing.',
  plan: [
    { stage: 'First — simple objects', items: ['Rocks', 'Logs', 'Trees'] },
    { stage: 'Then — complex objects', items: ['Camping tent', 'Lamp'] },
  ],
  planText:
    'Before beginning my final materials, I want to finish a few beginner tutorials to hone my abilities. Before moving on to more intricate models like the camping tent and light, I will start by modeling basic things like pebbles, logs, and trees.',
  resources: [
    { title: 'Blender Manual', by: 'Blender Foundation', use: 'Tools, modelling and UV workflow reference', url: 'https://docs.blender.org/manual/en/latest/', ref: 'blender-manual' },
    { title: 'Blender Guru', by: 'Tutorials', use: 'Beginner modelling and texturing tutorials', url: 'https://www.blenderguru.com/', ref: 'blender-guru' },
    { title: 'Grant Abbitt', by: 'Tutorials', use: 'Low-poly modelling tutorials', url: 'https://www.youtube.com/@grabbitt', ref: 'grant-abbitt' },
    { title: 'Meta Quest Developer Documentation', by: 'Meta', use: 'Standalone VR performance and workflow', url: 'https://developers.meta.com/horizon/documentation/', ref: 'meta-docs' },
  ],
  evidence: [
    { title: 'Beginner tutorial exercise', media: m('process/tutorial-01', 'Tutorial exercise', 'Blender tutorial exercise') },
    { title: 'Simple object practice', media: m('process/practice-simple', 'Practice model', 'Early practice model (rock or log) in Blender') },
  ],
}

/* ── 06 Blender Process ───────────────────────────────────────────────── */

export const blenderProcess = {
  /** Every file in the texture folder, grouped by set. */
  textureSets: [
    {
      name: 'Logs',
      maps: [
        { label: 'Color', file: 'Logs Color.jpg', media: m('textures/maps/logs-color', 'Logs — Color', 'Logs color map', '1/1') },
        { label: 'Normal', file: 'Logs Normal.jpg', media: m('textures/maps/logs-normal', 'Logs — Normal', 'Logs normal map', '1/1') },
        { label: 'Roughness', file: 'Logs Roughness.jpg', media: m('textures/maps/logs-roughness', 'Logs — Roughness', 'Logs roughness map', '1/1') },
        { label: 'Displacement', file: 'Logs Displacement.jpg', media: m('textures/maps/logs-displacement', 'Logs — Displacement', 'Logs displacement map', '1/1') },
      ],
    },
    {
      name: 'Stones',
      maps: [
        { label: 'Color', file: 'Stones Color.jpg', media: m('textures/maps/stones-color', 'Stones — Color', 'Stones color map', '1/1') },
        { label: 'Normal', file: 'Stones Normal.jpg', media: m('textures/maps/stones-normal', 'Stones — Normal', 'Stones normal map', '1/1') },
        { label: 'Roughness', file: 'Stones Roughness.jpg', media: m('textures/maps/stones-roughness', 'Stones — Roughness', 'Stones roughness map', '1/1') },
      ],
    },
    {
      name: 'Mossy Ground',
      maps: [
        { label: 'Base colour', file: 'Mossy Ground_basecolor.jpg', media: m('textures/maps/mossy-ground-basecolor', 'Mossy Ground — Base colour', 'Mossy Ground base colour map', '1/1') },
        { label: 'Roughness', file: 'Mossy Ground_roughness.jpg', media: m('textures/maps/mossy-ground-roughness', 'Mossy Ground — Roughness', 'Mossy Ground roughness map', '1/1') },
        { label: 'Height', file: 'Mossy Ground_height.png', media: m('textures/maps/mossy-ground-height', 'Mossy Ground — Height', 'Mossy Ground height map', '1/1') },
      ],
    },
    {
      name: 'Ground Dirt 03',
      maps: [
        { label: 'Base colour', file: 'T_GroundDirt_03_basecolor.jpg', media: m('textures/maps/t-grounddirt-03-basecolor', 'Ground Dirt 03 — Base colour', 'Ground Dirt 03 base colour map', '1/1') },
        { label: 'Normal (OpenGL)', file: 'T_GroundDirt_03_normalOGL.jpg', media: m('textures/maps/t-grounddirt-03-normalogl', 'Ground Dirt 03 — Normal (OpenGL)', 'Ground Dirt 03 normal (opengl) map', '1/1') },
        { label: 'Roughness', file: 'T_GroundDirt_03_roughness.jpg', media: m('textures/maps/t-grounddirt-03-roughness', 'Ground Dirt 03 — Roughness', 'Ground Dirt 03 roughness map', '1/1') },
      ],
    },
    {
      name: 'Rocks 08',
      maps: [
        { label: 'Diffuse', file: 'rocks08_diffuse.jpg', media: m('textures/maps/rocks08-diffuse', 'Rocks 08 — Diffuse', 'Rocks 08 diffuse map', '1/1') },
        { label: 'Normal (OpenGL)', file: 'rocks08_normal_opengl.jpg', media: m('textures/maps/rocks08-normal-opengl', 'Rocks 08 — Normal (OpenGL)', 'Rocks 08 normal (opengl) map', '1/1') },
        { label: 'Roughness', file: 'rocks08_roughness.jpg', media: m('textures/maps/rocks08-roughness', 'Rocks 08 — Roughness', 'Rocks 08 roughness map', '1/1') },
        { label: 'Specular', file: 'rocks08_specular.jpg', media: m('textures/maps/rocks08-specular', 'Rocks 08 — Specular', 'Rocks 08 specular map', '1/1') },
        { label: 'Height', file: 'rocks08_height.tif', media: m('textures/maps/rocks08-height', 'Rocks 08 — Height', 'Rocks 08 height map', '1/1') },
      ],
    },
    {
      name: 'Plant 8',
      maps: [
        { label: 'Colour', file: 'plant-8.jpg', media: m('textures/maps/plant-8', 'Plant 8 — Colour', 'Plant 8 colour map', '1/1') },
        { label: 'Normal', file: 'plant-8_normal.jpg', media: m('textures/maps/plant-8-normal', 'Plant 8 — Normal', 'Plant 8 normal map', '1/1') },
        { label: 'Displacement', file: 'plant-8_displacement.jpg', media: m('textures/maps/plant-8-displacement', 'Plant 8 — Displacement', 'Plant 8 displacement map', '1/1') },
      ],
    },
  ],
  textureMaps: 'Every map in the texture folder, grouped by set.',
  texturesZip: { href: '/downloads/echoes-textures.zip', size: '34 MB' },
}

/* ── 07 Asset Development (visual and audio asset.docx) ───────────────── */

export type Status = 'complete' | 'in-progress' | 'not-started'

export const visualAssets = [
  { name: 'Pine Tree', type: '3D', category: 'Environment', description: 'Main forest tree', texture: 'pineTree.png', resolution: '1024×1024', lighting: 'Sun/Moon', relatedTo: 'Forest', polys: '500–700', status: 'complete' as Status },
  { name: 'Camping Tent', type: '3D', category: 'Environment', description: 'Campsite tent', texture: 'tent.png', resolution: '1024×1024', lighting: 'Campfire', relatedTo: 'Campsite', polys: '900–1200', status: 'complete' as Status },
  { name: 'Campfire', type: '3D', category: 'Environment', description: 'Campfire with logs', texture: 'campfire.png', resolution: '512×512', lighting: 'Fire', relatedTo: 'Campsite', polys: '300–500', status: 'not-started' as Status },
  { name: 'Lantern', type: '3D', category: 'Prop', description: 'Vintage lantern', texture: 'lantern.png', resolution: '512×512', lighting: 'Emissive', relatedTo: 'Campsite', polys: '250–400', status: 'not-started' as Status },
  { name: 'Backpack', type: '3D', category: 'Prop', description: 'Hiking backpack', texture: 'backpack.png', resolution: '1024×1024', lighting: 'Campfire', relatedTo: 'Campsite', polys: '400–600', status: 'not-started' as Status },
  { name: 'Wooden Log', type: '3D', category: 'Environment', description: 'Seat/log', texture: 'woodLog.png', resolution: '512×512', lighting: 'Fire', relatedTo: 'Campsite', polys: '150–250', status: 'not-started' as Status },
  { name: 'Rock', type: '3D', category: 'Environment', description: 'Forest rock', texture: 'rock.png', resolution: '512×512', lighting: 'Natural', relatedTo: 'Forest', polys: '150–300', status: 'not-started' as Status },
  { name: 'Bush', type: '3D', category: 'Vegetation', description: 'Forest bush', texture: 'bush.png', resolution: '512×512', lighting: 'Natural', relatedTo: 'Forest', polys: '150–250', status: 'not-started' as Status },
  { name: 'Trail Sign', type: '3D', category: 'Prop', description: 'Navigation sign', texture: 'trailSign.png', resolution: '512×512', lighting: 'Sun', relatedTo: 'Trail', polys: '200–350', status: 'not-started' as Status },
]

/** Edited environmental audio — cleaned WAVs, 48 kHz stereo. Add more as they are produced. */
export type AudioAsset = { name: string; category: 'Ambient' | 'Interaction'; zone: string; description: string; duration: string; size: number; audio: AudioItem }

const wav = (file: string, name: string, category: AudioAsset['category'], zone: string, duration: string, size: number, description: string): AudioAsset => ({
  name, category, zone, description, duration, size,
  audio: a(`audio/edited/${file}`, name, { description, stage: `${category} · ${zone}` }),
})

export const audioAssets: AudioAsset[] = [
  wav('running-water', 'Running Water', 'Ambient', 'Trail', '5.0 s', 966850, 'A gentle stream along the trail — part of the daytime layer.'),
  wav('foliage-rustling', 'Foliage Rustling', 'Ambient', 'Forest', '2.1 s', 408302, 'Leaves moving in the breeze as the user walks between the trees.'),
  wav('wind-through-trees', 'Wind Through Trees', 'Ambient', 'Forest', '6.3 s', 1212610, 'Soft wind in the canopy as afternoon turns to evening.'),
  wav('footsteps', 'Footsteps', 'Interaction', 'Player', '2.6 s', 492562, 'The user’s steps on the dirt path.'),
  wav('tent-zip', 'Tent Zip', 'Interaction', 'Campsite', '0.8 s', 149862, 'The tent zip at the campsite — a sign someone was just here.'),
  wav('campfire-crackling', 'Campfire Crackling', 'Ambient', 'Campsite', '6.6 s', 1264178, 'The fire at the hidden campsite, the warm focal point at night.'),
  wav('night-crickets', 'Night Crickets', 'Ambient', 'Night', '1.5 s', 278722, 'Crickets that take over once night falls.'),
]

/* ── 08 Sonic Development ─────────────────────────────────────────────── */

export interface SourceClip {
  audio: AudioItem
  file: string
  contributor: string
  duration: string
  ref: string
}

const src = (file: string, title: string, contributor: string, duration: string, ref: string, group: string): SourceClip => ({
  audio: a(`audio/sonic/${file}`, title, { stage: 'Sourced · unedited', group }),
  file: `${file}.mp3`,
  contributor,
  duration,
  ref,
})

/** The 9 sourced MP3s — reference material, NOT final edited assets. */
export const sonicMoodboard: SourceClip[] = [
  src('audiopapkin-forest-ambience-296528', 'Forest ambience', 'audiopapkin', '3:33', 'snd-forest-ambience', 'day'),
  src('freesound_community-bird-song-17925', 'Bird song', 'freesound_community', '4:24', 'snd-bird-song', 'day'),
  src('soul_serenity_sounds-leaves-rustling-236742', 'Leaves rustling', 'soul_serenity_sounds', '0:06', 'snd-leaves-1', 'day'),
  src('tanweraman-leaves-rustling-2-329002', 'Leaves rustling 2', 'tanweraman', '0:02', 'snd-leaves-2', 'day'),
  src('traian1984-ambience-wind-blowing-through-trees-01-186986', 'Wind through trees', 'traian1984', '1:30', 'snd-wind', 'night'),
  src('u_uy2kad5rlq-crickets-395138', 'Crickets', 'u_uy2kad5rlq', '0:09', 'snd-crickets', 'night'),
  src('soundreality-campfire-crackling-sound-439573', 'Campfire crackling', 'soundreality', '2:59', 'snd-campfire', 'night'),
  src('freesound_community-footsteps-dirt-gravel-6823', 'Footsteps on dirt & gravel', 'freesound_community', '0:35', 'snd-footsteps', 'interaction'),
  src('freesound_community-wood-creak-72307', 'Wood creak', 'freesound_community', '0:34', 'snd-wood-creak', 'interaction'),
]

const shot = (file: string, caption: string) => m(`audio/editing/${file}`, caption, `Audacity: ${caption}`, '16/9', caption)

export const sonic = {
  why: 'The noises of the surrounding environment change from birds and running water to crickets, a little wind, and the crackling of the bonfire. Sound changes alongside lighting to communicate the passage of time — and it is one of the two halves of the folio inquiry.',
  /** Effects visible in the Audacity screenshots below. */
  editedWith: 'EQ, reverb, compression, speed and pitch changes, and trimming',
  /** Audacity editing screenshots, in the order they were taken. */
  editingShots: [
    shot('01-crickets', 'Crickets clip'),
    shot('02-filter-curve-eq', 'Filter Curve EQ, low cut below 300 Hz'),
    shot('03-reverb-large', 'Reverb, room 100%, pre-delay 55 ms'),
    shot('04-compressor', 'Compressor, −14 dB threshold at 4:1'),
    shot('05-speed-pitch', 'Speed and pitch at 0.85×'),
    shot('06-reverb-small', 'Reverb, pre-delay 10 ms'),
    shot('07-tent-zip-original', 'Tent zipper, original'),
    shot('08-tent-zip-trimmed', 'Tent zipper, trimmed'),
    shot('09-wind-a', 'Wind, before'),
    shot('10-wind-b', 'Wind, after'),
    shot('11-reverb-dry', 'Reverb, dry −10 dB'),
    shot('12-footsteps-original', 'Footsteps, original'),
    shot('13-footsteps-trimmed', 'Footsteps, trimmed'),
    shot('14-water-a', 'Water (1)'),
    shot('15-water-b', 'Water (2)'),
  ],
}

/* ── 09 Timeline ──────────────────────────────────────────────────────── */

/** Every milestone is complete. Weeks 13–16 come from SIT253_Final_Folio_Timeline_Updated.xlsx. */
export interface Milestone {
  when: string
  title: string
  detail?: string
  files?: string
}

export const timeline: Milestone[] = [
  { when: '30 Jul 2026', title: 'Research & moodboard', detail: 'Research and reference document written; visual moodboard composed.', files: 'RESEARCH AND REFERENCE.docx, YAKSH MOODBOARD.png' },
  { when: '31 Jul 2026', title: 'Self reflection & sonic moodboard', detail: 'Four-week reflection written; nine reference sounds sourced.', files: 'SELF REFLECTION.docx' },
  { when: 'Weeks 1–4', title: 'Scope narrowed', detail: 'A large woodland with many interactive elements became a forest walk to a hidden campsite, with fewer, better assets.' },
  { when: '25 Aug 2026', title: 'Textures sourced', detail: 'First 1K texture sets downloaded.' },
  { when: '27 Aug 2026', title: 'Tree, tent & scene exported', detail: 'Pine tree, tent and scene exported as GLB; asset tracker and folio inquiry updated.', files: '3D_TreesModel.glb, 3D_TentModel.glb, 3D_SceneModel.glb' },
  { when: '22–23 Sep 2026', title: 'Final Blender scene saved', files: 'ForestEscape_FINAL.blend' },
  { when: 'Week 13', title: 'Review Progressive Folio 2 feedback' },
  { when: 'Weeks 13–14', title: 'Finalise 3D visual assets' },
  { when: 'Weeks 13–14', title: 'Finalise textures & materials' },
  { when: 'Weeks 13–14', title: 'Record / finalise original audio assets' },
  { when: 'Week 14', title: 'Organise asset management' },
  { when: 'Week 14', title: 'Capture asset management evidence' },
  { when: 'Week 14', title: 'Edit and document audio assets' },
  { when: 'Week 14', title: 'Finalise lighting & composition' },
  { when: 'Weeks 14–15', title: 'Produce final asset renders' },
  { when: 'Weeks 14–15', title: 'Produce final environment renders' },
  { when: 'Weeks 14–15', title: 'Update concept & development documentation' },
  { when: 'Weeks 15–16', title: 'Finalise website / online folio' },
  { when: 'Week 15', title: 'Add development comparison' },
  { when: 'Week 15', title: 'Complete final reflection' },
  { when: 'Week 15', title: 'Complete ethics & GenAI documentation' },
  { when: 'Week 15', title: 'Finalise references' },
  { when: 'Week 16', title: 'Final folio review & corrections' },
  { when: 'Week 16', title: 'Create frozen folio PDF' },
  { when: 'Week 16', title: 'Final submission' },
]

/* ── 10 Final Environment ─────────────────────────────────────────────── */

export const finalEnvironment = {
  scene: { src: 'models/scene', title: 'Forest scene', alt: 'Interactive 3D model of the Echoes of the Forest scene', tris: 517, size: 1424712 },
  renders: [
    { title: 'Afternoon', media: m('final/render-afternoon', 'Afternoon render', 'Render of the forest in warm afternoon light', '16/9') },
    { title: 'Golden hour', media: m('final/render-golden-hour', 'Golden-hour render', 'Render of the trail at golden hour', '16/9') },
    { title: 'Campfire', media: m('final/render-campfire', 'Campfire render', 'Render of the campsite lit by the campfire', '16/9') },
    { title: 'Moonlight', media: m('final/render-moonlight', 'Moonlight render', 'Render of the forest under cool moonlight', '16/9') },
  ],
  walkthrough: m('final/walkthrough', 'Walkthrough / Quest capture', 'Walkthrough of the environment captured on Meta Quest', '16/9'),
}

/* ── 11 Final Models ──────────────────────────────────────────────────── */

export interface FinalModel {
  name?: string
  status: 'complete' | 'in-development'
  src?: string
  alt?: string
  polyBudget?: string
  tris?: number
  textures?: string
  size?: number
  sketchfabUrl?: string
}

export const finalModels: FinalModel[] = [
  { name: 'Pine Tree', status: 'complete', src: 'models/pine-tree', alt: 'Interactive 3D model of the low-poly pine tree', polyBudget: '500–700', tris: 372, textures: 'Bark014 · LeafSet029 · Grass002 (1K)', size: 1269728, sketchfabUrl: '' },
  { name: 'Camping Tent', status: 'complete', src: 'models/camping-tent', alt: 'Interactive 3D model of the low-poly camping tent', polyBudget: '900–1200', tris: 145, textures: 'Fabric046 (1K)', size: 155404, sketchfabUrl: '' },
  { status: 'in-development' },
  { status: 'in-development' },
]

/* ── 12 Final Soundscape ──────────────────────────────────────────────── */

export const soundscape = {
  /** Final edited WAVs. */
  finals: audioAssets,
  mixer: {
    day: sonicMoodboard.filter((s) => ['snd-bird-song', 'snd-forest-ambience', 'snd-leaves-1'].includes(s.ref)),
    night: sonicMoodboard.filter((s) => ['snd-wind', 'snd-crickets', 'snd-campfire'].includes(s.ref)),
  },
}

/* ── 13 Reflection (SELF REFLECTION.docx) ─────────────────────────────── */

export const reflection = {
  sections: [
    { id: 'shift-in-perspective', title: 'Shift in Perspective', text: 'My comprehension of the steps needed in producing an immersive virtual reality experience has evolved dramatically over the last four weeks. I thought that making aesthetically pleasing 3D models was the primary goal of developing a VR environment at the start of the course. But now that I’ve planned my folio and studied VR programming, I realize that good immersive experiences need much more than just eye-catching graphics. Optimization, environmental narrative, user comfort, lighting, audio, and technical performance are all equally significant factors. This change in viewpoint has inspired me to think like both a designer and a developer while making decisions for Echoes of the Forest and has helped me recognize the value of planning before production.' },
    { id: 'scoping-and-prioritisation', title: 'Scoping & Prioritisation', text: 'Before selecting what was feasible to construct, I took into account my experience level and the time I had available. Since I’m new to Blender, I decided on a low-poly art style because it lets me employ basic geometry to produce aesthetically pleasing items with good standalone VR performance. A much bigger woodland with numerous intricate objects and interactive elements was part of my first concept. But I realized it would be challenging to finish this within the semester. I focused on producing fewer, better-quality materials and narrowed the scope to a forest walk that leads to a secret campground. This strategy will enable me to finish the project while preserving a constant level of technical and artistic excellence.' },
    { id: 'sourcing-technical-guides', title: 'Sourcing Technical Guides', text: 'To prepare for the production stage, I researched several industry examples and technical resources that will guide my development process. Bob Ross’s landscape paintings inspired my colour palette and peaceful forest atmosphere, while God of War influenced my environmental composition and lighting. Princess Mononoke provided ideas for creating a natural and immersive forest environment. For technical learning, I have bookmarked the Blender Manual, tutorials from Blender Guru and Grant Abbitt, and the Meta Quest Developer Documentation. These resources will help me learn low-poly modelling, texturing, optimisation, and workflow techniques suitable for standalone VR. Together, they provide both artistic inspiration and practical guidance for developing Echoes of the Forest.' },
    { id: 'identifying-skill-gaps', title: 'Identifying Skill Gaps', text: 'Making 3D models in Blender, especially box modeling, UV unwrapping, and properly applying textures, is currently my least confident area. I anticipate that these tasks will require the greatest practice because I have never used Blender before. Before beginning my final materials, I want to finish a few beginner tutorials to hone my abilities. Before moving on to more intricate models like the camping tent and light, I will start by modeling basic things like pebbles, logs, and trees. Additionally, I need to get better at audio editing, especially when it comes to adding background noise to create a realistic woodland setting. Regular practice of these methods will boost my confidence during the project’s production phase.' },
  ],
  closing:
    'Each of these shifts leads back to the folio inquiry: a relaxing, immersive forest for standalone VR depends as much on planning, optimisation and sound as on the models themselves.',
}

/* ── 14 Ethics (FOLIO ENQUIRY.docx) ───────────────────────────────────── */

export const ethics = [
  { title: 'User comfort', text: 'The experience has been created to promote leisurely exploration while eliminating needless camera movement or abrupt changes in the surroundings that could cause motion sickness.' },
  { title: 'Multi-sensory cues', text: 'To increase accessibility and make sure users are not reliant on a single mode of interaction, environmental information will be conveyed through both visual and auditory signals.' },
  { title: 'Academic integrity', text: 'Each 3D model is constructed from scratch in Blender. Harvard referencing credits external tutorials, reference photos, scholarly works, and any sourced audio. Audio from outside libraries will undergo significant modification in compliance with the unit requirements.' },
  { title: 'Respectful portrayal of camping', text: 'Camping is portrayed as a tranquil recreational activity that values nature, environmental awareness, and appropriate outdoor activities rather than promoting hazardous behavior.' },
]

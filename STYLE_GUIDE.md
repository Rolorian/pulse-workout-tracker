# Pulse Realm — visual style guide

**Identity:** a dusky, lantern-lit fantasy valley in 16×16 pixel art. It is warm where people live and colder and stranger the further south you go. The world is drawn by one hand: the Ninja Adventure pack (CC0) and nothing else. Every engine effect samples or matches that pack's palette.

## 1. Pixel rules
- **Grid:** 16×16 tiles. The world is rendered at one canvas pixel per CSS pixel and upscaled with `image-rendering: pixelated`. The scale is an integer, with about 9.5 tiles across on a phone.
- **Crisp positions:** sprites, props, particles and UI art always land on whole pixels. Sub-pixel motion is only allowed for soft light and fog.
- **No mixed resolutions:** effects drawn in code (pennants, torches, birds, bubbles, sparks) use 1-pixel strokes at world scale, never smooth vectors.
- **Outlines:** characters and props keep the pack's 1-pixel dark outline. Nothing new is drawn without an outline unless it is light or particles.

## 2. Palette
| Role | Colours |
|---|---|
| Ink / outlines / UI edge | `#1a1020`, `#0b0710` |
| Parchment (panels, dialogue) | `#f3e3c3`, `#e2c99d`, text `#1a1020`, headings `#8a3a1c` |
| Wood (frames, buttons) | `#6b4128`, light `#a8693c`, dark `#3d2414` |
| Night plates (HUD) | `#140c1a` / `#2c2033` / `#4a3755` |
| Gold (rewards, rivets, quests) | `#ffd23f` |
| Ember / action (primary buttons) | `#c2410c` |
| Life (heal, weakness) | `#7dff9a` on `#2f6b3a` |
| Danger (damage, heavy attacks) | `#ff6b6b`, `#ff2a2a` |
| Guard / ice | `#8fd3ff` |
| Lamp light | `rgb(255,186,110)` · Torch `rgb(255,150,70)` · Moon ambient `rgb(62,70,128)` · Dungeon ambient `rgb(52,44,76)` |

Each region has its own daylight grade (a multiply colour in `BIOME[i].grade`): the meadow is warm, Mistmarsh teal, Frostpeak blue-white, Volcano Forge red, Shadow Realm violet, and Titan's Throne gold.

## 3. Light
- **Light map:** the scene is multiplied by a quarter-resolution light map. Its base is the zone's daylight grade, blending to moon blue at night (from the real clock). Dungeons are always dark.
- **Light sources:**
  - Windows of rebuilt houses
  - Lanterns
  - Wall torches, which flicker
  - The waystone (blue)
  - Your lantern at night and in dungeons, plus a smaller one for your party buddy
  - Bosses (red)
  - Fireflies (tiny)
- **Shadows:** the sun is at the upper left. Every standing prop bakes a skewed silhouette shadow down and to the right, plus a one-pixel contact line. Characters get a soft ellipse.
- **Atmosphere:** forest regions get very faint daylight shafts. Marsh and shadow regions get fog. Vignettes are stronger underground.

## 4. Terrain
- **Edges:** tiles never meet on a hard edge. Higher-priority terrain grows into lower terrain with a wobbly, dithered edge sampled from its own tile (`blendGround`). The order is dark grass > grass > snow > meadow sand > paths > water.
- **Water:** foam pixels at the shore and a shadowed band under the banks. Slow highlight dashes and occasional ripple rings move across it.
- **Dungeons:** brick wall faces lit from above, near-black wall tops with rim light, and ambient occlusion where walls meet floor. Floors have cracks, bones, moss and puddles.

## 5. Life and animation
- **Characters:** idle characters breathe (a one-pixel squash), walkers bounce on their passing steps, bumps hop.
- **Plants:** trees, bushes, flowers and grass sway in three bands, top to bottom, by whole pixels.
- **Ambient life:**
  - Birds cross by day and cast shadows.
  - Butterflies visit flowers.
  - Leaves, snow and embers drift by biome.
  - Fireflies come out at night.
- **The village:**
  - Rebuilt buildings fly a pennant in their own colour, with a pot, crate and flowers at the door and lit windows.
  - Hana hammers at the forge (sparks and clangs), and Ade works the field.
- **Enemies:** elites have a pulsing orange ground ring and bosses a red one, with embers.

## 6. Combat presentation
- **Timing:** wind-up → contact → hit-stop → recovery. Effects are tied to that moment: 65 ms of hit-stop for a normal hit, 110 ms for a heavy one, 130 ms plus slow motion for a crit.
- **Stage:** the battlefield is the exact spot where the fight started, re-rendered at battle scale with the same ground, shadows and scenery, slightly dimmed so the fighters read first.
- **Number colours:** white is normal, green is weakness, grey-tan is resisted, gold is crit, blue is your buddy, red is damage to you.

## 7. Interface
- **Panels:** all Realm panels use the generated 12-pixel frames. Parchment panels have a wood border with gold rivets; HUD plates are dark with gold rivets. No rounded corners, gradients or emoji.
- **Type:** Silkscreen for labels, headings and numbers; Pixelify Sans for body text and dialogue.
- **Buttons:** solid colour, a 2-pixel ink border, a bevel on the inset, and they press 2 px down. Primary actions are ember; secondary actions are wood or plum.
- **Icons:** pixel icons are drawn from bitmaps in code, such as the map and the satchel.
- **Adventure sub-tabs:** these share the plum, parchment and Silkscreen skin. Home, Hero, Loot and Stats keep the tracker style, as Murtadha chose.

## 8. Performance budget
The target is 60 fps on a phone.
- The world canvas is at CSS resolution and the light map at ¼ of that.
- Props and characters outside the view (plus a margin) are skipped.
- Terrain blending, shadows and dungeon architecture are baked once per zone.

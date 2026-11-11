# Pulse Realm — development log

## 2026-10-31 · Milestone 3: game feel, bonds, Adventure revamp

**Creative direction (agreed with Murtadha)**
- Combat: weighty, with flashy big moments.
- Art: dark-fantasy pixel art.
- Only the Realm and the Adventure sub-tabs get the RPG look; Home, Hero, Loot and Stats stay as they are.
- First new system: NPC bonds and a changing village.

### Audit — the weakest moments before this milestone
- **Combat.** Attacks were straight-line slides with no wind-up or follow-through. Damage landed on timers instead of on contact. There was no hit-stop, crits looked like normal hits, enemies faded out on death, bosses had no entrance, blocks had no visual, and the HP bar jumped.
- **Exploration.** Characters stood perfectly still between steps. Walking had no sound, interactable things gave no hint until tapped, a tap you couldn't reach only showed a red circle, and the camera was locked dead-centre.
- **Village.** NPCs had one-line or quest-only dialogue. Nothing changed as you progressed, and there were no relationships.
- **Adventure sub-tabs (Map, Dungeons, Village, Battle).** They still used the generic dashboard style, didn't know about Realm progress, and the Map didn't show Realm conquests.

### Shipped
**Combat director**
- A battle clock that hit-stop and slow-motion can bend, plus tweens and a timeline. Damage now lands on the exact frame of contact.
- Hero moves:
  - Strike: wind-up → dash → swing with a weapon trail → impact → recovery.
  - Smash: crouch → leap → slam, with a shockwave and dust.
  - Flurry: two swings in alternating directions.
  - Guard: brace with a shield bubble, then a counter-dash.
- Impacts: white flash on the enemy, knockback with squash-and-stretch, sparks, and hit-stop (65 ms normal, 110 ms heavy, 130 ms crit).
- Crits: slow-motion, camera punch, white flash, gold "CRITICAL" number with an overshoot pop.
- Killing blow: slow-motion and zoom, the enemy shatters into its own pixels, then the hero strikes a victory pose.
- Enemy turns:
  - Wind-up with a red glow, then a lunge.
  - Heavy attacks dim the screen and pull the camera in.
  - Blocks clang with blue sparks.
  - When you're hit, the hero flashes red and gets knocked back, and the hearts shake.
- During your turn, heavy attacks are telegraphed with a pulsing red glow and a HEAVY tag.
- Boss introductions: letterbox bars, a slow push-in and a title card ("Master of Starter Meadow" / "World Boss" / "Lord of …"). Tap to skip.
- The enemy HP bar has a damage trail. Move buttons slide in each turn.
- Synthesised foley layered under the pack sounds: whoosh, crack, thud, crit chime, finisher boom, clang, hurt, growl, warning beeps, heal, boss rumble.
- Screen shake setting: Off, Low or Full.

**Exploration**
- Characters breathe while idle (a one-pixel squash) and bounce on their passing steps.
- Footstep sounds for the hero.
- Interaction bubbles appear over nearby people, chests, buildings, the board and waystones.
- Tapping a spot you can't reach makes the hero turn, hop and bump with a sound.
- The camera eases ahead in the direction you're walking.
- NPCs emote when you talk to them (! / … / heart).

**Bonds and a changing village**
- 8 villagers: Oren, Mira, Bo and Pip, plus Hana, Tomas, Ade and Lin, who move in when their building is restored.
- Bond hearts 0–5: +1 for the first visit each day, +3 for a favour, +1 for a partial favour. Missed days never cost bond.
- Favours are short training sessions using the same rep counter. Volume is sized from your own recent sets, capped at a comfortable single set, and the session can stop any time. Each one is logged to your history.
- Bond 3 perks: Mira 20% off, Bo a daily whetstone, Oren and Ade a daily potion, Lin a daily full heal, Pip a hidden daily chest, Hana cheaper and sharper whetstones, Tomas "Well-fed" +20% damage.
- Each bond level gives a gift and a level-up card with a personal line.
- Dialogue changes by bond tier and by context: conquered bosses, your streak, late hours.
- Reputation (Newcomer → Legend of the Valley) and Prosperity, both built from what you've actually done.
- Prosperity adds lanterns, flower beds, market stalls and new townsfolk who talk about your deeds.
- ☰ ▸ Villagers journal.

**Adventure sub-tabs revamp**
- Dark-fantasy pixel skin scoped to the Adventure tab: plum panels, parchment text, square frames, Silkscreen/Pixelify type, pressable buttons.
- Each sub-tab opens with an "In the Realm" portal showing Realm progress, with a button that travels there.
- Realm conquests now sync to the Map screen on launch.

### Tested
- Ran in Playwright at iPhone size:
  - The full quest flow.
  - A battle with captured animation frames, a boss intro and a world-boss fight.
  - Mira's favour session: logged to history, bond level 1.
  - A bond level-up card and the villager journal.
  - All 10 regions and the dungeons.
  - All four sub-tab portals.
  - Regression suites for the nav, game, hero and pets/village tests.
- No console errors.

### Known limits / next
- Portal art can take half a second to appear the first time, while sprites load.
- There are no building interiors yet, so favours happen outdoors.
- Next up: combat depth, meaning enemy weaknesses and resistances per exercise and a Momentum combo meter. After that, building interiors.

## 2026-10-31 · Milestone 4: tactical combat and a personal soundtrack
- **Weaknesses and resistances.** Every creature belongs to one of five families: soft, slither, shell, fighter or spirit.
  - Each family takes ×1.5 damage from one move and ×0.6 from another.
  - Region bosses, dungeon lords and world bosses have families too.
  - You discover the matchups by hitting with each move: "WEAK TO SMASH" or "RESISTS FLURRY" pops up and is remembered in `R.lore`.
  - Once discovered, the enemy plate shows chips and the move buttons get WEAK or RESIST tags.
- **Momentum.** Switching to a different exercise than last turn adds a step, worth +10% each, up to 3. At 3 you get SURGE (+30%). Repeating the same move resets it. The pips sit above the moves, and each button previews "chain +X%" or "breaks chain". This rewards varied training in a natural way.
- **Soundtrack slots for every place and fight.** There are 18 slots:
  - Places: Pulsehaven, an all-regions fallback, each of the 10 regions, and dungeons.
  - Fights: battles, elite fights, bosses, world bosses, and a victory fanfare.
  - Unset slots fall back down a chain: region → all regions → default; world boss → boss; elite → battle.
  - A music volume slider is included.
  - Files are stored in IndexedDB on the device only. Nothing copyrighted is shipped in the repo.
- **Tested.** A slime fight played Strike → Flurry → Smash: resist ×0.6 and weak ×1.5 applied, momentum went 0 → 1 → 2, both lore entries were discovered, and there were no errors. The soundtrack menu renders all 18 slots.

## 2026-10-31 · Milestone 5: visual identity overhaul (village benchmark → everywhere)
- **Baseline audit:**
  - Hard square tile seams everywhere.
  - No cast shadows.
  - A static world.
  - Night was a flat tint.
  - Dungeon walls were scattered outline pieces.
  - CSS-box UI.
  - The battle backdrop was a generic grass patch.
- **Shipped (engine-wide, so every region benefits):**
  - Dithered organic terrain blending.
  - Baked sun shadows.
  - Three-band wind sway.
  - Water with foam, bank shadow, shimmer and ripples.
  - A quarter-resolution light map with lamps, torches, your lantern, buddy and boss light, and fireflies.
  - Daylight shafts.
  - Birds with shadows, and butterflies.
  - Dungeon architecture: brick faces, rim-lit tops, occlusion, worn floors, flickering torches.
  - Elite and boss ground auras.
  - Snow ground tint so white props read.
  - Generated pixel frames and icons across all Realm UI.
  - Battles staged on the real location.
- **Village benchmark:**
  - A mill pond with lilies and reeds.
  - Pennants and lived-in doorsteps on rebuilt buildings.
  - Hana and Ade at work.
- **Performance:** the world now renders at CSS resolution with integer upscaling, and off-screen props and characters are culled. Measured 61 fps with everything on (it was 30 before the change and 38 before the overhaul) in headless Chromium at iPhone 14 Pro Max size.
- **New doc:** STYLE_GUIDE.md.

## 2026-10-31 · Art Phase 1: Pulse character set (approved style: chunky, earthy, OSRS-inspired originals)
- `tools/chargen.py` is a character generator in the new house style. All 25 humanoids are generated from one template set:
  - front, back and side templates
  - 4-frame walk with arm swing
  - attack, jump, knocked-down and victory poses
  - top-left light shading and a 1-pixel ink outline
- The output keeps the engine's sheet layout (64×112), so it works with no engine changes. Portraits are generated as well.
- The cast covers: the hero, Oren, Mira, Bo, Pip, Hana, Tomas, Ade, Lin, the townsfolk, all 8 league buddies, the goblin, skeleton, Dark Knight, Titan Guard, Shadow and Frost Giant.
- Every design is original. Only the general style is inspired by OSRS: no Jagex characters or art are copied.
- ☰ ▸ "Character art: Pulse / Classic" switches back to the pack sprites at any time.
- Next phases: buildings, trees and ground tiles; then monsters and bosses.

## 2026-10-31 · Art Phases 2 + 3 + extras: the whole world in the Pulse style
- **`tools/envgen.py`:**
  - 13 seamless ground tiles: two grasses, meadow and forest trails, sand, flagstones, cobbles, brick, two snows, ice, water and dungeon flags.
  - 40+ props:
    - Buildings: a slate-roofed stone hall, a stone manor, a thatched timber cottage and a tiled timber training hall.
    - Ruins, rubble, a shed, the market stall, the village gateway, the notice board, the field, the cave mouth, the rune waystone, dungeon stairs and an igloo.
    - Trees and rocks: oak, birch, pine, snowy pine, a big bush, rocks, a boulder and stumps.
    - Small props: a fence, flowers, tufts, a pot, a crate, a lantern, a signpost, a lily pad and a ladder.
  - Everything is laid out in one atlas (`env2.png`) and resolved at draw time, so terrain blending, shadows and wind all work with the new art.
- **`tools/mongen.py`:** 21 original creatures with front, back and side views and 4-frame animation:
  - slime, shroomling, shellback, grass viper, moss blob, rock crab, cave bear
  - mud golem, bog lurker, marsh lizard, wisp, sand viper, fire scarab, dust imp
  - watcher, troll, ember sprite, fire bat, demon skull, sky sentinel
  - and the scarecrow boss
  
  There's also a new dog.
- **Your gear on your hero:** your equipped body armour recolours the tabard to its rarity colour, and an equipped helm turns the hair into a metal helm. This shows in the overworld and in battle.
- ☰ ▸ "Art style: Pulse / Classic" now switches the whole world: characters, monsters, terrain and props.
- **Tested:** village by day, night and dusk; Goblin Woods; a dungeon; Frostpeak; a battle with equipped gear; dialogue. 0 errors.

## 2026-11-03 · Effects pass: pixelfx (MIT), vendored and locked down
- **Source:** 24 curated effects from [pixelfx](https://github.com/patch-gg/pixelfx) (MIT) are bundled into one readable local file, `vendor/pixelfx/pixelfx.js`.
  - It ships with its LICENSE and NOTICE. The non-MIT Patch Pixel font is excluded.
  - Nothing is loaded from GitHub or npm at runtime, and none of the project's scripts were run.
- **Audit:** the bundle has no network, storage, cookie, DOM or eval access. It only fills pixel buffers. See `vendor/pixelfx/README.md`.
- **Privacy lock:** a Content-Security-Policy in `index.html` lets the app load only its own files and talk only to the weather API. Any vendored code that tried to send data elsewhere would be blocked by the browser.
- **Combat:**
  - Strike swings a steel slash (gold on crits), Flurry a dagger flurry, and Smash a hammer smash with an earth-toned crater.
  - Guard raises a lattice shield, and the guard counter has its own slash.
  - Hits use hit sparks, blunt hits for Smash and allies, and a crit star for crits.
  - Enemies attack with a claw swipe. A blocked attack shows the shield.
  - The finisher uses a smoke poof; bosses also get a dark explosion. The boss intro shows a red charge-up.
  - Healing has a green heal effect.
- **Status (visual only):** enemy hits paint SCORCHED in the Volcano Forge, POISONED in Mistmarsh, and CHILLED in Frostpeak/Ice Caverns. The effect is drawn over your real hero sprite.
- **World:**
  - Rain falls in Mistmarsh and ash in the Volcano Forge.
  - Opening a chest shows a gold collect burst.
- **Rendering:** every effect is drawn at an integer scale of the sprite pixels and recoloured to the STYLE_GUIDE palette. A frame is re-rasterised only when the effect advances, so hit-stop costs nothing. `G._rpgDebug.off.pfx = 1` / `.weather = 1` turn the layer off.
- **Tested:**
  - Battles in Mistmarsh and the Volcano Forge with every move, the enemy turn, guard and the finisher.
  - rpg_test, rpg3_test and rpg4_test show 0 errors, and there were 0 requests to anything but the app itself.
  - Frame rate: 60 fps in the world with rain, and 55–60 fps in battle during Smash (headless software rendering).

## 2026-11-03 · App-wide upgrade: exercise library, celebrations, sounds, charts, pixel icons
All of these are local copies of open-source code. See `vendor/README.md` for each one's license and audit. The page makes no requests to anything but itself, and the Content-Security-Policy enforces this.

- **Exercise library:** 188 bodyweight moves from free-exercise-db (public domain).
  - Type in the log sheet's search, e.g. "press ups", "star jumps", "squat jump" or "glutes". Your own buttons match first, then a "📚 Exercise library" section lists variations with level and main muscle.
  - Search understands UK/US names (press-up and push-up, star jump and jumping jack), plurals, hyphens and word order.
  - Picking a library move that equals a built-in one (for example Pushups) logs it as the built-in (Press-ups), so PRs and history stay together. Other moves log under their own name with the right category.
  - Any chosen move shows a collapsible "📖 How to do it" card with level, muscles and steps.
- **Celebrations (pixelfx):**
  - Pixel confetti replaces the CSS confetti.
  - Level-ups get a LEVEL UP! / NEW TITLE! / MASTERY! light pillar.
  - Achievements get a sliding "Achievement unlocked" banner.
  - Quests get a QUEST COMPLETE ribbon.
  - A **NEW PR!** pillar plus a toast replaces the old blocking `alert()`.
  - Effects respect the reduced-motion setting, and at most 4 play at once.
- **Sounds (ZzFX):** a coin blip when a set is logged, a sparkle layered on the PR jingle, a quest chime, and a delete thud. They play through the app's own audio and follow the sound toggle.
- **Stats chart (uPlot):** Exercise Progress is now a zoomable chart.
  - Best set is a gold line; the day's total is shown as bars.
  - There are 30-day, 90-day and All ranges, plus a live legend. The old bars remain as a fallback.
- **Pixel icons (Pixelarticons):** the bottom navigation uses pixel icons that match the Realm.
- **Tested:** game, nav, battle, hero, rpg, rpg3, rpg4, pfx and library suites show 0 errors and 0 non-local requests. SW cache is now `pulse-v21`.

## 2026-11-03 · Seven more libraries: smarter search, smooth lists, training calendar, tour, chiptunes, carved dungeons
Every library is a local, audited copy (see `vendor/README.md`). The app still makes no requests to anything but itself.

- **Typo-proof search (Fuse.js):** "pusups", "sqauts", "burpes" and "montain climber" all find the right move. Fuzzy matching only kicks in when nothing matches as typed, so normal searches stay tidy.
- **Smooth lists (AutoAnimate):** the Today, History and Quests lists now morph: unchanged rows keep their place, new rows slide in, and removed rows fade out.
- **Your Training Year:** a GitHub-style 53-week calendar in Stats.
  - Gold levels show daily volume (sets).
  - Tap a day to see its sets and exercises.
  - It auto-scrolls to this week.
- **What's new tour (Driver.js):** a 4-step pixel-styled walkthrough that starts once, when nothing else is on screen. Settings → "What's new tour" replays it.
- **Chiptune soundtrack (ZzFXM):** six original tracks: village, wilds, dungeon, battle, boss and a victory fanfare.
  - They're rendered on the device in under 0.4 s each and normalised.
  - Switch with ☰ → Soundtrack → "Built-in music: Classic / Chiptune". Your own uploaded tracks always play first.
- **Carved dungeons (rot.js):**
  - Each floor of each run is dug fresh with rooms and winding corridors (34×30).
  - Start is near the top-left; stairs and the boss are in the farthest room by walking distance.
  - The classic 3×3 layout remains as a fallback.
  - If a saved position lands in a wall after re-carving, you appear at the entrance.
- **Torchlight:** rot.js field of view with a radius of 6. What you see is clear, explored tiles stay dimly remembered, and the rest is dark. It fades softly as you move.
- **Chasing monsters:** dungeon monsters that see you shout "!" and chase you around walls with rot.js A*. Guards and bosses hold their ground. If one catches you, the fight starts.
- **Natural terrain (simplex-noise):** seeded two-tone ground patches and tree groves (pines cluster together, and so on). Paths, spawns and saves are unchanged.
- **Tested:**
  - rpg, rpg3, rpg4, pfx, game, nav, battle, hero, app-fx, library, ux and realm2 suites show 0 errors and 0 non-local requests.
  - 60 fps in dungeons with fog and in regions; 58–59 fps during battle Smash. SW cache is now `pulse-v22`.

## 2026-11-10 · Friend codes
- **Friends card** in Adventure → League: a weekly XP race between you and your friends, with streak, total level and when each friend last updated. Tap a friend for a side-by-side comparison of weekly XP, streak, level, active days, total sets, Realm regions and the best lifts you both train.
- **Share my code:** a ~200-character code, a QR code and a share link. The code holds name, levels, streak, this week's XP, top 8 best lifts, League and Realm regions. Nothing else.
- **Add friend:** paste a code or a whole message, or open a shared link (`#f=…`; the part after `#` is never sent to a server). Re-adding a newer code updates that friend. Your own code, older codes, damaged codes and edited codes are refused.
- **Privacy:** no accounts, no server, no uploads. A random player id is used only to match updates, and friends are stored on this phone only.
- **Safety:** codes are untrusted input. They are size-capped and checksummed, every field is whitelisted, numbers are clamped and text is stripped of control characters. Everything is HTML-escaped when shown. Tested with a hostile name/HTML payload.
- **Honest limit:** without a server, a determined player can fake their own numbers. The checksum only stops typos and casual edits.
- `vendor/qrcode` (qrcode-generator, MIT) draws the QR as SVG. SW cache is now `pulse-v23`.
- **Note:** `nav_test` reports `empty view adventure/battle`. This also happens before this change; the test still expects the old Battle sub-tab that was folded into the Realm.

## 2026-11-11 · Round 1 — Coach and safe saves
- **Full backup and restore (`backup.js`):** Export now saves every Pulse save in one file (hero, Realm, loot, village, friends), not only workouts. Import checks every key and value before writing, keeps a copy to roll back if the write fails, and still accepts old workout-only backups. The app also asks the browser to keep its storage. Own music files are not included.
- **Move to a new phone:** Settings → "Move to a new phone" sends the backup through the share menu; import it on the other device.
- **Muscle balance (Stats):** weekly sets for push, pull, legs and core, with a warning for anything under 12% of the week.
- **Recovery:** Fresh / Recovering / Tired per group, estimated from the last three days and the "tired/sore" feeling. An estimate, not a medical reading.
- **Next-target nudges:** the log sheet shows the last session and a one-tap target (one more rep, or a repeat after a dip).
- **Skill ladders (Today):** Push, Legs, Pull, Core and Shoulders. A step is passed by 3 sets at the target in one day. Passing pays coins and gems and adds +1% Realm damage per step (`G.dmgMods`).
- **Today's plan:** 10, 20 or 30 minutes; picks the current ladder step for the least-trained, most-recovered groups, with targets from the nudges. One tap opens the log sheet prefilled.
- **Rest-day quest:** on a rest day the plan becomes three stretches from the library; finishing them pays 30 coins. If everything is tired, the plan suggests a rest day.
- SW cache `pulse-v24`.

## 2026-11-11 · Round 2 — Combat
- **Bestiary** (Realm menu): every creature met, with weakness and resistance once discovered in a fight, and times beaten.
- **Boss mechanics:** every third turn a boss charges its biggest attack at 1.7× damage. A Guard hold of half strength or more becomes a Perfect Guard (full block). Dealing 12% of the boss's health in that turn interrupts it. Either one staggers the boss, so your next attack deals 1.5×. Bosses announce Phase 2 at half health.
- **Stances** (Realm menu): Balanced, Bulwark, Tempest and Breaker trade damage, defence and Guard strength; Breaker also breaks charges 50% faster.
- **Pet companion:** your active pet follows you in the world and attacks after each of your moves. Its damage grows with the level of the skill it dropped from; golden pets hit 1.5× harder.
- SW cache `pulse-v25`.

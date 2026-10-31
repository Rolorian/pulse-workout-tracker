# Pulse Realm — game design

> Your body is the controller. Every strike in the world is a real rep, and every rep lands in your real training log.

## 1. Audit: what Pulse already had (and what the Realm reuses)

| System | Lives in | How the Realm uses it |
|---|---|---|
| Workout log, skills, XP and levels | `index.html` (`workouts`, `persist()`, `xpForWorkout`, `getSkillXPMap`) | Each battle logs one ordinary workout entry per exercise (notes `⚔️ Realm: …`, flag `realm: true`). Nothing is counted twice: XP, coins, quests, streaks and skills all come from that entry. |
| Coins, gems, items, gear | `loot.js` (`G.reward`, `G.addItem`, `G.stats`, `G.rollDamage`) | Bounties are paid with `G.reward`. Loot is a normal item in your bag. Damage uses your real gear Power and Crit. |
| Hero sheet, name, classes | `character.js` (`G.heroState`) | Your hero's name appears in dialogue and battle. |
| Old encounters / dungeons / world map / league | `encounters.js`, `world.js`, `rivals.js` | Unchanged. They live in the other Adventure sub-tabs; the Realm menu links to them. |
| Navigation | `nav.js` | Adventure ▸ **Realm** is the first sub-tab. The old Battle cards moved into the **Battle** (League) sub-tab. |

## 2. The vertical slice (shipped)

**Goal: one exceptional first five minutes.**

1. **Pulsehaven village.** A 30×34 tile map with houses, a dojo, a shrine arch, lanterns and a forest ring. There are five NPCs (Elder Oren, Mira, Bo the guard, Pip and Rex the dog). Wanderers move around, and chimneys smoke. Leaves drift by day and fireflies glow at night. Day and night follow your real clock, with windows and lanterns lit after dusk. A dark-fantasy colour grade and a vignette sit over everything.
2. **Movement.** Tap-to-move uses grid pathfinding (BFS), and tapping a person walks you to them and starts the conversation. An optional virtual stick is available (☰ menu ▸ Controls). Quest markers float above heads.
3. **Dialogue.** Each line has a portrait, a typewriter effect with voice blips, and tap-to-advance. Some lines offer choices.
4. **Quest: Goblins at the Gate.** Speak to Elder Oren → Bo opens the south gate → defeat the goblin → report back. A pixel tracker shows the current objective, and the reward is 250 coins, 2 gems and 2 potions.
5. **Combat.** Fights are turn-based, and every move is a real exercise:
   - Sword Strike = press-ups ×1.0
   - Heavy Smash = squats ×1.25, with screen shake
   - Quick Strike = lunges, two hits and extra crit chance
   - Iron Guard = a timed plank that blocks up to 100% of the next hit and counter-attacks
   - Potion and Retreat are also available.
   The enemy shows its next move up front (damage, taunt or idle). The enemy's turn is your rest, and a 20-second breather is suggested but never forced. A fight is about 25–50 reps: enemy HP scales with your average skill level, and gear helps a little without making fights trivial.
6. **Rep counter.**
   - Rep moves: a big +1 pad, plus Undo, Reset and Type (enter a number).
   - Timed moves: Start/Pause, ±5s and a live readout.
   - You confirm whenever you're done ("Unleash 12"). Nothing forces you to keep going.
7. **Victory.** The enemy dissolves into smoke, a VICTORY banner appears and a jingle plays. The spoils screen lists XP per exercise (from the real XP formula) and the bounty. A treasure chest opens on tap to reveal **Goblin Slayer**, a rare weapon (+12% Power, +3% Crit). It can be equipped right there, and it is drawn in the hero's hand in later battles.
8. **Defeat is gentle.** Every rep is still logged. You wake at the Elder's door with full hearts, and the goblin resets.
9. **Saved character.** Position, facing, quest stage, hearts, potions, kills and settings autosave to `localStorage['pulse-rpg-v1']`, and you resume exactly where you stood. Art, audio and fonts are precached by the service worker, so the whole thing works offline.
10. **Replay.** After the goblin, a field slime respawns every 3 hours as optional practice, with a 35% chance of a normal loot drop.

### Honest placeholders / known limits
- Hearts (20 HP) are a fixed pool. They are not yet derived from hero stats (CON/END).
- There are no building interiors yet: doors are scenery.
- The move list is fixed (press-ups, squats, lunges, plank). It does not yet adapt to the exercises you train most.
- Music: one village loop and one battle loop. Sound effects are from the pack; dialogue voices are synthesised blips.
- The battle backdrop is always the south field.

## 3. Living backlog (prioritised)

**Next (P1)**
- Moves built from *your* exercise library: pick 4 from your most-trained skills, with multipliers by category.
- Hero HP and defence from the Hero sheet (CON → hearts, END → guard strength). Class abilities as special moves.
- Interiors: Elder's house, the dojo (a daily training-dummy challenge that counts toward Daily Minimum) and your own home (rest = streak freeze display).
- Second zone, **Whisperwood**: wolves, slimes and the Goblin Chief mini-boss, gated by quest 2.
- Loot visible on the overworld sprite (helmet/armour tints). Show the equipped weapon while walking.

**Soon (P2)**
- Bestiary/journal of every enemy beaten, with total reps "spent" per monster.
- Combo system: alternate exercise types for a chain bonus. A "perfect rest" bonus for resting within ±5s of the suggestion.
- Status effects: bleed (enemy takes damage per rest second you skip), stun (heavy smash ≥20 reps).
- NPC requests tied to Hero requests and Daily Quests, so one action satisfies both.
- Fishing/skilling spots in the world that map to existing skilling pets.

**Later (P3)**
- World map travel between zones, plus dungeons rendered with the same engine (replacing the card-based dungeon runs).
- Seasonal events dressed in the world (Halloween lanterns, snow tiles).
- A cut-scene system (camera pans, emotes), the Goblin King arc, and a boss with multi-phase telegraphs.
- Optional camera/motion rep detection (always with the manual counter as the source of truth).
- A haptic rhythm for plank timers; Apple Health export of realm sessions.

## 4. Technical notes
- `rpg.js` is self-contained and exposes `G.rpgOpen/G.rpgClose/G.rpgIsOpen`. `nav.js` opens it when Adventure ▸ Realm is active and closes it on any other tab.
- Rendering:
  - A single canvas at device-pixel resolution with integer pixel scaling, so the art never blurs.
  - The ground is pre-rendered once.
  - Props and characters are depth-sorted by their feet.
  - Colour grading is a multiply pass, lights are an additive pass, then a vignette.
- Audio is WebAudio (so volume works on iOS), and music starts on the first tap.
- Test hooks: `G._rpgDebug` (talk, walk, tp, startFight), `G._rpgReps.set(n)/go()`, `G._rpgDlg()`, `G._rpgAdvance()`, `G._rpg.reset()`.

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

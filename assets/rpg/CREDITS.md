# Pulse Realm — art, audio & font credits

- **Ninja Adventure asset pack** by Pixel-boy & AAA — characters, monsters, facesets, tileset, effects, items, sound effects and music.
  Licence: CC0 1.0 (public domain). Source: https://github.com/sparklinlabs/superpowers-asset-packs (ninja-adventure) · https://pixel-boy.itch.io/ninja-adventure-asset-pack
  Music and sound effects were converted from OGG to mono MP3 so they play on iOS Safari.
- **Pixelify Sans** by Stefie Justprince — SIL Open Font License 1.1 (see OFL-PixelifySans.txt). Subset to Latin.
- **Silkscreen** by Jason Kottke — SIL Open Font License 1.1 (see OFL-Silkscreen.txt). Subset to Latin.

Also from the Ninja Adventure Godot project (same author, CC0, https://github.com/pixel-boy/NinjaAdventure): `walls.png`, `interior.png`, `ruins.png`.

Files used: all 25 character sheets and portraits (`chars/`, `face/`), all 22 monsters (`mon/`), the main tileset, effects, items, 5 music loops (village, wilds, dungeon, battle, boss) and sound effects.

## Pulse art set (default)
The default art (`chars2/`, `face2/`, `mon2/`, `env2.png`) is original work generated for Pulse by the scripts in `tools/` (`chargen.py`, `envgen.py`, `mongen.py`).
Its chunky, earthy look takes stylistic inspiration from classic MMOs; no third-party characters or art are copied.
The Ninja Adventure art remains available under ☰ ▸ Art style ▸ Classic.

## Effects: pixelfx (MIT)
The combat, status, weather and pickup effects come from [pixelfx](https://github.com/patch-gg/pixelfx):
- Copyright (c) 2026 Patch and Hugo Duprez, MIT License.
- Includes adapted work from Sprite Fusion's pixel art VFX (Hugo Duprez, MIT) and Hollow Crown (rehan-remade, MIT).

A curated subset is copied into `vendor/pixelfx/` with its LICENSE and NOTICE. It is recoloured at runtime to the Pulse palette. The Patch Pixel font is not included.

## Chiptune soundtrack
The six chiptune tracks in `chiptunes.js` are original compositions written for Pulse. They are rendered on the device with ZzFXM (Keith Clark & Frank Force, MIT) and ZzFX (Frank Force, MIT), both vendored in `vendor/`.

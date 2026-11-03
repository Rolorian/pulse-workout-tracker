// Pulse curated pixelfx bundle — effects used by Pulse Realm only.
import { createFx, createFrame, clearFrame, composite } from "./src/core/index.js";
import * as swordSlash from "./src/fx/melee/sword-slash.js";
import * as hammerSmash from "./src/fx/melee/hammer-smash.js";
import * as daggerFlurry from "./src/fx/melee/dagger-flurry.js";
import * as clawSwipe from "./src/fx/melee/claw-swipe.js";
import * as hitSpark from "./src/fx/impacts/hit-spark.js";
import * as critHit from "./src/fx/impacts/crit-hit.js";
import * as bluntHit from "./src/fx/impacts/blunt-hit.js";
import * as shieldBlock from "./src/fx/impacts/shield-block.js";
import * as groundSlam from "./src/fx/impacts/ground-slam.js";
import * as burning from "./src/fx/status/burning.js";
import * as poisoned from "./src/fx/status/poisoned.js";
import * as frozen from "./src/fx/status/frozen.js";
import * as poof from "./src/fx/spawn/poof.js";
import * as shatterDeath from "./src/fx/spawn/shatter-death.js";
import * as soulRise from "./src/fx/spawn/soul-rise.js";
import * as collectBurst from "./src/fx/pickups/collect-burst.js";
import * as rain from "./src/fx/weather/rain.js";
import * as snow from "./src/fx/weather/snow.js";
import * as heal from "./src/fx/holy/heal.js";
import * as spellCharge from "./src/fx/arcane/spell-charge.js";
import * as darkExplosion from "./src/fx/shadow/dark-explosion.js";
import * as frostNova from "./src/fx/ice/frost-nova.js";
import * as acidSplash from "./src/fx/nature/acid-splash.js";
import * as fireball from "./src/fx/fire/fireball.js";
import * as confetti from "./src/fx/ui/confetti.js";
import * as levelUp from "./src/fx/ui/level-up.js";
import * as achievement from "./src/fx/ui/achievement.js";
import * as questComplete from "./src/fx/ui/quest-complete.js";
import * as fireworkBurst from "./src/fx/explosions/firework-burst.js";
window.PFX = { createFx, createFrame, clearFrame, composite, FX: {
  swordSlash, hammerSmash, daggerFlurry, clawSwipe, hitSpark, critHit, bluntHit, shieldBlock, groundSlam,
  burning, poisoned, frozen, poof, shatterDeath, soulRise, collectBurst, rain, snow, heal, spellCharge,
  darkExplosion, frostNova, acidSplash, fireball, confetti, levelUp, achievement, questComplete, fireworkBurst } };

/**
 * Aion 2 Cheats → Tarkov Cheats (tarkov-cheats.net) rebrand.
 * Run from project root: node scripts/rebrand-tarkov.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');

const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.svg',
  '.html',
  '.webmanifest',
  '.css',
  '.toml',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);
const SKIP_FILES = new Set([
  'rebrand-fortnite.mjs',
  'rebrand-aion2.mjs',
  'rebrand-tarkov.mjs',
  'vocab-fortnite.mjs',
  'vocab-aion2.mjs',
  'vocab-tarkov.mjs',
  'fetch-fortnite-gameplay.mjs',
]);

/** Ordered longest-first brand / path / slug replacements. */
const REPLACEMENTS = [
  // Domains & brand compounds
  ['aion2cheats.net', 'tarkov-cheats.net'],
  ['Aion 2 Cheats & Hacks', 'Tarkov Cheats & Hacks'],
  ['Aion 2 cheats & hacks', 'Tarkov cheats & hacks'],
  ['Aion2Cheats', 'TarkovCheats'],
  ['Aion2cheats', 'Tarkovcheats'],
  ['aion2cheats', 'tarkovcheats'],
  ['Aion 2 Cheats', 'Tarkov Cheats'],
  ['Aion 2 cheats', 'Tarkov cheats'],
  ['aion 2 cheats', 'tarkov cheats'],

  // Product / checkout paths
  ['/products/aion-2-cheats', '/products/tarkov-cheats'],
  ['products/aion-2-cheats', 'products/tarkov-cheats'],
  ['https://zadeyo.com/products/aion-2', 'https://zadeyo.com/products/escape-from-tarkov'],
  ['%2Fproducts%2Faion-2', '%2Fproducts%2Fescape-from-tarkov'],
  ['/products/aion-2', '/products/escape-from-tarkov'],
  ['/go/aion-2/', '/go/tarkov/'],
  ['/go/aion-2', '/go/tarkov'],

  ["checkoutPath('aion2')", "checkoutPath('tarkov')"],
  ['checkoutPath("aion2")', 'checkoutPath("tarkov")'],
  ["product: 'aion2'", "product: 'tarkov'"],
  ['  aion2:', '  tarkov:'],
  ['aion2:', 'tarkov:'],
  ["'aion2'", "'tarkov'"],
  ['"aion2"', '"tarkov"'],

  // Blog / guide slugs (longest first)
  ['how-to-buy-aion-2-cheats-2026', 'how-to-buy-tarkov-cheats-2026'],
  ['how-to-use-aion-2-cheat-codes', 'how-to-use-tarkov-cheats-safely'],
  ['anticheat-bypass-aion-2-guide', 'battleye-bypass-tarkov-guide'],
  ['aion-2-skill-script-guide', 'tarkov-aimbot-combat-guide'],
  ['aion-2-aimbot-pvp-guide', 'tarkov-aimbot-raid-guide'],
  ['aion-2-training-vs-pvp', 'tarkov-offline-vs-online'],
  ['aion-2-training-tips', 'tarkov-offline-practice-tips'],
  ['aion-2-cheats-features-guide', 'tarkov-cheats-features-guide'],
  ['aion-2-hwid-spoofer-after-ban', 'tarkov-hwid-spoofer-after-ban'],
  ['aion-2-external-cheat-guide', 'tarkov-external-cheat-guide'],
  ['aion-2-stream-proof-setup', 'tarkov-stream-proof-setup'],
  ['aion-2-costume-changer-guide', 'tarkov-skin-changer-guide'],
  ['aion-2-elite-tier-guide', 'tarkov-elite-tier-guide'],
  ['aion-2-esp-wallhack-setup', 'tarkov-esp-wallhack-setup'],
  ['aion-2-radar-hack-guide', 'tarkov-radar-hack-guide'],
  ['aion-2-training-guide', 'tarkov-offline-raid-guide'],
  ['aion-2-lite-vs-pro', 'tarkov-lite-vs-pro'],
  ['anticheat-patch-day-checklist', 'battleye-patch-day-checklist'],
  ['aion-2-skill-script', 'tarkov-aimbot-combat'],
  ['aion-2-aimbot-lock', 'tarkov-aimbot-lock'],
  ['aion-2-abyss-wallhack', 'tarkov-labs-wallhack'],
  ['aion-2-instance-esp', 'tarkov-factory-esp'],
  ['aion-2-spawn-esp', 'tarkov-extract-esp'],
  ['aion-2-long-range-esp', 'tarkov-long-range-esp'],
  ['aion-2-thermal-esp', 'tarkov-thermal-esp'],
  ['aion-2-combat-esp', 'tarkov-combat-esp'],
  ['aion-2-group-esp', 'tarkov-squad-esp'],
  ['aion-2-chams-esp', 'tarkov-chams-esp'],
  ['aion-2-player-esp', 'tarkov-player-esp'],
  ['aion-2-esp-wallhack', 'tarkov-esp-wallhack'],
  ['aion-2-loot-radar', 'tarkov-loot-radar'],
  ['aion-2-radar-hack', 'tarkov-radar-hack'],
  ['aion-2-costume-changer', 'tarkov-skin-changer'],
  ['aion-2-auto-aim', 'tarkov-auto-aim'],
  ['aion-2-cheats', 'tarkov-cheats'],
  ['hero-aion-2-dark', 'hero-tarkov-dark'],

  // Anti-cheat naming → BattlEye
  ['NCSOFT anti-cheat', 'BattlEye'],
  ['ncsoft anti-cheat', 'BattlEye'],
  ['anti-cheat ban', 'BattlEye ban'],
  ['anti-cheat update', 'BattlEye update'],
  ['anti-cheat patch', 'BattlEye patch'],
  ['anti-cheat patches', 'BattlEye patches'],
  ['anti-cheat enforcement', 'BattlEye enforcement'],
  ['anti-cheat-aware', 'BattlEye-aware'],
  [' after anti-cheat', ' after BattlEye'],
  [' an anti-cheat', ' a BattlEye'],
  ['anti-cheat/', 'BattlEye/'],
  ['/anti-cheat', '/BattlEye'],
  [' anti-cheat ', ' BattlEye '],
  ['(anti-cheat)', '(BattlEye)'],
  ['"anti-cheat"', '"BattlEye"'],
  ["'anti-cheat'", "'BattlEye'"],

  // Platform / publisher
  ['Aion 2 launcher', 'Escape from Tarkov launcher'],
  ['PURPLE launcher', 'BSG launcher'],
  ['NCSOFT Terms of Service', 'Battlestate Terms of Service'],
  ['NCSOFT account', 'Battlestate account'],
  ['NCSOFT overlay', 'BSG overlay'],
  ['costume wardrobe', 'gear stash'],
  ['NCSOFT-approved', 'BSG-approved'],
  ['NCSOFT-sanctioned', 'BSG-sanctioned'],
  ['NCSOFT review', 'Battlestate review'],
  ['via the Aion 2 launcher', 'via the Escape from Tarkov launcher'],
  ['through the Aion 2 launcher', 'through the Escape from Tarkov launcher'],
  ['on NCSOFT', 'on Battlestate'],
  [' NCSOFT ', ' Battlestate '],
  ['NCSOFT,', 'Battlestate,'],
  ['NCSOFT.', 'Battlestate.'],
  ['NCSOFT)', 'Battlestate)'],
  ['(NCSOFT', '(Battlestate'],
  ['reqNcsoft', 'reqBsg'],
  ['compatNcsoft', 'compatBsg'],

  // Game name (after slugs/paths handled)
  ['Aion 2 Elite', 'Tarkov Elite'],
  ['Aion 2 PC', 'Tarkov PC'],
  ['Aion 2 online', 'Tarkov online'],
  ['Aion 2 client', 'Escape from Tarkov client'],
  ['Aion 2 and', 'Escape from Tarkov and'],
  ['Aion 2 or', 'Escape from Tarkov or'],
  ['Aion 2,', 'Escape from Tarkov,'],
  ['Aion 2.', 'Escape from Tarkov.'],
  ['Aion 2 ', 'Escape from Tarkov '],
  [' Aion 2', ' Escape from Tarkov'],
  ['Aion 2', 'Escape from Tarkov'],
  ['aion 2 ', 'tarkov '],
  [' aion 2', ' tarkov'],
  ['aion-2', 'tarkov'],
  ['aion 2', 'tarkov'],

  // Modes & MMO leftovers → Tarkov raids
  ['Open World PvP and instances', 'PMC raids and Scav runs'],
  ['Open World PvP, instances', 'PMC raids, Scav runs'],
  ['Open World PvP or instances', 'PMC raids or Scav runs'],
  ['instances and Abyss PvP', 'raids and Labs'],
  ['Abyss PvP and instances', 'Labs and Factory'],
  ['Abyss PvP or instances', 'Labs or Factory'],
  ['Abyss RvR', 'Labs'],
  ['Abyss Arena', 'The Lab'],
  ['training instance', 'offline raid'],
  ['training instances', 'offline raids'],
  ['instance preset', 'raid preset'],
  ['instance presets', 'raid presets'],
  ['instance-friendly', 'raid-friendly'],
  ['Instance fights', 'close-quarters fights'],
  ['instance fights', 'close-quarters fights'],
  ['Instance fight', 'close-quarters fight'],
  ['instance fight', 'close-quarters fight'],
  [' instances', ' raids'],
  ['Instances ', 'Raids '],
  ['Open World PvP', 'PMC raids'],
  ['open world PvP', 'PMC raids'],
  ['Training grounds', 'Offline raids'],
  ['Training ground', 'Offline raid'],
  ['private instances', 'offline raids'],
  ['private instance', 'offline raid'],
  ['Training and private', 'Offline and practice'],
  ['Training ', 'Offline '],
  [' Training', ' Offline'],
  ['training ', 'offline '],

  ['climbing Abyss rank', 'surviving high-tier loot runs'],
  ['high Abyss rank', 'high-tier loot'],
  ['live Abyss', 'live raids'],
  ['safer Abyss', 'safer raids'],
  ['for Abyss PvP', 'for live raids'],
  ['in Abyss PvP', 'in live raids'],
  ['before Abyss PvP', 'before live raids'],
  ['Abyss PvP', 'live raids'],
  [' Abyss', ' Labs'],
  ['Abyss ', 'Labs '],
  ['Abyss', 'Labs'],

  // Cosmetics / loot framing
  ['Costume and weapon appearance', 'Weapon and armor appearance'],
  ['costume and weapon appearance', 'weapon and armor appearance'],
  ['Weapon & wing', 'Weapon & armor'],
  ['wings and exclusive sets', 'armor and exclusive sets'],
  ['Costume & appearance', 'Skin & appearance'],
  ['costume and appearance', 'skin and appearance'],
  ['Costume Changer', 'Skin Changer'],
  ['costume changer', 'skin changer'],
  ['outfits, appearances and wings', 'weapons, armor and gear skins'],
  ['Costume and wing appearance', 'Weapon and armor appearance'],
  ['wing preview', 'gear preview'],
  ['drop and gather locator', 'loot and container locator'],
  ['drop and gather markers', 'loot and container markers'],
  ['drop and gather', 'loot and containers'],
  ['Drop ESP', 'Loot ESP'],
  ['drop ESP', 'loot ESP'],
  ['gather ESP', 'container ESP'],
  ['Gather ESP', 'Container ESP'],
  ['Rare drop markers', 'High-value loot markers'],
  ['Gather and treasure hints', 'Container and stash hints'],
  ['bind point', 'extract'],
  ['treasure chest', 'valuable loot'],
  ['gather nodes', 'loot containers'],
  ['gather node', 'loot container'],
  ['world drops', 'loose loot'],
  ['world-drop', 'loose-loot'],
  ['Drop / Gather ESP', 'Loot / Item ESP'],
  ['Drop / drop ESP', 'Loot / item ESP'],
  ['Farm Assist', 'Loot Assist'],
  ['farm assist', 'loot assist'],
  ['farming', 'looting'],

  // Combat framing
  ['staffs, bows, swords and guns', 'ARs, SMGs, shotguns and snipers'],
  ['staffs, bows, and guns', 'ARs, SMGs, and snipers'],
  ['staff, bow, sword and gun', 'AR, SMG, shotgun and sniper'],
  ['skill chain with sticky aim', 'AR spray with sticky aim'],
  ['per-class', 'per-weapon'],
  ['Per-class', 'Per-weapon'],
  ['class configs', 'weapon configs'],
  ['class skill profiles', 'weapon aim profiles'],
  ['weapon appearances', 'weapon skins'],
  ['Skill aim assist', 'Aimbot'],
  ['Ranged aim assist', 'Sniper aimbot'],
  ['class skill assist', 'aimbot'],
  ['Skill Assist', 'Aimbot'],
  ['skill assist', 'aimbot'],
  ['Skill Scripts', 'Aimbot Scripts'],
  ['skill automation', 'aimbot automation'],
  ['aim smoothness', 'aimbot smoothness'],
  ['aim engine', 'aimbot engine'],
  ['humanized aim assist', 'humanized aimbot'],
  ['through terrain', 'through walls'],
  ['walls and terrain', 'walls and cover'],
  ['contested zone edge', 'hotspot edge'],
  ['Zone and landmark', 'Map and landmark'],
  ['contested zone', 'hotspot'],
  ['Contested zone', 'Hotspot'],
  ['group fights', 'squad fights'],
  ['group ', 'squad '],
  ['Group ', 'Squad '],
  ['Auto Kill', 'No Recoil'],
  ['Auto Interrupt', 'Recoil Control'],
  ['Hotkey macros (heals/buffs)', 'Hotkey macros (heals/meds)'],
  ['hotkey macros for heals and flight', 'hotkey macros for heals and meds'],
  ['Target Priority', 'Bone Priority'],
  ['target priority', 'bone priority'],
  ['Labs fight', 'Labs fight'],
  ['starting zone', 'spawn'],
  ['Starting zone', 'Spawn'],
  ['Elyos vs Asmodian', 'PMC vs Scav'],
  ['Elyos / Asmodian', 'PMC / Scav'],
  ['Elyos', 'PMC'],
  ['Asmodian', 'Scav'],
  ['faction colors', 'PMC/Scav colors'],
  ['faction ESP', 'PMC ESP'],
  ['flight height cues', 'elevation cues'],
  ['flight awareness', 'extract awareness'],
  ['and flight', 'and extracts'],
  [' Flight', ' Extracts'],
  ['flight', 'extracts'],
  ['Gladiator, Ranger, Sorcerer, Assassin', 'AR, SMG, shotgun, sniper'],
  ['melee, ranged and caster classes', 'AR, SMG and DMR profiles'],
  ['flying and grounded targets', 'moving and peeking targets'],
  ['Arenas', 'Arena'],
  ['arenas', 'Arena'],
  ['safe zone', 'offline raid'],
  ['safe zones', 'offline raids'],
  ['costume', 'skin'],
  ['Costume', 'Skin'],
];

const IMAGE_RENAMES = [
  ['how-to-buy-aion-2-cheats-2026', 'how-to-buy-tarkov-cheats-2026'],
  ['how-to-use-aion-2-cheat-codes', 'how-to-use-tarkov-cheats-safely'],
  ['anticheat-bypass-aion-2-guide', 'battleye-bypass-tarkov-guide'],
  ['anticheat-patch-day-checklist', 'battleye-patch-day-checklist'],
  ['aion-2-skill-script-guide', 'tarkov-aimbot-combat-guide'],
  ['aion-2-aimbot-pvp-guide', 'tarkov-aimbot-raid-guide'],
  ['aion-2-training-vs-pvp', 'tarkov-offline-vs-online'],
  ['aion-2-training-tips', 'tarkov-offline-practice-tips'],
  ['aion-2-cheats-features-guide', 'tarkov-cheats-features-guide'],
  ['aion-2-hwid-spoofer-after-ban', 'tarkov-hwid-spoofer-after-ban'],
  ['aion-2-external-cheat-guide', 'tarkov-external-cheat-guide'],
  ['aion-2-stream-proof-setup', 'tarkov-stream-proof-setup'],
  ['aion-2-costume-changer-guide', 'tarkov-skin-changer-guide'],
  ['aion-2-elite-tier-guide', 'tarkov-elite-tier-guide'],
  ['aion-2-esp-wallhack-setup', 'tarkov-esp-wallhack-setup'],
  ['aion-2-radar-hack-guide', 'tarkov-radar-hack-guide'],
  ['aion-2-training-guide', 'tarkov-offline-raid-guide'],
  ['aion-2-lite-vs-pro', 'tarkov-lite-vs-pro'],
  ['aion-2-skill-script', 'tarkov-aimbot-combat'],
  ['aion-2-aimbot-lock', 'tarkov-aimbot-lock'],
  ['aion-2-abyss-wallhack', 'tarkov-labs-wallhack'],
  ['aion-2-instance-esp', 'tarkov-factory-esp'],
  ['aion-2-spawn-esp', 'tarkov-extract-esp'],
  ['aion-2-long-range-esp', 'tarkov-long-range-esp'],
  ['aion-2-thermal-esp', 'tarkov-thermal-esp'],
  ['aion-2-combat-esp', 'tarkov-combat-esp'],
  ['aion-2-group-esp', 'tarkov-squad-esp'],
  ['aion-2-chams-esp', 'tarkov-chams-esp'],
  ['aion-2-player-esp', 'tarkov-player-esp'],
  ['aion-2-esp-wallhack', 'tarkov-esp-wallhack'],
  ['aion-2-loot-radar', 'tarkov-loot-radar'],
  ['aion-2-radar-hack', 'tarkov-radar-hack'],
  ['aion-2-costume-changer', 'tarkov-skin-changer'],
  ['aion-2-auto-aim', 'tarkov-auto-aim'],
  ['hero-aion-2-dark', 'hero-tarkov-dark'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function applyText(content) {
  let next = content;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function renameImages() {
  const imageRoots = [
    path.join(root, 'public', 'images', 'gameplay'),
    path.join(root, 'public', 'images', 'blog'),
    path.join(root, 'public', 'images'),
  ];
  for (const dir of imageRoots) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) continue;
      for (const [from, to] of IMAGE_RENAMES) {
        if (name.startsWith(from)) {
          const dest = name.replace(from, to);
          const toPath = path.join(dir, dest);
          if (full !== toPath && !fs.existsSync(toPath)) {
            fs.renameSync(full, toPath);
            console.log('rename image', name, '→', dest);
          }
          break;
        }
      }
    }
  }
}

function renameProductDir() {
  const from = path.join(root, 'src', 'pages', 'products', 'aion-2-cheats');
  const to = path.join(root, 'src', 'pages', 'products', 'tarkov-cheats');
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    console.log('renamed product dir → tarkov-cheats');
  }
}

renameProductDir();
renameImages();

const files = walk(root).filter((f) => {
  if (SKIP_FILES.has(path.basename(f))) return false;
  return TEXT_EXTS.has(path.extname(f).toLowerCase()) || path.basename(f) === '_redirects';
});

let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);

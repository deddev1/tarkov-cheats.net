/**
 * Second-pass vocabulary: Aion/MMO leftovers → Escape from Tarkov (EFT).
 * Run after rebrand-tarkov.mjs: node scripts/vocab-tarkov.mjs
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

const REPLACEMENTS = [
  // Brand / domain leftovers
  ['aion2cheats.net', 'tarkov-cheats.net'],
  ['Aion 2', 'Escape from Tarkov'],
  ['aion-2', 'tarkov'],
  ['aion 2', 'tarkov'],
  ['NCSOFT', 'Battlestate'],
  ['PURPLE', 'BSG'],

  // Launcher phrasing
  ['launch Escape from Tarkov on Battlestate', 'launch Escape from Tarkov'],
  ['Escape from Tarkov on Battlestate', 'Escape from Tarkov'],
  ['exiting the Escape from Tarkov launcher', 'exiting the Escape from Tarkov client'],
  ['Current Escape from Tarkov client via the Escape from Tarkov launcher', 'Current Escape from Tarkov client via the official launcher'],
  ['open Escape from Tarkov settings in the Escape from Tarkov launcher', 'open Escape from Tarkov client settings'],

  // Modes
  ['PvP, raids, Labs, offline', 'PMC, Scav, Labs, offline'],
  ['BR, raids, Labs, Offline', 'PMC, Scav, Labs, offline'],

  // Wings / MMO leftovers
  ['wings', 'backpacks'],
  ['wing', 'backpack'],
  ['appearances', 'skins'],
  ['appearance ', 'skin '],
  ['Appearance ', 'Skin '],

  // Loot / map language
  ['drop locations', 'loot spawns'],
  ['drop information', 'loot information'],
  [' drops', ' loot piles'],
  [' drop ', ' loot '],
  ['Drop ', 'Loot '],
  ['zone cam', 'map cam'],
  ['zone routes', 'map routes'],
  ['zone pathing', 'map pathing'],
  ['zone markers', 'map markers'],
  [' POI', ' landmark'],
  ['POI ', 'Landmark '],
  ['flight timing', 'extract timing'],
  ['Flight Assist AI', 'Extract Assist AI'],
  ['Melee finish', 'Close-range finish'],
  ['under siege', 'under pressure'],
  ['ganks and zone control', 'third-parties and map control'],
  ['Radar & Drops', 'Radar & Loot'],
  ['gear value', 'loot value'],
  ['preset export', 'config export'],
  ['Preset favorites', 'Config favorites'],

  // Practice
  ['skill drills', 'aim drills'],
  ['skill practice', 'aim practice'],
  ['offline session', 'offline raid'],

  // Capture
  ['stream safe', 'stream-proof'],
  ['capture modes', 'OBS modes'],
  ['capture tools', 'OBS / Game Bar'],

  // Weapons
  ['skill swap', 'weapon swap'],
  ['skill label', 'weapon label'],
  ['ranged FOV', 'scoped FOV'],

  // Stealth / loot
  ['stealth alerts', 'sound alerts'],
  ['stealth information', 'audio information'],

  // Aimbot phrasing cleanup
  ['Escape from Tarkov Skill Scripts', 'Tarkov Aimbot'],
  ['humanized aimbot', 'humanized aimbot'],

  // Faction / game shorthand for SEO density
  ['Escape from Tarkov cheats', 'Escape from Tarkov cheats'],
  ['Tarkov cheats', 'Tarkov cheats'],

  // Fix doubled / awkward phrases from replace chains
  ['Escape from Tarkov Escape from Tarkov', 'Escape from Tarkov'],
  ['BattlEye BattlEye', 'BattlEye'],
  ['Labs Labs', 'Labs'],
  ['offline offline', 'offline'],
  ['Offline Offline', 'Offline'],
  ['loot loot', 'loot'],
  ['aimbot aimbot', 'aimbot'],
  ['Skin Skin', 'Skin'],
  ['skin skin', 'skin'],

  // Keep EFT acronym natural where useful in short labels
  ['Windows PC PMC raids', 'Windows PC PMC raids'],
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

let changed = 0;
for (const file of walk(root)) {
  if (SKIP_FILES.has(path.basename(file))) continue;
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file);
  if (!TEXT_EXTS.has(ext) && base !== '_redirects') continue;
  const before = fs.readFileSync(file, 'utf8');
  let next = before;
  for (const [from, to] of REPLACEMENTS) {
    if (from === to) continue;
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== before) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}
console.log(`Vocab pass done. Updated ${changed} files.`);

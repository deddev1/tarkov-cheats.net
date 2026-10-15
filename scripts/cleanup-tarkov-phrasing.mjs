import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const SKIP = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);
const EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.css',
  '.html',
  '.webmanifest',
]);
const SKIP_FILES = new Set([
  'rebrand-tarkov.mjs',
  'vocab-tarkov.mjs',
  'cleanup-tarkov-phrasing.mjs',
  'rebrand-aion2.mjs',
  'vocab-aion2.mjs',
  'rebrand-fortnite.mjs',
  'vocab-fortnite.mjs',
]);

const pairs = [
  ['skill-assist', 'aimbot'],
  ['Skill-assist', 'Aimbot'],
  ['class presets', 'weapon presets'],
  ['Class presets', 'Weapon presets'],
  ['per class', 'per weapon'],
  ['open-world PvP', 'PMC raids'],
  ['open-world', 'raid'],
  ['Open-world', 'Raid'],
  ['in lane', 'in CQB'],
  ['tight in CQB, wide in 5v5', 'tight in Factory, wide on Customs'],
  ['Farm assist', 'Loot assist'],
  ['farm assist', 'loot assist'],
  ['Flight zone bot', 'Extract radar'],
  ['gather-node', 'container'],
  ['Wing & skin', 'Armor & skin'],
  ['OBS / Game Bar', 'Game Bar'],
  ["Instances' fast pace", "Factory's fast pace"],
  ['instance and open-world', 'raid and map'],
  ['instance and raid', 'raid and map'],
  ['Instance-ready', 'Raid-ready'],
  ['an Labs', 'a Labs'],
  ['tarkov-2-console', 'tarkov-console'],
  ['How to enable the tarkov 2 console', 'How to enable the Tarkov console'],
  ['purple cheat overlay', 'tactical cheat overlay'],
  ['purple automation menu', 'tactical automation menu'],
  ["site's restrained purple and charcoal palette.", "site's amber and charcoal palette."],
  ['purple reserved for interactive emphasis', 'amber reserved for interactive emphasis'],
  ['melee, ranged and caster setups', 'AR, SMG and sniper setups'],
  ['safe-zone practice', 'offline raid practice'],
  ['Tracking that adapts per class', 'Tracking that adapts per weapon'],
  ['in one skill-assist tab', 'in one aimbot tab'],
  ['in one aimbot tab', 'in one aimbot tab'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
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
  if (!EXTS.has(ext) && base !== '_redirects') continue;
  const before = fs.readFileSync(file, 'utf8');
  let next = before;
  for (const [from, to] of pairs) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== before) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}
console.log(`Cleanup done. Updated ${changed} files.`);

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/utils/schema.ts',
  'src/utils/rss.ts',
  'src/data/faq.ts',
  'src/data/blog/posts.ts',
  'src/i18n/en.ts',
  'src/config/site.ts',
];

const reps = [
  ['TarkovCheats Editorial', 'Tarkov Cheats'],
  ['TarkovCheats Community Forum', 'Tarkov Cheats Forum'],
  ['TarkovCheats Blog', 'Tarkov Cheats Blog'],
  ['TarkovCheats Support', 'Tarkov Cheats Support'],
  ['Join TarkovCheats on Discord', 'Join Tarkov Cheats on Discord'],
  ['TarkovCheats home', 'Tarkov Cheats home'],
  ['TarkovCheats', 'Tarkov Cheats'],
  ["TITLE_PREFIX = 'Tarkov Cheats & Hacks'", "TITLE_PREFIX = 'Tarkov Cheats'"],
  ['humanized Aimbot', 'smooth aimbot'],
  ['humanized order', 'smooth order'],
  ['humanized input', 'smooth input'],
  ['humanized', 'smooth'],
  [
    'Climbing live raids with tarkov aimbot means smooth aimbot—not instant bot bursts that draw reports.',
    'Labs Escape from Tarkov aimbot works better with smooth tracking than instant snaps that get you reported.',
  ],
  [
    'maintains private tarkov cheats for Windows PC PMC raids and Scav runs—not console lobby codes. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells Tarkov cheats for Windows PC PMC raids and Scav runs. Check status before you queue after a patch.',
  ],
  [
    'maintains private tarkov cheats for Windows PC PMC raids and Scav runs. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells Tarkov cheats for Windows PC PMC raids and Scav runs. Check status before you queue after a patch.',
  ],
  [
    'maintains private tarkov cheats for Windows PC PMC raids and Scav runs. Check live status before every patch-day queue.',
    'sells Tarkov cheats for Windows PC PMC raids and Scav runs. Check status before you queue after a patch.',
  ],
  [
    'maintains private tarkov cheats for Windows PC PMC raids and Scav runs.',
    'sells Tarkov cheats for Windows PC PMC raids and Scav runs.',
  ],
  [
    'ships a modular external suite for Windows PC live raids—not lobby cheat codes. Aimbot tracks targets, loot assist clears zones, ESP wallhack exposes hostile players, and utility tools like Radar Hack and Skin Changer round out the toolkit. This is the complete feature map across',
    'sells external Tarkov cheats for PC Labs. Aimbot, loot assist, ESP wallhack, radar and Skin Changer. See',
  ],
];

for (const rel of files) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', rel);
  } else {
    console.log('noop', rel);
  }
}

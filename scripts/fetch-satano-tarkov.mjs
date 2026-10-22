/**
 * Fetch Escape from Tarkov cheat screenshots from Wh-Satano CDN
 * and replace all public/images/gameplay + blog PNGs with Tarkov-only assets.
 *
 * Run: node scripts/fetch-satano-tarkov.mjs && npm run optimize:images
 */
import { writeFile, mkdir } from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const CDN = 'https://cdn.wh-satano.ru';
const gameplayDir = path.resolve('public/images/gameplay');
const blogDir = path.resolve('public/images/blog');
const imagesDir = path.resolve('public/images');

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
  Referer: 'https://wh-satano.ru/en/cheats/escape_from_tarkov',
};

/** Full-resolution Satano EFT gallery shots (CDN, not thumbnails). */
const SOURCES = {
  hero: `${CDN}/eftauths7.webp`,
  authorityMenu: `${CDN}/authority-eft-arena-menu.webp`,
  covcheg1: `${CDN}/covcheg-eft-s1.webp`,
  covcheg2: `${CDN}/covcheg-eft-s2.webp`,
  covcheg3: `${CDN}/covcheg-eft-s3.webp`,
  covcheg4: `${CDN}/covcheg-eft-s4.webp`,
  covcheg5: `${CDN}/covcheg-eft-s5.webp`,
  covcheg6: `${CDN}/covcheg-eft-s6.webp`,
  mason1: `${CDN}/mason-eft-s1.webp`,
  mason2: `${CDN}/mason-eft-s2.webp`,
  mason3: `${CDN}/mason-eft-s3.webp`,
  mason4: `${CDN}/mason-eft-s4.webp`,
  mason5: `${CDN}/mason-eft-s5.webp`,
  mason6: `${CDN}/mason-eft-s6.webp`,
  ancient1: `${CDN}/ancient_eft_s1.webp`,
  ancient2: `${CDN}/ancient_eft_s2.webp`,
  ancient3: `${CDN}/ancient_eft_s3.webp`,
  ancient4: `${CDN}/ancient_eft_s4.webp`,
  chams1: `${CDN}/eft_chams1.webp`,
  chams2: `${CDN}/eft_chams2.webp`,
  chams3: `${CDN}/eft_chams3.webp`,
  chams4: `${CDN}/eft_chams4.webp`,
  chams5: `${CDN}/eft_chams5.webp`,
  chams6: `${CDN}/eft_chams6.webp`,
  chams7: `${CDN}/eft_chams7.webp`,
  fecurity1: `${CDN}/fecefts1.webp`,
  fecurity2: `${CDN}/fecefts2.webp`,
  fecurity3: `${CDN}/fecefts3.webp`,
  fecurity4: `${CDN}/fecefts4.webp`,
  fecurity5: `${CDN}/fecefts5.webp`,
  radar1: `${CDN}/eft_radar_s1.webp`,
  radar2: `${CDN}/eft_radar_s2.webp`,
  radar3: `${CDN}/eft_radar_s3.webp`,
  radar4: `${CDN}/eft_radar_s4.webp`,
  radar5: `${CDN}/eft_radar_s5.webp`,
  radar6: `${CDN}/eft_radar_s6.webp`,
};

/**
 * Gameplay assets used by hero slider + product galleries.
 * Keywords: Tarkov ESP, wallhack, aimbot, loot ESP, radar, Labs, Factory, extract.
 */
const GAMEPLAY = [
  {
    file: 'tarkov-esp-wallhack.png',
    source: 'covcheg2',
    alt: 'Escape from Tarkov ESP wallhack showing PMC boxes distance and health through walls in a live raid',
    caption: 'ESP wallhack',
    captionDesc: 'Player ESP with boxes, distance and health through cover.',
  },
  {
    file: 'tarkov-aimbot-combat.png',
    source: 'mason2',
    alt: 'Escape from Tarkov aimbot combat overlay with FOV circle bone priority and sticky aim during a firefight',
    caption: 'Aimbot combat',
    captionDesc: 'Humanized aimbot with FOV and bone priority for AR fights.',
  },
  {
    file: 'tarkov-aimbot-lock.png',
    source: 'mason1',
    alt: 'Escape from Tarkov aimbot lock targeting a PMC thorax with silent aim and prediction enabled',
    caption: 'Aimbot lock',
    captionDesc: 'Aim lock engaged on a peeking PMC in CQB.',
  },
  {
    file: 'tarkov-auto-aim.png',
    source: 'mason3',
    alt: 'Escape from Tarkov auto aim assist tracking a moving Scav while loot ESP markers stay visible',
    caption: 'Auto aim',
    captionDesc: 'Sticky auto aim through mid-range sprays.',
  },
  {
    file: 'tarkov-player-esp.png',
    source: 'chams1',
    alt: 'Escape from Tarkov player ESP highlighting PMC and Scav skeletons with HP bars across Customs',
    caption: 'Player ESP',
    captionDesc: 'PMC / Scav ESP with skeletons and health bars.',
  },
  {
    file: 'tarkov-chams-esp.png',
    source: 'chams3',
    alt: 'Escape from Tarkov chams ESP with colored player models visible through walls and floors',
    caption: 'Chams ESP',
    captionDesc: 'Colored chams for fast target reads through terrain.',
  },
  {
    file: 'tarkov-combat-esp.png',
    source: 'fecurity2',
    alt: 'Escape from Tarkov combat ESP during a close-quarters Factory fight with enemy distance readouts',
    caption: 'Combat ESP',
    captionDesc: 'Combat-ready ESP layout for Factory CQB.',
  },
  {
    file: 'tarkov-radar-hack.png',
    source: 'radar1',
    alt: 'Escape from Tarkov radar hack mini-map with enemy dots extract markers and hotspot awareness',
    caption: 'Radar hack',
    captionDesc: '2D mini-radar for nearby PMCs, Scavs and extracts.',
  },
  {
    file: 'tarkov-loot-radar.png',
    source: 'covcheg4',
    alt: 'Escape from Tarkov loot ESP and loot radar highlighting high-value items containers and corpses',
    caption: 'Loot radar',
    captionDesc: 'Item and container ESP with high-value loot filters.',
  },
  {
    file: 'tarkov-skin-changer.png',
    source: 'ancient2',
    alt: 'Escape from Tarkov skin changer preview for weapons and armor skins on the local client only',
    caption: 'Skin changer',
    captionDesc: 'Local weapon and armor skin preview.',
  },
  {
    file: 'tarkov-thermal-esp.png',
    source: 'chams5',
    alt: 'Escape from Tarkov thermal ESP highlighting players in low-light Labs corridors',
    caption: 'Thermal ESP',
    captionDesc: 'Thermal-style player highlights for night and dark maps.',
  },
  {
    file: 'tarkov-factory-esp.png',
    source: 'fecurity1',
    alt: 'Escape from Tarkov Factory ESP wallhack showing stacked PMCs through walls in close-quarters',
    caption: 'Factory ESP',
    captionDesc: 'CQB ESP layout tuned for Factory raids.',
  },
  {
    file: 'tarkov-labs-wallhack.png',
    source: 'covcheg1',
    alt: 'Escape from Tarkov Labs wallhack revealing players key rooms and loot through The Lab walls',
    caption: 'Labs wallhack',
    captionDesc: 'Labs-ready ESP for key rooms and stacked teams.',
  },
  {
    file: 'tarkov-extract-esp.png',
    source: 'radar3',
    alt: 'Escape from Tarkov extract ESP marking exits spawn pressure and nearby players before extract',
    caption: 'Extract ESP',
    captionDesc: 'Extract markers and spawn-side awareness before you commit.',
  },
  {
    file: 'tarkov-long-range-esp.png',
    source: 'ancient1',
    alt: 'Escape from Tarkov long-range ESP tracking distant PMCs across Woods and open fields',
    caption: 'Long-range ESP',
    captionDesc: 'Extended distance ESP for Woods and open maps.',
  },
  {
    file: 'tarkov-squad-esp.png',
    source: 'mason4',
    alt: 'Escape from Tarkov squad ESP showing multiple PMC teammates and enemy groups with distance labels',
    caption: 'Squad ESP',
    captionDesc: 'Multi-player ESP for squad fights and third parties.',
  },
];

/**
 * Blog cover images — each tied to a Satano shot + SEO filename/keyword.
 */
const BLOG = [
  { file: 'tarkov-esp-wallhack-setup.png', source: 'covcheg3' },
  { file: 'tarkov-aimbot-raid-guide.png', source: 'mason5' },
  { file: 'tarkov-aimbot-combat-guide.png', source: 'mason6' },
  { file: 'tarkov-radar-hack-guide.png', source: 'radar2' },
  { file: 'tarkov-cheats-features-guide.png', source: 'authorityMenu' },
  { file: 'tarkov-lite-vs-pro.png', source: 'fecurity3' },
  { file: 'tarkov-elite-tier-guide.png', source: 'covcheg5' },
  { file: 'tarkov-hwid-spoofer-after-ban.png', source: 'ancient3' },
  { file: 'how-to-buy-tarkov-cheats-2026.png', source: 'hero' },
  { file: 'battleye-patch-day-checklist.png', source: 'radar4' },
  { file: 'battleye-bypass-tarkov-guide.png', source: 'fecurity4' },
  { file: 'tarkov-external-cheat-guide.png', source: 'chams2' },
  { file: 'tarkov-stream-proof-setup.png', source: 'chams4' },
  { file: 'tarkov-skin-changer-guide.png', source: 'ancient4' },
  { file: 'tarkov-offline-raid-guide.png', source: 'radar5' },
  { file: 'tarkov-offline-practice-tips.png', source: 'radar6' },
  { file: 'tarkov-offline-vs-online.png', source: 'fecurity5' },
  { file: 'how-to-use-tarkov-cheats-safely.png', source: 'covcheg6' },
];

const cache = new Map();

async function fetchBuffer(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  cache.set(url, buf);
  console.log('fetched', url, `${(buf.length / 1024).toFixed(0)} KB`);
  return buf;
}

async function toPng(input, width = 1280) {
  return sharp(input).rotate().resize({ width, withoutEnlargement: true }).png({ compressionLevel: 8 }).toBuffer();
}

async function savePng(dir, file, sourceKey) {
  const url = SOURCES[sourceKey];
  if (!url) throw new Error(`Unknown source key: ${sourceKey}`);
  const raw = await fetchBuffer(url);
  const png = await toPng(raw);
  await writeFile(path.join(dir, file), png);
  console.log('saved', file);
  return png;
}

await mkdir(gameplayDir, { recursive: true });
await mkdir(blogDir, { recursive: true });

// Remove stale webp variants so optimize-images regenerates from new PNGs.
for (const dir of [gameplayDir, blogDir]) {
  for (const name of fs.readdirSync(dir)) {
    if (/-(\d+)\.webp$/i.test(name)) {
      fs.unlinkSync(path.join(dir, name));
    }
  }
}

let heroPng = null;
for (const asset of GAMEPLAY) {
  try {
    const png = await savePng(gameplayDir, asset.file, asset.source);
    if (asset.file === 'tarkov-esp-wallhack.png') heroPng = png;
  } catch (err) {
    console.warn('skip gameplay', asset.file, err.message);
  }
}

for (const asset of BLOG) {
  try {
    await savePng(blogDir, asset.file, asset.source);
  } catch (err) {
    console.warn('skip blog', asset.file, err.message);
  }
}

// Hero background + brand favicons from ESP wallhack shot
if (heroPng) {
  const darkHero = await sharp(heroPng)
    .resize(1920, 1080, { fit: 'cover' })
    .modulate({ brightness: 0.55, saturation: 0.75 })
    .jpeg({ quality: 82 })
    .toBuffer();
  await writeFile(path.join(imagesDir, 'hero-tarkov-dark.jpg'), darkHero);
  const darkWebp = await sharp(darkHero).webp({ quality: 78 }).toBuffer();
  await writeFile(path.join(imagesDir, 'hero-tarkov-dark.webp'), darkWebp);
  console.log('saved hero-tarkov-dark.jpg/.webp');

  const logo = await sharp(heroPng).resize(512, 512, { fit: 'cover' }).png().toBuffer();
  for (const { name, size } of [
    { name: 'favicon-16.png', size: 16 },
    { name: 'favicon-32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-512.png', size: 512 },
  ]) {
    const out = await sharp(logo).resize(size, size).png().toBuffer();
    await writeFile(path.join('public', name), out);
  }
  console.log('updated favicons from Tarkov ESP shot');
}

const alts = {
  gameplay: GAMEPLAY.map(({ file, alt, caption, captionDesc }) => ({
    file,
    alt,
    caption,
    captionDesc,
    source: 'wh-satano.ru Escape from Tarkov gallery',
  })),
  blog: BLOG.map(({ file, source }) => ({
    file,
    sourceKey: source,
    sourceUrl: SOURCES[source],
    note: 'Escape from Tarkov cheat screenshot from Wh-Satano',
  })),
};

await writeFile(
  path.resolve('scripts/gameplay-image-alts.json'),
  JSON.stringify(alts, null, 2),
  'utf8',
);

console.log(`\nDone. Gameplay=${GAMEPLAY.length} Blog=${BLOG.length} unique CDN fetches=${cache.size}`);
console.log('Next: npm run optimize:images');

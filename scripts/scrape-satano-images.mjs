/**
 * Scrape Escape from Tarkov screenshot URLs from Wh-Satano product pages.
 */
const PAGES = [
  'https://wh-satano.ru/en/cheats/escape_from_tarkov',
  'https://wh-satano.ru/en/cheats/escape_from_tarkov/covcheg',
  'https://wh-satano.ru/en/cheats/escape_from_tarkov/mason',
  'https://wh-satano.ru/en/cheats/escape_from_tarkov/ancient',
  'https://wh-satano.ru/en/cheats/escape_from_tarkov/chams',
  'https://wh-satano.ru/en/cheats/escape_from_tarkov/fecurity',
  'https://wh-satano.ru/en/cheats/escape_from_tarkov/radar',
  'https://wh-software.com/cheats/escape_from_tarkov/index.html',
  'https://wh-software.com/cheats/escape_from_tarkov/covcheg.html',
  'https://wh-software.com/cheats/escape_from_tarkov/mason.html',
];

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-US,en;q=0.9',
};

function absolutize(base, src) {
  try {
    return new URL(src, base).href;
  } catch {
    return null;
  }
}

function collect(html, base) {
  const found = new Set();
  const patterns = [
    /(?:src|data-src|data-lazy-src|href|content)=["']([^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi,
    /url\((['"]?)([^)'"]+\.(?:jpg|jpeg|png|webp)(?:\?[^)'"]*)?)\1\)/gi,
    /https?:\/\/[^"'\\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\\s>]*)?/gi,
  ];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      const raw = m[2] || m[1] || m[0];
      const abs = absolutize(base, raw.replace(/^["']|["']$/g, ''));
      if (!abs) continue;
      if (/logo|favicon|sprite|icon|flag|payment|visa|mastercard|svg/i.test(abs)) continue;
      found.add(abs.split('#')[0]);
    }
  }
  return [...found];
}

const all = new Map();
for (const url of PAGES) {
  try {
    const res = await fetch(url, { headers, redirect: 'follow' });
    const html = await res.text();
    const imgs = collect(html, url);
    console.log(`\n=== ${url} (${res.status}) imgs=${imgs.length}`);
    for (const img of imgs) {
      console.log(' ', img);
      if (!all.has(img)) all.set(img, url);
    }
  } catch (err) {
    console.log(`\n=== ${url} ERR ${err.message}`);
  }
}

console.log(`\nTOTAL unique images: ${all.size}`);

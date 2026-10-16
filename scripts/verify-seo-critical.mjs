import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const checks = [];

function ok(label, pass, detail = '') {
  checks.push({ label, pass, detail });
  console.log(`${pass ? 'OK ' : 'BAD'}  ${label}${detail ? ` — ${detail}` : ''}`);
}

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
ok('Home OG image is 1200x630 asset', home.includes('/images/og-default.jpg') && home.includes('content="1200"') && home.includes('content="630"'));
ok('Org logo uses PNG', home.includes('/favicon-512.png'));

const elite = fs.readFileSync(path.join(dist, 'products/tarkov-cheats/elite/index.html'), 'utf8');
const ld = elite.match(/application\/ld\+json">([^<]+)</)?.[1];
const graph = ld ? JSON.parse(ld) : null;
const product = Array.isArray(graph['@graph'])
  ? graph['@graph'].find((n) => n['@type'] === 'Product')
  : graph?.['@type'] === 'Product'
    ? graph
    : graph?.['@graph']?.[0];
// JsonLd may wrap differently — search raw
ok('Product JSON-LD includes price', elite.includes('"price"') && /"price":"35\.00"/.test(elite), elite.match(/"price":"[^"]+"/)?.[0] ?? 'missing');
ok('Product offer URL is on-site product page', /"offers":\{[^}]*"url":"https:\/\/tarkov-cheats\.net\/products\/tarkov-cheats\/elite\/"/.test(elite));

const forum = fs.readFileSync(path.join(dist, 'forum/how-do-lite-and-pro-differ/index.html'), 'utf8');
const fDesc = forum.match(/name="description" content="([^"]+)"/)?.[1] ?? '';
ok('Forum meta description length 120–160', fDesc.length >= 120 && fDesc.length <= 165, `D${fDesc.length}`);

const productsXml = fs.readFileSync(path.join(dist, 'sitemap-products.xml'), 'utf8');
ok('Sitemap excludes legacy fortnite/aion/dota product URLs', !/fortnite|aion-2|dota-2/.test(productsXml));

ok(
  'Broken lite/pro product URLs are redirected (Astro redirect stubs)',
  fs.existsSync(path.join(dist, 'products/tarkov-cheats/lite/index.html')) ||
    fs.readFileSync('astro.config.mjs', 'utf8').includes("'/products/tarkov-cheats/lite/'"),
);
ok(
  'Blog no longer links to missing /lite/ or /pro/ product pages',
  !fs.readFileSync('src/data/blog/posts.ts', 'utf8').includes('/products/tarkov-cheats/lite/') &&
    !fs.readFileSync('src/data/blog/posts.ts', 'utf8').includes('/products/tarkov-cheats/pro/'),
);

const failed = checks.filter((c) => !c.pass).length;
console.log(failed ? `\n${failed} critical check(s) failed.` : `\nAll ${checks.length} critical checks passed.`);
process.exit(failed ? 1 : 0);

import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const checks = [];

function ok(label, pass, detail = '') {
  checks.push({ label, pass, detail });
  console.log(`${pass ? 'OK ' : 'BAD'}  ${label}${detail ? ` — ${detail}` : ''}`);
}

if (!fs.existsSync(dist)) {
  console.error('Missing dist/. Run npm run build first.');
  process.exit(1);
}

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
ok('Home OG image is 1200x630 asset', home.includes('/images/og-default.jpg') && home.includes('content="1200"') && home.includes('content="630"'));
ok('Org logo uses PNG', home.includes('/favicon-512.png'));
ok('Home title drops undetected claim', !/undetected/i.test(home.match(/<title>([^<]+)<\/title>/)?.[1] ?? ''));
ok('Organization sameAs includes Discord', /"sameAs":\s*\[[^\]]*discord\.com\/invite/i.test(home));

const elite = fs.readFileSync(path.join(dist, 'products/tarkov-cheats/elite/index.html'), 'utf8');
ok('Product JSON-LD includes price', elite.includes('"price"') && /"price":"35\.00"/.test(elite), elite.match(/"price":"[^"]+"/)?.[0] ?? 'missing');
ok('Product offer URL is on-site product page', /"offers":\{[^}]*"url":"https:\/\/tarkov-cheats\.net\/products\/tarkov-cheats\/elite\/"/.test(elite));
ok(
  'Product schema name is product name not SEO title',
  /"@type":"Product"[^}]*"name":"Elite"/.test(elite) || /"name":"Elite"/.test(elite),
  elite.match(/"@type":"Product"[^,]*,"name":"[^"]+"/)?.[0] ?? 'check name',
);

const forumIndex = fs.readFileSync(path.join(dist, 'forum/index.html'), 'utf8');
ok('Forum index is noindex', /name="robots" content="noindex/.test(forumIndex));

const forumThread = path.join(dist, 'forum/how-do-lite-and-pro-differ/index.html');
if (fs.existsSync(forumThread)) {
  const forum = fs.readFileSync(forumThread, 'utf8');
  ok('Forum thread is noindex', /name="robots" content="noindex/.test(forum));
  const fDesc = forum.match(/name="description" content="([^"]+)"/)?.[1] ?? '';
  ok('Forum meta description length 120–160', fDesc.length >= 120 && fDesc.length <= 165, `D${fDesc.length}`);
}

const sitemapIndex = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
ok('sitemap.xml is a sitemapindex', sitemapIndex.includes('<sitemapindex'));
const childLocs = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(
  'sitemapindex lists section children',
  childLocs.some((u) => u.includes('sitemap-pages.xml')) &&
    childLocs.some((u) => u.includes('sitemap-products.xml')) &&
    childLocs.some((u) => u.includes('sitemap-blog.xml')),
  childLocs.join(', '),
);
ok('sitemapindex excludes forum sitemap', !childLocs.some((u) => u.includes('sitemap-forum')));

const productsXml = fs.readFileSync(path.join(dist, 'sitemap-products.xml'), 'utf8');
ok('Sitemap excludes legacy fortnite/aion/dota product URLs', !/fortnite|aion-2|dota-2/.test(productsXml));
ok('Sitemap excludes lite/pro product URLs', !/tarkov-cheats\/(lite|pro)\//.test(productsXml));

const blogXml = fs.readFileSync(path.join(dist, 'sitemap-blog.xml'), 'utf8');
ok('Sitemap keeps offline raid guide winner', blogXml.includes('/blog/tarkov-offline-raid-guide/'));
ok(
  'Sitemap drops merged offline losers',
  !blogXml.includes('/blog/tarkov-offline-practice-tips/') &&
    !blogXml.includes('/blog/tarkov-offline-vs-online/') &&
    !blogXml.includes('/blog/how-to-use-tarkov-cheats-safely/'),
);

if (fs.existsSync(path.join(dist, 'sitemap-forum.xml'))) {
  const forumXml = fs.readFileSync(path.join(dist, 'sitemap-forum.xml'), 'utf8');
  ok('Forum sitemap absent or empty', !forumXml.includes('<url>'));
} else {
  ok('Forum sitemap file omitted', true);
}

const redirectsSrc = [
  fs.readFileSync('astro.config.mjs', 'utf8'),
  fs.readFileSync('public/_redirects', 'utf8'),
  fs.readFileSync('scripts/redirects.mjs', 'utf8'),
].join('\n');
ok(
  'Broken lite/pro product URLs are redirected',
  redirectsSrc.includes('/products/tarkov-cheats/lite') &&
    redirectsSrc.includes('/products/tarkov-cheats/pro'),
);
ok(
  'Merged offline posts redirect to winner',
  redirectsSrc.includes('/blog/tarkov-offline-practice-tips') &&
    redirectsSrc.includes('/blog/tarkov-offline-vs-online') &&
    redirectsSrc.includes('/blog/how-to-use-tarkov-cheats-safely'),
);
ok(
  'Blog no longer links to missing /lite/ or /pro/ product pages',
  !fs.readFileSync('src/data/blog/posts.ts', 'utf8').includes('/products/tarkov-cheats/lite/') &&
    !fs.readFileSync('src/data/blog/posts.ts', 'utf8').includes('/products/tarkov-cheats/pro/'),
);

const failed = checks.filter((c) => !c.pass).length;
console.log(failed ? `\n${failed} critical check(s) failed.` : `\nAll ${checks.length} critical checks passed.`);
console.log(
  '\nPost-deploy smoke (optional): curl -sI https://tarkov-cheats.net/sitemap.xml | head -n 1  # expect HTTP/2 200',
);
process.exit(failed ? 1 : 0);

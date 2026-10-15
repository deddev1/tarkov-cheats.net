/**
 * Audit PAGE_SEO title/description lengths for Google SERP display.
 * Run: node scripts/audit-seo.mjs
 */
import { createRequire } from 'node:module';

// pageSeo is TypeScript — evaluate lengths from the compiled source via dynamic import of the .ts through a simple parse.
import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('src/config/pageSeo.ts');
const src = fs.readFileSync(file, 'utf8');

const entries = [...src.matchAll(/'(\/[^']*)':\s*\{\s*title:\s*'((?:\\'|[^'])*)',\s*description:\s*\n?\s*'((?:\\'|[^'])*)'/gs)];

if (entries.length === 0) {
  // Fallback: looser multiline match
  const blocks = [...src.matchAll(/'(\/[^']+)':\s*\{([^}]+)\}/g)];
  let fail = 0;
  for (const [, route, body] of blocks) {
    const title = body.match(/title:\s*'([^']+)'/)?.[1];
    const desc = body.match(/description:\s*\n?\s*'([^']+)'/)?.[1];
    if (!title || !desc) continue;
    const tOk = title.length >= 40 && title.length <= 62;
    const dOk = desc.length >= 120 && desc.length <= 165;
    const mark = tOk && dOk ? 'OK ' : 'BAD';
    if (!(tOk && dOk)) fail++;
    console.log(`${mark}  T${title.length} D${desc.length}  ${route}`);
    console.log(`      ${title}`);
  }
  console.log(fail ? `\n${fail} entries outside ideal ranges.` : '\nAll entries within ideal ranges.');
  process.exit(fail ? 1 : 0);
}

let fail = 0;
for (const [, route, title, desc] of entries) {
  const tOk = title.length >= 40 && title.length <= 62;
  const dOk = desc.length >= 120 && desc.length <= 165;
  const mark = tOk && dOk ? 'OK ' : 'BAD';
  if (!(tOk && dOk)) fail++;
  console.log(`${mark}  T${String(title.length).padStart(2)} D${String(desc.length).padStart(3)}  ${route}`);
}
console.log(fail ? `\n${fail} entries outside ideal ranges.` : `\nAll ${entries.length} entries within ideal ranges.`);
process.exit(fail ? 1 : 0);

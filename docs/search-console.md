# Search Console workflow (tarkov-cheats.net)

You verify the domain at your DNS provider—no HTML meta tags in the repo.

## Setup (once)

1. Open [Google Search Console](https://search.google.com/search-console) and add the **domain** property for `tarkov-cheats.net` if it is not already there.
2. Under **Sitemaps**, submit the index first (required):
   - `https://tarkov-cheats.net/sitemap.xml`
3. Optional — submit child sitemaps too (same URLs, clearer GSC status per section):
   - `https://tarkov-cheats.net/sitemap-pages.xml`
   - `https://tarkov-cheats.net/sitemap-products.xml`
   - `https://tarkov-cheats.net/sitemap-blog.xml`
   - `https://tarkov-cheats.net/sitemap-forum.xml`
4. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) if you use Bing.

## Monthly tune (15 minutes)

1. Search Console → **Performance** → **Search results**.
2. Sort by **Impressions** (last 28 days).
3. For each query that already maps to a page on your site, open the matching path in [`src/config/pageSeo.ts`](../src/config/pageSeo.ts).
4. Adjust `title` and `description` so the primary query appears naturally in the title (keep under ~60 characters for the title where possible).
5. Deploy. Allow 1–2 weeks before judging click-through changes.

## Path cheat sheet

| Common query intent | Edit path in `pageSeo.ts` |
| ------------------- | ------------------------- |
| tarkov cheats / EFT cheats (broad) | `/` |
| buy tarkov cheats / products | `/products/tarkov-cheats/` |
| elite / aimbot + loot assist | `/products/tarkov-cheats/elite/` |
| lite vs pro comparison | `/blog/tarkov-lite-vs-pro/` |
| hwid spoofer | `/products/tarkov-cheats/hwid-spoofer/` |
| skin changer | `/products/tarkov-cheats/unlock-all/` |
| ESP wallhack / aimbot guides | `/blog/…` entries in `pageSeo.ts` |
| purchase / refund | `/terms/`, `/support/` |

Product and blog pages prefer `PAGE_SEO` when an entry exists; otherwise they fall back to product/blog content titles.

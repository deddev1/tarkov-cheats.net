/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/tarkov-cheats/'],
  ['/cheats/', '/products/tarkov-cheats/'],
  ['/cheats/lite', '/products/tarkov-cheats/'],
  ['/cheats/lite/', '/products/tarkov-cheats/'],
  ['/cheats/pro', '/products/tarkov-cheats/'],
  ['/cheats/pro/', '/products/tarkov-cheats/'],
  ['/cheats/elite', '/products/tarkov-cheats/elite/'],
  ['/cheats/elite/', '/products/tarkov-cheats/elite/'],
  ['/cheats/compare', '/blog/tarkov-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/tarkov-lite-vs-pro/'],
  ['/products/tarkov-cheats/utilities', '/products/tarkov-cheats/utilities/'],
  ['/products/tarkov-cheats', '/products/tarkov-cheats/'],
  ['/products/tarkov-cheats/lite', '/products/tarkov-cheats/'],
  ['/products/tarkov-cheats/lite/', '/products/tarkov-cheats/'],
  ['/products/tarkov-cheats/pro', '/products/tarkov-cheats/'],
  ['/products/tarkov-cheats/pro/', '/products/tarkov-cheats/'],
  ['/products/tarkov-cheats/account-recovery', '/products/tarkov-cheats/ugc/'],
  ['/products/tarkov-cheats/account-recovery/', '/products/tarkov-cheats/ugc/'],
  ['/products/dota-2-cheats', '/products/tarkov-cheats/'],
  ['/products/dota-2-cheats/', '/products/tarkov-cheats/'],
  ['/products/dota-2-cheats/elite', '/products/tarkov-cheats/elite/'],
  ['/products/dota-2-cheats/elite/', '/products/tarkov-cheats/elite/'],
  ['/products/dota-2-cheats/utilities', '/products/tarkov-cheats/utilities/'],
  ['/products/dota-2-cheats/utilities/', '/products/tarkov-cheats/utilities/'],
  ['/products/fortnite-cheats', '/products/tarkov-cheats/'],
  ['/products/fortnite-cheats/', '/products/tarkov-cheats/'],
  ['/products/fortnite-cheats/elite', '/products/tarkov-cheats/elite/'],
  ['/products/fortnite-cheats/elite/', '/products/tarkov-cheats/elite/'],
  ['/products/fortnite-cheats/utilities', '/products/tarkov-cheats/utilities/'],
  ['/products/fortnite-cheats/utilities/', '/products/tarkov-cheats/utilities/'],
  ['/go/fortnite', '/go/tarkov/'],
  ['/go/fortnite/', '/go/tarkov/'],
  ['/blog/tarkov-offline-practice-tips', '/blog/tarkov-offline-raid-guide/'],
  ['/blog/tarkov-offline-practice-tips/', '/blog/tarkov-offline-raid-guide/'],
  ['/blog/tarkov-offline-vs-online', '/blog/tarkov-offline-raid-guide/'],
  ['/blog/tarkov-offline-vs-online/', '/blog/tarkov-offline-raid-guide/'],
  ['/blog/how-to-use-tarkov-cheats-safely', '/blog/tarkov-offline-raid-guide/'],
  ['/blog/how-to-use-tarkov-cheats-safely/', '/blog/tarkov-offline-raid-guide/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}

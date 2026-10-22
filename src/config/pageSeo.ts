/**
 * Central titles/descriptions for SEO routes on https://tarkov-cheats.net
 * Titles: ~50–60 characters. Descriptions: ~150–160 characters.
 * Primary keywords: Tarkov cheats, Escape from Tarkov, ESP, aimbot, loot ESP, BattlEye.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Tarkov Cheats | ESP, Aimbot & HWID for EFT',
    description:
      'Buy Escape from Tarkov cheats for PC. Player ESP, wallhack, loot ESP, radar, aimbot and HWID spoofer for PMC raids, Labs and Factory. BattlEye status-checked.',
  },
  '/products/tarkov-cheats/': {
    title: 'Buy Tarkov Cheats | Elite, HWID & Skin Changer',
    description:
      'Shop Escape from Tarkov cheat tiers on tarkov-cheats.net—Elite ESP & aimbot, HWID spoofer, UGC recovery and skin changer for Customs, Labs, Factory and Arena.',
  },
  '/products/tarkov-cheats/elite/': {
    title: 'Tarkov Elite Cheats | ESP, Aimbot & Loot Assist',
    description:
      'Tarkov Elite cheats with player ESP wallhack, aimbot, loot ESP, no recoil, skin changer and priority BattlEye updates for live PMC raids on Windows PC.',
  },
  '/products/tarkov-cheats/utilities/': {
    title: 'Tarkov Utilities | HWID Spoofer & Skin Changer',
    description:
      'Escape from Tarkov utilities: HWID spoofer after hardware bans, UGC for Battlestate and BattlEye appeals, plus local skin changer / Unlock All.',
  },
  '/products/tarkov-cheats/hwid-spoofer/': {
    title: 'Tarkov HWID Spoofer | After BattlEye Hardware Ban',
    description:
      'Escape from Tarkov HWID spoofer for disk, MAC and GPU IDs after a hardware ban. Portal setup guide, compatibility scan and Discord support on PC.',
  },
  '/products/tarkov-cheats/ugc/': {
    title: 'Tarkov UGC | BattlEye Ban Appeal & Recovery',
    description:
      'UGC appeal tools for Escape from Tarkov Battlestate restrictions and BattlEye bans—case docs, dispute workflows and status tracking via Discord.',
  },
  '/products/tarkov-cheats/unlock-all/': {
    title: 'Tarkov Skin Changer | Unlock All Cosmetics',
    description:
      'Local Escape from Tarkov skin changer / Unlock All for weapons, armor and gear previews. Client-only cosmetics—does not change Battlestate store purchases.',
  },
  '/blog/': {
    title: 'Tarkov Cheats Guides | ESP, Aimbot & BattlEye',
    description:
      'Escape from Tarkov cheat guides: ESP wallhack setup, loot ESP, aimbot raid presets, Lite vs Pro, HWID spoofer and BattlEye patch-day checklists for PC.',
  },
  '/forum/': {
    title: 'Tarkov Cheats Forum | EFT ESP & Setup Help',
    description:
      'Talk Escape from Tarkov cheat setup, player ESP configs, loot radar, Labs status and product questions with other EFT players on tarkov-cheats.net.',
  },
  '/faq/': {
    title: 'Tarkov Cheats FAQ | ESP, Aimbot & HWID Help',
    description:
      'FAQ for Escape from Tarkov cheats: Lite/Pro/Elite tiers, player ESP, wallhack, loot ESP, radar, aimbot, HWID spoofer, skin changer and loader setup.',
  },
  '/terms/': {
    title: 'Terms & Conditions | Tarkov Cheats Legal',
    description:
      'Purchase terms, license use, refunds and acceptable use for Escape from Tarkov cheat products sold on tarkov-cheats.net.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Tarkov Cheats & Cookies',
    description:
      'How tarkov-cheats.net uses analytics, cookies and contact data for Escape from Tarkov cheat customers and Discord support.',
  },
  '/about/': {
    title: 'About Tarkov Cheats | EFT ESP & Aimbot Shop',
    description:
      'Tarkov Cheats sells Escape from Tarkov cheat tiers, ESP guides, HWID tools and utilities for Windows PC at tarkov-cheats.net.',
  },
  '/support/': {
    title: 'Tarkov Cheats Support | Loader & Setup Help',
    description:
      'Get help with Escape from Tarkov cheat loader setup, ESP configs, HWID spoofing, BattlEye patches and checkout on tarkov-cheats.net.',
  },

  // Blog — full titles (no extra brand suffix applied when PAGE_SEO hits)
  '/blog/tarkov-esp-wallhack-setup/': {
    title: 'Tarkov ESP Wallhack Setup | Lite & Elite Guide',
    description:
      'Set up Escape from Tarkov ESP wallhack: player boxes, PMC/Scav colors, loot ESP and range caps for Lite and Elite tiers before live PMC raids.',
  },
  '/blog/tarkov-aimbot-raid-guide/': {
    title: 'Tarkov Aimbot Guide | Live Raid & Labs Presets',
    description:
      'Tune Escape from Tarkov aimbot for live raids—smoothness, FOV, bone priority and hotkey macros for Pro tier on Labs, Factory and Customs.',
  },
  '/blog/tarkov-aimbot-combat-guide/': {
    title: 'Tarkov Aimbot Profiles | AR, SMG & Sniper',
    description:
      'Per-weapon Escape from Tarkov aimbot profiles for Pro tier—AR spray, SMG CQB and sniper setups for live raids and offline practice.',
  },
  '/blog/tarkov-radar-hack-guide/': {
    title: 'Tarkov Radar Hack Guide | Mini-Radar & Extracts',
    description:
      'Configure Escape from Tarkov radar hack: enemy dots, extract awareness and safe distance caps for PMC raids, Scav runs and Labs.',
  },
  '/blog/tarkov-cheats-features-guide/': {
    title: 'Tarkov Cheats Features | ESP, Aimbot & Loot',
    description:
      'Full Escape from Tarkov cheats feature list—aimbot, loot assist, skin changer, radar hack, ESP wallhack and recoil control on Lite, Pro and Elite.',
  },
  '/blog/tarkov-lite-vs-pro/': {
    title: 'ESP vs Aimbot Modules | Tarkov Elite Features',
    description:
      'Compare Escape from Tarkov ESP and radar awareness versus aimbot modules inside Tarkov Elite for Labs, Factory and PMC raids.',
  },
  '/blog/tarkov-elite-tier-guide/': {
    title: 'Tarkov Elite Tier Guide | When to Upgrade',
    description:
      'When to upgrade to Tarkov Elite: loot assist, no recoil, skin changer and full ESP wallhack with priority BattlEye patch updates.',
  },
  '/blog/tarkov-hwid-spoofer-after-ban/': {
    title: 'Tarkov HWID Spoofer After Ban | When to Spoof',
    description:
      'HWID spoofer vs new account after an Escape from Tarkov BattlEye hardware ban—when to spoof, when to start fresh, and safer next steps.',
  },
  '/blog/how-to-buy-tarkov-cheats-2026/': {
    title: 'How to Buy Tarkov Cheats in 2026 | Checkout',
    description:
      'Step-by-step guide to buy Escape from Tarkov cheats in 2026—Lite, Pro and Elite checkout, portal download and Discord setup on PC.',
  },
  '/blog/battleye-patch-day-checklist/': {
    title: 'BattlEye Patch Day Checklist | Tarkov Cheats',
    description:
      'BattlEye patch-day checklist for Tarkov cheats: status banner, loader reload and conservative presets after every Escape from Tarkov update.',
  },
  '/blog/battleye-bypass-tarkov-guide/': {
    title: 'BattlEye Unable to Verify Tarkov | Fix Guide',
    description:
      'Fix “BattlEye was unable to verify” on Escape from Tarkov—file integrity, clean restarts and when to use UGC appeal tools after bans.',
  },
  '/blog/tarkov-external-cheat-guide/': {
    title: 'Tarkov External Cheat Guide | Safe Loader Setup',
    description:
      'Why external Escape from Tarkov cheats matter, how the external loader works on PC, and what makes private software safer than free tools.',
  },
  '/blog/tarkov-stream-proof-setup/': {
    title: 'Tarkov Stream-Proof Setup | Hide ESP on OBS',
    description:
      'Hide Escape from Tarkov ESP wallhack and aimbot from OBS and Game Bar—stream-proof test workflow for creators on tarkov-cheats.net.',
  },
  '/blog/tarkov-skin-changer-guide/': {
    title: 'Tarkov Skin Changer Guide | Unlock All Cosmetics',
    description:
      'Preview Escape from Tarkov weapons, armor and exclusive skins locally with Unlock All / skin changer—client-only, not store purchases.',
  },
  '/blog/tarkov-offline-raid-guide/': {
    title: 'Tarkov Offline Raid Guide | Aim & ESP Drills',
    description:
      'Use Escape from Tarkov offline raids to practice aimbot smoothness, ESP ranges and loadouts before Labs and live PMC queues.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

/** Dev/CI helper: flag titles/descriptions outside Google display ranges. */
export function auditPageSeoLengths(): { path: string; titleLen: number; descLen: number; ok: boolean }[] {
  return Object.entries(PAGE_SEO).map(([path, entry]) => {
    const titleLen = entry.title.length;
    const descLen = entry.description.length;
    const ok = titleLen >= 40 && titleLen <= 62 && descLen >= 120 && descLen <= 165;
    return { path, titleLen, descLen, ok };
  });
}

import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['tarkov-esp-wallhack-setup', 'tarkov-lite-vs-pro', 'tarkov-radar-hack-guide', 'battleye-patch-day-checklist'],
  pro: [
    'tarkov-aimbot-raid-guide',
    'tarkov-aimbot-combat-guide',
    'tarkov-lite-vs-pro',
    'tarkov-stream-proof-setup',
  ],
  elite: [
    'tarkov-elite-tier-guide',
    'tarkov-cheats-features-guide',
    'tarkov-esp-wallhack-setup',
    'battleye-patch-day-checklist',
    'how-to-buy-tarkov-cheats-2026',
  ],
  'hwid-spoofer': [
    'tarkov-hwid-spoofer-after-ban',
    'battleye-bypass-tarkov-guide',
    'battleye-patch-day-checklist',
    'tarkov-external-cheat-guide',
  ],
  ugc: [
    'battleye-bypass-tarkov-guide',
    'tarkov-hwid-spoofer-after-ban',
    'how-to-buy-tarkov-cheats-2026',
  ],
  'unlock-all': [
    'tarkov-skin-changer-guide',
    'tarkov-cheats-features-guide',
    'tarkov-stream-proof-setup',
  ],
};

const productBase = '/products/tarkov-cheats/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on tarkov-cheats.net and Discord #status before purchase—especially after an Escape from Tarkov or BattlEye update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite tarkov cheats or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, Battlestate platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test in an offline raid, load presets, then enter Labs or raids.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Escape from Tarkov and BattlEye receive frequent updates. Confirm module availability on the live status panel at tarkov-cheats.net before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in Escape from Tarkov can violate Battlestate Terms of Service and lead to BattlEye bans or account action. You use this software at your own risk. Compatibility and availability can change after game, anti-cheat, or Windows updates without notice.';

const tarkovSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqBsg', text: 'Current Escape from Tarkov client via the official launcher with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets Escape from Tarkov published hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  gpMapHack: {
    src: `${gameplay}/tarkov-esp-wallhack.png`,
    alt: 'Escape from Tarkov ESP wallhack showing PMC boxes distance loot ESP and quest markers through walls in a live raid',
    caption: 'ESP wallhack',
    captionDesc: 'Player ESP, loot ESP and distance readouts through cover.',
  },
  gpScripts: {
    src: `${gameplay}/tarkov-aimbot-combat.png`,
    alt: 'Escape from Tarkov aimbot combat overlay with FOV circle bone priority and sticky aim during a firefight',
    caption: 'Aimbot combat',
    captionDesc: 'Humanized aimbot with FOV and bone priority for AR fights.',
  },
  gpZoomHack: {
    src: `${gameplay}/tarkov-radar-hack.png`,
    alt: 'Escape from Tarkov radar hack and loot ESP with value icons enemy dots and extract awareness outdoors',
    caption: 'Radar & loot ESP',
    captionDesc: 'Mini-radar style loot ESP with PMC tracking and value filters.',
  },
  gpSkinChanger: {
    src: `${gameplay}/tarkov-skin-changer.png`,
    alt: 'Escape from Tarkov skin changer and menu overlay previewing local weapon and armor cosmetics',
    caption: 'Skin changer',
    captionDesc: 'Local weapon and armor skin preview on your client.',
  },
  gpAutoKill: {
    src: `${gameplay}/tarkov-auto-aim.png`,
    alt: 'Escape from Tarkov auto aim assist tracking a moving target while loot ESP stays visible',
    caption: 'Auto aim',
    captionDesc: 'Sticky auto aim through mid-range sprays and peeks.',
  },
  gpFarmBot: {
    src: `${gameplay}/tarkov-loot-radar.png`,
    alt: 'Escape from Tarkov loot radar highlighting high-value items containers and corpses with distance',
    caption: 'Loot radar',
    captionDesc: 'Item and container ESP with high-value loot filters.',
  },
  gpHeroEsp: {
    src: `${gameplay}/tarkov-player-esp.png`,
    alt: 'Escape from Tarkov player ESP highlighting PMC and Scav skeletons with HP bars through walls',
    caption: 'Player ESP',
    captionDesc: 'PMC / Scav ESP with skeletons, health and distance.',
  },
  gpThermal: {
    src: `${gameplay}/tarkov-thermal-esp.png`,
    alt: 'Escape from Tarkov thermal ESP highlighting players through walls in low-light Labs corridors',
    caption: 'Thermal ESP',
    captionDesc: 'Thermal-style player highlights for dark maps and Labs.',
  },
  gpBuildFight: {
    src: `${gameplay}/tarkov-factory-esp.png`,
    alt: 'Escape from Tarkov Factory ESP wallhack showing stacked PMCs through walls in close-quarters',
    caption: 'Factory ESP',
    captionDesc: 'CQB ESP layout tuned for Factory raids.',
  },
  gpArena: {
    src: `${gameplay}/tarkov-labs-wallhack.png`,
    alt: 'Escape from Tarkov Labs wallhack revealing players key rooms and loot through The Lab walls',
    caption: 'Labs wallhack',
    captionDesc: 'Labs-ready ESP for key rooms and stacked teams.',
  },
  gpSpawn: {
    src: `${gameplay}/tarkov-extract-esp.png`,
    alt: 'Escape from Tarkov extract ESP marking exits spawn pressure and nearby players before extract',
    caption: 'Extract ESP',
    captionDesc: 'Extract markers and spawn-side awareness before you commit.',
  },
  gpLongRange: {
    src: `${gameplay}/tarkov-long-range-esp.png`,
    alt: 'Escape from Tarkov long-range ESP tracking distant PMCs across Woods and open fields',
    caption: 'Long-range ESP',
    captionDesc: 'Extended distance ESP for Woods and open maps.',
  },
  gpAimLock: {
    src: `${gameplay}/tarkov-aimbot-lock.png`,
    alt: 'Escape from Tarkov aimbot lock targeting a PMC thorax with silent aim and prediction enabled',
    caption: 'Aimbot lock',
    captionDesc: 'Aim lock engaged on a peeking PMC in CQB.',
  },
  gpChams: {
    src: `${gameplay}/tarkov-chams-esp.png`,
    alt: 'Escape from Tarkov chams ESP with colored player models visible through walls and floors',
    caption: 'Chams ESP',
    captionDesc: 'Colored chams for fast target reads through terrain.',
  },
  gpSquad: {
    src: `${gameplay}/tarkov-squad-esp.png`,
    alt: 'Escape from Tarkov squad ESP showing multiple PMC groups with distance and weapon labels',
    caption: 'Squad ESP',
    captionDesc: 'Multi-player ESP for squad fights and third parties.',
  },
  gpCombat: {
    src: `${gameplay}/tarkov-combat-esp.png`,
    alt: 'Escape from Tarkov combat ESP during a Factory fight with enemy distance readouts and skeleton ESP',
    caption: 'Combat ESP',
    captionDesc: 'Combat-ready ESP layout for Factory and Labs CQB.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'tarkov-cheats';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Escape from Tarkov Lite is built for players who want map awareness first. In live raids, knobackpack enemy positions, loot spawns and loot timings wins more fights than raw mechanics—Lite gives you that edge without aimbot automation.',
    },
    { type: 'h2', text: 'Labs-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Aimbot and bot modules entirely. Your gameplay looks natural while ESP, radar hack and loot timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Escape from Tarkov Pro is the sweet spot for Labs grinders. Aimbot, Smooth Aim and Sticky Aim help you win squad fights without obvious bot patterns—when you tune Smoothness sliders using our portal presets.',
    },
    { type: 'h2', text: 'Aimbot + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds Aimbot, Bone Priority, Hotkey macros and FOV and smoothness drabackpack. You see the fight before it starts and win it with aimbot that stays human at default settings.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'Tarkov Elite is the private build for players who want everything—Loot Assist, No Recoil, Recoil Control, Skin Changer, full ESP wallhack and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first Labs queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player ESP with distance and name tags, loot and container locator, loot spawn timers, radar hack, and stream-safe overlay hiding. Config presets for Labs, Arena and raids ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Aimbot and automation' },
    {
      type: 'p',
      text: 'Aimbot, Smooth Aim, Sticky Aim with Prediction, Bone Priority and hotkey macros for heals and meds. Smoothness sliders tunes cast timing so aimbot stays natural in live raids. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at tarkov-cheats.net—enough firepower for high-tier loot fights without Elite slot limits. Pair with our aimbot guide in the blog before your first Labs session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Loot Assist, Extracts Assist AI, No Recoil, Recoil Control, Skin Changer and full ESP wallhack with sound alerts. Use safe-zone testing before live raids—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: 'Use when fresh Battlestate accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only BattlEye cases; see [UGC](/products/tarkov-cheats/ugc/) instead.',
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative cheat profile before live raids. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for Battlestate account restrictions, BattlEye bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some BattlEye bans cannot be reversed. UGC organizes evidence and follow-ups for Battlestate review. Pair with [HWID Spoofer](/products/tarkov-cheats/hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players nearby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Skin Changer ships inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide('gpHeroEsp', 'gpLongRange', 'gpSquad'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: tarkovSystemRequirements,
    fullFeatures: [
      'Player ESP & player boxes',
      'Loot & loot locator',
      'Zone awareness',
      'Health & shield tracking',
      'Mini-radar overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Loot spawn timers',
      'Radar hack',
      'raid preset config',
      'Labs preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Escape from Tarkov Lite: ESP and radar',
      paragraphs: [
        'Lite is for player ESP, loot markers, loot timers and radar. No aimbot. Set distance, colors and stream-proof in the portal before you queue.',
        'Best if you want awareness in Labs, Arena and raids without combat automation. Overlays are updated after Escape from Tarkov patches.',
      ],
    },
  },
  pro: {
    images: slide('gpScripts', 'gpAimLock', 'gpCombat'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: tarkovSystemRequirements,
    fullFeatures: [
      'All Lite ESP & ESP wallhack modules',
      'Aimbot',
      'Smooth Aim',
      'Sticky Aim & Prediction',
      'Bone Priority',
      'Hotkey macros (heals/meds)',
      'Auto Heal',
      'FOV & smoothness tuning',
      'Per-weapon aimbot profiles',
      'Third-party alert integration',
      'Labs-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord operator support',
    ],
    overview: {
      title: 'Escape from Tarkov Pro: aimbot plus ESP',
      paragraphs: [
        'Pro includes everything in Lite, plus Aimbot, Smooth Aim, Sticky Aim and hotkey macros. Aim settings live in one tab. Start with a portal preset, not max sliders.',
        'Most people pick Pro for Labs, Arena and raids. Target priority (torso/chest) and macros help in fights while defaults stay smooth.',
      ],
    },
  },
  elite: {
    images: slide('gpAutoKill', 'gpThermal', 'gpBuildFight'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: tarkovSystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Loot Assist',
      'Extract Assist AI',
      'Loot respawn timer',
      'Auto loadout manager',
      'No Recoil',
      'Recoil Control',
      'Full ESP wallhack suite',
      'Third-party alert system',
      'Visibility detector',
      'Skin Changer (Unlock All)',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'Tarkov Elite: full cheat + extras',
      paragraphs: [
        'Elite includes Lite and Pro modules, plus loot assist, No Recoil, Recoil Control, Skin Changer, full ESP wallhack and faster patch priority.',
        'Slots are limited. Discord support helps you set safer profiles before live raids. Check the status banner on tarkov-cheats.net before you buy.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpSpawn', 'gpArena', 'gpChams'),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching Escape from Tarkov.',
    limitations:
      'Spoofing does not help account-only BattlEye cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Escape from Tarkov after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'HWID Spoofer for Tarkov PC bans',
      paragraphs: [
        'Use the HWID Spoofer when BattlEye flags your PC hardware but the Battlestate account is still fine. Includes disk and MAC tools, a restore-point checklist, a compatibility scan and post-spoof checks.',
        'Use it when new accounts die on one PC but work on another. It does not fix account-only BattlEye bans. After spoofing, use a safer cheat profile before live raids.',
      ],
    },
  },
  ugc: {
    images: slide('gpZoomHack', 'gpFarmBot', 'gpLongRange'),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent BattlEye bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on tarkov-cheats.net or at checkout on tarkov-cheats.net.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'UGC account appeal tools',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you organize appeals for Battlestate restrictions and BattlEye bans. It does not guarantee an unban.',
        'Track cases, keep evidence in one place and follow up from the dashboard. Discord support can walk you through steps when needed.',
      ],
    },
  },
  'unlock-all': {
    images: slide('gpSkinChanger', 'gpChams', 'gpCombat'),
    goodToKnow:
      'Unlock All previews cosmetics locally on your client. Other players nearby see your real inventory—not preview skins. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify gear stash or store state. Other players cannot see previewed skins or sets.',
    systemRequirements: tarkovSystemRequirements,
    fullFeatures: [
      'Outfit skin swap',
      'Skin & skin preview',
      'Weapon & armor customizer',
      'Loading screen editor',
      'Cursor & HUD theme',
      'Loot & loot replacer',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Skin Changer / Unlock All',
      paragraphs: [
        'Unlock All lets you preview weapons, armor and gear skins on your Escape from Tarkov client. It does not change your gear stash or store purchases.',
        'Only you see the preview skins. Other players see your real inventory. Included with Elite, or buy it alone without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = cheat.name === 'Lite' ? 'Escape from Tarkov Lite' : cheat.name === 'Pro' ? 'Escape from Tarkov Pro' : 'Tarkov Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpAimLock', 'gpThermal', 'gpArena');

/** One slide per unique gameplay screenshot (5 source shots). */
export const heroSlides = slide(
  'gpMapHack',
  'gpScripts',
  'gpHeroEsp',
  'gpZoomHack',
  'gpAutoKill',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'Shop Escape from Tarkov cheat tiers on tarkov-cheats.net—Elite ESP & aimbot, HWID spoofer, UGC recovery and skin changer for Customs, Labs, Factory and Arena.',
  buyUrl: checkoutPath('tarkov'),
};

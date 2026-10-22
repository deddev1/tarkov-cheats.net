export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: 14,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments: [{ author: 'guide_team', age: 'From the guide', score: 0, body: tip }],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-does-tarkov-map-awareness-include', title: 'What does Tarkov ESP map awareness include?', upvotes: 73,
    excerpt: 'Escape from Tarkov ESP wallhack covers player boxes, PMC/Scav tags, loot and container markers, extract info, and distance caps for Customs, Labs and Factory.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov ESP wallhack setup guide', sourcePath: '/blog/tarkov-esp-wallhack-setup/',
    answer: 'The guide covers player ESP, loot and container markers, extract awareness, sound cues, and last-seen positions. Exact options depend on Lite, Pro or Elite.',
    detail: 'Start with a restrained layout and enable only the overlays you can read during a contested PMC fight or Labs push.',
    tip: 'Keep the overlay uncluttered: begin with player boxes and loot, then adjust range and visibility one setting at a time.',
  }),
  guideDiscussion({
    slug: 'how-to-set-up-map-overlay', title: 'How should I set up Tarkov ESP for the first time?', upvotes: 58,
    excerpt: 'Enable basic Escape from Tarkov ESP display options, confirm the overlay in an offline raid, then adjust one wallhack setting at a time before live queues.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov ESP wallhack setup guide', sourcePath: '/blog/tarkov-esp-wallhack-setup/',
    answer: 'Use the setup guide to enable the overlay, choose readable PMC/Scav colors, and keep indicators clear of the Escape from Tarkov HUD.',
    detail: 'Test your layout in an offline raid before relying on it in a live PMC or Labs run. A simple config beats enabling every ESP option at once.',
    tip: 'If the screen feels crowded, reduce active ESP indicators before changing size or position.',
  }),
  guideDiscussion({
    slug: 'what-zoom-settings-are-comfortable', title: 'What Tarkov radar zoom settings feel comfortable?', upvotes: 44,
    excerpt: 'Tune Escape from Tarkov radar hack zoom for extract awareness and flank reads without making your PMC hard to control in tight Factory rooms.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov radar hack guide', sourcePath: '/blog/tarkov-radar-hack-guide/',
    answer: 'There is no single ideal radar zoom. Adjust gradually and confirm you can still track your PMC, nearby scavs, and contested extracts.',
    detail: 'Keep a quick reset to the default radar view so you can compare the wider map and return to familiar framing mid-raid.',
    tip: 'Change one step at a time and play a short offline raid before settling on a new radar distance.',
  }),
  guideDiscussion({
    slug: 'how-to-tune-script-delay-settings', title: 'How do smooth aim settings affect Tarkov aimbot?', upvotes: 32,
    excerpt: 'Conservative Escape from Tarkov aimbot smoothness, FOV and bone priority keep tracking readable in Labs and Factory without snappy aim that looks unnatural.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov aimbot for live raids', sourcePath: '/blog/tarkov-aimbot-raid-guide/',
    answer: 'Smoothness and FOV control how quickly aimbot tracks targets. Start slower, test offline, then raise values only if tracking still feels human.',
    detail: 'Tune one weapon profile at a time—AR, SMG or sniper—instead of changing every slider in one session.',
    tip: 'Keep a note of each preset so you can roll back to the last Labs-safe aimbot setup.',
  }),
  guideDiscussion({
    slug: 'how-to-practice-auto-combos', title: 'What is a good way to practice Tarkov aimbot offline?', upvotes: 29,
    excerpt: 'Use offline Escape from Tarkov raids to drill AR, SMG and sniper aimbot profiles with repeatable resets before enabling aim assist in live PMC queues.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov aimbot combat guide', sourcePath: '/blog/tarkov-aimbot-combat-guide/',
    answer: 'Pick one weapon class and one aimbot profile at a time. The guide walks through target selection, bone priority and smoothness for live raids.',
    detail: 'Offline raids let you reset sprays and peeks without Labs pressure so you can see which aimbot steps need adjustment.',
    tip: 'Learn the manual spray first; that makes it easier to spot when an aimbot preset is too snappy.',
  }),
  guideDiscussion({
    slug: 'what-is-in-the-elite-tier', title: 'What extra tools are in Tarkov Elite cheats?', upvotes: 67,
    excerpt: 'Tarkov Elite includes Lite and Pro ESP and aimbot plus loot assist, no recoil, recoil control and skin changer with priority BattlEye patch updates.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Tarkov Elite tier guide', sourcePath: '/blog/tarkov-elite-tier-guide/',
    answer: 'Elite includes the Lite and Pro feature sets plus loot assist, no recoil, recoil control, full ESP wallhack and Skin Changer.',
    detail: 'The guide covers who benefits from Elite modules and why understanding Lite/Pro first makes upgrades clearer.',
    tip: 'Compare included features against your raid goals before upgrading; the full Elite guide has the checklist.',
  }),
  guideDiscussion({
    slug: 'how-do-lite-and-pro-differ', title: 'How do Tarkov Lite and Pro cheats differ?', upvotes: 53,
    excerpt: 'Escape from Tarkov Lite focuses on ESP wallhack and radar awareness; Pro adds humanized aimbot, sticky aim and bone priority for Labs and Factory.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov Lite vs Pro: which tier fits you', sourcePath: '/blog/tarkov-lite-vs-pro/',
    answer: 'Lite centers on awareness—player ESP, loot ESP and radar. Pro keeps that foundation and adds aimbot automation for live PMC fights.',
    detail: 'Choose Lite if you want information only; choose Pro if you also want aimbot modules for contested Labs and Factory entries.',
    tip: 'Use the full Lite vs Pro comparison to check specific modules before checkout.',
  }),
  guideDiscussion({
    slug: 'what-to-know-about-skin-changer', title: 'What should I know about Tarkov Skin Changer?', upvotes: 38,
    excerpt: 'Escape from Tarkov Skin Changer / Unlock All previews weapons, armor and gear locally on your client—other players still see your real inventory.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov Skin Changer guide', sourcePath: '/blog/tarkov-skin-changer-guide/',
    answer: 'Skin Changer is a local cosmetic preview utility. The guide covers setup, supported skins and how to restore defaults.',
    detail: 'Review compatibility notes and follow current setup steps before enabling Unlock All on your Escape from Tarkov client.',
    tip: 'Cosmetic previews are client-only; check the guide for limitations and restore steps.',
  }),
  guideDiscussion({
    slug: 'what-to-do-if-battleye-cannot-verify', title: 'What if BattlEye cannot verify Tarkov?', upvotes: 24,
    excerpt: 'Start with Battlestate file verification and a clean PC restart before treating a BattlEye unable-to-verify error as an Escape from Tarkov account ban.',
    category: 'Patch Talk', categoryTone: 'orange', sourceTitle: 'BattlEye unable to verify Escape from Tarkov', sourcePath: '/blog/battleye-bypass-tarkov-guide/',
    answer: 'The message often comes from game-file problems or conflicting overlays—not always a ban. Verify Escape from Tarkov files in the launcher first.',
    detail: 'Fully exit the client, restart Windows, and disable conflicting overlays before trying more disruptive steps or UGC appeals.',
    tip: 'Test a clean Battlestate launch before starting the cheat loader so you can isolate the cause.',
  }),
  guideDiscussion({
    slug: 'how-does-an-external-loader-work', title: 'What does an external Tarkov loader mean?', upvotes: 46,
    excerpt: 'An external Escape from Tarkov cheat loader runs outside the game process and draws ESP or aimbot overlays instead of injecting into Tarkov itself.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov external cheat guide', sourcePath: '/blog/tarkov-external-cheat-guide/',
    answer: '“External” means the software runs separately from the Escape from Tarkov process and presents its menu as an overlay.',
    detail: 'The guide covers high-level architecture, loader setup, BattlEye patch updates, and how external tools differ from internals.',
    tip: 'Check status and compatibility whenever Escape from Tarkov or BattlEye ships an update.',
  }),
  guideDiscussion({
    slug: 'how-to-check-stream-proof-capture', title: 'How do I check if OBS captures Tarkov ESP?', upvotes: 21,
    excerpt: 'Record a short OBS test with your Escape from Tarkov ESP overlay enabled, then review playback before streaming Lite or Elite wallhack on Tarkov.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Stream-proof overlay setup for Escape from Tarkov', sourcePath: '/blog/tarkov-stream-proof-setup/',
    answer: 'Record a local test with the exact OBS scene and capture mode you plan to use, then review playback for ESP or menu elements.',
    detail: 'Test game capture and display capture separately—multi-monitor and capture methods behave differently with stream-proof mode.',
    tip: 'Do not trust the OBS preview alone; review a saved recording from the scene you will stream.',
  }),
  guideDiscussion({
    slug: 'what-to-do-after-hwid-change', title: 'What to check after a Tarkov HWID or PC change?', upvotes: 33,
    excerpt: 'After a new PC or Escape from Tarkov HWID spoof, confirm loader activation, follow the HWID guide reset steps, and contact support if the device is unrecognized.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov HWID spoofer after ban', sourcePath: '/blog/tarkov-hwid-spoofer-after-ban/',
    answer: 'Follow the product account and device instructions. The HWID guide covers common reset questions after hardware bans or PC swaps.',
    detail: 'Avoid changing several system identifiers at once. If the loader rejects the device, open Discord support with the exact error.',
    tip: 'Use official support for device resets instead of random third-party cleaners.',
  }),
  guideDiscussion({
    slug: 'what-to-check-before-installing-tools', title: 'What to review before installing Tarkov cheats?', upvotes: 18,
    excerpt: 'Before installing Escape from Tarkov cheats, read the setup guide, confirm Windows compatibility, and check the live BattlEye status banner on tarkov-cheats.net.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'Tarkov cheats features guide', sourcePath: '/blog/tarkov-cheats-features-guide/',
    answer: 'Read feature and setup docs first, confirm your Windows build matches requirements, and check current status notes after patches.',
    detail: 'The features guide lists ESP, aimbot and utility modules and links deeper setup articles for each.',
    tip: 'Treat product and support pages as the source of truth for availability and BattlEye compatibility.',
  }),
  guideDiscussion({
    slug: 'how-to-choose-tarkov-product-tier', title: 'How do I choose a Tarkov cheat product tier?', upvotes: 48,
    excerpt: 'Compare Escape from Tarkov Elite modules and utilities first, then complete secure checkout and follow the loader setup before your first PMC raid.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'How to buy Tarkov cheats in 2026', sourcePath: '/blog/how-to-buy-tarkov-cheats-2026/',
    answer: 'Compare included ESP and aimbot features, pick the tier that matches your raids, then continue through official checkout on tarkov-cheats.net.',
    detail: 'The buying guide covers purchase flow, portal access, downloading the current loader, and setup before launching Escape from Tarkov.',
    tip: 'For payment or account questions, use the support page—do not share order details in public threads.',
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'can-offline-cheats-be-used-in-live-raids', category: 'General', categoryTone: 'purple',
    title: 'Can I use Escape from Tarkov offline practice tools in live raids?',
    excerpt: 'Offline Escape from Tarkov practice does not carry into live PMC raids, Labs or Scav runs—use offline only to tune ESP and aimbot before queueing.',
    author: 'guide_team', age: '2 hours ago', commentsCount: 3, upvotes: 128, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov offline raid guide', sourcePath: '/blog/tarkov-offline-raid-guide/',
    body: ['No. Offline raids are for practice only. They do not carry into live PMC matchmaking, Labs, or Scav runs.', 'Use offline mode to learn aimbot smoothness, ESP ranges, and loadouts. The guide also explains the difference between practice drills and private Tarkov cheats.'],
    comments: [
      { author: 'raid_runner', age: '1 hour ago', score: 24, body: 'Correct: load an offline raid before touching Labs presets.' },
      { author: 'loot_caller', age: '48 min. ago', score: 11, body: 'The guide covers AR, SMG, and sniper drills. Keep Labs presets conservative after practice.' },
      { author: 'factory_entry', age: '35 min. ago', score: 8, body: 'Useful distinction. Offline tools are not live-raid features.' },
    ],
  },
  {
    slug: 'how-to-practice-tarkov-cheats-safely', category: 'General', categoryTone: 'purple',
    title: 'How do I practice Tarkov cheats safely before live raids?',
    excerpt: 'Use offline Escape from Tarkov raids to tune ESP wallhack and aimbot, then check the BattlEye status banner before queuing PMC or Labs.',
    author: 'guide_team', age: '4 hours ago', commentsCount: 2, upvotes: 86, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov offline raid guide', sourcePath: '/blog/tarkov-offline-raid-guide/',
    body: ['Launch Escape from Tarkov in offline mode, load a conservative Elite preset, and tune ESP range plus aimbot smoothness before any live raid.', 'If anything looks off after a BattlEye patch, stop and check Discord #status before queuing PMC or Labs.'],
    comments: [
      { author: 'map_caller', age: '3 hours ago', score: 17, body: 'Offline first, then a short Factory run with limited ESP distance.' },
      { author: 'status_check', age: '2 hours ago', score: 9, body: 'Status banner before every wipe-week launch is non-negotiable.' },
    ],
  },
  {
    slug: 'practice-tarkov-high-ground-safely', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'What is the safest way to practice high-ground spots?',
    excerpt: 'Use an offline Escape from Tarkov raid with ESP to study high-ground sight lines, then fight with overlays minimized so the angles stick.',
    author: 'guide_team', age: '6 hours ago', commentsCount: 2, upvotes: 64, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov offline raid guide', sourcePath: '/blog/tarkov-offline-raid-guide/',
    body: ['Practice in an offline raid. Enable ESP boxes briefly to inspect high-ground angles and loot positions, then fight with overlays minimized.', 'Repeat the same extract clear a few times so sight lines stick without waiting for a full Labs match.'],
    comments: [
      { author: 'high_ground', age: '5 hours ago', score: 13, body: 'I peek with ESP on, then disable boxes and re-check the same angle. Helps for high-ground coverage.' },
      { author: 'map_reader', age: '4 hours ago', score: 6, body: 'Replaying the same zone path in Offline beats learning only in live raids.' },
    ],
  },
  {
    slug: 'what-to-check-after-a-tarkov-patch', category: 'Patch Talk', categoryTone: 'orange',
    title: 'What should I check before playing after an Escape from Tarkov patch?',
    excerpt: 'After an Escape from Tarkov patch, check build status, update the loader, and test ESP/aimbot in an offline raid before returning to live queues.',
    author: 'guide_team', age: '9 hours ago', commentsCount: 2, upvotes: 42, flair: 'Guide Q&A',
    sourceTitle: 'BattlEye patch day checklist', sourcePath: '/blog/battleye-patch-day-checklist/',
    body: ['Check the current build/status notice first. After a game update, wait for a compatible build, update the loader, then verify ESP and aimbot in an offline raid before returning to live raids.', 'If anything behaves unexpectedly, stop and review the status notes rather than assuming the old setup still applies. The checklist covers the patch-day routine in more detail.'],
    comments: [
      { author: 'patch_tester', age: '8 hours ago', score: 12, body: 'Testing after the update before Labs is the part I used to skip. Now I check the build note and run a quick offline raid.' },
      { author: 'loader_help', age: '7 hours ago', score: 7, body: 'Agree. If the build/status has not caught up, wait. A checklist is better than guessing.' },
    ],
  },
  {
    slug: 'tarkov-lite-or-pro-aimbot', category: 'Community', categoryTone: 'green',
    title: 'Lite or Pro: which Tarkov cheat tier includes aimbot?',
    excerpt: 'ESP and radar cover awareness; Elite also includes aimbot modules like Smooth Aim, Sticky Aim and bone priority for live raids.',
    author: 'guide_team', age: '12 hours ago', commentsCount: 1, upvotes: 31, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov Lite vs Pro: feature comparison', sourcePath: '/blog/tarkov-lite-vs-pro/',
    body: ['According to the comparison guide, Lite centers on map awareness features such as player ESP, loot ESP, radar, and stream-proof options. Pro includes those features and adds aimbot tools such as Smooth Aim, Sticky Aim, Bone Priority, and hotkey macros.', 'The best fit depends on which features you need. Read the full comparison before choosing.'],
    comments: [
      { author: 'module_picker', age: '10 hours ago', score: 10, body: 'The comparison page is useful because it shows which modules are included in each tier instead of only listing headlines.' },
    ],
  },
  {
    slug: 'how-to-practice-weapon-aim-offline', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'How can I practice Tarkov aimbot without a live raid?',
    excerpt: 'Start an offline Escape from Tarkov raid and drill AR, SMG and sniper aimbot profiles with repeatable resets before enabling them in Labs.',
    author: 'guide_team', age: '1 day ago', commentsCount: 2, upvotes: 27, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov offline raid guide: aim drills before live raids', sourcePath: '/blog/tarkov-offline-raid-guide/',
    body: ['Start an offline raid. Practice one weapon profile at a time—AR, SMG, then sniper—and reset between attempts.', 'For realistic timing, use your Labs smoothness values offline before enabling aimbot in live games. The linked guide covers the full practice workflow.'],
    comments: [
      { author: 'raid_runner', age: '20 hours ago', score: 10, body: 'Start with a bot target and repeat the same spray until the tracking feels automatic.' },
      { author: 'loot_caller', age: '18 hours ago', score: 5, body: 'Keep Labs presets conservative—offline can hide how snappy your aim looks in clips.' },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}

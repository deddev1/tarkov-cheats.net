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
    slug: 'what-does-tarkov-map-awareness-include', title: 'What does map awareness include in the guide?', upvotes: 73,
    excerpt: 'A quick breakdown of player, chest, loot, and audio information covered by the map awareness guide.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov ESP wallhack setup guide', sourcePath: '/blog/tarkov-esp-wallhack-setup/',
    answer: 'The guide covers player ESP, loot and container markers, loot information, sound alerts, and last-seen positions. The exact options depend on the selected product tier.',
    detail: 'It recommends starting with a restrained layout and enabling only the information you can read comfortably during a team fight.',
    tip: 'Keep the overlay uncluttered: begin with the core indicators, then adjust the range and visibility settings one at a time.',
  }),
  guideDiscussion({
    slug: 'how-to-set-up-map-overlay', title: 'How should I set up the map overlay for the first time?', upvotes: 58,
    excerpt: 'Start with the basic display options, confirm the overlay in a offline raid, then adjust one setting at a time.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov ESP wallhack setup guide', sourcePath: '/blog/tarkov-esp-wallhack-setup/',
    answer: 'Use the setup guide to enable the overlay, choose readable colors, and check that the indicators do not cover important parts of the game interface.',
    detail: 'Test your layout in a offline raid before relying on it in a live match. A simple configuration is easier to understand than turning on every option immediately.',
    tip: 'If the screen feels crowded, reduce the number of indicators before changing their size or position.',
  }),
  guideDiscussion({
    slug: 'what-zoom-settings-are-comfortable', title: 'What camera zoom settings are comfortable to play with?', upvotes: 44,
    excerpt: 'The zoom guide focuses on finding a view that improves map context without making your player hard to control.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov radar hack guide', sourcePath: '/blog/tarkov-radar-hack-guide/',
    answer: 'There is no single ideal zoom value for every player. The guide recommends adjusting gradually and checking that you can still track your player, spell ranges, and nearby fights.',
    detail: 'Keep a quick reset to the default camera view available so you can compare the wider view and return to familiar framing.',
    tip: 'Change one step at a time and play a short offline raid before settling on a new camera distance.',
  }),
  guideDiscussion({
    slug: 'how-to-tune-script-delay-settings', title: 'How do delay settings affect player aimbot?', upvotes: 32,
    excerpt: 'A practical question about timing, combo readability, and why the aimbot guide recommends conservative tuning.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov aimbot for live raids', sourcePath: '/blog/tarkov-aimbot-raid-guide/',
    answer: 'Delay settings control the spacing between automated actions. The guide recommends starting with slower timings and testing them in a practice setting before making changes.',
    detail: 'A consistent sequence is easier to review and tune than changing several timing values at once.',
    tip: 'Keep a note of each configuration you try so you can return to the last setup that behaved as expected.',
  }),
  guideDiscussion({
    slug: 'how-to-practice-auto-combos', title: 'What is a good way to practice an aimbot?', upvotes: 29,
    excerpt: 'Use a repeatable player setup, learn the sequence, and check each spell and item timing in a controlled lobby.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Escape from Tarkov aimbot player aimbot', sourcePath: '/blog/tarkov-aimbot-combat-guide/',
    answer: 'Choose one player and one combo to practice at a time. The guide walks through example sequences and explains how target selection and ability order fit together.',
    detail: 'A custom lobby lets you repeat the sequence and see which steps need adjustment without the pressure of a live match.',
    tip: 'Learn the manual sequence first; that makes it much easier to spot when a configuration is mistimed.',
  }),
  guideDiscussion({
    slug: 'what-is-in-the-elite-tier', title: 'What additional tools are included in the Elite tier?', upvotes: 67,
    excerpt: 'The Elite guide explains how its extra utility modules compare with the Lite and Pro feature sets.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Tarkov Elite tier guide', sourcePath: '/blog/tarkov-elite-tier-guide/',
    answer: 'The guide describes Elite as including the Lite and Pro feature sets plus additional utilities such as Loot Assist, No Recoil, Recoil Control, and Skin Changer.',
    detail: 'It also covers who may benefit from the extra modules and why it makes sense to understand the simpler feature set first.',
    tip: 'Compare the included features against your needs before choosing a tier; the full comparison is linked in the guide.',
  }),
  guideDiscussion({
    slug: 'how-do-lite-and-pro-differ', title: 'How do Lite and Pro differ in practice?', upvotes: 53,
    excerpt: 'Lite centers on awareness features, while Pro adds player script tools; here is the short version.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov Lite vs Pro: which tier fits you', sourcePath: '/blog/tarkov-lite-vs-pro/',
    answer: 'The comparison guide describes Lite as focused on awareness tools such as ESP, loot and loot information, and zoom. Pro adds aimbot automation features on top of that foundation.',
    detail: 'The right choice depends on whether you need map information alone or also want the additional script modules described in the comparison.',
    tip: 'Use the full side-by-side comparison to check specific modules before making a decision.',
  }),
  guideDiscussion({
    slug: 'what-to-know-about-skin-changer', title: 'What should I know about the Skin Changer utility?', upvotes: 38,
    excerpt: 'The product guide explains how cosmetic previews work and what to expect from the utility.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov Skin Changer guide', sourcePath: '/blog/tarkov-skin-changer-guide/',
    answer: 'The guide describes Skin Changer as a local cosmetic preview utility. It explains setup, supported options, and how to restore the default appearance.',
    detail: 'Review the compatibility notes and follow the current setup instructions before using the utility.',
    tip: 'Cosmetic changes are local previews; check the guide for current limitations and setup steps.',
  }),
  guideDiscussion({
    slug: 'what-to-do-if-battleye-cannot-verify', title: 'What should I do if BattlEye cannot verify my Escape from Tarkov install?', upvotes: 24,
    excerpt: 'Start with Battlestate file verification and a clean restart before assuming the issue is an account restriction.',
    category: 'Patch Talk', categoryTone: 'orange', sourceTitle: 'BattlEye unable to verify Escape from Tarkov', sourcePath: '/blog/battleye-bypass-tarkov-guide/',
    answer: 'The troubleshooting guide says the message can result from game-file problems or software conflicts and does not always mean an account ban. First verify Escape from Tarkov files through the Escape from Tarkov launcher.',
    detail: 'It also recommends fully exiting the Escape from Tarkov client, restarting the PC, and checking for conflicting overlays before trying more disruptive steps.',
    tip: 'Test a normal Battlestate launch before starting other software so you can narrow down the cause.',
  }),
  guideDiscussion({
    slug: 'how-does-an-external-loader-work', title: 'What does “external loader” mean?', upvotes: 46,
    excerpt: 'The external software guide explains the term and outlines the general setup described on the site.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov external cheat guide', sourcePath: '/blog/tarkov-external-cheat-guide/',
    answer: 'The article uses “external” to describe software that runs separately from the Escape from Tarkov process and presents its interface as an overlay.',
    detail: 'It discusses the architecture at a high level and explains setup, patch updates, and the differences described between external and internal tools.',
    tip: 'Check compatibility and current status information whenever Escape from Tarkov receives an update.',
  }),
  guideDiscussion({
    slug: 'how-to-check-stream-proof-capture', title: 'How can I check whether OBS captures an overlay?', upvotes: 21,
    excerpt: 'The stream-proof setup guide recommends recording a short test and checking the playback before streaming.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Stream-proof overlay setup for Escape from Tarkov', sourcePath: '/blog/tarkov-stream-proof-setup/',
    answer: 'Record a short local test with the exact OBS scene and capture mode you plan to use, then review the playback for any overlay elements.',
    detail: 'The guide recommends testing game capture and display capture separately, since capture methods and multi-monitor setups can behave differently.',
    tip: 'Do not rely on the preview alone; review a saved recording from the same scene you intend to stream.',
  }),
  guideDiscussion({
    slug: 'what-to-do-after-hwid-change', title: 'What should I check after changing PCs or hardware?', upvotes: 33,
    excerpt: 'The HWID guide covers common setup checks and when to contact support for an account or device reset.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Escape from Tarkov HWID spoofer after ban', sourcePath: '/blog/tarkov-hwid-spoofer-after-ban/',
    answer: 'Start by checking the account and device instructions for your product. The guide explains common HWID questions and when a reset request may be needed.',
    detail: 'Avoid changing several system settings at once. If the product does not recognize your device, contact support with the relevant error details.',
    tip: 'Use the official support path for device resets instead of relying on unrelated unrelated tools.',
  }),
  guideDiscussion({
    slug: 'what-to-check-before-installing-tools', title: 'What should I review before installing a new tool?', upvotes: 18,
    excerpt: 'Check the official setup steps, current compatibility notes, and support information before proceeding.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'Tarkov cheats features guide', sourcePath: '/blog/tarkov-cheats-features-guide/',
    answer: 'Read the feature and setup information first, confirm that it matches your system, and check the current update/status notes.',
    detail: 'The site guide describes the available feature groups and links to more specific setup articles for individual modules.',
    tip: 'Use the linked product and support pages as the source of truth for current availability and compatibility.',
  }),
  guideDiscussion({
    slug: 'how-to-choose-tarkov-product-tier', title: 'How do I choose the right Escape from Tarkov product tier?', upvotes: 48,
    excerpt: 'Compare the feature sets first, then follow the official checkout and setup instructions for your selection.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'How to buy Tarkov cheats in 2026', sourcePath: '/blog/how-to-buy-tarkov-cheats-2026/',
    answer: 'The buying guide recommends comparing included features and choosing the tier that fits your needs before continuing through the official checkout.',
    detail: 'It covers the purchase flow, account access, downloading the current build, and checking setup instructions before launching.',
    tip: 'If you have a payment or account question, use the site support page and avoid sharing purchase details publicly.',
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'can-offline-cheats-be-used-in-live-raids', category: 'General', categoryTone: 'purple',
    title: 'Can I use Escape from Tarkov offline practice tools in live raids?',
    excerpt: 'Quick answer from the offline raid guide: offline practice does not carry into live PMC raids or Labs.',
    author: 'guide_team', age: '2 hours ago', commentsCount: 3, upvotes: 128, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov offline raid guide', sourcePath: '/blog/tarkov-offline-raid-guide/',
    body: ['No. Offline raids are for practice only. They do not carry into live PMC matchmaking, Labs, or Scav runs.', 'Use offline mode to learn aimbot smoothness, ESP ranges, and loadouts. The guide also explains the difference between practice drills and private Tarkov cheats.'],
    comments: [
      { author: 'mid_or_feed', age: '1 hour ago', score: 24, body: 'Correct: load an offline raid before touching Labs presets.' },
      { author: 'ancient_archivist', age: '48 min. ago', score: 11, body: 'The guide covers AR, SMG, and sniper drills. Keep Labs presets conservative after practice.' },
      { author: 'push_first', age: '35 min. ago', score: 8, body: 'Useful distinction. Offline tools are not live-raid features.' },
    ],
  },
  {
    slug: 'how-to-practice-tarkov-cheats-safely', category: 'General', categoryTone: 'purple',
    title: 'How do I practice Tarkov cheats safely before live raids?',
    excerpt: 'Use offline raids to tune ESP and aimbot, then check BattlEye status before queuing PMC.',
    author: 'guide_team', age: '4 hours ago', commentsCount: 2, upvotes: 86, flair: 'Guide Q&A',
    sourceTitle: 'How to use Tarkov cheats safely', sourcePath: '/blog/how-to-use-tarkov-cheats-safely/',
    body: ['Launch Escape from Tarkov in offline mode, load a conservative Lite or Pro preset, and tune ESP range plus aimbot smoothness before any live raid.', 'If anything looks off after a BattlEye patch, stop and check Discord #status before queuing PMC or Labs.'],
    comments: [
      { author: 'pos4_roamer', age: '3 hours ago', score: 17, body: 'Offline first, then a short Factory run with limited ESP distance.' },
      { author: 'carry_curious', age: '2 hours ago', score: 9, body: 'Status banner before every wipe-week launch is non-negotiable.' },
    ],
  },
  {
    slug: 'practice-tarkov-high-ground-safely', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'What is the safest way to practice high-ground spots?',
    excerpt: 'Use Offline or a offline raid with ESP to study sight lines, then fight without staring at overlays.',
    author: 'guide_team', age: '6 hours ago', commentsCount: 2, upvotes: 64, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov Offline tips for aimbot and ESP practice', sourcePath: '/blog/tarkov-offline-practice-tips/',
    body: ['Practice in Offline or a offline raid. Enable ESP boxes briefly to inspect high-ground angles and loot positions, then fight with overlays minimized.', 'Repeat the same zone clear a few times so sight lines stick without waiting for a full Labs match.'],
    comments: [
      { author: 'stack_and_pull', age: '5 hours ago', score: 13, body: 'I peek with ESP on, then disable boxes and re-check the same angle. Helps for high-ground coverage.' },
      { author: 'map_reader', age: '4 hours ago', score: 6, body: 'Replaying the same zone path in Offline beats learning only in live raids.' },
    ],
  },
  {
    slug: 'what-to-check-after-a-tarkov-patch', category: 'Patch Talk', categoryTone: 'orange',
    title: 'What should I check before playing after an Escape from Tarkov patch?',
    excerpt: 'The patch-day checklist recommends checking build status, updating, and testing in a offline raid before queueing.',
    author: 'guide_team', age: '9 hours ago', commentsCount: 2, upvotes: 42, flair: 'Guide Q&A',
    sourceTitle: 'BattlEye patch day checklist', sourcePath: '/blog/battleye-patch-day-checklist/',
    body: ['Check the current build/status notice first. After a game update, wait for a compatible build, update the loader, then verify the setup in a bot or offline raid before returning to live raids.', 'If anything behaves unexpectedly, stop and review the status notes rather than assuming the old setup still applies. The checklist covers the patch-day routine in more detail.'],
    comments: [
      { author: 'farm_pattern', age: '8 hours ago', score: 12, body: 'Testing after the update before Labs is the part I used to skip. Now I check the build note and run a quick offline raid.' },
      { author: 'support_main_5', age: '7 hours ago', score: 7, body: 'Agree. If the build/status has not caught up, wait. A checklist is better than guessing.' },
    ],
  },
  {
    slug: 'tarkov-lite-or-pro-aimbot', category: 'Community', categoryTone: 'green',
    title: 'Lite or Pro: which Tarkov cheat tier includes aimbot?',
    excerpt: 'Our comparison guide breaks down the difference: Lite focuses on ESP; Pro adds aimbot modules.',
    author: 'guide_team', age: '12 hours ago', commentsCount: 1, upvotes: 31, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov Lite vs Pro: feature comparison', sourcePath: '/blog/tarkov-lite-vs-pro/',
    body: ['According to the comparison guide, Lite centers on map awareness features such as player ESP, loot ESP, radar, and stream-proof options. Pro includes those features and adds aimbot tools such as Smooth Aim, Sticky Aim, Bone Priority, and hotkey macros.', 'The best fit depends on which features you need. Read the full comparison before choosing.'],
    comments: [
      { author: 'one_more_game', age: '10 hours ago', score: 10, body: 'The comparison page is useful because it shows which modules are included in each tier instead of only listing headlines.' },
    ],
  },
  {
    slug: 'how-to-practice-weapon-aim-offline', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'How can I practice Tarkov aimbot without a live raid?',
    excerpt: 'Use an offline raid and drill AR, SMG, and sniper profiles with repeatable resets.',
    author: 'guide_team', age: '1 day ago', commentsCount: 2, upvotes: 27, flair: 'Guide Q&A',
    sourceTitle: 'Escape from Tarkov offline raid guide: aim drills before live raids', sourcePath: '/blog/tarkov-offline-raid-guide/',
    body: ['Start an offline raid. Practice one weapon profile at a time—AR, SMG, then sniper—and reset between attempts.', 'For realistic timing, use your Labs smoothness values offline before enabling aimbot in live games. The linked guide covers the full practice workflow.'],
    comments: [
      { author: 'mid_or_feed', age: '20 hours ago', score: 10, body: 'Start with a bot target and repeat the same spray until the tracking feels automatic.' },
      { author: 'ancient_archivist', age: '18 hours ago', score: 5, body: 'Keep Labs presets conservative—offline can hide how snappy your aim looks in clips.' },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}

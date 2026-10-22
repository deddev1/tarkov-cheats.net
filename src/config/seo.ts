import { t } from '../i18n';
import { DISCORD_URL, SITE_DOMAIN as INDEXNOW_HOST_NAME } from './site';
import { getPageSeoEntry } from './pageSeo';

export const SITE_ORIGIN = `https://${t.site.domain}`;

/** Social share image — exact 1200×630 for Open Graph / Twitter. */
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

/** @example @tarkovcheats */
export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

/** Discord always; optional comma-separated profile URLs via PUBLIC_ORG_SAME_AS. */
export function getOrganizationSameAs(): string[] {
  const fromEnv = (import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined)
    ?.split(',')
    .map((entry) => entry.trim())
    .filter(Boolean) ?? [];
  return [...new Set([DISCORD_URL, ...fromEnv])];
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function resolvePageSeo(pathname: string): { title: string; description: string } {
  const entry = getPageSeoEntry(pathname);
  if (entry) return entry;
  return { title: t.site.title, description: t.site.description };
}

export function pageTitle(keyword: string, brand = t.site.name): string {
  const suffix = ` | ${brand}`;
  const max = 60;
  if (`${keyword}${suffix}`.length <= max) return `${keyword}${suffix}`;
  const budget = Math.max(20, max - suffix.length);
  const clipped = keyword.slice(0, budget);
  const atWord = clipped.replace(/\s+\S*$/, '').replace(/[,:;–—-]+$/u, '').trim();
  return `${atWord.length >= 20 ? atWord : clipped.trim()}${suffix}`;
}

/** SERP-safe title + description for forum threads (often thin excerpts / long questions). */
export function forumPageSeo(input: {
  title: string;
  excerpt: string;
  body: string[];
}): { title: string; description: string } {
  const title = pageTitle(input.title);
  const pool = [input.excerpt, ...input.body]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  let description = pool;
  if (description.length < 120) {
    description = `${description} Escape from Tarkov cheat setup help on tarkov-cheats.net.`.trim();
  }
  if (description.length > 160) {
    const clipped = description.slice(0, 157);
    description = `${clipped.replace(/\s+\S*$/, '').replace(/[,:;–—-]+$/u, '').trim()}…`;
  }
  return { title, description };
}

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const RSS_FEED_PATH = '/rss.xml';

/** Used by IndexNow postbuild script. */
export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;

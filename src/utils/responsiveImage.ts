const RASTER_EXT = /\.(png|jpe?g|webp)$/i;

/** 400w covers ~330px card slots at 1x; 640w covers 2x retina. */
export const CARD_IMAGE_WIDTHS = [400, 640] as const;
export const CARD_IMAGE_SIZES = '(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw';
/** Hero slider ~490–640px CSS; include 960 for retina and sharp fallbacks. */
export const HERO_IMAGE_WIDTHS = [640, 960] as const;
export const HERO_IMAGE_SIZES = '(min-width: 1024px) 560px, (min-width: 640px) 70vw, 100vw';
/** Thumbs ~148px CSS; 320w covers 2x DPR without pulling 640/960. */
export const THUMB_IMAGE_WIDTHS = [320, 400] as const;
/** Product / blog main images — prefer 960 as default src for clarity. */
export const DEFAULT_IMAGE_WIDTHS = [640, 960] as const;

export function stripRasterExt(src: string): string {
  return src.replace(RASTER_EXT, '');
}

export function webpSrc(src: string, width: number): string {
  return `${stripRasterExt(src)}-${width}.webp`;
}

export function responsiveSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string {
  return widths.map((width) => `${webpSrc(src, width)} ${width}w`).join(', ');
}

/**
 * Default img src: largest listed width so no-srcset / first-paint clients get a sharp file.
 * Responsive `srcset` still lets the browser pick a smaller candidate when appropriate.
 */
export function defaultWebpSrc(src: string, widths: readonly number[]): string {
  return webpSrc(src, widths[widths.length - 1] ?? 960);
}

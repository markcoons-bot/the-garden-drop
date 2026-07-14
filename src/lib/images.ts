/**
 * Image resolution.
 *
 * Every image on the site is referenced by a KEY, never by a URL. Photography
 * is currently hot-linked from verified free-licence CDNs (see
 * src/content/images.ts and research/images-credits.md). When you shoot your
 * own, replace the entries in src/content/images.ts — nothing else changes.
 */

import { IMAGES, type Img } from '@/content/images';

export type { Img };
export { IMAGES };

const FALLBACK: Img = IMAGES.texture_leaf_macro;

export function img(key: string): Img {
  return IMAGES[key] ?? FALLBACK;
}

/** Build a sized, format-optimised CDN URL. */
export function src(
  key: string,
  opts: { w?: number; h?: number; q?: number; crop?: 'entropy' | 'faces' | 'center' } = {},
): string {
  const image = img(key);
  const { w = 1600, h, q = 78, crop = 'entropy' } = opts;
  if (!image.url.includes('unsplash.com') && !image.url.includes('pexels.com')) return image.url;

  const params = [
    'auto=format',
    'fit=crop',
    `crop=${crop}`,
    `w=${w}`,
    h ? `h=${h}` : '',
    `q=${q}`,
  ].filter(Boolean);
  return `${image.url}?${params.join('&')}`;
}

export function alt(key: string): string {
  return img(key).alt;
}

export function credit(key: string): { name: string; url: string; source: string } {
  const image = img(key);
  return { name: image.credit, url: image.creditUrl, source: image.source };
}

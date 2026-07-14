'use client';

import { useEffect } from 'react';
import type { RetailLink } from '@/lib/types';
import { track } from '@/lib/analytics';
import siteConfig from '~/site.config';

export function RetailLinks({
  links,
  plantSlug,
  affiliateDisclosure,
}: {
  links: RetailLink[];
  plantSlug: string;
  affiliateDisclosure?: string;
}) {
  const hasAffiliate = links.some((l) => l.affiliate);

  if (!links.length) {
    return (
      <p className="text-ink-soft">
        We have no verified retail source for this plant yet. When we do, it will appear here — and
        we will say plainly whether the link earns us anything.
      </p>
    );
  }

  return (
    <div>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              onClick={() =>
                track('retail_link_click', {
                  plant: plantSlug,
                  vendor: link.vendor,
                  affiliate: link.affiliate,
                })
              }
              className="group flex items-baseline justify-between gap-4 border-b border-rule pb-3"
            >
              <span className="text-[1.0625rem] text-ink transition-colors group-hover:text-clay">
                {link.label}
              </span>
              <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                {link.affiliate ? 'Affiliate' : 'No commission'} →
              </span>
            </a>
            {link.priceNote && (
              <p className="mt-1 text-meta text-ink-faint">{link.priceNote}</p>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-meta leading-relaxed text-ink-faint">
        {affiliateDisclosure ??
          (hasAffiliate
            ? siteConfig.policy.affiliateDisclosure
            : 'None of these links earns us a commission. ' + siteConfig.policy.affiliateDisclosure)}
      </p>
    </div>
  );
}

/** Fires plant_view / technique_view once, on mount. */
export function ViewTracker({
  kind,
  slug,
}: {
  kind: 'plant' | 'technique';
  slug: string;
}) {
  useEffect(() => {
    track(kind === 'plant' ? 'plant_view' : 'technique_view', { slug });
  }, [kind, slug]);
  return null;
}

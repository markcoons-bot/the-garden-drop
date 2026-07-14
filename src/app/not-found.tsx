import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '~/site.config';
import { Figure, Kicker } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const ROUTES = [
  {
    href: '/issues',
    label: 'The issues',
    note: `Every issue we have published, newest first. ${siteConfig.cadence}, free.`,
  },
  {
    href: '/plants',
    label: 'The plant index',
    note: 'New introductions, scored on six axes, with the unverified figures marked as unverified.',
  },
  {
    href: '/techniques',
    label: 'The technique index',
    note: 'Methods weighed against the evidence, including the one axis that runs backwards: risk of hype.',
  },
  {
    href: '/about#method',
    label: 'How we rate things',
    note: 'The rubrics, the four verdicts, and the test that would change each one.',
  },
];

export default function NotFound() {
  return (
    <section className="border-b border-rule">
      <div className="shell grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-16 md:py-24">
        <div className="md:col-span-7">
          <Kicker tone="clay">404 — Nothing here</Kicker>
          <h1 className="mt-6 text-display-lg">
            This page does not exist. <span className="italic text-clay">We will not invent one.</span>
          </h1>
          <p className="mt-8 max-w-prose text-lede text-ink-soft">
            Either the address has a typo in it, or something moved, or we linked to it wrongly. If
            it is the last of those, it is a correction and we would like to know — write to{' '}
            <a href={`mailto:${siteConfig.email.editorial}`} className="link">
              {siteConfig.email.editorial}
            </a>{' '}
            and we will fix the link and say that we did.
          </p>

          <nav aria-label="Where to go instead" className="mt-12">
            <h2 className="kicker border-t border-rule pb-2 pt-6">Where to go instead</h2>
            <ul className="divide-rule">
              {ROUTES.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="group block py-5 transition-colors hover:text-clay"
                  >
                    <span className="font-display text-[1.5rem] leading-tight">
                      {route.label}{' '}
                      <span aria-hidden className="text-clay">
                        →
                      </span>
                    </span>
                    <span className="mt-1 block max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                      {route.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn-primary">
              Back to the front page
            </Link>
            <Link href="/submit" className="btn-secondary">
              {siteConfig.cta.submit}
            </Link>
          </div>
        </div>

        <div className="md:col-span-5">
          <Figure
            imageKey="texture_seed_pods"
            ratio="portrait"
            sizes="(max-width: 768px) 100vw, 40vw"
            caption="Empty pods. Appropriate, if not helpful."
          />
        </div>
      </div>
    </section>
  );
}

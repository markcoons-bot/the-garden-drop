import type { Metadata } from 'next';
import siteConfig from '~/site.config';
import { getTechniques } from '@/lib/db';
import { Kicker, Pips } from '@/components/ui';
import TechniqueFilters from '@/components/TechniqueFilters';
import NewsletterBlock from '@/components/NewsletterBlock';

export const metadata: Metadata = {
  title: 'The technique index',
  description:
    'Every gardening method we have interrogated, scored against the published evidence rather than the marketing — including one axis that runs backwards: risk of hype.',
  alternates: { canonical: '/techniques' },
  openGraph: {
    title: `The technique index · ${siteConfig.name}`,
    description:
      'Gardening methods scored against the evidence, not the marketing. Including the hype.',
    url: '/techniques',
  },
};

export default async function TechniquesIndexPage() {
  const techniques = await getTechniques();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="shell pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Kicker tone="clay">The technique index</Kicker>
            <h1 className="mt-6 text-display-lg">
              Methods, weighed against
              <br />
              <span className="italic">the evidence.</span>
            </h1>
          </div>

          <div className="md:col-span-5 md:pt-4">
            <p className="max-w-prose text-lede text-ink-soft">
              A technique earns a place here only once we have read what is actually published about
              it — trials, extension work, peer-reviewed papers — and not before.
            </p>
            <p className="mt-6 max-w-prose text-body leading-relaxed text-ink-soft">
              Some of the most heavily marketed methods in gardening turn out to have the thinnest
              evidence behind them. Where that is true, we say so plainly, and we show our working.
            </p>
            <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-faint">
              {techniques.length} {techniques.length === 1 ? 'method' : 'methods'} assessed
            </p>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* LEGEND — the one inverted axis                                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="shell">
        <aside
          aria-label="How to read the hype risk score"
          className="flex flex-col gap-5 border border-clay/30 bg-clay-wash px-6 py-6 sm:flex-row sm:items-center sm:gap-8 md:px-8"
        >
          <div className="flex shrink-0 items-center gap-3">
            <Pips score={5} inverted />
            <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-clay">
              5 / 5
            </span>
          </div>
          <p className="max-w-prose text-[1.0625rem] leading-relaxed text-ink">
            <strong className="font-semibold">Read the hype risk backwards.</strong> Five of our six
            axes run the usual way — higher is better. <em>Risk of hype</em> is the exception, and
            the only one printed in red: <strong className="font-semibold">5 is the worst score
            on the site</strong>, meaning the gap between what a method is sold on and what the
            evidence supports is at its widest.
          </p>
        </aside>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FILTERS + GRID                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Technique index" className="shell pb-section pt-12 md:pt-16">
        <TechniqueFilters techniques={techniques} />
      </section>

      <NewsletterBlock source="techniques_index" />
    </>
  );
}

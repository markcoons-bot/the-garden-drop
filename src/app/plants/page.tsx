import type { Metadata } from 'next';
import siteConfig from '~/site.config';
import { getPlants } from '@/lib/db';
import { Kicker } from '@/components/ui';
import PlantFilters from '@/components/PlantFilters';
import NewsletterBlock from '@/components/NewsletterBlock';

export const metadata: Metadata = {
  title: 'The plant index',
  description:
    'Every new plant introduction we have assessed, in one searchable record: cultivar, breeder, release channel, zones, and a verdict — with the unpublished figures marked as unpublished.',
  alternates: { canonical: '/plants' },
  openGraph: {
    title: `The plant index · ${siteConfig.name}`,
    description:
      'A permanent, searchable record of new plant introductions — and an honest verdict on each.',
    url: '/plants',
  },
};

export default async function PlantsIndexPage() {
  const plants = await getPlants();

  const years = plants.map((p) => p.releaseYear);
  const newest = years.length > 0 ? Math.max(...years) : new Date().getFullYear();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="shell pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Kicker tone="clay">The plant index</Kicker>
            <h1 className="mt-6 text-display-lg">
              Everything genuinely new,
              <br />
              <span className="italic">kept on the record.</span>
            </h1>
          </div>

          <div className="md:col-span-5 md:pt-4">
            <p className="max-w-prose text-lede text-ink-soft">
              The newsletter finds you every other Thursday. This is the other half: a permanent,
              searchable record of new plant introductions, which does not scroll away and does not
              quietly change its mind.
            </p>
            <p className="mt-6 max-w-prose text-body leading-relaxed text-ink-soft">
              Each entry carries the cultivar code, the breeder, the year <em>and the channel</em> —
              the single biggest trap on this beat — and a verdict with the test that would change
              it. Where an introducer does not publish a figure, the index says so rather than
              inventing one.
            </p>
            <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-faint">
              {plants.length} {plants.length === 1 ? 'entry' : 'entries'} · newest introductions:{' '}
              {newest}
            </p>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* FILTERS + GRID                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="Plant index" className="shell pb-section">
        <PlantFilters plants={plants} />
      </section>

      <NewsletterBlock source="plants_index" />
    </>
  );
}

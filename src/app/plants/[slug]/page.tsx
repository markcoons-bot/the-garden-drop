import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import siteConfig from '~/site.config';
import { getIssuesForPlant, getPlant, getPlants } from '@/lib/db';
import { alt, src } from '@/lib/images';
import {
  PLANT_SCORE_LABELS,
  type Availability,
  type Plant,
  type PlantScores,
  type Sun,
  type Water,
} from '@/lib/types';
import {
  ConfidenceTag,
  Figure,
  Kicker,
  Meta,
  Prose,
  ScoreRow,
  SectionHead,
  SourceList,
  VerdictBadge,
  VerdictPanel,
} from '@/components/ui';
import { IssueCard } from '@/components/cards';
import { RetailLinks, ViewTracker } from '@/components/TrackedLinks';
import NewsletterBlock from '@/components/NewsletterBlock';

// ---------------------------------------------------------------------------
// Static generation + metadata
// ---------------------------------------------------------------------------

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const plants = await getPlants();
  return plants.map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plant = await getPlant(slug);
  if (!plant) return { title: 'Plant not found' };

  const title = plant.tradeName ?? plant.cultivar ?? plant.commonName;

  return {
    title,
    description: plant.standfirst,
    alternates: { canonical: `/plants/${plant.slug}` },
    openGraph: {
      type: 'article',
      title: `${title} · ${siteConfig.name}`,
      description: plant.standfirst,
      url: `/plants/${plant.slug}`,
      images: [
        {
          url: src(plant.imageKey, { w: 1200, h: 630 }),
          width: 1200,
          height: 630,
          alt: alt(plant.imageKey),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${siteConfig.name}`,
      description: plant.standfirst,
      images: [src(plant.imageKey, { w: 1200, h: 630 })],
    },
  };
}

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

const SUN_LABEL: Record<Sun, string> = {
  full: 'Full sun',
  part: 'Part sun',
  shade: 'Shade',
  'full-to-part': 'Full sun to part shade',
  'part-to-shade': 'Part shade to shade',
};

const WATER_LABEL: Record<Water, string> = {
  low: 'Low',
  average: 'Average',
  high: 'High',
};

const AVAILABILITY_LABEL: Record<Availability, string> = {
  retail: 'In retail',
  limited: 'Limited release',
  'trade-only': 'Trade only',
  'commercial-only': 'Commercial growers only',
  'not-yet': 'Not yet released',
};

const NATIVE_LABEL: Record<Plant['nativeStatus'], string> = {
  native: 'Native species',
  'cultivar-of-native': 'Cultivar of a native',
  'non-native': 'Non-native',
  hybrid: 'Hybrid',
};

const CHANNEL_LABEL: Record<NonNullable<Plant['releaseChannel']>, string> = {
  retail: 'retail release',
  wholesale: 'wholesale release',
  trade: 'trade release',
  'commercial licence': 'commercial licence',
};

/**
 * The word we print when nobody publishes the figure. It is set in the signal
 * colour, not greyed out: this is a finding, not a gap.
 */
function Unverified() {
  return (
    <span className="font-display italic text-clay">Unverified</span>
  );
}

const SCORE_KEYS = Object.keys(PLANT_SCORE_LABELS) as (keyof PlantScores)[];

// ---------------------------------------------------------------------------

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plant = await getPlant(slug);
  if (!plant) notFound();

  const issues = await getIssuesForPlant(plant.slug);

  const headline = plant.tradeName ?? plant.cultivar ?? plant.commonName;
  const channel = plant.releaseChannel ? CHANNEL_LABEL[plant.releaseChannel] : undefined;

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: 'Common name', value: plant.commonName },
    {
      label: 'Botanical name',
      value: <span className="font-display italic">{plant.botanicalName}</span>,
    },
    {
      label: 'Cultivar',
      value: plant.cultivar ? (
        <span className="font-mono text-[0.9375rem]">{plant.cultivar}</span>
      ) : (
        <>
          <Unverified />
          <ConfidenceTag level="unverified" />
        </>
      ),
    },
    {
      label: 'Breeder / introducer',
      value: plant.breederUrl ? (
        <a
          href={plant.breederUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet text-ink"
        >
          {plant.breeder}
        </a>
      ) : (
        plant.breeder
      ),
    },
    {
      label: 'Release',
      value: (
        <>
          {plant.releaseYear}
          {channel ? <span className="text-ink-soft"> · {channel}</span> : null}
        </>
      ),
    },
    {
      label: 'Zones',
      value: (
        <>
          <span className={plant.zonesConfidence === 'unverified' ? 'text-clay' : undefined}>
            {plant.zones}
          </span>
          <ConfidenceTag level={plant.zonesConfidence} />
        </>
      ),
    },
    {
      label: 'Size',
      value: (
        <>
          <span className={plant.sizeConfidence === 'unverified' ? 'text-clay' : undefined}>
            {plant.size}
          </span>
          <ConfidenceTag level={plant.sizeConfidence} />
        </>
      ),
    },
    { label: 'Sun', value: SUN_LABEL[plant.sun] },
    {
      label: 'Water',
      value:
        plant.water === 'unverified' ? (
          <>
            <Unverified />
            <ConfidenceTag level="unverified" />
          </>
        ) : (
          WATER_LABEL[plant.water]
        ),
    },
    {
      label: 'Edible / ornamental',
      value: [plant.edible ? 'Edible' : null, plant.ornamental ? 'Ornamental' : null]
        .filter(Boolean)
        .join(' · '),
    },
    {
      label: 'Container suitable',
      value:
        plant.containerSuitable === 'unverified' ? (
          <>
            <Unverified />
            <ConfidenceTag level="unverified" />
          </>
        ) : plant.containerSuitable ? (
          'Yes'
        ) : (
          'No'
        ),
    },
    { label: 'Native status', value: NATIVE_LABEL[plant.nativeStatus] },
    {
      label: 'Availability',
      value: (
        <>
          {AVAILABILITY_LABEL[plant.availability]}
          {plant.availabilityNote && (
            <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-soft">
              {plant.availabilityNote}
            </span>
          )}
        </>
      ),
    },
  ];

  return (
    <article>
      <ViewTracker kind="plant" slug={plant.slug} />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <header className="pt-12 md:pt-20">
        <div className="shell">
          <div className="max-w-4xl">
            <Kicker tone="clay">
              Plant · {plant.releaseYear}
              {channel ? ` ${channel}` : ''}
            </Kicker>
            <h1 className="mt-6 text-display-lg">{headline}</h1>
            <p className="mt-4 font-display text-[clamp(1.375rem,2.4vw,2rem)] italic leading-snug text-ink-soft">
              {plant.botanicalName}
            </p>
            {plant.cultivar && (
              <p className="mt-3 font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-ink-faint">
                {plant.cultivar}
              </p>
            )}
            <p className="mt-8 max-w-prose text-lede text-ink">{plant.standfirst}</p>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[100rem] px-gutter md:mt-16">
          <Figure imageKey={plant.imageKey} ratio="cinema" priority sizes="100vw" />
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* THE CLAIM — the verdict, visible immediately                        */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="The claim" className="mt-14 border-y border-rule bg-paper-warm md:mt-20">
        <div className="shell grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:items-center md:gap-12">
          <div className="md:col-span-3">
            <Kicker tone="clay">The claim</Kicker>
            <div className="mt-4">
              <VerdictBadge verdict={plant.verdict} />
            </div>
          </div>
          <p className="font-display text-display-sm leading-tight md:col-span-9">
            {plant.verdictLine}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE FACTS                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section aria-labelledby="facts-heading" className="shell py-section">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <Kicker tone="clay">On the record</Kicker>
            <h2 id="facts-heading" className="mt-4 text-display-sm">
              The facts, and their provenance
            </h2>
            <p className="mt-4 max-w-prose text-[1rem] leading-relaxed text-ink-soft">
              {siteConfig.policy.unverified}
            </p>
          </div>
          <div className="md:col-span-9">
            <Meta items={facts} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE ASSESSMENT                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell pb-section">
        <SectionHead kicker="Assessment" title="What is genuinely new" />
        <Prose body={plant.whatIsNew} />

        <div className="mt-20">
          <SectionHead kicker="The plant" title="Description" />
          <Prose body={plant.description} />
        </div>

        {plant.heatNote && (
          <div className="mt-20">
            <SectionHead kicker="Climate" title="Climate note" />
            <div className="border-l-2 border-clay bg-clay-wash/50 py-6 pl-6 md:pl-8">
              <Prose body={plant.heatNote} />
            </div>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE SCORE                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="The editorial score" className="border-t border-rule bg-paper-warm py-section">
        <div className="shell">
          <SectionHead
            kicker="The editorial score"
            title="Six axes, scored one to five"
            intro="The scores are editorial, not laboratory. Each is a judgement made against published evidence and independent trials, never against the press release — and each one carries the note that produced it."
          />
          <div className="border-b border-rule">
            {SCORE_KEYS.map((key) => (
              <ScoreRow key={key} label={PLANT_SCORE_LABELS[key]} line={plant.scores[key]} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE VERDICT                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell py-section">
        <VerdictPanel
          verdict={plant.verdict}
          line={plant.verdictLine}
          body={plant.verdictBody}
          howWeWouldTestIt={plant.howWeWouldTestIt}
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHERE TO BUY                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-rule py-section">
        <div className="shell grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Kicker tone="clay">Where to buy</Kicker>
            <h2 className="mt-4 text-display-sm">If you decide to try it</h2>
            <p className="mt-4 max-w-prose text-[1rem] leading-relaxed text-ink-soft">
              We take no payment for coverage. Every link below is labelled with whether it earns us
              anything — and it never, in either direction, moves a verdict.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <RetailLinks
              links={plant.whereToBuy}
              plantSlug={plant.slug}
              affiliateDisclosure={plant.affiliateDisclosure}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* RELATED ISSUES                                                      */}
      {/* ------------------------------------------------------------------ */}
      {issues.length > 0 && (
        <section className="border-t border-rule bg-paper-warm py-section">
          <div className="shell">
            <SectionHead
              kicker="In the magazine"
              title="Related issues"
              intro="Where this plant has appeared, and what we said about it at the time."
              action={{ label: 'All issues', href: '/issues' }}
            />
            <ul className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {issues.map((issue) => (
                <li key={issue.id}>
                  <IssueCard issue={issue} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* SOURCES                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell py-section">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            <SourceList sources={plant.sources} />
          </div>
          <div className="md:col-span-4">
            <p className="border-t border-rule pt-6 text-[1rem] leading-relaxed text-ink-soft">
              Found something we got wrong? Corrections are published, not quietly patched.{' '}
              <Link href="/about#corrections" className="link">
                Read the corrections policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <NewsletterBlock source={`plant_${plant.slug}`} />
    </article>
  );
}

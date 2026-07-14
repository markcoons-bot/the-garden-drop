import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import siteConfig from '~/site.config';
import { getIssuesForTechnique, getTechnique, getTechniques } from '@/lib/db';
import { alt, src } from '@/lib/images';
import { TECHNIQUE_SCORE_LABELS, type TechniqueScores } from '@/lib/types';
import {
  EvidenceBadge,
  Figure,
  Inline,
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
import { ViewTracker } from '@/components/TrackedLinks';
import NewsletterBlock from '@/components/NewsletterBlock';

// ---------------------------------------------------------------------------
// Static generation + metadata
// ---------------------------------------------------------------------------

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const techniques = await getTechniques();
  return techniques.map((technique) => ({ slug: technique.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const technique = await getTechnique(slug);
  if (!technique) return { title: 'Technique not found' };

  return {
    title: technique.name,
    description: technique.standfirst,
    alternates: { canonical: `/techniques/${technique.slug}` },
    openGraph: {
      type: 'article',
      title: `${technique.name} · ${siteConfig.name}`,
      description: technique.standfirst,
      url: `/techniques/${technique.slug}`,
      images: [
        {
          url: src(technique.imageKey, { w: 1200, h: 630 }),
          width: 1200,
          height: 630,
          alt: alt(technique.imageKey),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${technique.name} · ${siteConfig.name}`,
      description: technique.standfirst,
      images: [src(technique.imageKey, { w: 1200, h: 630 })],
    },
  };
}

const SCORE_KEYS = Object.keys(TECHNIQUE_SCORE_LABELS) as (keyof TechniqueScores)[];

// ---------------------------------------------------------------------------

export default async function TechniquePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const technique = await getTechnique(slug);
  if (!technique) notFound();

  const issues = await getIssuesForTechnique(technique.slug);

  return (
    <article>
      <ViewTracker kind="technique" slug={technique.slug} />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <header className="pt-12 md:pt-20">
        <div className="shell">
          <div className="max-w-4xl">
            <Kicker tone="clay">Technique Lab</Kicker>
            <h1 className="mt-6 text-display-lg">{technique.name}</h1>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <EvidenceBadge level={technique.evidenceLevel} />
              <VerdictBadge verdict={technique.verdict} />
            </div>
            <p className="mt-8 max-w-prose text-lede text-ink">{technique.standfirst}</p>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[100rem] px-gutter md:mt-16">
          <Figure imageKey={technique.imageKey} ratio="cinema" priority sizes="100vw" />
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* WHAT IT IS / WHAT IT CLAIMS                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell py-section">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-6">
            <SectionHead kicker="The method" title="What it is" />
            <Prose body={technique.whatItIs} />
          </div>
          <div className="md:col-span-6">
            <SectionHead kicker="The pitch" title="What it claims to solve" />
            <Prose body={technique.problemItClaimsToSolve} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE EVIDENCE — the most important block on the page                 */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label="The evidence"
        className="border-y border-ink/15 bg-paper-warm py-section"
      >
        <div className="shell">
          <div className="flex flex-col gap-6 border-b border-rule pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Kicker tone="clay">The evidence</Kicker>
              <h2 className="mt-3 text-display-md">What the research actually shows</h2>
            </div>
            <div className="shrink-0">
              <EvidenceBadge level={technique.evidenceLevel} />
            </div>
          </div>

          {/*
            The evidence gets its own typography: a wider measure and larger type
            than anything else on the page. It is the reason the page exists, so
            it should read like the reason the page exists.
          */}
          <div className="mt-10 max-w-[72ch] md:mt-12">
            {technique.evidenceSummary
              .trim()
              .split(/\n{2,}/)
              .map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-7 text-[1.25rem] leading-[1.8] text-ink last:mb-0 md:text-[1.375rem]"
                >
                  <Inline text={paragraph.trim()} />
                </p>
              ))}
          </div>

          <p className="mt-10 max-w-prose border-t border-rule pt-6 text-meta leading-relaxed text-ink-faint">
            Every claim above is traceable to the sources at the foot of this page. Where the
            literature is thin, contested, or simply absent, we say so rather than reaching for the
            press release.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HOW TO DO IT                                                        */}
      {/* ------------------------------------------------------------------ */}
      {technique.instructions.length > 0 && (
        <section className="shell py-section">
          <SectionHead
            kicker="Practice"
            title="How to actually do it"
            intro="The version we would follow ourselves — no steps invented, none quietly skipped."
          />
          <ol className="max-w-prose">
            {technique.instructions.map((step, i) => (
              <li
                key={i}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-rule py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-[0.875rem] tracking-[0.1em] text-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-body-lg leading-[1.75] text-ink">
                  <Inline text={step} />
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* ADVANTAGES / LIMITATIONS                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-rule py-section">
        <div className="shell grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="kicker border-t border-rule pb-6 pt-6 text-moss">Advantages</h2>
            <ul className="space-y-5">
              {technique.advantages.map((item, i) => (
                <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-3">
                  <span aria-hidden className="mt-3.5 h-px w-3 bg-moss" />
                  <p className="text-body leading-relaxed text-ink">
                    <Inline text={item} />
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="kicker border-t border-rule pb-6 pt-6 text-clay">Limitations</h2>
            <ul className="space-y-5">
              {technique.limitations.map((item, i) => (
                <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-3">
                  <span aria-hidden className="mt-3.5 h-px w-3 bg-clay" />
                  <p className="text-body leading-relaxed text-ink">
                    <Inline text={item} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE PRACTICALITIES                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-rule py-section">
        <div className="shell grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <Kicker tone="clay">The practicalities</Kicker>
            <h2 className="mt-4 text-display-sm">What it costs you</h2>
          </div>
          <div className="md:col-span-9">
            <Meta
              items={[
                { label: 'Cost', value: technique.costNote },
                { label: 'Difficulty', value: technique.difficultyNote },
                { label: 'Climate fit', value: technique.climateFit },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE SCORE — hype risk runs backwards                                */}
      {/* ------------------------------------------------------------------ */}
      <section aria-label="The editorial score" className="border-t border-rule bg-paper-warm py-section">
        <div className="shell">
          <SectionHead
            kicker="The editorial score"
            title="Six axes, scored one to five"
            intro="Five of these run the usual way: higher is better. Risk of hype is the exception — it is printed in red, it runs backwards, and 5 is the worst score on the site."
          />
          <div className="border-b border-rule">
            {SCORE_KEYS.map((key) => (
              <ScoreRow
                key={key}
                label={TECHNIQUE_SCORE_LABELS[key]}
                line={technique.scores[key]}
                inverted={key === 'hypeRisk'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE VERDICT                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="shell py-section">
        <VerdictPanel
          verdict={technique.verdict}
          line={technique.verdictLine}
          body={technique.verdictBody}
        />
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
              intro="Where this method has been tested, argued with, or written up."
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
            <SourceList sources={technique.sources} />
          </div>
          <div className="md:col-span-4">
            <p className="border-t border-rule pt-6 text-[1rem] leading-relaxed text-ink-soft">
              Know a study we have missed, or a trial that contradicts this? Send it to us — a
              technique verdict is a standing invitation to be proved wrong.{' '}
              <Link href="/about#method" className="link">
                How we rate things
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <NewsletterBlock source={`technique_${technique.slug}`} />
    </article>
  );
}

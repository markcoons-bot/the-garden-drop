import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getExpert, getIssue, getIssues, getStory, getTechnique } from '@/lib/db';
import { alt, src } from '@/lib/images';
import {
  ConfidenceTag,
  Figure,
  Kicker,
  Prose,
  ResearchRequired,
  SectionHead,
  SourceList,
  VerdictBadge,
  VerdictPanel,
} from '@/components/ui';
import { DiscoveryItem } from '@/components/cards';
import { EvidenceBadge } from '@/components/ui';
import NewsletterBlock from '@/components/NewsletterBlock';
import { ReadingDepth } from '@/components/Analytics';
import siteConfig from '~/site.config';

export async function generateStaticParams() {
  const issues = await getIssues({ includeDrafts: true });
  return issues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssue(slug, { includeDrafts: true });
  if (!issue) return { title: 'Issue not found' };

  return {
    title: `Issue ${String(issue.number).padStart(2, '0')} — ${issue.title}`,
    description: issue.standfirst,
    alternates: { canonical: `/issues/${issue.slug}` },
    openGraph: {
      type: 'article',
      title: `${issue.title} · ${siteConfig.name}`,
      description: issue.standfirst,
      publishedTime: issue.publishDate,
      images: [{ url: src(issue.coverImageKey, { w: 1200, h: 630 }), width: 1200, height: 630 }],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Drafts and scheduled issues are readable by direct link — a publication
  // should be able to share a proof — but they are never listed or indexed.
  const issue = await getIssue(slug, { includeDrafts: true });
  if (!issue) notFound();

  const [lead, technique, expert, allIssues] = await Promise.all([
    getStory(issue.leadStorySlug),
    getTechnique(issue.techniqueLab.techniqueSlug),
    issue.interview.expertSlug ? getExpert(issue.interview.expertSlug) : Promise.resolve(null),
    getIssues(),
  ]);

  const isLive = issue.status === 'published';
  const next = allIssues.find((i) => i.number === issue.number + 1);
  const prev = allIssues.find((i) => i.number === issue.number - 1);
  const num = String(issue.number).padStart(2, '0');

  return (
    <>
      <ReadingDepth issueSlug={issue.slug} />

      {!isLive && (
        <div className="border-b border-clay/30 bg-clay-wash">
          <div className="shell py-4">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-clay">
              {issue.status === 'scheduled'
                ? `In the schedule — publishing ${formatDate(issue.publishDate)}. Not finished, not indexed, and shared here on purpose.`
                : 'Draft — not published, not indexed.'}
            </p>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* COVER                                                             */}
      {/* ---------------------------------------------------------------- */}
      <header className="relative">
        <div className="relative h-[62vh] min-h-[26rem] w-full overflow-hidden bg-ink md:h-[78vh]">
          <Image
            src={src(issue.coverImageKey, { w: 2400, q: 80 })}
            alt={alt(issue.coverImageKey)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-12 md:pb-16">
              <Kicker tone="paper">
                Issue {num} · {isLive ? formatDate(issue.publishDate) : 'In the schedule'}
              </Kicker>
              <h1 className="mt-4 max-w-4xl text-display-lg text-paper">{issue.title}</h1>
              <p className="mt-6 max-w-2xl text-lede text-paper/80">{issue.standfirst}</p>
            </div>
          </div>
        </div>
        <p className="shell mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
          Placeholder photography — {alt(issue.coverImageKey)}
        </p>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* EDITOR'S INTRO                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-rule py-section">
        <div className="shell grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Kicker tone="clay">Editor’s introduction</Kicker>
            <div className="mt-6 flex flex-wrap gap-2">
              {issue.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-rule px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Prose body={issue.editorsIntro} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* LEAD STORY                                                        */}
      {/* ---------------------------------------------------------------- */}
      {lead && (
        <article className="border-b border-rule py-section">
          <div className="shell">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-3">
                <Kicker tone="clay">The lead story</Kicker>
              </div>
              <div className="md:col-span-9">
                <h2 className="text-display-md leading-[1.05]">{lead.title}</h2>
                <p className="mt-6 max-w-prose text-lede text-ink-soft">{lead.standfirst}</p>
              </div>
            </div>

            {lead.imageKey && (
              <div className="mt-12">
                <Figure imageKey={lead.imageKey} ratio="cinema" sizes="100vw" />
              </div>
            )}

            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-8 md:col-start-3">
                <Prose body={lead.body} />

                {lead.pullQuote && (
                  <blockquote className="my-14 border-y border-rule py-10">
                    <p className="font-display text-display-sm italic leading-[1.25] text-moss">
                      “{lead.pullQuote}”
                    </p>
                  </blockquote>
                )}

                {lead.sources.length > 0 && (
                  <div className="mt-16">
                    <SourceList sources={lead.sources} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* THE DROP                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <SectionHead
            kicker="The Drop"
            title="Five things that are actually new"
            intro="Each one is a real, verifiable introduction or finding. Where a figure is not published by the breeder, we say so rather than guess it."
          />

          {issue.discoveries.length === 0 ? (
            <div className="border border-dashed border-clay/40 bg-clay-wash px-8 py-16 text-center">
              <p className="font-display text-display-sm text-clay">
                {siteConfig.policy.researchRequired}
              </p>
              <p className="mx-auto mt-3 max-w-measure text-ink-soft">
                This issue is in the schedule. The discoveries are reported but not yet finished, and
                we would rather show you the empty frame than fill it with something we cannot stand
                behind.
              </p>
            </div>
          ) : (
            <div>
              {issue.discoveries.map((card, i) => (
                <DiscoveryItem key={`${card.title}-${i}`} card={card} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TECHNIQUE LAB                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-rule bg-paper-warm py-section">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Kicker tone="clay">Technique Lab</Kicker>
            <h2 className="mt-4 text-display-md leading-tight">
              {technique ? technique.name : siteConfig.policy.researchRequired}
            </h2>
            {technique && (
              <div className="mt-6 flex flex-wrap gap-3">
                <EvidenceBadge level={technique.evidenceLevel} />
                <VerdictBadge verdict={technique.verdict} />
              </div>
            )}
            {technique && (
              <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-paper-deep">
                <Image
                  src={src(technique.imageKey, { w: 1200 })}
                  alt={alt(technique.imageKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="text-body-lg leading-relaxed text-ink">{issue.techniqueLab.framing}</p>

            <div className="mt-10 border-t border-rule pt-8">
              <Kicker>The test</Kicker>
              <p className="mt-3 max-w-prose text-body-lg leading-relaxed text-ink-soft">
                {issue.techniqueLab.theTest}
              </p>
            </div>

            {technique && (
              <>
                <div className="mt-10 border-t border-rule pt-8">
                  <Kicker>The evidence, in short</Kicker>
                  <p className="mt-3 max-w-prose leading-relaxed text-ink-soft">
                    {technique.evidenceSummary.split('. ').slice(0, 2).join('. ')}.
                  </p>
                </div>
                <Link
                  href={`/techniques/${technique.slug}`}
                  className="btn-secondary mt-10"
                >
                  Read the full assessment
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WORTH IT?                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-rule py-section">
        <div className="shell">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <Kicker tone="clay" className="!text-center">
                Worth it?
              </Kicker>
              <p className="mt-3 font-mono text-meta uppercase tracking-[0.1em] text-ink-faint">
                {issue.worthIt.subject}
              </p>
            </div>
            <VerdictPanel
              verdict={issue.worthIt.verdict}
              line={issue.worthIt.line}
              body={issue.worthIt.body}
            />
            {issue.worthIt.subjectHref && (
              <div className="mt-6 text-center">
                <Link
                  href={issue.worthIt.subjectHref}
                  className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-clay underline decoration-clay/30 underline-offset-8 hover:decoration-clay"
                >
                  See the full six-axis scoring →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* INTERVIEW                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-rule bg-ink py-section text-paper">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Kicker tone="paper">The interview</Kicker>
            {expert ? (
              <>
                <h2 className="mt-4 font-display text-display-sm text-paper">{expert.name}</h2>
                <p className="mt-2 text-[1rem] leading-snug text-paper/60">{expert.role}</p>
                <p className="text-[1rem] leading-snug text-paper/60">
                  {expert.orgUrl ? (
                    <a
                      href={expert.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
                    >
                      {expert.org}
                    </a>
                  ) : (
                    expert.org
                  )}
                </p>
                <p className="mt-6 border-t border-paper/15 pt-6 text-[0.9375rem] leading-relaxed text-paper/70">
                  {expert.bio}
                </p>
                <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-paper/40">
                  No portrait is shown. We do not put a stock photograph next to a real person’s name.
                </p>
              </>
            ) : (
              <p className="mt-4 font-display text-display-sm text-paper/60">
                {siteConfig.policy.researchRequired}
              </p>
            )}
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-paper/30 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper/70">
                {issue.interview.status === 'secured'
                  ? 'Interview secured'
                  : issue.interview.status === 'requested'
                    ? 'Interview requested — not yet granted'
                    : 'Research required before publication'}
              </span>
            </div>

            <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-paper/80">
              {issue.interview.intro}
            </p>

            {issue.interview.exchanges.length > 0 && (
              <div className="mt-10 space-y-8">
                {issue.interview.exchanges.map((x, i) => (
                  <div key={i} className="border-t border-paper/15 pt-6">
                    <p className="font-display text-[1.375rem] leading-snug text-paper">{x.q}</p>
                    <p className="mt-3 max-w-prose leading-relaxed text-paper/70">{x.a}</p>
                  </div>
                ))}
              </div>
            )}

            {issue.interview.questionsToAsk && issue.interview.questionsToAsk.length > 0 && (
              <div className="mt-10 border-t border-paper/15 pt-8">
                <Kicker tone="paper">The questions we have put to them</Kicker>
                <ol className="mt-6 space-y-6">
                  {issue.interview.questionsToAsk.map((q, i) => (
                    <li key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="font-mono text-[0.8125rem] text-clay-soft">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="max-w-prose font-display text-[1.25rem] leading-snug text-paper">
                        {q}
                      </p>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 max-w-prose text-[0.9375rem] leading-relaxed text-paper/50">
                  We publish the questions rather than invent the answers. If you are the person we
                  are asking — or you can put us in touch — write to{' '}
                  <a
                    href={`mailto:${siteConfig.email.editorial}`}
                    className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
                  >
                    {siteConfig.email.editorial}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* READER ACTION                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-rule py-section">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Kicker tone="clay">Reader action</Kicker>
            <h2 className="mt-4 text-display-md leading-tight">{issue.readerAction.heading}</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="max-w-prose text-body-lg leading-relaxed text-ink-soft">
              {issue.readerAction.intro}
            </p>

            {issue.readerAction.steps.length > 0 && (
              <ol className="mt-10">
                {issue.readerAction.steps.map((step, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-rule py-6"
                  >
                    <span className="font-mono text-[0.8125rem] tracking-[0.1em] text-clay">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="max-w-prose text-[1.0625rem] leading-relaxed text-ink">{step}</p>
                  </li>
                ))}
              </ol>
            )}

            {issue.readerAction.askBack && (
              <div className="mt-10 border border-moss/25 bg-paper-warm p-8">
                <Kicker>Send it back to us</Kicker>
                <p className="mt-3 max-w-prose leading-relaxed text-ink">
                  {issue.readerAction.askBack}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* RESEARCH REQUIRED + SOURCES                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-section">
        <div className="shell grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <ResearchRequired items={issue.researchRequired} />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SourceList sources={issue.sources} />
            <p className="mt-8 text-meta leading-relaxed text-ink-faint">
              Every claim on this page traces to one of these. If you find one that does not, tell us
              and we will correct it at the top of the page —{' '}
              <a href={`mailto:${siteConfig.email.editorial}`} className="link-quiet">
                {siteConfig.email.editorial}
              </a>
              <ConfidenceTag level="verified" />
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PREV / NEXT                                                       */}
      {/* ---------------------------------------------------------------- */}
      <nav aria-label="Issue navigation" className="border-t border-rule">
        <div className="shell grid grid-cols-1 divide-y divide-rule sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="py-10 sm:pr-10">
            {prev ? (
              <Link href={`/issues/${prev.slug}`} className="group block">
                <Kicker>← Issue {String(prev.number).padStart(2, '0')}</Kicker>
                <p className="mt-2 font-display text-[1.5rem] leading-tight transition-colors group-hover:text-clay">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div>
                <Kicker>The beginning</Kicker>
                <p className="mt-2 text-ink-faint">This is where it starts.</p>
              </div>
            )}
          </div>
          <div className="py-10 sm:pl-10 sm:text-right">
            {next ? (
              <Link href={`/issues/${next.slug}`} className="group block">
                <Kicker>Issue {String(next.number).padStart(2, '0')} →</Kicker>
                <p className="mt-2 font-display text-[1.5rem] leading-tight transition-colors group-hover:text-clay">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div>
                <Kicker>Next issue</Kicker>
                <p className="mt-2 text-ink-faint">
                  {siteConfig.cadence}. Put your email in below and it will find you.
                </p>
              </div>
            )}
          </div>
        </div>
      </nav>

      <NewsletterBlock source={`issue_${issue.slug}`} />
    </>
  );
}

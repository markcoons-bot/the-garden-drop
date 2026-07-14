import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '~/site.config';
import { getCurrentIssue, getIssues, getPlants, getTechniques } from '@/lib/db';
import { alt, src } from '@/lib/images';
import { IssueCard, PlantCard, TechniqueCard } from '@/components/cards';
import { Kicker, SectionHead, VerdictBadge } from '@/components/ui';
import { SignupForm } from '@/components/SignupForm';
import NewsletterBlock from '@/components/NewsletterBlock';

export default async function HomePage() {
  const [current, issues, plants, techniques] = await Promise.all([
    getCurrentIssue(),
    getIssues(),
    getPlants(),
    getTechniques(),
  ]);

  const latestPlants = plants.slice(0, 4);
  const latestTechniques = techniques
    .slice()
    .sort((a, b) => b.scores.hypeRisk.score - a.scores.hypeRisk.score)
    .slice(0, 2);
  const olderIssues = issues.filter((i) => i.slug !== current?.slug).slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* MASTHEAD                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative border-b border-rule">
        <div className="shell grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-12 md:gap-16 md:py-24">
          <div className="animate-rise-in md:col-span-6">
            <Kicker tone="clay">{siteConfig.cadence} · Free</Kicker>
            <h1 className="mt-6 text-display-xl">
              New plants.
              <br />
              Better techniques.
              <br />
              <span className="italic text-clay">No recycled</span> advice.
            </h1>
            <p className="mt-8 max-w-measure text-lede text-ink-soft">
              {siteConfig.positioning}
            </p>

            <div className="mt-10 max-w-xl" id="subscribe-top">
              <SignupForm source="homepage_hero" />
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="/plants"
                className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink underline decoration-rule underline-offset-8 transition-colors hover:text-clay hover:decoration-clay"
              >
                {siteConfig.cta.plants} →
              </Link>
              <Link
                href="/techniques"
                className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink underline decoration-rule underline-offset-8 transition-colors hover:text-clay hover:decoration-clay"
              >
                {siteConfig.cta.techniques} →
              </Link>
              <Link
                href="/submit"
                className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink underline decoration-rule underline-offset-8 transition-colors hover:text-clay hover:decoration-clay"
              >
                {siteConfig.cta.submit} →
              </Link>
            </div>
          </div>

          <div className="animate-fade-in md:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep md:aspect-[4/5]">
              <Image
                src={src('hero_dark_bloom', { w: 1400, h: 1750 })}
                alt={alt('hero_dark_bloom')}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
              Placeholder photography — our own commissions begin at launch
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHAT THIS IS                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-rule bg-paper-warm py-section">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Kicker tone="clay">What this is</Kicker>
            <h2 className="mt-4 text-display-md">
              Four questions, asked of everything.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ol className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-2">
              {[
                {
                  q: 'What is new?',
                  a: 'Not new to you — new to the world. A cultivar released this year, a method that did not exist five years ago.',
                },
                {
                  q: 'What actually works?',
                  a: 'Scored against peer-reviewed evidence and independent trials. Never against the press release.',
                },
                {
                  q: 'Who is it for?',
                  a: 'A plant that transforms a Gulf Coast garden may be a disappointment in Minnesota. We say which is which.',
                },
                {
                  q: 'Is it worth trying?',
                  a: 'A verdict, in plain words, with the test that would change our mind printed underneath it.',
                },
              ].map((item, i) => (
                <li key={item.q} className="bg-paper-warm p-8">
                  <span className="font-mono text-[0.75rem] tracking-[0.1em] text-clay">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-[1.5rem] leading-tight">{item.q}</h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-ink-soft">{item.a}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CURRENT ISSUE                                                       */}
      {/* ------------------------------------------------------------------ */}
      {current && (
        <section className="py-section">
          <div className="shell">
            <SectionHead
              kicker="The current issue"
              title={`Issue ${String(current.number).padStart(2, '0')}`}
              action={{ label: 'All issues', href: '/issues' }}
            />

            <Link href={`/issues/${current.slug}`} className="card-hover-media group block">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
                <div className="md:col-span-7">
                  <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
                    <Image
                      src={src(current.coverImageKey, { w: 1800 })}
                      alt={alt(current.coverImageKey)}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center md:col-span-5">
                  <h3 className="font-display text-display-md leading-[1.05]">{current.title}</h3>
                  <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-ink-soft">
                    {current.standfirst}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-rule px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-8 inline-block font-mono text-[0.75rem] uppercase tracking-[0.12em] text-clay">
                    Read Issue {String(current.number).padStart(2, '0')} →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* LATEST DISCOVERIES                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-rule py-section">
        <div className="shell">
          <SectionHead
            kicker="Latest plant discoveries"
            title="What is genuinely new this season"
            intro="Every plant here is a real, verifiable introduction. Where the breeder does not publish a figure, we say so rather than guess it."
            action={{ label: siteConfig.cta.plants, href: '/plants' }}
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {latestPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TECHNIQUES — highest hype risk                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-rule bg-paper-warm py-section">
        <div className="shell">
          <SectionHead
            kicker="Technique Lab"
            title="Where the evidence and the marketing disagree"
            intro="We score every technique on six axes, including one that runs backwards: risk of hype. These two are the worst offenders we have assessed."
            action={{ label: siteConfig.cta.techniques, href: '/techniques' }}
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {latestTechniques.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WORTH IT? — pulled from the current issue                           */}
      {/* ------------------------------------------------------------------ */}
      {current && (
        <section className="border-t border-rule py-section">
          <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Kicker tone="clay">Worth it?</Kicker>
              <h2 className="mt-4 text-display-md">The verdict from Issue {String(current.number).padStart(2, '0')}</h2>
              <p className="mt-4 max-w-prose text-ink-soft">
                Every issue ends with one plain answer. No hedging, no “it depends” — and the test
                that would change our mind, printed underneath.
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <div className="border border-ink/15 bg-paper-warm p-8 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-faint">
                    {current.worthIt.subject}
                  </p>
                  <VerdictBadge verdict={current.worthIt.verdict} />
                </div>
                <p className="mt-6 font-display text-display-sm leading-tight">{current.worthIt.line}</p>
                <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">{current.worthIt.body}</p>
                {current.worthIt.subjectHref && (
                  <Link
                    href={current.worthIt.subjectHref}
                    className="mt-6 inline-block font-mono text-[0.75rem] uppercase tracking-[0.12em] text-clay underline decoration-clay/30 underline-offset-8 hover:decoration-clay"
                  >
                    See the full scoring →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* ARCHIVE                                                             */}
      {/* ------------------------------------------------------------------ */}
      {olderIssues.length > 0 && (
        <section className="border-t border-rule py-section">
          <div className="shell">
            <SectionHead
              kicker="The archive"
              title="Previously"
              intro="The website is the permanent, searchable knowledge base. The newsletter is how each issue finds you."
              action={{ label: 'Browse all issues', href: '/issues' }}
            />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {olderIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* SUBMIT                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-rule bg-ink py-section text-paper">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <Kicker tone="paper">For breeders, growers and gardeners</Kicker>
            <h2 className="mt-4 text-display-md text-paper">Submit something new</h2>
            <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-paper/70">
              If you have bred it, trialled it, or grown it and been surprised by it, we want to know.
              We take no payment for coverage and we will tell you honestly what we think — which is
              precisely why being covered here will be worth something.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Link href="/submit" className="btn-onDark w-full justify-between sm:w-auto">
              {siteConfig.cta.submit} <span aria-hidden>→</span>
            </Link>
            <p className="mt-6 text-meta leading-relaxed text-paper/50">
              We are also looking for the questions nobody is asking. If you know of a claim in this
              industry that has never been tested, tell us — that is the kind of tip we most want.
            </p>
          </div>
        </div>
      </section>

      <NewsletterBlock source="homepage_footer" />
    </>
  );
}

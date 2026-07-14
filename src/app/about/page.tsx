import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '~/site.config';
import {
  PLANT_SCORE_LABELS,
  TECHNIQUE_SCORE_LABELS,
  VERDICT_BLURB,
  VERDICT_LABEL,
  type Verdict,
} from '@/lib/types';
import { Figure, Kicker, SectionHead, VerdictBadge } from '@/components/ui';
import NewsletterBlock from '@/components/NewsletterBlock';

export const metadata: Metadata = {
  title: 'About',
  description:
    'What The Garden Drop is, how we score plants and techniques, what we refuse to publish, and how to correct us.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About · ${siteConfig.name}`,
    description:
      'How we score plants and techniques, what we refuse to publish, and how to correct us.',
    url: '/about',
  },
};

// ---------------------------------------------------------------------------
// Rubric copy. The axis LABELS come from the type system so the page can never
// drift from the scoring the site actually applies.
// ---------------------------------------------------------------------------

const PLANT_AXIS_NOTES: Record<keyof typeof PLANT_SCORE_LABELS, string> = {
  novelty:
    'Is this new to the world, or only new to you? A colour break nobody has achieved before scores 5. A re-badged 2016 introduction with a fresh trademark scores 1, no matter what the tag says.',
  usefulness:
    'What does it let you do that the plant it replaces did not? A shrub that finally stands up in rain is useful. A shrub that is two inches shorter is not.',
  climateResilience:
    'Heat, drought, wet feet, and the fact that the hardiness map was redrawn in 2023. A plant sold as “tough” without a zone range or a heat note does not score well here.',
  easeOfGrowing:
    'Whether an ordinary gardener, on an ordinary Saturday, can keep it alive without a spray programme or a soil chemistry degree.',
  availability:
    'Can you actually buy it? Some of the best genetics in the world are gated behind a fifty-hectare planting minimum. That is worth knowing before you fall in love.',
  valueForMoney:
    'Price against what you get, and against the older variety it is asking you to replace. Where a price is not published, we say so instead of inventing one.',
};

const TECHNIQUE_AXIS_NOTES: Record<keyof typeof TECHNIQUE_SCORE_LABELS, string> = {
  evidenceStrength:
    'What is behind the claim: peer-reviewed trials, extension work, a vendor’s brochure, or a very confident video. A 5 means replicated, independent, and relevant to gardens rather than to a research farm.',
  cost: 'Scored so that 5 is cheap. What it costs to start, and what it costs to keep doing every season — which is the number people forget.',
  difficulty:
    'Scored so that 5 is easy. Not “can it be done”, but “will you still be doing it in August”.',
  likelyBenefit:
    'The size of the effect you can reasonably expect in a home garden, not the effect measured on a research plot with a full-time technician.',
  climateRelevance:
    'Whether it earns its place as summers get hotter and rainfall gets less reliable, and in which regions. A technique can be excellent in Phoenix and pointless in Portland.',
  hypeRisk:
    'The one axis that runs backwards: 5 means the marketing has outrun the evidence by the widest margin we have measured. A technique can be genuinely useful and still score badly here — that is the point. It tells you how carefully to read the packaging.',
};

const VERDICTS: { verdict: Verdict; gloss: string }[] = [
  {
    verdict: 'buy',
    gloss:
      'The improvement is real, it is documented, and you can act on it this season without being an early adopter.',
  },
  {
    verdict: 'watch',
    gloss:
      'The idea is sound and the claim is interesting, but the evidence has not yet been produced where it matters — usually in a garden rather than a trial bed. We will keep pulling the thread.',
  },
  {
    verdict: 'wait',
    gloss:
      'Real, but early. First-generation plants get fixed; first-generation prices come down. Let somebody else pay to find the flaw.',
  },
  {
    verdict: 'skip',
    gloss:
      'The evidence does not support the price or the promise. We say so plainly, and we say what would change our mind.',
  },
];

const REFUSALS: { head: string; body: string }[] = [
  {
    head: 'No invented specifications',
    body: 'If a breeder has not published a mature size, a zone range, or a water requirement, we print “Unverified” and move on. A plausible guess in a specification table is indistinguishable from a fact, which is exactly what makes it dishonest.',
  },
  {
    head: 'No fabricated statistics',
    body: 'Every number on this site traces to a source we fetched and read. Numbers that circulate widely but lead nowhere — “50% less sunburn”, “40% cooler soil” — are named as such and left out of the copy.',
  },
  {
    head: 'No fake testimonials',
    body: 'We publish no reader quotes we did not receive and no grower endorsements we did not solicit. An invented voice is a lie with a friendly face on it.',
  },
  {
    head: 'No paid placement',
    body: 'Nothing appears in these pages because someone paid for it to. Not a plant, not a product, not a technique, not a sentence.',
  },
  {
    head: 'No quotes we did not obtain',
    body: 'Where we have requested an interview and not yet secured it, we publish the questions we intend to ask rather than a paraphrase of what we imagine the answer would be.',
  },
  {
    head: 'No quietly filled gaps',
    body: `Where the reporting is not finished, the page says so. “${siteConfig.policy.researchRequired}” is printed on the page itself, in public, listing exactly what is unresolved.`,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section id="what" className="border-b border-rule">
        <div className="shell grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-16 md:py-24">
          <div className="animate-rise-in md:col-span-7">
            <Kicker tone="clay">About {siteConfig.name}</Kicker>
            <h1 className="mt-6 text-display-lg">
              A gardening publication that is willing to say{' '}
              <span className="italic text-clay">no</span>.
            </h1>
            <p className="mt-8 max-w-prose text-lede text-ink-soft">
              {siteConfig.positioning} Every fortnight we take what the industry has just released —
              a cultivar, a method, a machine — and we ask the only question that matters to the
              person holding the trowel: is this actually better than what you already have?
            </p>
            <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-ink-soft">
              What this is not: a tips column. We do not write “10 ways to grow better tomatoes”,
              because that article has been written ten thousand times and nobody learned anything
              new from the ten thousandth. We do not rewrite press releases. We do not run
              sponsored plants. And we do not pretend to certainty we have not earned — where the
              evidence runs out, the page says so, in print, with your name on the gap.
            </p>
          </div>

          <div className="animate-fade-in md:col-span-5">
            <Figure
              imageKey="hero_greenhouse"
              ratio="portrait"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              caption="Where new plants come from — and where most of the claims about them are made."
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHAT WE COVER                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section id="cover" className="py-section">
        <div className="shell">
          <SectionHead
            kicker="What we cover"
            title="Three things. Only three."
            intro="A narrow beat, reported properly, is worth more than a broad one reported from a search engine."
          />

          <ol className="grid grid-cols-1 gap-px bg-rule md:grid-cols-3">
            {[
              {
                n: '01',
                h: 'New plant releases',
                b: 'Cultivars introduced in the last three seasons — who bred them, what they were bred to fix, where you can get them, and whether the trademark on the tag is hiding a plant from 2016. We follow the release channel, not the marketing calendar: a plant “new for 2026” at retail may have been in the trade for two years.',
              },
              {
                n: '02',
                h: 'New and emerging techniques',
                b: 'Methods that did not exist, or were not accessible, five years ago: biochar charging, robotic weeding, sensor irrigation, the soil-microbiome kit that just landed in your feed. We read the papers. Where there are no papers, that absence is the story.',
              },
              {
                n: '03',
                h: 'A verdict on whether it is worth it',
                b: 'The part most publications leave out. Six scored axes, one plain-English verdict, and — underneath it — the specific test that would change our mind. If we are wrong, we want you to be able to prove it.',
              },
            ].map((item) => (
              <li key={item.n} className="bg-paper p-8 md:p-10">
                <span className="font-mono text-[0.75rem] tracking-[0.1em] text-clay">{item.n}</span>
                <h3 className="mt-3 font-display text-[1.625rem] leading-tight">{item.h}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{item.b}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 border-l-2 border-clay bg-clay-wash p-8 md:p-10">
            <Kicker tone="clay">And explicitly not</Kicker>
            <p className="mt-4 max-w-prose font-display text-[1.5rem] leading-snug text-moss md:text-[1.75rem]">
              We do not publish “10 tomato growing tips”.
            </p>
            <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
              Nor “5 easy houseplants”, nor “what to plant in June”. That advice already exists,
              it is mostly correct, and it is free everywhere. Recycling it would waste your
              fortnight and ours. If a thing is not new, or the claim about it is not testable, it
              does not belong here.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* METHOD                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section id="method" className="scroll-mt-24 border-t border-rule bg-paper-warm py-section">
        <div className="shell">
          <SectionHead
            kicker="How we rate things"
            title="Two rubrics, six axes each, and one number that runs backwards."
            intro="Scores are editorial judgements, not measurements. Publishing the axes is how you can tell whether our judgement is any good."
          />

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Plants -------------------------------------------------- */}
            <div>
              <h3 className="font-display text-display-sm">Plants</h3>
              <p className="mt-3 max-w-prose text-ink-soft">
                Each new plant is scored 1–5 on six axes, and each score carries a written note
                explaining it. The note is the real content; the pips are a summary of it.
              </p>
              <dl className="mt-8">
                {(Object.keys(PLANT_SCORE_LABELS) as (keyof typeof PLANT_SCORE_LABELS)[]).map(
                  (key) => (
                    <div key={key} className="border-t border-rule py-5">
                      <dt className="font-display text-[1.25rem] leading-tight">
                        {PLANT_SCORE_LABELS[key]}
                      </dt>
                      <dd className="mt-1.5 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                        {PLANT_AXIS_NOTES[key]}
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </div>

            {/* Techniques ---------------------------------------------- */}
            <div>
              <h3 className="font-display text-display-sm">Techniques</h3>
              <p className="mt-3 max-w-prose text-ink-soft">
                Same shape, different questions — because a method is not judged by novelty but by
                whether the evidence behind it survives contact with a real garden.
              </p>
              <dl className="mt-8">
                {(
                  Object.keys(TECHNIQUE_SCORE_LABELS) as (keyof typeof TECHNIQUE_SCORE_LABELS)[]
                ).map((key) => (
                  <div key={key} className="border-t border-rule py-5">
                    <dt className="font-display text-[1.25rem] leading-tight">
                      {TECHNIQUE_SCORE_LABELS[key]}
                      {key === 'hypeRisk' && (
                        <span className="ml-2 inline-block border border-clay/40 px-1.5 py-0.5 align-middle font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-clay">
                          Inverted
                        </span>
                      )}
                    </dt>
                    <dd className="mt-1.5 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                      {TECHNIQUE_AXIS_NOTES[key]}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 max-w-prose border border-clay/30 bg-clay-wash p-6 text-[1.0625rem] leading-relaxed text-ink">
                <strong className="font-semibold">Read the pips carefully.</strong> On five of the
                six technique axes, more filled pips are better. On <em>Risk of hype</em>, more
                filled pips are worse: five means the gap between what is claimed and what has been
                shown is as wide as we have seen. It is drawn in a different colour for exactly
                this reason.
              </p>
            </div>
          </div>

          {/* Verdicts --------------------------------------------------- */}
          <div className="mt-20 border-t border-rule pt-12">
            <Kicker tone="clay">The four verdicts</Kicker>
            <h3 className="mt-4 max-w-2xl text-display-sm">
              Every piece ends with one of four words, and none of them is “it depends”.
            </h3>

            <div className="mt-10 grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
              {VERDICTS.map(({ verdict, gloss }) => (
                <div key={verdict} className="bg-paper-warm p-8">
                  <VerdictBadge verdict={verdict} />
                  <h4 className="mt-5 font-display text-[1.375rem] leading-tight">
                    {VERDICT_LABEL[verdict]}
                  </h4>
                  <p className="mt-1 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.1em] text-ink-faint">
                    {VERDICT_BLURB[verdict]}
                  </p>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{gloss}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-6">
                <h4 className="font-display text-display-sm">
                  And every verdict carries the test that would overturn it.
                </h4>
                <p className="mt-4 max-w-prose text-body-lg leading-relaxed text-ink-soft">
                  Underneath each judgement we print <em>how we would test it</em>: the trial, the
                  figure, the site-years, or the interview that would move a “Wait a year” to a
                  “Worth it”. This is not a hedge. It is the opposite — it is the falsifiable part.
                  A verdict you cannot argue with is not a verdict, it is an advertisement.
                </p>
                <p className="mt-4 max-w-prose text-body-lg leading-relaxed text-ink-soft">
                  It also means our scores are allowed to change. When a breeder sends the trial
                  data, when an extension service publishes the numbers, when three seasons of
                  readers report the same failure — we re-score, we date the change, and we say
                  what changed it.
                </p>
              </div>
              <div className="md:col-span-6">
                <Figure
                  imageKey="technique_soil_lab"
                  ratio="landscape"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  caption="Evidence strength is scored against the literature, not against the label."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHAT WE WILL NOT DO                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section id="never" className="border-t border-rule py-section">
        <div className="shell">
          <SectionHead
            kicker="What we will not do"
            title="The rules that make the rest of it worth reading."
            intro="These are not aspirations. They are the constraints the publication is built inside, and breaking one of them is how this masthead would end."
          />

          <ul className="grid grid-cols-1 gap-px bg-rule md:grid-cols-2">
            {REFUSALS.map((item) => (
              <li key={item.head} className="bg-paper p-8">
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-clay" />
                  <h3 className="font-display text-[1.375rem] leading-tight">{item.head}</h3>
                </div>
                <p className="mt-3 pl-7 text-[1.0625rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border border-clay/30 bg-clay-wash p-8">
              <Kicker tone="clay">When a figure is missing</Kicker>
              <p className="mt-3 font-display text-[1.375rem] leading-snug">Unverified.</p>
              <p className="mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                {siteConfig.policy.unverified} It appears on plant pages exactly where a mature
                size or a zone range ought to be. It looks like a hole in the page because it is
                one, and it belongs to the introducer, not to you.
              </p>
            </div>
            <div className="border border-clay/30 bg-clay-wash p-8">
              <Kicker tone="clay">When the reporting is not finished</Kicker>
              <p className="mt-3 font-display text-[1.375rem] leading-snug">
                {siteConfig.policy.researchRequired}.
              </p>
              <p className="mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                Each issue publishes its own list of unresolved questions — the call not yet
                returned, the paper we could not open, the statistic that circulates everywhere and
                originates nowhere. A publication that never admits to a gap is not reporting; it
                is decorating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* INDEPENDENCE                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="independence"
        className="scroll-mt-24 border-t border-rule bg-ink py-section text-paper"
      >
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Kicker tone="paper">Editorial independence</Kicker>
            <h2 className="mt-4 text-display-md text-paper">
              Nobody buys a verdict. Not for any amount.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="max-w-prose text-body-lg leading-relaxed text-paper/75">
              Coverage is decided by the editor and by nobody else. Breeders and brands may submit
              plants, send samples, and answer questions — we hope they do, and there is a{' '}
              <Link href="/submit" className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
                form for it
              </Link>
              . What they may not do is buy a place in an issue, review the copy before it runs, or
              expect that a trial ends in a good verdict. Sending us a plant buys the plant a fair
              test. That is the entire transaction.
            </p>
            <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-paper/75">
              {siteConfig.policy.affiliateDisclosure}
            </p>
            <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-paper/75">
              Sponsorship, where it exists, sits around the journalism and is labelled: an issue may
              be sponsored, a verdict may not. If we ever cannot tell you who paid for something,
              we will not run it. The full terms are on the{' '}
              <Link href="/partner" className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
                partner page
              </Link>
              , written in plain language and short enough to actually read.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CORRECTIONS                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section id="corrections" className="scroll-mt-24 border-t border-rule py-section">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Kicker tone="clay">Corrections policy</Kicker>
            <h2 className="mt-4 text-display-md">
              We will get things wrong. Here is what happens then.
            </h2>
            <p className="mt-6 max-w-prose text-ink-soft">
              A publication that reports on new things, quickly, will make errors. The measure of it
              is not whether the errors happen but what the masthead does in the forty-eight hours
              afterwards.
            </p>
            <div className="mt-10">
              <Figure
                imageKey="hero_hands_soil"
                ratio="landscape"
                sizes="(max-width: 768px) 100vw, 40vw"
                caption="The reader is holding the consequences. That is who a correction is for."
              />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ol className="divide-rule border-t border-rule">
              {[
                {
                  h: 'Tell us',
                  b: (
                    <>
                      Write to{' '}
                      <a href={`mailto:${siteConfig.email.editorial}`} className="link">
                        {siteConfig.email.editorial}
                      </a>{' '}
                      with the page and the error. Breeders: if we have misdescribed your plant,
                      this address goes to a person, not a queue, and you do not need a press
                      officer to use it.
                    </>
                  ),
                },
                {
                  h: 'We correct at the top of the page',
                  b: (
                    <>
                      Not in a footnote, not silently in the HTML. A dated correction notice sits
                      above the story, states what was wrong, and states what is now right. The
                      original error remains legible. Quietly editing a mistake out of existence is
                      a second mistake.
                    </>
                  ),
                },
                {
                  h: 'If the verdict moves, we say the verdict moved',
                  b: (
                    <>
                      A corrected fact that changes a score changes the score, and the change is
                      dated and explained on the page. Our archive is not allowed to look wiser than
                      we were at the time.
                    </>
                  ),
                },
                {
                  h: 'We publish the negative result',
                  b: (
                    <>
                      If we test something and it does not work — including something we were
                      hoping would work, including something we already praised — that is a story
                      and it runs. The failures are more useful to you than the successes, and they
                      are the reason to trust the successes.
                    </>
                  ),
                },
              ].map((step, i) => (
                <li key={step.h} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                  <span className="font-mono text-meta text-clay">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.375rem] leading-tight">{step.h}</h3>
                    <p className="mt-2 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                      {step.b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHO WRITES THIS                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="who"
        className="scroll-mt-24 border-t border-rule bg-paper-warm py-section"
      >
        <div className="shell">
          <SectionHead
            kicker="Who writes this"
            title="The masthead is deliberately empty. It will be filled in public."
            intro="This is a launch mock-up of a publication, built to prove that the standards are workable before a single name is attached to them."
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="max-w-prose text-body-lg leading-relaxed text-ink">
                We are not going to invent a staff for you. No stock-photo horticulturist with a
                borrowed CV, no “team of experts”, no founder’s letter signed by somebody who does
                not exist. That would be the first lie, and this publication is an argument against
                the first lie.
              </p>
              <p className="mt-5 max-w-prose text-body-lg leading-relaxed text-ink-soft">
                What exists today is the method: the rubrics on this page, the sourcing rules, the
                unverified register, the corrections ladder. Those came first on purpose. It is far
                easier to hire into a standard than to impose one afterwards.
              </p>
              <p className="mt-5 max-w-prose text-body-lg leading-relaxed text-ink-soft">
                Every piece we publish will carry a named byline, and every claim inside it will
                carry a source. Where an expert reviews a technique before it runs, they are named
                and their affiliation is stated. Where we could not get someone on the record, the
                page says that too — you will find requested-but-unsecured interviews printed as
                the questions we intend to ask, rather than as answers we imagined.
              </p>
            </div>

            <div className="md:col-span-6">
              <div className="border border-ink/15 bg-paper p-8 md:p-10">
                <Kicker tone="clay">Open invitation</Kicker>
                <h3 className="mt-4 font-display text-display-sm">
                  If you can report to this standard, we want to hear from you.
                </h3>
                <ul className="mt-6 space-y-4">
                  {[
                    'Writers who can read a patent, a trial paper and a press release, and tell the difference between the three.',
                    'Horticulturists, breeders, extension staff and researchers willing to act as expert reviewers on a named basis — including the ones who will tell us our scoring is wrong.',
                    'Growers with trial data nobody has published, and the nerve to let us print the disappointing half of it.',
                    'Photographers. The images on this site are credited placeholders; the commissions are real work waiting to be done.',
                  ].map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.25rem_1fr] gap-3 text-[1.0625rem] leading-relaxed text-ink-soft"
                    >
                      <span aria-hidden className="mt-3 h-px w-3 bg-clay" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-[1.0625rem] leading-relaxed text-ink-soft">
                  Pitches and applications:{' '}
                  <a href={`mailto:${siteConfig.email.editorial}`} className="link">
                    {siteConfig.email.editorial}
                  </a>
                  . Tell us what you think is untested, and how you would test it. That is the whole
                  application.
                </p>
              </div>

              <div className="mt-8">
                <Figure
                  imageKey="texture_leaf_macro"
                  ratio="cinema"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CONTACT                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section id="contact" className="scroll-mt-24 border-t border-rule py-section">
        <div className="shell">
          <SectionHead
            kicker="Contact"
            title="Three addresses. All of them reach a person."
          />

          <div className="grid grid-cols-1 gap-px bg-rule md:grid-cols-3">
            {[
              {
                label: 'General',
                email: siteConfig.email.hello,
                note: 'Questions, feedback, subscription trouble, and the things that fit nowhere else.',
              },
              {
                label: 'Editorial',
                email: siteConfig.email.editorial,
                note: 'Corrections, tips, pitches, expert review, and “you have got my plant wrong”. Read every day.',
              },
              {
                label: 'Partners',
                email: siteConfig.email.partners,
                note: 'Sponsorship, sampling, trial units and research access. It reaches the business side, not the editor.',
              },
            ].map((item) => (
              <div key={item.label} className="bg-paper p-8">
                <Kicker>{item.label}</Kicker>
                <p className="mt-4">
                  <a
                    href={`mailto:${item.email}`}
                    className="font-display text-[1.375rem] leading-tight text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:text-clay hover:decoration-clay"
                  >
                    {item.email}
                  </a>
                </p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/submit"
              className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink underline decoration-rule underline-offset-8 transition-colors hover:text-clay hover:decoration-clay"
            >
              {siteConfig.cta.submit} →
            </Link>
            <Link
              href="/partner"
              className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink underline decoration-rule underline-offset-8 transition-colors hover:text-clay hover:decoration-clay"
            >
              Advertise or partner →
            </Link>
          </div>
        </div>
      </section>

      <NewsletterBlock
        source="about_footer"
        sub={`${siteConfig.newsletter.sub} If the standards on this page are the kind you have been waiting for someone to hold, this is where they land.`}
      />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '~/site.config';
import { Figure, Kicker, SectionHead } from '@/components/ui';
import PartnerForm from '@/components/PartnerForm';

export const metadata: Metadata = {
  title: 'Advertise or partner',
  description:
    'Three honest ways to work with The Garden Drop: sponsor an issue, send us something to trial, or give us research access. We do not sell placement in editorial.',
  alternates: { canonical: '/partner' },
  openGraph: {
    title: `Advertise or partner · ${siteConfig.name}`,
    description: 'Sponsor an issue, send us something to trial, or give us research access.',
    url: '/partner',
  },
};

const OPTIONS = [
  {
    n: '01',
    h: 'Sponsor an issue',
    b: 'One sponsor per issue, named at the top and the foot, in the newsletter and on the issue page. Your name sits around the journalism, never inside it — a sponsored issue reads exactly like an unsponsored one, because the editor does not know what you paid and would not care if he did.',
    fine: 'What it does not buy: a mention of your plants, a favourable verdict, sight of the copy before it runs, or a veto on anything in it.',
  },
  {
    n: '02',
    h: 'Send us plants or products to trial',
    b: 'The most useful thing you can do. We want new introductions in the ground and new gear in real hands — ideally with the trial data you already have, so we can check it against what happens in an ordinary garden rather than a research plot.',
    fine: 'Trialling something does not buy a good verdict. If it fails, we publish the failure, name the product, and print the test we ran. That is the deal, and it is the same deal for everybody.',
  },
  {
    n: '03',
    h: 'Give us access for research or interviews',
    b: 'Breeding programmes, trial grounds, extension researchers, the person who actually ran the experiment. We ask precise questions and we quote accurately. Where we cannot secure an interview, we publish the questions we intended to ask — so it is generally better to talk to us.',
    fine: 'Free. Costs you an hour and gets you reported properly. Where research is missing, we print “Research required before publication” rather than filling the gap for you.',
  },
];

export default function PartnerPage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-rule">
        <div className="shell grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-16 md:py-24">
          <div className="animate-rise-in md:col-span-7">
            <Kicker tone="clay">Advertise or partner</Kicker>
            <h1 className="mt-6 text-display-lg">
              We are new. We will not pretend otherwise.
            </h1>
            <p className="mt-8 max-w-prose text-lede text-ink-soft">
              You will find no subscriber count on this page, no open rate, no “reaching X engaged
              gardeners”. We have not earned those numbers yet, and inventing them would be the
              first thing we tell you that is not true. When we have real figures, audited and
              dated, we will publish them here — including the unflattering ones.
            </p>
            <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-ink-soft">
              What we can offer today is a publication with a spine: a narrow beat, a published
              scoring method, a corrections policy, and a hard rule that placement in editorial is
              not for sale. That rule is the product. A verdict that can be bought is worth nothing
              to a reader — and therefore worth nothing to you.
            </p>
          </div>

          <div className="animate-fade-in md:col-span-5">
            <Figure
              imageKey="technique_potting_bench"
              ratio="landscape"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              caption="Small, new, and in no hurry to sell the one thing that makes it worth reading."
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* OPTIONS                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-rule bg-paper-warm py-section">
        <div className="shell">
          <SectionHead
            kicker="Three ways to work with us"
            title="All three are honest. None of them is a verdict."
            intro="If what you need is a guaranteed positive review, we are the wrong publication and we would rather say so now than take your money."
          />

          <div className="grid grid-cols-1 gap-px bg-rule md:grid-cols-3">
            {OPTIONS.map((option) => (
              <div key={option.n} className="flex flex-col bg-paper-warm p-8 md:p-10">
                <span className="font-mono text-[0.75rem] tracking-[0.1em] text-clay">
                  {option.n}
                </span>
                <h3 className="mt-3 font-display text-[1.625rem] leading-tight">{option.h}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{option.b}</p>
                <p className="mt-6 border-t border-rule pt-4 text-[1rem] leading-relaxed text-clay">
                  {option.fine}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-ink/15 bg-paper p-8 md:p-10">
            <Kicker tone="clay">The line, written down</Kicker>
            <p className="mt-4 max-w-prose font-display text-[1.5rem] leading-snug text-moss md:text-[1.75rem]">
              We will not sell placement in editorial. Not a plant, not a paragraph, not a “featured
              introduction”.
            </p>
            <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
              {siteConfig.policy.affiliateDisclosure}
            </p>
            <p className="mt-4 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
              Sponsorship is labelled every time it appears. Samples are disclosed on the page of
              anything we trial. And if a commercial relationship ever makes a verdict awkward, we
              publish the verdict and disclose the relationship — in that order. The full policy is
              on the{' '}
              <Link href="/about#independence" className="link">
                editorial independence
              </Link>{' '}
              page, and it is short enough that you should read it before you write to us.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* NUMBERS                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-rule py-section">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Kicker tone="clay">Audience</Kicker>
            <h2 className="mt-4 text-display-md">The numbers we will publish, once they exist.</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="max-w-prose text-body-lg leading-relaxed text-ink-soft">
              A media kit is a promise about people you cannot see. Ours will contain subscriber
              count, confirmed opens, click-through on retail links, the zone distribution of the
              list, and how many readers write back — because a publication read by four hundred
              breeders and extension staff is worth more to you than one skimmed by forty thousand
              people who wanted a tomato tip.
            </p>
            <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-ink-soft">
              Until then: ask. Write to{' '}
              <a href={`mailto:${siteConfig.email.partners}`} className="link">
                {siteConfig.email.partners}
              </a>{' '}
              and we will tell you exactly where we are, including if the honest answer is “too
              early to be worth your budget”. That answer costs us a sale and keeps us worth
              believing.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE FORM                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-section">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-display-sm">Get in touch</h2>
            <p className="mt-4 max-w-prose text-ink-soft">
              This form reaches the business side of the publication. It does not reach the editor,
              and the editor does not see it — which is the point.
            </p>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
              Submitting a plant or a technique for coverage is a different thing entirely, it is
              free, and it lives on the{' '}
              <Link href="/submit" className="link">
                submissions page
              </Link>
              .
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  );
}

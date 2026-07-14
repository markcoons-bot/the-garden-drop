import type { Metadata } from 'next';
import Link from 'next/link';
import siteConfig from '~/site.config';
import { Figure, Kicker } from '@/components/ui';
import SubmitForm from '@/components/SubmitForm';

export const metadata: Metadata = {
  title: 'Submit a discovery',
  description:
    'Breeders, growers and gardeners: tell us what is genuinely new. We read everything, we take no payment for coverage, and we publish the verdict either way.',
  alternates: { canonical: '/submit' },
  openGraph: {
    title: `${siteConfig.cta.submit} · ${siteConfig.name}`,
    description:
      'Tell us what is genuinely new. We read everything and we take no payment for coverage.',
    url: '/submit',
  },
};

const WHAT_WE_NEED = [
  {
    h: 'What is genuinely new',
    b: 'Not new to the catalogue — new to the world. If the plant has been in the trade since 2019 and is only now reaching retail, tell us that; we will report it accurately and it will still be interesting. What we cannot use is a fresh trademark on an old plant, presented as a discovery.',
  },
  {
    h: 'What it does that the previous variety did not',
    b: 'This is the sentence we are actually looking for. Stronger stems. Rebloom without deadheading. Fruit set at 95°F. Mildew resistance that has held for six seasons. One concrete improvement, stated plainly, beats a page of copy about a “stunning new addition”.',
  },
  {
    h: 'Zone and size data — or an honest gap',
    b: `USDA range, heat tolerance, mature height and spread, sun, water, container suitability. Where a figure is genuinely unpublished, say so. We will print “Unverified” rather than guess, and we would far rather do that with your knowledge than have you read it cold. ${siteConfig.policy.unverified}`,
  },
  {
    h: 'What you would want us to test',
    b: 'The most useful thing a breeder can send us. If you believe the claim on the tag, tell us how you would prove it: the trial that convinced you, the site-years behind it, the conditions where it fails. We will print that test alongside the verdict — including when we cannot yet run it.',
  },
];

export default function SubmitPage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-rule">
        <div className="shell grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-16 md:py-24">
          <div className="animate-rise-in md:col-span-7">
            <Kicker tone="clay">For breeders, growers and gardeners</Kicker>
            <h1 className="mt-6 text-display-lg">Submit something new.</h1>
            <p className="mt-8 max-w-prose text-lede text-ink-soft">
              If you have bred it, trialled it, or grown it and been surprised by it, we want to
              know. This form goes to the editor. Nothing here is a paid slot, and nothing you send
              us buys a good verdict — which is precisely why being covered here will be worth
              something.
            </p>
            <p className="mt-6 max-w-prose text-body-lg leading-relaxed text-ink-soft">
              We are a small, sceptical publication with a narrow beat: new plant releases, new
              techniques, and an honest answer to whether they are worth it. Read{' '}
              <Link href="/about#method" className="link">
                how we rate things
              </Link>{' '}
              before you send — it will tell you what evidence we will ask for, and it will tell you
              whether you want to be in this publication at all. Most breeders, once they read it,
              do.
            </p>
          </div>

          <div className="animate-fade-in md:col-span-5">
            <Figure
              imageKey="technique_seed_trays"
              ratio="landscape"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              caption="Every introduction started as somebody’s unreasonable idea."
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WHAT WE NEED                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-rule bg-paper-warm py-section">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Kicker tone="clay">What we need from you</Kicker>
            <h2 className="mt-4 text-display-md">Four things, and none of them is a press kit.</h2>
            <p className="mt-6 max-w-prose text-ink-soft">
              We will read the press release if you send it. But the four boxes below are what
              actually determine whether a plant makes an issue — and they are the four that most
              submissions leave out.
            </p>
          </div>

          <ol className="md:col-span-7 md:col-start-6">
            {WHAT_WE_NEED.map((item, i) => (
              <li key={item.h} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-rule py-6">
                <span className="font-mono text-meta text-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-[1.5rem] leading-tight">{item.h}</h3>
                  <p className="mt-2 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE FORM                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-section">
        <div className="shell grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-display-sm">The submission</h2>
            <p className="mt-4 max-w-prose text-ink-soft">
              Ten minutes, honestly filled in, is worth more than an hour of polish. If you do not
              have a figure, leave it blank — a blank is information, and an estimate is not.
            </p>
            <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
              Prefer email? Write to{' '}
              <a href={`mailto:${siteConfig.email.editorial}`} className="link">
                {siteConfig.email.editorial}
              </a>
              . Sponsorship, sampling and trial units are handled separately on the{' '}
              <Link href="/partner" className="link">
                partner page
              </Link>
              .
            </p>
          </div>

          <div className="md:col-span-8">
            <SubmitForm />
          </div>
        </div>
      </section>
    </>
  );
}

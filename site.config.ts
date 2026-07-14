/**
 * THE GARDEN DROP — central configuration.
 *
 * Everything nameable about the publication lives here. Change `name` and the
 * whole site — masthead, metadata, emails, Open Graph images, footer, admin —
 * follows. Nothing else needs editing to rebrand.
 */

export const siteConfig = {
  // --- Identity -------------------------------------------------------------
  name: 'The Garden Drop',
  shortName: 'Garden Drop',
  /** Used in the masthead lockup: the word set in the accent style. */
  nameParts: { lead: 'The Garden', accent: 'Drop' },
  tagline: 'New plants. Better techniques. No recycled gardening advice.',
  positioning:
    'The Garden Drop tracks newly released plants and emerging gardening techniques, then separates genuine progress from marketing noise.',
  description:
    'A discovery publication for people who want to know what is actually new in gardening — new cultivars, new methods, and an honest verdict on whether they are worth your time, money and soil.',

  // --- Contact --------------------------------------------------------------
  email: {
    hello: 'hello@thegardendrop.com',
    editorial: 'editorial@thegardendrop.com',
    partners: 'partners@thegardendrop.com',
  },

  // --- Cadence --------------------------------------------------------------
  cadence: 'Every other Thursday',
  cadenceShort: 'Fortnightly',

  // --- Calls to action ------------------------------------------------------
  cta: {
    primary: 'Get the next drop',
    plants: 'Explore new plants',
    techniques: 'Explore new techniques',
    submit: 'Submit something new',
  },

  // --- Navigation -----------------------------------------------------------
  nav: [
    { label: 'Issues', href: '/issues' },
    { label: 'Plants', href: '/plants' },
    { label: 'Techniques', href: '/techniques' },
    { label: 'About', href: '/about' },
  ],
  footerNav: [
    {
      heading: 'Read',
      links: [
        { label: 'Latest issue', href: '/issues' },
        { label: 'Issue archive', href: '/issues' },
        { label: 'Plant index', href: '/plants' },
        { label: 'Technique index', href: '/techniques' },
      ],
    },
    {
      heading: 'Take part',
      links: [
        { label: 'Submit a discovery', href: '/submit' },
        { label: 'Advertise or partner', href: '/partner' },
        { label: 'How we rate things', href: '/about#method' },
        { label: 'Corrections policy', href: '/about#corrections' },
      ],
    },
    {
      heading: 'About',
      links: [
        { label: 'What we are', href: '/about' },
        { label: 'Who writes this', href: '/about#who' },
        { label: 'Editorial independence', href: '/about#independence' },
        { label: 'Contact', href: '/about#contact' },
      ],
    },
  ],

  // --- Editorial policy strings (used verbatim across the site) --------------
  policy: {
    researchRequired: 'Research required before publication',
    affiliateDisclosure:
      'We take no payment for placement. Where a retail link earns a commission, it is labelled on the plant’s own page — and it never affects a verdict.',
    unverified:
      'Unverified. The introducer has not published this figure, and we will not guess it.',
  },

  // --- Newsletter -----------------------------------------------------------
  newsletter: {
    heading: 'Get the next drop',
    sub: 'One email, every other Thursday. New plants worth knowing about, techniques we have actually interrogated, and a clear verdict on each. Free, and easy to leave.',
    buttonLabel: 'Subscribe',
    confirmation:
      'You are on the list. Check your inbox — there is a short welcome note explaining how to read a Garden Drop verdict.',
    consent:
      'We send the newsletter and nothing else. No list rental, no partner blasts. Unsubscribe in one click.',
  },

  // --- Social / meta --------------------------------------------------------
  locale: 'en_US',
  ogImageAlt: 'The Garden Drop — new plants, better techniques.',

  // --- Analytics ------------------------------------------------------------
  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? '',
    plausibleHost: process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? 'https://plausible.io',
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
    posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
  },

  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const;

export type SiteConfig = typeof siteConfig;
export default siteConfig;

/**
 * EXPERTS
 *
 * These are real, publicly identified people in horticulture, listed with their
 * factual role and organisation, drawn from public sources.
 *
 * TWO RULES, ABSOLUTE:
 *  1. No quotation appears anywhere on this site attributed to any of these
 *     people unless we obtained it or it is cited to a published source.
 *  2. No stock portrait is ever attached to a real person. Where we have no
 *     photograph, we run a typographic card. That is a design decision made in
 *     service of an editorial one.
 */

import type { Expert } from '@/lib/types';

export const experts: Expert[] = [
  {
    id: 'exp_buddy_lee',
    slug: 'buddy-lee',
    name: 'Robert “Buddy” Lee',
    role: 'Director of Plant Innovation',
    org: 'Plant Development Services Inc. (Encore® Azalea)',
    orgUrl: 'https://plantdevelopment.com/',
    bio: 'Created the reblooming azalea category. Beginning in the 1980s, Lee crossed traditional spring-blooming azaleas with the summer-blooming Rhododendron oldhamii, producing plants that set flower buds on the same season’s new growth — the mechanism behind every Encore azalea. Autumn Kiss®, the 37th variety in the collection, took eight to ten years to stabilise and reached consumers in spring 2026.',
    imageIsPlaceholder: true,
  },
  {
    id: 'exp_sam_hoadley',
    slug: 'sam-hoadley',
    name: 'Sam Hoadley',
    role: 'Manager of Horticultural Research',
    org: 'Mt. Cuba Center',
    orgUrl: 'https://mtcubacenter.org/',
    bio: 'Runs the only long-running independent comparative trials of native plants and their cultivars in North America. Mt. Cuba’s January 2026 goldenrod report — three years, 70 types, 50 distinct species — found that eleven of the twelve top performers were straight species rather than cultivars. Its four-year Vernonia trial found the same pattern. The results routinely contradict the industry that sells the plants.',
    imageIsPlaceholder: true,
  },
  {
    id: 'exp_linda_chalker_scott',
    slug: 'linda-chalker-scott',
    name: 'Dr. Linda Chalker-Scott',
    role: 'Extension Urban Horticulturist and Associate Professor',
    org: 'Washington State University',
    orgUrl: 'https://puyallup.wsu.edu/lcs/',
    bio: 'Author of the Horticultural Myths series and the annotated bibliographies that underpin much of our soil coverage — on compost tea, polyacrylamide hydrogels, wood-chip mulch and mycorrhizal inoculants. Her framing on inoculants — “if you build it, they will come” — is the sentence that ought to be printed on the packaging.',
    imageIsPlaceholder: true,
  },
  {
    id: 'exp_margaret_worthington',
    slug: 'margaret-worthington',
    name: 'Dr. Margaret Worthington',
    role: 'Director, Fruit Breeding Program',
    org: 'University of Arkansas System Division of Agriculture',
    orgUrl: 'https://aaes.uada.edu/fruit-breeding/',
    bio: 'Leads the most important blackberry breeding programme in the world — Prime-Ark®, Caddo, Ponca, and the 2023 release Sweet-Ark® Immaculate™, a thornless floricane variety whose distinguishing trait is post-harvest firmness: better than every comparison cultivar after two weeks of refrigerated storage.',
    imageIsPlaceholder: true,
  },
  {
    id: 'exp_hans_hansen',
    slug: 'hans-hansen',
    name: 'Hans Hansen',
    role: 'Director of New Plant Development',
    org: 'Walters Gardens',
    orgUrl: 'https://www.waltersgardens.com/',
    bio: 'The most decorated American perennial breeder on the Chelsea stage, placing in the RHS Plant of the Year top three in two of the last three years. Walters publishes zone and size data that many of its competitors do not — which is why so much of our perennial coverage can be marked “verified.”',
    imageIsPlaceholder: true,
  },
  {
    id: 'exp_emmalea_ernest',
    slug: 'emmalea-ernest',
    name: 'Emmalea Ernest',
    role: 'Associate Scientist, Vegetable Crops',
    org: 'University of Delaware Cooperative Extension',
    orgUrl: 'https://sites.udel.edu/weeklycropupdate/',
    bio: 'Ran the multi-year bell pepper shade-cloth trials that produced the most useful heat-adaptation data available to a home gardener: 30% black cloth, applied from transplant rather than from the first heatwave, tripling marketable yield by increasing fruit size and cutting sunscald.',
    imageIsPlaceholder: true,
  },
  {
    id: 'exp_david_byrne',
    slug: 'david-byrne',
    name: 'Dr. David Byrne',
    role: 'Professor of Horticultural Sciences; lead, “Combating Rose Rosette Disease”',
    org: 'Texas A&M University',
    orgUrl: 'https://roses.tamu.edu/research/combating-rose-rosette-grant/',
    bio: 'Leads the USDA-funded, $4 million, 21-researcher, five-university consortium working on rose rosette disease — the mite-vectored virus that kills roses outright and that no commercially released cultivar yet resists. His group can say, with data, what the rose industry cannot.',
    imageIsPlaceholder: true,
  },
  {
    id: 'exp_charles_dowding',
    slug: 'charles-dowding',
    name: 'Charles Dowding',
    role: 'Grower and author; dig/no-dig trial at Homeacres',
    org: 'Homeacres, Somerset, UK',
    orgUrl: 'https://charlesdowding.co.uk/',
    bio: 'The most influential advocate of no-dig gardening — and, to his credit, the most candid about the limits of his own evidence: he states plainly that his trial “isn’t science in comparison to what a research station would do,” that a statistical analysis found his yield differences not statistically significant, and that his results are “indications, not proof.” We wish more people with a commercial interest wrote that sentence.',
    imageIsPlaceholder: true,
  },
  {
    id: 'exp_megan_mathey',
    slug: 'megan-mathey',
    name: 'Megan Mathey',
    role: 'Plant breeder',
    org: 'Proven Winners ColorChoice / Spring Meadow Nursery',
    orgUrl: 'https://www.provenwinnerscolorchoice.com/',
    bio: 'Breeder of Incrediball Storm Proof™ (Hydrangea arborescens ‘SMNHAGOV’), the 2026 introduction whose product copy volunteers that its flowers are smaller than the plant it replaces — a disclosure rare enough in this industry to be worth an interview on its own.',
    imageIsPlaceholder: true,
  },
];

export const expertsBySlug = Object.fromEntries(experts.map((e) => [e.slug, e]));

/**
 * PLANT INDEX — seeded from research/plants-research.md (13 July 2026).
 *
 * RULES OF THE HOUSE, ENFORCED IN THIS FILE:
 *  1. Nothing is invented. Where an introducer does not publish a figure, the
 *     field says so and `zonesConfidence` / `sizeConfidence` is 'unverified'.
 *  2. Release year is meaningless without a channel. "New for 2026" means
 *     wholesale for one breeder and retail for another. We state which.
 *  3. Every verdict carries the test that would change it.
 *  4. No prices. No fabricated availability. No quotes we did not obtain.
 */

import type { Plant, PlantScores, Source, Verdict } from '@/lib/types';

const s = (
  id: string,
  title: string,
  url: string,
  kind: Source['kind'],
  publisher?: string,
): Source => ({ id, title, url, kind, publisher, accessed: '2026-07-13' });

type Draft = Omit<Plant, 'id' | 'status' | 'updatedAt' | 'ornamental' | 'edible'> &
  Partial<Pick<Plant, 'ornamental' | 'edible' | 'status'>>;

const mk = (p: Draft): Plant => ({
  id: `plant_${p.slug.replace(/-/g, '_')}`,
  ornamental: p.ornamental ?? true,
  edible: p.edible ?? false,
  status: p.status ?? 'published',
  updatedAt: '2026-07-13T09:00:00.000Z',
  ...p,
});

const scores = (
  novelty: [1 | 2 | 3 | 4 | 5, string],
  usefulness: [1 | 2 | 3 | 4 | 5, string],
  climateResilience: [1 | 2 | 3 | 4 | 5, string],
  easeOfGrowing: [1 | 2 | 3 | 4 | 5, string],
  availability: [1 | 2 | 3 | 4 | 5, string],
  valueForMoney: [1 | 2 | 3 | 4 | 5, string],
): PlantScores => ({
  novelty: { score: novelty[0], note: novelty[1] },
  usefulness: { score: usefulness[0], note: usefulness[1] },
  climateResilience: { score: climateResilience[0], note: climateResilience[1] },
  easeOfGrowing: { score: easeOfGrowing[0], note: easeOfGrowing[1] },
  availability: { score: availability[0], note: availability[1] },
  valueForMoney: { score: valueForMoney[0], note: valueForMoney[1] },
});

const V = (v: Verdict) => v;

export const plants: Plant[] = [
  // -------------------------------------------------------------------------
  mk({
    slug: 'incrediball-storm-proof-hydrangea',
    commonName: 'Smooth hydrangea',
    botanicalName: 'Hydrangea arborescens',
    cultivar: "'SMNHAGOV' PP#36,788",
    tradeName: 'Incrediball Storm Proof™',
    breeder: 'Megan Mathey · Proven Winners ColorChoice / Spring Meadow Nursery',
    breederUrl: 'https://www.provenwinnerscolorchoice.com/product/incrediball-storm-proof-hydrangea/',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'shrub',
    imageKey: 'plant_hydrangea',
    standfirst:
      'A smooth hydrangea bred not to flop — and the breeder published the trade-off instead of hiding it.',
    description:
      'Every gardener who has grown ‘Annabelle’ knows the sequence: a heavy June rain, and by evening the whole plant is face-down on the lawn. Incrediball Storm Proof is a stem-strength selection aimed squarely at that failure. Proven Winners rates it 3.5–4 ft tall and wide, hardy in Zones 3–8, flowering on new wood — so it can be cut back by a third in early spring and still bloom.',
    whatIsNew:
      'The novelty is not the flower, it is the stem. And the honest part is what Proven Winners chose to print alongside it: the flowers are SMALLER than the original Incrediball, with quantity compensating for size, and bloom coverage running top to bottom so the plant does not go bare-legged. A breeder who volunteers the downside is a breeder worth reading closely.',
    zones: 'USDA 3–8',
    zonesConfidence: 'verified',
    size: '3.5–4 ft tall × 3–4 ft wide',
    sizeConfidence: 'verified',
    sun: 'full-to-part',
    water: 'average',
    ornamental: true,
    containerSuitable: true,
    nativeStatus: 'cultivar-of-native',
    availability: 'retail',
    availabilityNote:
      'Retail spring 2026 through Proven Winners ColorChoice garden centres and Proven Winners Direct.',
    whereToBuy: [
      {
        id: 'rl_incrediball_pw',
        label: 'Proven Winners ColorChoice — find a retailer',
        url: 'https://www.provenwinnerscolorchoice.com/product/incrediball-storm-proof-hydrangea/',
        vendor: 'Proven Winners',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'Stem strength is an unglamorous target and almost nobody breeds for it. This is real work.'],
      [5, 'It fixes the single most common complaint about the most commonly planted native hydrangea.'],
      [4, 'Zone 3 hardiness and new-wood flowering means a late frost cannot take the season away from you.'],
      [4, 'Cut it back by a third in spring. That is the whole maintenance programme.'],
      [4, 'Broad retail from spring 2026. Widely stocked wherever Proven Winners is stocked.'],
      [4, 'Premium shrub pricing for a plant that replaces one you may already be staking every June.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'The most falsifiable claim in this year’s shrub class — which is exactly why we like it, and exactly why we want to see it through a second summer.',
    verdictBody:
      'Stem-strength claims almost always hold in year one and fail in year three, when the plant is carrying a full flower load on older wood. We would want a hose-and-stopwatch test against ‘Annabelle’ and the original Incrediball after a one-inch rain event, repeated in the second season. Until someone runs that, this is the best-argued new shrub of 2026 rather than a proven one.',
    howWeWouldTestIt:
      'Three plants each of Storm Proof, Incrediball and ‘Annabelle’, same bed, same feed. Photograph after every rain event over 0.5 in. Score flop as degrees off vertical at 2 hours and 24 hours. Repeat in year two, when the plant is carrying its full load.',
    sources: [
      s(
        'src_pw_storm',
        'Incrediball Storm Proof Hydrangea',
        'https://www.provenwinnerscolorchoice.com/product/incrediball-storm-proof-hydrangea/',
        'primary',
        'Proven Winners ColorChoice',
      ),
      s(
        'src_gm_pw2026',
        'Proven Winners ColorChoice flowering shrubs: new 2026 varieties',
        'https://www.greenhousemag.com/news/proven-winners-colorchoice-flowering-shrubs-new-2026-varieties/',
        'trade',
        'Greenhouse Management',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'gatsby-glow-ball-oakleaf-hydrangea',
    commonName: 'Oakleaf hydrangea',
    botanicalName: 'Hydrangea quercifolia',
    cultivar: "'NCHQ1' PP#37,233",
    tradeName: 'Gatsby Glow Ball®',
    breeder: 'Dr. Tom Ranney, NC State University · introduced by Proven Winners ColorChoice',
    breederUrl: 'https://www.provenwinnerscolorchoice.com/product/gatsby-glow-ball-oakleaf-hydrangea/',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'shrub',
    imageKey: 'cover_issue_01_alt',
    standfirst:
      'A 3–4 ft oakleaf hydrangea. The species wants to be 6–8 ft, and that is why people rip it out.',
    description:
      'Oakleaf hydrangea is one of the great American shrubs — lacecap flowers ageing to lime, burgundy autumn foliage, exfoliating winter bark — and it is planted every year by people who have not understood how large it will get. Gatsby Glow Ball is a university-bred dwarf: a dense, ball-shaped habit at roughly half the size, out of Tom Ranney’s programme at NC State.',
    whatIsNew:
      'Size, honestly achieved through breeding rather than through annual amputation. This is the most compact Gatsby yet, and it makes a native southeastern shrub usable in a small garden without the yearly argument between the plant and the path.',
    zones: 'USDA 5–9',
    zonesConfidence: 'verified',
    size: '3–4 ft tall × 3–4 ft wide',
    sizeConfidence: 'verified',
    sun: 'full-to-part',
    water: 'average',
    containerSuitable: true,
    nativeStatus: 'cultivar-of-native',
    availability: 'retail',
    availabilityNote: 'Retail 2026 via Proven Winners ColorChoice.',
    whereToBuy: [
      {
        id: 'rl_gatsby_pw',
        label: 'Proven Winners ColorChoice — plant page',
        url: 'https://www.provenwinnerscolorchoice.com/product/gatsby-glow-ball-oakleaf-hydrangea/',
        vendor: 'Proven Winners',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'A genuine halving of mature size in a species that has resisted compaction.'],
      [5, 'It converts a plant people regret into a plant people can site.'],
      [3, 'Zone 5 is a stem rating. It blooms on OLD wood — a hard winter takes the flowers, not the plant.'],
      [4, 'Do not prune it. That is the instruction, and most people will get it wrong anyway.'],
      [4, 'Retail 2026, broadly distributed.'],
      [4, 'Standard premium shrub price for a plant you will not have to move in five years.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'If you have wanted an oakleaf and did not have the room, this is the one. Just do not prune it, and know that Zone 5 gardeners will lose flowers in a hard year.',
    verdictBody:
      'The size claim is the product, and size claims from a university breeding programme with a named plant patent are about as trustworthy as this beat gets. The caveat is structural, not cosmetic: old-wood bloomers set next year’s flowers this summer, so a Zone 5 winter can quietly cancel a season. In Zones 6–8 we would plant it without hesitation.',
    howWeWouldTestIt:
      'Bud hardiness at the Zone 5 edge, after an open winter with no snow cover. Count flowering shoots per plant in year three, against Gatsby Gal and the straight species.',
    sources: [
      s(
        'src_pw_gatsby',
        'Gatsby Glow Ball Oakleaf Hydrangea',
        'https://www.provenwinnerscolorchoice.com/product/gatsby-glow-ball-oakleaf-hydrangea/',
        'primary',
        'Proven Winners ColorChoice',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet', '05-native-but-designed'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'encore-azalea-autumn-kiss',
    commonName: 'Reblooming azalea',
    botanicalName: 'Rhododendron hybrid',
    cultivar: "'Roblezp' PPAF",
    tradeName: 'Encore® Azalea Autumn Kiss®',
    breeder: 'Robert “Buddy” Lee · Plant Development Services Inc. (PDSI)',
    breederUrl: 'https://encoreazalea.com/products/autumn-kiss-new-for-2026',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'shrub',
    imageKey: 'plant_rhododendron',
    standfirst:
      'The 37th Encore azalea. Eight to ten years in development — and the mechanism behind it is more interesting than the flower.',
    description:
      'Semi-double blooms in a hot-pink-to-pale-pink gradient on a rounded, mid-dwarf habit that PDSI puts at 3–4 ft. It took Buddy Lee eight to ten years to stabilise, and it won a Retailers’ Choice award at Cultivate’25 before reaching consumers in spring 2026.',
    whatIsNew:
      'What is new here is the 37th expression of something genuinely new forty years ago. In the 1980s Buddy Lee crossed traditional spring azaleas with the summer-blooming Rhododendron oldhamii. Encores bloom in spring, then push new growth, then set flower buds on THAT new growth within the same season — which is why they flower again in summer and autumn. Two consequences the marketing under-emphasises: you must prune immediately after the spring bloom or you are cutting off the later flushes, and rebloom is light-dependent — Encore’s own guidance calls for 4–6 hours of direct sun.',
    zones: 'USDA 6a–10',
    zonesConfidence: 'unverified',
    heatNote:
      'Bred in Loxley, Alabama, for the Gulf South. The 6a–10 range is the one we keep seeing repeated, and we could not confirm it on a page published by PDSI — so we have marked it unverified and asked them. Rebloom volume in the north is the larger open question; see our verdict.',
    size: '3–4 ft tall × 3–4 ft wide',
    sizeConfidence: 'reported',
    sun: 'full-to-part',
    water: 'average',
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'retail',
    availabilityNote: 'Growers 2025; consumers spring 2026.',
    whereToBuy: [
      {
        id: 'rl_encore_ak',
        label: 'Encore Azalea — Autumn Kiss',
        url: 'https://encoreazalea.com/products/autumn-kiss-new-for-2026',
        vendor: 'Encore Azalea',
        affiliate: false,
      },
    ],
    scores: scores(
      [3, 'The 37th in a line. The category was the invention; this is a refinement of it — a good one.'],
      [4, 'Three flushes instead of one, if you give it sun and prune it at the right moment.'],
      [4, 'Bred for Gulf heat. Lee reports stems coming through a hard winter without burn; we have not seen the data.'],
      [3, 'It has one rule and most gardeners will break it: prune straight after the spring bloom, or lose the rest.'],
      [5, 'Broad consumer retail from spring 2026.'],
      [4, 'Standard azalea money for a plant that flowers three times, in the right climate.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'In Zones 8–10 with four hours of sun, buy it. In Zone 6, buy it for the spring flower and treat the autumn flush as a bonus rather than a promise.',
    verdictBody:
      'This is the credibility gap in the whole reblooming-azalea category, and nobody has published the data: northern summer and autumn flushes are typically far thinner than catalogue photography implies, because rebloom depends on the plant pushing new growth and setting buds on it before cold shuts the season down. Encore’s own FAQ is unusually candid that stated mature size is “not a maximum height, but a size that is easily maintainable through yearly pruning.” We believe the plant. We would like to see the rebloom counted, at latitude.',
    howWeWouldTestIt:
      'Count flowers in the second and third flush on identical plants in Zone 6b and Zone 8b, same year, same feed. Publish both photographs at the same scale. That single comparison would settle a twenty-year argument.',
    sources: [
      s(
        'src_nm_lee',
        'Encore Azalea Autumn Kiss: Buddy Lee on ten years of breeding',
        'https://www.nurserymag.com/news/encore-azalea-autumn-kiss-buddy-lee-breeder-plant-development-services-pdsi/',
        'trade',
        'Nursery Management',
      ),
      s(
        'src_encore_faq',
        'Encore Azalea — Frequently Asked Questions (pruning and light requirements)',
        'https://encoreazalea.com/planting-care/frequently-asked-questions/',
        'primary',
        'Encore Azalea',
      ),
      s(
        'src_pdsi_ak',
        'Azalea Encore Autumn Kiss — introduction page',
        'https://plantdevelopment.com/introductions/azalea-encore-autumn-kiss/',
        'primary',
        'PDSI',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet', '02-the-heat-proof-garden'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'perfecto-mundo-fuchsia-carpet-azalea',
    commonName: 'Reblooming groundcover azalea',
    botanicalName: 'Rhododendron hybrid',
    tradeName: 'Perfecto Mundo Fuchsia Carpet®',
    cultivar: 'Cultivar code not published',
    breeder: 'Proven Winners ColorChoice',
    breederUrl: 'https://provenwinnersdirect.com/products/perfecto-mundo-fuchsia-carpet-reblooming-azalea',
    releaseYear: 2025,
    releaseChannel: 'retail',
    type: 'shrub',
    imageKey: 'cover_issue_01',
    standfirst:
      'A reblooming azalea that lies down: 1–2 ft tall, 2–2.5 ft wide. And a warning label we wish more breeders wrote.',
    description:
      'A groundcover habit inside a reblooming azalea line — hot pink, spring bloom, a short rest, then flowers until frost. Proven Winners lists it at 1–2 ft tall and 2–2.5 ft wide, in Zones 6–9.',
    whatIsNew:
      'Nobody had put the reblooming trait into a genuinely prostrate, carpeting habit before. It is a different plant for a different job: edging, low massing, the front of a bed where a 4 ft azalea would be absurd.',
    zones: 'USDA 6–9 (hardy to 6b)',
    zonesConfidence: 'verified',
    heatNote:
      'Proven Winners explicitly warns it is “better suited to milder coastal areas of zone 6b than harsh Midwestern sites,” and says not to fertilise after mid-July in 6b. That is unusually honest marketing copy and we would rather quote it than paraphrase it.',
    size: '1–2 ft tall × 2–2.5 ft wide',
    sizeConfidence: 'verified',
    sun: 'full-to-part',
    water: 'average',
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'retail',
    availabilityNote: 'In stock at retail; quart size.',
    whereToBuy: [
      {
        id: 'rl_pmfc',
        label: 'Proven Winners Direct — Perfecto Mundo Fuchsia Carpet',
        url: 'https://provenwinnersdirect.com/products/perfecto-mundo-fuchsia-carpet-reblooming-azalea',
        vendor: 'Proven Winners Direct',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'A prostrate reblooming azalea did not previously exist.'],
      [4, 'Solves a real siting problem — the low, long-flowering evergreen edge.'],
      [3, 'The breeder’s own zone-6b caveat is doing a lot of work. Believe it.'],
      [4, 'Light trim after the spring bloom. New growth is what carries the rebloom.'],
      [5, 'Retail, in stock.'],
      [4, 'Reasonable for a plant that flowers from spring to frost where it is happy.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'A genuinely new habit, sold with a genuinely honest warning. Coastal 6b and warmer: yes. Interior Midwest 6b: believe the label and plant something else.',
    verdictBody:
      'We flag this one as much for the copywriting as the plant. When a breeder tells you where their plant will disappoint you, they are telling you they have trialled it somewhere unglamorous. That is a signal worth more than another five-star adjective.',
    sources: [
      s(
        'src_pw_pmfc',
        'Perfecto Mundo Fuchsia Carpet Reblooming Azalea',
        'https://provenwinnersdirect.com/products/perfecto-mundo-fuchsia-carpet-reblooming-azalea',
        'primary',
        'Proven Winners Direct',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'fire-ball-seedless-burning-bush',
    commonName: 'Burning bush',
    botanicalName: 'Euonymus alatus',
    tradeName: 'Fire Ball Seedless™',
    breeder: 'Spring Meadow Nursery / Proven Winners ColorChoice',
    breederUrl: 'https://www.provenwinnerscolorchoice.com/product/fire-ball-seedless-burning-bush/',
    releaseYear: 2025,
    releaseChannel: 'retail',
    type: 'shrub',
    imageKey: 'plant_dark_foliage',
    standfirst:
      'Marketed as “the only seedless, sterile, non-invasive burning bush.” We have a question about the word sterile.',
    description:
      'The same crimson autumn colour that made Euonymus alatus one of the most planted shrubs in America, in a selection that Proven Winners says will not set seed and therefore will not spread. It won a National Garden Bureau Green Thumb award in 2025.',
    whatIsNew:
      'This is the commercially real version of the “non-invasive cultivar” story — and it is conventional breeding, not gene editing. If it holds up, it is a template: keep the plant people want, remove the behaviour ecologists object to.',
    zones: 'Not published by the introducer',
    zonesConfidence: 'unverified',
    size: 'Not published by the introducer',
    sizeConfidence: 'unverified',
    sun: 'full',
    water: 'average',
    containerSuitable: 'unverified',
    nativeStatus: 'non-native',
    availability: 'retail',
    availabilityNote:
      'Retail. Note that Euonymus alatus is regulated or banned in several US states — check before you plant, sterile or not.',
    whereToBuy: [
      {
        id: 'rl_fireball',
        label: 'Proven Winners ColorChoice — Fire Ball Seedless',
        url: 'https://www.provenwinnerscolorchoice.com/product/fire-ball-seedless-burning-bush/',
        vendor: 'Proven Winners',
        affiliate: false,
      },
    ],
    scores: scores(
      [5, 'A sterile form of a major invasive is one of the most consequential things a breeder can do.'],
      [3, 'Useful only if the sterility claim is validated the way an invasiveness claim should be.'],
      [3, 'Zone data not published. We asked the same question you are asking.'],
      [4, 'It is a burning bush. It will grow in a car park.'],
      [4, 'Retail — but check your state’s regulated-plant list first.'],
      [3, 'Unscored on price; the value depends entirely on whether “sterile” means what you think it means.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'The right idea, and we want it to be true. But sterility claims in ornamentals are usually established by observing seed set for a few years in a few places — not by cytology.',
    verdictBody:
      'Here is the question we are putting to Spring Meadow, and we will print the answer: over how many site-years was seed set observed, in which states, and is the plant male-sterile, female-sterile, or triploid? Several US states already permit otherwise-banned Buddleja hybrids if trials show under 2% viable seed — a threshold, not a zero. “Sterile” is a marketing word until someone defines it, and the breeders can define it if they are asked properly.',
    howWeWouldTestIt:
      'Ask for the trial data. Then, independently: bag branches at flowering, collect and germinate everything, in three states, for three years. This is a tractable experiment and nobody is running it.',
    sources: [
      s(
        'src_pw_fireball',
        'Fire Ball Seedless Burning Bush',
        'https://www.provenwinnerscolorchoice.com/product/fire-ball-seedless-burning-bush/',
        'primary',
        'Proven Winners ColorChoice',
      ),
      s('src_ngb_gt', 'Green Thumb Award winners', 'https://ngb.org/green-thumb-award-winners/', 'trade', 'National Garden Bureau'),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet', '05-native-but-designed'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'rise-up-lilac-days-rose',
    commonName: 'Climbing rose',
    botanicalName: 'Rosa hybrid',
    cultivar: "'ChewLilacdays'",
    tradeName: 'Rise Up Lilac Days®',
    breeder: 'Chris Warner (UK) · introduced by Proven Winners',
    breederUrl: 'https://www.provenwinnerscolorchoice.com/rose-of-the-year-2026/',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'rose',
    imageKey: 'plant_rose',
    standfirst:
      'Proven Winners’ Rose of the Year 2026: a 5–8 ft “mini climber” in a lilac-blue nobody quite achieves.',
    description:
      'Semi-double, strongly fragrant, trainable as a climber or left as a shrub, at 5–8 ft tall and 2–4 ft wide in Zones 4–9. Bred by Chris Warner in the UK, the breeder behind the Rise Up climbing series.',
    whatIsNew:
      'Small climbers are a real gap — most climbing roses want a wall you do not have. The colour is the marketing; the scale is the plant.',
    zones: 'USDA 4–9',
    zonesConfidence: 'verified',
    size: '5–8 ft tall × 2–4 ft wide',
    sizeConfidence: 'verified',
    sun: 'full',
    water: 'average',
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'retail',
    availabilityNote: 'Retail 2026.',
    whereToBuy: [
      {
        id: 'rl_riseup',
        label: 'Proven Winners — Rose of the Year 2026',
        url: 'https://www.provenwinnerscolorchoice.com/rose-of-the-year-2026/',
        vendor: 'Proven Winners',
        affiliate: false,
      },
    ],
    scores: scores(
      [3, 'A small climber in an unusual hue. The hue is the least reliable part.'],
      [4, 'Fits a trellis, an obelisk, a corner — places a full climber cannot go.'],
      [3, 'Zone 4 rated. Whether it reaches 5–8 ft north of Zone 6 is untested in public.'],
      [3, 'It is a rose. Roses are not low-maintenance and we are not going to pretend otherwise.'],
      [4, 'Retail 2026.'],
      [3, '“Disease resistant” is listed as a feature with no trial data on the page.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'A useful size in a colour that will disappoint some people. And note what nobody is claiming.',
    verdictBody:
      'Lilac-and-blue in roses is pH- and temperature-dependent and chronically overstated. But the important thing about the entire 2026 rose class is what is absent from it: not one introducer claims resistance to rose rosette disease — the mite-vectored virus that actually kills roses and that helped cut US garden-rose production from roughly 37 million bushes in 2014 to 25 million in 2019. A three-year, two-site trial of 108 accessions (Windham et al., Pathogens 12:439, 2023) found every major commercial cultivar susceptible to some degree — Knock Out rated moderate. As of July 2026 we can find no evidence that a rose-rosette-resistant cultivar has been commercially released. If anyone tells you their 2026 rose resists RRD, ask them for the data.',
    howWeWouldTestIt:
      'No-spray black spot scoring over two seasons in a humid summer, plus actual hue photographed against a colour card in alkaline and acid soil.',
    sources: [
      s(
        'src_pw_roty',
        'Rose of the Year 2026 — Rise Up Lilac Days',
        'https://www.provenwinnerscolorchoice.com/rose-of-the-year-2026/',
        'primary',
        'Proven Winners',
      ),
      s(
        'src_windham',
        'Windham et al., Pathogens 12:439 (2023) — three-year, two-site field trial of rose rosette disease across 108 rose accessions',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC10052971/',
        'peer-reviewed',
        'Pathogens',
      ),
      s(
        'src_tamu_rrd',
        'Combating Rose Rosette Disease — USDA NIFA SCRI project',
        'https://roses.tamu.edu/research/combating-rose-rosette-grant/',
        'independent',
        'Texas A&M',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'enchanted-meadow-rose',
    commonName: 'Shrub rose',
    botanicalName: 'Rosa hybrid',
    cultivar: "'Radmeadow'",
    tradeName: 'Enchanted Meadow™',
    breeder: 'Will Radler — the breeder of Knock Out',
    breederUrl: 'https://heirloomroses.com/products/enchanted-meadow',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'rose',
    imageKey: 'hero_dark_bloom_alt',
    standfirst:
      'A cream-pink-green rose whose colour shifts with temperature, from the man who bred the most planted rose in America.',
    description:
      'A 3 ft × 3 ft repeat-flowering shrub rose in Zones 5–9, with a colour that runs pinker in cool weather and greener in heat. Listed by Heirloom Roses as an exclusive introduction and by Star Roses among its 2026 introductions — most likely an exclusive going broad.',
    whatIsNew:
      'Green is not a rose colour. A thermally responsive cream-pink-green is genuinely unusual in a landscape shrub rose, and the pedigree — Will Radler, who gave the world Knock Out — means it deserves a look rather than a shrug.',
    zones: 'USDA 5–9',
    zonesConfidence: 'reported',
    size: '3 ft × 3 ft',
    sizeConfidence: 'reported',
    sun: 'full',
    water: 'average',
    containerSuitable: 'unverified',
    nativeStatus: 'non-native',
    availability: 'limited',
    availabilityNote:
      'Release year is genuinely muddled between introducers — we say 2026 and note the ambiguity rather than picking the flattering date.',
    whereToBuy: [
      {
        id: 'rl_enchanted',
        label: 'Heirloom Roses — Enchanted Meadow',
        url: 'https://heirloomroses.com/products/enchanted-meadow',
        vendor: 'Heirloom Roses',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'Temperature-responsive colour in a shrub rose is a real curiosity.'],
      [3, 'Pretty. Whether it is healthy is the open question.'],
      [3, 'The colour shift is a heat response — that is a feature, but it means the plant in the catalogue is not the plant in August.'],
      [2, 'A customer review on the introducer’s own product page reports rust and black spot early on. We are not going to bury that.'],
      [3, 'Limited channels for now.'],
      [3, 'Judgement reserved until someone grows it without a spray programme.'],
    ),
    verdict: V('wait'),
    verdictLine:
      'Fascinating colour, uncertain constitution. From the Knock Out breeder, disease reports deserve daylight, not a footnote.',
    verdictBody:
      'We hold this at Wait for one reason: the most interesting thing about a Radler rose is supposed to be that it does not get sick. A review on the seller’s own page reporting rust and black spot “at first” may mean nothing — establishment year, a bad site, one gardener. But it is the exact claim we would want tested before we tell anyone to buy it, and no-spray trial data does not yet exist in public.',
    howWeWouldTestIt:
      'Two seasons, no fungicide, humid site, scored against Knock Out and a susceptible control. Photograph the colour monthly, against a card.',
    sources: [
      s('src_heirloom_em', 'Enchanted Meadow', 'https://heirloomroses.com/products/enchanted-meadow', 'primary', 'Heirloom Roses'),
      s(
        'src_gpn_star26',
        'Star Roses 2026 varieties — Cultivate preview',
        'https://gpnmag.com/news/star-roses-2026-varieties-cultivate-preview/',
        'trade',
        'GPN',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'rudbeckia-treasure-trove',
    commonName: 'Black-eyed Susan',
    botanicalName: 'Rudbeckia',
    cultivar: "'Treasure Trove'",
    breeder: 'Walters Gardens / Proven Winners',
    breederUrl: 'https://www.waltersgardens.com/photo_essay.php?ID=544',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'perennial',
    imageKey: 'plant_coneflower',
    standfirst:
      '“Highly resistant to Septoria leaf spot” — the most useful, most testable perennial claim of the year.',
    description:
      'A 32–36 in black-eyed Susan for Zones 4–9, full sun to part sun, from Walters Gardens. Wholesale July 2025; retail 2026.',
    whatIsNew:
      'Septoria leaf spot is the reason ‘Goldsturm’ looks like a crime scene every August. A rudbeckia bred to resist it is worth more to an actual gardener than any number of new petal colours.',
    zones: 'USDA 4–9',
    zonesConfidence: 'verified',
    size: '32–36 in tall × 36–42 in wide',
    sizeConfidence: 'verified',
    sun: 'full-to-part',
    water: 'unverified',
    containerSuitable: 'unverified',
    nativeStatus: 'cultivar-of-native',
    availability: 'retail',
    availabilityNote: 'Wholesale July 2025 → retail spring 2026.',
    whereToBuy: [
      {
        id: 'rl_treasuretrove',
        label: 'Walters Gardens — new perennials',
        url: 'https://www.waltersgardens.com/photo_essay.php?ID=544',
        vendor: 'Walters Gardens',
        affiliate: false,
      },
    ],
    scores: scores(
      [3, 'Disease resistance, not novelty for its own sake. Which is the point.'],
      [5, 'If it holds, it removes the single ugliest month in the perennial border.'],
      [4, 'Septoria is a humidity disease. Resistance is a climate-resilience trait in everything but name.'],
      [5, 'A rudbeckia. Plant it and leave.'],
      [4, 'Retail 2026, through Proven Winners channels.'],
      [4, 'Standard perennial pricing for a plant that might not need replacing every third year.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'The right claim, and a measurable one. Walters has not said whether it beats ‘American Gold Rush’ — and that is the only question that matters.',
    verdictBody:
      '‘American Gold Rush’ is the existing resistance benchmark, and it is already widely planted. A new Septoria-resistant rudbeckia that is merely as good as the incumbent is a line extension; one that is better is a genuine upgrade. Walters is silent on the comparison. So we will run it: side by side, in a humid August.',
    howWeWouldTestIt:
      'Treasure Trove vs ‘American Gold Rush’ vs ‘Goldsturm’, three plants each, no fungicide, mid-Atlantic humidity. Score percentage leaf area lesioned on 1 August and 1 September.',
    sources: [
      s(
        'src_walters_544',
        'Walters Gardens — 2026 perennial introductions',
        'https://www.waltersgardens.com/photo_essay.php?ID=544',
        'primary',
        'Walters Gardens',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet', '05-native-but-designed'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'vernonia-prairie-princess',
    commonName: 'Ironweed',
    botanicalName: 'Vernonia',
    cultivar: "'Prairie Princess'",
    breeder: 'Walters Gardens / Proven Winners',
    breederUrl: 'https://www.waltersgardens.com/photo_essay.php?ID=530',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'perennial',
    imageKey: 'plant_allium',
    standfirst:
      'A 28–30 in ironweed. The species is 6–8 ft. And it was not in the trial that would have tested it.',
    description:
      'Compact, mildew-resistant, sturdy-stemmed, holding its foliage all season, in Zones 4–9. Wholesale July 2025; retail 2026.',
    whatIsNew:
      'Ironweed is a magnificent, unusable plant — a late-summer purple that most gardeners cannot site because it is taller than they are. Cutting it to knee height is the difference between a prairie plant and a garden plant.',
    zones: 'USDA 4–9',
    zonesConfidence: 'verified',
    size: '28–30 in tall × 30–36 in wide',
    sizeConfidence: 'verified',
    sun: 'full',
    water: 'unverified',
    containerSuitable: 'unverified',
    nativeStatus: 'cultivar-of-native',
    availability: 'retail',
    whereToBuy: [
      {
        id: 'rl_prairieprincess',
        label: 'Walters Gardens — Prairie Princess',
        url: 'https://www.waltersgardens.com/photo_essay.php?ID=530',
        vendor: 'Walters Gardens',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'A dramatic size reduction in a species nobody has successfully domesticated.'],
      [4, 'Late-summer nectar at a height you can plant. That is genuinely valuable.'],
      [4, 'Prairie genetics. Deep roots, real drought tolerance — though Walters does not publish water needs.'],
      [4, 'Mildew resistance claimed; stems reported sturdy.'],
      [4, 'Retail 2026.'],
      [4, 'Fair, if it performs.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'A good plant arriving through a broken pipeline. Mt. Cuba spent four years trialling 45 ironweeds. This one was not among them.',
    verdictBody:
      'Mt. Cuba Center’s Vernonia trial — four years, 45 selections — found the top performers dominated by straight species and wild ecotypes, and reported that plant health correlated directly with the number of pollinators a plant supported. Prairie Princess reaches retail in 2026 without having been through it. That is not Walters’ fault; it is the structure of the industry. New nativars reach shelves years before anyone independent evaluates them, and one non-profit in Delaware is doing most of the evaluating.',
    howWeWouldTestIt:
      'Pollinator visitation counts against straight-species V. lettermannii and V. angustifolia ‘Plum Peachy’ (Mt. Cuba’s top performer), in 60-second observation windows, across the flowering period.',
    sources: [
      s(
        'src_walters_530',
        'Walters Gardens — 2026 perennial introductions',
        'https://www.waltersgardens.com/photo_essay.php?ID=530',
        'primary',
        'Walters Gardens',
      ),
      s(
        'src_mtcuba_vernonia',
        'Mt. Cuba Center — four-year Vernonia trial results',
        'https://www.greenhousegrower.com/crops/mt-cuba-center-shares-results-from-four-year-vernonia-trial/',
        'independent',
        'Mt. Cuba Center via Greenhouse Grower',
      ),
    ],
    issueSlugs: ['05-native-but-designed'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'spigelia-orange-slices',
    commonName: 'Indian pink',
    botanicalName: 'Spigelia marilandica',
    cultivar: "'Orange Slices'",
    breeder: 'Walters Gardens / Proven Winners',
    breederUrl: 'https://www.waltersgardens.com/photo_essay.php?ID=544',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'perennial',
    imageKey: 'plant_salvia',
    standfirst:
      'A native wildflower that flowers in shade, feeds hummingbirds, and cleans up after itself.',
    description:
      'Red-and-orange tubular flowers on a 16–20 in plant, Zones 5b–9, working from full sun through part shade. Self-cleaning — no deadheading. Walters labels it, explicitly, a native wildflower.',
    whatIsNew:
      'Spigelia is not new. Its availability is. This is a woodland-edge native that most gardeners have never been offered, arriving in a mainstream perennial catalogue with a hummingbird claim attached to it.',
    zones: 'USDA 5b–9',
    zonesConfidence: 'verified',
    size: '16–20 in tall × 16–18 in wide',
    sizeConfidence: 'verified',
    sun: 'part-to-shade',
    water: 'unverified',
    containerSuitable: 'unverified',
    nativeStatus: 'cultivar-of-native',
    availability: 'retail',
    whereToBuy: [
      {
        id: 'rl_spigelia',
        label: 'Walters Gardens — Orange Slices',
        url: 'https://www.waltersgardens.com/photo_essay.php?ID=544',
        vendor: 'Walters Gardens',
        affiliate: false,
      },
    ],
    scores: scores(
      [3, 'A selection, not a revolution — but it brings an under-sold native to a mass channel.'],
      [5, 'Sun to shade, hummingbirds, no deadheading. There are not many plants that do all three.'],
      [4, 'Southeastern woodland native. Comfortable in humidity and heat, which is more than most perennials manage.'],
      [5, 'Self-cleaning. Genuinely low input.'],
      [4, 'Retail 2026.'],
      [5, 'Best value in the 2026 perennial class, on the published information.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'The quiet best buy of the year: a shade-tolerant native that hummingbirds actually use and that asks nothing of you.',
    verdictBody:
      'The nativar research is clear that cultivars selected for habit or disease resistance show no measurable loss of ecological function; the traits that break the ecology are doubled flowers, radically altered flower colour and purple foliage (Baisden, Tallamy, Narango & Boyle, HortTechnology 2018). ‘Orange Slices’ is a colour selection within the species’ own red-orange range on a tubular, hummingbird-adapted flower — the pollinator that matters here is a bird, and the flower shape is unchanged. We would plant it without anxiety.',
    sources: [
      s(
        'src_walters_544b',
        'Walters Gardens — Spigelia ‘Orange Slices’',
        'https://www.waltersgardens.com/photo_essay.php?ID=544',
        'primary',
        'Walters Gardens',
      ),
      s(
        'src_baisden',
        'Baisden, Tallamy, Narango & Boyle, “Do Cultivars of Native Plants Support Insect Herbivores?” HortTechnology 28(5):596–606 (2018)',
        'https://www.researchgate.net/publication/328618499_Do_Cultivars_of_Native_Plants_Support_Insect_Herbivores',
        'peer-reviewed',
        'HortTechnology',
      ),
    ],
    issueSlugs: ['05-native-but-designed', '01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'echinacea-knock-em-red',
    commonName: 'Coneflower',
    botanicalName: 'Echinacea',
    cultivar: "COLOR CODED® 'Knock ’em Red'",
    breeder: 'Walters Gardens / Proven Winners',
    breederUrl: 'https://www.waltersgardens.com/photo_essay.php?ID=544',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'perennial',
    imageKey: 'plant_dahlia',
    standfirst:
      'Four-inch flowers that open deep crimson and turn fluorescent red. Before you buy it, ask one question about the petals.',
    description: 'A 20–24 in coneflower for Zones 4–8, full sun to part sun. Retail 2026.',
    whatIsNew:
      'A colour shift within a single flower’s life, on a large bloom. The category has been chasing colour for fifteen years; this is a good one. What Walters does not state on the pages we could fetch is the flower FORM — and in Echinacea, that is the only detail that decides whether the plant feeds anything.',
    zones: 'USDA 4–8',
    zonesConfidence: 'verified',
    size: '20–24 in tall × 16–20 in wide',
    sizeConfidence: 'verified',
    sun: 'full-to-part',
    water: 'unverified',
    containerSuitable: 'unverified',
    nativeStatus: 'cultivar-of-native',
    availability: 'retail',
    whereToBuy: [
      {
        id: 'rl_knockemred',
        label: 'Walters Gardens — COLOR CODED coneflowers',
        url: 'https://www.waltersgardens.com/photo_essay.php?ID=544',
        vendor: 'Walters Gardens',
        affiliate: false,
      },
    ],
    scores: scores(
      [3, 'Another coneflower colour. Well executed — but colour is not the axis that matters here.'],
      [4, 'Depends entirely on the flower form, which is the one thing the introducer has not published.'],
      [4, 'Echinacea is a prairie plant with prairie tolerances.'],
      [5, 'Easy.'],
      [4, 'Retail 2026.'],
      [4, 'Fair.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'Buy it if it is single. Do not buy it if it is a double. We have asked Walters which it is, and we will print the answer here.',
    verdictBody:
      'Mt. Cuba’s three-year Echinacea trial — 75 selections, with a citizen-science team counting pollinator visits in 60-second windows — found double-flowered coneflowers markedly less favoured, and every one of its top-ranked selections was single-flowered. That is the actionable rule for this entire genus, and it is a rule about flower architecture rather than about the word “cultivar.” Walters is also selling a deliberately doubled Echinacea in the same 2026 class (DOUBLE CODED® ‘Coral Cranberry’), so the distinction clearly matters to them. We could not confirm the petal form of ‘Knock ’em Red’ from any page we were able to fetch, and we are not going to infer it from a photograph. One email settles it. Until it does, this stays at Worth watching.',
    howWeWouldTestIt:
      'Ask the breeder for the flower form. Then, independently: count pollinator visits to a single inflorescence in 60-second windows, against straight Echinacea purpurea and against ‘Coral Cranberry’, on a warm still morning, weekly through the bloom.',
    sources: [
      s(
        'src_mtcuba_echinacea',
        'Captivating Coneflowers for People and Pollinators — Echinacea trial, 75 selections',
        'https://mtcubacenter.org/captivating-coneflowers-for-people-and-pollinators/',
        'independent',
        'Mt. Cuba Center',
      ),
      s(
        'src_walters_544c',
        'Walters Gardens — 2026 introductions',
        'https://www.waltersgardens.com/photo_essay.php?ID=544',
        'primary',
        'Walters Gardens',
      ),
    ],
    issueSlugs: ['05-native-but-designed'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'hosta-red-ninja',
    commonName: 'Hosta',
    botanicalName: 'Hosta',
    cultivar: "'Nk2021'",
    tradeName: 'RED NINJA',
    breeder: 'Ninja Kramer · exhibited by Sienna Hosta',
    breederUrl: 'https://www.rhs.org.uk/plants/new-plants/hosta-red-ninja',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'perennial',
    imageKey: 'plant_coleus',
    standfirst:
      'RHS Chelsea Plant of the Year 2026. A red hosta that holds its colour — and that wants sun.',
    description:
      'A full-plant mutation of Hosta ‘First Blush’. Leaves emerge intensely red with deep green margins and hold the colour deep into summer. Purple flowers late summer into early autumn. To 35 cm; fully hardy to −23 °C. It won with 30 of 139 judges’ votes.',
    whatIsNew:
      'Two things at once. Red hostas have been promised for two decades and have always faded to a muddy green by July; the judges’ citation is specific about this one HOLDING. And it inverts the category’s founding rule — the breeding team say it needs direct sun to colour up, and the more it gets, the better the colour. A sun-loving hosta is close to a contradiction in terms.',
    zones: 'Hardy to −23 °C (≈ USDA Zone 5)',
    zonesConfidence: 'verified',
    size: 'To 35 cm tall',
    sizeConfidence: 'verified',
    sun: 'part',
    water: 'average',
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'limited',
    availabilityNote:
      'A UK launch. US availability is unverified — we are not going to tell you where to buy it until we know.',
    whereToBuy: [
      {
        id: 'rl_redninja',
        label: 'RHS — Hosta RED NINJA (Plant of the Year 2026)',
        url: 'https://www.rhs.org.uk/plants/new-plants/hosta-red-ninja',
        vendor: 'Royal Horticultural Society',
        affiliate: false,
      },
    ],
    scores: scores(
      [5, 'The most genuinely surprising plant of 2026. It breaks two rules at once.'],
      [3, 'Beautiful, and useful only if the colour survives a real summer.'],
      [2, 'A UK plant. The burden of proof is an American August, which is hotter than any trial it has passed.'],
      [4, 'Hostas are easy. Slugs are not.'],
      [2, 'UK availability. No confirmed US channel.'],
      [3, 'Unknowable until it can be bought here.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'The most exciting plant on this list and the one we can least tell you to buy. Watch for a US introduction — and watch the colour in August.',
    verdictBody:
      '“Red hosta” has been the category’s cold fusion for twenty years. What makes this one different is the specificity of the claim: colour retention into summer, and a positive requirement for direct sun. Both are falsifiable. Neither has been tested in a US zone-6 summer, which is a different weather event entirely from a UK trial bed.',
    howWeWouldTestIt:
      'Photograph the same plant on 1 May, 1 July and 1 September, in Zone 6, against a colour card, at three light levels.',
    sources: [
      s(
        'src_rhs_ninja',
        'Hosta RED NINJA — RHS Chelsea Plant of the Year 2026',
        'https://www.rhs.org.uk/plants/new-plants/hosta-red-ninja',
        'primary',
        'Royal Horticultural Society',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'sedum-spectacular',
    commonName: 'Showy stonecrop',
    botanicalName: 'Hylotelephium spectabile',
    cultivar: "'Spectacular'",
    breeder: 'PanAmerican Seed',
    breederUrl: 'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'perennial',
    imageKey: 'plant_sedum',
    standfirst:
      'An All-America Selections winner that is really a story about production economics — and a rival solving the same problem the opposite way.',
    description:
      'A seed-raised sedum that AAS judges said “delivers rock-solid garden performance typically found only in vegetative varieties.” Tight compact mound, does not flop, flowers earlier than comparisons. Supplied as multi-pellet seed.',
    whatIsNew:
      'Sedums are normally propagated from cuttings. Doing it from seed changes the cost, the shipping and the supply calendar — for the grower. What it changes for you is less obvious, and we would rather say so.',
    zones: 'Not published by AAS',
    zonesConfidence: 'unverified',
    size: 'Not published by AAS',
    sizeConfidence: 'unverified',
    sun: 'full',
    water: 'low',
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'limited',
    availabilityNote:
      'AAS and Fleuroselect press releases almost never publish zones, size, water needs or retail availability. That is why so many fields here say unverified — not because the plant is doubtful.',
    whereToBuy: [
      {
        id: 'rl_sedum_aas',
        label: 'All-America Selections 2026 winners',
        url: 'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
        vendor: 'All-America Selections',
        affiliate: false,
      },
    ],
    scores: scores(
      [3, 'The novelty is in the propagation route, not in the plant you put in the ground.'],
      [3, 'Anti-flop is a real benefit. Whether you can tell it from a good vegetative sedum is untested.'],
      [4, 'Sedum. It will survive most of what you do to it.'],
      [5, 'Very easy.'],
      [4, 'Seed and plants, widely.'],
      [4, 'Seed propagation should mean a cheaper plant. Watch whether the saving reaches the shelf.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'A grower’s win being sold as a gardener’s win. Two rival houses solved the same flopping problem this year by opposite routes — and that is the actual story.',
    verdictBody:
      'While PanAmerican solved sedum flop from seed, Syngenta launched Sedum ‘Hot Rocks Dark Leaf Red’ for 2026 with an explicit reduced-lodging claim, solved vegetatively. Same brief, same season, opposite propagation philosophy. We will grow both.',
    sources: [
      s(
        'src_aas2026',
        'All-America Selections 2026 winners',
        'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
        'trade',
        'Greenhouse Management',
      ),
      s(
        'src_syngenta_cast',
        'Syngenta Flowers — 2026 new plants',
        'https://gpnmag.com/news/syngenta-flowers-cast-2026-new-plants/',
        'trade',
        'GPN',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'tomato-badabing',
    commonName: 'Tomato',
    botanicalName: 'Solanum lycopersicum',
    cultivar: "'BadaBing!' F1",
    breeder: 'Frogsleap Farm / A.P. Whaley',
    breederUrl: 'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'vegetable',
    imageKey: 'plant_tomato',
    standfirst:
      'Stacked resistance to Septoria leaf spot, early blight AND late blight — in one tomato, at 40 inches.',
    description:
      'An indeterminate that stays around 40 in, with 1.5-inch crack-resistant red fruit, early. AAS 2026 winner and Green Thumb People’s Choice.',
    whatIsNew:
      'Three diseases in one resistance package is rare, and these are the three that actually end a home tomato season in a wet year. Most “disease resistant” tomatoes resist the wilts. This one resists the things that eat the leaves off in August.',
    zones: 'Annual',
    zonesConfidence: 'verified',
    size: 'Indeterminate, staying around 40 in',
    sizeConfidence: 'reported',
    sun: 'full',
    water: 'average',
    edible: true,
    ornamental: false,
    containerSuitable: 'unverified',
    nativeStatus: 'non-native',
    availability: 'limited',
    availabilityNote:
      'All-America Selections does not publish retail availability in its releases. Winners reach gardeners through AAS retail seed partners, but we have not confirmed a channel for this variety and we are not going to guess one.',
    whereToBuy: [
      {
        id: 'rl_badabing',
        label: 'All-America Selections — 2026 winners',
        url: 'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
        vendor: 'All-America Selections',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'Stacking three foliar-disease resistances in a home-garden tomato is real breeding, not a colour change.'],
      [5, 'It targets the exact failure mode of a home tomato crop in a humid summer.'],
      [4, 'Disease resistance IS climate resilience as summers get wetter and warmer.'],
      [5, 'A 40-inch indeterminate needs less cage than most.'],
      [4, 'Seed, widely.'],
      [5, 'It is a packet of seed. The most leverage per dollar on this entire list.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'The easiest recommendation of the year, and the easiest to check: grow it next to a susceptible indeterminate in a wet August and you will know by Labor Day.',
    verdictBody:
      'One of the two or three most substantive edible claims of 2026. It also costs the price of a coffee to test — which is why we will be asking readers to grow it beside their usual variety and send us the photographs. That is a trial nobody has to fund.',
    howWeWouldTestIt:
      'Reader trial. Same bed, same feed, BadaBing! and one susceptible indeterminate. Photograph on 1 August and 1 September. We will publish the grid.',
    sources: [
      s(
        'src_aas2026b',
        'All-America Selections 2026 winners',
        'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
        'trade',
        'Greenhouse Management',
      ),
      s(
        'src_gt2026',
        '2026 Green Thumb Award winners — National Garden Bureau',
        'https://www.gardencentermag.com/news/2026-green-thumb-award-winners-national-garden-bureau/',
        'trade',
        'Garden Center Magazine',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet', '02-the-heat-proof-garden'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'kale-rubybor',
    commonName: 'Kale',
    botanicalName: 'Brassica oleracea',
    cultivar: "'Rubybor' F1",
    breeder: 'Bejo Seeds',
    breederUrl: 'https://all-americaselections.org/product/kale-rubybor/',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'vegetable',
    imageKey: 'technique_seed_trays',
    standfirst:
      'The first variety in All-America Selections history to win Gold in both the ornamental and the edible trials.',
    description:
      'Deep purple foliage, uniform compact habit, short internodes for a tidy bushy shape. Leaves stay tender and non-bitter, with continuous harvest from spring to frost, and it reportedly holds colour and form in southern heat.',
    whatIsNew:
      'The dual Gold is genuinely a first. It is also, partly, a category-design novelty — the same plant entered in two trials. The horticultural claim underneath, though, is a good one: an ornamental kale you would actually want to eat.',
    zones: 'Annual',
    zonesConfidence: 'verified',
    size: 'Not published',
    sizeConfidence: 'unverified',
    sun: 'full',
    water: 'average',
    edible: true,
    ornamental: true,
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'limited',
    availabilityNote:
      'All-America Selections does not publish retail availability. Distributed through AAS retail seed partners; we have not confirmed a channel for this variety.',
    whereToBuy: [
      {
        id: 'rl_rubybor',
        label: 'All-America Selections — Kale Rubybor',
        url: 'https://all-americaselections.org/product/kale-rubybor/',
        vendor: 'All-America Selections',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'A first in the award’s history — but read the footnote below before you repeat it.'],
      [4, 'Edible and ornamental at once is a real answer for small gardens and containers.'],
      [4, 'Claimed to hold in southern heat; kale generally sweetens after frost, so both ends are covered.'],
      [5, 'Kale.'],
      [4, 'Seed, widely, from 2026.'],
      [5, 'Seed pricing.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'A record-breaking award, and one question we have put to the breeder: is this a newly bred F1, or an existing variety newly trialled?',
    verdictBody:
      'The name “Rubybor” has circulated in the kale trade before. It is entirely possible that the F1 in the trial is new and the name is inherited — that happens. But we do not print “first in history” without checking what the history is. Bejo can settle it in one email, and when they do, we will update this page and say so.',
    sources: [
      s('src_aas_rubybor', 'Kale Rubybor — AAS product page', 'https://all-americaselections.org/product/kale-rubybor/', 'primary', 'All-America Selections'),
      s(
        'src_aas2026c',
        'All-America Selections 2026 winners',
        'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
        'trade',
        'Greenhouse Management',
      ),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'basil-treviso',
    commonName: 'Basil',
    botanicalName: 'Ocimum basilicum',
    cultivar: "'Treviso'",
    breeder: 'GardenGenetics + Seeds by Design',
    breederUrl: 'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
    releaseYear: 2026,
    releaseChannel: 'retail',
    type: 'herb',
    imageKey: 'texture_leaf_macro',
    standfirst:
      'Basil that resists bitterness after cutting and does not blacken. And the same breeding house has a much bigger story it is not telling loudly enough.',
    description:
      'Stays tender, resists post-harvest bitterness, resists oxidation so the leaves do not go black in the bowl, notably slow to flower, tight and highly branched.',
    whatIsNew:
      'Post-harvest quality is a thing chefs care about and gardeners never hear about. Breeding a basil for what happens after you pick it is a genuinely unusual objective.',
    zones: 'Annual',
    zonesConfidence: 'verified',
    size: 'Not published',
    sizeConfidence: 'unverified',
    sun: 'full',
    water: 'average',
    edible: true,
    ornamental: false,
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'limited',
    availabilityNote:
      'All-America Selections does not publish retail availability. Distributed through AAS retail seed partners; we have not confirmed a channel for this variety.',
    whereToBuy: [
      {
        id: 'rl_treviso',
        label: 'All-America Selections — 2026 winners',
        url: 'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
        vendor: 'All-America Selections',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'Breeding for post-harvest behaviour in a home-garden herb is close to unheard of.'],
      [4, 'Slow to flower is worth more than most people realise — it is the whole basil season.'],
      [3, 'Basil is a heat crop. Nothing published on heat performance specifically.'],
      [5, 'Basil.'],
      [4, 'Seed, from 2026.'],
      [5, 'Seed pricing.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'Buy it. Then look at what else this breeding house is doing — because basil downy mildew resistance is the story nobody is covering.',
    verdictBody:
      'The same team bred Basil ‘Piedmont’ (AAS 2025 Regional), which carries exceptional downy mildew resistance against Peronospora belbahrii. Basil downy mildew is the second great downy-mildew breeding story in horticulture, alongside impatiens, and almost nobody writes about it. Two AAS wins in two years from one breeding house is not a coincidence — it is a pipeline. We are asking for an interview.',
    sources: [
      s(
        'src_aas2026d',
        'All-America Selections 2026 winners',
        'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
        'trade',
        'Greenhouse Management',
      ),
      s('src_aas2025', 'AAS winners announced for 2025 (Basil ‘Piedmont’, DMR)', 'https://gpnmag.com/news/aas-winners-announced-for-2025/', 'trade', 'GPN'),
    ],
    issueSlugs: ['01-plants-you-havent-seen-yet'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'blueberry-apex-fall-creek',
    commonName: 'Blueberry',
    botanicalName: 'Vaccinium',
    cultivar: "'FCM14-057'",
    tradeName: 'Apex',
    breeder: 'Fall Creek Farm & Nursery',
    breederUrl: 'https://www.fallcreeknursery.com/commercial-fruit-growers/varieties/FCM14-057',
    releaseYear: 2026,
    releaseChannel: 'commercial licence',
    type: 'fruit',
    imageKey: 'plant_blueberry',
    standfirst:
      'A zero-to-low-chill blueberry with 21 mm berries and 45 days of post-harvest firmness. You cannot buy it, and that is the story.',
    description:
      'Released 2023; formally launched into the Fall Creek® Collection in April 2026. Early-to-mid season, upright habit, proven in Peru, Morocco, Mexico and Spain.',
    whatIsNew:
      'Zero-to-low chill is the genuinely important trait — it decouples blueberries from winter cold, which is what makes them plantable in a warming, and warmer, world. The berry size and shelf life are supply-chain numbers, not eating-quality numbers, and the press release says so by talking about importers and retailers.',
    zones: 'Not applicable — a commercial variety, not a garden one',
    zonesConfidence: 'verified',
    size: 'Upright habit; dimensions not published for garden use',
    sizeConfidence: 'unverified',
    sun: 'full',
    water: 'average',
    edible: true,
    ornamental: false,
    containerSuitable: 'unverified',
    nativeStatus: 'cultivar-of-native',
    availability: 'commercial-only',
    availabilityNote:
      'Fall Creek® Collection eligibility requires a professional commercial grower with roughly 50 hectares planted (25 ha in Europe) and a demonstrated IP-compliance history. A home gardener will never be offered this plant.',
    whereToBuy: [
      {
        id: 'rl_apex',
        label: 'Fall Creek — Apex (commercial growers only)',
        url: 'https://www.fallcreeknursery.com/commercial-fruit-growers/varieties/FCM14-057',
        vendor: 'Fall Creek Farm & Nursery',
        affiliate: false,
      },
    ],
    scores: scores(
      [5, 'Zero-chill blueberry genetics are among the most valuable in fruit breeding today.'],
      [1, 'To you? None. You cannot have it. That is the point of including it.'],
      [5, 'Low chill requirement is the single most useful adaptation to warming winters in deciduous fruit.'],
      [3, 'Unknown in a garden context, because it has never been in one.'],
      [1, 'Gated behind a 50-hectare planting minimum.'],
      [1, 'Not for sale to you at any price.'],
    ),
    verdict: V('skip'),
    verdictLine:
      'We are not telling you to skip it because it is bad. We are telling you it is excellent, and that you are not allowed to have it.',
    verdictBody:
      'The most exciting fruit genetics of the last three years are largely unavailable to home gardeners. Fall Creek gates its best blueberries behind a 50-hectare minimum. The University of Florida’s Florida Encore® strawberry — whose reflexed calyx curves away from the fruit shoulder to reduce Botrytis development, which is one of the most elegant pieces of plant architecture we have read about this year — is commercial-licence only. Washington State’s new apple reaches supermarkets around 2029. There is exactly one counter-example, and it is the University of Minnesota, which has opened its patented apples and grapes to small growers for a $100 ten-year membership ($1 per tree at purchase, plus $1 per plant per year from year four). Two philosophies of who gets access to genetics. We think that is the most important structural story in fruit right now.',
    sources: [
      s(
        'src_fallcreek_apex',
        'Fall Creek launches Apex (FCM14-057) blueberry variety',
        'https://www.fallcreeknursery.com/blog/fall-creek-launches-apex-fcm14-057-blueberry-variety-as-latest-addition-to-the-fall-creek-collection',
        'primary',
        'Fall Creek Farm & Nursery',
      ),
      s(
        'src_umn_sfi',
        'Superior Fruit Innovations — University of Minnesota',
        'https://superiorfruitinnovations.umn.edu/grapes',
        'primary',
        'University of Minnesota',
      ),
    ],
    issueSlugs: ['03-fruit-trees-shrunk'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'big-flirt-apple',
    commonName: 'Apple',
    botanicalName: 'Malus domestica',
    tradeName: 'Big Flirt™',
    breeder: 'University of Minnesota',
    breederUrl: 'https://mnhardy.umn.edu/apples/varieties',
    releaseYear: 2025,
    releaseChannel: 'retail',
    type: 'fruit',
    imageKey: 'plant_peach',
    standfirst:
      'Honeycrisp-like crunch, seven to nine months in ordinary storage — and a $100 membership that lets a small grower plant it and sell the fruit.',
    description:
      'Sweet, low-acid, mild; scab tolerance similar to Honeycrisp; ripens about a week earlier than Honeycrisp; stores 7–9 months in common storage. Released 2025 alongside SuperSnap™ and the Northern Glo™ seedless table grapes.',
    whatIsNew:
      'The apple is good. The access model is the news. The University of Minnesota launched Superior Fruit Innovations — a $100 ten-year membership, with a $1 royalty per tree at purchase and $1 per plant per year from year four — which opens patented apples and grapes to direct-market and small growers for the first time. Nobody else in fruit is doing this.',
    zones: 'Not published; the companion SuperSnap™ is stated as USDA Zone 4',
    zonesConfidence: 'unverified',
    size: 'Depends entirely on rootstock — see our technique page on dwarfing',
    sizeConfidence: 'verified',
    sun: 'full',
    water: 'average',
    edible: true,
    ornamental: false,
    containerSuitable: 'unverified',
    nativeStatus: 'non-native',
    availability: 'limited',
    availabilityNote:
      'Trees through nurseries enrolled in Superior Fruit Innovations: Adam’s County Nursery, Cameron Nursery, Gold Crown Nursery.',
    whereToBuy: [
      {
        id: 'rl_umn_apples',
        label: 'University of Minnesota — apple varieties',
        url: 'https://mnhardy.umn.edu/apples/varieties',
        vendor: 'University of Minnesota',
        affiliate: false,
      },
      {
        id: 'rl_umn_sfi',
        label: 'Superior Fruit Innovations — grower membership',
        url: 'https://superiorfruitinnovations.umn.edu/grapes',
        vendor: 'University of Minnesota',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'Seven-to-nine-month storage in a common cellar is the commercially meaningful trait, and it is rare.'],
      [4, 'Real for anyone with room for a tree — and transformative for a small orchard business.'],
      [4, 'A cold-climate programme. Zone 4 is the point of the whole Minnesota enterprise.'],
      [3, 'An apple tree is a ten-year relationship. Rootstock choice will matter more than cultivar.'],
      [3, 'Available, through a small number of licensed nurseries.'],
      [5, 'A $100 ten-year membership — plus $1 per tree at purchase and $1 per plant per year from year four — against a commercial-licence-only model elsewhere. Extraordinary value.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'The most quietly radical thing in fruit right now is not a plant. It is a $100 membership.',
    verdictBody:
      'Note what UMN does NOT claim: nobody there calls this “the next Honeycrisp.” That is a media frame. The trees are only just entering nursery channels and fruit volume is years away. But the access model deserves to be copied, and we intend to keep saying so until somebody does.',
    sources: [
      s('src_umn_apples', 'University of Minnesota — apple varieties', 'https://mnhardy.umn.edu/apples/varieties', 'primary', 'UMN'),
      s(
        'src_umn_ext_sfi',
        'What to know about Superior Fruit Innovations',
        'https://blog-fruit-vegetable-ipm.extension.umn.edu/2026/05/what-to-know-about-superior-fruit.html',
        'independent',
        'UMN Extension',
      ),
    ],
    issueSlugs: ['03-fruit-trees-shrunk'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'brew-tea-ful-tea-camellia',
    commonName: 'Tea camellia',
    botanicalName: 'Camellia sinensis',
    cultivar: "'CAM130' PP 33,458",
    tradeName: 'Brew-Tea-Ful™',
    breeder: 'Star® Roses and Plants (Bushel and Berry® brand)',
    breederUrl: 'https://www.bushelandberry.com/varieties',
    releaseYear: 2025,
    releaseChannel: 'retail',
    type: 'shrub',
    imageKey: 'plant_hellebore',
    standfirst:
      'The first non-berry plant in the Bushel and Berry line. Which raises a question about the berries.',
    description:
      'A 5–6 ft mounded Camellia sinensis for Zones 7–9, full sun to part shade, containers fine. Launched 2025 alongside a passionfruit vine.',
    whatIsNew:
      'Honestly? The branding. A tea camellia is a long-established garden plant, and “three teas from one plant” is true of essentially any C. sinensis — it is a processing distinction, not a cultivar trait.',
    zones: 'USDA 7–9',
    zonesConfidence: 'verified',
    size: '5–6 ft, mounded',
    sizeConfidence: 'verified',
    sun: 'full-to-part',
    water: 'unverified',
    edible: true,
    ornamental: true,
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'retail',
    whereToBuy: [
      {
        id: 'rl_brewteaful',
        label: 'Bushel and Berry — varieties',
        url: 'https://www.bushelandberry.com/varieties',
        vendor: 'Bushel and Berry',
        affiliate: false,
      },
    ],
    scores: scores(
      [2, 'A distribution innovation, not a genetic one. We will say that plainly.'],
      [3, 'A pleasant, useful shrub — and you can make tea from it, which is a nice thing to be able to do.'],
      [3, 'Zone 7 southern limit is real; this is a warm-climate plant.'],
      [4, 'Camellias are forgiving in the right soil.'],
      [5, 'Retail.'],
      [3, 'You are paying for a brand on a species that has been in cultivation for millennia.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'A fine plant, and a signal flare. Bushel and Berry — the brand that invented the container-berry category — has not launched a genuinely new berry since about 2021.',
    verdictBody:
      'The patent numbers on the brand’s own collection page make it unambiguous: Baby Cakes® blackberry is 2016; Raspberry Shortcake® is older still; the Cascade series is around 2021. The 2025 introductions were a tea camellia and a ten-foot climbing passionfruit vine — from a brand whose entire promise is compact and container. Why has the compact-berry boom stalled? Patent cliffs? Market saturation? Or is dwarf Vaccinium breeding simply much harder than the marketing suggested? We have asked. Nobody else has.',
    sources: [
      s(
        'src_star_bb',
        'Bushel and Berry expands its collection with two non-berry plant introductions',
        'https://starrosesandplants.com/press-releases/bushel-and-berry-expands-its-collection-with-two-non-berry-plant-introductions/',
        'primary',
        'Star Roses and Plants',
      ),
      s('src_bb_varieties', 'Bushel and Berry — varieties and patent numbers', 'https://www.bushelandberry.com/varieties', 'primary', 'Bushel and Berry'),
    ],
    issueSlugs: ['03-fruit-trees-shrunk'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'loropetalum-purple-raindrops',
    commonName: 'Chinese fringe-flower',
    botanicalName: 'Loropetalum chinense',
    tradeName: 'Purple Raindrops™',
    breeder: 'Plant Development Services Inc. · Southern Living Plant Collection',
    breederUrl: 'https://plantdevelopment.com/news/pdsi-encourages-gardeners-to-dig-for-joy-with-colorful-new-introductions-at-cultivate26/',
    releaseYear: 2026,
    releaseChannel: 'trade',
    type: 'shrub',
    imageKey: 'plant_clematis',
    standfirst:
      'A loropetalum that stays at 2–2.5 ft. The category’s chronic failure is that “dwarf” selections do not.',
    description:
      'A low, mounding loropetalum — 2–2.5 ft tall, 3–4 ft wide — holding saturated purple foliage year-round, with a possible autumn rebloom. Zones 7–10, full sun. Launched at Cultivate’26.',
    whatIsNew:
      'Most loropetalums balloon to 6–10 ft, whatever the tag said. A genuinely low, mounding form would change how the plant is used in southern gardens — from a shrub you fight to a groundcover you place.',
    zones: 'USDA 7–10',
    zonesConfidence: 'reported',
    size: '2–2.5 ft tall × 3–4 ft wide',
    sizeConfidence: 'reported',
    sun: 'full',
    water: 'unverified',
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'trade-only',
    availabilityNote: 'Trade launch 2026; consumer availability likely 2027.',
    whereToBuy: [
      {
        id: 'rl_purpleraindrops',
        label: 'PDSI — Cultivate’26 introductions',
        url: 'https://plantdevelopment.com/news/pdsi-encourages-gardeners-to-dig-for-joy-with-colorful-new-introductions-at-cultivate26/',
        vendor: 'Plant Development Services',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'If the size holds, it is a new plant type rather than a new colour.'],
      [4, 'The southern garden needs low evergreen colour that does not need shearing.'],
      [4, 'Bred in the Gulf South. Heat is not the question here — the question is size.'],
      [4, 'Loropetalum is tough.'],
      [2, 'Trade launch. You will not see it at retail until 2027.'],
      [3, 'Unknown.'],
    ),
    verdict: V('wait'),
    verdictLine:
      'Measure it at year five, not year two. Dwarf loropetalums have been promised before, and they grew.',
    verdictBody:
      'Size claims are this category’s chronic failure — “dwarf” selections routinely blow past their tags by year four. There is no reason to think PDSI is wrong. There is every reason to think the honest test is a tape measure in 2031, and we intend to be holding one.',
    sources: [
      s(
        'src_pdsi_cultivate26',
        'PDSI new introductions at Cultivate’26',
        'https://plantdevelopment.com/news/pdsi-encourages-gardeners-to-dig-for-joy-with-colorful-new-introductions-at-cultivate26/',
        'primary',
        'Plant Development Services',
      ),
    ],
    issueSlugs: ['02-the-heat-proof-garden'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'agapanthus-poppin-pink',
    commonName: 'Agapanthus',
    botanicalName: 'Agapanthus',
    tradeName: 'Poppin’ Pink™',
    breeder: 'Plant Development Services Inc. · Southern Living Plant Collection',
    breederUrl: 'https://plantdevelopment.com/news/pdsi-encourages-gardeners-to-dig-for-joy-with-colorful-new-introductions-at-cultivate26/',
    releaseYear: 2026,
    releaseChannel: 'trade',
    type: 'perennial',
    imageKey: 'plant_lavender',
    standfirst:
      'Claimed as the first pink agapanthus. Rated for exactly one zone.',
    description:
      'Semi-dwarf, 28 in × 24 in, early flowering with repeat flushes, drought tolerant once established. PDSI publishes a single zone: 9a.',
    whatIsNew:
      'Agapanthus is blue or white. Pink would be a genuine first — if it is a first.',
    zones: 'USDA 9a only',
    zonesConfidence: 'reported',
    size: '28 in × 24 in',
    sizeConfidence: 'reported',
    sun: 'full',
    water: 'low',
    containerSuitable: true,
    nativeStatus: 'non-native',
    availability: 'trade-only',
    whereToBuy: [
      {
        id: 'rl_poppinpink',
        label: 'PDSI — Cultivate’26 introductions',
        url: 'https://plantdevelopment.com/news/pdsi-encourages-gardeners-to-dig-for-joy-with-colorful-new-introductions-at-cultivate26/',
        vendor: 'Plant Development Services',
        affiliate: false,
      },
    ],
    scores: scores(
      [4, 'A colour that does not exist in the genus — if the claim survives checking.'],
      [2, 'A single-zone plant is a container plant everywhere else, and PDSI does not frame it that way.'],
      [3, 'Drought tolerant once established. Cold is the constraint, not heat.'],
      [4, 'Agapanthus is easy where it is hardy.'],
      [2, 'Trade launch.'],
      [3, 'Unknown.'],
    ),
    verdict: V('wait'),
    verdictLine:
      'A breakthrough colour with a one-zone footprint. And “first-ever pink agapanthus” needs checking against Australian and New Zealand registrations before anyone prints it — including us.',
    verdictBody:
      'PDSI’s own copy gives a single zone, 9a. That is an extremely narrow market for something billed as a breakthrough, and it makes this a container plant for most of the country — which is a perfectly good thing to be, but it is not what the announcement says. Pink agapanthus claims have been made before in the southern hemisphere. We are checking.',
    sources: [
      s(
        'src_pdsi_cultivate26b',
        'PDSI new introductions at Cultivate’26',
        'https://plantdevelopment.com/news/pdsi-encourages-gardeners-to-dig-for-joy-with-colorful-new-introductions-at-cultivate26/',
        'primary',
        'Plant Development Services',
      ),
      s(
        'src_lm_pdsi',
        'Plant Development Services to showcase new plant collections at Cultivate’26',
        'https://www.landscapemanagement.net/plant-development-services-to-showcase-new-plant-collections-at-cultivate-26/',
        'trade',
        'Landscape Management',
      ),
    ],
    issueSlugs: ['02-the-heat-proof-garden'],
  }),
];

export const plantsBySlug = Object.fromEntries(plants.map((p) => [p.slug, p]));

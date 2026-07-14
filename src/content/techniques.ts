/**
 * TECHNIQUE INDEX — seeded from research/techniques-research.md (13 July 2026).
 *
 * The evidence level is the point of this publication. It is assigned against
 * peer-reviewed literature, meta-analyses and extension trials — never against
 * the vendor's own copy. Where the evidence contradicts the marketing, we say
 * so and cite the paper.
 */

import type { Source, Technique, TechniqueScores, Verdict } from '@/lib/types';

const s = (
  id: string,
  title: string,
  url: string,
  kind: Source['kind'],
  publisher?: string,
): Source => ({ id, title, url, kind, publisher, accessed: '2026-07-13' });

type N = 1 | 2 | 3 | 4 | 5;

const scores = (
  evidenceStrength: [N, string],
  cost: [N, string],
  difficulty: [N, string],
  likelyBenefit: [N, string],
  climateRelevance: [N, string],
  hypeRisk: [N, string],
): TechniqueScores => ({
  evidenceStrength: { score: evidenceStrength[0], note: evidenceStrength[1] },
  cost: { score: cost[0], note: cost[1] },
  difficulty: { score: difficulty[0], note: difficulty[1] },
  likelyBenefit: { score: likelyBenefit[0], note: likelyBenefit[1] },
  climateRelevance: { score: climateRelevance[0], note: climateRelevance[1] },
  hypeRisk: { score: hypeRisk[0], note: hypeRisk[1] },
});

const mk = (t: Omit<Technique, 'id' | 'status' | 'updatedAt'>): Technique => ({
  id: `tech_${t.slug.replace(/-/g, '_')}`,
  status: 'published',
  updatedAt: '2026-07-13T09:00:00.000Z',
  ...t,
});

const V = (v: Verdict) => v;

export const techniques: Technique[] = [
  // -------------------------------------------------------------------------
  mk({
    slug: 'shade-cloth-over-vegetables',
    name: 'Shade cloth over vegetables',
    imageKey: 'technique_shade_cloth',
    standfirst:
      'Four years of university pepper trials, and the answer is 30%, black, and put it up in June — not July.',
    whatItIs:
      'Knitted polyethylene fabric, rated by the percentage of light it blocks, draped over hoops or a frame above a bed.',
    problemItClaimsToSolve:
      'Heat stress, sunscald on fruit, transplant stem girdling, bolting, and small fruit in hot summers.',
    evidenceLevel: 'strong',
    evidenceSummary:
      'The best home-garden-relevant evidence is Emmalea Ernest’s multi-year University of Delaware Extension trial programme in bell peppers. It found that 30% black shade cloth produced the highest yields, raising marketable yield to three times that of the unshaded control — and, importantly, that shade did NOT increase the NUMBER of peppers. It increased their size and cut the sunscald culls. Colour mattered: black outperformed white, red and aluminised. Timing mattered more: shading from transplant in early June beat shading from July, because early shade prevented heat-induced stem girdling of transplants — and the best treatment of all was shade in both months. Data loggers in the 2021 trial recorded shaded canopies averaging 2 °F cooler on daily mean and 8 °F cooler on daily maximum. For tomatoes the picture is more nuanced: shading tends to trade a little total yield for a lot of marketable yield by cutting cracking and sunscald. Figures circulating online attributing specific percentages to Utah State and to Gent’s work are plausible but we could not open the primary papers, so we do not print them.',
    costNote:
      'Low to moderate. The fabric is durable and lasts many seasons; the recurring cost is the frame and the labour of moving it.',
    difficultyNote:
      'Low technically, medium logistically. Ernest’s honest note: unless it is on a permanent structure, you must move the cloth every single time you harvest.',
    climateFit:
      'Hot-summer regions with intense radiation. Of NEGATIVE value in cool, short, cloudy summers, where light is already the limiting factor.',
    instructions: [
      'Choose 30% shade factor. More is not better — heavy shade slows ripening.',
      'Choose black. The Delaware data favour plain black over white, red and aluminised.',
      'Put it up at transplant, not in the heatwave. Early shade prevented stem girdling; late shade did not recover the loss.',
      'Suspend it above the canopy on hoops or a frame with airflow underneath. Do not lay it on the plants.',
      'Leave it through the hottest 6–8 weeks, then take it down so late fruit can ripen.',
      'Note that varietal choice interacts: in the 2021 trial, the Italian sweet pepper ‘Carmen’ showed no significant benefit while all three bell varieties did.',
    ],
    advantages: [
      'Cheap, reusable, chemical-free, no regulatory issues.',
      'Addresses fruit QUALITY — the thing that actually loses you the harvest — rather than raw tonnage.',
      'No observed increase in disease in the Delaware trials.',
    ],
    limitations: [
      'You must physically move it to harvest, which is why most people abandon it in year two.',
      'Percentage matters and more is not better.',
      'Partly a workaround for a heat-intolerant cultivar. Change the variety first; it is cheaper.',
    ],
    scores: scores(
      [5, 'Four years of replicated university extension trials with data loggers. This is as good as home-garden evidence gets.'],
      [4, 'Fabric is cheap and lasts years. The frame is the cost.'],
      [3, 'Easy to install; tedious to live with. You will move it every harvest.'],
      [4, 'Three-fold marketable yield in peppers is not a marginal gain.'],
      [5, 'Directly targets the defining problem of hotter summers.'],
      [2, 'The technique works. The hype is in exotic colours and “photo-selective” cloth — the data favour plain black.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'Buy the boring one. 30%, black, up in June. And change your pepper variety before you change your equipment.',
    verdictBody:
      'This is one of the few heat techniques with real replicated trial data behind it, and the data are refreshingly specific about what it does and does not do: it does not give you more peppers, it gives you bigger, unblemished ones. If you take one number from this page, take this one: shade from transplant, not from the first heatwave.',
    sources: [
      s(
        'src_udel_shade',
        'Shade Cloth for Bell Peppers — University of Delaware Cooperative Extension (Emmalea Ernest)',
        'https://sites.udel.edu/weeklycropupdate/?p=20476',
        'independent',
        'University of Delaware Extension',
      ),
      s(
        'src_purdue_shade',
        'Using Shadecloth on High Tunnels for Tomato and Colored Bell Pepper Production',
        'https://vegcropshotline.org/article/using-shadecloth-on-high-tunnels-for-tomato-and-colored-bell-pepper-production/',
        'independent',
        'Purdue University',
      ),
    ],
    issueSlugs: ['02-the-heat-proof-garden'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'mycorrhizal-inoculants',
    name: 'Commercial mycorrhizal inoculants',
    imageKey: 'technique_soil_lab',
    standfirst:
      'A meta-analysis of 302 trials found fewer than 12% of commercial products delivered both a growth benefit and viable colonisation. The biology is real. The bag is not.',
    whatItIs:
      'Packaged spores and propagules of symbiotic fungi, sold as powders, granules, root dips, potting-mix additives and as an ingredient in “organic” fertilisers.',
    problemItClaimsToSolve:
      'Poor nutrient and water uptake, “dead” soil, transplant shock. The claim is that you inoculate and the symbiosis establishes.',
    evidenceLevel: 'strong',
    evidenceSummary:
      'Strong — and strongly negative for the products, while the underlying biology is not in dispute. Three findings, all recent. Salomon et al. (2022, iScience) tested 25 commercial AMF products and found over 80% failed to induce ANY arbuscular mycorrhizal root colonisation — in sterilised soil, under conditions deliberately favourable to the fungi, i.e. the easiest possible test. Koziol, McKenna & Bever (2025, New Phytologist) meta-analysed 302 trials: fewer than 12% of commercial products showed both significant growth benefit and viable colonisation, against 63% for laboratory-grown inoculants, with documented failure modes including non-viable strains, crop mortality, contamination with fungal pathogens, and mislabelling. Boussageon et al. (2025) published a paper whose title is the finding: “Poor Quality of Commercial Arbuscular Mycorrhizal Inoculants Used for Agriculture and Home Gardening.” Linda Chalker-Scott at Washington State has classified this as a horticultural myth for years, and her framing is the correct one: most soils that have supported plants already contain native mycorrhizal fungi. If you build it, they will come.',
    costNote:
      'Moderate per unit, and the global inoculant market is approaching $1 billion. Consumers are paying real money for this.',
    difficultyNote: 'Trivial to apply. That is part of the appeal, and part of the problem.',
    climateFit: 'Irrelevant. The failure is in the product, not the climate.',
    instructions: [
      'Do not buy it for garden soil that already grows plants. There is no mechanism by which adding fungi to soil that already has them helps.',
      'If you genuinely have a sterile substrate — mine spoil, construction fill, sterilised potting media, a severely degraded site — inoculation is real biology and can help substantially.',
      'In that case, use locally sourced or lab-produced native inoculum, which outperforms shelf products.',
      'The free alternative Chalker-Scott recommends: a handful of soil from beneath an established, healthy plant of a related type.',
      'To actually increase mycorrhizal colonisation, stop killing what you have: reduce tillage, cut phosphorus fertiliser, keep living roots in the ground.',
    ],
    advantages: [
      'In the narrow case of a truly sterile substrate, with a verified-viable product, the benefit can be substantial.',
      'The science it is built on — the symbiosis itself — is real, beautiful and important.',
    ],
    limitations: [
      'The product category, as sold, mostly does not work.',
      'There is no mandatory quality control in most countries.',
      'Some products have been found contaminated with fungal pathogens.',
      'Inoculating a soil that already has AMF has no logical mechanism of benefit.',
    ],
    scores: scores(
      [5, 'A 302-trial meta-analysis and an 80%-failure product audit. The evidence here is unusually decisive.'],
      [2, 'Not cheap, and recurring if you believe the label.'],
      [5, 'Trivially easy to apply — and that is the problem.'],
      [1, 'For a garden soil that already grows plants: none that anyone has been able to measure.'],
      [1, 'No climate relevance. The failure is in the bottle.'],
      [5, 'The highest hype risk we have scored. A billion-dollar market riding on real science its own products fail to deliver.'],
    ),
    verdict: V('skip'),
    verdictLine:
      'Skip it. Put the money into compost, and put a handful of soil from under a healthy plant in the hole instead.',
    verdictBody:
      'We want to be precise about what we are saying, because the biology is genuinely wonderful and it is not what is on trial here. Mycorrhizal symbiosis is real, ancient and central to how plants feed. The question is whether the powder in the bag delivers it — and three independent lines of recent evidence say that, most of the time, it does not. That is not a fringe view; it is a meta-analysis, a product audit and a peer-reviewed paper with “poor quality” in its title. If a product wants to change our verdict, it can show us a viability certificate and a colonisation assay. We will print it.',
    sources: [
      s(
        'src_koziol',
        'Koziol, McKenna & Bever, “Meta-analysis reveals globally sourced commercial mycorrhizal inoculants fall short,” New Phytologist (2025)',
        'https://nph.onlinelibrary.wiley.com/doi/10.1111/nph.20278',
        'peer-reviewed',
        'New Phytologist',
      ),
      s(
        'src_salomon',
        'Salomon et al., “Establishing a quality management framework for commercial inoculants containing AMF,” iScience (2022)',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC9254352/',
        'peer-reviewed',
        'iScience',
      ),
      s(
        'src_boussageon',
        'Boussageon et al., “Poor Quality of Commercial Arbuscular Mycorrhizal Inoculants Used for Agriculture and Home Gardening” (2025)',
        'https://onlinelibrary.wiley.com/doi/10.1002/sae2.70107',
        'peer-reviewed',
        'J. Sustainable Agriculture & Environment',
      ),
      s(
        'src_chalker_myco',
        'Mycorrhizae: “If you build it, they will come” — Linda Chalker-Scott',
        'https://gardenprofessors.com/mycorrhizae-if-you-build-it-they-will-come/',
        'independent',
        'The Garden Professors',
      ),
    ],
    issueSlugs: ['04-soil-tech-what-actually-works'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'biochar',
    name: 'Biochar',
    imageKey: 'technique_compost_hands_alt',
    standfirst:
      'The canonical meta-analysis is titled “Biochar boosts tropical but not temperate crop yields.” It is sold hardest to the gardeners it will help least.',
    whatItIs:
      'Biomass charred under low oxygen, producing a porous, long-lived carbon skeleton with high surface area and cation exchange capacity.',
    problemItClaimsToSolve:
      'Low fertility, acidity, poor water and nutrient holding — and carbon sequestration.',
    evidenceLevel: 'strong',
    evidenceSummary:
      'Strong, and strongly conditional. The condition is the part the marketing omits. Schmidt et al. (2021, GCB Bioenergy) systematically reviewed 26 global meta-analyses; the consistent finding is that biochar’s yield benefit concentrates in low-nutrient, acidic, low-CEC, low-organic-matter soils, overwhelmingly in the tropics, and largely evaporates in moderate-pH, fertile, well-fertilised temperate soils. Jeffery et al. (2017, Environmental Research Letters) is the canonical citation and its title is the result: “Biochar boosts tropical but not temperate crop yields.” Reported patterns include roughly 35–38% yield gains in tropical acidic soils, and no yield impact at all in regions with mean annual temperature below 10 °C. For a temperate home gardener with decent, limed, compost-fed soil, the expected yield benefit is close to zero — and the peer-reviewed literature says so plainly.',
    costNote:
      'High. This is one of the most expensive things per unit volume a gardener can buy, and the evidence says it is least likely to help exactly the soils that well-resourced gardeners tend to have.',
    difficultyNote:
      'Low to apply. Moderate if you “charge” it — and the charging protocols are where the evidence thins out.',
    climateFit:
      'Genuinely justified in acidic, sandy, leached, low-organic-matter, tropical and subtropical soils. Weakly justified in temperate loam with good organic matter. Not justified by yield data in cold climates.',
    instructions: [
      'First: get a soil test. If your pH is near neutral and your organic matter is decent, the literature predicts you will see nothing.',
      'If your soil IS acidic, sandy and low in organic matter, biochar has a durable liming and CEC effect that is well supported.',
      'Never apply fresh, uncharged biochar in quantity — it can adsorb nutrients out of soil solution and cause short-term lock-up. That is the real, legitimate basis of the charging advice.',
      'Co-composting biochar with compost has research behind it (better N supply, less leaching). The elaborate fortnight-long soaks in molasses and worm leachate do not — those protocols are almost entirely vendor-authored.',
      'If your motivation is carbon sequestration rather than yield, that is a different and defensible reason to use it. Say so honestly and skip the yield claims.',
    ],
    advantages: [
      'Durable liming and cation-exchange benefit on genuinely acid soils.',
      'Very long-lived — a 2025 PNAS long-term study reports sustained benefits.',
      'Genuine carbon-sequestration credentials, independent of the yield question.',
    ],
    limitations: [
      'Little to no yield benefit in fertile temperate soils, per the meta-analytic literature.',
      'Expensive.',
      'Fresh uncharged char can lock up nutrients.',
      'The “charging” ritual is a vendor product, not a tested protocol.',
    ],
    scores: scores(
      [5, '26 meta-analyses, systematically reviewed. The evidence is strong — and it is conditional.'],
      [1, 'The most expensive amendment on the shelf, aimed at the people who need it least.'],
      [4, 'Easy to spread. The charging rituals are optional and unsupported.'],
      [2, 'For a temperate gardener with good soil, the literature predicts close to zero.'],
      [3, 'Real relevance in acid, sandy, leached soils. None in cold, fertile ones.'],
      [4, 'Not because biochar is fake — it isn’t — but because it is sold to precisely the population it will not help.'],
    ),
    verdict: V('skip'),
    verdictLine:
      'If your soil is acid, sandy and poor: worth it. If you already garden on decent compost-fed loam: the science says you are buying a very expensive nothing.',
    verdictBody:
      'This is our clearest example of the science saying the opposite of the marketing. Biochar is not a scam — it has a real mechanism and a real, long-lived effect on the right soil. But the right soil is not the soil most of our readers have, and the title of the canonical paper says so. Get a soil test before you get a bag.',
    sources: [
      s(
        'src_schmidt_biochar',
        'Schmidt et al., “Biochar in agriculture — a systematic review of 26 global meta-analyses,” GCB Bioenergy (2021)',
        'https://onlinelibrary.wiley.com/doi/10.1111/gcbb.12889',
        'peer-reviewed',
        'GCB Bioenergy',
      ),
      s(
        'src_jeffery_biochar',
        'Jeffery et al., “Biochar boosts tropical but not temperate crop yields,” Environmental Research Letters 12:053001 (2017)',
        'https://ecoss.nau.edu/wp-content/uploads/2017/04/Jeffery_2017_Environ._Res._Lett._12_053001.pdf',
        'peer-reviewed',
        'Environmental Research Letters',
      ),
      s(
        'src_pnas_biochar',
        'Sustained benefits of long-term biochar application, PNAS (2025)',
        'https://www.pnas.org/doi/10.1073/pnas.2509237122',
        'peer-reviewed',
        'PNAS',
      ),
    ],
    issueSlugs: ['04-soil-tech-what-actually-works'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'aerated-compost-tea',
    name: 'Aerated compost tea',
    imageKey: 'technique_compost_hands',
    standfirst:
      'Aeration — the entire selling point — is not the active variable. And the molasses is the step that turns a brew into a pathogen amplifier.',
    whatItIs:
      'Compost steeped in water with active aeration, usually plus a microbial food source — molasses, kelp, humic acid — then sprayed on foliage or drenched on soil.',
    problemItClaimsToSolve:
      'Foliar and soil-borne disease suppression; “inoculating” the plant and soil with beneficial microbes.',
    evidenceLevel: 'contested',
    evidenceSummary:
      'Contested, trending negative, with a real food-safety flag. The shape of the literature tells the story. The evidence that COMPOST suppresses disease is broad, old and good. The evidence that compost TEA does is thin, inconsistent and largely unreplicated. Scheuerell & Mahaffee’s 2002 review found results highly variable and contingent on compost source, brewing method and timing — and, crucially, found that compost SOURCE mattered more than aeration did, which undercuts the entire premise. Most direct aerobic-versus-non-aerobic comparisons found no difference in disease control. Then the serious part: Ingram & Millner (2007, Journal of Food Protection) found that adding the commercially formulated nutrient supplements that ACT recipes call for resulted in growth of E. coli O157:H7, Salmonella and faecal coliforms — with AERATED tea sustaining higher concentrations than non-aerated. Without supplements, E. coli O157:H7 declined below detection within 36 hours. The molasses that the compost-tea community treats as essential is the specific step that turns a benign brew into a pathogen amplifier. People spray this on lettuce.',
    costNote: 'Low materials, moderate brewer. The real cost is your time.',
    difficultyNote:
      'Medium, and deceptively so: the variables that decide whether you get a benign brew or a coliform bloom are invisible to the gardener.',
    climateFit: 'Not applicable.',
    instructions: [
      'Use the compost. Spread it, dig it in as a surface layer, mulch with it. That practice has decades of good evidence behind it.',
      'If you brew tea anyway: do not add molasses, kelp or any nutrient supplement. That is the step with the documented pathogen risk.',
      'Do not apply any compost tea to leafy crops you will eat raw.',
      'Do not spray it in the week before harvest.',
      'Understand that you are doing something with contested efficacy and non-zero risk, not a superfood for your soil.',
    ],
    advantages: [
      'If you have compost, using it AS compost has strong evidence behind it. That is the honest recommendation.',
    ],
    limitations: [
      'Efficacy is inconsistent across studies.',
      'Aeration — the whole premise — is not supported as the active variable.',
      'Documented human-pathogen risk when nutrient supplements are used, which is standard practice.',
    ],
    scores: scores(
      [4, 'Not strong evidence FOR it — strong evidence that the premise is wrong and that the standard recipe carries a risk.'],
      [4, 'Cheap to make.'],
      [2, 'Deceptively difficult: you cannot see the thing that has gone wrong.'],
      [1, 'Unreliable at best.'],
      [1, 'No climate relevance.'],
      [5, 'The one technique here with a plausible route to making someone ill. Highest hype risk on the site.'],
    ),
    verdict: V('skip'),
    verdictLine:
      'Skip it. Use the compost. If you brew anyway, leave out the molasses — that is not a preference, it is a food-safety instruction.',
    verdictBody:
      'We are aware this will annoy people, and we have thought about the tone carefully. Compost tea is made by people who care about their soil, and that instinct is right. But the aeration premise is not supported, the disease-suppression results are inconsistent, and the additive that the practice treats as essential is the one documented to grow E. coli O157:H7 and Salmonella in the brew. If someone runs a well-designed trial that says otherwise, we will publish it at the top of this page.',
    sources: [
      s(
        'src_ingram',
        'Ingram & Millner, “Factors affecting compost tea as a potential source of Escherichia coli and Salmonella on fresh produce,” J. Food Protection (2007)',
        'https://pubmed.ncbi.nlm.nih.gov/17477249/',
        'peer-reviewed',
        'Journal of Food Protection',
      ),
      s(
        'src_lcs_teabib',
        'Literature on Compost Tea and Disease Suppression — annotated bibliography, Linda Chalker-Scott, WSU',
        'https://puyallup.wsu.edu/lcs/reference-compost-tea/',
        'independent',
        'Washington State University',
      ),
      s(
        'src_lcs_teamyth',
        'The Myth of Compost Tea — Chalker-Scott, WSU',
        'https://wpcdn.web.wsu.edu/wp-puyallup/uploads/sites/403/2015/03/compost-tea.pdf',
        'independent',
        'Washington State University',
      ),
    ],
    issueSlugs: ['04-soil-tech-what-actually-works'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'no-dig-gardening',
    name: 'No-dig / no-till gardening',
    imageKey: 'technique_raised_bed',
    standfirst:
      'A practice we recommend, built on evidence that its own most famous advocate says is “indications, not proof.”',
    whatItIs:
      'Never inverting the soil. Compost and organic matter go on the surface; crops are planted through it.',
    problemItClaimsToSolve:
      'Destruction of soil structure and aggregate stability by digging, weed-seed exposure, and labour.',
    evidenceLevel: 'moderate',
    evidenceSummary:
      'Moderate for soil health; contested for yield — and the most-cited “evidence” is not evidence. Two separate bodies of work get conflated and should not be. (a) Agronomic no-till meta-analyses are large and rigorous, and they are not flattering by default: a global meta-analysis in Plant and Soil (2022) found no-till DECREASED upland crop yields by about 5% on average, with yields declining in the first one to two years and recovering to parity after three to ten years. Combining no-till with residue return and rotation cut the penalty to about 2.4% and raised soil organic carbon by up to about 12.8%. (b) The home-garden case rests largely on Charles Dowding’s dig/no-dig trial at Homeacres — and Dowding himself states it “isn’t science in comparison to what a research station would do,” that it lacks randomised replication, and that a statistical analysis of his yield results found them NOT statistically significant. He calls them indications, not proof. That is admirable candour and it should be reported as such rather than laundered into a research claim. The confound nobody separates: Dowding’s no-dig beds receive an annual surface layer of compost. Much of the benefit may be the compost, not the absence of digging. No home-garden trial we could find isolates those two variables.',
    costNote:
      'Low in labour; potentially high in compost. The recurring compost requirement is the hidden cost of no-dig at garden scale.',
    difficultyNote: 'Low. It is mostly a decision to stop doing something.',
    climateFit:
      'Broad. The yield penalty seen in agronomic trials is smallest in dry, rainfed conditions.',
    instructions: [
      'Lay 2–4 in of compost on the surface. Do not dig it in.',
      'Plant through it. Sow small seed into a shallow furrow drawn in the compost layer.',
      'Top up annually. This is the real cost of the method and it is the thing people underestimate.',
      'Expect more slugs in a wet spring. That is the honest trade.',
      'Do not expect a yield miracle in year one. The agronomic literature says the first two years are the worst.',
    ],
    advantages: [
      'Far less labour.',
      'Fewer germinating weeds — you stop bringing weed seed to the surface.',
      'Measurable soil organic carbon and microbial biomass gains.',
      'Better aggregate stability and water infiltration.',
    ],
    limitations: [
      'Compost-hungry — and compost is neither free nor carbon-neutral if you buy it in bags.',
      'Slug pressure can rise.',
      'The flagship gardening evidence is an unreplicated single-site trial by an author with a commercial interest in the outcome. We say that without malice: he says it himself.',
    ],
    scores: scores(
      [3, 'Good evidence for soil carbon. Contested for yield. And the famous garden trial is explicitly not statistically significant — per its own author.'],
      [3, 'Low labour, high compost. The compost is the cost.'],
      [5, 'The easiest technique on this site: stop digging.'],
      [4, 'We do it. The soil-structure and weed benefits are real and you will feel them in your back.'],
      [4, 'Water infiltration and moisture retention matter more every year.'],
      [3, 'The practice is sound; the evidentiary claims made for it in gardening media substantially outrun what has been demonstrated.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'Do it — for the labour, the weeds and the structure. Just do not tell yourself the yield case is settled, because the man who made it says it isn’t.',
    verdictBody:
      'The interesting question nobody is asking is whether the benefit is the not-digging or the compost. Every no-dig bed in the famous trial got an annual compost layer; every dug bed did not get the same treatment in a way that isolates the variable. Someone should run: dug + compost, dug + no compost, no-dig + compost, no-dig + no compost. Four beds. Three years. It would settle a decade of argument, and as far as we can tell it has never been done at garden scale.',
    sources: [
      s(
        'src_notill_meta',
        'Effects of no-till on upland crop yield and soil organic carbon: a global meta-analysis, Plant and Soil (2022)',
        'https://link.springer.com/article/10.1007/s11104-022-05854-y',
        'peer-reviewed',
        'Plant and Soil',
      ),
      s(
        'src_dowding',
        'Dig / No Dig Trial at Homeacres — Charles Dowding (primary source, including his own caveats)',
        'https://charlesdowding.co.uk/blogs/trials/dig-no-dig-trial-2019-2022',
        'primary',
        'Charles Dowding',
      ),
    ],
    issueSlugs: ['04-soil-tech-what-actually-works'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'wood-chip-mulch',
    name: 'Arborist wood-chip mulch',
    imageKey: 'technique_mulch_wood_chips',
    standfirst:
      'Free, boring, and the best cost-to-benefit ratio of anything on this site. The nitrogen objection is a myth — with one exception.',
    whatItIs:
      'A 2–4 in surface layer of coarse mixed arborist chips — wood, bark and leaves — left on the surface and topped up.',
    problemItClaimsToSolve: 'Weeds, water loss, soil temperature swings, and long-term organic matter.',
    evidenceLevel: 'strong',
    evidenceSummary:
      'Strong for the mulch, and the famous objection to it is a myth. Chalker-Scott’s WSU work is the reference: wood chips do NOT deplete soil nitrogen when used as a SURFACE mulch. Nitrogen immobilisation happens only in a thin interface zone where wood meets soil; roots below that zone access nitrogen normally. Chips DO cause nitrogen tie-up if they are tilled INTO the soil — which is the origin of the myth and the one thing not to do. Over time, chip mulch increases soil nitrogen. Her assessment: few drawbacks, many benefits. Separately, the mulching literature (e.g. a 2024 review in Sustainability) consistently shows organic mulch lowers summer soil surface temperature and compresses the daily temperature RANGE — the biggest swings occur in bare soil, intermediate under plastic film, smallest under organic mulch. We could not find a defensible single “degrees cooler” figure and will not print one; any specific number is cherry-picked.',
    costNote: 'Often free. Arborists pay to dump chips; many will deliver a load for nothing.',
    difficultyNote: 'Low — unless you are moving several cubic yards by wheelbarrow, in which case: medium, in the back.',
    climateFit:
      'Broad. Especially valuable around perennials, shrubs, trees and paths. In cold-spring climates it delays soil warming — pull it back in spring, replace it in June.',
    instructions: [
      'Call a local tree crew. Ask for a load of chips. Expect to pay nothing.',
      'Apply 2–4 in around perennials, shrubs and trees, and on paths.',
      'Keep it off stems and trunks. A mulch volcano will kill a tree slowly and expensively.',
      'Do NOT till it in. That, and only that, is what causes nitrogen tie-up.',
      'Do not use it on seedbeds or on a carrot row. Chips belong around plants, not on top of seeds.',
      'In a cold spring, pull it back to let the soil warm, then replace it in June.',
    ],
    advantages: [
      'Free, long-lasting, superb weed suppression.',
      'Buffers moisture and temperature.',
      'Builds soil as it breaks down.',
    ],
    limitations: [
      'Delays spring soil warming.',
      'Can harbour slugs.',
      'Not for seedbeds.',
      'The “Back to Eden” branding wraps a sound practice in claims — near-zero watering, near-zero fertility inputs — that the mulching literature does not support.',
    ],
    scores: scores(
      [5, 'Well-established extension science, and the standard objection to it has been directly refuted.'],
      [5, 'Free. Genuinely free.'],
      [4, 'Easy, if heavy.'],
      [5, 'The best cost-to-benefit ratio of any technique we have assessed.'],
      [5, 'Moisture retention and temperature buffering are the two things that matter most in a hotter summer.'],
      [2, 'The technique: no hype. The “Back to Eden” brand around it: considerable.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'The boring technique that works. Free, evidence-backed, and the only rule is: do not dig it in.',
    verdictBody:
      'If we could get one thing into every garden in America it would be this, and it costs nothing. The nitrogen myth has probably done more damage to American soil than any other piece of received gardening wisdom, because it stopped a free, effective practice on the strength of a chemistry lesson that only applies if you do the one thing you are told not to do.',
    sources: [
      s(
        'src_lcs_chips',
        'Wood chip mulch: landscape boon or bane? — Linda Chalker-Scott, WSU',
        'https://s3.wp.wsu.edu/uploads/sites/403/2015/03/wood-chips.pdf',
        'independent',
        'Washington State University',
      ),
      s(
        'src_mulch_review',
        'Organic Mulching: A Sustainable Technique to Improve Soil Quality — Sustainability 16(23):10261 (2024)',
        'https://www.mdpi.com/2071-1050/16/23/10261',
        'peer-reviewed',
        'Sustainability',
      ),
    ],
    issueSlugs: ['04-soil-tech-what-actually-works', '02-the-heat-proof-garden'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'regulated-deficit-irrigation',
    name: 'Regulated deficit irrigation',
    imageKey: 'technique_watering_can',
    standfirst:
      'You can have concentrated, better-tasting tomatoes or you can have the most tomatoes. The meta-analysis says you cannot have both, and the gardening press keeps forgetting to mention that.',
    whatItIs:
      'Deliberately irrigating below full crop demand — often 50–75% of evapotranspiration — timed to specific growth stages.',
    problemItClaimsToSolve: 'Water scarcity. And, more interestingly, flavour: watery, dilute tomatoes.',
    evidenceLevel: 'strong',
    evidenceSummary:
      'Strong, with an explicit and honest trade-off. A meta-analysis of processing tomato under regulated deficit irrigation (Agricultural Water Management 222:301–312, 2019) found RDI decreased yield by a mean of 18.61 t/ha while increasing water use efficiency by 2.33 kg/m³ and improving fruit quality. Individual trials find deficit drip at around 50% field capacity raises soluble solids and lycopene substantially while cutting water use. The direction is consistent across the literature: you trade tonnage for concentration and water. This is one of the few garden “hacks” where the mechanism, the meta-analysis and the kitchen all agree — as long as you are honest that a trade is a trade.',
    costNote: 'Free. It is a decision, not a purchase — though drip plus a timer or a moisture sensor makes it controllable.',
    difficultyNote:
      'Medium-high, and the failure mode is severe. Over-deficit on tomatoes triggers blossom-end rot, and the next heavy rain will split every fruit on the plant. Sandy soils give you almost no buffer.',
    climateFit:
      'Drought-prone and Mediterranean climates. Genuinely dangerous advice for shallow-rooted plants in containers during a heatwave.',
    instructions: [
      'Only on established, deep-rooted plants in the ground. Never on containers, never on seedlings.',
      'Water fully through flowering and early fruit set. The deficit comes AFTER fruit are set and sizing.',
      'Then reduce to roughly half of what you would normally give, and keep it steady. Consistency matters more than quantity — swings cause blossom-end rot and splitting.',
      'Mulch. A deficit regime on unmulched soil is just drought.',
      'Do not do this to leafy greens — you will bolt them — or to anything you are selling by weight.',
      'Expect fewer, smaller, better tomatoes. If that is not the trade you want, do not make it.',
    ],
    advantages: [
      'Saves 25–50% of applied water in the trials cited.',
      'Measurably improves tomato flavour chemistry.',
      'Costs nothing.',
    ],
    limitations: [
      'The yield loss is real and quantified, not hypothetical.',
      'Not appropriate for leafy crops.',
      'Severe failure mode if you overshoot or let the soil swing.',
    ],
    scores: scores(
      [5, 'A meta-analysis with a quantified trade-off in both directions. Rare and welcome.'],
      [5, 'It costs nothing. It is a decision.'],
      [2, 'The failure mode is blossom-end rot and split fruit. This is the hardest technique here to get right.'],
      [4, 'Better tomatoes and less water, if you do not overshoot.'],
      [5, 'Directly relevant anywhere water is scarce or expensive.'],
      [2, 'The science is solid. The gardening-media version — “tastier tomatoes with no downside” — is directly contradicted by the meta-analysis.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'Worth it, if you want flavour more than tonnage, and if you are honest with yourself about which one you want.',
    verdictBody:
      'The version of this advice that circulates online promises better tomatoes for free. The meta-analysis says you will get roughly 18 t/ha less crop for that flavour. On a garden scale that is a handful of tomatoes you will not eat, in exchange for the ones you do eat tasting like something. We think that is an excellent trade. But it is a trade, and you should know you are making it.',
    sources: [
      s(
        'src_rdi_meta',
        'Yield, fruit quality and water use efficiency of tomato for processing under regulated deficit irrigation: a meta-analysis, Agricultural Water Management (2019)',
        'https://www.sciencedirect.com/science/article/abs/pii/S0378377418307509',
        'peer-reviewed',
        'Agricultural Water Management',
      ),
      s(
        'src_rdi_quality',
        'Enhancement of Tomato Fruit Quality Through Moderate Water Deficit',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC11592927/',
        'peer-reviewed',
        'PMC',
      ),
    ],
    issueSlugs: ['02-the-heat-proof-garden'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'smart-irrigation-controllers',
    name: 'Weather- and sensor-based irrigation controllers',
    imageKey: 'technique_drip_irrigation',
    standfirst:
      'The only category on this site with a government certification scheme behind it — and the numbers survive it.',
    whatItIs:
      'Controllers that adjust irrigation using local weather data (ET controllers), or that override a schedule based on in-ground moisture readings (soil-moisture sensor controllers).',
    problemItClaimsToSolve:
      'The largest single source of waste in home landscapes: watering on a clock instead of on demand.',
    evidenceLevel: 'strong',
    evidenceSummary:
      'Strong, with government-verified numbers. EPA WaterSense runs an actual certification programme with performance testing, and reports that replacing a standard clock-based controller with a WaterSense-labelled weather-based controller saves an average home nearly 7,600 gallons per year, while a WaterSense-labelled soil-moisture sensor saves more than 15,000 gallons per year for an average home with an automatic irrigation system. These are the best-substantiated efficiency figures we have encountered on this beat.',
    costNote: 'Moderate. Pays back fastest where water is metered and expensive.',
    difficultyNote:
      'Medium. Misconfiguration is the main failure mode and it silently destroys the savings — a badly configured smart controller is just an expensive clock.',
    climateFit:
      'Highest value in arid and summer-dry regions with automatic irrigation. Near-zero value for a hand-watered vegetable plot.',
    instructions: [
      'Only relevant if you already have an automatic irrigation system. If you water by hand, this is not for you.',
      'Buy WaterSense-labelled. The label means it passed a performance test; unlabelled “smart” controllers mean nothing.',
      'Configure it honestly: zone by zone, soil type, plant type, sun exposure. This is the step that determines whether you save anything.',
      'A soil-moisture sensor beats a weather-based controller in the EPA’s own figures — roughly twice the saving.',
      'Check it after the first heavy rain. If it watered anyway, it is misconfigured.',
    ],
    advantages: [
      'Real, independently verified, large water savings.',
      'A certification scheme exists — which is more than can be said for biostimulants, inoculants, or the phrase “heat tolerant.”',
    ],
    limitations: [
      'Requires an existing automatic system.',
      'The savings figures are for landscape irrigation, NOT for vegetable gardens or containers.',
      'Misconfiguration silently erases the benefit.',
    ],
    scores: scores(
      [5, 'EPA WaterSense performance testing. The strongest verified numbers on the site.'],
      [3, 'Moderate hardware cost; fast payback on metered water.'],
      [3, 'Installation is fine. Configuration is where people fail.'],
      [4, 'Thousands of gallons a year, verified.'],
      [5, 'The most directly climate-relevant purchase a landscape owner can make.'],
      [2, 'Over-marketed with app gimmickry, but the core claim survives independent verification. A rarity here.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'If you have an irrigation system on a clock, replace the clock. Get the WaterSense label. Then configure it properly, or you have bought nothing.',
    verdictBody:
      'We are wary of anything with an app. This one earns it — not because the app is good, but because the EPA tested the thing and published the number.',
    sources: [
      s(
        'src_epa_wb',
        'Weather-Based Irrigation Controllers — US EPA WaterSense',
        'https://www.epa.gov/watersense/weather-based-irrigation-controllers',
        'primary',
        'US EPA',
      ),
      s(
        'src_epa_sms',
        'Soil Moisture-Based Irrigation Controllers — US EPA WaterSense',
        'https://www.epa.gov/watersense/soil-moisture-based-irrigation-controllers',
        'primary',
        'US EPA',
      ),
    ],
    issueSlugs: ['02-the-heat-proof-garden'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'hugelkultur',
    name: 'Hügelkultur',
    imageKey: 'texture_soil',
    standfirst:
      'Beautifully named, endlessly reproduced, and — on the evidence we can find — essentially untested. We found no controlled trial of it. None.',
    whatItIs:
      'Logs and woody debris buried under soil and compost, forming a mound or filling the base of a raised bed, on the theory that decomposing wood acts as a sponge and a slow-release nutrient reservoir.',
    problemItClaimsToSolve:
      'Irrigation — the claim is that beds become “self-watering” after two to three years — plus fertility, and disposal of woody waste.',
    evidenceLevel: 'insufficient',
    evidenceSummary:
      'Insufficient, and the gap between the confidence of the claims and the existence of data is enormous. Every specific figure we encountered — moisture percentages in three-year-old beds, “soil above buried logs registers several degrees warmer,” side-by-side yield comparisons — traces to permaculture blogs, practitioner accounts and content-farm pages, not to controlled or peer-reviewed trials. We found no randomised, replicated study of hügelkultur yield or water use. The mechanism is not implausible: decomposing wood does hold water and does eventually release nutrients. But a plausible mechanism is not evidence, and “no watering needed by year three” is an extraordinary claim supported only by testimony.',
    costNote: 'Free to low if you have the wood. The labour is substantial.',
    difficultyNote:
      'High in labour. This is a great deal of digging and hauling — an irony for a technique often filed alongside no-dig.',
    climateFit: 'Claimed for dry climates. Untested. In wet climates, buried wood under a mound may simply be a slug hotel.',
    instructions: [
      'If you have woody debris to dispose of on site, this is a genuinely reasonable thing to do with it.',
      'Expect nitrogen immobilisation in the first one to two years as the wood begins to decompose. This is the same chemistry that makes tilling wood chips into soil a bad idea — and hügelkultur IS burying wood in soil. Its advocates rarely mention this.',
      'Compensate with nitrogen in the early years, or plant legumes, or accept a slow start.',
      'Expect the bed to settle substantially. Everyone forgets this.',
      'Do not plan your irrigation around the self-watering claim. There is no trial behind it.',
    ],
    advantages: [
      'A genuinely useful way to dispose of woody debris on site.',
      'The mound geometry does create drainage and microclimate variation.',
    ],
    limitations: [
      'No controlled evidence of any kind that we could find.',
      'Nitrogen immobilisation in the early years.',
      'Enormous labour.',
    ],
    scores: scores(
      [1, 'We found no controlled trial. Not a weak one — none.'],
      [4, 'Free if you have the wood.'],
      [1, 'Very heavy work.'],
      [2, 'Plausible mechanism, zero measurement.'],
      [2, 'Claimed for dry climates, tested nowhere.'],
      [5, 'The confidence of the claims is completely disconnected from the existence of data.'],
    ),
    verdict: V('wait'),
    verdictLine:
      'A reasonable way to bury a log. Not, on any evidence we can find, a way to stop watering. If you build one, measure it — and send us the numbers.',
    verdictBody:
      'We are not saying it does not work. We are saying nobody has checked, which is a different and more interesting statement. If you have a hügelkultur bed and a moisture meter, you are currently better instrumented than the entire published literature. That is an absurd sentence to be able to write in 2026, and it is an open invitation.',
    sources: [
      s(
        'src_pavlis_hugel',
        'Hügelkultur Gardening Method — a critical review of the evidence, Robert Pavlis',
        'https://www.gardenmyths.com/hugelkultur-gardening-hugelkultur-raised-beds/',
        'independent',
        'Garden Myths',
      ),
    ],
    issueSlugs: ['04-soil-tech-what-actually-works'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'soil-microbiome-test-kits',
    name: 'Consumer soil-microbiome sequencing kits',
    imageKey: 'technique_plant_microscopy',
    standfirst:
      'Real science. Beautiful reports. No action thresholds. And, very often, the company reading your soil also sells the thing it recommends.',
    whatItIs:
      'Mail in a soil sample; get back an amplicon or shotgun sequencing report describing your soil’s bacterial and fungal community, usually with a “soil health score” and some product recommendations.',
    problemItClaimsToSolve:
      'The claim that conventional soil tests — pH, NPK, organic matter, CEC — miss the biology.',
    evidenceLevel: 'insufficient',
    evidenceSummary:
      'Insufficient, and we want to be careful here because the underlying science is real and improving fast. There is a genuine peer-reviewed methods literature, and the cost of sequencing has collapsed. But two things are true at once. First, the answer you get depends measurably on the kit and the pipeline, not only on your soil — DNA extraction kit choice and technician expertise materially change the resulting community profile (PMC5740954). Second, and decisively: there is no validated mapping from “your soil’s microbial community profile” to “here is what you should do differently.” There is no action threshold for a Proteobacteria-to-Acidobacteria ratio the way there is for a soil pH of 5.2. A conventional soil test tells you to add lime. A microbiome report tells you a story.',
    costNote: 'Moderate to high per sample, and recurring if you want a time series.',
    difficultyNote: 'Trivial to submit. Effectively impossible to act on.',
    climateFit: 'Not applicable.',
    instructions: [
      'Get a conventional soil test first — pH, organic matter, phosphorus, CEC. It costs a fraction as much and every recommendation it makes is actionable.',
      'If you buy a microbiome test anyway, buy it as an object of curiosity, not as a diagnostic.',
      'Look at who is selling it. If the same company sells the amendment its report recommends, that is a structural conflict of interest, not a coincidence.',
      'Ask the vendor one question: what action threshold in this report would change what I do? If they cannot answer it, neither can the science.',
    ],
    advantages: [
      'Genuinely fascinating and genuinely at the research frontier.',
      'It may well become useful. It is not useful yet.',
    ],
    limitations: [
      'No action thresholds.',
      'Methodological variance between labs.',
      'A structural conflict of interest wherever the tester is also the seller.',
    ],
    scores: scores(
      [1, 'Real methods literature; no validated link from result to action.'],
      [2, 'Expensive, and recurring if you take it seriously.'],
      [5, 'Very easy to send a sample.'],
      [1, 'You cannot act on the answer.'],
      [1, 'None.'],
      [5, 'Real science, beautiful outputs, zero actionability and a built-in upsell. The gut-microbiome-test playbook, transplanted to soil.'],
    ),
    verdict: V('skip'),
    verdictLine:
      'Spend the money on a conventional soil test and a load of compost. Ask the vendor what threshold in their report would change your behaviour. Listen to the silence.',
    verdictBody:
      'We are not sneering at the science. Soil metagenomics is one of the most exciting fields going, and in ten years this verdict may look foolish. But a test you cannot act on is not a test, it is a poster — and a poster sold by someone who also sells you the fertiliser.',
    sources: [
      s(
        'src_ngs_soil',
        'Next-generation sequencing approaches for soil microbiome research — Frontiers in Soil Science (2025)',
        'https://www.frontiersin.org/journals/soil-science/articles/10.3389/fsoil.2025.1706999/full',
        'peer-reviewed',
        'Frontiers in Soil Science',
      ),
      s(
        'src_kit_variance',
        'Profiling soil microbial communities with NGS: the influence of DNA kit selection and technician expertise',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC5740954/',
        'peer-reviewed',
        'PMC',
      ),
    ],
    issueSlugs: ['04-soil-tech-what-actually-works'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'choosing-nativars-by-trait',
    name: 'Choosing nativars by trait, not by category',
    imageKey: 'cover_issue_05_alt',
    standfirst:
      '“Nativar” is the wrong unit of analysis. Leaf colour is. Three specific selection traits break the ecology; the rest appear to be fine.',
    whatItIs:
      'A rule for deciding whether a named cultivar of a native plant will still do the ecological work the straight species does — based on what trait the breeder selected FOR.',
    problemItClaimsToSolve:
      'A decade of argument in which one camp says cultivars of natives are ecologically equivalent and the other says they are traps. Both are wrong, and the research is far more specific than either slogan.',
    evidenceLevel: 'moderate',
    evidenceSummary:
      'Moderate, and unusually actionable. Baisden, Tallamy, Narango & Boyle (HortTechnology 28(5):596–606, 2018), working at Mt. Cuba Center, compared caterpillar herbivory on woody native cultivars against straight species, sorted by which trait had been selected. Cultivars selected for different habit or size: no significant difference. Selected for disease resistance: no significant difference. Selected for enhanced fruit size: no significant reduction. Cultivars with purple or red, anthocyanin-enriched foliage: SIGNIFICANTLY reduced insect feeding — the hypothesis being that anthocyanins make the leaves less palatable. Annie White’s field research at the University of Vermont (12 native species, 14 cultivars, two sites, two years) found 7 species visited significantly more than their cultivars, 4 equal, and only 1 case where the cultivar won. Her most striking datum: 1,414 pollinator visits recorded to straight-species Achillea millefolium against 119 to a red cultivar. Mt. Cuba’s own trials put numbers on it at species level: in the three-year Echinacea trial of 75 selections, double-flowered coneflowers were markedly less favoured, and all top-ranked selections were single-flowered.',
    costNote: 'Free. It is a rule, not a purchase.',
    difficultyNote: 'Trivial. Read the tag, then apply three tests.',
    climateFit:
      'The research is regional — Mt. Cuba is mid-Atlantic, White’s work is New England, Chicago Botanic covers the upper Midwest. A cultivar ranking from Delaware may not transfer to Denver, and that is a real limitation.',
    instructions: [
      'Ask what the breeder selected FOR. It is usually in the name and always in the copy.',
      'Selected for compactness, sturdier stems, or disease resistance? The herbivory research says you are probably not paying an ecological price. Buy it.',
      'Doubled flowers? Skip it. Doubles physically obstruct or eliminate the nectar and pollen, and every trial that has looked has found pollinators avoiding them.',
      'Purple or red foliage? This is the finding people find hardest to believe. Anthocyanin-rich leaves showed significantly reduced insect feeding. If the plant is there to feed caterpillars, buy the green one.',
      'Radically altered flower colour — a red yarrow, a white coneflower where the species is purple? Treat with caution; White’s data show large drops in visitation for some of these.',
      'For restoration, as opposed to gardening, use straight species from a local seed source. Clonal cultivars carry no genetic diversity.',
    ],
    advantages: [
      'Gives you a defensible answer at the garden centre in about four seconds.',
      'Lets you buy the compact, disease-resistant, reliably behaved plant without guilt.',
      'Trait-based, so it generalises to plants nobody has trialled yet — which is most of them.',
    ],
    limitations: [
      'Tested for only a handful of genera.',
      'Regionally specific.',
      'The margins are genuinely unsettled and we are not going to pretend otherwise.',
    ],
    scores: scores(
      [4, 'Peer-reviewed, trait-sorted, and replicated across two independent research programmes.'],
      [5, 'Free.'],
      [5, 'Three questions at the garden centre.'],
      [4, 'Turns an unresolvable argument into a usable rule.'],
      [3, 'Regional. Mid-Atlantic and New England data may not transfer to your climate.'],
      [3, 'Hype runs in BOTH directions here: nurseries overstate equivalence, and some native-plant advocacy overstates harm.'],
    ),
    verdict: V('buy'),
    verdictLine:
      'Buy the compact one. Buy the disease-resistant one. Do not buy the double, and do not buy the purple-leaved one if the plant’s job is to feed something.',
    verdictBody:
      'The evidence does not say cultivars are bad. It says three specific selection traits appear to break ecological function — doubled flowers, radically altered flower colour, and purple or red foliage — while compactness and disease resistance appear ecologically neutral. That is a rule you can use, and it is far more useful than a category you can argue about.',
    sources: [
      s(
        'src_baisden_t',
        'Baisden, Tallamy, Narango & Boyle, “Do Cultivars of Native Plants Support Insect Herbivores?” HortTechnology 28(5):596–606 (2018)',
        'https://www.researchgate.net/publication/328618499_Do_Cultivars_of_Native_Plants_Support_Insect_Herbivores',
        'peer-reviewed',
        'HortTechnology',
      ),
      s(
        'src_white_t',
        'Annie White — native species vs native cultivars for pollinators (University of Vermont)',
        'https://pollinatorgardens.org/2013/02/08/my-research/',
        'independent',
        'PollinatorGardens.org',
      ),
      s(
        'src_mtcuba_ech_t',
        'Captivating Coneflowers for People and Pollinators — Mt. Cuba Center Echinacea trial',
        'https://mtcubacenter.org/captivating-coneflowers-for-people-and-pollinators/',
        'independent',
        'Mt. Cuba Center',
      ),
    ],
    issueSlugs: ['05-native-but-designed'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'dwarfing-fruit-trees',
    name: 'Making a fruit tree small: three different things, routinely conflated',
    imageKey: 'technique_pruning',
    standfirst:
      'A dwarfing rootstock, a genetic dwarf and a columnar apple are not the same product. And nobody publishes a trustworthy yield figure for any of them in a pot.',
    whatItIs:
      'Three genuinely different routes to a small fruit tree. (1) A dwarfing ROOTSTOCK — M27, M9, G.935, Bud.9, Krymsk — a normal cultivar grafted onto a root system that restricts vigour. (2) A GENETIC DWARF, such as a patio peach: a naturally compact cultivar, where the dwarfing is in the top of the plant, not the root. (3) A COLUMNAR apple — the Ballerina types, derived from the ‘McIntosh Wijcik’ sport — which bears fruit on spurs along a single upright axis with almost no branching.',
    problemItClaimsToSolve: 'Fruit in small gardens, on patios, in pots.',
    evidenceLevel: 'moderate',
    evidenceSummary:
      'Strong for rootstocks; moderate for columnar; and genuinely LIMITED for realistic home yields. Rootstock size control is one of the best-characterised systems in horticulture, with a century of trials — though a recent western New York study found rootstock effects on performance and fruit quality are NOT uniform across cultivars, so catalogue tables oversimplify. Columnar apples have a documented quality problem catalogues do not mention: the first-generation Ballerina cultivars, which are the ones still widely sold, are described in the horticultural literature as scab-susceptible, prone to biennial bearing, and producing fruit that was “not competitive.” The columnar habit is a triumph of architecture and, in the first generation, a compromise on the apple. And then the finding that should trouble the whole category: every specific container-yield figure we could find traces to SEO gardening sites, several of them citing a study we could not locate and do not believe exists. There is no credible extension-published yield figure for patio fruit. The entire category is sold without one.',
    costNote: 'Moderate for a grafted tree. Containers, potting media and irrigation add up quickly.',
    difficultyNote:
      'Higher than advertised. Dwarfing rootstocks — M27 especially — are poorly anchored and REQUIRE permanent staking. They are shallow-rooted, therefore drought-intolerant and unforgiving of a missed watering. In a container, every one of those problems is amplified.',
    climateFit:
      'Rootstock must match climate: Geneva stocks in fire-blight country, Budagovsky for severe winters, and the scion’s chill requirement must match your winter.',
    instructions: [
      'Decide which of the three you actually want. A catalogue that says “dwarf” without saying which is not telling you enough to choose.',
      'For a container apple, M27 is the extreme dwarf most often recommended — and it must be permanently staked. That is not optional.',
      'Match the chill requirement to your winter. Low-chill breeding exists precisely because winters are warming; a high-chill cultivar in a warm winter will flower erratically or not at all.',
      'Treat “self-fertile” carefully. It means “will set fruit alone,” NOT “will set its best crop alone.” Most apples are semi-self-fruitful; blueberries are self-pollinating but yield better and bigger with a second variety.',
      'Do not believe a yield number unless someone will tell you where it came from. We could not find a single credible one.',
      'Water like it is a container plant, because it is. The dwarfing rootstock removed the tree’s drought buffer along with its height.',
    ],
    advantages: [
      'Precocity: fruit in two to three years rather than six to eight.',
      'No ladder.',
      'Genuine patio viability — for the right species, in the right pot.',
    ],
    limitations: [
      'Permanent staking on dwarf rootstocks.',
      'Shallow roots mean no forgiveness on watering.',
      'First-generation columnar apples are scab-prone and biennial.',
      'No trustworthy yield data anywhere in the category.',
    ],
    scores: scores(
      [4, 'A century of rootstock trials. But the yield question — the one you actually care about — is unmeasured.'],
      [3, 'A grafted tree plus a large container plus potting media is not a cheap project.'],
      [2, 'Staking, watering discipline, pruning, pollination. Sold as easy; it is not.'],
      [3, 'Real fruit in a real pot — but far less of it than the catalogue photograph implies.'],
      [4, 'Low-chill breeding is one of the most important adaptations to warming winters in all of fruit.'],
      [4, '“Grow an orchard on your balcony” is one of the most aggressively marketed and least substantiated propositions in consumer horticulture.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'Yes, you can grow fruit in a pot. No, nobody will tell you how much — and the absence of that number, across the entire industry, is the story.',
    verdictBody:
      'We went looking for one trustworthy figure: how many pounds of fruit does a dwarf peach in a half-barrel actually produce in a normal year? Every number we found traced back to content farms, and several cited a study we cannot locate. This is a category worth billions that has never published its central performance metric. So we are going to generate it: a reader trial, weighing scales, three seasons. If you have a patio fruit tree, we want to hear from you.',
    sources: [
      s(
        'src_wvu_rootstock',
        'Rootstocks for Apples — West Virginia University Extension',
        'https://extension.wvu.edu/agriculture/horticulture/apple-rootstocks',
        'independent',
        'WVU Extension',
      ),
      s(
        'src_columnar',
        'Columnar apple trees and their varieties — Acta Universitatis Agriculturae et Silviculturae Mendelianae Brunensis',
        'http://acta.mendelu.cz/artkey/acu-201208-0004_columnar-apple-trees-and-their-varieties.php',
        'peer-reviewed',
        'Acta Univ. Agric.',
      ),
      s(
        'src_rootstock_ny',
        'Rootstock effect on horticultural performance and fruit quality is not uniform across five commercial apple cultivars in western New York',
        'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11930806/',
        'peer-reviewed',
        'PMC',
      ),
    ],
    issueSlugs: ['03-fruit-trees-shrunk'],
  }),

  // -------------------------------------------------------------------------
  mk({
    slug: 'reading-the-hardiness-map',
    name: 'Reading the 2023 hardiness map correctly',
    imageKey: 'cover_issue_02_alt',
    standfirst:
      'Half the country moved half a zone warmer. The USDA itself cautions against reading that as a climate signal — and the map has never measured the season that is actually hurting you.',
    whatItIs:
      'The USDA Plant Hardiness Zone Map, revised in November 2023: a map of the average annual EXTREME MINIMUM winter temperature, computed from 1991–2020 normals, in 10 °F zones and 5 °F half-zones. Built by USDA-ARS with Oregon State’s PRISM Climate Group.',
    problemItClaimsToSolve:
      'Whether a perennial is statistically likely to survive your winter. That is the entire claim.',
    evidenceLevel: 'strong',
    evidenceSummary:
      'Strong as a description of winter minima; insufficient as a guide to anything else. The 2023 map used 13,412 weather stations against 7,983 for the 2012 edition — so it is a better map. About half the country shifted to the next warmer half zone and about half stayed the same. But USDA-ARS itself writes that temperature updates to plant hardiness zones “are not necessarily reflective of global climate change,” and its developers cautioned against treating the zone changes as reliable indicators of it — because extreme minimum temperature is a single-night statistic with high year-to-year variance, and because the station density and the mapping method both changed. The honest read: the map got better, and it got warmer, and the two causes are entangled.',
    costNote: 'Free.',
    difficultyNote: 'Trivial — enter your ZIP code. The difficulty is in not over-reading the answer.',
    climateFit: 'US, Alaska, Hawaii, Puerto Rico. Thirteen zones.',
    instructions: [
      'Look up your zone. Then remember what it is: an average of annual lows. Half of all years will be colder than your number implies.',
      'It does not measure heat. It does not measure summer length, humidity, drought, chill accumulation, snow cover, or the coldest night you will ever get.',
      'For heat, look at the AHS Heat Zone Map — average days above 86 °F. It is the correct SHAPE of measurement, and it has not been meaningfully updated since 1997, and almost nothing is labelled with it. That is a scandal in its own quiet way.',
      'Trust your microclimate over the map. A south wall, an urban heat island, or a frost pocket at the bottom of your garden routinely moves a site a full half-zone. The map cannot see any of them.',
      'Do not plant a palm because your zone number changed. That is not what happened.',
    ],
    advantages: [
      'The best-available, highest-resolution, most station-dense version yet.',
      'Interactive and free.',
    ],
    limitations: [
      'Measures one winter night, not a growing season.',
      'Blind to heat, humidity and drought — which are the things now killing plants.',
      'Cannot see microclimates.',
    ],
    scores: scores(
      [5, 'Excellent at what it measures.'],
      [5, 'Free.'],
      [5, 'A ZIP code.'],
      [3, 'Useful, and routinely asked to answer questions it was never built to answer.'],
      [2, 'It measures the wrong season for the decade we are in.'],
      [4, 'Not because the map is hyped — because its interpretation is. Every “your zone changed” article of the last two years runs past what USDA actually said.'],
    ),
    verdict: V('watch'),
    verdictLine:
      'A better map of the wrong thing. Gardening’s most-consulted map measures the coldest night of winter — and the season that is hurting you is summer.',
    verdictBody:
      'Here is the sentence we would like every gardening publication to internalise: a warmer WINTER zone tells you nothing about whether your tomatoes will set fruit in August. The heat map that would tell you is nearly thirty years old and is printed on almost no plant tags. That is the gap this publication was built to sit in.',
    sources: [
      s(
        'src_usda_phzm',
        'USDA Unveils Updated Plant Hardiness Zone Map — USDA Agricultural Research Service',
        'https://www.ars.usda.gov/news-events/news/research-news/2023/usda-unveils-updated-plant-hardiness-zone-map/',
        'primary',
        'USDA ARS',
      ),
      s(
        'src_usda_map',
        'USDA Plant Hardiness Zone Map (interactive)',
        'https://planthardiness.ars.usda.gov/',
        'primary',
        'USDA',
      ),
      s(
        'src_ahs_heat',
        'Heat Zones, Plant Health, and the AHS Heat Zone Map — United States Botanic Garden',
        'https://www.usbg.gov/blog/heat-zones-plant-health-and-ahs-heat-zone-map',
        'independent',
        'US Botanic Garden',
      ),
    ],
    issueSlugs: ['02-the-heat-proof-garden', '01-plants-you-havent-seen-yet'],
  }),
];

export const techniquesBySlug = Object.fromEntries(techniques.map((t) => [t.slug, t]));

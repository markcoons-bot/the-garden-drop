/**
 * THE FIRST FIVE ISSUES — plus one in the schedule, so you can see the
 * editorial workflow working.
 *
 * Everything here is drawn from research/plants-research.md and
 * research/techniques-research.md. Nothing is invented: no quotations we did
 * not obtain, no prices, no specifications the introducer has not published,
 * no findings that are not in the cited literature.
 *
 * Where an interview has not yet been secured, we print the questions we
 * intend to ask instead of inventing the answers. We think that is more
 * interesting anyway — and it is how a new publication earns access.
 */

import type { Issue, Source, Story } from '@/lib/types';

const s = (
  id: string,
  title: string,
  url: string,
  kind: Source['kind'],
  publisher?: string,
): Source => ({ id, title, url, kind, publisher, accessed: '2026-07-13' });

// ---------------------------------------------------------------------------
// LEAD STORIES
// ---------------------------------------------------------------------------

export const stories: Story[] = [
  {
    id: 'story_01_lead',
    slug: 'the-year-the-breeders-told-the-truth',
    title: 'The year the breeders told the truth',
    standfirst:
      'Read what a plant catalogue does not claim. It is more informative than everything it does.',
    kind: 'lead',
    imageKey: 'hero_dark_bloom',
    issueSlug: '01-plants-you-havent-seen-yet',
    status: 'published',
    pullQuote:
      'The most useful sentence in this year’s catalogues is one that admits a flaw.',
    body: `Somewhere in the copy for Incrediball Storm Proof — a smooth hydrangea bred, at last, not to lie down in the rain — Proven Winners tells you that the flowers are smaller than the ones on the plant it replaces.

Read that again. A marketing department, describing a plant it spent years developing, volunteering the downside in the second paragraph. There is more genuine information in that admission than in a hundred adjectives, because it tells you the trade was measured. Somebody stood in a nursery row after a storm and counted.

This is the discipline we are trying to build a publication around. Not enthusiasm — there is no shortage of enthusiasm in gardening — but the far rarer habit of noticing what is *not* being said.

**Three sentences worth more than the photographs**

The first is Proven Winners on Perfecto Mundo Fuchsia Carpet, a reblooming azalea that grows as a carpet rather than a shrub: it is, they write, "better suited to milder coastal areas of zone 6b than harsh Midwestern sites." That is a company telling you where its plant will fail. In an industry where every tag is an optimism, this is close to radical.

Twelve new shrubs reach the trade this year from Proven Winners ColorChoice alone. Not one of them is a Buddleia, a Weigela or a Physocarpus — three of the genera the trade press keeps announcing. We mention that only because it is the kind of small factual thing that gets repeated for a year once somebody prints it wrong.

The second is Encore Azalea's own FAQ, which concedes that the stated mature size of its plants "is not a maximum height, but a size that is easily maintainable through yearly pruning." That is a plant-sized asterisk, and it explains a great deal about why the four-foot azalea you bought is now six feet.

The third is the one nobody has printed at all, because it is a silence. Across the 2026 rose introductions we could examine — Star Roses & Plants and Proven Winners among them — not one claims resistance to rose rosette disease. They claim black spot resistance. They claim "excellent disease resistance," which is a phrase and not a datum. On the mite-vectored virus that actually kills the plant, they say nothing.

**The silence is correct**

We went looking for why. In 2023, Windham and colleagues published a three-year, two-site field trial in *Pathogens* — 108 rose accessions, disease pressure deliberately amplified by releasing hundreds of viruliferous mites onto each plant, no sprays. The finding: every major commercial cultivar was susceptible to some degree. Knock Out — the most planted rose in America, the one sold on being unkillable — rated moderate. Several Oso Easy varieties rated high. The twenty-one accessions that showed little or no disease were almost all wild species and near-species hybrids, the sort of thing you cannot buy at a garden centre. And roughly half of those still tested positive for the virus. They were carriers, quietly.

American garden rose production fell from about 37 million bushes in 2014 to about 25 million in 2019, and the losses are attributed principally to rose rosette and black spot. A four-million-dollar USDA consortium across five universities is working on it. A resistance QTL has been mapped. Marker-assisted selection is under way.

And as of this July, we can find no evidence that a rose-rosette-resistant cultivar has been commercially released.

So when a 2026 catalogue does not claim RRD resistance, it is not being coy. It is being honest. And if anyone tells you their new rose resists it, the correct response is not excitement. It is: *show me the data.*

**What this issue is for**

Twelve genuinely new shrubs reach the trade this year from one breeder alone. A hosta with red leaves that wants sun won Chelsea. A tomato arrived with resistance to three foliar diseases stacked into it, for the price of a coffee. A university in Minnesota quietly opened its patented apple genetics to small growers for a hundred dollars, while the best blueberry genetics on earth stayed locked behind a fifty-hectare planting minimum.

Some of that is progress. Some of it is a colour change with a trademark attached. Our entire job is to tell you which is which, and to tell you what we do not yet know — because a publication that is never uncertain is not reporting, it is advertising.

Fourteen plants. Six we would buy. And one question we are putting to every breeder who will take the call: *what would have to be true for you to admit this plant did not work?*`,
    sources: [
      s(
        's01_pw_storm',
        'Incrediball Storm Proof Hydrangea',
        'https://www.provenwinnerscolorchoice.com/product/incrediball-storm-proof-hydrangea/',
        'primary',
        'Proven Winners ColorChoice',
      ),
      s(
        's01_pmfc',
        'Perfecto Mundo Fuchsia Carpet Reblooming Azalea (zone 6b caveat)',
        'https://provenwinnersdirect.com/products/perfecto-mundo-fuchsia-carpet-reblooming-azalea',
        'primary',
        'Proven Winners Direct',
      ),
      s(
        's01_encore_faq',
        'Encore Azalea — Frequently Asked Questions (mature size)',
        'https://encoreazalea.com/planting-care/frequently-asked-questions/',
        'primary',
        'Encore Azalea',
      ),
      s(
        's01_windham',
        'Windham et al., Pathogens 12:439 (2023) — field resistance to rose rosette disease across 108 accessions',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC10052971/',
        'peer-reviewed',
        'Pathogens',
      ),
      s(
        's01_tamu',
        'Combating Rose Rosette Disease — USDA NIFA SCRI consortium',
        'https://roses.tamu.edu/research/combating-rose-rosette-grant/',
        'independent',
        'Texas A&M University',
      ),
    ],
  },

  {
    id: 'story_02_lead',
    slug: 'the-map-measures-the-wrong-season',
    title: 'The map measures the wrong season',
    standfirst:
      'Your hardiness zone tells you about one night in January. It says nothing about the August that is actually killing your garden.',
    kind: 'lead',
    imageKey: 'cover_issue_02',
    issueSlug: '02-the-heat-proof-garden',
    status: 'published',
    pullQuote:
      'A warmer winter zone tells a gardener nothing about whether their tomatoes will set fruit in August.',
    body: `In November 2023 the USDA published a new Plant Hardiness Zone Map, and about half the country woke up half a zone warmer.

The coverage wrote itself. Zones are shifting. The climate is changing. Plant a palm.

Here is what the USDA actually said. The 2023 map was built from 13,412 weather stations, against 7,983 for the 2012 edition. It is a better map — denser, higher-resolution, computed from 1991–2020 normals by the Agricultural Research Service with Oregon State's PRISM Climate Group. And the agency's own developers cautioned against reading the zone changes as reliable indicators of global climate change, because the statistic in question — the average annual *extreme minimum* temperature — is a single-night event with enormous year-to-year variance, and because both the station density and the mapping method changed between editions.

So: the map got better, and it got warmer, and the two causes are tangled together. That is a more interesting sentence than the one in the headlines, and it is the true one.

**But the deeper problem is not the map's accuracy. It is its subject.**

The hardiness map measures the coldest night of the year. That is the whole claim. It does not measure heat. It does not measure summer length, humidity, drought, chill accumulation, snow cover, or the temperature at which your pepper plants stop setting fruit.

And heat is what is killing gardens now.

There *is* a heat map. The American Horticultural Society published one in 1997: twelve zones, based on the average number of days per year above 86°F — the temperature at which many plants begin to show real physiological damage. The metric is the right shape. It counts duration, not peak, which is the correct variable for cumulative heat stress.

It has not been meaningfully updated since 1997. It is printed on almost no plant tags. We could find no peer-reviewed validation study showing that heat-zone ratings predict plant performance the way hardiness zones predict winter survival.

Gardening's most-consulted map measures the wrong season, and the map that measures the right one has been left to gather dust for nearly thirty years.

**What actually works, then**

If the maps will not help you, the trials will. And the most useful heat data available to a home gardener comes not from a climate model but from four years of bell peppers in Delaware.

Emmalea Ernest, at the University of Delaware's Cooperative Extension, ran shade-cloth trials that produced findings specific enough to act on tomorrow. Thirty per cent shade cloth — not fifty, not seventy — gave the highest yields, tripling marketable yield against the unshaded control. Black outperformed white, red and aluminised. And the timing finding is the one that matters most: shading from *transplant*, in early June, beat shading from July, because early shade prevented heat-induced girdling of the transplant stems. By the time you feel the heatwave, you have already lost the benefit.

Note carefully what the shade did *not* do. It did not produce more peppers. It produced *bigger* peppers, and fewer sunscalded culls. The gain was in quality, not in count — which is exactly the kind of specific, slightly disappointing, entirely actionable finding that never survives the journey into a gardening listicle.

And there is a cheaper intervention still, which almost nobody leads with: change the variety before you change the equipment. Heat-set tomatoes exist because pollen viability collapses under high day and, especially, high *night* temperatures. But even here the honesty has to be complete — a 2021 paper in *AoB PLANTS* found that tomato cultivars can maintain pollen viability without maintaining yield, and vice versa. "Heat tolerant" is an unregulated marketing phrase with no standard behind it.

**The gap this publication sits in**

A better map of the wrong thing. A right map nobody maintains. A shelf of products labelled with a phrase that means nothing.

And, underneath all of it, a very small number of people running actual trials, publishing actual numbers, and being ignored — because their findings are specific, modest, and true, and the internet prefers the opposite.`,
    sources: [
      s(
        's02_usda',
        'USDA Unveils Updated Plant Hardiness Zone Map',
        'https://www.ars.usda.gov/news-events/news/research-news/2023/usda-unveils-updated-plant-hardiness-zone-map/',
        'primary',
        'USDA Agricultural Research Service',
      ),
      s(
        's02_ahs',
        'Heat Zones, Plant Health, and the AHS Heat Zone Map',
        'https://www.usbg.gov/blog/heat-zones-plant-health-and-ahs-heat-zone-map',
        'independent',
        'United States Botanic Garden',
      ),
      s(
        's02_udel',
        'Shade Cloth for Bell Peppers — University of Delaware Cooperative Extension (Emmalea Ernest)',
        'https://sites.udel.edu/weeklycropupdate/?p=20476',
        'independent',
        'University of Delaware Extension',
      ),
      s(
        's02_aob',
        'Contrasting processing tomato cultivars unlink yield and pollen viability under heat stress — AoB PLANTS 13(4), 2021',
        'https://academic.oup.com/aobpla/article/13/4/plab046/6323247',
        'peer-reviewed',
        'AoB PLANTS',
      ),
    ],
  },

  {
    id: 'story_03_lead',
    slug: 'nobody-will-tell-you-how-much-fruit',
    title: 'Nobody will tell you how much fruit',
    standfirst:
      'The patio fruit tree is a billion-dollar category sold entirely without its central number. We went looking for it. It does not exist.',
    kind: 'lead',
    imageKey: 'cover_issue_03',
    issueSlug: '03-fruit-trees-shrunk',
    status: 'published',
    pullQuote:
      'An entire category, sold on a promise, with no published measurement of whether the promise is kept.',
    body: `Here is a simple question. You buy a dwarf peach in a half-barrel on a sunny patio, you water it, you feed it, you do everything right. In a normal year, how much fruit do you get?

We spent a long time looking for the answer. What we found was a chain of numbers — twenty to fifty pounds annually; fifteen to thirty pounds from a container peach; forty-five to a hundred and thirty-five pounds from a dwarf — each cited confidently, each traceable to a gardening content site, several of them citing a university study that we could not locate and do not believe exists.

There is no credible extension-published yield figure for patio fruit. Not one that we could find.

That absence is the story. This is a category worth an enormous amount of money, sold on a specific promise — *fruit, from a pot, on your balcony* — and nobody has published a measurement of whether the promise is kept.

**Three different products wearing the same word**

Part of the confusion is that "dwarf" describes three unrelated things, and catalogues rarely say which they mean.

A **dwarfing rootstock** — M27, M9, G.935, Bud.9 — is a normal apple grafted onto a root system that restricts its vigour. The size control lives underground. This is one of the best-characterised systems in all of horticulture, with a century of trials behind it, and it comes with a warning the catalogues bury: M27 trees are poorly anchored and *require permanent staking*. They are shallow-rooted, which means drought-intolerant, which means unforgiving of a missed watering. In a container, every one of those problems is amplified. The rootstock that gave you the small tree also took away its buffer.

A **genetic dwarf** — the patio peach — is a naturally compact cultivar. The dwarfing is in the top of the plant, not the root. Different mechanism, different behaviour, same word on the label.

A **columnar apple** — the Ballerina types, descended from a single sport of McIntosh — grows as a single upright stem with fruiting spurs and almost no branches. It is a genuinely beautiful piece of plant architecture. It also has a problem the catalogues do not mention: the first-generation columnar cultivars, which are the ones still widely sold, are described in the horticultural literature as scab-susceptible, prone to biennial bearing, and producing fruit that was "not competitive." The habit is a triumph. The apple, in that first generation, was a compromise.

**And "self-fertile" is doing enormous work**

Self-fertile means *will set fruit alone*. It does not mean *will set its best crop alone*. Most apples are semi-self-fruitful — they will give you an adequate crop without a partner and a better one with. Blueberries self-pollinate and still produce larger berries and higher yields with a second variety nearby. The entire pitch of the patio fruit category is *one tree, one balcony, fruit* — and that sentence is true, and it is quietly leaving crop on the table.

**Who actually has the good genetics**

Meanwhile, the most exciting fruit breeding of the last three years is largely not for sale to you.

Fall Creek's Apex blueberry — zero-to-low chill, twenty-one-millimetre berries, forty-five days of post-harvest firmness — is gated behind a fifty-hectare planting minimum and an IP-compliance review. The University of Florida's strawberry with a reflexed calyx that curls away from the fruit shoulder to reduce Botrytis, which is one of the most elegant pieces of plant architecture we have read about this year, is commercial-licence only. Washington State's new apple reaches supermarkets around 2029.

And then there is the University of Minnesota, which has done the opposite. Superior Fruit Innovations is a hundred-dollar, ten-year membership — a dollar per tree at purchase, then a dollar per plant per year from year four — that lets small and direct-market growers plant *and sell* patented UMN apples and grapes: Big Flirt, which stores for seven to nine months in an ordinary cellar, and the Northern Glo seedless table grapes, the first that are consistently hardy in Zone 4.

One hundred dollars against fifty hectares. Two philosophies of who gets access to genetics, running in the same decade, and only one of them is being written about.

**So we are going to measure it**

We are asking readers with patio fruit trees to weigh their harvest. Species, cultivar, rootstock if you know it, pot size, year planted, and pounds picked. We will publish the distribution — including the zeroes.

It should not fall to a new publication and its readers to generate the central number of a major horticultural category. But somebody has to, and nobody has.`,
    sources: [
      s(
        's03_wvu',
        'Rootstocks for Apples — West Virginia University Extension',
        'https://extension.wvu.edu/agriculture/horticulture/apple-rootstocks',
        'independent',
        'WVU Extension',
      ),
      s(
        's03_columnar',
        'Columnar apple trees and their varieties — Acta Univ. Agric. Silvic. Mendel. Brun.',
        'http://acta.mendelu.cz/artkey/acu-201208-0004_columnar-apple-trees-and-their-varieties.php',
        'peer-reviewed',
        'Acta Universitatis Agriculturae',
      ),
      s(
        's03_fallcreek',
        'Fall Creek launches Apex (FCM14-057) blueberry — Fall Creek® Collection eligibility',
        'https://www.fallcreeknursery.com/blog/fall-creek-launches-apex-fcm14-057-blueberry-variety-as-latest-addition-to-the-fall-creek-collection',
        'primary',
        'Fall Creek Farm & Nursery',
      ),
      s(
        's03_umn',
        'Superior Fruit Innovations — University of Minnesota',
        'https://superiorfruitinnovations.umn.edu/grapes',
        'primary',
        'University of Minnesota',
      ),
      s(
        's03_ufl',
        'UF/IFAS strawberry varieties — Florida Encore® and Florida Ember®',
        'https://gcrec.ifas.ufl.edu/ufifas-strawberry-varieties/',
        'primary',
        'University of Florida IFAS',
      ),
    ],
  },

  {
    id: 'story_04_lead',
    slug: 'the-most-beautiful-idea-in-soil-science',
    title: 'The most beautiful idea in soil science may be the least supported',
    standfirst:
      'The wood wide web sells fungus in a bag. A 2023 paper found the central claim has no peer-reviewed evidence behind it at all — and that the scientific literature has been citing itself into confidence.',
    kind: 'lead',
    imageKey: 'cover_issue_04',
    issueSlug: '04-soil-tech-what-actually-works',
    status: 'published',
    pullQuote:
      'Fewer than 12% of commercial mycorrhizal products delivered both a growth benefit and a viable colonisation. The symbiosis is real. The product is not.',
    body: `It is the loveliest story modern biology has given the general reader: that trees are joined below ground by fungal threads, that they trade sugar through them, that a mother tree recognises her own seedlings and feeds them preferentially, that a forest is less a collection of individuals than a single conversing organism.

It sold books. It rewrote how a generation of gardeners thinks about soil. And it underwrites, directly, a market approaching a billion dollars in fungal products you can pour into a planting hole.

In 2023, Justine Karst, Melanie Jones and Jason Hoeksema published a paper in *Nature Ecology & Evolution* examining three headline claims about common mycorrhizal networks in forests. Their findings, in order:

That the networks are widespread in forests — *insufficiently supported.*

That resources transferred through them increase seedling performance — *insufficiently supported*; the field results vary too widely, have alternative explanations, or are too limited to generalise.

That mature trees preferentially send resources and defence signals to their own offspring through these networks — *no peer-reviewed published evidence at all.*

And then the finding that should worry anyone who reads science for a living: they documented **positive citation bias**. The scientific literature itself had been citing these claims more confidently than the underlying studies warranted. The story had become true by repetition, inside the peer-reviewed record.

Suzanne Simard and colleagues have rebutted, publicly and in the journals, and the dispute is live and unresolved. We are not declaring a winner, and neither should anyone else. But note what is *not* in dispute: mycorrhizal symbiosis itself. That is real, ancient, and central to how plants feed. It is only the charismatic, product-selling version of the story — the mothers, the altruism, the whispered warnings — that turns out to rest on the thinnest evidence.

**Which brings us to the bag**

If the emotional appeal is the wood wide web, the transaction is the inoculant: a packet of mycorrhizal spores, sold as a powder, a granule, a root dip, an ingredient in "organic" fertiliser. The premise is that you add fungi and the symbiosis establishes.

Three recent findings, taken together, are about as close to a verdict as this beat ever gets.

Salomon and colleagues (*iScience*, 2022) tested twenty-five commercial products from Australia and Europe. **Over 80% failed to induce any arbuscular mycorrhizal root colonisation at all** — and they were tested in sterilised soil, under conditions deliberately favourable to the fungi. That is the easiest possible exam, and four in five products failed it. The authors proposed a quality-management framework precisely because mandatory quality control of these products is, in their words, sparse or non-existent in most countries.

Koziol, McKenna and Bever (*New Phytologist*, 2025) went further: a meta-analysis across **302 trials**. Fewer than **12%** of commercial products showed both a significant growth benefit *and* viable fungal colonisation. Laboratory-grown inoculants managed sufficient colonisation in 63% of cases; commercial products, 12%. The documented failure modes make grim reading: non-viable strains, crop mortality, **contamination with fungal pathogens**, mislabelling.

And in 2025, Boussageon and colleagues published a paper whose title is the entire finding: *"Poor Quality of Commercial Arbuscular Mycorrhizal Inoculants Used for Agriculture and Home Gardening."*

Linda Chalker-Scott at Washington State has been saying this for years, and her framing is the one to keep: **most soil that has grown plants already contains mycorrhizal fungi.** You do not need to add them. You need to stop killing them — less tillage, less phosphorus, living roots in the ground through the year. If you build it, they will come. And if you want to inoculate a genuinely sterile substrate, a handful of soil from beneath a healthy established plant is free and works better than most of what is on the shelf.

**The pattern, once you see it**

This issue assesses seven soil techniques, and a shape keeps recurring.

Biochar has a real mechanism and a real effect — in acidic, sandy, low-organic-matter tropical soils. The canonical meta-analysis is titled, without irony, "Biochar boosts tropical but not temperate crop yields." It is the most expensive amendment on the shelf, and it is marketed hardest to temperate gardeners with good compost-fed soil, for whom the literature predicts approximately nothing.

Compost tea's entire premise is aeration — and the comparison studies find that compost *source* matters more than aeration does. Meanwhile Ingram and Millner showed that the molasses and kelp supplements that every recipe calls for are the specific step that grows *E. coli* O157:H7 and *Salmonella* in the brew, with aerated tea sustaining *higher* concentrations than non-aerated. People spray this on lettuce.

Hügelkultur, we could find no controlled trial of. Not a weak one. None.

And wood-chip mulch — free, unglamorous, dismissed for decades on a nitrogen argument that only applies if you till it in, which you are told not to do — turns out to be the best cost-to-benefit intervention available to any gardener in America.

**The uncomfortable summary**

The techniques with the best stories have the worst evidence. The technique with no story at all is the one that works, and it is free.

That is not a coincidence. It is a market.`,
    sources: [
      s(
        's04_karst',
        'Karst, Jones & Hoeksema, “Positive citation bias and overinterpreted results lead to misinformation on common mycorrhizal networks in forests,” Nature Ecology & Evolution 7:501–511 (2023)',
        'https://www.nature.com/articles/s41559-023-01986-1',
        'peer-reviewed',
        'Nature Ecology & Evolution',
      ),
      s(
        's04_simard_rebuttal',
        'Belowground carbon transfer across mycorrhizal networks among trees: facts, not fantasy (rebuttal)',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC10751480/',
        'peer-reviewed',
        'PMC',
      ),
      s(
        's04_koziol',
        'Koziol, McKenna & Bever, “Meta-analysis reveals globally sourced commercial mycorrhizal inoculants fall short,” New Phytologist (2025)',
        'https://nph.onlinelibrary.wiley.com/doi/10.1111/nph.20278',
        'peer-reviewed',
        'New Phytologist',
      ),
      s(
        's04_salomon',
        'Salomon et al., iScience (2022) — quality management framework for commercial AMF inoculants',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC9254352/',
        'peer-reviewed',
        'iScience',
      ),
      s(
        's04_jeffery',
        'Jeffery et al., “Biochar boosts tropical but not temperate crop yields,” Environmental Research Letters 12:053001 (2017)',
        'https://ecoss.nau.edu/wp-content/uploads/2017/04/Jeffery_2017_Environ._Res._Lett._12_053001.pdf',
        'peer-reviewed',
        'Environmental Research Letters',
      ),
      s(
        's04_ingram',
        'Ingram & Millner (2007) — compost tea as a potential source of E. coli and Salmonella on fresh produce',
        'https://pubmed.ncbi.nlm.nih.gov/17477249/',
        'peer-reviewed',
        'Journal of Food Protection',
      ),
      s(
        's04_chips',
        'Wood chip mulch: landscape boon or bane? — Linda Chalker-Scott, WSU',
        'https://s3.wp.wsu.edu/uploads/sites/403/2015/03/wood-chips.pdf',
        'independent',
        'Washington State University',
      ),
    ],
  },

  {
    id: 'story_05_lead',
    slug: 'nativar-is-the-wrong-question',
    title: '“Nativar” is the wrong question. Leaf colour is the right one.',
    standfirst:
      'The research does not say cultivars of natives are bad. It says three specific selection traits break the ecology — and the rest appear to be fine. That is a rule you can use in a garden centre.',
    kind: 'lead',
    imageKey: 'cover_issue_05',
    issueSlug: '05-native-but-designed',
    status: 'published',
    pullQuote:
      '1,414 pollinator visits to the straight-species yarrow. 119 to the red cultivar. The same plant, differently coloured.',
    body: `For a decade the native-plant argument has been fought at the level of a word. *Nativar* — a named, clonally propagated cultivar of a native species — is either a sensible domestication or an ecological trap, depending on who is talking.

Both camps are wrong, and the research that settles it has been sitting in the literature since 2018, saying something much more specific and much more useful than either slogan.

**What the research actually found**

Baisden, Tallamy, Narango and Boyle, working at Mt. Cuba Center and publishing in *HortTechnology*, compared caterpillar herbivory on woody native cultivars against their straight species — and, crucially, sorted the cultivars by *what trait the breeder had selected for*.

Selected for a different habit or size: **no significant difference** in herbivory.

Selected for disease resistance: **no significant difference.**

Selected for enhanced fruit size: **no significant reduction.**

Cultivars with purple or red, anthocyanin-enriched foliage: **significantly reduced insect feeding.** The proposed mechanism is straightforward — anthocyanins make the leaves less palatable. The caterpillars that a native tree is supposed to feed simply eat less of it.

So the meaningful category is not *cultivar*. It is *leaf colour*. A compact, disease-resistant native cultivar with green leaves appears to feed caterpillars perfectly well. The purple-leaved one does not.

**And on the flower side**

Annie White's field research at the University of Vermont — twelve native herbaceous species, fourteen cultivars, two sites, two years, counting pollinator visits — found seven species visited significantly more often than their cultivars, four visited about equally, and just one case where the cultivar won.

The datum that stays with you: **1,414 pollinator visits recorded to straight-species *Achillea millefolium*, against 119 to a red-flowered cultivar.** Not a difference of degree. A difference of order.

Her conclusion is mechanistic rather than ideological: where a cultivar diverges substantially from the wild type in flower colour, size or *shape*, ecological function falls away. Double-flowered forms provide less nectar and less pollen, because the reproductive parts have been bred into petals.

Mt. Cuba's own trials put species-level numbers on it. In a three-year evaluation of seventy-five coneflowers, with a citizen-science team counting pollinator visits in sixty-second windows, **double-flowered coneflowers were markedly less favoured — and every top-ranked selection in the trial was single-flowered.** Straight *Echinacea purpurea* received the most visits overall, though a white cultivar ranked second and 'Pica Bella' topped the overall evaluation.

Read that last sentence carefully, because it is the one that dismantles the purist position as thoroughly as the herbivory data dismantles the industry's. *Some cultivars perform as well as or better than the species.* The doubles do not.

**The rule, then**

You are standing in a garden centre holding a plant. Three questions.

*What did they select it for?* Compactness, sturdier stems, disease resistance — the evidence says buy it without guilt.

*Is the flower doubled?* Put it down.

*Are the leaves purple?* If the plant's job is to feed something, buy the green one.

That is it. It takes four seconds, it is grounded in peer-reviewed work, and it generalises to the thousands of plants nobody has trialled — which is nearly all of them.

**The pipeline problem underneath**

Which brings us to the thing that genuinely troubles us about this beat.

Mt. Cuba's January 2026 goldenrod report — three years, seventy types, fifty distinct species — found that **eleven of the twelve top performers were straight species, not cultivars.** Its four-year ironweed trial found the same pattern, and reported that plant health correlated directly with how many pollinators a plant supported: healthy plants attract more insects.

Meanwhile, Walters Gardens brings a compact ironweed to retail in 2026 — *Vernonia* 'Prairie Princess', 28 to 30 inches against a species that reaches six to eight feet. It looks like a genuinely useful plant and we say so on its page.

It was not in the Mt. Cuba trial.

That is not Walters' fault. It is structural. **New nativars reach retail years before anyone independent evaluates them**, and the only organisation in the country running long, comparative, non-commercial trials is a non-profit in Delaware with a citizen-science team and a clipboard.

The introduction calendar and the trial calendar are not synchronised, and they never have been. Until they are, the honest position for a gardener is this: buy the cultivar, apply the trait rule, and hold your certainty loosely.

We will keep publishing the trial results when they arrive. Even when — especially when — they contradict what we told you.`,
    sources: [
      s(
        's05_baisden',
        'Baisden, Tallamy, Narango & Boyle, “Do Cultivars of Native Plants Support Insect Herbivores?” HortTechnology 28(5):596–606 (2018)',
        'https://www.researchgate.net/publication/328618499_Do_Cultivars_of_Native_Plants_Support_Insect_Herbivores',
        'peer-reviewed',
        'HortTechnology',
      ),
      s(
        's05_white',
        'Annie White — From Nursery to Nature: native species vs native cultivars for pollinator habitat',
        'https://pollinatorgardens.org/2013/02/08/my-research/',
        'independent',
        'University of Vermont / PollinatorGardens.org',
      ),
      s(
        's05_mtcuba_ech',
        'Captivating Coneflowers for People and Pollinators — 75-selection Echinacea trial',
        'https://mtcubacenter.org/captivating-coneflowers-for-people-and-pollinators/',
        'independent',
        'Mt. Cuba Center',
      ),
      s(
        's05_mtcuba_solidago',
        'Goldenrods for the Garden and Beyond — three-year Solidago trial (January 2026)',
        'https://mtcubacenter.org/goldenrods-for-the-garden-and-beyond/',
        'independent',
        'Mt. Cuba Center',
      ),
      s(
        's05_mtcuba_vernonia',
        'Mt. Cuba Center shares results from four-year Vernonia trial',
        'https://www.greenhousegrower.com/crops/mt-cuba-center-shares-results-from-four-year-vernonia-trial/',
        'independent',
        'Mt. Cuba Center via Greenhouse Grower',
      ),
    ],
  },
];

// ---------------------------------------------------------------------------
// ISSUES
// ---------------------------------------------------------------------------

export const issues: Issue[] = [
  // =========================================================================
  {
    id: 'issue_01',
    number: 1,
    slug: '01-plants-you-havent-seen-yet',
    title: 'Plants You Haven’t Seen Yet',
    standfirst:
      'Fourteen genuinely new plants, assessed. Six we would actually buy. And one thing the breeders are all being careful not to claim.',
    coverImageKey: 'cover_issue_01',
    publishDate: '2026-05-14',
    status: 'published',
    tags: ['plants', 'ornamental', 'outdoor'],
    editorsIntro: `“New for 2026” means three different things depending on who says it.

Proven Winners perennials go to wholesale around July of the previous year and reach retail the following spring. ColorChoice shrubs ready for growers in 2026 reach a garden centre in 2027. PDSI, Bailey and Terra Nova sell liners to finishers first. So a plant can be announced, launched, released and introduced across three calendar years without anything actually changing.

We date-stamp everything and we say which channel we mean. It is a dull discipline and it is the reason you can trust the rest of the page.

One more thing before you start. You will notice how often a field on our plant pages says *unverified*. That is not doubt about the plant. It is the fact that award programmes and trade releases almost never publish zones, mature size, water needs or availability — and we would rather leave a hole than fill it with a guess.`,
    leadStorySlug: 'the-year-the-breeders-told-the-truth',
    discoveries: [
      {
        kicker: 'Shrub · Retail 2026',
        title: 'A hydrangea that does not lie down',
        body: 'Incrediball Storm Proof attacks the one universal failure of smooth hydrangeas — the post-rain collapse. Proven Winners publishes the trade-off rather than hiding it: the flowers are smaller than the original Incrediball, with quantity compensating. Zones 3–8, 3.5–4 ft, blooms on new wood.',
        plantSlug: 'incrediball-storm-proof-hydrangea',
        imageKey: 'plant_hydrangea',
        verdict: 'watch',
        verdictLine: 'The most falsifiable claim of the year. Test it in year two, not year one.',
      },
      {
        kicker: 'Shrub · Retail 2026',
        title: 'The oakleaf, halved',
        body: 'Gatsby Glow Ball, bred by Tom Ranney at NC State, brings Hydrangea quercifolia down to 3–4 ft from a species that wants 6–8. It makes a great American native shrub plantable in a small garden. It blooms on old wood — so do not prune it, and know that a hard Zone 5 winter takes the flowers.',
        plantSlug: 'gatsby-glow-ball-oakleaf-hydrangea',
        imageKey: 'cover_issue_01_alt',
        verdict: 'buy',
        verdictLine: 'If you wanted an oakleaf and had no room, this is the one.',
      },
      {
        kicker: 'Shrub · Consumers spring 2026',
        title: 'The 37th Encore, and the mechanism nobody explains',
        body: 'Autumn Kiss took Buddy Lee eight to ten years. But the story is the engine underneath it: Encores exist because Lee crossed spring azaleas with the summer-blooming Rhododendron oldhamii in the 1980s, producing plants that set buds on the same season’s new growth. Which is why you must prune straight after the spring bloom — and why rebloom needs four to six hours of sun.',
        plantSlug: 'encore-azalea-autumn-kiss',
        imageKey: 'plant_rhododendron',
        verdict: 'buy',
        verdictLine: 'Zones 8–10: yes. Zone 6: buy it for spring and treat autumn as a bonus.',
      },
      {
        kicker: 'Perennial · RHS Chelsea Plant of the Year',
        title: 'A red hosta. That wants sun.',
        body: 'RED NINJA won Chelsea with 30 of 139 votes. Red hostas have been promised for twenty years and have always faded by July; the judges’ citation is specific that this one holds. And it inverts the category’s founding rule — the breeding team say it needs direct sun to colour up, and the more it gets, the better the colour.',
        plantSlug: 'hosta-red-ninja',
        imageKey: 'plant_coleus',
        verdict: 'watch',
        verdictLine: 'The most exciting plant of the year and the one we can least tell you to buy. US availability unverified.',
      },
      {
        kicker: 'Edible · Seed 2026',
        title: 'Three diseases, one tomato, one packet',
        body: 'BadaBing! F1 stacks resistance to Septoria leaf spot, early blight AND late blight — the three things that actually end a home tomato season in a wet August. Indeterminate but stays around 40 inches. AAS 2026 winner and Green Thumb People’s Choice.',
        plantSlug: 'tomato-badabing',
        imageKey: 'plant_tomato',
        verdict: 'buy',
        verdictLine: 'The most leverage per dollar on this list — and the easiest claim in the world to check.',
      },
    ],
    techniqueLab: {
      techniqueSlug: 'reading-the-hardiness-map',
      framing:
        'Every plant on this page is sold with a zone range. Before you trust one, it is worth understanding exactly what a zone number is — and the three things it cannot tell you.',
      theTest:
        'Take any plant from this issue, look up its zone range, then look up the AHS heat zone for your own address. Notice that almost nothing you own is labelled with the second number. That is the gap this publication exists to sit in.',
    },
    worthIt: {
      subject: 'Incrediball Storm Proof™ Hydrangea',
      subjectHref: '/plants/incrediball-storm-proof-hydrangea',
      verdict: 'watch',
      line: 'The best-argued new shrub of 2026 — and not yet a proven one.',
      body: 'Stem-strength claims almost always hold in year one and fail in year three, when the plant carries a full flower load. Proven Winners has done something rare and admirable in publishing the trade-off. Now somebody needs to stand in the garden with a hose, a stopwatch and a protractor. We are volunteering.',
    },
    interview: {
      expertSlug: 'buddy-lee',
      status: 'requested',
      intro:
        'We have asked Buddy Lee — who created the reblooming azalea category and has now put 37 varieties into it — for an interview. He has not yet said yes. Rather than invent an interview, we are publishing the questions. If you are reading this, Mr Lee, the first one is the one we actually care about.',
      exchanges: [],
      questionsToAsk: [
        'Encore rebloom depends on the plant pushing new growth and setting buds on it within the same season. In Zone 6, how much of that second and third flush actually happens — and has anyone at PDSI ever counted it, at latitude, against a Gulf Coast control?',
        'Your own FAQ says stated mature size “is not a maximum height, but a size that is easily maintainable through yearly pruning.” Why is that sentence in the FAQ and not on the tag?',
        'The Rhododendron oldhamii cross is now forty years old. What is the trait you have not been able to breed in yet?',
        'What would have to be true for you to conclude that one of your own introductions did not work?',
      ],
    },
    readerAction: {
      heading: 'Two hours, one hose, and a claim nobody has tested',
      intro:
        'The Storm Proof hydrangea makes a specific, physical, falsifiable claim: it does not flop. That is a claim you can test in your own garden with equipment you already own, and nobody has published the result.',
      steps: [
        'If you have a Storm Proof and an ‘Annabelle’ (or an original Incrediball), plant them where you can photograph both from the same spot.',
        'After any rain event over half an inch, photograph both plants from that fixed position — at two hours, and again at twenty-four.',
        'Note the date, the rainfall if you have a gauge, and the age of each plant. Year two matters more than year one.',
        'Send us the pictures. We will publish the grid, with your name on it, including the frames where the new plant loses.',
      ],
      askBack:
        'Send photographs and dates to editorial@thegardendrop.com with the subject line STORM PROOF. We will credit every contribution and we will publish the negative results.',
    },
    sources: [
      s(
        'i01_s1',
        'Proven Winners ColorChoice — 2026 shrub introductions',
        'https://www.greenhousemag.com/news/proven-winners-colorchoice-flowering-shrubs-new-2026-varieties/',
        'trade',
        'Greenhouse Management',
      ),
      s(
        'i01_s2',
        'Encore Azalea Autumn Kiss — Buddy Lee, PDSI',
        'https://www.nurserymag.com/news/encore-azalea-autumn-kiss-buddy-lee-breeder-plant-development-services-pdsi/',
        'trade',
        'Nursery Management',
      ),
      s('i01_s3', 'Hosta RED NINJA — RHS Chelsea Plant of the Year 2026', 'https://www.rhs.org.uk/plants/new-plants/hosta-red-ninja', 'primary', 'RHS'),
      s(
        'i01_s4',
        'All-America Selections 2026 winners',
        'https://www.greenhousemag.com/news/all-america-selections-2026-aas-winners-plants/',
        'trade',
        'Greenhouse Management',
      ),
      s(
        'i01_s5',
        'Windham et al., Pathogens 12:439 (2023) — rose rosette field resistance',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC10052971/',
        'peer-reviewed',
        'Pathogens',
      ),
    ],
    researchRequired: [
      'Encore Autumn Kiss zone range (6a–10) is search-level only. Confirm directly with PDSI before we print it again.',
      'Hosta RED NINJA: US availability and distributor unconfirmed. This is a UK launch.',
      'Kale ‘Rubybor’: confirm with Bejo Seeds whether this is a newly bred F1 or an existing variety newly trialled, before repeating “first in AAS history.”',
      'Cultivar denomination codes are unpublished for Kodiak Jet Black, Paraplu Pure White, Powerball, Perfecto Mundo Fuchsia Carpet, and all PDSI 2026 introductions.',
      'Cultivate’26 Retailers’ Choice winners were announced on 13 July 2026 and are not yet reflected here.',
    ],
    updatedAt: '2026-07-13T09:00:00.000Z',
  },

  // =========================================================================
  {
    id: 'issue_02',
    number: 2,
    slug: '02-the-heat-proof-garden',
    title: 'The Heat-Proof Garden',
    standfirst:
      'Your hardiness zone measures the coldest night of winter. It has nothing to say about the summer that is actually killing your garden. Here is what does.',
    coverImageKey: 'cover_issue_02',
    publishDate: '2026-05-28',
    status: 'published',
    tags: ['climate', 'techniques', 'plants', 'edible', 'outdoor'],
    editorsIntro: `Half the country moved half a zone warmer in November 2023, and almost every article written about it ran past what the USDA actually said.

Here is the careful version. The 2023 map used 13,412 weather stations against 7,983 for the 2012 edition, so it is a genuinely better map. About half the country shifted a half zone warmer. And the agency's own developers cautioned against reading those shifts as a reliable climate signal — because extreme minimum temperature is a single-night statistic with wild year-to-year variance, and because the method changed between editions.

The map got better and it got warmer, and the two are entangled. That is the honest sentence, and it is more interesting than the headline.

But the deeper problem is not accuracy. It is subject. This issue is about the season the maps do not measure.`,
    leadStorySlug: 'the-map-measures-the-wrong-season',
    discoveries: [
      {
        kicker: 'Technique · Evidence: Strong',
        title: '30%. Black. Up in June, not July.',
        body: 'Four years of University of Delaware bell pepper trials: 30% black shade cloth tripled marketable yield — and it did it by increasing fruit SIZE and cutting sunscald, not by producing more peppers. Shading from transplant beat shading from July, because early shade prevented heat girdling of the transplant stems.',
        techniqueSlug: 'shade-cloth-over-vegetables',
        imageKey: 'technique_shade_cloth',
        verdict: 'buy',
        verdictLine: 'Buy the boring one. The data favour plain black over every fancy colour.',
      },
      {
        kicker: 'Technique · Evidence: Strong',
        title: 'Trade tonnage for flavour, on purpose',
        body: 'Regulated deficit irrigation is the rare hack where the mechanism, the meta-analysis and the kitchen agree. A 2019 meta-analysis found it decreased yield by a mean of 18.61 t/ha while raising water use efficiency by 2.33 kg/m³ and improving fruit quality. Fewer tomatoes. Better tomatoes. Less water. That is the trade, and the gardening press keeps forgetting to mention half of it.',
        techniqueSlug: 'regulated-deficit-irrigation',
        imageKey: 'technique_watering_can',
        verdict: 'buy',
        verdictLine: 'Worth it — if you are honest with yourself about which half of the trade you want.',
      },
      {
        kicker: 'Technique · EPA-verified',
        title: 'The only number here with a government behind it',
        body: 'EPA WaterSense reports that a labelled weather-based controller saves an average home nearly 7,600 gallons a year, and a labelled soil-moisture sensor more than 15,000. There is an actual certification scheme with actual performance testing — which is more than can be said for “heat tolerant,” a phrase with no standard behind it whatsoever.',
        techniqueSlug: 'smart-irrigation-controllers',
        imageKey: 'technique_drip_irrigation',
        verdict: 'buy',
        verdictLine: 'If your irrigation runs on a clock, replace the clock. Then configure it properly, or you bought nothing.',
      },
      {
        kicker: 'Shrub · Trade 2026',
        title: 'A loropetalum that stays down',
        body: 'Purple Raindrops is claimed at 2–2.5 ft in a genus that routinely balloons to six or ten feet whatever the tag says. Zones 7–10, saturated purple year-round. If the size holds, it is a new plant type rather than a new colour — and that is a big if.',
        plantSlug: 'loropetalum-purple-raindrops',
        imageKey: 'plant_clematis',
        verdict: 'wait',
        verdictLine: 'Measure it at year five. Dwarf loropetalums have been promised before, and they grew.',
      },
      {
        kicker: 'Edible · Seed 2026',
        title: 'Change the variety before you change the equipment',
        body: 'The cheapest heat adaptation available to a gardener is a different packet of seed. BadaBing! F1 stacks Septoria, early blight and late blight resistance — the diseases that get worse as summers get warmer and wetter. Disease resistance IS climate resilience, and it costs the price of a coffee.',
        plantSlug: 'tomato-badabing',
        imageKey: 'plant_tomato',
        verdict: 'buy',
        verdictLine: 'The highest-leverage heat purchase you will make this year.',
      },
    ],
    techniqueLab: {
      techniqueSlug: 'shade-cloth-over-vegetables',
      framing:
        'The best home-garden heat data in America comes from four years of bell peppers in Delaware, and the findings are specific enough to act on this weekend — including one that will surprise you about timing.',
      theTest:
        'Shade half a pepper bed from transplant with 30% black cloth. Leave the other half open. Weigh the marketable fruit from each — and count the sunscald culls separately. The Delaware finding was that shade does not give you more peppers. It gives you bigger, unblemished ones. Check it.',
    },
    worthIt: {
      subject: 'The 2023 USDA hardiness map update',
      subjectHref: '/techniques/reading-the-hardiness-map',
      verdict: 'watch',
      line: 'A better map of the wrong thing.',
      body: 'The 2023 revision is a genuine improvement — denser station network, higher resolution, better data. It also measures one night in January, and the season doing the damage is summer. The map that would help you is the AHS heat zone map, it has not been meaningfully updated since 1997, and it is printed on almost no plant tags in America. That is a quiet scandal, and nobody is shouting about it.',
    },
    interview: {
      expertSlug: 'emmalea-ernest',
      status: 'requested',
      intro:
        'Emmalea Ernest, at the University of Delaware Cooperative Extension, has produced the most directly useful heat-adaptation data available to a home gardener. We have asked to interview her. These are our questions.',
      exchanges: [],
      questionsToAsk: [
        'Your 2021 trial found the Italian sweet pepper ‘Carmen’ showed no significant benefit from shade while all three bell varieties did. Is shade cloth partly a workaround for a heat-intolerant cultivar — and should we be telling gardeners to change the plant before they buy the fabric?',
        'The finding that early shade beats late shade seems to contradict how everyone actually uses shade cloth, which is reactively, during a heatwave. How confident are you in the transplant-girdling mechanism?',
        'Black outperformed white, red and aluminised. The market sells the opposite. Why?',
        'What is the single figure about heat and vegetables that you wish gardening media would stop repeating?',
      ],
    },
    readerAction: {
      heading: 'Find the number nobody prints on your plants',
      intro:
        'Almost no plant sold in America carries a heat-zone rating, and almost every gardener could use one. Ten minutes will tell you more about your own site than the hardiness map ever will.',
      steps: [
        'Look up your AHS heat zone — the average number of days per year above 86°F where you live.',
        'Now walk your garden with a thermometer on the hottest afternoon of the week. Take a reading in full sun at soil level, one under a shrub, one against a south-facing wall, one in the shadiest bed you have.',
        'You will find a spread of ten or fifteen degrees within thirty feet. That spread is your real climate, and no national map can see it.',
        'Write it down. Site accordingly. Then tell us what you found — we want to build a picture of how far real gardens diverge from their published zone.',
      ],
      askBack:
        'Send your four readings, your ZIP code and your hardiness zone to editorial@thegardendrop.com with the subject line MICROCLIMATE. We will publish the spread.',
    },
    sources: [
      s(
        'i02_s1',
        'USDA Unveils Updated Plant Hardiness Zone Map',
        'https://www.ars.usda.gov/news-events/news/research-news/2023/usda-unveils-updated-plant-hardiness-zone-map/',
        'primary',
        'USDA ARS',
      ),
      s(
        'i02_s2',
        'Shade Cloth for Bell Peppers — Emmalea Ernest, University of Delaware',
        'https://sites.udel.edu/weeklycropupdate/?p=20476',
        'independent',
        'University of Delaware Extension',
      ),
      s(
        'i02_s3',
        'RDI meta-analysis — Agricultural Water Management (2019)',
        'https://www.sciencedirect.com/science/article/abs/pii/S0378377418307509',
        'peer-reviewed',
        'Agricultural Water Management',
      ),
      s(
        'i02_s4',
        'EPA WaterSense — weather-based and soil-moisture irrigation controllers',
        'https://www.epa.gov/watersense/weather-based-irrigation-controllers',
        'primary',
        'US EPA',
      ),
      s(
        'i02_s5',
        'Heat Zones and the AHS Heat Zone Map — US Botanic Garden',
        'https://www.usbg.gov/blog/heat-zones-plant-health-and-ahs-heat-zone-map',
        'independent',
        'US Botanic Garden',
      ),
    ],
    researchRequired: [
      'Figures circulating for Utah State (“40% shade cloth increased marketable yield 50%”) and for Gent’s tomato cracking work are plausible but unverified — do not print until the primary papers are obtained.',
      'Kaolin clay’s “up to 50% sunburn reduction” traces to vendor copy, not a paper. Do not repeat.',
      'Heat-set tomato threshold temperatures (“pollen non-viable above 72°F nights”) circulate widely with no traceable primary source.',
      'No defensible single “degrees cooler” figure exists for organic mulch. The direction of the effect is well supported; the magnitude is not.',
    ],
    updatedAt: '2026-07-13T09:00:00.000Z',
  },

  // =========================================================================
  {
    id: 'issue_03',
    number: 3,
    slug: '03-fruit-trees-shrunk',
    title: 'Fruit Trees, Shrunk',
    standfirst:
      'Dwarf, patio, columnar, self-fertile. Four words doing enormous work in a category that has never published its central number.',
    coverImageKey: 'cover_issue_03',
    publishDate: '2026-06-11',
    status: 'published',
    tags: ['edible', 'plants', 'techniques', 'outdoor'],
    editorsIntro: `We started this issue expecting to write about plants. We ended up writing about an absence.

We wanted one number: how much fruit does a dwarf tree in a container actually produce in a normal year? Every figure we found traced back to a content farm. Several cited a university study we could not locate and do not believe exists.

There is no credible extension-published yield figure for patio fruit. Not one.

So this issue does two things. It explains the three genuinely different technologies hiding behind the word "dwarf" — because they behave differently and catalogues rarely say which they mean. And it asks you to help us generate the number that an entire industry has somehow never got round to publishing.`,
    leadStorySlug: 'nobody-will-tell-you-how-much-fruit',
    discoveries: [
      {
        kicker: 'Technique · Evidence: Mixed',
        title: 'Three technologies, one word',
        body: 'A dwarfing rootstock restricts vigour from below and requires permanent staking. A genetic dwarf is compact from above. A columnar apple fruits on spurs along a single axis — and the first-generation Ballerina types still widely sold are described in the literature as scab-prone, biennial, and producing fruit that was “not competitive.” These are not the same product.',
        techniqueSlug: 'dwarfing-fruit-trees',
        imageKey: 'technique_pruning',
        verdict: 'watch',
        verdictLine: 'Yes, you can grow fruit in a pot. No, nobody will tell you how much.',
      },
      {
        kicker: 'Fruit · Commercial licence only',
        title: 'The best blueberry on earth, and you cannot have it',
        body: 'Fall Creek’s Apex: zero-to-low chill, 21 mm berries, 45 days of post-harvest firmness. Eligibility for the Fall Creek® Collection requires a commercial grower with roughly 50 hectares planted and a demonstrated IP-compliance history. Low chill requirement is the single most useful adaptation to warming winters in all of deciduous fruit — and it is behind a gate.',
        plantSlug: 'blueberry-apex-fall-creek',
        imageKey: 'plant_blueberry',
        verdict: 'skip',
        verdictLine: 'Not because it is bad. Because you are not allowed to have it.',
      },
      {
        kicker: 'Fruit · $100, ten years',
        title: 'The most radical thing in fruit is not a plant',
        body: 'The University of Minnesota launched Superior Fruit Innovations — a $100 ten-year membership, $1 per tree at purchase, then $1 per plant per year from year four — which opens its patented apples and grapes to small and direct-market growers. Big Flirt stores 7–9 months in a common cellar. The Northern Glo grapes are the first seedless table grapes consistently hardy in Zone 4. One institution went the opposite way from everyone else.',
        plantSlug: 'big-flirt-apple',
        imageKey: 'plant_peach',
        verdict: 'buy',
        verdictLine: 'A hundred dollars against fifty hectares. Two philosophies of who gets access to genetics.',
      },
      {
        kicker: 'Shrub · Retail 2025',
        title: 'The compact-berry boom has stalled',
        body: 'Bushel and Berry — the brand that invented the container-berry category — has not launched a genuinely new berry since about 2021. Its 2025 introductions were a tea camellia and a ten-foot climbing passionfruit vine, from a brand whose entire promise is compact and container. The patent numbers on its own site make it unambiguous.',
        plantSlug: 'brew-tea-ful-tea-camellia',
        imageKey: 'plant_hellebore',
        verdict: 'watch',
        verdictLine: 'A fine plant, and a signal flare. Why has dwarf berry breeding stopped?',
      },
      {
        kicker: 'Label · Read carefully',
        title: '“Self-fertile” is doing enormous work',
        body: 'It means will set fruit alone. It does not mean will set its BEST crop alone. Most apples are semi-self-fruitful; blueberries self-pollinate and still give bigger berries and higher yields with a second variety. The entire patio-fruit pitch is one tree, one balcony, fruit — and it is quietly leaving crop on the table.',
        techniqueSlug: 'dwarfing-fruit-trees',
        imageKey: 'plant_citrus_pot',
        verdict: 'watch',
        verdictLine: 'True, and incomplete. Plant two if you have room for two.',
      },
    ],
    techniqueLab: {
      techniqueSlug: 'dwarfing-fruit-trees',
      framing:
        'Before you buy a small fruit tree, you need to know which of three unrelated technologies you are buying — because they fail in different ways.',
      theTest:
        'Ask the nursery one question: is the dwarfing in the rootstock or in the scion? If they cannot tell you, they do not know what they are selling, and neither do you.',
    },
    worthIt: {
      subject: 'The patio fruit tree',
      verdict: 'wait',
      line: 'Sold on a promise nobody has measured.',
      body: 'We are not saying it does not work. We grow fruit in pots ourselves. We are saying that a category of this size, sold on a specific quantitative promise, has never published a trustworthy yield figure — and that every number circulating online traces back to a content farm. Wait, or buy with your eyes open, and weigh what you pick. We will publish the distribution, including the zeroes.',
    },
    interview: {
      expertSlug: 'margaret-worthington',
      status: 'requested',
      intro:
        'Dr. Margaret Worthington runs the most important blackberry breeding programme in the world at the University of Arkansas. We have requested an interview. Our questions are about access as much as genetics.',
      exchanges: [],
      questionsToAsk: [
        'Sweet-Ark® Immaculate is a floricane variety aimed at commercial shipping, farmers markets and u-pick. The last primocane release — Prime-Ark® Horizon, 2020 — is thorny, which is a real drawback for home gardeners. Is thornless primocane fruiting a breeding problem, or a priority problem?',
        'The University of Minnesota just opened its patented fruit to small growers for a $100 ten-year membership, while Fall Creek gates its best blueberries behind a 50-hectare minimum. Where does a land-grant programme’s obligation actually lie?',
        'Post-harvest firmness after two weeks of refrigeration is your headline trait. What does breeding for the supply chain cost the garden?',
        'What would you be breeding if the market were not asking for shelf life?',
      ],
    },
    readerAction: {
      heading: 'Weigh your fruit. Seriously.',
      intro:
        'We could not find a single credible published figure for how much fruit a container tree yields. So we are going to build one, and we need a few hundred gardeners with a set of kitchen scales.',
      steps: [
        'Record what you have: species, cultivar, rootstock if you know it, container size in gallons, year planted, your zone.',
        'Weigh everything you pick this season. Everything. Including the year you get nothing — the zeroes matter more than the triumphs.',
        'Note whether you have a second variety nearby for pollination, because “self-fertile” does not mean “self-sufficient.”',
        'Send it in. We will publish the full distribution — not the average, the distribution — and it will be the first honest picture of this category anyone has produced.',
      ],
      askBack:
        'Send your numbers to editorial@thegardendrop.com with the subject line PATIO YIELD. If we get enough of them, this becomes the reference figure nobody else has bothered to produce.',
    },
    sources: [
      s('i03_s1', 'Rootstocks for Apples — WVU Extension', 'https://extension.wvu.edu/agriculture/horticulture/apple-rootstocks', 'independent', 'WVU Extension'),
      s(
        'i03_s2',
        'Fall Creek launches Apex (FCM14-057)',
        'https://www.fallcreeknursery.com/blog/fall-creek-launches-apex-fcm14-057-blueberry-variety-as-latest-addition-to-the-fall-creek-collection',
        'primary',
        'Fall Creek Farm & Nursery',
      ),
      s('i03_s3', 'Superior Fruit Innovations — University of Minnesota', 'https://superiorfruitinnovations.umn.edu/grapes', 'primary', 'University of Minnesota'),
      s(
        'i03_s4',
        'What to know about Superior Fruit Innovations — UMN Extension',
        'https://blog-fruit-vegetable-ipm.extension.umn.edu/2026/05/what-to-know-about-superior-fruit.html',
        'independent',
        'UMN Extension',
      ),
      s('i03_s5', 'Sweet-Ark® Immaculate — University of Arkansas', 'https://aaes.uada.edu/news/sweet-ark-immaculate/', 'primary', 'University of Arkansas'),
      s('i03_s6', 'Bushel and Berry — varieties and patent numbers', 'https://www.bushelandberry.com/varieties', 'primary', 'Bushel and Berry'),
    ],
    researchRequired: [
      'ALL container-fruit yield figures are unverified. Every number we found traces to SEO gardening sites, several citing a “2023 UC ANR study” we could not locate and believe does not exist. This is the central research gap of the issue and we say so in print.',
      'Dave Wilson Nursery / Zaiger Genetics: no new cultivar verifiable for 2024–2026. Their variety lists are undated. Requires a direct interview.',
      'Big Flirt™ zone range and mature size unpublished by UMN. SuperSnap™ is stated as Zone 4.',
      'Burpee ‘Mini-Me’ watermelon: Burpee’s own “What’s new for 2026” page does not list it. Call Burpee before treating it as a 2026 introduction.',
    ],
    updatedAt: '2026-07-13T09:00:00.000Z',
  },

  // =========================================================================
  {
    id: 'issue_04',
    number: 4,
    slug: '04-soil-tech-what-actually-works',
    title: 'Soil Tech: What Actually Works?',
    standfirst:
      'Seven techniques, ranked by evidence rather than by charisma. The one that works is free. The ones that sell have the best stories.',
    coverImageKey: 'cover_issue_04',
    publishDate: '2026-06-25',
    status: 'published',
    tags: ['techniques', 'outdoor', 'edible', 'ornamental'],
    editorsIntro: `This is the issue that will lose us some friends, so let us be precise about what we are and are not saying.

We are not saying soil biology does not matter. It matters enormously, and the science behind it is some of the most beautiful work being done in any field.

We are saying that the products sold on the strength of that science mostly do not do what the label says — and that this is not our opinion, it is a 302-trial meta-analysis, a product audit in which four out of five failed the easiest possible test, and a peer-reviewed paper with the phrase "poor quality" in its title.

Every technique in this issue is scored against the literature, and the sources are listed so you can check us. If we are wrong, the evidence is right there and you should tell us. We will print the correction at the top of the page.`,
    leadStorySlug: 'the-most-beautiful-idea-in-soil-science',
    discoveries: [
      {
        kicker: 'Product · Hype risk 5/5',
        title: 'Fewer than 12% of them work',
        body: 'A 2025 New Phytologist meta-analysis across 302 trials found that fewer than 12% of commercial mycorrhizal products showed both a significant growth benefit and viable colonisation. An earlier product audit found over 80% failed to colonise roots at all — in sterilised soil, under ideal conditions. Meanwhile most garden soil already contains the fungi you are being sold.',
        techniqueSlug: 'mycorrhizal-inoculants',
        imageKey: 'technique_soil_lab',
        verdict: 'skip',
        verdictLine: 'Put the money into compost. Put a handful of soil from under a healthy plant in the hole.',
      },
      {
        kicker: 'Amendment · Evidence: conditional',
        title: 'Biochar boosts tropical but not temperate crop yields',
        body: 'That is not our summary. That is the literal title of the canonical 2017 paper. Biochar works, powerfully, on acidic, sandy, low-organic-matter soils — and shows no yield impact in regions with a mean annual temperature below 10°C. It is the most expensive thing in the aisle and it is sold hardest to the people it will help least.',
        techniqueSlug: 'biochar',
        imageKey: 'technique_compost_hands_alt',
        verdict: 'skip',
        verdictLine: 'Get a soil test before you get a bag. If your soil is decent, you are buying an expensive nothing.',
      },
      {
        kicker: 'Practice · Food safety flag',
        title: 'The molasses is the problem',
        body: 'Aeration — compost tea’s entire selling point — is not the active variable; compost source matters more. And Ingram & Millner (2007) found the nutrient supplements every ACT recipe calls for cause growth of E. coli O157:H7 and Salmonella in the brew, with aerated tea sustaining HIGHER concentrations than non-aerated. Without supplements, E. coli declined below detection in 36 hours.',
        techniqueSlug: 'aerated-compost-tea',
        imageKey: 'technique_compost_hands',
        verdict: 'skip',
        verdictLine: 'Use the compost. If you brew anyway, leave out the molasses — that is a food-safety instruction, not a preference.',
      },
      {
        kicker: 'Practice · Evidence: Strong',
        title: 'The free one that works',
        body: 'Wood-chip mulch: superb weed suppression, moisture and temperature buffering, builds soil, and arborists will often deliver a load for nothing. The nitrogen objection that kept it out of American gardens for decades is a myth — tie-up happens only in a thin interface zone, and only becomes a real problem if you till the chips IN, which is the one thing you are told not to do.',
        techniqueSlug: 'wood-chip-mulch',
        imageKey: 'technique_mulch_wood_chips',
        verdict: 'buy',
        verdictLine: 'The best cost-to-benefit ratio of anything we have assessed. It costs nothing.',
      },
      {
        kicker: 'Practice · Evidence: None found',
        title: 'Hügelkultur has never been tested. At all.',
        body: 'Every figure in circulation — moisture percentages, degrees of warmth, side-by-side yields — comes from blogs and practitioner accounts. We found no randomised, replicated trial of hügelkultur yield or water use. Not a weak one. None. The mechanism is plausible; “self-watering by year three” is an extraordinary claim resting entirely on testimony.',
        techniqueSlug: 'hugelkultur',
        imageKey: 'texture_soil',
        verdict: 'wait',
        verdictLine: 'If you own a hügel bed and a moisture meter, you are better instrumented than the published literature.',
      },
    ],
    techniqueLab: {
      techniqueSlug: 'mycorrhizal-inoculants',
      framing:
        'The clearest debunk in the dossier, and the one that will make the most people angry — because the underlying biology is real, wonderful, and entirely beside the point of whether the powder in the bag does anything.',
      theTest:
        'Ask any inoculant vendor for two documents: a viability certificate for the batch you bought, and a root-colonisation assay from an independent lab. Both are standard, both are cheap, and neither is usually offered. Send us what they say. We will publish it.',
    },
    worthIt: {
      subject: 'Biochar',
      subjectHref: '/techniques/biochar',
      verdict: 'skip',
      line: 'Real science. Wrong customer.',
      body: 'Biochar is not a scam. On acidic, sandy, leached, low-organic-matter soil it has a durable liming and cation-exchange effect and genuine carbon-sequestration credentials. But the meta-analytic literature is unambiguous that its yield benefit largely evaporates in fertile temperate soil — and that is the soil most of our readers garden on. If you want to sequester carbon, buy it and say so honestly. If you want a better harvest, buy compost.',
    },
    interview: {
      expertSlug: 'linda-chalker-scott',
      status: 'requested',
      intro:
        'Dr. Linda Chalker-Scott has spent two decades documenting horticultural myths at Washington State, and much of this issue rests on her bibliographies. We have asked for an interview.',
      exchanges: [],
      questionsToAsk: [
        'You have been publishing on mycorrhizal inoculants for years, and the 2022–2025 evidence wave — the iScience product audit, the 302-trial New Phytologist meta-analysis — has now vindicated you comprehensively. Has anything changed in what is on the shelf?',
        'Compost tea has a documented food-safety issue when nutrient supplements are used, which is standard practice. Why has that not moved the needle with the people who make it?',
        'The nitrogen-tie-up myth about wood chips has probably cost American soil more than any other piece of received wisdom. Where did it come from, and why is it so durable?',
        'What is the next thing we are all going to be embarrassed about?',
      ],
    },
    readerAction: {
      heading: 'The four-bed experiment nobody has run',
      intro:
        'The most-cited home-garden no-dig trial has a confound sitting in plain sight: the no-dig beds get an annual compost layer. So is the benefit the not-digging, or the compost? Nobody has separated the two. Four beds would do it.',
      steps: [
        'Bed one: dug, with compost. Bed two: dug, no compost. Bed three: no-dig, with compost. Bed four: no-dig, no compost.',
        'Same crop, same spacing, same water, three seasons.',
        'Weigh everything. Photograph everything. Record the weeding time — that is where no-dig actually earns its keep, and nobody measures it.',
        'Send us the results, whatever they say. We will publish them whether they support no-dig or embarrass it.',
      ],
      askBack:
        'If you are running any version of this, write to editorial@thegardendrop.com with the subject line FOUR BEDS. Even one season of honest data would be more than the literature currently contains.',
    },
    sources: [
      s(
        'i04_s1',
        'Koziol, McKenna & Bever — New Phytologist meta-analysis of commercial mycorrhizal inoculants (2025)',
        'https://nph.onlinelibrary.wiley.com/doi/10.1111/nph.20278',
        'peer-reviewed',
        'New Phytologist',
      ),
      s('i04_s2', 'Salomon et al., iScience (2022) — 25 commercial AMF products tested', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9254352/', 'peer-reviewed', 'iScience'),
      s(
        'i04_s3',
        'Karst, Jones & Hoeksema — Nature Ecology & Evolution 7:501–511 (2023)',
        'https://www.nature.com/articles/s41559-023-01986-1',
        'peer-reviewed',
        'Nature Ecology & Evolution',
      ),
      s(
        'i04_s4',
        'Jeffery et al. — Biochar boosts tropical but not temperate crop yields (2017)',
        'https://ecoss.nau.edu/wp-content/uploads/2017/04/Jeffery_2017_Environ._Res._Lett._12_053001.pdf',
        'peer-reviewed',
        'Environmental Research Letters',
      ),
      s('i04_s5', 'Ingram & Millner (2007) — compost tea, E. coli and Salmonella', 'https://pubmed.ncbi.nlm.nih.gov/17477249/', 'peer-reviewed', 'Journal of Food Protection'),
      s('i04_s6', 'Wood chip mulch: landscape boon or bane? — Chalker-Scott, WSU', 'https://s3.wp.wsu.edu/uploads/sites/403/2015/03/wood-chips.pdf', 'independent', 'Washington State University'),
      s(
        'i04_s7',
        'Dig / No Dig trial at Homeacres — Charles Dowding’s own caveats',
        'https://charlesdowding.co.uk/blogs/trials/dig-no-dig-trial-2019-2022',
        'primary',
        'Charles Dowding',
      ),
    ],
    researchRequired: [
      'Charged vs uncharged biochar: mechanism plausible, but we found no controlled trial isolating the variable for garden use. Charging protocols circulating online are vendor-authored.',
      'Hydrogels: Chalker-Scott’s position on acrylamide monomer release is clearly stated and must be attributed to her. We found no recent independent risk assessment either confirming or refuting it. Genuinely unresolved — do not present as consensus.',
      'Consumer soil-microbiome kit statistics circulating online (a “2025 Soil Health Institute survey”, a “2025 Earth Microbiome Project benchmarking study”) could not be verified against any primary source and the page carrying them shows signs of AI generation. DO NOT PRINT.',
      'Tertill robotic weeder: the Weed Technology paper is real; the “as effective as hand weeding, per Cornell” framing is retail copy we could not confirm.',
    ],
    updatedAt: '2026-07-13T09:00:00.000Z',
  },

  // =========================================================================
  {
    id: 'issue_05',
    number: 5,
    slug: '05-native-but-designed',
    title: 'Native, But Designed',
    standfirst:
      'The nativar argument has been fought over a word for a decade. The research settled it in 2018, and it said something far more specific than either side wanted to hear.',
    coverImageKey: 'cover_issue_05',
    publishDate: '2026-07-09',
    status: 'published',
    tags: ['plants', 'ornamental', 'outdoor', 'techniques'],
    editorsIntro: `There is a rule at the end of this issue that will take you four seconds to apply in a garden centre, and it is grounded in peer-reviewed research rather than in anybody's ideology.

Compact? Buy it. Disease-resistant? Buy it. Doubled flower? Put it down. Purple leaves, on a plant whose job is to feed something? Buy the green one.

That is the whole thing. It works because the research sorted cultivars by the trait the breeder selected FOR, rather than arguing about the category as a whole — and it turns out the category was never the meaningful unit. Leaf colour was.

The uncomfortable part of this issue is not the science. It is the pipeline: new cultivars of native plants reach retail years before anybody independent evaluates them, and almost all of the evaluating is being done by one non-profit in Delaware.`,
    leadStorySlug: 'nativar-is-the-wrong-question',
    discoveries: [
      {
        kicker: 'Rule · Evidence: Moderate',
        title: 'The four-second test',
        body: 'Baisden, Tallamy, Narango & Boyle (2018) sorted native cultivars by selected trait. Habit and size: no difference in herbivory. Disease resistance: no difference. Larger fruit: no reduction. Purple/red anthocyanin foliage: significantly reduced insect feeding. The meaningful category is not “cultivar.” It is leaf colour.',
        techniqueSlug: 'choosing-nativars-by-trait',
        imageKey: 'cover_issue_05_alt',
        verdict: 'buy',
        verdictLine: 'A rule you can use, instead of a category you can argue about.',
      },
      {
        kicker: 'Perennial · Retail 2026',
        title: 'Ironweed, brought down to knee height',
        body: '‘Prairie Princess’ is 28–30 in against a species that reaches six to eight feet. Mildew resistant, sturdy, holds foliage all season, Zones 4–9. It looks genuinely useful. It was also not in Mt. Cuba’s four-year trial of 45 ironweeds — because the introduction calendar and the trial calendar have never been synchronised.',
        plantSlug: 'vernonia-prairie-princess',
        imageKey: 'plant_allium',
        verdict: 'watch',
        verdictLine: 'A good plant arriving through a broken pipeline.',
      },
      {
        kicker: 'Perennial · Retail 2026',
        title: 'One question decides this coneflower',
        body: 'COLOR CODED® ‘Knock ’em Red’ opens deep crimson and turns fluorescent red on a four-inch flower. Mt. Cuba trialled 75 coneflowers over three years, with a citizen-science team counting pollinator visits in 60-second windows: doubles were markedly less favoured, and every top-ranked selection was single. Walters has not published the petal form of this one — and we are not going to infer it from a photograph.',
        plantSlug: 'echinacea-knock-em-red',
        imageKey: 'plant_dahlia',
        verdict: 'watch',
        verdictLine: 'Buy it if it is single. Skip it if it is a double. We have asked; we will print the answer.',
      },
      {
        kicker: 'Perennial · Retail 2026',
        title: 'A native that flowers in shade and feeds hummingbirds',
        body: 'Spigelia marilandica ‘Orange Slices’ — 16–20 in, Zones 5b–9, works from full sun to part shade, self-cleaning, explicitly labelled a native wildflower by its breeder. A colour selection within the species’ own range, on an unchanged tubular flower. The quiet best buy of the year.',
        plantSlug: 'spigelia-orange-slices',
        imageKey: 'plant_salvia',
        verdict: 'buy',
        verdictLine: 'Sun to shade, hummingbirds, no deadheading. There are not many plants that do all three.',
      },
      {
        kicker: 'Trial · January 2026',
        title: 'Eleven of the top twelve were straight species',
        body: 'Mt. Cuba’s three-year goldenrod report evaluated 70 types including 50 distinct species. Eleven of the twelve top performers were straight species, not cultivars. Solidago fistulosa — previously not in cultivation at all — was a top performer, and is now reaching the trade because of the trial. A genuinely new plant, discovered by measurement rather than by breeding.',
        imageKey: 'cover_issue_05',
        verdict: 'watch',
        verdictLine: 'The most useful new native of 2026 was not bred. It was noticed.',
      },
    ],
    techniqueLab: {
      techniqueSlug: 'choosing-nativars-by-trait',
      framing:
        'Both slogans — “nativars are fine” and “nativars are ecological traps” — are wrong. The research is trait-specific, and that makes it usable.',
      theTest:
        'Take any native cultivar in your garden. Ask what it was selected for. Then look at the leaves: green or purple? And the flower: single or double? You have just done, in four seconds, the analysis that a decade of argument failed to do.',
    },
    worthIt: {
      subject: 'The doubled coneflower',
      verdict: 'skip',
      line: 'Petals where the pollen should be.',
      body: 'Double-flowered forms trade pollinator access for petal count — the reproductive parts have literally been bred into petals. Mt. Cuba’s three-year, 75-selection Echinacea trial found doubles markedly less favoured by pollinators, and every one of its top-ranked selections was single-flowered. If you want a coneflower that is only decoration, buy the double and enjoy it. If you planted it to feed something, you have bought an ornament.',
    },
    interview: {
      expertSlug: 'sam-hoadley',
      status: 'requested',
      intro:
        'Sam Hoadley runs horticultural research at Mt. Cuba Center — effectively the only long-running independent comparative trial programme for native plants in North America. We have requested an interview, and these are our questions.',
      exchanges: [],
      questionsToAsk: [
        'Your goldenrod report found eleven of the twelve top performers were straight species. Your Vernonia trial found the same pattern. Is the industry’s cultivar pipeline actually producing better garden plants — or better-looking ones?',
        'Solidago fistulosa reaches the trade in 2026 because it performed in your trial, not because anyone bred it. How many plants are sitting in the wild that a trial would promote and a breeding programme never would?',
        'Walters Gardens brings a compact ironweed to retail in 2026 that was not in your trial. Your trials take four years; the introduction cycle is faster. Is there any realistic way to close that gap?',
        'If a breeder wanted to send you a plant before launch rather than after, would you take it — and what would you need from them?',
      ],
    },
    readerAction: {
      heading: 'Sixty seconds, one flower, one count',
      intro:
        'Mt. Cuba’s pollinator data comes from volunteers with a stopwatch. It is the most replicable citizen science in horticulture and it needs no equipment you do not already own.',
      steps: [
        'Pick one flowering plant. Ideally, pick two: a straight species and a cultivar of it, growing near each other.',
        'Watch a single inflorescence for exactly sixty seconds. Count every insect that lands on it.',
        'Repeat three times on a warm, still, sunny morning. Note the date, the time, the temperature, and the plant.',
        'Do it once a week through the flowering period. You now have a dataset that most nurseries do not have for the plants they sell.',
      ],
      askBack:
        'Send your counts to editorial@thegardendrop.com with the subject line SIXTY SECONDS, and tell us which two plants you compared. We will aggregate reader counts and publish them by species — with every methodological caveat clearly stated.',
    },
    sources: [
      s(
        'i05_s1',
        'Baisden, Tallamy, Narango & Boyle — Do Cultivars of Native Plants Support Insect Herbivores? HortTechnology 28(5) (2018)',
        'https://www.researchgate.net/publication/328618499_Do_Cultivars_of_Native_Plants_Support_Insect_Herbivores',
        'peer-reviewed',
        'HortTechnology',
      ),
      s('i05_s2', 'Annie White — native cultivars and pollinator visitation (University of Vermont)', 'https://pollinatorgardens.org/2013/02/08/my-research/', 'independent', 'PollinatorGardens.org'),
      s('i05_s3', 'Goldenrods for the Garden and Beyond — Mt. Cuba Center (January 2026)', 'https://mtcubacenter.org/goldenrods-for-the-garden-and-beyond/', 'independent', 'Mt. Cuba Center'),
      s('i05_s4', 'Captivating Coneflowers for People and Pollinators — Mt. Cuba Center', 'https://mtcubacenter.org/captivating-coneflowers-for-people-and-pollinators/', 'independent', 'Mt. Cuba Center'),
      s(
        'i05_s5',
        'Mt. Cuba Center — four-year Vernonia trial results',
        'https://www.greenhousegrower.com/crops/mt-cuba-center-shares-results-from-four-year-vernonia-trial/',
        'independent',
        'Mt. Cuba Center via Greenhouse Grower',
      ),
    ],
    researchRequired: [
      'Mt. Cuba’s data are Mid-Atlantic; Annie White’s are New England; Chicago Botanic covers the upper Midwest. Regional transferability of any cultivar ranking is a genuine open question and must be stated wherever we cite a ranking.',
      'The nativar herbivory finding is tested for only a handful of woody genera. Do not over-generalise it to herbaceous perennials without saying so.',
      'Walters Gardens does not publish water needs or container suitability for its 2026 perennials. Those fields remain unverified on our plant pages.',
    ],
    updatedAt: '2026-07-13T09:00:00.000Z',
  },

  // =========================================================================
  // IN THE SCHEDULE — demonstrates draft → scheduled → published workflow.
  {
    id: 'issue_06',
    number: 6,
    slug: '06-the-sterility-question',
    title: 'The Sterility Question',
    standfirst:
      '“Sterile” is a marketing word until somebody defines it. We are asking four breeders to define it, on the record.',
    coverImageKey: 'texture_seed_pods',
    publishDate: '2026-07-23',
    status: 'scheduled',
    tags: ['plants', 'ornamental', 'outdoor'],
    editorsIntro: `Proven Winners sells "the only seedless, sterile, non-invasive burning bush." Several US states permit otherwise-banned Buddleja hybrids if trials show under 2% viable seed — a threshold, not a zero. PDSI's two new 2026 dwarf buddleias carry no sterility claim at all. Neither does Proven Winners' new white rose of Sharon, in a species that self-sows aggressively across the mid-Atlantic and Southeast.

What does "sterile" actually mean? Who verifies it? Over how many site-years, in how many states? Is the plant male-sterile, female-sterile, or triploid?

These are answerable questions, and the breeders can answer them if they are asked properly. We have asked. Nobody has answered yet — which is why this page looks like this.

**RESEARCH REQUIRED BEFORE PUBLICATION.** This issue is in the schedule, not finished, and visible on purpose: it is what an unfinished Garden Drop looks like from the inside. The lead story is unwritten. The discoveries are reported but not stood up. The interviews are outstanding. Nothing here will go out until it is verified, and we would rather show you the empty frame than fill it with something we cannot defend.`,
    leadStorySlug: '',
    discoveries: [],
    techniqueLab: {
      techniqueSlug: 'choosing-nativars-by-trait',
      framing: 'Research required before publication.',
      theTest: 'Research required before publication.',
    },
    worthIt: {
      subject: 'Fire Ball Seedless™ Burning Bush',
      subjectHref: '/plants/fire-ball-seedless-burning-bush',
      verdict: 'watch',
      line: 'The right idea. Now show us the site-years.',
      body: 'Research required before publication — this verdict is provisional pending the breeder interviews.',
    },
    interview: {
      status: 'research-required',
      intro: 'Interviews requested with Spring Meadow Nursery, PDSI, and an Extension Master Gardener critic of sterility labelling. Not yet secured.',
      exchanges: [],
      questionsToAsk: [
        'Over how many site-years, and in which states, was seed set observed before the sterility claim was made?',
        'Is the plant male-sterile, female-sterile, or triploid? Has that been established cytologically or by observation?',
        'Several states set a threshold of under 2% viable seed. Is that the standard you are working to, and who audits it?',
      ],
    },
    readerAction: {
      heading: 'Research required before publication',
      intro: 'This issue is in the schedule. The reader action will be set once the interviews are complete.',
      steps: [],
    },
    sources: [],
    researchRequired: [
      'Spring Meadow: request sterility trial data for Fire Ball Seedless (site-years, states, mechanism).',
      'Buddleja Cascade Collection: “no observed seed set in four years of trials” is search-snippet level only. Re-fetch the primary source before print.',
      'The Extension Master Gardener analysis questioning whether “sterile” butterfly bushes are environmentally safer was retrieved at snippet level only. Obtain and read in full.',
      'Confirm the regulatory threshold (<2% viable seed) state by state. Oregon is the key jurisdiction.',
    ],
    updatedAt: '2026-07-13T09:00:00.000Z',
  },
];

export const issuesBySlug = Object.fromEntries(issues.map((i) => [i.slug, i]));

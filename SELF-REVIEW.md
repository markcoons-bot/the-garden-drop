# SELF-REVIEW — The Garden Drop

> ## RESOLUTION — every failure and flag below has been fixed
>
> This report was commissioned adversarially, it found real fabrications, and the fixes were applied
> before shipping. Recorded here rather than quietly deleted, because a publication that hides its
> own corrections has no business auditing anybody else's.
>
> | # | Finding | Fix applied |
> |---|---|---|
> | 1 | Windham source carried an invented paper title in quotation marks | Replaced with a descriptive, unquoted citation: authors, journal, volume, year, study design |
> | 2 | Kale 'Rubybor' scored against "a record that had stood since **1932**" — a fabricated year | Year removed. Now reads "a first in the award's history — but read the footnote before you repeat it" |
> | 3 | Echinacea 'Knock 'em Red' asserted **single-petalled**; the research never says so, and the `buy` verdict rested on it | Verdict downgraded to **Worth watching**. The page now says plainly that Walters has not published the petal form, that we will not infer it from a photograph, and that one email settles it. Issue 05's discovery card rewritten to match |
> | 4 | "University of Florida's **Botrytis-resistant** strawberries" — the research says *reflexed calyx reducing Botrytis development*, an architectural trait | Corrected, and the architecture described properly |
> | 5 | Encore Autumn Kiss zones marked `reported`; dossier says "search-level, unverified" | Downgraded to `unverified`. The plant page now explains *why* and says we have asked PDSI |
> | 6 | Four AAS winners asserted `availability: 'retail'` on a site that elsewhere explains AAS never publishes availability | All four changed to `limited`, each with a note saying so |
> | 7 | Superior Fruit Innovations royalty quoted as "$1 per tree" in three places; the full terms add "$1 per plant per year from year four" | Full terms now stated in all three |
> | 8 | "not Star, not Proven Winners, **not David Austin**" — Austin was never checked | Claim narrowed to the introductions we actually examined |
> | 9 | Issue 01 said "twelve plants" (14 tagged); Issue 04 said "six techniques" (7 tagged) | Counts corrected. Issue 01 now reads "Fourteen plants. Six we would buy" — which is exactly the verdict split |
> | 10 | Issue 06 claimed "We have asked. This issue is what they said" while its interviews were unsecured, and it reused Issue 01's lead story | Rewritten to say the questions are unanswered, and that an unfinished issue is being shown on purpose. Lead story removed rather than borrowed |
> | 11 | Index cards showed stock photography beside named cultivars with no placeholder label | A `PLACEHOLDER` marker now sits on every plant card and discovery card image |
> | 12 | README claimed a draft issue that does not exist; listed the wrong unsecured interviews; overstated the rename story | All three corrected. The five real unanswered interviews are now tabled by issue, with why each person matters |
>
> Re-verified after fixes: `tsc --noEmit` clean · `next build` green, 53 routes · all public routes 200 ·
> all four forms round-trip · admin auth gates · Issue 06 no longer renders a borrowed lead story.

**Reviewer:** adversarial QA / fact-check pass
**Date:** 13 July 2026
**Scope:** content integrity, internal consistency, editorial credibility. Build, types and routing were **not** re-tested (reported green).
**Method:** every factual claim in `src/content/{plants,techniques,issues,experts}.ts` cross-read against `research/plants-research.md` and `research/techniques-research.md`; every slug/imageKey/href reference machine-checked; repo-wide honesty grep; form-by-form accessibility read; README compared line-by-line against `researchRequired` arrays and the two unverified registers.

---

## Verdict

**Yes — with nine fixes first, four of which are quick.** This is, by a wide margin, the most honest gardening content I have audited. Every high-risk citation the brief asked me to check survives: Karst/Jones/Hoeksema is correctly attributed and Simard is correctly named as a *rebutter*, not an author; Baisden/Tallamy is in *HortTechnology* 28(5):596–606 (2018), not *Environmental Entomology*; the 302-trial New Phytologist meta-analysis, the <12% / 63% / >80% figures, the Ingram & Millner compost-tea finding, White's 1,414-vs-119, Mt. Cuba's "11 of 12", the EPA WaterSense gallon figures, the Delaware shade-cloth findings and Dowding's own "not statistically significant" concession are all reproduced accurately and, in several cases, more carefully than the sources themselves. **There are zero invented quotations.** Every quotation mark on the site encloses text that appears verbatim in the dossiers, attributed to the party that actually said it. There are no invented prices, no fabricated staff, no invented subscriber or open-rate numbers, no lorem ipsum, no TODOs, and no broken internal references or dead links anywhere in the app.

What stops this being publishable *today* is a small number of places where the product is **more confident than its own research** — the exact failure mode this publication is built to attack, which makes them disproportionately dangerous. A source carries a paper title in quotation marks that appears nowhere in the dossier. A kale scores against "a record that had stood since 1932," a date invented from nowhere. A coneflower's entire `buy` verdict rests on the flower being single-petalled, which the research never says. An azalea's zone range is flagged `reported` when the dossier says, twice, "search-level, unverified." Four AAS winners are asserted as available at retail on a page that itself explains that AAS never publishes availability. And a plant breeder — the exact reader you are about to show this to — will open `/plants`, see a purple dahlia beside 'Knock 'em Red', peaches beside an apple and a coleus beside a hosta, with no placeholder label on any of the index cards, and will form a judgement in about four seconds. Fix that first.

---

## Fabrication audit

Every factual claim of consequence, its source, and a verdict. **PASS** = traceable to the dossier at the same or lower confidence. **FLAG** = not in the dossier, or stated more confidently than the dossier. **FAIL** = contradicts the dossier or is fabricated.

### The high-risk items the brief named

| # | Claim (as printed) | Where | Research says | Verdict |
|---|---|---|---|---|
| 1 | Windham et al., *Pathogens* 12:439 (2023); 3-year, 2-site, 108 accessions; all major commercial cultivars susceptible; Knock Out **moderate**; ~21 low-symptom accessions, ~half still virus-positive | issues.ts:58; plants.ts:455 | Identical | **PASS** |
| 2 | Source titled **"Field Resistance to Rose Rosette Disease"** in quotation marks | plants.ts:468 | Dossier gives authors/journal/volume/page/year — **and no title at all** | **FLAG** |
| 3 | US garden-rose production ~37M bushes (2014) → ~25M (2019), "helped cut," losses attributed to RRD **and black spot** | issues.ts:60; plants.ts:455 | Identical, incl. the black-spot co-attribution | **PASS** |
| 4 | "As of July 2026 we can find no evidence a rose-rosette-resistant cultivar has been commercially released" | plants.ts:455; issues.ts:62 | Identical, incl. the hedge | **PASS** |
| 5 | $4M USDA NIFA SCRI consortium, 5 universities, 21 researchers, Byrne/TAMU | experts.ts:85; issues.ts:60 | Identical | **PASS** |
| 6 | "Not one rose introducer in 2026 — not Star, not Proven Winners, **not David Austin** — claims RRD resistance" | issues.ts:54 | Dossier establishes the negative for **Star** (explicitly) and **PW** (no data on page). It says **nothing** about what David Austin claims | **FLAG** |
| 7 | Koziol, McKenna & Bever, *New Phytologist* (2025), **302 trials**; **<12%** of commercial products showed both growth benefit and viable colonisation; **63%** for lab-grown; failure modes incl. pathogen contamination | techniques.ts:124,131; issues.ts:315,965 | Identical | **PASS** |
| 8 | Salomon et al., *iScience* (2022), 25 products, **>80%** failed to induce **any** colonisation, in sterilised soil under favourable conditions | techniques.ts:131; issues.ts:313 | Identical | **PASS** |
| 9 | Boussageon et al. (2025) — title quoted verbatim | techniques.ts:183; issues.ts:317 | Identical | **PASS** |
| 10 | Ingram & Millner (2007), *J. Food Protection* — nutrient supplements → growth of *E. coli* O157:H7, *Salmonella*, faecal coliforms; **aerated** tea sustained **higher** concentrations; without supplements E. coli below detection by 36 h | techniques.ts:289; issues.ts:983 | Identical | **PASS** |
| 11 | Scheuerell & Mahaffee (2002): compost **source** mattered more than aeration | techniques.ts:289 | Identical | **PASS** |
| 12 | Annie White, Univ. of Vermont: 12 species, 14 cultivars, 2 sites, 2 years; 7 / 4 / 1 split; **1,414 vs 119** visits on *Achillea millefolium* vs a red cultivar | techniques.ts:756; issues.ts:423–425 | Identical (dossier adds "'Strawberry Seduction'-type"; content correctly says only "a red cultivar") | **PASS** |
| 13 | Baisden, Tallamy, Narango & Boyle, **HortTechnology 28(5):596–606 (2018)**; habit/size no diff, disease resistance no diff, fruit size no reduction, **purple/red anthocyanin foliage significantly reduced** herbivory | techniques.ts:756; issues.ts:409–417; plants.ts:733 | Identical. **Journal and year correct** (the dossier's Editor's Correction #2 survived into the product) | **PASS** |
| 14 | Karst, Jones & Hoeksema (2023), *Nature Ecol. Evol.* 7:501–511; three claims; the third has **no peer-reviewed evidence at all**; positive citation bias. **Simard is the rebutter, not an author** | issues.ts:295–305, 341 | Identical. **Simard correctly excluded from the author list** (the dossier's Editor's Correction #1 survived) | **PASS** |
| 15 | Mt. Cuba goldenrod, Jan 2026: 3 years, 70 types, 50 species, **11 of the 12 top performers were straight species**; *S. fistulosa* reaching the trade because of the trial | issues.ts:449, 1150; experts.ts:35 | Identical | **PASS** |
| 16 | Mt. Cuba *Vernonia*: 4 years, 45 selections; plant health correlated with pollinator support | plants.ts:663; issues.ts:449 | Identical | **PASS** |
| 17 | Mt. Cuba *Echinacea*: 3 years, 75 selections, 60-second windows; doubles less favoured; **all top-ranked were single**; straight *E. purpurea* most visits, white cultivar 2nd, 'Pica Bella' topped overall | issues.ts:429; plants.ts:800 | Identical, including the nuance that some cultivars beat the species | **PASS** |
| 18 | EPA WaterSense: weather-based controller ≈ **7,600 gal/yr**; soil-moisture sensor **>15,000 gal/yr** | techniques.ts:566; issues.ts:695 | Identical | **PASS** |
| 19 | Univ. of Delaware / Emmalea Ernest: **30% black** cloth highest yield, **3× marketable yield**; shade increased fruit **size**, not **count**; black beat white/red/aluminised; **June beats July** (transplant girdling); **2 °F mean / 8 °F max** cooler in 2021 loggers; 'Carmen' showed no benefit | techniques.ts:61,71; issues.ts:148, 677 | Identical | **PASS** |
| 20 | Utah State / Gent shade-cloth percentages **withheld** and named as unverified | techniques.ts:61; issues.ts:798 | Dossier: "[UNVERIFIED — do not print the specific percentages]" — **obeyed** | **PASS** |
| 21 | Charles Dowding: "isn't science in comparison to what a research station would do"; a statistical analysis found his yield results **not statistically significant**; "indications, not proof"; the **compost confound** | techniques.ts:361; experts.ts:95 | Identical, incl. the confound the dossier says nobody separates | **PASS** |
| 22 | Jeffery et al. (2017) — title quoted; 35–38% tropical gains; **no yield impact below 10 °C MAT**; Schmidt et al. (2021) = 26 meta-analyses | techniques.ts:212; issues.ts:974 | Identical | **PASS** |
| 23 | RDI meta-analysis, *Agric. Water Mgmt* 222:301–312 (2019): yield **−18.61 t/ha**, WUE **+2.33 kg/m³** | techniques.ts:497; issues.ts:686 | Identical | **PASS** |
| 24 | Hügelkultur: "we found no randomised, replicated study… not a weak one. None." | techniques.ts:633; issues.ts:1001 | Identical | **PASS** |
| 25 | Container-fruit yields: every figure traced to content farms, incl. a "2023 UC ANR study" that likely does not exist — **printed as the finding, not as a number** | issues.ts:205, 933; techniques.ts:830 | Identical | **PASS** |
| 26 | Soil-microbiome-kit statistics ("2025 Soil Health Institute survey", 68%/22%, 92% concordance) | — | Dossier: **DO NOT PRINT**. They appear **nowhere** in the product | **PASS** |
| 27 | Kaolin "up to 50%", heat-set tomato thresholds, any "degrees cooler" mulch figure, Tertill "as effective as hand weeding per Cornell" | — | All four flagged unverified in the dossier; **none appears in the product** | **PASS** |

### Fabrications, overstatements and unsourced specifics found

| # | Claim (as printed) | Where | What the research actually supports | Verdict |
|---|---|---|---|---|
| 28 | Source: `'Windham et al., "Field Resistance to Rose Rosette Disease," Pathogens 12:439 (2023)'` | `plants.ts:468` | The dossier supplies authors, journal, volume, page, year — **never a title**. A paper title inside quotation marks that does not exist in the research is the single most dangerous item in this file: it is a fabricated citation string in a publication whose masthead promise is "no quotes we did not obtain." (The real title is longer and different.) | **FAIL** |
| 29 | Kale 'Rubybor' novelty note: *"A record that had stood since **1932**"* | `plants.ts:1068` | Neither dossier contains the year 1932, nor any AAS founding date. The dual-Gold claim is "first in AAS history" and nothing more. This is an invented statistic dressed as a fact — and it sits **directly above** a verdict warning the reader not to print "first in history" without checking. | **FAIL** |
| 30 | Echinacea 'Knock 'em Red' is **"Single-petalled — which, for once, is the important detail"**; "it is single"; "on a single-petalled four-inch flower" | `plants.ts:766, 789`; `issues.ts:1132` | The dossier describes only "4-inch flowers open deep crimson and turn fluorescent red." **It never states the flower form.** "Single" is inferred from the series name (COLOR CODED® vs DOUBLE CODED®). The entire `buy` verdict, and its contrast with 'Coral Cranberry', rests on this inference. | **FAIL** |
| 31 | "University of Florida's **Botrytis-resistant** strawberries are commercial-licence only" | `plants.ts:1210` | Dossier: Florida Encore has a **reflexed calyx that curves away from the shoulder, reducing Botrytis *development***, plus moderate resistance to *Phytophthora cactorum*. Florida Ember is about *Neopestalotiopsis*. "Botrytis-resistant" is a materially stronger and different claim. **The Issue 03 lead story states it correctly** ("a reflexed calyx that curls away from the fruit shoulder to reduce Botrytis") — so the site contradicts itself. | **FAIL** |
| 32 | Encore Autumn Kiss: `zones: 'USDA 6a–10'`, **`zonesConfidence: 'reported'`** | `plants.ts:212–213` | Dossier: "**search-level, unverified by fetch**." The unverified register repeats it. The issue's own `researchRequired` and the README both say "search-level only." The Confidence enum has an `unverified` value for exactly this. **The flag was upgraded in the product.** | **FAIL** |
| 33 | Retail availability asserted for AAS winners: `availability: 'retail'` + score notes *"Seed, widely, from 2026"* (Rubybor), *"Seed, from 2026"* (Treviso), *"Seed, widely"* (BadaBing!), *"Seed and plants, widely"* (Sedum 'Spectacular') | `plants.ts:1057, 1072, 1121, 1136, 984, 1000, 912, 929` | Dossier marks **availability: unverified** for Rubybor, Treviso, BadaBing! and Sedum 'Spectacular'. The Sedum record's own `availabilityNote` says *"AAS and Fleuroselect press releases almost never publish zones, size or water needs"* — and then the record asserts retail availability anyway. Self-contradicting. | **FLAG** |
| 34 | Superior Fruit Innovations = "$100, ten-year membership with a **$1-per-tree royalty at purchase**" | `plants.ts:1247`, `issues.ts:231, 848` | Dossier: "$100, 10-year membership with a **$1.00-per-tree royalty at purchase plus $1.00/plant/year from year 4**." The **recurring annual fee is dropped in all three places**. In a story whose thesis is that this model is "extraordinary value," omitting the ongoing cost makes the deal look cheaper than it is. | **FLAG** |
| 35 | "not Star, not Proven Winners, **not David Austin** — claims resistance to rose rosette disease" | `issues.ts:54` | See #6. The dossier does not check David Austin's claims. An absolute negative about a named third party, unsupported. | **FLAG** |
| 36 | Hosta RED NINJA: `sun: 'part'` | `plants.ts:843` | Two fields above, `whatIsNew` says the plant "**needs direct sun** to colour up, and the more it gets, the better the colour" — the headline finding. The structured field says part shade, and it is what drives the `/plants` sun filter. RHS says "sun or partial shade, ideally gentle morning sun," so `full-to-part` is defensible; `part` is not. | **FLAG** |
| 37 | Spigelia 'Orange Slices': `sun: 'part-to-shade'` | `plants.ts:707` | The same record's `description` says "working **from full sun** through part shade" and the discovery card says "**Sun to shade**." Dossier: "Sun–part shade." Field contradicts its own copy. | **FLAG** |
| 38 | Expert job titles: Chalker-Scott "**Associate** Professor"; Ernest "Associate Scientist, Vegetable Crops"; Byrne "Professor of Horticultural Sciences"; Hansen "Director of New Plant Development" | `experts.ts:42, 72, 82, 62` | **None of these titles appears in either dossier.** They are plausible and probably right, but they are unsourced specifics attached to named living people, in a file whose header declares "drawn from public sources." Chalker-Scott's rank in particular is the kind of detail she would notice. | **FLAG** |
| 39 | Shade-cloth evidence score note: "Four years of **replicated** university extension trials" | `techniques.ts:87` | Dossier says "four-year… trial program" and never uses the word replicated. Small, but this publication's entire scoring rubric turns on the word. | **FLAG** |
| 40 | Fire Ball Seedless zones/size marked `unverified`; sterility framed as a question, not a fact | `plants.ts:357–360, 387–389` | Exactly matches the dossier's scepticism | **PASS** |
| 41 | Perfecto Mundo zone-6b caveat quoted verbatim; "do not fertilise after mid-July"; **no price printed** despite the dossier carrying "~$21 list" | `plants.ts:296` | Matches, and the house rule "No prices" was honoured | **PASS** |
| 42 | Incrediball Storm Proof: PW volunteers that flowers are **smaller** than the original | `plants.ts:72`; `issues.ts:42` | Identical | **PASS** |
| 43 | Encore mechanism: 1980s crosses with *R. oldhamii*; buds set on same-season new growth; prune straight after spring bloom; 4–6 h sun for rebloom; FAQ's "not a maximum height" quoted verbatim | `plants.ts:211, 245`; `issues.ts:52` | Identical | **PASS** |
| 44 | Bushel and Berry: no genuinely new berry since ~2021; Baby Cakes® 2016; a Star Roses (Ball) brand, **not** Proven Winners | `plants.ts:1352–1354` | Identical, incl. the correction | **PASS** |
| 45 | Rise Up Lilac Days bred by **Chris Warner**, introduced by **Proven Winners** (not Star) | `plants.ts:412` | Correction carried through | **PASS** |
| 46 | Sweet-Ark® Immaculate described as **floricane**, thornless, 2-week post-harvest firmness | `experts.ts:55`; `issues.ts:893` | Correction carried through | **PASS** |
| 47 | Enchanted Meadow: release year "genuinely muddled," and the customer review reporting rust and black spot is surfaced rather than buried | `plants.ts:513, 527, 535` | Matches the dossier's instruction to flag rather than bury | **PASS** |
| 48 | Agapanthus 'Poppin' Pink': "first-ever pink" printed **as a claim under challenge**, single 9a zone flagged | `plants.ts:1447, 1476` | Matches | **PASS** |
| 49 | Wood chips: N tie-up only in the interface zone; only a problem if tilled in; **no "degrees cooler" number printed** | `techniques.ts:429` | Matches, incl. the refusal | **PASS** |
| 50 | **Every quotation mark on the site**, checked individually: PW's zone-6b sentence, Encore's FAQ sentence, the AAS judges on Sedum, the RED NINJA breeding team, Chalker-Scott's "if you build it, they will come," Dowding's three self-caveats, Boussageon's paper title, Jeffery's paper title, "not competitive" (columnar apples), USDA-ARS on climate attribution | all files | **Every one appears verbatim in a dossier, attributed to the party that said it. Zero invented quotes. Every unsecured interview publishes questions, never answers.** | **PASS** |

---

## Broken references

**None.** Machine-checked, all resolve:

- Every `plantSlug` (12 distinct) and `techniqueSlug` (11 distinct) in `discoveries` / `techniqueLab` exists in `plants.ts` / `techniques.ts`.
- Every `issueSlugs` entry on all 21 plants and 13 techniques corresponds to a real issue slug.
- Every `leadStorySlug` (6) exists in `stories`.
- Every `expertSlug` (5) exists in `experts.ts`.
- Every `imageKey` and `coverImageKey` used anywhere in `src/content/**`, `src/app/**` and `src/components/**` exists in `src/content/images.ts`. (14 keys are defined and unused — `portrait_01`–`06`, `plant_fig`, `plant_ornamental_grass`, etc. Harmless.)
- Every `subjectHref` (4) resolves to a real route.

**But two reference-level content faults that are not type errors:**

1. **`issues.ts:1242` — Issue 06 borrows Issue 01's lead story.** `leadStorySlug: 'the-year-the-breeders-told-the-truth'`. That `Story`'s own `issueSlug` is `'01-plants-you-havent-seen-yet'`. The Issue 06 page will render Issue 01's lead article, under the heading "The lead story," as though it belonged to the sterility issue. Resolves cleanly; is still wrong.
2. **No plant or technique carries `issueSlugs: ['06-the-sterility-question']`.** The sterility issue has no content attached to it, and its `worthIt` subject (Fire Ball Seedless) is tagged to Issues 01 and 05 instead.

---

## Dead internal links

**None.** Every internal `href` in `src/app/**` and `src/components/**` maps to a real route:

- `/`, `/about`, `/partner`, `/submit`, `/plants`, `/techniques`, `/issues`, `/admin` — all exist.
- `/plants/[slug]`, `/techniques/[slug]`, `/issues/[slug]` — dynamic, all templated from real records.
- `/admin/subscribers`, `/admin/submissions`, `/admin/issues/…` — served by `/admin/[entity]`; `subscribers`, `submissions` and `issues` are all registered entity slugs in `src/lib/entities.ts`.
- Fragment targets all exist: `#method` (about:206), `#independence` (about:383), `#corrections` (about:423), `#subscribe` (`NewsletterBlock` default `id`, rendered on the home page at `page.tsx:309`).

---

## Honesty audit

**Clean.** Repo-wide grep for `lorem|ipsum|TODO|FIXME|XXX:|placeholder text|coming soon|dummy|fake` returns **four hits, all legitimate**: two are the word "fake" inside the About page's own "No fake testimonials" rule and the biochar score note ("Not because biochar is fake — it isn't"), one is the dossier saying the same, one is `SubmitForm.tsx:532` honestly telling the user that direct upload "is switched off rather than faked." No lorem ipsum. No TODOs. No placeholder copy.

**About page — confirmed clean.** No invented staff. The masthead section is explicitly, deliberately empty: *"We are not going to invent a staff for you. No stock-photo horticulturist with a borrowed CV, no 'team of experts', no founder's letter signed by somebody who does not exist."* No testimonials. No audience numbers.

**Partner page — confirmed clean.** *"You will find no subscriber count on this page, no open rate, no 'reaching X engaged gardeners'."* Zero invented statistics. The one number on the page ("four hundred breeders… forty thousand people") is explicitly hypothetical and framed as such.

**Two honesty problems that the grep cannot catch:**

1. **Index cards carry unlabelled stock photography of the wrong species.** The `<Figure>` component prints "Placeholder photography · [photographer]" (ui.tsx:216), and the issue hero prints its own note — but `PlantCard`, `TechniqueCard` and `IssueCard` (`cards.tsx:36, 78, 116, 160`) render a raw `<Image>` with **no placeholder label at all**. So on `/plants`, on `/issues/[slug]` discovery cards, and on the home page, a breeder sees:
   - **'Knock 'em Red' coneflower** illustrated with `plant_dahlia` — *"Close-up of a vibrant purple dahlia flower."*
   - **Hosta RED NINJA** illustrated with `plant_coleus` — *"Colourful coleus plant leaves."*
   - **Big Flirt™ apple** illustrated with `plant_peach` — *"Ripe peaches hanging from a tree branch."*
   - **Kale 'Rubybor'** illustrated with `technique_seed_trays`; **Basil 'Treviso'** with `texture_leaf_macro`; **Agapanthus** with `plant_lavender`; **Loropetalum** with `plant_clematis`; **Enchanted Meadow rose** with `hero_dark_bloom_alt` (an orange flower).

   The alt text is scrupulously honest, and the README says the photography is placeholder — but the *page* does not, on the surface most likely to be scanned first. This is a self-inflicted credibility wound in front of precisely the audience that can identify a dahlia.

2. **The Partner page refers to an editor who, per the About page, does not exist.** *"the editor does not know what you paid and would not care if **he** did"*; *"It does not reach the editor, and the editor does not see it."* The About page says the masthead is deliberately unfilled. Minor, but a breeder will read both pages.

---

## Accessibility

**No input anywhere is missing a label.** All six components pass.

| Component | Labels | Errors | Status region |
|---|---|---|---|
| `SignupForm.tsx` | `<label htmlFor>` on email and zone; honeypot labelled and `aria-hidden` + `tabIndex={-1}` | `aria-invalid`, `aria-describedby` → `role="alert"` | `role="status" aria-live="polite"` on success |
| `SubmitForm.tsx` | 11 fields via the `Field` wrapper (`<label htmlFor={id}>`); radio group wrapped in `<label htmlFor>` per option; `<fieldset>`/`<legend class="sr-only">` per section | `aria-invalid` + `aria-describedby` on all 9 validated fields; `role="alert"` on field errors, on the form-level error, and on the radio-group error | persistent `aria-live="polite"` sr-only region (in the DOM at all times — correct) |
| `PartnerForm.tsx` | `<label htmlFor>` on all 5 fields + honeypot | `aria-invalid` + `aria-describedby` + `role="alert"` on all 5 | `aria-live="polite"` |
| `PlantFilters.tsx` | `<label htmlFor>` on all 10 controls; `role="search"` + `aria-label` on the form | n/a | `aria-live="polite" aria-atomic="true"` on the result count |
| `TechniqueFilters.tsx` | `<label htmlFor>` on all 5 controls; `role="search"` + `aria-label` | n/a | `aria-live="polite"` |
| `IssueFilters.tsx` | `<label htmlFor="issue-search">`; tag buttons carry `aria-pressed` and text labels | n/a | `aria-live="polite"` |

**Two minor nits, neither an unlabelled input:**

- `IssueFilters.tsx:44` — the tag-button group is introduced by a bare `<span className="label">Filter by subject</span>`. It should be a `<fieldset>`/`<legend>` or `role="group" aria-labelledby`, so a screen-reader user hears what the eight toggle buttons control.
- `TechniqueFilters` and `PlantFilters` announce their result count via `aria-live`, but `IssueFilters` does not mark its count `aria-atomic`, so partial updates may be read.

---

## README accuracy

**Quickstart: correct.** `npm install && npm run dev` → `localhost:3000`; zero configuration confirmed (local JSON store at `.data/db.json` seeded from `src/content/*`; email logged to console; `track()` prints to console); admin at `/admin`; dev default password `gardendrop` confirmed in `src/lib/auth.ts:28` (`process.env.ADMIN_PASSWORD || 'gardendrop'`) and surfaced as a dev-only hint in `admin/login/page.tsx:34`. The production warning ("do not deploy with the default password"; "the local JSON store cannot work on Vercel") is accurate and appropriately blunt.

**"Remaining tasks requiring human research": accurate, and a correct superset.** I checked it item-by-item against both registers and all six `researchRequired` arrays:
- All **10** items in the techniques dossier's "APPENDIX — WHAT I COULD NOT VERIFY" are present.
- All items in the plants dossier's "THE UNVERIFIED REGISTER" — including all eight widely-repeated corrections and the sourcing weaknesses (AAS JavaScript gate, the unresolved Fleuroselect 2026-vs-2027 conflict, the empty-body publisher fetches) — are present.
- Every entry in every issue's `researchRequired` array appears in the README, and the README correctly adds dossier items the issue pages do not carry.

**Four inaccuracies:**

1. **FAIL — README line 89: *"issues.ts — Six issues, including one scheduled and one draft."*** There is **no draft**. `grep -rn "status: 'draft'" src/content/` returns nothing, anywhere in the repo. There are six issues: five `published`, one `scheduled`. The claim is repeated implicitly in "Known limitations." A reader who opens the file to see the draft workflow will not find it.
2. **FAIL — README lines 461–472, "Interviews requested but not secured," does not describe the interviews in the product.** The README lists Spring Meadow, Dave Wilson/Zaiger, Burpee, Bejo, Mt. Cuba and Fleuroselect. The actual `interview` blocks in `issues.ts` request **Buddy Lee** (Issue 01), **Emmalea Ernest** (Issue 02), **Margaret Worthington** (Issue 03), **Linda Chalker-Scott** (Issue 04), **Sam Hoadley** (Issue 05) and an unnamed trio for Issue 06. Only **Mt. Cuba** and **Spring Meadow** overlap. The section opens with *"Every issue's `interview` block carries a `status`…"* and then lists things that are mostly research phone calls, not interview blocks — omitting four of the five named interviewees the site actually publishes questions for. This is the section a breeder will read to see whether they are being quoted, and it is wrong.
3. **FLAG — README line 329: *"Renaming the publication. Change `site.config.ts`. That is it."*** False. `editorial@thegardendrop.com` is hardcoded in **five** `askBack` strings in `src/content/issues.ts` (lines 610, 758, 910, 1046, 1193). Rename the publication and five reader-facing calls to action still point at the old domain.
4. **FLAG — README line 450 writes "Fire Ball Seedless®"**; the product and the dossier both use "Fire Ball Seedless™". Trivial in isolation; less so in a publication that sells itself on getting trademark and cultivar denomination right.

Also worth noting, though the README does not claim otherwise: its photography section says *"none of it depicts the specific cultivar named beside it, and every `<Figure>` says so on the page."* That is literally true of `<Figure>` — and misleading in effect, because the index and discovery cards are not `<Figure>`s and say nothing. See the Honesty audit.

---

## Internal consistency — count and copy errors

Not broken references, but numbers in the copy that do not match the data behind them:

| # | Where | Says | Data says |
|---|---|---|---|
| A | Issue 01 standfirst (`issues.ts:512`) and its lead story (`:72`) | **"Twelve genuinely new plants reach retail this spring"** / **"Twelve plants. Six verdicts."** | **14 plants** carry `issueSlugs: ['01-plants-you-havent-seen-yet']`. ("Six are worth your money" is **correct** — exactly six `buy` verdicts.) The "twelve" appears to have leaked from the dossier's *"full New-for-2026 shrub list (12 items)"* — a different fact, which the lead story also uses correctly two paragraphs later ("Twelve genuinely new shrubs… from one breeder alone"). Two different twelves, one of them wrong. |
| B | Issue 01 standfirst | "…reach **retail this spring**" | Two of the fourteen are 2025 releases (Perfecto Mundo Fuchsia Carpet, Fire Ball Seedless) |
| C | Issue 04 standfirst (`:948`) and its lead story (`:323`) | **"Six techniques"** / "This issue is about **six** soil techniques" | **7 techniques** carry `issueSlugs: ['04-soil-tech-what-actually-works']`: mycorrhizal inoculants, biochar, aerated compost tea, no-dig, wood-chip mulch, hügelkultur, soil-microbiome kits |
| D | Issue 06 editor's intro (`:1239–1241`) | **"We have asked. This issue is what they said."** …followed, in the same intro, by *"RESEARCH REQUIRED BEFORE PUBLICATION… The interviews are outstanding."* | The interviews do not exist. The `interview.status` is `research-required` and `exchanges: []`. The first sentence claims interviews that were never obtained — in the one issue whose entire subject is holding people to their claims. It is readable today by direct link. |
| E | Issue 06 | `discoveries: []`, `readerAction.steps: []`, `sources: []` | The README and the type both describe "five discoveries" per issue. Acceptable for a scheduled proof, but the page will render three empty sections |

---

## The 5 most important things a human must do before this is published for real

1. **Fix the four fabrications, in this order** (each is a one-line edit, and each is the exact sin the masthead promises never to commit):
   - `plants.ts:468` — delete the invented paper title `"Field Resistance to Rose Rosette Disease"` from the Windham source, or replace it with the real one after opening the paper.
   - `plants.ts:1068` — delete **"since 1932."** No dossier contains that year.
   - `plants.ts:766/789` + `issues.ts:1132` — either verify with Walters that 'Knock 'em Red' is single-flowered, or remove the claim. The `buy` verdict currently depends on it.
   - `plants.ts:1210` — change "Botrytis-resistant strawberries" to the architectural claim the research actually supports (reflexed calyx reducing Botrytis development), which the Issue 03 lead already gets right.

2. **Restore the honest confidence flags.** Set Encore Autumn Kiss's `zonesConfidence` back to `'unverified'` (the dossier, the issue's own `researchRequired`, and the README all say search-level only — the product is the only place that says "reported"). Then sweep the four AAS winners (Rubybor, Treviso, BadaBing!, Sedum 'Spectacular') whose availability is asserted as retail where the dossier says unverified — one of them contains an `availabilityNote` explaining why that field *cannot* be known. And restore the missing half of the Superior Fruit Innovations royalty ($1/plant/year from year 4) in all three places it is quoted.

3. **Label the placeholder photography on the cards, or pull the images.** Add the "Placeholder photography" line that `<Figure>` already prints to `PlantCard`, `TechniqueCard` and `IssueCard` — or, better for this audience, replace the eight worst mismatches (dahlia→coneflower, coleus→hosta, peaches→apple, seed trays→kale, lavender→agapanthus, clematis→loropetalum, leaf macro→basil, orange flower→rose) with neutral texture crops. A breeder identifies a misattributed genus faster than they read a standfirst, and this is the first thing they will see.

4. **Correct the README's two false statements about its own repository.** There is no draft issue. The "Interviews requested but not secured" list names the wrong people — it omits Buddy Lee, Emmalea Ernest, Margaret Worthington and Linda Chalker-Scott, who are the four named individuals the site actually publishes unanswered questions to. If any of them reads this repo, that list is what they will check, and it does not mention them.

5. **Fix Issue 06 before anyone can reach it by link.** Delete the sentence "We have asked. This issue is what they said." — the interviews are not secured, and asserting otherwise in the sterility issue is the most quotable self-own available. Give it its own lead story (it currently reuses Issue 01's), and attach at least Fire Ball Seedless to `issueSlugs: ['06-the-sterility-question']` so the page is not empty. Then fix the two count errors: fourteen plants in Issue 01, not twelve; seven techniques in Issue 04, not six.

---

*Nothing in this repository was modified in the course of this review, except the creation of this file.*

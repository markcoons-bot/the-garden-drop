# The Garden Drop

**New plants. Better techniques. No recycled gardening advice.**

The Garden Drop tracks newly released plants and emerging gardening techniques, then separates
genuine progress from marketing noise. It is a discovery publication for people who want to know
what is actually new in gardening — new cultivars, new methods, and an honest verdict on whether
they are worth your time, money and soil.

Three things, and only three: **new plant releases**, **new and emerging techniques**, and **a
practical evaluation of whether they are worth it**. No "10 tomato growing tips". Every plant is
scored on six axes, every technique on six more, and every verdict carries the test that would
overturn it. Where a breeder does not publish a figure, we print `Unverified` instead of guessing.
Where the reporting is unfinished, the page itself prints `Research required before publication`.

This repository is the whole publication: the website, the editorial content, the admin, the
newsletter, and the research dossiers behind the copy.

---

## Quickstart

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

**It runs with zero configuration.** No database to provision, no API keys, no `.env` file
required.

- **Data** → a local JSON store at `.data/db.json`, created on first read and seeded from
  `src/content/*`. Delete the file to reseed.
- **Email** → logged to your console instead of sent.
- **Analytics** → `track()` prints the event to the console instead of calling a vendor.
- **Photography** → hot-linked from verified free-licence CDNs (see [Photography](#photography)).

Copy `.env.example` to `.env.local` only when you want to graduate a subsystem (Supabase, Resend,
Plausible/PostHog). Each one switches on independently.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | ESLint (`eslint-config-next`). |
| `npm run typecheck` | `tsc --noEmit`. TypeScript is strict. |
| `npm run db:seed:sql` | Regenerate `supabase/seed.sql` from `src/content/*`. |

---

## Project structure

```
site.config.ts               Brand, contact, cadence, CTAs, policy copy. Rename the publication here.
.env.example                 Every environment variable, annotated. All optional.

src/app/
  layout.tsx                 Fonts, metadata, nav, footer, analytics.
  page.tsx                   The front page.
  globals.css                Design language: paper, ink, moss, clay. Buttons, fields, rules.
  about/page.tsx             What we are, how we score, what we refuse to do, corrections, contact.
  submit/page.tsx            Submissions — the breeder-facing page.
  partner/page.tsx           Advertise or partner. No invented audience statistics.
  issues/                    Issue archive and issue pages.
  plants/                    Plant index and plant pages.
  techniques/                Technique index and technique pages.
  admin/                     Password-gated CRUD over every entity.
  api/                       subscribe · submit · partner · admin routes.
  sitemap.ts                 Generated from the database. Drafts never appear.
  robots.ts                  Allow all; disallow /admin and /api.
  opengraph-image.tsx        Default 1200×630 OG card. No remote fonts — it cannot fail at build.
  not-found.tsx              An on-brand, useful 404.

src/components/
  ui.tsx                     The design system: Kicker, SectionHead, Prose, Figure, VerdictBadge,
                             ScoreRow, Pips, ConfidenceTag, ResearchRequired, SourceList, EmptyState.
  cards.tsx                  IssueCard, PlantCard, TechniqueCard.
  Nav.tsx / Footer.tsx       Masthead and foot, both driven by site.config.ts.
  SignupForm.tsx             Newsletter signup (honeypot, inline errors, aria-live).
  NewsletterBlock.tsx        The signup block used at the foot of every major page.
  SubmitForm.tsx             Submissions form, validated against submissionSchema.
  PartnerForm.tsx            Partner enquiry form, validated against partnerSchema.
  Analytics.tsx              Loads Plausible or PostHog if configured. Otherwise nothing.
  TrackedLinks.tsx           Fires retail_link_click on outbound retail links.

src/content/                 THE EDITORIAL CONTENT. This is where the publication lives.
  issues.ts                  Six issues: five published, one scheduled and deliberately unfinished.
  plants.ts                  The plant records, scored.
  techniques.ts              The technique records, scored.
  experts.ts                 Expert records. Placeholder portraits are flagged as placeholders.
  images.ts                  The photography manifest — one key per image, verified free-licence.
  seed.ts                    Assembles the above into the initial Database.

src/lib/
  types.ts                   The content model. Mirrors supabase/migrations/0001_init.sql one-for-one.
  db.ts                      One data interface, two backends: local JSON or Supabase.
  store.ts                   The local JSON store (.data/db.json). Development only.
  validation.ts              zod schemas + fieldErrors(). Shared by the forms and the API routes.
  images.ts                  Key → CDN URL, alt text, credit.
  analytics.ts               track(), and the six events we care about.
  auth.ts                    Admin session cookie.

research/
  plants-research.md         The plant reporting, with an unverified register at the end.
  techniques-research.md     The technique reporting, with an appendix of what could not be verified.
  images-credits.md          Photographer credits for every image in the manifest.

supabase/
  migrations/0001_init.sql   The schema.
  seed.sql                   Generated by `npm run db:seed:sql`.
```

---

## The content model

Everything is defined in `src/lib/types.ts`, and the Supabase schema mirrors it exactly.

| Type | What it is |
| --- | --- |
| **Issue** | One fortnightly issue. Carries the editor's intro, the lead story, five discoveries ("The Drop"), a Technique Lab, a "Worth it?" verdict, an interview, a reader action — and its own `researchRequired` list of what is still unresolved. |
| **Story** | A piece of writing inside an issue: `lead`, `feature` or `note`. Body is markdown-lite (paragraphs, `## subhead`, `> pull quote`, `**bold**`). |
| **Plant** | A new introduction. Breeder, release year *and release channel*, zones, size, sun, water — each of the soft fields carrying a `Confidence` flag. Six scores, a verdict, a verdict line, and `howWeWouldTestIt`. |
| **Technique** | A method. What it is, the problem it claims to solve, an `EvidenceLevel`, instructions, advantages, limitations, six scores, a verdict. |
| **Expert** | A named person with a role and an organisation. `imageIsPlaceholder` exists so a stock portrait can never be passed off as a real face. |
| **Source** | Title, publisher, URL, and `kind`: `primary`, `trade`, `independent`, `peer-reviewed`. Every claim traces to one. |
| **RetailLink** | Where to buy. `affiliate` is `false` unless it is true, and it is labelled on the page. |
| **Submission** | What comes in through `/submit`. |
| **Subscriber** | Email, status, source, and (optionally) USDA zone — so we can eventually tell you which advice applies to you. |
| **Category** / **Region** | Taxonomy: plant types, issue tags, and hardiness regions. |

Two enums do most of the editorial work:

- **`Confidence`** — `verified` (traced to a primary source we fetched) · `reported` (stated by the
  introducer, not independently checked) · `unverified` (nobody publishes it; we will not guess) ·
  `research-required` (flagged for a human before publication).
- **`Verdict`** — `buy` → **Worth it** · `watch` → **Worth watching** · `wait` → **Wait a year** ·
  `skip` → **Skip it**.

**The editorial content lives in `src/content/*`** — plain, typed TypeScript. It is the seed for
both backends, and it is diffable in a pull request, which is the point.

---

## The editorial workflow

### Writing an issue

1. Add an `Issue` to `src/content/issues.ts` with `status: 'draft'`. Give it a number, a slug, a
   cover image key from `src/content/images.ts`, and an editor's intro.
2. Add the plants and techniques it covers to `plants.ts` / `techniques.ts`, each with the issue's
   slug in its `issueSlugs` array. A plant may appear in several issues.
3. Write the lead `Story`, then the five `discoveries`, then the Technique Lab, then the
   "Worth it?" verdict.
4. List everything still unresolved in the issue's `researchRequired` array.
5. Delete `.data/db.json` and restart, or edit through `/admin`.

### draft → scheduled → published

Every publishable entity (`Issue`, `Story`, `Plant`, `Technique`) carries a `PublishStatus`.

- **`draft`** — invisible to the public site. `getIssues()`, `getPlants()` and `getTechniques()`
  filter it out, so it cannot leak into the sitemap, the indexes, or a search engine.
- **`scheduled`** — written, dated, still not public. Also filtered. `publishDate` is set.
- **`published`** — live. It appears in the index, the sitemap and the archive.

Reading with `{ includeDrafts: true }` is how the admin sees everything; nothing on the public site
passes that flag. Issue 06 ships as `scheduled` precisely so the workflow is visible.

### "Research required before publication"

The rule: **we do not quietly fill gaps.** Where the reporting is not finished, that fact is a
first-class citizen of the data model, not a note in someone's inbox.

- On an entity, set a field's `Confidence` to `research-required` (or `unverified`) and it renders
  with a `ConfidenceTag` right where the number should be.
- On an issue, add the open question to `researchRequired: string[]`. The `<ResearchRequired />`
  component prints the whole list, in public, on the issue page.
- The full list, as it stands today, is in
  [Remaining tasks requiring human research](#remaining-tasks-requiring-human-research).

### How the scoring rubrics work

Each score is `1–5` with a written note (`ScoreLine`). The note is the content; the pips summarise
it. `PLANT_SCORE_LABELS` and `TECHNIQUE_SCORE_LABELS` in `types.ts` are the single source of truth —
the About page renders its rubric from them, so the explanation can never drift from the scoring.

**Plants** — Novelty · Practical usefulness · Climate resilience · Ease of growing · Availability ·
Value for money. Higher is better on all six.

**Techniques** — Evidence strength · Cost (5 = cheap) · Difficulty (5 = easy) · Likely benefit ·
Climate relevance · **Risk of hype (5 = worst)**. Risk of hype is the one **inverted** axis: five
pips means the marketing has outrun the evidence by the widest margin we have measured. It renders
in a different colour and is labelled as inverted everywhere it appears.

Then one of four verdicts, and — this is the part that is not optional — `howWeWouldTestIt`: the
trial, the figure, or the interview that would change our mind. A verdict without a falsifier is an
advertisement.

### Generating a newsletter from a published issue

An issue is already an email. `verdictLine` on every plant and technique exists for exactly this:
it is the sentence that goes in the newsletter. In `/admin`, open a **published** issue and use
**Generate newsletter** — it renders the editor's intro, the five discoveries with their verdict
lines, the Technique Lab, and the "Worth it?" verdict into a sendable email.

- With **no** `RESEND_API_KEY`: the email is printed to the server console. Read it, check it, and
  nothing leaves the building.
- With `RESEND_API_KEY` set: it sends to confirmed subscribers, from `RESEND_FROM`, replying to
  `RESEND_REPLY_TO`.

Drafts and scheduled issues cannot be sent. That is deliberate.

---

## Admin

- **URL:** `/admin`
- **Default development password:** `gardendrop`
- **Change it:** set `ADMIN_PASSWORD` in `.env.local`. Also set `ADMIN_SESSION_SECRET` to a random
  string — it signs the admin session cookie.

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Do not deploy with the default password. `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` are the two
variables you must set before the site is reachable from the internet.

The admin gives you CRUD over every entity, sees drafts and scheduled items, and lists incoming
subscribers, submissions and partner enquiries.

---

## Going to production

The local JSON store is **development only**. Vercel's filesystem is read-only at runtime, so
`.data/db.json` cannot be written to in production — writes would fail and any that appeared to
succeed would vanish on the next cold start. Move to Supabase before you deploy.

1. **Create a Supabase project.**
2. **Run the schema:** `supabase/migrations/0001_init.sql` (SQL editor, or `supabase db push`).
3. **Generate and load the seed:**
   ```bash
   npm run db:seed:sql     # writes supabase/seed.sql from src/content/*
   ```
   then run `supabase/seed.sql` against the project.
4. **Set the environment variables** (see the table below): `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. The moment the URL and the service
   key are both present, `src/lib/db.ts` switches backend. Nothing else in the app changes — every
   page and route talks to `db.ts` and never to a backend directly.
5. **Add Resend:** create an API key, verify your sending domain, set `RESEND_API_KEY`,
   `RESEND_FROM` and `RESEND_REPLY_TO`. Welcome emails and newsletters now actually send.
6. **Deploy to Vercel:** import the repo, paste the environment variables in, set
   `NEXT_PUBLIC_SITE_URL` to the real domain (it is what builds the sitemap, the robots file and
   every canonical URL), and ship.

---

## Environment variables

Every one of these is optional. With none of them set, the app runs.

| Variable | Required? | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical origin. Builds `sitemap.xml`, `robots.txt`, OG URLs. Defaults to `http://localhost:3000`. |
| `ADMIN_PASSWORD` | Production | Password for `/admin`. Dev default: `gardendrop`. **Change it.** |
| `ADMIN_SESSION_SECRET` | Production | Random string signing the admin session cookie. |
| `NEXT_PUBLIC_SUPABASE_URL` | Production | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production | Supabase anon key (browser-safe). |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | Server-only. Admin writes and subscriber inserts. **Never expose to the browser.** With the URL, switches the backend from JSON to Postgres. |
| `RESEND_API_KEY` | Optional | When present, email is sent instead of logged. |
| `RESEND_FROM` | With Resend | e.g. `The Garden Drop <hello@thegardendrop.com>`. |
| `RESEND_REPLY_TO` | With Resend | Where replies land. |
| `RESEND_AUDIENCE_ID` | Optional | Mirrors subscribers into a Resend audience. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Switches on Plausible. |
| `NEXT_PUBLIC_PLAUSIBLE_HOST` | Optional | Self-hosted Plausible. Defaults to `https://plausible.io`. |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | Switches on PostHog. |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | Defaults to `https://us.i.posthog.com`. |

---

## Analytics

Set **`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`** *or* **`NEXT_PUBLIC_POSTHOG_KEY`** and
`src/components/Analytics.tsx` loads that script. Set neither and `track()` is a no-op in production
and a console line in development, so you can watch the event stream while you build. Set both and
both receive events.

Six events. Do not add a seventh without a reason.

| Event | Fired when |
| --- | --- |
| `newsletter_signup` | A subscription succeeds. Carries `source` and `zone`. |
| `plant_view` | A plant page is read. |
| `technique_view` | A technique page is read. |
| `retail_link_click` | An outbound retail link is clicked. Tells us what readers actually act on. |
| `submission_complete` | A submission is accepted by `/api/submit`. Carries `subjectKind`. |
| `issue_read_depth` | Once per quartile of an issue (25/50/75/100). The only honest way to know whether an issue was read or opened. |

No cookies are set by the app itself.

---

## Photography

All editorial imagery is **hot-linked from verified free-licence sources** (Unsplash free tier —
paid Unsplash+ assets were deliberately excluded). Every entry was resolved against the source's
own API, not guessed: photo ID, CDN base URL, photographer name, public photo page, and licence
tier were each confirmed.

- **One manifest:** `src/content/images.ts`. Every image is referenced by a **key**, never a URL.
- **Credits:** `research/images-credits.md`, and each `<Figure>` prints the photographer inline.
- **Placeholder portraits** (`portrait_01`–`portrait_06`) are anonymous stock subjects. They must
  **never** be captioned as, or implied to be, a real named expert. `Expert.imageIsPlaceholder`
  exists to enforce this.

**To swap in your own shots:** replace the `url`, `alt` and `credit` fields for that key in
`src/content/images.ts` — point them at `/public` or a Supabase Storage bucket. Nothing else in the
codebase changes, because nothing else in the codebase knows a URL. Add any new hostname to
`images.remotePatterns` in `next.config.mjs`.

---

## Renaming the publication

Change `site.config.ts`.

Name, wordmark lockup, tagline, positioning, description, the three contact addresses, cadence,
calls to action, navigation, the policy strings, the newsletter copy and the Open Graph card all
read from that one file. Nothing in `src/app`, `src/components` or `src/lib` hardcodes the name.

One honest caveat: a handful of **editorial sentences inside `src/content/issues.ts`** invite readers
to write to `editorial@thegardendrop.com` — those are prose, not configuration, so a rename means a
find-and-replace across `src/content/`. That is the whole list.

---

## Remaining tasks requiring human research

This is the honest list. It is drawn from the `researchRequired` arrays in `src/content/issues.ts`,
the unverified register in `research/plants-research.md`, and the appendix of
`research/techniques-research.md`. A breeder will read this section, so it is precise.

**Nothing in this list may be published as fact until a human has resolved it.**

### Cross-cutting — corrections to errors that circulate widely

These are already-corrected mistakes. Re-introducing any of them is a regression.

- Rise Up climbing roses are **Proven Winners** (breeder Chris Warner), **not Star Roses**.
- **There is no new Knock Out family member for 2025 or 2026.** The official varieties page lists
  twelve members; none is new.
- **Bushel and Berry is a Star Roses & Plants (Ball) brand, not Proven Winners.**
- Cornell's Cordera / Pink Luster / Firecracker apples were released **2 September 2020**, not 2025.
- Sweet-Ark Immaculate is **floricane**-fruiting, not primocane.
- The **Green Thumb Awards are run by the National Garden Bureau**, not the Direct Gardening
  Association.
- There is **no new Buddleia, Weigela or Physocarpus** in Proven Winners' 2026 shrub class.
- A high-ranking Greenhouse Grower article about PanAmerican ("Pentas, Plug-and-Play, and Veggies")
  is **circa 2017, not 2026**. Its Xplant peppers and 'Polarberry' blackberry references must not be
  used as current news.

Structural sourcing weaknesses to plan around:

- **all-americaselections.org is JavaScript-gated** and cannot be fetched programmatically. Winner
  data must be cross-checked against trade press and breeder releases, or loaded in a real browser.
- The **Fleuroselect 2026-vs-2027 Gold Medal year-labelling conflict is unresolved. Call them.**
- Several publisher pages (greenhousegrower.com, lgrmag.com, gardencentermag, APS journals, ngb.org)
  returned empty bodies on fetch. Where we relied on them, it is noted inline.

### Issue 01 — *Plants You Haven't Seen Yet*

- **Encore® Azalea Autumn Kiss®**: the zone range (6a–10) is search-level only. Confirm directly
  with PDSI before printing it again.
- **Hosta RED NINJA**: US availability and distributor unconfirmed. This is a UK launch.
- **Kale 'Rubybor' F1 (Bejo)**: confirm with Bejo Seeds whether this is a newly bred F1 or an
  existing variety newly trialled, **before repeating "first in AAS history."**
- **Cultivar denomination codes are unpublished** for Kodiak Jet Black, Paraplu Pure White,
  Powerball, Perfecto Mundo Fuchsia Carpet, and all PDSI 2026 introductions. Also missing for
  Martha Stewart™, Parfuma Sunrise™, Purple Aura™, Sugar Candy Rose™, Sir David Beckham and Spring
  Sizzle.
- **Zones / size / sun / water / container** are unverified for the entire **Star Roses 2026 class**
  (their product pages returned empty on fetch), Sir David Beckham, Spring Sizzle, and most
  AAS / Fleuroselect / CAST winners.
- **Cultivate'26 Retailers' Choice winners** were announced on 13 July 2026 and are not yet
  reflected here.
- Bloom-A-Thon / ReBLOOM azalea **breeder attribution** (reportedly Bob Head) and ReBLOOM's
  0 to −10 °F hardiness claim: **search-level only, not fetched.**
- **Weeks Roses 2026 introductions** and **Sunbelt® Garden Flame®**: search-only.
- No new *Amelanchier, Aronia, Itea, Clethra, Asclepias* or *Symphyotrichum* cultivar found for
  2024–2026 on any fetched page. Treat as a negative finding, not a gap to fill.

### Issue 02 — *The Heat-Proof Garden*

- The **Utah State** figure ("40% shade cloth increased marketable yield by 50%") and the **Gent**
  tomato-cracking figures ("35% → 25–29% at 50% shade") are plausible and the underlying research is
  real, but **the primary papers were not obtained. Do not print the numbers until they are.**
- **Kaolin clay's "up to 50% sunburn reduction"** traces to Surround WP **vendor copy, not a paper.
  Do not repeat it.**
- **Heat-set tomato threshold temperatures** ("pollen non-viable above 72 °F nights",
  "heat-tolerant pollen viable to 100 °F+") circulate widely in garden media with **no traceable
  primary source.**
- **No defensible single "degrees cooler" figure exists for organic mulch.** The direction of the
  effect is well supported; the magnitude is not, and any number we chose would be cherry-picked.

### Issue 03 — *Fruit Trees, Shrunk*

- **ALL container-fruit yield figures are unverified.** Every number found ("20–50 lb/yr",
  "15–30 lb from a container peach", "45–135 lb from a dwarf peach") traces to SEO gardening sites,
  several citing a **"2023 UC ANR study" that could not be located and is believed not to exist.**
  This is the central research gap of the issue, and the issue says so in print. The absence of any
  credible extension-published container-fruit yield figure **is itself the finding.**
- **Dave Wilson Nursery / Zaiger Genetics**: no new cultivar verifiable for 2024–2026; their
  variety lists are undated. **Requires a direct interview.**
- **Big Flirt™** (University of Minnesota): zone range and mature size unpublished. SuperSnap™ is
  stated as Zone 4.
- **Burpee 'Mini-Me' watermelon**: Burpee's own "What's new for 2026" page does not list it.
  **Call Burpee before treating it as a 2026 introduction.**

### Issue 04 — *Soil Tech: What Actually Works?*

- **Charged vs uncharged biochar**: the mechanism is plausible and co-composting research exists,
  but **no controlled trial isolating the variable for garden use was found.** The charging
  protocols circulating online are vendor-authored.
- **Hydrogels / acrylamide**: Chalker-Scott's position (near-complete depolymerisation within ~5
  years; acrylamide monomer entering watersheds) is clearly stated and **must be attributed to her.**
  No recent independent risk assessment either confirming or refuting it was found. **Genuinely
  unresolved — do not present as consensus.**
- **Consumer soil-microbiome kit statistics** circulating online (a "2025 Soil Health Institute
  survey": 68% vs 22% agronomist confidence; a "2025 Earth Microbiome Project benchmarking study":
  92% genus-level concordance) **could not be verified against any primary source, and the page
  carrying them shows signs of AI generation. DO NOT PRINT.**
- **Tertill robotic weeder**: the *Weed Technology* paper is real and reports high efficacy, but the
  **"as effective as hand weeding, per Cornell"** framing is retail copy that could not be
  confirmed.
- **All hügelkultur performance numbers**: no controlled trials found. Any figure is unsupported.

### Issue 05 — *Native, But Designed*

- **Regional transferability of nativar rankings is a genuine open question.** Mt. Cuba's data are
  Mid-Atlantic; Annie White's are New England; Chicago Botanic covers the upper Midwest. This must
  be stated **wherever we cite a ranking.**
- **The nativar herbivory finding is tested for only a handful of woody genera.** Do not
  over-generalise it to herbaceous perennials without saying so.
- **Walters Gardens does not publish water needs or container suitability** for its 2026
  perennials. Those fields remain `unverified` on our plant pages and must stay that way until
  Walters publishes or answers.

### Issue 06 — *The Sterility Question* (scheduled, not yet published)

- **Spring Meadow**: request the sterility trial data for Fire Ball Seedless® — site-years, states,
  mechanism.
- **Buddleja Cascade Collection**: "no observed seed set in four years of trials" is
  **search-snippet level only. Re-fetch the primary source before print.**
- The **Extension Master Gardener analysis** questioning whether "sterile" butterfly bushes are
  environmentally safer was retrieved at snippet level only. **Obtain and read it in full.**
- **Confirm the regulatory threshold (<2% viable seed) state by state.** Oregon is the key
  jurisdiction.
- **All three CRISPR ornamental papers and both Buddleja sterility sources are search-snippet level
  only. Re-fetch before print.**

### Interviews requested but not secured

Every issue's `interview` block carries a `status`. Where it is `requested` or `research-required`,
the page publishes **the questions we intend to ask**, not invented answers. Securing these is the
single highest-value editorial task in the repository.

**The five people whose questions are currently published on the site, unanswered:**

| Issue | Person | Why them |
|---|---|---|
| 01 | **Robert “Buddy” Lee**, PDSI / Encore Azalea | He invented the reblooming azalea category. Nobody has ever published rebloom *volume* by latitude — which is the category's real credibility gap. |
| 02 | **Emmalea Ernest**, University of Delaware Extension | Her shade-cloth trials are the best heat data a home gardener has. We want to ask whether shade cloth is really just a workaround for a heat-intolerant cultivar. |
| 03 | **Dr. Margaret Worthington**, University of Arkansas | The world's leading blackberry breeder — and the right person to ask where a land-grant programme's obligation actually lies on access to genetics. |
| 04 | **Dr. Linda Chalker-Scott**, Washington State University | The 2022–2025 inoculant evidence has now vindicated her comprehensively. Has anything on the shelf changed? |
| 05 | **Sam Hoadley**, Mt. Cuba Center | His trials keep contradicting the industry. We want to ask whether the cultivar pipeline is producing better garden plants — or better-looking ones. |

**Other calls to make, flagged in the content:**

- Spring Meadow / Proven Winners — the sterility data behind Fire Ball Seedless (Issue 06).
- Walters Gardens — **the petal form of Echinacea 'Knock 'em Red'**. Our verdict is held at *Worth
  watching* purely because we could not confirm whether it is single or double, and Mt. Cuba's data
  make that the only question that matters. One email settles it.
- Bejo Seeds — is 'Rubybor' a newly bred F1, or an existing variety newly trialled? (Issue 01)
- PDSI — the Encore Autumn Kiss zone range, currently marked **unverified** on its plant page.
- Dave Wilson Nursery / Zaiger Genetics — no new cultivar verifiable 2024–2026 (Issue 03).
- Burpee — the status of 'Mini-Me' (Issue 03).
- Fleuroselect — the 2026-vs-2027 Gold Medal labelling conflict (cross-cutting).

---

## Known limitations of this mock-up

- **The photography is placeholder.** Every image is a credited, verified free-licence stock
  photograph hot-linked from a CDN. None of it was shot for this publication, none of it depicts the
  specific cultivar named beside it, and every `<Figure>` says so on the page. Commissioned
  photography is the first thing a real launch would buy.
- **The interviews were requested, not secured.** No quote in this repository is invented. Where an
  interview has not happened, we publish the questions instead of the answers — which is honest, and
  is also a gap.
- **The local JSON store is not for production.** `.data/db.json` works beautifully on your laptop
  and cannot work on Vercel, whose filesystem is read-only at runtime. Move to Supabase before you
  deploy anything that accepts a subscriber.
- **The masthead is deliberately unfilled.** There are no staff, no bios and no testimonials,
  because inventing them would break the one rule the publication is built on. The method exists
  first; the names come next, in public, with bylines.

---

© The Garden Drop. Corrections: **editorial@thegardendrop.com**.

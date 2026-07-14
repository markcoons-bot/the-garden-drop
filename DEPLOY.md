# Getting The Garden Drop onto GitHub and Vercel

The repository is already initialised and committed locally (`main`, one commit, 86 files).
What is left needs *your* credentials, so it has to run on your machine.

---

## Read this before you deploy

The app runs with zero configuration because it uses a local JSON store at `.data/db.json`.
**Vercel's filesystem is read-only and ephemeral**, which has one consequence you need to
understand before you send anyone a link:

| | Local (`npm run dev`) | Vercel, no Supabase | Vercel + Supabase |
|---|---|---|---|
| Every page renders | ✅ | ✅ | ✅ |
| Newsletter signups persist | ✅ | ❌ **lost on cold start** | ✅ |
| Breeder submissions persist | ✅ | ❌ **lost on cold start** | ✅ |
| Admin edits persist | ✅ | ❌ | ✅ |
| Welcome emails actually send | printed to terminal | ❌ (needs Resend) | ✅ with Resend |

The site will *look* completely finished either way — all six issues, all 21 plants, all 13
techniques are seeded from source and render perfectly. But the forms would quietly accept a
submission and drop it. For a link you send your brother, that is fine. **For a link you send a
breeder, do Supabase first** — a publication whose entire pitch is honesty should not run a form
that lies.

Supabase is about twenty minutes. Both paths are below.

---

## Path A — GitHub + Vercel now (visual demo)

### 1. Create the GitHub repo

If you have the GitHub CLI (`brew install gh`, then `gh auth login`):

```bash
cd ~/garden
gh repo create the-garden-drop --private --source=. --remote=origin --push
```

Without the CLI: create an empty private repo at github.com/new (no README, no .gitignore), then:

```bash
cd ~/garden
git remote add origin https://github.com/YOUR-USERNAME/the-garden-drop.git
git push -u origin main
```

Optional housekeeping first — a mounted-filesystem quirk left some temp files in `.git`:

```bash
cd ~/garden && git gc --prune=now
```

### 2. Deploy to Vercel

Easiest is the dashboard: vercel.com → **Add New → Project** → import the repo. Vercel detects
Next.js and needs no build configuration at all. Click Deploy.

Or from the terminal (`npm i -g vercel`):

```bash
cd ~/garden
vercel        # preview deploy
vercel --prod # production
```

### 3. Set one environment variable

In the Vercel project → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
ADMIN_PASSWORD       = something-that-is-not-gardendrop
ADMIN_SESSION_SECRET = <run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
```

Redeploy. Done — the site is live.

**Keep it out of Google while it is a mock-up.** Either set the Vercel project to
password-protected (Settings → Deployment Protection, Pro plan), or edit `src/app/robots.ts` to
`disallow: '/'` until launch. Ask me and I will wire a `NEXT_PUBLIC_NOINDEX` switch so you can flip
it from the dashboard.

---

## Path B — Supabase first (forms actually work)

Do this if a breeder, or anyone whose email you want to keep, might touch the site.

### 1. Create the project

supabase.com → New project. Note the database password. Wait for it to provision.

### 2. Run the schema

Supabase dashboard → **SQL Editor** → New query. Paste the entire contents of:

```
supabase/migrations/0001_init.sql
```

Run it. This creates every table, the two join tables (`issue_plants`, `issue_techniques` — because
plants and techniques appear in multiple issues), the indexes, and row-level security: anonymous
visitors can read only `status = 'published'` rows, and can insert into `subscribers`, `submissions`
and `partner_enquiries` without being able to read them back.

### 3. Load the content

New query. Paste the entire contents of:

```
supabase/seed.sql
```

That file is generated from `src/content/*` — 227 rows across nine tables. It uses
`ON CONFLICT (id) DO UPDATE`, so it is safe to run again after you edit content. To regenerate it
after an edit:

```bash
npm run db:seed:sql
```

### 4. Wire the keys

Supabase → Project Settings → API. Add to Vercel's environment variables:

```
NEXT_PUBLIC_SUPABASE_URL      = https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
SUPABASE_SERVICE_ROLE_KEY     = eyJ...   ← server-only. Never expose this.
```

The moment `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are both present,
`src/lib/db.ts` switches backends automatically. No code changes. The admin sidebar will show
**Supabase** instead of **Local JSON store**, which is how you know it took.

### 5. Email (optional, five minutes)

resend.com → API Keys. Add a domain, or use their test domain to start:

```
RESEND_API_KEY = re_...
RESEND_FROM    = The Garden Drop <hello@yourdomain.com>
```

Without this key, welcome emails are printed to the server log instead of sent — which is a
deliberate design choice, not a gap, and it means nothing breaks if you forget.

To send an actual issue: `/admin/newsletter` → pick the issue → copy the HTML → paste into a Resend
Broadcast. The app deliberately does **not** do bulk sending; Resend does that better and you should
not be building a mail server.

---

## If you would rather hand this to Claude Code in the terminal

Everything above is one prompt. From `~/garden`:

```
claude "Push this repo to a new private GitHub repo called the-garden-drop, then deploy it
to Vercel. Read DEPLOY.md first — note the warning about the local JSON store being read-only
on Vercel. Set NEXT_PUBLIC_SITE_URL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET as env vars.
Do not commit any secrets."
```

Claude Code has access to your authenticated `gh` and `vercel` CLIs, which I do not — that is the
only reason this is not already done.

---

## What is already true

- Repository initialised, `main` branch, one clean commit.
- `.gitignore` covers `node_modules`, `.next`, `.data`, and every `.env` variant. Nothing secret is
  tracked — verified.
- `next build` is green: 53 routes, TypeScript strict, no warnings.
- `.env.example` documents every variable, and the app runs with none of them set.

/**
 * THE DATA LAYER
 *
 * One interface, two backends:
 *
 *   • no env vars set  → local JSON store (.data/db.json). Zero config.
 *   • Supabase env set → Supabase Postgres.
 *
 * Every page and API route talks to this module and never to a backend
 * directly, so switching is a matter of adding two environment variables.
 */

import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { readDb, mutate } from './store';
import type {
  Database,
  Expert,
  Issue,
  PartnerEnquiry,
  Plant,
  Story,
  Subscriber,
  Submission,
  Technique,
} from './types';

// ---------------------------------------------------------------------------
// Backend selection
// ---------------------------------------------------------------------------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export const backend: 'supabase' | 'local' =
  SUPABASE_URL && SERVICE_KEY ? 'supabase' : 'local';

let sb: SupabaseClient | null = null;
function supabase(): SupabaseClient {
  if (!sb) {
    sb = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false },
    });
  }
  return sb;
}

/**
 * Content tables store their queryable fields as real columns AND the full
 * typed entity in a `data` jsonb column. Reads hydrate from `data`; the
 * columns exist so that SQL, RLS policies and the Supabase table editor all
 * work the way you would expect. See supabase/migrations/0001_init.sql.
 */
type TableName = keyof Database;

const TABLE_SQL: Record<TableName, string> = {
  issues: 'issues',
  stories: 'stories',
  plants: 'plants',
  techniques: 'techniques',
  experts: 'experts',
  sources: 'sources',
  retailLinks: 'retail_links',
  subscribers: 'subscribers',
  submissions: 'submissions',
  partnerEnquiries: 'partner_enquiries',
  categories: 'categories',
  regions: 'regions',
};

// ---------------------------------------------------------------------------
// Generic access
// ---------------------------------------------------------------------------

export async function list<K extends TableName>(table: K): Promise<Database[K]> {
  if (backend === 'local') return readDb()[table];

  const { data, error } = await supabase().from(TABLE_SQL[table]).select('data');
  if (error) throw new Error(`[db] list ${table}: ${error.message}`);
  return (data ?? []).map((r) => (r as { data: unknown }).data) as Database[K];
}

export async function insert<K extends TableName>(
  table: K,
  row: Database[K][number],
): Promise<Database[K][number]> {
  if (backend === 'local') {
    return mutate((db) => {
      (db[table] as unknown[]).unshift(row);
      return row;
    });
  }
  const r = row as unknown as Record<string, unknown>;
  const { error } = await supabase()
    .from(TABLE_SQL[table])
    .insert({ id: r.id, slug: r.slug ?? null, status: r.status ?? null, data: row });
  if (error) throw new Error(`[db] insert ${table}: ${error.message}`);
  return row;
}

export async function update<K extends TableName>(
  table: K,
  id: string,
  patch: Partial<Database[K][number]>,
): Promise<Database[K][number] | null> {
  if (backend === 'local') {
    return mutate((db) => {
      const rows = db[table] as unknown as Array<Record<string, unknown>>;
      const i = rows.findIndex((r) => r.id === id);
      if (i === -1) return null;
      rows[i] = { ...rows[i], ...(patch as object), updatedAt: new Date().toISOString() };
      return rows[i] as unknown as Database[K][number];
    });
  }
  const { data: existing, error: readErr } = await supabase()
    .from(TABLE_SQL[table])
    .select('data')
    .eq('id', id)
    .single();
  if (readErr) throw new Error(`[db] update(read) ${table}: ${readErr.message}`);

  const merged = {
    ...(existing?.data as object),
    ...(patch as object),
    updatedAt: new Date().toISOString(),
  } as unknown as Database[K][number];
  const m = merged as unknown as Record<string, unknown>;

  const { error } = await supabase()
    .from(TABLE_SQL[table])
    .update({ status: m.status ?? null, slug: m.slug ?? null, data: merged })
    .eq('id', id);
  if (error) throw new Error(`[db] update ${table}: ${error.message}`);
  return merged;
}

export async function remove<K extends TableName>(table: K, id: string): Promise<void> {
  if (backend === 'local') {
    mutate((db) => {
      const rows = db[table] as unknown as Array<Record<string, unknown>>;
      const i = rows.findIndex((r) => r.id === id);
      if (i > -1) rows.splice(i, 1);
    });
    return;
  }
  const { error } = await supabase().from(TABLE_SQL[table]).delete().eq('id', id);
  if (error) throw new Error(`[db] remove ${table}: ${error.message}`);
}

// ---------------------------------------------------------------------------
// Convenience readers used by the public site
// ---------------------------------------------------------------------------

const isLive = (s: { status: string }) => s.status === 'published';

export async function getIssues({ includeDrafts = false } = {}): Promise<Issue[]> {
  const issues = await list('issues');
  return issues
    .filter((i) => includeDrafts || isLive(i))
    .sort((a, b) => b.number - a.number);
}

export async function getIssue(slug: string, { includeDrafts = false } = {}) {
  const issues = await list('issues');
  const issue = issues.find((i) => i.slug === slug);
  if (!issue) return null;
  if (!includeDrafts && !isLive(issue)) return null;
  return issue;
}

export async function getCurrentIssue(): Promise<Issue | null> {
  const issues = await getIssues();
  return issues[0] ?? null;
}

export async function getStories(issueSlug?: string): Promise<Story[]> {
  const stories = await list('stories');
  return issueSlug ? stories.filter((s) => s.issueSlug === issueSlug) : stories;
}

export async function getStory(slug: string): Promise<Story | null> {
  const stories = await list('stories');
  return stories.find((s) => s.slug === slug) ?? null;
}

export async function getPlants({ includeDrafts = false } = {}): Promise<Plant[]> {
  const plants = await list('plants');
  return plants
    .filter((p) => includeDrafts || isLive(p))
    .sort((a, b) => b.releaseYear - a.releaseYear || a.commonName.localeCompare(b.commonName));
}

export async function getPlant(slug: string, { includeDrafts = false } = {}) {
  const plants = await list('plants');
  const plant = plants.find((p) => p.slug === slug);
  if (!plant) return null;
  if (!includeDrafts && !isLive(plant)) return null;
  return plant;
}

export async function getTechniques({ includeDrafts = false } = {}): Promise<Technique[]> {
  const techniques = await list('techniques');
  return techniques
    .filter((t) => includeDrafts || isLive(t))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getTechnique(slug: string, { includeDrafts = false } = {}) {
  const techniques = await list('techniques');
  const t = techniques.find((x) => x.slug === slug);
  if (!t) return null;
  if (!includeDrafts && !isLive(t)) return null;
  return t;
}

export async function getExperts(): Promise<Expert[]> {
  return list('experts');
}

export async function getExpert(slug: string): Promise<Expert | null> {
  const experts = await list('experts');
  return experts.find((e) => e.slug === slug) ?? null;
}

/** Plants and techniques may appear in multiple issues — resolve both ways. */
export async function getIssuePlants(issueSlug: string): Promise<Plant[]> {
  const plants = await getPlants();
  return plants.filter((p) => p.issueSlugs.includes(issueSlug));
}

export async function getIssuesForPlant(slug: string): Promise<Issue[]> {
  const [plant, issues] = await Promise.all([getPlant(slug), getIssues()]);
  if (!plant) return [];
  return issues.filter((i) => plant.issueSlugs.includes(i.slug));
}

export async function getIssuesForTechnique(slug: string): Promise<Issue[]> {
  const [t, issues] = await Promise.all([getTechnique(slug), getIssues()]);
  if (!t) return [];
  return issues.filter((i) => t.issueSlugs.includes(i.slug));
}

// ---------------------------------------------------------------------------
// Audience writes
// ---------------------------------------------------------------------------

export async function addSubscriber(
  email: string,
  source: string,
  zone?: string,
): Promise<{ subscriber: Subscriber; alreadyExisted: boolean }> {
  const existing = (await list('subscribers')).find(
    (s) => s.email.toLowerCase() === email.toLowerCase(),
  );
  if (existing) return { subscriber: existing, alreadyExisted: true };

  const subscriber: Subscriber = {
    id: cryptoId(),
    email: email.toLowerCase().trim(),
    status: 'confirmed', // single opt-in; switch to 'pending' to add a confirm step
    source,
    zone,
    createdAt: new Date().toISOString(),
  };
  await insert('subscribers', subscriber);
  return { subscriber, alreadyExisted: false };
}

export async function addSubmission(
  input: Omit<Submission, 'id' | 'status' | 'createdAt'>,
): Promise<Submission> {
  const submission: Submission = {
    ...input,
    id: cryptoId(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  await insert('submissions', submission);
  return submission;
}

export async function addPartnerEnquiry(
  input: Omit<PartnerEnquiry, 'id' | 'status' | 'createdAt'>,
): Promise<PartnerEnquiry> {
  const enquiry: PartnerEnquiry = {
    ...input,
    id: cryptoId(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  await insert('partnerEnquiries', enquiry);
  return enquiry;
}

export function cryptoId(): string {
  return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 12);
}

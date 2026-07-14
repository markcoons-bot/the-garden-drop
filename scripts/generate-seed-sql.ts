/**
 * GENERATE supabase/seed.sql
 *
 *   npm run db:seed:sql        (→ tsx scripts/generate-seed-sql.ts)
 *
 * src/content/* is the single source of truth for editorial content. This
 * script reads it through the exact same buildSeedDatabase() the local JSON
 * store uses, and emits SQL that loads it into the schema created by
 * supabase/migrations/0001_init.sql.
 *
 * Every statement is an upsert — `on conflict (id) do update` — so running the
 * seed against a live database refreshes the content and leaves subscribers,
 * submissions and partner enquiries untouched. It is safe to run it whenever
 * you have edited a plant.
 *
 * Usage:
 *   npm run db:seed:sql
 *   psql "$SUPABASE_DB_URL" -f supabase/migrations/0001_init.sql
 *   psql "$SUPABASE_DB_URL" -f supabase/seed.sql
 */

import fs from 'node:fs';
import path from 'node:path';
import { buildSeedDatabase } from '../src/content/seed';
import type { Database } from '../src/lib/types';

// ---------------------------------------------------------------------------
// SQL literals
// ---------------------------------------------------------------------------

/**
 * A single-quoted SQL string. standard_conforming_strings is on by default in
 * every Postgres since 9.1, so a backslash is just a backslash and doubling the
 * quote is the whole of the escaping rule.
 */
function q(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function qOrNull(value: unknown): string {
  return typeof value === 'string' && value.length > 0 ? q(value) : 'null';
}

/** The record itself, as a jsonb literal. */
function jsonb(value: unknown): string {
  return `${q(JSON.stringify(value))}::jsonb`;
}

// ---------------------------------------------------------------------------
// Table emitters
// ---------------------------------------------------------------------------

/** Database key → Postgres table. Must agree with TABLE_SQL in src/lib/db.ts. */
const TABLE_SQL: Record<keyof Database, string> = {
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

/** Content tables, in dependency order. Audience tables are never seeded. */
const CONTENT_TABLES: (keyof Database)[] = [
  'issues',
  'stories',
  'plants',
  'techniques',
  'experts',
  'sources',
  'retailLinks',
  'categories',
  'regions',
];

function upserts(table: keyof Database, rows: unknown[]): string {
  const sqlTable = TABLE_SQL[table];
  if (rows.length === 0) {
    return `-- ${sqlTable}: nothing to seed.\n`;
  }

  const values = rows
    .map((row) => {
      const r = row as Record<string, unknown>;
      return `  (${q(String(r.id))}, ${qOrNull(r.slug)}, ${qOrNull(r.status)}, ${jsonb(row)}, now())`;
    })
    .join(',\n');

  return [
    `-- ${sqlTable} — ${rows.length} row${rows.length === 1 ? '' : 's'}`,
    `insert into public.${sqlTable} (id, slug, status, data, updated_at) values`,
    values,
    'on conflict (id) do update set',
    '  slug       = excluded.slug,',
    '  status     = excluded.status,',
    '  data       = excluded.data,',
    '  updated_at = now();',
    '',
  ].join('\n');
}

/**
 * The join tables. issueSlugs on a plant or a technique is the authoritative
 * copy — these tables are derived from it, which is why we rebuild them from
 * scratch every time rather than trying to reconcile.
 */
function joinTables(db: Database): string {
  const issueSlugs = new Set(db.issues.map((i) => i.slug));

  const plantPairs: [string, string][] = [];
  for (const plant of db.plants) {
    for (const issueSlug of plant.issueSlugs) {
      if (issueSlugs.has(issueSlug)) plantPairs.push([issueSlug, plant.slug]);
    }
  }

  const techniquePairs: [string, string][] = [];
  for (const technique of db.techniques) {
    for (const issueSlug of technique.issueSlugs) {
      if (issueSlugs.has(issueSlug)) techniquePairs.push([issueSlug, technique.slug]);
    }
  }

  const out: string[] = [
    '-- ---------------------------------------------------------------------',
    '-- Join tables. Derived from data->issueSlugs; rebuilt, not merged.',
    '-- ---------------------------------------------------------------------',
    '',
    'delete from public.issue_plants;',
    'delete from public.issue_techniques;',
    '',
  ];

  if (plantPairs.length) {
    out.push(
      `-- issue_plants — ${plantPairs.length} rows`,
      'insert into public.issue_plants (issue_slug, plant_slug) values',
      plantPairs.map(([i, p]) => `  (${q(i)}, ${q(p)})`).join(',\n'),
      'on conflict (issue_slug, plant_slug) do nothing;',
      '',
    );
  } else {
    out.push('-- issue_plants: nothing to seed.', '');
  }

  if (techniquePairs.length) {
    out.push(
      `-- issue_techniques — ${techniquePairs.length} rows`,
      'insert into public.issue_techniques (issue_slug, technique_slug) values',
      techniquePairs.map(([i, t]) => `  (${q(i)}, ${q(t)})`).join(',\n'),
      'on conflict (issue_slug, technique_slug) do nothing;',
      '',
    );
  } else {
    out.push('-- issue_techniques: nothing to seed.', '');
  }

  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const db = buildSeedDatabase();

  const counts = CONTENT_TABLES.map(
    (table) => `--   ${TABLE_SQL[table].padEnd(18)} ${(db[table] as unknown[]).length}`,
  ).join('\n');

  const header = [
    '-- ===========================================================================',
    '-- THE GARDEN DROP — seed data',
    '--',
    '-- GENERATED FILE. Do not edit by hand.',
    '--   source: src/content/*  →  src/content/seed.ts',
    '--   script: scripts/generate-seed-sql.ts   (npm run db:seed:sql)',
    `--   built:  ${new Date().toISOString()}`,
    '--',
    counts,
    '--',
    '-- Every statement is an upsert. Re-running this refreshes editorial content',
    '-- and does not touch subscribers, submissions or partner enquiries.',
    '--',
    '-- Requires supabase/migrations/0001_init.sql to have been applied first.',
    '-- ===========================================================================',
    '',
    'begin;',
    '',
  ].join('\n');

  const body = CONTENT_TABLES.map((table) =>
    upserts(table, db[table] as unknown[]),
  ).join('\n');

  const footer = ['', 'commit;', ''].join('\n');

  const sql = [header, body, joinTables(db), footer].join('\n');

  const outPath = path.join(process.cwd(), 'supabase', 'seed.sql');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, sql, 'utf8');

  const rowCount = CONTENT_TABLES.reduce(
    (total, table) => total + (db[table] as unknown[]).length,
    0,
  );
  console.info(
    `Wrote ${path.relative(process.cwd(), outPath)} — ${rowCount} content rows across ${CONTENT_TABLES.length} tables.`,
  );
}

main();

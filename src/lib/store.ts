/**
 * ZERO-CONFIG LOCAL STORE (development / mock-up mode)
 *
 * If no Supabase credentials are present, the whole application runs off a
 * single JSON file at .data/db.json, seeded on first read from src/content/*.
 * That means `npm install && npm run dev` gives you a fully working site —
 * including admin CRUD, subscribers and submissions — with no accounts, no
 * containers and no migrations.
 *
 * It is deliberately dumb: read file, mutate, write file. It is not for
 * production (Vercel's filesystem is read-only and ephemeral). The moment you
 * add NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, the Supabase
 * adapter takes over and this file is never touched again.
 */

import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { Database } from './types';
import { buildSeedDatabase } from '@/content/seed';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

let cache: Database | null = null;

function writeDb(db: Database): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  cache = db;
}

export function readDb(): Database {
  if (cache) return cache;

  if (fs.existsSync(DB_PATH)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) as Database;
      // Editorial content is re-seeded from source on every boot so that edits
      // to src/content/* show up immediately; audience data is preserved.
      const seed = buildSeedDatabase();
      const merged: Database = {
        ...seed,
        subscribers: parsed.subscribers ?? [],
        submissions: parsed.submissions ?? [],
        partnerEnquiries: parsed.partnerEnquiries ?? [],
        // Admin edits made in local mode live in db.json and win over the seed.
        issues: parsed.issues?.length ? parsed.issues : seed.issues,
        plants: parsed.plants?.length ? parsed.plants : seed.plants,
        techniques: parsed.techniques?.length ? parsed.techniques : seed.techniques,
      };
      cache = merged;
      return merged;
    } catch {
      // Corrupted file — fall through and re-seed.
    }
  }

  const seed = buildSeedDatabase();
  try {
    writeDb(seed);
  } catch {
    // Read-only filesystem (e.g. a preview deploy without Supabase).
    // Serve the seed from memory instead of crashing.
    cache = seed;
  }
  return seed;
}

export function mutate<T>(fn: (db: Database) => T): T {
  const db = readDb();
  const result = fn(db);
  try {
    writeDb(db);
  } catch {
    cache = db; // in-memory only
  }
  return result;
}

/** Force a re-seed. Used by the admin "reset demo data" action. */
export function resetDb(): Database {
  const seed = buildSeedDatabase();
  try {
    writeDb(seed);
  } catch {
    cache = seed;
  }
  return seed;
}

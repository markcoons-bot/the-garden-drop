/**
 * /api/admin/[entity]
 *
 *   GET   → list every row
 *   POST  → insert one row
 *
 * `entity` is never used as a table name until it has come back out of the
 * allowlist in src/lib/entities.ts. An unknown segment is a 404 and nothing
 * touches the database.
 */

import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { cryptoId, insert, list } from '@/lib/db';
import { resolveEntity, type EntityRow } from '@/lib/entities';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ entity: string }> };

const unauthorised = () =>
  NextResponse.json({ ok: false, message: 'Not signed in.' }, { status: 401 });

const unknownEntity = (segment: string) =>
  NextResponse.json(
    { ok: false, message: `There is no “${segment}” in this admin.` },
    { status: 404 },
  );

export async function GET(_request: Request, { params }: Params): Promise<NextResponse> {
  if (!(await isAuthed())) return unauthorised();

  const { entity: segment } = await params;
  const entity = resolveEntity(segment);
  if (!entity) return unknownEntity(segment);

  const rows = await list(entity.key);
  return NextResponse.json({ ok: true, entity: entity.key, count: rows.length, rows });
}

export async function POST(request: Request, { params }: Params): Promise<NextResponse> {
  if (!(await isAuthed())) return unauthorised();

  const { entity: segment } = await params;
  const entity = resolveEntity(segment);
  if (!entity) return unknownEntity(segment);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'That was not valid JSON.' },
      { status: 400 },
    );
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return NextResponse.json(
      { ok: false, message: 'A record must be a JSON object.' },
      { status: 400 },
    );
  }

  const draft = payload as Record<string, unknown>;
  const row = {
    ...draft,
    id: typeof draft.id === 'string' && draft.id ? draft.id : cryptoId(),
    updatedAt: new Date().toISOString(),
  } as EntityRow;

  try {
    const saved = await insert(entity.key, row);
    return NextResponse.json({ ok: true, row: saved }, { status: 201 });
  } catch (error) {
    console.error(`[admin] insert ${entity.key}`, error);
    const message = error instanceof Error ? error.message : 'The write failed.';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

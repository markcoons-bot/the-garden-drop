/**
 * /api/admin/[entity]/[id]
 *
 *   GET    → one row
 *   PATCH  → merge a partial record over it (db.update stamps updatedAt)
 *   DELETE → remove it
 *
 * Same allowlist as the collection route. Same rule: the segment is validated
 * before it is ever used as a table name.
 */

import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { list, remove, update } from '@/lib/db';
import { resolveEntity, type EntityRow } from '@/lib/entities';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ entity: string; id: string }> };

const unauthorised = () =>
  NextResponse.json({ ok: false, message: 'Not signed in.' }, { status: 401 });

export async function GET(_request: Request, { params }: Params): Promise<NextResponse> {
  if (!(await isAuthed())) return unauthorised();

  const { entity: segment, id } = await params;
  const entity = resolveEntity(segment);
  if (!entity) {
    return NextResponse.json(
      { ok: false, message: `There is no “${segment}” in this admin.` },
      { status: 404 },
    );
  }

  const rows = (await list(entity.key)) as EntityRow[];
  const row = rows.find((r) => r.id === id);
  if (!row) {
    return NextResponse.json({ ok: false, message: 'No record with that id.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, row });
}

export async function PATCH(request: Request, { params }: Params): Promise<NextResponse> {
  if (!(await isAuthed())) return unauthorised();

  const { entity: segment, id } = await params;
  const entity = resolveEntity(segment);
  if (!entity) {
    return NextResponse.json(
      { ok: false, message: `There is no “${segment}” in this admin.` },
      { status: 404 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'That was not valid JSON.' }, { status: 400 });
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return NextResponse.json(
      { ok: false, message: 'A record must be a JSON object.' },
      { status: 400 },
    );
  }

  // The id in the URL wins. A record cannot rename itself out from under us.
  const patch = { ...(payload as Record<string, unknown>), id } as Partial<EntityRow>;

  try {
    const saved = await update(entity.key, id, patch);
    if (!saved) {
      return NextResponse.json({ ok: false, message: 'No record with that id.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, row: saved });
  } catch (error) {
    console.error(`[admin] update ${entity.key}/${id}`, error);
    const message = error instanceof Error ? error.message : 'The write failed.';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params): Promise<NextResponse> {
  if (!(await isAuthed())) return unauthorised();

  const { entity: segment, id } = await params;
  const entity = resolveEntity(segment);
  if (!entity) {
    return NextResponse.json(
      { ok: false, message: `There is no “${segment}” in this admin.` },
      { status: 404 },
    );
  }

  try {
    await remove(entity.key, id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`[admin] delete ${entity.key}/${id}`, error);
    const message = error instanceof Error ? error.message : 'The delete failed.';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

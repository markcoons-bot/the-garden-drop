/**
 * POST /api/admin/reset
 *
 * Throws away .data/db.json and re-seeds from src/content/*. Local only — on
 * Supabase this would be a destructive DROP-and-reload of a real database, and
 * that is a thing you do from psql with your eyes open, not from a web button.
 */

import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/auth';
import { backend } from '@/lib/db';
import { resetDb } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(): Promise<NextResponse> {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, message: 'Not signed in.' }, { status: 401 });
  }

  if (backend === 'supabase') {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Reset is disabled on Supabase. This button re-seeds the local JSON store; against a real database it would delete production content. Re-run supabase/seed.sql from psql if that is genuinely what you want.',
      },
      { status: 400 },
    );
  }

  const db = resetDb();
  return NextResponse.json({
    ok: true,
    message: `Re-seeded from src/content — ${db.issues.length} issues, ${db.plants.length} plants, ${db.techniques.length} techniques. Subscribers, submissions and partner enquiries were cleared with them.`,
  });
}

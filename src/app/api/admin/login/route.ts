/**
 * POST /api/admin/login  { password }
 *
 * One password, one signed cookie. The ~400ms delay on failure is not security
 * theatre: it caps an online guessing attack at a couple of attempts a second
 * without a rate-limit store, and it costs a legitimate typo nothing anyone
 * notices.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession, verifyPassword } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  password: z.string().min(1, 'Enter the password.'),
});

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'We could not read that request.' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    await sleep(400);
    return NextResponse.json(
      { ok: false, message: 'Enter the password to continue.' },
      { status: 401 },
    );
  }

  if (!verifyPassword(parsed.data.password)) {
    await sleep(400);
    return NextResponse.json(
      { ok: false, message: 'That password is not right. Try again.' },
      { status: 401 },
    );
  }

  await createSession();
  return NextResponse.json({ ok: true });
}

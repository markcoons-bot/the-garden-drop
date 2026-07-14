/**
 * POST /api/subscribe
 *
 * Single opt-in. The welcome email goes out on first signup only.
 *
 * Two things worth knowing about this handler:
 *
 *   1. The honeypot is checked BEFORE zod runs. `company_website` is typed as
 *      `max(0)`, so a bot that fills it would otherwise get a 400 and learn it
 *      had been caught. We return a cheerful 200 and write nothing.
 *   2. We never tell the caller whether the address was already on the list in
 *      a way that could be used to enumerate subscribers. "You are already on
 *      the list" is friendly, and it is the same answer we would give a person
 *      who genuinely forgot — but it is deliberately the only thing we say.
 */

import { NextResponse } from 'next/server';
import { subscribeSchema, fieldErrors } from '@/lib/validation';
import { addSubscriber } from '@/lib/db';
import { sendEmail, welcomeEmail } from '@/lib/email';
import siteConfig from '~/site.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALREADY = 'You are already on the list. The next issue is on its way.';

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _: 'We could not read that request.' } },
      { status: 400 },
    );
  }

  // Honeypot first — a filled field means a bot, and a bot gets a warm 200.
  const raw = payload as Record<string, unknown>;
  if (typeof raw?.company_website === 'string' && raw.company_website.trim() !== '') {
    return NextResponse.json({ ok: true, message: siteConfig.newsletter.confirmation });
  }

  const parsed = subscribeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const { email, zone, source } = parsed.data;

  try {
    const { subscriber, alreadyExisted } = await addSubscriber(
      email,
      source || 'site',
      zone ? zone : undefined,
    );

    if (alreadyExisted) {
      return NextResponse.json({ ok: true, message: ALREADY });
    }

    // A failed welcome email must not fail the signup. They are on the list.
    const mail = welcomeEmail(subscriber);
    const result = await sendEmail({ to: subscriber.email, ...mail });
    if (!result.ok) {
      console.error('[subscribe] welcome email failed:', result.error);
    }

    return NextResponse.json({ ok: true, message: siteConfig.newsletter.confirmation });
  } catch (error) {
    console.error('[subscribe]', error);
    return NextResponse.json(
      {
        ok: false,
        errors: {
          _: 'Something went wrong at our end, not yours. Try again in a moment.',
        },
      },
      { status: 500 },
    );
  }
}

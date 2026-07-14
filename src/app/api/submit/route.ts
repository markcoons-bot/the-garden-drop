/**
 * POST /api/submit
 *
 * "Tell us about something new." Breeders, nurseries, trial gardens and
 * readers. Everything that arrives here is a lead, not a fact — the record is
 * written with status 'new' and a human reads it before anything is printed.
 */

import { NextResponse } from 'next/server';
import { submissionSchema, fieldErrors } from '@/lib/validation';
import { addSubmission } from '@/lib/db';
import { sendEmail, submissionAckEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONFIRMATION =
  'Thank you — it is in the queue. A human reads every submission, and we will write back if we need a source for anything you have claimed.';

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

  const raw = payload as Record<string, unknown>;
  if (typeof raw?.company_website === 'string' && raw.company_website.trim() !== '') {
    return NextResponse.json({ ok: true, message: CONFIRMATION });
  }

  const parsed = submissionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const d = parsed.data;

  try {
    const submission = await addSubmission({
      submitterName: d.submitterName,
      email: d.email,
      company: d.company || undefined,
      subjectName: d.subjectName,
      subjectKind: d.subjectKind,
      description: d.description,
      releaseDate: d.releaseDate || undefined,
      links: d.links || undefined,
      imageUrl: d.imageUrl || undefined,
      retailAvailability: d.retailAvailability || undefined,
    });

    const mail = submissionAckEmail({
      submitterName: submission.submitterName,
      subjectName: submission.subjectName,
    });
    const result = await sendEmail({ to: submission.email, ...mail });
    if (!result.ok) {
      console.error('[submit] acknowledgement email failed:', result.error);
    }

    return NextResponse.json({ ok: true, message: CONFIRMATION });
  } catch (error) {
    console.error('[submit]', error);
    return NextResponse.json(
      {
        ok: false,
        errors: { _: 'Something went wrong at our end, not yours. Try again in a moment.' },
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/partner
 *
 * Sponsorship, sampling and trial enquiries. No auto-reply: a commercial
 * conversation deserves a person, and an automated "thanks for your interest"
 * would be the first thing we ever sent that meant nothing.
 */

import { NextResponse } from 'next/server';
import { partnerSchema, fieldErrors } from '@/lib/validation';
import { addPartnerEnquiry } from '@/lib/db';
import siteConfig from '~/site.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONFIRMATION = `Thank you — this is with the editors. We reply to every serious enquiry, usually within a week. If it is urgent, write to ${siteConfig.email.partners}.`;

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

  const parsed = partnerSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const { name, email, company, interest, message } = parsed.data;

  try {
    await addPartnerEnquiry({ name, email, company, interest, message });
    return NextResponse.json({ ok: true, message: CONFIRMATION });
  } catch (error) {
    console.error('[partner]', error);
    return NextResponse.json(
      {
        ok: false,
        errors: { _: 'Something went wrong at our end, not yours. Try again in a moment.' },
      },
      { status: 500 },
    );
  }
}

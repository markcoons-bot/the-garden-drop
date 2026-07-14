/**
 * POST /api/admin/newsletter/test  { issueSlug, email }
 *
 * Sends ONE copy of an issue email to ONE address, so an editor can open it in
 * the client they actually care about before it goes anywhere near the list.
 *
 * This is not a broadcast endpoint and it will not become one. Bulk sending
 * belongs in Resend Broadcasts, which handles suppression, unsubscribe headers,
 * bounce processing and per-recipient merge tags — none of which we are going
 * to reimplement badly in a route handler.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isAuthed } from '@/lib/auth';
import { getIssue, getStory, getPlants, getTechniques } from '@/lib/db';
import { issueEmail, mailer, sendEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  issueSlug: z.string().trim().min(1, 'Choose an issue.'),
  email: z.string().trim().email('That does not look like an email address.'),
});

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, message: 'Not signed in.' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'We could not read that request.' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? 'Check the form.' },
      { status: 400 },
    );
  }

  const { issueSlug, email } = parsed.data;

  // Drafts included: sending yourself a test of an unpublished issue is the
  // entire point of a test send.
  const issue = await getIssue(issueSlug, { includeDrafts: true });
  if (!issue) {
    return NextResponse.json({ ok: false, message: 'No issue with that slug.' }, { status: 404 });
  }

  const [plants, techniques, story] = await Promise.all([
    getPlants({ includeDrafts: true }),
    getTechniques({ includeDrafts: true }),
    getStory(issue.leadStorySlug),
  ]);

  const mail = issueEmail(issue, { plants, techniques, story: story ?? undefined });
  const result = await sendEmail({
    to: email,
    subject: `[TEST] ${mail.subject}`,
    html: mail.html,
    text: mail.text,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.error ?? 'Resend rejected the message.' },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: result.delivered,
    message: result.delivered
      ? `Sent to ${email}. Open it in Outlook before you trust it.`
      : `No RESEND_API_KEY is set, so nothing was sent — the whole email was printed to your terminal instead. Set RESEND_API_KEY to post it to ${email} for real.`,
    mailer,
  });
}

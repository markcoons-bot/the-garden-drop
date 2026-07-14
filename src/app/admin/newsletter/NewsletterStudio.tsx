'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface IssueOption {
  slug: string;
  label: string;
  status: string;
}

export interface NewsletterStudioProps {
  published: IssueOption[];
  unpublished: IssueOption[];
  selected: string;
  subject: string;
  html: string;
  text: string;
  /** 'resend' when RESEND_API_KEY is set; 'console' otherwise. */
  mailer: 'resend' | 'console';
}

export function NewsletterStudio(props: NewsletterStudioProps) {
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(props.html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  async function onTest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/newsletter/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issueSlug: props.selected, email }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      setResult({
        ok: data.ok,
        message: data.message ?? (data.ok ? 'Sent.' : 'The send failed.'),
      });
    } catch {
      setResult({ ok: false, message: 'We could not reach the server.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Issue picker ------------------------------------------------------ */}
      <div className="flex flex-wrap items-end gap-4 border border-rule bg-paper-warm px-5 py-4">
        <div className="min-w-[20rem] flex-1">
          <label htmlFor="issue-select" className="label">
            Issue
          </label>
          <select
            id="issue-select"
            value={props.selected}
            onChange={(e) => router.push(`/admin/newsletter?issue=${e.target.value}`)}
            className="field"
          >
            <optgroup label="Published">
              {props.published.map((issue) => (
                <option key={issue.slug} value={issue.slug}>
                  {issue.label}
                </option>
              ))}
            </optgroup>
            {props.unpublished.length > 0 && (
              <optgroup label="Not published — preview only">
                {props.unpublished.map((issue) => (
                  <option key={issue.slug} value={issue.slug}>
                    {issue.label} ({issue.status})
                  </option>
                ))}
              </optgroup>
            )}
          </select>
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="border border-ink bg-ink px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper transition-colors hover:border-clay hover:bg-clay"
        >
          {copied ? 'HTML copied' : 'Copy HTML'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[640px_1fr]">
        {/* Preview --------------------------------------------------------- */}
        <div>
          <p className="mb-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
            Rendered at 600px — the width of a real inbox
          </p>
          <div className="border border-rule bg-paper-deep p-3">
            <iframe
              title="Newsletter preview"
              srcDoc={props.html}
              sandbox=""
              className="block h-[46rem] w-[600px] max-w-full border border-rule bg-white"
            />
          </div>
        </div>

        {/* Panel ----------------------------------------------------------- */}
        <div className="min-w-0 space-y-6">
          <section className="border border-rule bg-paper">
            <div className="border-b border-rule px-5 py-4">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                Subject line
              </p>
              <p className="mt-1 font-display text-[1.125rem] leading-snug text-ink">
                {props.subject}
              </p>
              <p className="mt-1.5 font-mono text-[0.6875rem] text-ink-faint">
                {props.subject.length} characters — Gmail truncates around 70 on mobile.
              </p>
            </div>

            <div className="px-5 py-4">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                Plain-text version
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                Sent alongside the HTML. It is what a screen reader, a text client and most spam
                filters actually read, so it is written, not stripped.
              </p>
              <pre className="mt-3 max-h-[24rem] overflow-auto whitespace-pre-wrap border border-rule bg-paper-warm p-4 font-mono text-[0.75rem] leading-relaxed text-ink">
                {props.text}
              </pre>
            </div>
          </section>

          {/* Test send ----------------------------------------------------- */}
          <section className="border border-rule bg-paper">
            <div className="border-b border-rule px-5 py-4">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-clay">
                Send test to…
              </p>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">
                One copy, one address, subject prefixed <span className="font-mono">[TEST]</span>.
                Open it in Outlook before you trust it.
              </p>
            </div>
            <form onSubmit={onTest} className="px-5 py-4">
              <label htmlFor="test-email" className="label">
                Email address
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  id="test-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="field flex-1"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-secondary shrink-0 disabled:opacity-50"
                >
                  {sending ? 'Sending…' : 'Send test'}
                </button>
              </div>

              {props.mailer === 'console' && (
                <p className="mt-3 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-ink-faint">
                  No RESEND_API_KEY is set — a test send will print the email to your terminal
                  instead of posting it.
                </p>
              )}

              {result && (
                <p
                  role="status"
                  className={`mt-3 text-[0.875rem] leading-snug ${
                    result.ok ? 'text-moss' : 'text-verdict-skip'
                  }`}
                >
                  {result.message}
                </p>
              )}
            </form>
          </section>

          {/* The honest bit ------------------------------------------------ */}
          <section className="border border-clay/30 bg-clay-wash px-5 py-4">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-clay">
              There is no send-to-everyone button, on purpose
            </p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink">
              Broadcast sending is done in <strong className="font-semibold">Resend Broadcasts</strong>:
              copy the HTML above, paste it into a new broadcast, and send it to the audience.
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
              Resend handles the parts that are genuinely hard and genuinely legally consequential —
              per-recipient unsubscribe links and List-Unsubscribe headers, suppression lists, bounce
              and complaint handling, and sending ten thousand messages without being rate-limited
              into oblivion. A for-loop in a route handler does none of that. Paste{' '}
              <code className="font-mono text-[0.8125rem]">{'{{{RESEND_UNSUBSCRIBE_URL}}}'}</code> into
              the footer link when you create the broadcast.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default NewsletterStudio;

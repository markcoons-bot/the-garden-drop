'use client';

import { useState } from 'react';
import clsx from 'clsx';
import siteConfig from '~/site.config';
import { track } from '@/lib/analytics';

type State = 'idle' | 'loading' | 'done' | 'error';

export function SignupForm({
  source,
  onDark = false,
  compact = false,
  showZone = true,
}: {
  source: string;
  onDark?: boolean;
  compact?: boolean;
  showZone?: boolean;
}) {
  const [state, setState] = useState<State>('idle');
  const [email, setEmail] = useState('');
  const [zone, setZone] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setMessage('');

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          zone,
          source,
          company_website: String(form.get('company_website') ?? ''),
        }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string; errors?: Record<string, string> };

      if (!res.ok || !data.ok) {
        setState('error');
        setMessage(data.errors?.email ?? data.message ?? 'Something went wrong. Try again in a moment.');
        return;
      }
      track('newsletter_signup', { source, zone: zone || 'unknown' });
      setState('done');
      setMessage(data.message ?? siteConfig.newsletter.confirmation);
    } catch {
      setState('error');
      setMessage('We could not reach the server. Check your connection and try again.');
    }
  }

  if (state === 'done') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={clsx(
          'border p-6',
          onDark ? 'border-paper/30 text-paper' : 'border-moss/30 bg-paper-warm text-ink',
        )}
      >
        <p className="font-display text-[1.375rem] leading-snug">You’re on the list.</p>
        <p className={clsx('mt-2 text-[1rem]', onDark ? 'text-paper/70' : 'text-ink-soft')}>{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className={clsx('flex flex-col gap-3', compact ? 'sm:flex-row' : 'sm:flex-row sm:items-end')}>
        <div className="flex-1">
          <label htmlFor={`email-${source}`} className={clsx('label', onDark && 'text-paper/60')}>
            Email address
          </label>
          <input
            id={`email-${source}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={state === 'error'}
            aria-describedby={state === 'error' ? `error-${source}` : undefined}
            className={onDark ? 'field-onDark' : 'field'}
          />
        </div>

        {showZone && !compact && (
          <div className="sm:w-40">
            <label htmlFor={`zone-${source}`} className={clsx('label', onDark && 'text-paper/60')}>
              USDA zone <span className="normal-case tracking-normal opacity-60">(optional)</span>
            </label>
            <input
              id={`zone-${source}`}
              name="zone"
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="7b"
              maxLength={6}
              className={onDark ? 'field-onDark' : 'field'}
            />
          </div>
        )}

        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`company_website-${source}`}>Company website</label>
          <input id={`company_website-${source}`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={state === 'loading'}
          className={clsx(onDark ? 'btn-onDark' : 'btn-primary', 'shrink-0 disabled:opacity-50')}
        >
          {state === 'loading' ? 'One moment…' : siteConfig.cta.primary}
        </button>
      </div>

      {state === 'error' && (
        <p
          id={`error-${source}`}
          role="alert"
          className={clsx('mt-3 text-[0.9375rem]', onDark ? 'text-clay-soft' : 'text-verdict-skip')}
        >
          {message}
        </p>
      )}

      <p className={clsx('mt-4 text-meta leading-relaxed', onDark ? 'text-paper/50' : 'text-ink-faint')}>
        {siteConfig.newsletter.consent}
      </p>
    </form>
  );
}

export default SignupForm;

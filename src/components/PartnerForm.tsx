'use client';

/**
 * PARTNER ENQUIRY — the commercial-facing form.
 *
 * Same contract and same manners as SubmitForm: validated client-side against
 * partnerSchema, errors tied to inputs with aria-describedby, status announced
 * with aria-live, honeypot included.
 *
 * Contract with POST /api/partner:
 *   → JSON matching partnerSchema, including the `company_website` honeypot
 *   ← { ok: true, message } | { ok: false, errors: Record<string,string> } (400)
 */

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import siteConfig from '~/site.config';
import { fieldErrors, partnerSchema } from '@/lib/validation';
import { Kicker } from '@/components/ui';

type State = 'idle' | 'loading' | 'done' | 'error';
type Interest = 'sponsorship' | 'sampling' | 'trials' | 'other';

const INTERESTS: { value: Interest; label: string }[] = [
  { value: 'sponsorship', label: 'Sponsoring an issue' },
  { value: 'sampling', label: 'Sending plants or products for trial' },
  { value: 'trials', label: 'Research, trial data or an interview' },
  { value: 'other', label: 'Something else' },
];

const EMPTY = {
  name: '',
  email: '',
  company: '',
  interest: 'sponsorship' as Interest,
  message: '',
};

export function PartnerForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  const id = (name: string) => `${uid}-${name}`;
  const errId = (name: string) => `${uid}-${name}-error`;
  const hintId = (name: string) => `${uid}-${name}-hint`;

  function set<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function focusFirstError(found: Record<string, string>) {
    const first = Object.keys(found)[0];
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const payload = { ...values, company_website: String(form.get('company_website') ?? '') };

    const parsed = partnerSchema.safeParse(payload);
    if (!parsed.success) {
      const found = fieldErrors(parsed.error);
      setErrors(found);
      setState('error');
      setMessage('Some fields need another look. We have marked them below.');
      focusFirstError(found);
      return;
    }

    setState('loading');
    setErrors({});
    setMessage('');

    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok || !data.ok) {
        const found = data.errors ?? {};
        setErrors(found);
        setState('error');
        setMessage(
          data.message ??
            (Object.keys(found).length
              ? 'Some fields need another look. We have marked them below.'
              : 'Something went wrong at our end. Try again in a moment.'),
        );
        focusFirstError(found);
        return;
      }

      setState('done');
      setMessage(data.message ?? '');
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
        className="border border-moss/30 bg-paper-warm p-8 md:p-12"
      >
        <Kicker tone="clay">Received</Kicker>
        <h2 className="mt-4 text-display-sm">Thank you. We will reply.</h2>
        {message && <p className="mt-4 max-w-prose text-body-lg text-ink-soft">{message}</p>}
        <p className="mt-4 max-w-prose text-body-lg leading-relaxed text-ink-soft">
          Partner enquiries go to{' '}
          <a href={`mailto:${siteConfig.email.partners}`} className="link">
            {siteConfig.email.partners}
          </a>
          , which reaches the business side and not the editor. Expect a straight answer, including
          if the answer is no. We will tell you what we can offer, what we cannot, and what we do
          not yet know — we are new, and we will not invent an audience figure to close a deal.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setValues(EMPTY);
              setMessage('');
              setState('idle');
            }}
          >
            Send another enquiry
          </button>
          <Link href="/about#independence" className="btn-ghost">
            Editorial independence →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="w-full">
      <div aria-live="polite" className="sr-only">
        {state === 'loading' ? 'Sending your enquiry.' : state === 'error' ? message : ''}
      </div>

      {state === 'error' && message && (
        <p
          role="alert"
          className="mb-8 border border-verdict-skip/40 bg-clay-wash px-5 py-4 text-[1.0625rem] text-verdict-skip"
        >
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="label">
            Your name
          </label>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            className="field"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errId('name') : undefined}
          />
          {errors.name && (
            <p id={errId('name')} role="alert" className="mt-2 text-[0.9375rem] text-verdict-skip">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={id('email')} className="label">
            Email
          </label>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errId('email') : undefined}
          />
          {errors.email && (
            <p id={errId('email')} role="alert" className="mt-2 text-[0.9375rem] text-verdict-skip">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={id('company')} className="label">
          Company or programme
        </label>
        <input
          id={id('company')}
          name="company"
          type="text"
          autoComplete="organization"
          className="field"
          value={values.company}
          onChange={(e) => set('company', e.target.value)}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? errId('company') : undefined}
        />
        {errors.company && (
          <p id={errId('company')} role="alert" className="mt-2 text-[0.9375rem] text-verdict-skip">
            {errors.company}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label htmlFor={id('interest')} className="label">
          What are you interested in?
        </label>
        <select
          id={id('interest')}
          name="interest"
          className="field appearance-none bg-paper"
          value={values.interest}
          onChange={(e) => set('interest', e.target.value as Interest)}
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? errId('interest') : undefined}
        >
          {INTERESTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p id={errId('interest')} role="alert" className="mt-2 text-[0.9375rem] text-verdict-skip">
            {errors.interest}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label htmlFor={id('message')} className="label">
          What do you have in mind?
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={7}
          className="field resize-y"
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            [hintId('message'), errors.message ? errId('message') : ''].filter(Boolean).join(' ')
          }
        />
        <p
          id={hintId('message')}
          className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-ink-faint"
        >
          Tell us the shape of it: what you are launching, what you would want out of an issue
          sponsorship, or what you would like us to trial. If you have a budget range or a date,
          include it — it saves two emails.
        </p>
        {errors.message && (
          <p id={errId('message')} role="alert" className="mt-2 text-[0.9375rem] text-verdict-skip">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id('company_website')}>Company website</label>
        <input
          id={id('company_website')}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-10 flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary w-full justify-center disabled:opacity-50 sm:w-auto"
        >
          {state === 'loading' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p className="max-w-measure text-meta leading-relaxed text-ink-faint">
          Nothing on this form buys editorial coverage or a favourable verdict. See{' '}
          <Link href="/about#independence" className="link-quiet">
            editorial independence
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

export default PartnerForm;

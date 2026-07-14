'use client';

/**
 * SUBMIT A DISCOVERY — the breeder-facing form.
 *
 * Validates client-side against the same zod schema the API route uses
 * (src/lib/validation.ts), so the messages a person sees are the messages the
 * server would have sent. Errors are tied to their input with aria-describedby;
 * status is announced with aria-live.
 *
 * Contract with POST /api/submit:
 *   → JSON matching submissionSchema, including the `company_website` honeypot
 *   ← { ok: true, message } | { ok: false, errors: Record<string,string> } (400)
 */

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import siteConfig from '~/site.config';
import { track } from '@/lib/analytics';
import { fieldErrors, submissionSchema } from '@/lib/validation';
import { Kicker } from '@/components/ui';

type State = 'idle' | 'loading' | 'done' | 'error';
type SubjectKind = 'plant' | 'technique' | 'other';

const SUBJECT_KINDS: { value: SubjectKind; label: string; hint: string }[] = [
  { value: 'plant', label: 'A plant', hint: 'A cultivar, variety or introduction.' },
  { value: 'technique', label: 'A technique', hint: 'A method, tool or product.' },
  { value: 'other', label: 'Something else', hint: 'A story, a claim, a tip-off.' },
];

const EMPTY = {
  submitterName: '',
  email: '',
  company: '',
  subjectKind: 'plant' as SubjectKind,
  subjectName: '',
  description: '',
  releaseDate: '',
  links: '',
  imageUrl: '',
  retailAvailability: '',
};

/** Direct upload requires Supabase Storage. Without it we ask for a link, and say why. */
const STORAGE_CONNECTED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export function SubmitForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');

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

  function describedBy(name: keyof typeof EMPTY, hasHint: boolean) {
    const parts = [hasHint ? hintId(name) : '', errors[name] ? errId(name) : ''].filter(Boolean);
    return parts.length ? parts.join(' ') : undefined;
  }

  function focusFirstError(found: Record<string, string>) {
    const first = Object.keys(found)[0];
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`);
    el?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const payload = {
      ...values,
      company_website: String(form.get('company_website') ?? ''),
    };

    const parsed = submissionSchema.safeParse(payload);
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
      const res = await fetch('/api/submit', {
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

      track('submission_complete', { subjectKind: values.subjectKind });
      setState('done');
      setMessage(data.message ?? '');
    } catch {
      setState('error');
      setMessage('We could not reach the server. Check your connection and try again.');
    }
  }

  // -------------------------------------------------------------------------
  // Success
  // -------------------------------------------------------------------------
  if (state === 'done') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-moss/30 bg-paper-warm p-8 md:p-12"
      >
        <Kicker tone="clay">Received</Kicker>
        <h2 className="mt-4 text-display-sm">
          Thank you — it is in front of a human, not a queue.
        </h2>
        {message && <p className="mt-4 max-w-prose text-body-lg text-ink-soft">{message}</p>}

        <h3 className="mt-10 font-display text-[1.375rem]">What happens next</h3>
        <ol className="mt-4 divide-rule border-t border-rule">
          {[
            {
              h: 'We read everything',
              b: 'Every submission is read by an editor. That is a promise we can keep because the beat is narrow.',
            },
            {
              h: 'We reply if we are going to cover it',
              b: 'If your plant or technique is going into an issue, you will hear from us — usually with follow-up questions, sometimes with a request for trial data or a unit to test. If it is not a fit, we may not reply, and that is not a judgement on the work.',
            },
            {
              h: 'We do not accept payment for coverage',
              b: 'Not now, not later, not for a “featured” slot. Submitting costs nothing and buys nothing except a fair reading. If we cover it, we may also decide it is not worth it — and we will publish that too, with the test that would change our mind.',
            },
          ].map((step, i) => (
            <li key={step.h} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
              <span className="font-mono text-meta text-clay">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-display text-[1.25rem] leading-tight">{step.h}</p>
                <p className="mt-1.5 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
                  {step.b}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-prose text-[1.0625rem] leading-relaxed text-ink-soft">
          Anything to add — trial data, a correction, a photograph you have the rights to — goes to{' '}
          <a href={`mailto:${siteConfig.email.editorial}`} className="link">
            {siteConfig.email.editorial}
          </a>
          . Quote the name of the plant or technique and it will find the right file.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setValues(EMPTY);
              setFileName('');
              setMessage('');
              setState('idle');
            }}
          >
            Submit another
          </button>
          <Link href="/about#method" className="btn-ghost">
            How we rate things →
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Form
  // -------------------------------------------------------------------------
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="w-full">
      {/* Status region: always in the DOM so screen readers announce changes. */}
      <div aria-live="polite" className="sr-only">
        {state === 'loading' ? 'Sending your submission.' : state === 'error' ? message : ''}
      </div>

      {state === 'error' && message && (
        <p
          role="alert"
          className="mb-8 border border-verdict-skip/40 bg-clay-wash px-5 py-4 text-[1.0625rem] text-verdict-skip"
        >
          {message}
        </p>
      )}

      {/* --- You ------------------------------------------------------------ */}
      <fieldset className="border-t border-rule pt-8">
        <legend className="sr-only">About you</legend>
        <Kicker tone="clay">01 — You</Kicker>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field
            label="Your name"
            name="submitterName"
            id={id('submitterName')}
            errorId={errId('submitterName')}
            error={errors.submitterName}
            required
          >
            <input
              id={id('submitterName')}
              name="submitterName"
              type="text"
              autoComplete="name"
              className="field"
              value={values.submitterName}
              onChange={(e) => set('submitterName', e.target.value)}
              aria-invalid={Boolean(errors.submitterName)}
              aria-describedby={describedBy('submitterName', false)}
            />
          </Field>

          <Field
            label="Email"
            name="email"
            id={id('email')}
            errorId={errId('email')}
            error={errors.email}
            required
          >
            <input
              id={id('email')}
              name="email"
              type="email"
              autoComplete="email"
              className="field"
              value={values.email}
              onChange={(e) => set('email', e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email', false)}
            />
          </Field>
        </div>

        <div className="mt-6">
          <Field
            label="Company, nursery or programme"
            name="company"
            id={id('company')}
            errorId={errId('company')}
            error={errors.company}
            hintId={hintId('company')}
            hint="Optional. Breeder, distributor, university programme, or nothing at all if you are a gardener who noticed something."
          >
            <input
              id={id('company')}
              name="company"
              type="text"
              autoComplete="organization"
              className="field"
              value={values.company}
              onChange={(e) => set('company', e.target.value)}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={describedBy('company', true)}
            />
          </Field>
        </div>
      </fieldset>

      {/* --- The thing ------------------------------------------------------ */}
      <fieldset className="mt-12 border-t border-rule pt-8">
        <legend className="sr-only">What you are submitting</legend>
        <Kicker tone="clay">02 — The thing itself</Kicker>

        {/* Segmented control */}
        <div className="mt-6" role="radiogroup" aria-labelledby={`${uid}-kind-label`}>
          <p id={`${uid}-kind-label`} className="label">
            What is it?
          </p>
          <div className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-3">
            {SUBJECT_KINDS.map((kind) => {
              const checked = values.subjectKind === kind.value;
              return (
                <label
                  key={kind.value}
                  htmlFor={`${uid}-kind-${kind.value}`}
                  className={clsx(
                    'cursor-pointer bg-paper p-5 transition-colors',
                    checked ? 'bg-ink text-paper' : 'hover:bg-paper-warm',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      id={`${uid}-kind-${kind.value}`}
                      type="radio"
                      name="subjectKind"
                      value={kind.value}
                      checked={checked}
                      onChange={() => set('subjectKind', kind.value)}
                      className="h-4 w-4 shrink-0 accent-clay"
                    />
                    <span className="font-display text-[1.25rem] leading-tight">{kind.label}</span>
                  </span>
                  <span
                    className={clsx(
                      'mt-2 block pl-7 text-[0.9375rem] leading-snug',
                      checked ? 'text-paper/70' : 'text-ink-soft',
                    )}
                  >
                    {kind.hint}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.subjectKind && (
            <p role="alert" className="mt-2 text-[0.9375rem] text-verdict-skip">
              {errors.subjectKind}
            </p>
          )}
        </div>

        <div className="mt-6">
          <Field
            label="Name of the plant or technique"
            name="subjectName"
            id={id('subjectName')}
            errorId={errId('subjectName')}
            error={errors.subjectName}
            hintId={hintId('subjectName')}
            hint="Trade name and cultivar denomination if you have both — e.g. Powerball® Panicle Hydrangea ('SMNHPMZ'). We publish both, because the tag rarely does."
            required
          >
            <input
              id={id('subjectName')}
              name="subjectName"
              type="text"
              className="field"
              value={values.subjectName}
              onChange={(e) => set('subjectName', e.target.value)}
              aria-invalid={Boolean(errors.subjectName)}
              aria-describedby={describedBy('subjectName', true)}
            />
          </Field>
        </div>

        <div className="mt-6">
          <Field
            label="What is genuinely new about it?"
            name="description"
            id={id('description')}
            errorId={errId('description')}
            error={errors.description}
            hintId={hintId('description')}
            hint="The most important box on this page. Tell us what it does that the previous variety or method did not — and what it does not do. Zone range, mature size, sun and water if you have them. If a figure is unpublished, say “unpublished” rather than estimating; we will print “Unverified” either way, and we would rather do it with your blessing."
            required
          >
            <textarea
              id={id('description')}
              name="description"
              rows={8}
              className="field resize-y"
              value={values.description}
              onChange={(e) => set('description', e.target.value)}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={describedBy('description', true)}
            />
          </Field>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field
            label="Release date"
            name="releaseDate"
            id={id('releaseDate')}
            errorId={errId('releaseDate')}
            error={errors.releaseDate}
            hintId={hintId('releaseDate')}
            hint="Optional — and tell us which channel. “Trade 2024, retail spring 2026” is far more useful than “2026”."
          >
            <input
              id={id('releaseDate')}
              name="releaseDate"
              type="text"
              placeholder="Retail spring 2026"
              className="field"
              value={values.releaseDate}
              onChange={(e) => set('releaseDate', e.target.value)}
              aria-invalid={Boolean(errors.releaseDate)}
              aria-describedby={describedBy('releaseDate', true)}
            />
          </Field>

          <Field
            label="Retail availability"
            name="retailAvailability"
            id={id('retailAvailability')}
            errorId={errId('retailAvailability')}
            error={errors.retailAvailability}
            hintId={hintId('retailAvailability')}
            hint="Optional. Where can a gardener actually buy it, and is it trade-only, limited, or gated behind a minimum order? We will say so plainly."
          >
            <input
              id={id('retailAvailability')}
              name="retailAvailability"
              type="text"
              placeholder="Independent garden centres, US only"
              className="field"
              value={values.retailAvailability}
              onChange={(e) => set('retailAvailability', e.target.value)}
              aria-invalid={Boolean(errors.retailAvailability)}
              aria-describedby={describedBy('retailAvailability', true)}
            />
          </Field>
        </div>
      </fieldset>

      {/* --- Evidence ------------------------------------------------------- */}
      <fieldset className="mt-12 border-t border-rule pt-8">
        <legend className="sr-only">Evidence and images</legend>
        <Kicker tone="clay">03 — Evidence</Kicker>

        <div className="mt-6">
          <Field
            label="Supporting links"
            name="links"
            id={id('links')}
            errorId={errId('links')}
            error={errors.links}
            hintId={hintId('links')}
            hint="One per line. Trial data, patent numbers, the breeder’s own page, an extension report, a paper. A link to a primary source is worth more to us than a page of adjectives — and it is what moves “Reported” to “Verified”."
          >
            <textarea
              id={id('links')}
              name="links"
              rows={4}
              className="field resize-y font-mono text-[0.9375rem]"
              placeholder={'https://example.com/trial-data\nhttps://patents.google.com/…'}
              value={values.links}
              onChange={(e) => set('links', e.target.value)}
              aria-invalid={Boolean(errors.links)}
              aria-describedby={describedBy('links', true)}
            />
          </Field>
        </div>

        <div className="mt-6">
          <Field
            label="Image link"
            name="imageUrl"
            id={id('imageUrl')}
            errorId={errId('imageUrl')}
            error={errors.imageUrl}
            hintId={hintId('imageUrl')}
            hint="A URL to a photograph you have the right to license to us. Please do not send us a shot you found on someone else’s website."
          >
            <input
              id={id('imageUrl')}
              name="imageUrl"
              type="url"
              inputMode="url"
              placeholder="https://…"
              className="field"
              value={values.imageUrl}
              onChange={(e) => set('imageUrl', e.target.value)}
              aria-invalid={Boolean(errors.imageUrl)}
              aria-describedby={describedBy('imageUrl', true)}
            />
          </Field>
        </div>

        {/* File input — present, labelled, and honestly disabled. */}
        <div className="mt-6 border border-dashed border-rule bg-paper-warm p-6">
          <label htmlFor={id('imageFile')} className="label">
            Upload an image file
          </label>
          <input
            id={id('imageFile')}
            name="imageFile"
            type="file"
            accept="image/*"
            disabled
            aria-describedby={hintId('imageFile')}
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
            className="block w-full text-[1rem] text-ink-soft file:mr-4 file:border file:border-rule file:bg-paper file:px-4 file:py-2 file:font-mono file:text-[0.8125rem] file:uppercase file:tracking-[0.1em] file:text-ink disabled:cursor-not-allowed disabled:opacity-60"
          />
          {fileName && <p className="mt-2 text-[0.9375rem] text-ink-soft">{fileName}</p>}
          <p id={hintId('imageFile')} className="mt-3 text-[1rem] leading-relaxed text-ink-soft">
            {STORAGE_CONNECTED
              ? 'Direct upload runs through Supabase Storage, which is connected but not wired to this form in the current build — paste a link in the field above instead.'
              : 'Direct upload turns on when storage is connected; until then it is switched off rather than faked, so please paste a link in the field above instead.'}
          </p>
        </div>
      </fieldset>

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

      {/* --- Send ----------------------------------------------------------- */}
      <div className="mt-12 flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary w-full justify-center disabled:opacity-50 sm:w-auto"
        >
          {state === 'loading' ? 'Sending…' : 'Send it to the editor'}
        </button>
        <p className="max-w-measure text-meta leading-relaxed text-ink-faint">
          We read every submission. We take no payment for coverage, and submitting does not buy a
          good verdict — see{' '}
          <Link href="/about#independence" className="link-quiet">
            editorial independence
          </Link>
          . Your email is used to reply to you and nothing else.
        </p>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// A labelled field wrapper. Real <label>, real error, real hint.
// ---------------------------------------------------------------------------

function Field({
  label,
  id,
  error,
  errorId,
  hint,
  hintId,
  required = false,
  children,
}: {
  label: string;
  /** Kept for readability at the call site; the input owns the real name. */
  name: string;
  id: string;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}{' '}
        {!required && <span className="normal-case tracking-normal opacity-60">(optional)</span>}
      </label>
      {children}
      {hint && hintId && (
        <p id={hintId} className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-ink-faint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-[0.9375rem] text-verdict-skip">
          {error}
        </p>
      )}
    </div>
  );
}

export default SubmitForm;

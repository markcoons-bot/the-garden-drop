'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PUBLISH_STATUSES } from '../../ui';

/**
 * THE RECORD EDITOR
 *
 * Two halves, and both of them are first-class.
 *
 * On the left: the fields you change every day — the headline, the slug, the
 * status, the publish date. Real controls, because those four decisions are
 * what an editor actually does.
 *
 * On the right: the record itself, as JSON. The content model is deeply nested
 * — six scored axes with a written note each, five discovery cards, an
 * interview, a reader action, a sources array — and a form that flattened all
 * of that into eighty inputs would be slower to use and impossible to keep in
 * step with the types. The JSON is the record. It is validated before it is
 * saved, and the flat controls above always win.
 *
 * This is what a two-person editorial team needs, and it is the fastest way to
 * work once you have used it twice.
 */

export interface RecordEditorProps {
  entitySlug: string;
  entityLabel: string;
  singular: string;
  titleField: string;
  hasStatus: boolean;
  hasSlug: boolean;
  isNew: boolean;
  inbound: boolean;
  /** Where this record can be read on the public site, if anywhere. */
  publicHref: string | null;
  initial: Record<string, unknown>;
}

type Feedback = { tone: 'ok' | 'bad'; message: string } | null;

export function RecordEditor(props: RecordEditorProps) {
  const router = useRouter();

  const [text, setText] = useState(() => JSON.stringify(props.initial, null, 2));
  const [title, setTitle] = useState(String(props.initial[props.titleField] ?? ''));
  const [slug, setSlug] = useState(String(props.initial.slug ?? ''));
  const [status, setStatus] = useState(String(props.initial.status ?? 'draft'));
  const [publishDate, setPublishDate] = useState(
    String(props.initial.publishDate ?? '').slice(0, 10),
  );

  const [jsonError, setJsonError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [busy, setBusy] = useState(false);
  const [armed, setArmed] = useState(false);

  const hasPublishDate = 'publishDate' in props.initial;

  const lineCount = useMemo(() => text.split('\n').length, [text]);

  /** Keep the JSON in step with the flat controls whenever it is parseable. */
  function syncIntoJson(patch: Record<string, unknown>) {
    try {
      const parsed = JSON.parse(text) as Record<string, unknown>;
      setText(JSON.stringify({ ...parsed, ...patch }, null, 2));
      setJsonError(null);
    } catch {
      // Leave the text alone — the editor is mid-thought. We will merge the
      // flat fields on save regardless, and complain about the JSON then.
    }
  }

  function buildRecord(): Record<string, unknown> | null {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unparseable JSON.';
      setJsonError(message);
      return null;
    }
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      setJsonError('A record must be a JSON object — { … }, not an array or a bare value.');
      return null;
    }
    setJsonError(null);

    const record = parsed as Record<string, unknown>;
    const merged: Record<string, unknown> = { ...record };
    merged[props.titleField] = title;
    if (props.hasSlug) merged.slug = slug;
    if (props.hasStatus) merged.status = status;
    if (hasPublishDate && publishDate) merged.publishDate = publishDate;
    return merged;
  }

  async function onSave() {
    setFeedback(null);
    const record = buildRecord();
    if (!record) {
      setFeedback({ tone: 'bad', message: 'Nothing was saved — the JSON below is not valid yet.' });
      return;
    }

    setBusy(true);
    try {
      const url = props.isNew
        ? `/api/admin/${props.entitySlug}`
        : `/api/admin/${props.entitySlug}/${String(props.initial.id)}`;

      const res = await fetch(url, {
        method: props.isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        row?: Record<string, unknown>;
      };

      if (!res.ok || !data.ok) {
        setFeedback({ tone: 'bad', message: data.message ?? 'The save failed.' });
        return;
      }

      if (data.row) setText(JSON.stringify(data.row, null, 2));

      if (props.isNew) {
        const id = data.row?.id;
        setFeedback({ tone: 'ok', message: 'Created.' });
        router.push(`/admin/${props.entitySlug}/${String(id)}`);
        router.refresh();
        return;
      }

      setFeedback({
        tone: 'ok',
        message: `Saved at ${new Date().toLocaleTimeString('en-GB')}.`,
      });
      router.refresh();
    } catch {
      setFeedback({ tone: 'bad', message: 'We could not reach the server.' });
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    setBusy(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/${props.entitySlug}/${String(props.initial.id)}`, {
        method: 'DELETE',
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setFeedback({ tone: 'bad', message: data.message ?? 'The delete failed.' });
        setBusy(false);
        setArmed(false);
        return;
      }
      router.push(`/admin/${props.entitySlug}`);
      router.refresh();
    } catch {
      setFeedback({ tone: 'bad', message: 'We could not reach the server.' });
      setBusy(false);
      setArmed(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[22rem_1fr]">
      {/* Flat controls ---------------------------------------------------- */}
      <div className="space-y-5">
        <div className="border border-rule bg-paper-warm p-5">
          <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
            The fields you change
          </p>

          <div className="mb-4">
            <label htmlFor="rec-title" className="label">
              {labelFor(props.titleField)}
            </label>
            <input
              id="rec-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                syncIntoJson({ [props.titleField]: e.target.value });
              }}
              className="field"
            />
          </div>

          {props.hasSlug && (
            <div className="mb-4">
              <label htmlFor="rec-slug" className="label">
                Slug
              </label>
              <input
                id="rec-slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  const v = e.target.value;
                  setSlug(v);
                  syncIntoJson({ slug: v });
                }}
                className="field font-mono text-[0.875rem]"
              />
              <p className="mt-1.5 text-[0.75rem] leading-snug text-ink-faint">
                Changing this changes the public URL and breaks every link ever sent to it.
              </p>
            </div>
          )}

          {props.hasStatus && (
            <div className="mb-4">
              <label htmlFor="rec-status" className="label">
                Status
              </label>
              <select
                id="rec-status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  syncIntoJson({ status: e.target.value });
                }}
                className="field"
              >
                {PUBLISH_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[0.75rem] leading-snug text-ink-faint">
                Only <span className="font-mono">published</span> is visible to a reader.
              </p>
            </div>
          )}

          {hasPublishDate && (
            <div>
              <label htmlFor="rec-date" className="label">
                Publish date
              </label>
              <input
                id="rec-date"
                type="date"
                value={publishDate}
                onChange={(e) => {
                  setPublishDate(e.target.value);
                  syncIntoJson({ publishDate: e.target.value });
                }}
                className="field font-mono text-[0.875rem]"
              />
            </div>
          )}
        </div>

        {/* Actions -------------------------------------------------------- */}
        <div className="border border-rule bg-paper p-5">
          <button
            type="button"
            onClick={onSave}
            disabled={busy}
            className="btn-primary w-full disabled:opacity-50"
          >
            {busy ? 'Working…' : props.isNew ? `Create ${props.singular.toLowerCase()}` : 'Save changes'}
          </button>

          {feedback && (
            <p
              role="status"
              className={`mt-3 text-[0.875rem] leading-snug ${
                feedback.tone === 'ok' ? 'text-moss' : 'text-verdict-skip'
              }`}
            >
              {feedback.message}
            </p>
          )}

          {props.publicHref && !props.isNew && (
            <Link
              href={props.publicHref}
              target="_blank"
              className="mt-4 block text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink"
            >
              View on the site ↗
            </Link>
          )}

          {!props.isNew && (
            <div className="mt-6 border-t border-rule pt-4">
              {armed ? (
                <div className="space-y-2">
                  <p className="text-[0.875rem] leading-snug text-ink">
                    Delete this {props.singular.toLowerCase()} permanently? Nothing else is changed —
                    anything that referenced it by slug will simply stop resolving.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onDelete}
                      disabled={busy}
                      className="flex-1 border border-verdict-skip bg-verdict-skip px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper disabled:opacity-50"
                    >
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setArmed(false)}
                      className="flex-1 border border-rule px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft hover:border-ink hover:text-ink"
                    >
                      Keep it
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setArmed(true)}
                  className="w-full border border-rule px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-verdict-skip hover:border-verdict-skip"
                >
                  Delete {props.singular.toLowerCase()}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* The record ------------------------------------------------------- */}
      <div className="min-w-0">
        <div className="flex items-end justify-between gap-4 border-b border-rule pb-2">
          <div>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-clay">
              Record editor
            </p>
            <p className="mt-1 text-[0.875rem] leading-snug text-ink-soft">
              The whole record, as it is stored. Nested arrays — scores, discovery cards, sources —
              are edited here.
            </p>
          </div>
          <p className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-ink-faint">
            {lineCount} lines
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (jsonError) setJsonError(null);
          }}
          spellCheck={false}
          aria-label={`${props.singular} record, as JSON`}
          aria-invalid={Boolean(jsonError)}
          className={`mt-3 block h-[36rem] w-full resize-y border bg-paper p-4 font-mono text-[0.8125rem] leading-[1.6] text-ink focus:outline-none ${
            jsonError ? 'border-verdict-skip' : 'border-rule focus:border-ink'
          }`}
        />

        {jsonError ? (
          <p role="alert" className="mt-2 border-l-2 border-verdict-skip pl-3 text-[0.875rem] text-verdict-skip">
            <span className="font-mono text-[0.75rem] uppercase tracking-[0.1em]">Invalid JSON</span>
            <br />
            {jsonError}
          </p>
        ) : (
          <p className="mt-2 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-ink-faint">
            The four controls on the left are merged over this on save — they always win.
          </p>
        )}
      </div>
    </div>
  );
}

function labelFor(field: string): string {
  const map: Record<string, string> = {
    title: 'Title',
    name: 'Name',
    commonName: 'Common name',
    label: 'Label',
    email: 'Email',
    company: 'Company',
    subjectName: 'Subject',
  };
  return map[field] ?? field;
}

export default RecordEditor;

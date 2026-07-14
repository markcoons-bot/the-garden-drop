'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Re-seed the local JSON store. Two clicks, because it also destroys every
 * subscriber, submission and partner enquiry you have collected locally.
 */
export function ResetButton() {
  const router = useRouter();
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function onReset() {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' });
      const data = (await res.json()) as { ok: boolean; message?: string };
      setResult({
        ok: data.ok,
        message: data.message ?? (data.ok ? 'Re-seeded.' : 'The reset failed.'),
      });
      if (data.ok) router.refresh();
    } catch {
      setResult({ ok: false, message: 'We could not reach the server.' });
    } finally {
      setBusy(false);
      setArmed(false);
    }
  }

  return (
    <div className="text-right">
      {armed ? (
        <span className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            disabled={busy}
            className="border border-verdict-skip bg-verdict-skip px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper disabled:opacity-50"
          >
            {busy ? 'Re-seeding…' : 'Yes — wipe and re-seed'}
          </button>
          <button
            type="button"
            onClick={() => setArmed(false)}
            className="border border-rule px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft hover:border-ink hover:text-ink"
          >
            Cancel
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setArmed(true)}
          className="border border-rule px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft hover:border-ink hover:text-ink"
        >
          Reset demo data
        </button>
      )}

      {result && (
        <p
          role="status"
          className={`mt-2 max-w-sm text-[0.8125rem] leading-snug ${
            result.ok ? 'text-moss' : 'text-verdict-skip'
          }`}
        >
          {result.message}
        </p>
      )}
    </div>
  );
}

export default ResetButton;

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm({ next, hint }: { next: string; hint: string | null }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setError(data.message ?? 'That password is not right. Try again.');
        setPassword('');
        setBusy(false);
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setError('We could not reach the server. Check that the dev server is still running.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'login-error' : undefined}
        className="field font-mono"
      />

      {error && (
        <p id="login-error" role="alert" className="mt-3 text-[0.9375rem] text-verdict-skip">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-50">
        {busy ? 'One moment…' : 'Sign in'}
      </button>

      {hint && (
        <p className="mt-6 border-t border-rule pt-4 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-ink-faint">
          DEV ONLY — no ADMIN_PASSWORD is set, so the password is{' '}
          <span className="text-clay">{hint}</span>. Set ADMIN_PASSWORD in .env.local before this
          goes anywhere near a public URL.
        </p>
      )}
    </form>
  );
}

export default LoginForm;

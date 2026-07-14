import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthed } from '@/lib/auth';
import siteConfig from '~/site.config';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/** Only ever redirect within our own admin. Never to a URL a stranger supplied. */
function safeNext(value: string | undefined): string {
  if (!value) return '/admin';
  if (!value.startsWith('/admin') || value.startsWith('//')) return '/admin';
  return value;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await isAuthed()) redirect('/admin');

  const { next } = await searchParams;

  // The dev default lives in src/lib/auth.ts. We only ever whisper it when the
  // app is genuinely running in development AND nobody has set a real password.
  const hint =
    process.env.NODE_ENV === 'development' && !process.env.ADMIN_PASSWORD ? 'gardendrop' : null;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-gutter py-section">
      <div className="w-full max-w-[26rem]">
        <div className="mb-8 border-b border-rule pb-6">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-clay">
            Editorial desk
          </p>
          <h1 className="mt-3 font-display text-display-sm leading-tight">
            {siteConfig.nameParts.lead}{' '}
            <span className="italic text-clay">{siteConfig.nameParts.accent}</span>
          </h1>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            The desk where the issues get made. One password, twelve hours, then it asks again.
          </p>
        </div>

        <LoginForm next={safeNext(next)} hint={hint} />

        <p className="mt-10 text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
          <Link href="/" className="underline decoration-rule underline-offset-4 hover:text-ink">
            ← Back to {siteConfig.shortName}
          </Link>
        </p>
      </div>
    </div>
  );
}

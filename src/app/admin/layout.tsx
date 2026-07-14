import type { Metadata } from 'next';
import Link from 'next/link';
import { isAuthed } from '@/lib/auth';
import { backend, list } from '@/lib/db';
import { ENTITIES } from '@/lib/entities';
import siteConfig from '~/site.config';
import { AdminNav, LogoutButton, type NavGroup } from './AdminNav';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/**
 * The admin shell.
 *
 * When you are not signed in this renders nothing but its children, so the
 * login screen at /admin/login gets the whole page to itself. Every other route
 * under /admin calls requireAdmin() and redirects before it renders a byte.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthed())) return <>{children}</>;

  // Counts in the sidebar. On the local store these are already in memory; on
  // Supabase this is one small select per table and it is worth it — knowing
  // there are 47 unread submissions is the reason you open the sidebar.
  const counts = Object.fromEntries(
    await Promise.all(
      ENTITIES.map(async (entity) => [entity.key, (await list(entity.key)).length] as const),
    ),
  ) as Record<string, number>;

  const content = ENTITIES.filter((e) => !e.inbound);
  const inbound = ENTITIES.filter((e) => e.inbound);

  const groups: NavGroup[] = [
    {
      heading: 'Overview',
      items: [{ href: '/admin', label: 'Dashboard' }],
    },
    {
      heading: 'Editorial',
      items: content.map((e) => ({
        href: `/admin/${e.slug}`,
        label: e.label,
        badge: counts[e.key],
      })),
    },
    {
      heading: 'Audience',
      items: inbound.map((e) => ({
        href: `/admin/${e.slug}`,
        label: e.label,
        badge: counts[e.key],
      })),
    },
    {
      heading: 'Send',
      items: [{ href: '/admin/newsletter', label: 'Newsletter' }],
    },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-0 px-4 md:flex-row md:px-6">
        {/* Sidebar --------------------------------------------------------- */}
        <aside className="shrink-0 border-b border-rule py-6 md:sticky md:top-0 md:h-screen md:w-60 md:overflow-y-auto md:border-b-0 md:border-r md:py-8 md:pr-6">
          <div className="mb-6">
            <Link href="/admin" className="block">
              <span className="font-display text-[1.125rem] leading-none text-ink">
                {siteConfig.nameParts.lead}{' '}
                <span className="italic text-clay">{siteConfig.nameParts.accent}</span>
              </span>
            </Link>
            <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
              Editorial desk
            </p>
          </div>

          <BackendBadge />

          <div className="mt-7">
            <AdminNav groups={groups} />
          </div>

          <div className="mt-8 space-y-2 border-t border-rule pt-5">
            <Link
              href="/"
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint underline decoration-rule underline-offset-4 hover:text-ink"
            >
              View the public site ↗
            </Link>
            <LogoutButton />
          </div>
        </aside>

        {/* Work surface ----------------------------------------------------- */}
        <main className="min-w-0 flex-1 py-8 md:pl-10">{children}</main>
      </div>
    </div>
  );
}

function BackendBadge() {
  const supabase = backend === 'supabase';
  return (
    <div
      className={
        supabase
          ? 'inline-flex items-center gap-2 border border-moss/40 bg-moss/5 px-2.5 py-1.5'
          : 'inline-flex items-center gap-2 border border-rule bg-paper-warm px-2.5 py-1.5'
      }
      title={
        supabase
          ? 'NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set. Writes go to Postgres.'
          : 'No Supabase credentials. Everything reads and writes .data/db.json, seeded from src/content.'
      }
    >
      <span
        aria-hidden
        className={`inline-block h-1.5 w-1.5 rounded-full ${supabase ? 'bg-moss' : 'bg-clay'}`}
      />
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">
        {supabase ? 'Supabase' : 'Local JSON store'}
      </span>
    </div>
  );
}

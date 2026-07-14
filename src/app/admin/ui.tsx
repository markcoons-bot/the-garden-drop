/**
 * ADMIN DESIGN LANGUAGE
 *
 * The same paper, ink, clay and hairlines as the publication — but tighter,
 * plainer and with more per screen. An editorial tool should feel like the
 * thing it makes, and it should never feel precious about it.
 *
 * No new colours. No component here uses a hook, so client components may
 * import them freely.
 */

import Link from 'next/link';
import clsx from 'clsx';
import type { PublishStatus } from '@/lib/types';

export function AdminHeader({
  kicker,
  title,
  intro,
  action,
}: {
  kicker: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-clay">{kicker}</p>
        <h1 className="mt-2 font-display text-[1.875rem] leading-tight text-ink">{title}</h1>
        {intro && <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">{intro}</p>}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </header>
  );
}

export function Panel({
  kicker,
  title,
  intro,
  action,
  tone = 'plain',
  children,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  tone?: 'plain' | 'warm' | 'clay';
  children: React.ReactNode;
}) {
  return (
    <section
      className={clsx(
        'border',
        tone === 'plain' && 'border-rule bg-paper',
        tone === 'warm' && 'border-rule bg-paper-warm',
        tone === 'clay' && 'border-clay/30 bg-clay-wash',
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-4">
        <div className="min-w-0">
          {kicker && (
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
              {kicker}
            </p>
          )}
          <h2 className="mt-1 font-display text-[1.25rem] leading-snug text-ink">{title}</h2>
          {intro && <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{intro}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}

const STATUS_STYLE: Record<string, string> = {
  published: 'border-verdict-buy text-verdict-buy',
  scheduled: 'border-verdict-watch text-verdict-watch',
  draft: 'border-ink-faint text-ink-faint',
  new: 'border-clay text-clay',
  reviewing: 'border-verdict-watch text-verdict-watch',
  accepted: 'border-verdict-buy text-verdict-buy',
  declined: 'border-verdict-skip text-verdict-skip',
  confirmed: 'border-verdict-buy text-verdict-buy',
  pending: 'border-verdict-watch text-verdict-watch',
  unsubscribed: 'border-ink-faint text-ink-faint',
  replied: 'border-verdict-buy text-verdict-buy',
  closed: 'border-ink-faint text-ink-faint',
  buy: 'border-verdict-buy text-verdict-buy',
  watch: 'border-verdict-watch text-verdict-watch',
  wait: 'border-verdict-wait text-verdict-wait',
  skip: 'border-verdict-skip text-verdict-skip',
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <span
      className={clsx(
        'inline-block whitespace-nowrap border px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em]',
        STATUS_STYLE[value] ?? 'border-rule text-ink-soft',
      )}
    >
      {value}
    </span>
  );
}

export function Stat({
  label,
  value,
  href,
  note,
}: {
  label: string;
  value: number;
  href?: string;
  note?: string;
}) {
  const inner = (
    <>
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <p className="mt-1 font-display text-[1.75rem] leading-none tabular-nums text-ink">{value}</p>
      {note && <p className="mt-1 text-[0.75rem] leading-snug text-ink-faint">{note}</p>}
    </>
  );

  const className =
    'block border border-rule bg-paper-warm px-4 py-3 transition-colors hover:border-ink';

  return href ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}

export function DataTable({
  head,
  children,
}: {
  head: { label: string; width?: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-rule">
            {head.map((cell) => (
              <th
                key={cell.label}
                scope="col"
                style={cell.width ? { width: cell.width } : undefined}
                className="whitespace-nowrap px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint"
              >
                {cell.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">{children}</tbody>
      </table>
    </div>
  );
}

export function Nothing({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-5 py-8 text-center text-[0.875rem] italic text-ink-faint">{children}</p>
  );
}

export function formatDate(value: string | undefined): string {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export const PUBLISH_STATUSES: PublishStatus[] = ['draft', 'scheduled', 'published'];

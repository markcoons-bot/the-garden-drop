'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';

export interface NavItem {
  href: string;
  label: string;
  /** Rendered on the right of the row — a row count, usually. */
  badge?: number;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export function AdminNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="space-y-7">
      {groups.map((group) => (
        <div key={group.heading}>
          <p className="mb-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
            {group.heading}
          </p>
          <ul>
            {group.items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(`${item.href}/`));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={clsx(
                      'flex items-baseline justify-between gap-2 border-l-2 py-1.5 pl-3 pr-2 text-[0.9375rem] leading-tight transition-colors',
                      active
                        ? 'border-clay bg-clay-wash/60 text-ink'
                        : 'border-transparent text-ink-soft hover:border-rule hover:text-ink',
                    )}
                  >
                    <span>{item.label}</span>
                    {typeof item.badge === 'number' && (
                      <span className="font-mono text-[0.6875rem] tabular-nums text-ink-faint">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onLogout() {
    setBusy(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={busy}
      className="w-full border border-rule bg-paper px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
    >
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  );
}

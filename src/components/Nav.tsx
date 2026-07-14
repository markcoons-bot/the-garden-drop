'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import siteConfig from '~/site.config';

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 border-b transition-colors duration-500',
        scrolled ? 'border-rule bg-paper/92 backdrop-blur-md' : 'border-transparent bg-paper',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:sr-only-focusable absolute left-4 top-3 z-50 bg-ink text-paper"
      >
        Skip to content
      </a>

      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="group flex items-baseline gap-2" aria-label={`${siteConfig.name} — home`}>
          <span className="font-display text-[1.375rem] leading-none tracking-tight text-ink">
            {siteConfig.nameParts.lead}{' '}
            <span className="italic text-clay">{siteConfig.nameParts.accent}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'font-mono text-[0.75rem] uppercase tracking-[0.12em] transition-colors',
                  active ? 'text-clay' : 'text-ink-soft hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/#subscribe" className="btn-primary py-2.5 text-[0.6875rem]">
            {siteConfig.cta.primary}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center border border-rule md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={clsx('block h-px w-5 bg-ink transition-transform', open && 'translate-y-[3px] rotate-45')}
            />
            <span
              className={clsx('block h-px w-5 bg-ink transition-transform', open && '-translate-y-[3px] -rotate-45')}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary (mobile)" className="border-t border-rule bg-paper md:hidden">
          <div className="shell flex flex-col py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-rule py-4 font-display text-[1.5rem] text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/submit" className="border-b border-rule py-4 font-display text-[1.5rem] text-ink">
              Submit something new
            </Link>
            <Link href="/#subscribe" className="btn-primary mt-6">
              {siteConfig.cta.primary}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Nav;

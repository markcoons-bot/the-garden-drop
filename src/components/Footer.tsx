import Link from 'next/link';
import siteConfig from '~/site.config';

export function Footer() {
  return (
    <footer className="mt-section border-t border-rule bg-paper-warm">
      <div className="shell grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-5 md:py-20">
        <div className="col-span-2 md:col-span-2">
          <p className="font-display text-[1.75rem] leading-tight text-ink">
            {siteConfig.nameParts.lead} <span className="italic text-clay">{siteConfig.nameParts.accent}</span>
          </p>
          <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-ink-soft">
            {siteConfig.positioning}
          </p>
          <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
            {siteConfig.cadence} · Free
          </p>
        </div>

        {siteConfig.footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className="kicker mb-4">{group.heading}</h2>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[0.9375rem] text-ink-soft transition-colors hover:text-clay">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-meta text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}. Photography is placeholder stock, clearly
            credited, pending our own commissions.
          </p>
          <p className="text-meta text-ink-faint">
            <Link href="/about#corrections" className="link-quiet">
              Corrections
            </Link>
            <span className="mx-3 opacity-40">·</span>
            <a href={`mailto:${siteConfig.email.hello}`} className="link-quiet">
              {siteConfig.email.hello}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

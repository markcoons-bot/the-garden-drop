import type { Metadata } from 'next';
import siteConfig from '~/site.config';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import './globals.css';

/**
 * TYPOGRAPHY
 *
 * Fraunces (display) · Inter (body) · IBM Plex Mono (kickers and meta).
 *
 * Loaded at RUNTIME from Google Fonts rather than at build time via
 * `next/font/google`, deliberately: `next/font` fetches the font files during
 * `next build`, so a flaky connection — or an offline machine — fails the whole
 * build. This publication has to be able to build on a train.
 *
 * The CSS variables below are what tailwind.config.ts reads, and each has a
 * system fallback, so the site is fully legible even if Google is unreachable.
 *
 * FOR PRODUCTION: swap this for `next/font/google` (self-hosts the files, kills
 * the extra round trip, and eliminates the flash). It is a three-line change and
 * the variable names do not move. See README → Typography.
 */
const FONT_CSS =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..700,0..100,0..1&family=Inter:wght@300..700&family=IBM+Plex+Mono:wght@400;500&display=swap';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.positioning,
  keywords: [
    'new plant varieties',
    'new cultivars',
    'plant breeders',
    'gardening techniques',
    'plant reviews',
    'USDA zones',
    'nativars',
    'horticulture',
  ],
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.positioning,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.positioning,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_CSS} />
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `:root{
              --font-display:'Fraunces',ui-serif,Georgia,'Times New Roman',serif;
              --font-sans:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;
              --font-mono:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
            }`,
          }}
        />
      </head>
      <body className="min-h-screen bg-paper text-ink">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

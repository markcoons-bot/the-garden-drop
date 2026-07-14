/**
 * ANALYTICS — integration points, not an analytics stack.
 *
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN or NEXT_PUBLIC_POSTHOG_KEY and the script
 * loads (see src/components/Analytics.tsx). With neither set, `track()` is a
 * no-op in production and a console line in development, so you can watch the
 * event stream while you build.
 *
 * The six events the publication actually cares about are enumerated below.
 * Do not add a seventh without a reason.
 */

export type DropEvent =
  | 'newsletter_signup'
  | 'plant_view'
  | 'technique_view'
  | 'retail_link_click'
  | 'submission_complete'
  | 'issue_read_depth';

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    posthog?: { capture: (event: string, props?: Props) => void };
  }
}

export function track(event: DropEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return;

  window.plausible?.(event, { props });
  window.posthog?.capture(event, props);

  if (process.env.NODE_ENV === 'development' && !window.plausible && !window.posthog) {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${event}`, props);
  }
}

/**
 * Issue reading depth: fires once per quartile. Attach to the issue page.
 * Returns a cleanup function.
 */
export function trackReadingDepth(issueSlug: string): () => void {
  if (typeof window === 'undefined') return () => {};
  const fired = new Set<number>();

  const onScroll = () => {
    const doc = document.documentElement;
    const scrolled = window.scrollY + window.innerHeight;
    const total = doc.scrollHeight;
    if (total <= 0) return;
    const pct = Math.min(100, Math.round((scrolled / total) * 100));

    for (const mark of [25, 50, 75, 100]) {
      if (pct >= mark && !fired.has(mark)) {
        fired.add(mark);
        track('issue_read_depth', { issue: issueSlug, depth: mark });
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}

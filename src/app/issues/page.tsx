import type { Metadata } from 'next';
import { getIssues } from '@/lib/db';
import { Kicker, EmptyState } from '@/components/ui';
import NewsletterBlock from '@/components/NewsletterBlock';
import { IssueFilters } from '@/components/IssueFilters';
import siteConfig from '~/site.config';

export const metadata: Metadata = {
  title: 'Issue archive',
  description:
    'Every issue of The Garden Drop. The website is the permanent, searchable knowledge base; the newsletter is how each issue finds you.',
};

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <>
      <section className="border-b border-rule py-16 md:py-24">
        <div className="shell grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Kicker tone="clay">The archive</Kicker>
            <h1 className="mt-5 text-display-lg">Every issue, permanently.</h1>
            <p className="mt-6 max-w-prose text-lede text-ink-soft">
              The newsletter arrives {siteConfig.cadence.toLowerCase()} and is read once. This is where
              it lives afterwards — searchable, filterable, and corrected in public when we get
              something wrong.
            </p>
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="shell">
          {issues.length === 0 ? (
            <EmptyState
              title="No issues published yet"
              body="The first issue is being edited. Put your email in and it will land in your inbox the day it goes out."
              action={{ label: siteConfig.cta.primary, href: '/#subscribe' }}
            />
          ) : (
            <IssueFilters issues={issues} />
          )}
        </div>
      </section>

      <NewsletterBlock source="issues_index" />
    </>
  );
}

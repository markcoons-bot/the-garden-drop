import { list, getStory, getPlants, getTechniques } from '@/lib/db';
import { issueEmail, mailer } from '@/lib/email';
import type { Issue } from '@/lib/types';
import { requireAdmin } from '../guard';
import { AdminHeader, Nothing } from '../ui';
import { NewsletterStudio, type IssueOption } from './NewsletterStudio';

export const dynamic = 'force-dynamic';

const label = (issue: Issue) => `Issue ${String(issue.number).padStart(2, '0')} — ${issue.title}`;

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ issue?: string }>;
}) {
  await requireAdmin('/admin/newsletter');

  const { issue: requested } = await searchParams;

  const all = (await list('issues')).slice().sort((a, b) => b.number - a.number);
  const published = all.filter((i) => i.status === 'published');
  const unpublished = all.filter((i) => i.status !== 'published');

  const chosen =
    all.find((i) => i.slug === requested) ?? published[0] ?? all[0] ?? null;

  if (!chosen) {
    return (
      <div>
        <AdminHeader
          kicker="Newsletter"
          title="The issue email"
          intro="There is nothing to send yet."
        />
        <div className="border border-rule bg-paper">
          <Nothing>No issues exist. Write one first — Issues → New issue.</Nothing>
        </div>
      </div>
    );
  }

  const [plants, techniques, story] = await Promise.all([
    getPlants({ includeDrafts: true }),
    getTechniques({ includeDrafts: true }),
    getStory(chosen.leadStorySlug),
  ]);

  const mail = issueEmail(chosen, { plants, techniques, story: story ?? undefined });

  const toOption = (i: Issue): IssueOption => ({
    slug: i.slug,
    label: label(i),
    status: i.status,
  });

  return (
    <div>
      <AdminHeader
        kicker="Newsletter"
        title="The issue email"
        intro="The same issue, rendered as a table-based HTML email that survives Outlook. Preview it, read the plain-text version, send yourself a test, then take the HTML to Resend."
      />

      <NewsletterStudio
        published={published.map(toOption)}
        unpublished={unpublished.map(toOption)}
        selected={chosen.slug}
        subject={mail.subject}
        html={mail.html}
        text={mail.text}
        mailer={mailer}
      />
    </div>
  );
}

import Link from 'next/link';
import { backend, list } from '@/lib/db';
import { ENTITIES } from '@/lib/entities';
import type { Issue, Plant, Story, Subscriber, Submission, Technique } from '@/lib/types';
import { requireAdmin } from './guard';
import { AdminHeader, DataTable, Nothing, Panel, Stat, StatusBadge, formatDate } from './ui';
import { ResetButton } from './ResetButton';
import siteConfig from '~/site.config';

export const dynamic = 'force-dynamic';

/** Anything not yet public, from any of the four editorial tables. */
interface PendingItem {
  id: string;
  title: string;
  kind: string;
  status: string;
  href: string;
  when?: string;
}

/** One line of the editorial to-do list, with the issue it belongs to. */
interface ResearchItem {
  issueNumber: number;
  issueTitle: string;
  issueSlug: string;
  issueId: string;
  issueStatus: string;
  item: string;
}

export default async function AdminDashboard() {
  await requireAdmin('/admin');

  const [issues, stories, plants, techniques, experts, sources, retailLinks, subscribers, submissions, partners] =
    await Promise.all([
      list('issues'),
      list('stories'),
      list('plants'),
      list('techniques'),
      list('experts'),
      list('sources'),
      list('retailLinks'),
      list('subscribers'),
      list('submissions'),
      list('partnerEnquiries'),
    ]);

  const counts: Record<string, number> = {
    issues: issues.length,
    stories: stories.length,
    plants: plants.length,
    techniques: techniques.length,
    experts: experts.length,
    sources: sources.length,
    retailLinks: retailLinks.length,
    subscribers: subscribers.length,
    submissions: submissions.length,
    partnerEnquiries: partners.length,
  };

  // --- The queue ------------------------------------------------------------
  const isPending = (s: string) => s === 'draft' || s === 'scheduled';

  const pending: PendingItem[] = [
    ...issues.filter((i: Issue) => isPending(i.status)).map((i: Issue) => ({
      id: i.id,
      title: `Issue ${String(i.number).padStart(2, '0')} — ${i.title}`,
      kind: 'Issue',
      status: i.status,
      href: `/admin/issues/${i.id}`,
      when: i.publishDate,
    })),
    ...stories.filter((s: Story) => isPending(s.status)).map((s: Story) => ({
      id: s.id,
      title: s.title,
      kind: 'Story',
      status: s.status,
      href: `/admin/stories/${s.id}`,
    })),
    ...plants.filter((p: Plant) => isPending(p.status)).map((p: Plant) => ({
      id: p.id,
      title: p.commonName,
      kind: 'Plant',
      status: p.status,
      href: `/admin/plants/${p.id}`,
    })),
    ...techniques.filter((t: Technique) => isPending(t.status)).map((t: Technique) => ({
      id: t.id,
      title: t.name,
      kind: 'Technique',
      status: t.status,
      href: `/admin/techniques/${t.id}`,
    })),
  ].sort((a, b) => (a.status === b.status ? a.kind.localeCompare(b.kind) : a.status < b.status ? 1 : -1));

  // --- The editorial to-do list --------------------------------------------
  const research: ResearchItem[] = issues
    .slice()
    .sort((a: Issue, b: Issue) => a.number - b.number)
    .flatMap((issue: Issue) =>
      issue.researchRequired.map((item) => ({
        issueNumber: issue.number,
        issueTitle: issue.title,
        issueSlug: issue.slug,
        issueId: issue.id,
        issueStatus: issue.status,
        item,
      })),
    );

  const unpublishedResearch = research.filter((r) => r.issueStatus !== 'published').length;

  // --- Recent audience ------------------------------------------------------
  const byNewest = <T extends { createdAt: string }>(rows: T[]): T[] =>
    rows.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const recentSubmissions: Submission[] = byNewest(submissions).slice(0, 5);
  const recentSubscribers: Subscriber[] = byNewest(subscribers).slice(0, 5);

  return (
    <div className="space-y-10">
      <AdminHeader
        kicker="Dashboard"
        title="The desk"
        intro={`${siteConfig.cadence}. Everything below is what stands between the current draft and an issue we would be willing to defend.`}
        action={backend === 'local' ? <ResetButton /> : undefined}
      />

      {/* Counts ------------------------------------------------------------ */}
      <section aria-labelledby="counts-heading">
        <h2 id="counts-heading" className="sr-only">
          Record counts
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ENTITIES.map((entity) => (
            <Stat
              key={entity.key}
              label={entity.label}
              value={counts[entity.key] ?? 0}
              href={`/admin/${entity.slug}`}
            />
          ))}
        </div>
      </section>

      {/* Research required — the most useful screen in the product ---------- */}
      <Panel
        tone="clay"
        kicker="The editorial to-do list"
        title={siteConfig.policy.researchRequired}
        intro={`${research.length} open item${research.length === 1 ? '' : 's'} across ${
          issues.length
        } issues — ${unpublishedResearch} of them in an issue that has not shipped yet. We print this list on the public site rather than quietly filling the gaps, which means every line here is a promise we have made in public.`}
      >
        {research.length === 0 ? (
          <Nothing>
            Nothing outstanding. That has never once been true, so check that the issues are loading.
          </Nothing>
        ) : (
          <ul className="divide-y divide-clay/20">
            {research.map((row, i) => (
              <li key={`${row.issueId}-${i}`} className="flex gap-4 px-5 py-4">
                <span className="w-6 shrink-0 pt-0.5 font-mono text-[0.6875rem] tabular-nums text-clay">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.9375rem] leading-relaxed text-ink">{row.item}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                    <Link
                      href={`/admin/issues/${row.issueId}`}
                      className="underline decoration-clay/40 underline-offset-4 hover:text-clay"
                    >
                      Issue {String(row.issueNumber).padStart(2, '0')} · {row.issueTitle}
                    </Link>
                    <StatusBadge value={row.issueStatus} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {/* Draft + scheduled -------------------------------------------------- */}
      <Panel
        kicker="Not yet public"
        title="In draft or scheduled"
        intro="Every record across issues, stories, plants and techniques that a reader cannot see."
      >
        {pending.length === 0 ? (
          <Nothing>Everything is published. Enjoy it; it will not last.</Nothing>
        ) : (
          <DataTable
            head={[
              { label: 'Title' },
              { label: 'Type', width: '7rem' },
              { label: 'Status', width: '7rem' },
              { label: 'Date', width: '8rem' },
              { label: '', width: '4rem' },
            ]}
          >
            {pending.map((row) => (
              <tr key={`${row.kind}-${row.id}`} className="hover:bg-paper-warm">
                <td className="px-5 py-3 text-[0.9375rem] text-ink">{row.title}</td>
                <td className="px-5 py-3 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink-faint">
                  {row.kind}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge value={row.status} />
                </td>
                <td className="px-5 py-3 font-mono text-[0.75rem] text-ink-faint">
                  {formatDate(row.when)}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={row.href}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-clay underline decoration-clay/30 underline-offset-4 hover:decoration-clay"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>

      {/* Audience ----------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel
          kicker="Inbound"
          title="Latest submissions"
          intro="Breeders and readers telling us what is new. Nothing here is a fact until a source exists."
          action={
            <Link
              href="/admin/submissions"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-clay underline decoration-clay/30 underline-offset-4 hover:decoration-clay"
            >
              All {counts.submissions} →
            </Link>
          }
        >
          {recentSubmissions.length === 0 ? (
            <Nothing>No submissions yet. The form is at /submit.</Nothing>
          ) : (
            <ul className="divide-y divide-rule">
              {recentSubmissions.map((s) => (
                <li key={s.id} className="px-5 py-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <Link
                      href={`/admin/submissions/${s.id}`}
                      className="truncate text-[0.9375rem] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                    >
                      {s.subjectName}
                    </Link>
                    <StatusBadge value={s.status} />
                  </div>
                  <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                    {s.subjectKind} · {s.submitterName}
                    {s.company ? ` · ${s.company}` : ''} · {formatDate(s.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          kicker="Inbound"
          title="Latest subscribers"
          intro="Single opt-in. The welcome email goes out on the first signup only."
          action={
            <Link
              href="/admin/subscribers"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-clay underline decoration-clay/30 underline-offset-4 hover:decoration-clay"
            >
              All {counts.subscribers} →
            </Link>
          }
        >
          {recentSubscribers.length === 0 ? (
            <Nothing>Nobody yet. Subscribe from the home page to see this fill up.</Nothing>
          ) : (
            <ul className="divide-y divide-rule">
              {recentSubscribers.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-3 px-5 py-3.5">
                  <span className="min-w-0">
                    <Link
                      href={`/admin/subscribers/${s.id}`}
                      className="block truncate font-mono text-[0.875rem] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                    >
                      {s.email}
                    </Link>
                    <span className="mt-1 block font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-faint">
                      {s.zone ? `Zone ${s.zone}` : 'Zone unknown'} · {s.source} ·{' '}
                      {formatDate(s.createdAt)}
                    </span>
                  </span>
                  <StatusBadge value={s.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}

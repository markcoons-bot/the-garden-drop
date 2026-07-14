'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import type { Issue, IssueTag } from '@/lib/types';
import { IssueCard } from './cards';
import { EmptyState } from './ui';

const TAGS: { value: IssueTag | 'all'; label: string }[] = [
  { value: 'all', label: 'Everything' },
  { value: 'plants', label: 'Plants' },
  { value: 'techniques', label: 'Techniques' },
  { value: 'climate', label: 'Climate' },
  { value: 'edible', label: 'Edible' },
  { value: 'ornamental', label: 'Ornamental' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
];

export function IssueFilters({ issues }: { issues: Issue[] }) {
  const [tag, setTag] = useState<IssueTag | 'all'>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return issues.filter((issue) => {
      const tagOk = tag === 'all' || issue.tags.includes(tag);
      const textOk =
        !q ||
        issue.title.toLowerCase().includes(q) ||
        issue.standfirst.toLowerCase().includes(q) ||
        issue.editorsIntro.toLowerCase().includes(q) ||
        issue.discoveries.some(
          (d) => d.title.toLowerCase().includes(q) || d.body.toLowerCase().includes(q),
        );
      return tagOk && textOk;
    });
  }, [issues, tag, query]);

  return (
    <div>
      <div className="mb-12 flex flex-col gap-6 border-b border-rule pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="label">Filter by subject</span>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTag(t.value)}
                aria-pressed={tag === t.value}
                className={clsx(
                  'border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors',
                  tag === t.value
                    ? 'border-ink bg-ink text-paper'
                    : 'border-rule text-ink-soft hover:border-ink hover:text-ink',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-72">
          <label htmlFor="issue-search" className="label">
            Search the archive
          </label>
          <input
            id="issue-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="hydrangea, biochar, chill hours…"
            className="field"
          />
        </div>
      </div>

      <p aria-live="polite" className="mb-8 font-mono text-meta uppercase tracking-[0.1em] text-ink-faint">
        {filtered.length} {filtered.length === 1 ? 'issue' : 'issues'}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nothing matches that combination"
          body="Try a broader filter, or clear the search. The current issue is usually the answer anyway."
          action={{ label: 'Clear filters', href: '/issues' }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}

export default IssueFilters;

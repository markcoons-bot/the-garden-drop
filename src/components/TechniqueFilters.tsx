'use client';

/**
 * TECHNIQUE FILTERS.
 *
 * The technique index is small and will stay small — we only publish a method
 * once we have read the evidence on it — so everything filters and sorts in
 * memory. Native controls, real labels, a live count.
 */

import { useMemo, useState } from 'react';
import { TechniqueCard } from '@/components/cards';
import { EmptyState } from '@/components/ui';
import {
  EVIDENCE_LABEL,
  VERDICT_LABEL,
  type EvidenceLevel,
  type Technique,
  type Verdict,
} from '@/lib/types';

type MaxHype = 'any' | '3' | '2';
type SortKey = 'evidence' | 'hype' | 'alpha';

interface FilterState {
  q: string;
  evidence: string;
  verdict: string;
  maxHype: MaxHype;
  sort: SortKey;
}

const EMPTY_FILTERS: FilterState = {
  q: '',
  evidence: '',
  verdict: '',
  maxHype: 'any',
  sort: 'evidence',
};

const isMaxHype = (v: string): v is MaxHype => v === 'any' || v === '3' || v === '2';
const isSortKey = (v: string): v is SortKey =>
  v === 'evidence' || v === 'hype' || v === 'alpha';

const haystack = (t: Technique): string =>
  [t.name, t.standfirst, t.whatItIs, t.problemItClaimsToSolve].join(' ').toLowerCase();

export default function TechniqueFilters({ techniques }: { techniques: Technique[] }) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const options = useMemo(() => {
    const levels = Array.from(new Set(techniques.map((t) => t.evidenceLevel)));
    const verdicts = Array.from(new Set(techniques.map((t) => t.verdict)));
    return { levels, verdicts };
  }, [techniques]);

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const hypeCeiling = filters.maxHype === 'any' ? null : Number(filters.maxHype);

    const filtered = techniques.filter((technique) => {
      if (q && !haystack(technique).includes(q)) return false;
      if (filters.evidence && technique.evidenceLevel !== filters.evidence) return false;
      if (filters.verdict && technique.verdict !== filters.verdict) return false;
      if (hypeCeiling !== null && technique.scores.hypeRisk.score > hypeCeiling) return false;
      return true;
    });

    const byName = (a: Technique, b: Technique) => a.name.localeCompare(b.name);

    return filtered.slice().sort((a, b) => {
      if (filters.sort === 'alpha') return byName(a, b);
      if (filters.sort === 'hype') {
        // Least hype first — the axis runs backwards, so this is "best first".
        return a.scores.hypeRisk.score - b.scores.hypeRisk.score || byName(a, b);
      }
      return b.scores.evidenceStrength.score - a.scores.evidenceStrength.score || byName(a, b);
    });
  }, [techniques, filters]);

  const isFiltered = useMemo(
    () =>
      (Object.keys(EMPTY_FILTERS) as (keyof FilterState)[]).some(
        (k) => filters[k] !== EMPTY_FILTERS[k],
      ),
    [filters],
  );

  const count =
    results.length === 0
      ? 'No techniques match'
      : results.length === 1
        ? '1 technique'
        : `${results.length} techniques`;

  return (
    <div>
      {/* ------------------------------------------------------------------ */}
      {/* CONTROLS                                                            */}
      {/* ------------------------------------------------------------------ */}
      <form
        role="search"
        aria-label="Filter the technique index"
        onSubmit={(e) => e.preventDefault()}
        className="border-y border-rule bg-paper-warm px-6 py-8 md:px-10 md:py-10"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label className="label" htmlFor="technique-q">
              Search
            </label>
            <input
              id="technique-q"
              type="search"
              className="field"
              placeholder="Biochar, no-dig, compost tea, deficit irrigation…"
              value={filters.q}
              onChange={(e) => set('q', e.target.value)}
            />
          </div>

          <div>
            <label className="label" htmlFor="technique-evidence">
              Evidence level
            </label>
            <select
              id="technique-evidence"
              className="field"
              value={filters.evidence}
              onChange={(e) => set('evidence', e.target.value)}
            >
              <option value="">Any evidence level</option>
              {options.levels.map((level: EvidenceLevel) => (
                <option key={level} value={level}>
                  {EVIDENCE_LABEL[level]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="technique-verdict">
              Verdict
            </label>
            <select
              id="technique-verdict"
              className="field"
              value={filters.verdict}
              onChange={(e) => set('verdict', e.target.value)}
            >
              <option value="">Any verdict</option>
              {options.verdicts.map((verdict: Verdict) => (
                <option key={verdict} value={verdict}>
                  {VERDICT_LABEL[verdict]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="technique-hype">
              Maximum hype risk
            </label>
            <select
              id="technique-hype"
              className="field"
              value={filters.maxHype}
              onChange={(e) => {
                const v = e.target.value;
                if (isMaxHype(v)) set('maxHype', v);
              }}
            >
              <option value="any">Any hype risk</option>
              <option value="3">Hype risk 3 or less</option>
              <option value="2">Hype risk 2 or less</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="technique-sort">
              Sort by
            </label>
            <select
              id="technique-sort"
              className="field"
              value={filters.sort}
              onChange={(e) => {
                const v = e.target.value;
                if (isSortKey(v)) set('sort', v);
              }}
            >
              <option value="evidence">Evidence strength (strongest first)</option>
              <option value="hype">Hype risk (lowest first)</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live="polite"
            aria-atomic="true"
            className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-ink"
          >
            {count}
            {isFiltered && (
              <span className="text-ink-faint"> · filtered from {techniques.length}</span>
            )}
          </p>

          <button
            type="button"
            className="btn-secondary self-start disabled:cursor-default disabled:opacity-40 disabled:hover:border-ink/25 disabled:hover:bg-transparent disabled:hover:text-ink sm:self-auto"
            onClick={() => setFilters(EMPTY_FILTERS)}
            disabled={!isFiltered}
          >
            Clear all
          </button>
        </div>
      </form>

      {/* ------------------------------------------------------------------ */}
      {/* RESULTS                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="mt-14 md:mt-20">
        {results.length === 0 ? (
          <EmptyState
            title="Nothing matches that combination"
            body="We only publish a technique once we have read the evidence on it, so the index is deliberately short. Clear the filters and read the whole record."
            action={{ label: 'Clear the filters', href: '/techniques' }}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
            {results.map((technique) => (
              <li key={technique.id} className="flex">
                <TechniqueCard technique={technique} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

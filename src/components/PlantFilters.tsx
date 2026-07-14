'use client';

/**
 * PLANT FILTERS — the only interactive part of the plant index.
 *
 * The server hands us every published plant. All filtering happens here, in
 * memory: no page reloads, no query round-trips, no spinner. The controls are
 * native <select> and <input> elements on purpose — they are keyboard- and
 * screen-reader-native, and they work on a phone without us reinventing them.
 */

import { useMemo, useState } from 'react';
import { PlantCard } from '@/components/cards';
import { EmptyState } from '@/components/ui';
import type { Availability, Plant, PlantType, Sun, Water } from '@/lib/types';

// ---------------------------------------------------------------------------
// Zone parsing
//
// Zone strings are written by people, not machines: 'USDA 5b–9',
// 'USDA 6a–10', 'USDA 9a only', 'Hardy to −23 °C (≈ USDA Zone 5)',
// 'Not published by the introducer', 'Annual'. We extract the zones a plant
// actually covers, and — importantly — return an EMPTY set when the introducer
// has not published one. A plant with no published range is set aside from a
// zone search rather than quietly guessed into it.
// ---------------------------------------------------------------------------

const ZONES = [3, 4, 5, 6, 7, 8, 9, 10] as const;
const ZONE_MIN = 3;
const ZONE_MAX = 10;

/** Any dash a horticulturist might type. */
const DASH = '[\\u2013\\u2014\\u2212-]';
const RANGE_RE = new RegExp(`(\\d{1,2})\\s*[ab]?\\s*${DASH}\\s*(\\d{1,2})\\s*[ab]?`, 'g');
const SINGLE_RE = /(?:zone|usda)\s*(\d{1,2})/i;

export function zonesCovered(zones: string): Set<number> {
  const out = new Set<number>();
  const text = zones.trim();
  if (!text) return out;

  // An annual is grown for one season and then it is over. Any zone will do.
  if (/^annual\b/i.test(text)) {
    for (const z of ZONES) out.add(z);
    return out;
  }

  // Explicit refusals to state a figure. We honour them.
  if (/not published|not applicable|unverified|not stated/i.test(text)) return out;

  RANGE_RE.lastIndex = 0;
  let match: RegExpExecArray | null = RANGE_RE.exec(text);
  while (match !== null) {
    const lo = Number(match[1]);
    const hi = Number(match[2]);
    if (Number.isFinite(lo) && Number.isFinite(hi)) {
      const from = Math.max(ZONE_MIN, Math.min(lo, hi));
      const to = Math.min(ZONE_MAX, Math.max(lo, hi));
      for (let z = from; z <= to; z += 1) out.add(z);
    }
    match = RANGE_RE.exec(text);
  }
  if (out.size > 0) return out;

  // No range: a single stated zone. 'Hardy to … Zone 5' means 5 and warmer.
  const single = SINGLE_RE.exec(text);
  if (single) {
    const z = Number(single[1]);
    if (Number.isFinite(z) && z >= ZONE_MIN && z <= ZONE_MAX) {
      if (/hardy to|and warmer|or warmer/i.test(text)) {
        for (let x = z; x <= ZONE_MAX; x += 1) out.add(x);
      } else {
        out.add(z);
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

const TYPE_LABEL: Record<PlantType, string> = {
  shrub: 'Shrub',
  perennial: 'Perennial',
  annual: 'Annual',
  rose: 'Rose',
  tree: 'Tree',
  fruit: 'Fruit',
  vegetable: 'Vegetable',
  herb: 'Herb',
  grass: 'Grass',
  vine: 'Vine',
  bulb: 'Bulb',
};

const SUN_LABEL: Record<Sun, string> = {
  full: 'Full sun',
  part: 'Part sun',
  shade: 'Shade',
  'full-to-part': 'Full sun to part shade',
  'part-to-shade': 'Part shade to shade',
};

const WATER_LABEL: Record<Water, string> = {
  low: 'Low water',
  average: 'Average water',
  high: 'High water',
};

const AVAILABILITY_LABEL: Record<Availability, string> = {
  retail: 'In retail',
  limited: 'Limited release',
  'trade-only': 'Trade only',
  'commercial-only': 'Commercial growers only',
  'not-yet': 'Not yet released',
};

const NATIVE_LABEL: Record<Plant['nativeStatus'], string> = {
  native: 'Native species',
  'cultivar-of-native': 'Cultivar of a native',
  'non-native': 'Non-native',
  hybrid: 'Hybrid',
};

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

type UseFilter = 'any' | 'edible' | 'ornamental';
type ContainerFilter = 'any' | 'yes' | 'no' | 'unverified';

interface FilterState {
  q: string;
  type: string;
  zone: string;
  sun: string;
  water: string;
  use: UseFilter;
  container: ContainerFilter;
  native: string;
  availability: string;
  year: string;
}

const EMPTY_FILTERS: FilterState = {
  q: '',
  type: '',
  zone: '',
  sun: '',
  water: '',
  use: 'any',
  container: 'any',
  native: '',
  availability: '',
  year: '',
};

const isUseFilter = (v: string): v is UseFilter =>
  v === 'any' || v === 'edible' || v === 'ornamental';

const isContainerFilter = (v: string): v is ContainerFilter =>
  v === 'any' || v === 'yes' || v === 'no' || v === 'unverified';

const haystack = (p: Plant): string =>
  [p.commonName, p.botanicalName, p.cultivar ?? '', p.tradeName ?? '', p.breeder]
    .join(' ')
    .toLowerCase();

// ---------------------------------------------------------------------------

export default function PlantFilters({ plants }: { plants: Plant[] }) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  // Option lists are derived from the data, so the index can never offer a
  // filter that returns nothing at all.
  const options = useMemo(() => {
    const types = Array.from(new Set(plants.map((p) => p.type))).sort((a, b) =>
      TYPE_LABEL[a].localeCompare(TYPE_LABEL[b]),
    );
    const suns = Array.from(new Set(plants.map((p) => p.sun))).sort();
    const waters = Array.from(new Set(plants.map((p) => p.water))).sort();
    const natives = Array.from(new Set(plants.map((p) => p.nativeStatus))).sort();
    const availabilities = Array.from(new Set(plants.map((p) => p.availability))).sort();
    const years = Array.from(new Set(plants.map((p) => p.releaseYear))).sort((a, b) => b - a);
    return { types, suns, waters, natives, availabilities, years };
  }, [plants]);

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const zone = filters.zone ? Number(filters.zone) : null;

    return plants.filter((plant) => {
      if (q && !haystack(plant).includes(q)) return false;
      if (filters.type && plant.type !== filters.type) return false;
      if (zone !== null && !zonesCovered(plant.zones).has(zone)) return false;
      if (filters.sun && plant.sun !== filters.sun) return false;
      if (filters.water && plant.water !== filters.water) return false;
      if (filters.use === 'edible' && !plant.edible) return false;
      if (filters.use === 'ornamental' && !plant.ornamental) return false;
      if (filters.container === 'yes' && plant.containerSuitable !== true) return false;
      if (filters.container === 'no' && plant.containerSuitable !== false) return false;
      if (filters.container === 'unverified' && plant.containerSuitable !== 'unverified') {
        return false;
      }
      if (filters.native && plant.nativeStatus !== filters.native) return false;
      if (filters.availability && plant.availability !== filters.availability) return false;
      if (filters.year && plant.releaseYear !== Number(filters.year)) return false;
      return true;
    });
  }, [plants, filters]);

  /**
   * When a zone is chosen, some plants are excluded not because they fail the
   * test but because nobody has published a range for them. We say so out loud.
   */
  const setAside = useMemo(() => {
    if (!filters.zone) return 0;
    return plants.filter((p) => zonesCovered(p.zones).size === 0).length;
  }, [plants, filters.zone]);

  const isFiltered = useMemo(
    () => (Object.keys(EMPTY_FILTERS) as (keyof FilterState)[]).some(
      (k) => filters[k] !== EMPTY_FILTERS[k],
    ),
    [filters],
  );

  const count =
    results.length === 0
      ? 'No plants match'
      : results.length === 1
        ? '1 plant'
        : `${results.length} plants`;

  return (
    <div>
      {/* ------------------------------------------------------------------ */}
      {/* CONTROLS                                                            */}
      {/* ------------------------------------------------------------------ */}
      <form
        role="search"
        aria-label="Filter the plant index"
        onSubmit={(e) => e.preventDefault()}
        className="border-y border-rule bg-paper-warm px-6 py-8 md:px-10 md:py-10"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <label className="label" htmlFor="plant-q">
              Search
            </label>
            <input
              id="plant-q"
              type="search"
              className="field"
              placeholder="Common name, botanical name, cultivar, breeder…"
              value={filters.q}
              onChange={(e) => set('q', e.target.value)}
            />
          </div>

          <div>
            <label className="label" htmlFor="plant-type">
              Plant type
            </label>
            <select
              id="plant-type"
              className="field"
              value={filters.type}
              onChange={(e) => set('type', e.target.value)}
            >
              <option value="">Any type</option>
              {options.types.map((t) => (
                <option key={t} value={t}>
                  {TYPE_LABEL[t]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="plant-zone">
              USDA zone
            </label>
            <select
              id="plant-zone"
              className="field"
              value={filters.zone}
              onChange={(e) => set('zone', e.target.value)}
            >
              <option value="">Any zone</option>
              {ZONES.map((z) => (
                <option key={z} value={String(z)}>
                  Zone {z}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="plant-sun">
              Sun
            </label>
            <select
              id="plant-sun"
              className="field"
              value={filters.sun}
              onChange={(e) => set('sun', e.target.value)}
            >
              <option value="">Any sun</option>
              {options.suns.map((s) => (
                <option key={s} value={s}>
                  {SUN_LABEL[s]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="plant-water">
              Water
            </label>
            <select
              id="plant-water"
              className="field"
              value={filters.water}
              onChange={(e) => set('water', e.target.value)}
            >
              <option value="">Any water need</option>
              {options.waters.map((w) => (
                <option key={w} value={w}>
                  {w === 'unverified' ? 'Unverified' : WATER_LABEL[w]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="plant-use">
              Edible or ornamental
            </label>
            <select
              id="plant-use"
              className="field"
              value={filters.use}
              onChange={(e) => {
                const v = e.target.value;
                if (isUseFilter(v)) set('use', v);
              }}
            >
              <option value="any">Either</option>
              <option value="edible">Edible</option>
              <option value="ornamental">Ornamental</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="plant-container">
              Container
            </label>
            <select
              id="plant-container"
              className="field"
              value={filters.container}
              onChange={(e) => {
                const v = e.target.value;
                if (isContainerFilter(v)) set('container', v);
              }}
            >
              <option value="any">Any</option>
              <option value="yes">Container suitable</option>
              <option value="no">Not for containers</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="plant-native">
              Native status
            </label>
            <select
              id="plant-native"
              className="field"
              value={filters.native}
              onChange={(e) => set('native', e.target.value)}
            >
              <option value="">Any status</option>
              {options.natives.map((n) => (
                <option key={n} value={n}>
                  {NATIVE_LABEL[n]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="plant-availability">
              Availability
            </label>
            <select
              id="plant-availability"
              className="field"
              value={filters.availability}
              onChange={(e) => set('availability', e.target.value)}
            >
              <option value="">Any availability</option>
              {options.availabilities.map((a) => (
                <option key={a} value={a}>
                  {AVAILABILITY_LABEL[a]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="plant-year">
              Release year
            </label>
            <select
              id="plant-year"
              className="field"
              value={filters.year}
              onChange={(e) => set('year', e.target.value)}
            >
              <option value="">Any year</option>
              {options.years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-ink"
            >
              {count}
              {isFiltered && (
                <span className="text-ink-faint"> · filtered from {plants.length}</span>
              )}
            </p>
            {setAside > 0 && (
              <p className="mt-2 max-w-prose text-meta leading-relaxed text-clay">
                {setAside === 1 ? '1 plant is' : `${setAside} plants are`} set aside from a zone
                search: the introducer does not publish a hardiness range, and we will not guess one.
              </p>
            )}
          </div>

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
            body="Every plant in the index is a real, verifiable introduction — there are simply not many of them yet. Clear the filters and start from the whole record."
            action={{ label: 'Clear the filters', href: '/plants' }}
          />
        ) : (
          <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((plant) => (
              <li key={plant.id} className="flex">
                <PlantCard plant={plant} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

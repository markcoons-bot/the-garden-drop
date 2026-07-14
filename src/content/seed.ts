/**
 * SEED — composes the whole database from the content files.
 *
 * Used by:
 *   • the local JSON store on first boot (src/lib/store.ts)
 *   • scripts/generate-seed-sql.ts, which emits supabase/seed.sql
 *
 * There is exactly one source of truth for editorial content and it is
 * src/content/*. Everything else is derived.
 */

import type { Category, Database, Region, RetailLink, Source } from '@/lib/types';
import { issues, stories } from './issues';
import { plants } from './plants';
import { techniques } from './techniques';
import { experts } from './experts';

const categories: Category[] = [
  { id: 'cat_shrub', slug: 'shrub', label: 'Shrubs', kind: 'plant-type' },
  { id: 'cat_perennial', slug: 'perennial', label: 'Perennials', kind: 'plant-type' },
  { id: 'cat_annual', slug: 'annual', label: 'Annuals', kind: 'plant-type' },
  { id: 'cat_rose', slug: 'rose', label: 'Roses', kind: 'plant-type' },
  { id: 'cat_tree', slug: 'tree', label: 'Trees', kind: 'plant-type' },
  { id: 'cat_fruit', slug: 'fruit', label: 'Fruit', kind: 'plant-type' },
  { id: 'cat_vegetable', slug: 'vegetable', label: 'Vegetables', kind: 'plant-type' },
  { id: 'cat_herb', slug: 'herb', label: 'Herbs', kind: 'plant-type' },
  { id: 'cat_grass', slug: 'grass', label: 'Grasses', kind: 'plant-type' },
  { id: 'cat_vine', slug: 'vine', label: 'Vines', kind: 'plant-type' },
  { id: 'cat_bulb', slug: 'bulb', label: 'Bulbs', kind: 'plant-type' },
  { id: 'cat_plants', slug: 'plants', label: 'Plants', kind: 'issue-tag' },
  { id: 'cat_techniques', slug: 'techniques', label: 'Techniques', kind: 'issue-tag' },
  { id: 'cat_climate', slug: 'climate', label: 'Climate', kind: 'issue-tag' },
  { id: 'cat_edible', slug: 'edible', label: 'Edible', kind: 'issue-tag' },
  { id: 'cat_ornamental', slug: 'ornamental', label: 'Ornamental', kind: 'issue-tag' },
  { id: 'cat_indoor', slug: 'indoor', label: 'Indoor', kind: 'issue-tag' },
  { id: 'cat_outdoor', slug: 'outdoor', label: 'Outdoor', kind: 'issue-tag' },
];

/**
 * Climate regions. Deliberately NOT a restatement of the USDA map — the whole
 * argument of Issue 02 is that the hardiness map measures the wrong season, so
 * our regions carry a heat note as well as a zone range.
 */
const regions: Region[] = [
  {
    id: 'reg_deep_south',
    slug: 'deep-south',
    label: 'Deep South & Gulf',
    zoneRange: 'USDA 8–10',
    note: 'Long, humid summers. Heat and disease pressure, not cold, are the limiting factors. Reblooming and heat-set breeding matters most here.',
  },
  {
    id: 'reg_mid_atlantic',
    slug: 'mid-atlantic',
    label: 'Mid-Atlantic',
    zoneRange: 'USDA 6–8',
    note: 'Humid August; Septoria and downy mildew country. Most of the independent nativar trial data comes from here — which is also its limitation.',
  },
  {
    id: 'reg_northeast',
    slug: 'northeast',
    label: 'Northeast & New England',
    zoneRange: 'USDA 4–6',
    note: 'Old-wood bloomers lose flowers in a hard winter. Bud hardiness, not stem hardiness, is the number that matters and almost nobody publishes it.',
  },
  {
    id: 'reg_midwest',
    slug: 'midwest',
    label: 'Midwest & Great Lakes',
    zoneRange: 'USDA 4–6',
    note: 'Continental extremes. Note Proven Winners’ own warning that some zone-6b plants suit mild coastal 6b and not harsh interior sites.',
  },
  {
    id: 'reg_mountain_west',
    slug: 'mountain-west',
    label: 'Mountain West & High Plains',
    zoneRange: 'USDA 3–6',
    note: 'Low humidity, intense radiation, late frosts. Kaolin and shade have a stronger case here than in humid regions.',
  },
  {
    id: 'reg_southwest',
    slug: 'southwest',
    label: 'Southwest & Desert',
    zoneRange: 'USDA 8–10',
    note: 'Where deficit irrigation and WaterSense controllers pay back fastest — and where biochar’s tropical-soil evidence is least irrelevant.',
  },
  {
    id: 'reg_pacific_nw',
    slug: 'pacific-northwest',
    label: 'Pacific Northwest',
    zoneRange: 'USDA 7–9',
    note: 'Cool summers mean shade cloth is of negative value — light is already the limiting factor. Slug pressure makes no-dig a harder sell.',
  },
  {
    id: 'reg_california',
    slug: 'california',
    label: 'California & Mediterranean',
    zoneRange: 'USDA 8–10',
    note: 'Low-chill fruit breeding is a live issue here, and chill accumulation is falling. The hardiness map is close to useless.',
  },
];

/** Sources and retail links are authored inline on plants, techniques and
 *  issues. We hoist them into their own tables so the admin can edit them
 *  once and so the Supabase schema is properly relational. */
function collectSources(): Source[] {
  const map = new Map<string, Source>();
  for (const p of plants) for (const src of p.sources) map.set(src.id, src);
  for (const t of techniques) for (const src of t.sources) map.set(src.id, src);
  for (const i of issues) for (const src of i.sources) map.set(src.id, src);
  for (const st of stories) for (const src of st.sources) map.set(src.id, src);
  return [...map.values()];
}

function collectRetailLinks(): RetailLink[] {
  const map = new Map<string, RetailLink>();
  for (const p of plants) {
    for (const l of p.whereToBuy) map.set(l.id, { ...l, plantSlug: p.slug });
  }
  return [...map.values()];
}

export function buildSeedDatabase(): Database {
  return {
    issues: structuredClone(issues),
    stories: structuredClone(stories),
    plants: structuredClone(plants),
    techniques: structuredClone(techniques),
    experts: structuredClone(experts),
    sources: collectSources(),
    retailLinks: collectRetailLinks(),
    subscribers: [],
    submissions: [],
    partnerEnquiries: [],
    categories,
    regions,
  };
}

export { categories, regions };

/**
 * THE ADMIN ENTITY REGISTRY
 *
 * One allowlist, shared by the generic CRUD API and the generic admin screens.
 * A URL segment can only ever address a table that appears here — a request for
 * /api/admin/pg_catalog is a 404, not a query.
 *
 * Adding a new entity to the admin is a one-line change in this file.
 */

import type { Database } from './types';

export type EntityKey = Exclude<keyof Database, 'categories' | 'regions'>;

/** The union of every row type the admin can address. */
export type EntityRow = Database[EntityKey][number];

export interface EntityMeta {
  key: EntityKey;
  /** URL segment. Kebab-cased where the Database key is camel-cased. */
  slug: string;
  label: string;
  singular: string;
  /** What the editor sees in the list view, in order. */
  columns: { field: string; label: string; width?: string }[];
  /** The flat field used as the record's headline in the editor. */
  titleField: string;
  /** True when the record has a publish status the editor may change. */
  hasStatus: boolean;
  hasSlug: boolean;
  /** Read-only in the admin: these are created by the public forms. */
  inbound?: boolean;
  note: string;
}

export const ENTITIES: EntityMeta[] = [
  {
    key: 'issues',
    slug: 'issues',
    label: 'Issues',
    singular: 'Issue',
    titleField: 'title',
    hasStatus: true,
    hasSlug: true,
    columns: [
      { field: 'number', label: 'No.', width: '4rem' },
      { field: 'title', label: 'Title' },
      { field: 'publishDate', label: 'Publish date', width: '9rem' },
      { field: 'status', label: 'Status', width: '8rem' },
    ],
    note: 'The unit of publication. Five discoveries, one technique lab, one verdict, one reader action.',
  },
  {
    key: 'stories',
    slug: 'stories',
    label: 'Stories',
    singular: 'Story',
    titleField: 'title',
    hasStatus: true,
    hasSlug: true,
    columns: [
      { field: 'title', label: 'Title' },
      { field: 'kind', label: 'Kind', width: '6rem' },
      { field: 'issueSlug', label: 'Issue', width: '14rem' },
      { field: 'status', label: 'Status', width: '8rem' },
    ],
    note: 'Lead stories, features and notes. Each belongs to exactly one issue.',
  },
  {
    key: 'plants',
    slug: 'plants',
    label: 'Plants',
    singular: 'Plant',
    titleField: 'commonName',
    hasStatus: true,
    hasSlug: true,
    columns: [
      { field: 'commonName', label: 'Common name' },
      { field: 'breeder', label: 'Breeder', width: '12rem' },
      { field: 'releaseYear', label: 'Release', width: '5rem' },
      { field: 'verdict', label: 'Verdict', width: '8rem' },
      { field: 'status', label: 'Status', width: '8rem' },
    ],
    note: 'Six scored axes, one verdict, and the test that would change it. Plants may appear in more than one issue.',
  },
  {
    key: 'techniques',
    slug: 'techniques',
    label: 'Techniques',
    singular: 'Technique',
    titleField: 'name',
    hasStatus: true,
    hasSlug: true,
    columns: [
      { field: 'name', label: 'Name' },
      { field: 'evidenceLevel', label: 'Evidence', width: '8rem' },
      { field: 'verdict', label: 'Verdict', width: '8rem' },
      { field: 'status', label: 'Status', width: '8rem' },
    ],
    note: 'The hype axis is inverted here: 5 is the worst score, not the best.',
  },
  {
    key: 'experts',
    slug: 'experts',
    label: 'Experts',
    singular: 'Expert',
    titleField: 'name',
    hasStatus: false,
    hasSlug: true,
    columns: [
      { field: 'name', label: 'Name' },
      { field: 'role', label: 'Role', width: '14rem' },
      { field: 'org', label: 'Organisation', width: '14rem' },
      { field: 'imageIsPlaceholder', label: 'Placeholder portrait', width: '10rem' },
    ],
    note: 'Portraits flagged as placeholders are labelled as such on the public site. Never un-flag one you have not replaced.',
  },
  {
    key: 'sources',
    slug: 'sources',
    label: 'Sources',
    singular: 'Source',
    titleField: 'title',
    hasStatus: false,
    hasSlug: false,
    columns: [
      { field: 'title', label: 'Title' },
      { field: 'publisher', label: 'Publisher', width: '12rem' },
      { field: 'kind', label: 'Kind', width: '8rem' },
      { field: 'accessed', label: 'Accessed', width: '8rem' },
    ],
    note: 'Every printable claim traces back to one of these. If it is not here, it does not go on the page.',
  },
  {
    key: 'retailLinks',
    slug: 'retail-links',
    label: 'Retail links',
    singular: 'Retail link',
    titleField: 'label',
    hasStatus: false,
    hasSlug: false,
    columns: [
      { field: 'label', label: 'Label' },
      { field: 'vendor', label: 'Vendor', width: '12rem' },
      { field: 'plantSlug', label: 'Plant', width: '14rem' },
      { field: 'affiliate', label: 'Affiliate', width: '6rem' },
    ],
    note: 'Nothing here is affiliate unless it says so, and an affiliate flag never changes a verdict.',
  },
  {
    key: 'subscribers',
    slug: 'subscribers',
    label: 'Subscribers',
    singular: 'Subscriber',
    titleField: 'email',
    hasStatus: false,
    hasSlug: false,
    inbound: true,
    columns: [
      { field: 'email', label: 'Email' },
      { field: 'zone', label: 'Zone', width: '5rem' },
      { field: 'source', label: 'Source', width: '10rem' },
      { field: 'status', label: 'Status', width: '8rem' },
      { field: 'createdAt', label: 'Joined', width: '9rem' },
    ],
    note: 'Single opt-in. Broadcast sending happens in Resend — this is the list of record, not the sender.',
  },
  {
    key: 'submissions',
    slug: 'submissions',
    label: 'Submissions',
    singular: 'Submission',
    titleField: 'subjectName',
    hasStatus: false,
    hasSlug: false,
    inbound: true,
    columns: [
      { field: 'subjectName', label: 'Subject' },
      { field: 'subjectKind', label: 'Kind', width: '6rem' },
      { field: 'submitterName', label: 'From', width: '12rem' },
      { field: 'status', label: 'Status', width: '8rem' },
      { field: 'createdAt', label: 'Received', width: '9rem' },
    ],
    note: 'Breeders and readers telling us what is new. Move one to “accepted” only once a primary source exists.',
  },
  {
    key: 'partnerEnquiries',
    slug: 'partner-enquiries',
    label: 'Partners',
    singular: 'Partner enquiry',
    titleField: 'company',
    hasStatus: false,
    hasSlug: false,
    inbound: true,
    columns: [
      { field: 'company', label: 'Company' },
      { field: 'name', label: 'Contact', width: '12rem' },
      { field: 'interest', label: 'Interest', width: '9rem' },
      { field: 'status', label: 'Status', width: '8rem' },
      { field: 'createdAt', label: 'Received', width: '9rem' },
    ],
    note: 'We take no payment for placement. Anything agreed here is disclosed on the page it touches.',
  },
];

/** Both spellings resolve: the kebab URL segment and the raw Database key. */
const BY_SEGMENT = new Map<string, EntityMeta>();
for (const e of ENTITIES) {
  BY_SEGMENT.set(e.slug, e);
  BY_SEGMENT.set(e.key, e);
}

/** The only way a URL segment ever becomes a table name. */
export function resolveEntity(segment: string): EntityMeta | null {
  return BY_SEGMENT.get(segment) ?? null;
}

export function entityHref(entity: EntityMeta): string {
  return `/admin/${entity.slug}`;
}

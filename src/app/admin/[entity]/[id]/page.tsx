import Link from 'next/link';
import { notFound } from 'next/navigation';
import { list, cryptoId } from '@/lib/db';
import { resolveEntity, type EntityMeta, type EntityRow } from '@/lib/entities';
import { requireAdmin } from '../../guard';
import { StatusBadge, formatDate } from '../../ui';
import { RecordEditor } from './RecordEditor';

export const dynamic = 'force-dynamic';

/**
 * A skeleton for a brand-new record: every field the type requires, with empty
 * values and the right shapes. It is a template, not a placeholder — nothing
 * here is invented copy that could survive into an issue by accident.
 */
function blankRecord(entity: EntityMeta): Record<string, unknown> {
  const id = cryptoId();
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  const emptyScore = { score: 3, note: '' };

  switch (entity.key) {
    case 'issues':
      return {
        id,
        number: 0,
        slug: '',
        title: '',
        standfirst: '',
        coverImageKey: 'cover_issue_01',
        publishDate: today,
        status: 'draft',
        tags: [],
        editorsIntro: '',
        leadStorySlug: '',
        discoveries: [
          { kicker: '', title: '', body: '', plantSlug: '', verdict: 'watch', verdictLine: '' },
        ],
        techniqueLab: { techniqueSlug: '', framing: '', theTest: '' },
        worthIt: { subject: '', subjectHref: '', verdict: 'watch', line: '', body: '' },
        interview: { status: 'research-required', intro: '', exchanges: [], questionsToAsk: [] },
        readerAction: { heading: '', intro: '', steps: [], askBack: '' },
        sources: [],
        researchRequired: [],
        updatedAt: now,
      };

    case 'stories':
      return {
        id,
        slug: '',
        title: '',
        standfirst: '',
        kind: 'feature',
        imageKey: '',
        body: '',
        pullQuote: '',
        sources: [],
        issueSlug: '',
        status: 'draft',
      };

    case 'plants':
      return {
        id,
        slug: '',
        commonName: '',
        botanicalName: '',
        cultivar: '',
        tradeName: '',
        breeder: '',
        breederUrl: '',
        releaseYear: new Date().getFullYear(),
        releaseChannel: 'retail',
        type: 'shrub',
        imageKey: '',
        standfirst: '',
        description: '',
        whatIsNew: '',
        zones: '',
        zonesConfidence: 'research-required',
        size: '',
        sizeConfidence: 'research-required',
        sun: 'full',
        water: 'unverified',
        edible: false,
        ornamental: true,
        containerSuitable: 'unverified',
        nativeStatus: 'non-native',
        availability: 'not-yet',
        availabilityNote: '',
        whereToBuy: [],
        scores: {
          novelty: emptyScore,
          usefulness: emptyScore,
          climateResilience: emptyScore,
          easeOfGrowing: emptyScore,
          availability: emptyScore,
          valueForMoney: emptyScore,
        },
        verdict: 'watch',
        verdictLine: '',
        verdictBody: '',
        howWeWouldTestIt: '',
        sources: [],
        issueSlugs: [],
        status: 'draft',
        updatedAt: now,
      };

    case 'techniques':
      return {
        id,
        slug: '',
        name: '',
        imageKey: '',
        standfirst: '',
        whatItIs: '',
        problemItClaimsToSolve: '',
        evidenceLevel: 'insufficient',
        evidenceSummary: '',
        costNote: '',
        difficultyNote: '',
        climateFit: '',
        instructions: [],
        advantages: [],
        limitations: [],
        scores: {
          evidenceStrength: emptyScore,
          cost: emptyScore,
          difficulty: emptyScore,
          likelyBenefit: emptyScore,
          climateRelevance: emptyScore,
          hypeRisk: emptyScore,
        },
        verdict: 'watch',
        verdictLine: '',
        verdictBody: '',
        sources: [],
        issueSlugs: [],
        status: 'draft',
        updatedAt: now,
      };

    case 'experts':
      return {
        id,
        slug: '',
        name: '',
        role: '',
        org: '',
        orgUrl: '',
        bio: '',
        imageKey: '',
        imageIsPlaceholder: true,
      };

    case 'sources':
      return {
        id,
        title: '',
        publisher: '',
        url: '',
        kind: 'primary',
        accessed: today,
        note: '',
      };

    case 'retailLinks':
      return {
        id,
        label: '',
        url: '',
        vendor: '',
        affiliate: false,
        priceNote: '',
        plantSlug: '',
      };

    case 'subscribers':
      return { id, email: '', status: 'confirmed', source: 'admin', zone: '', createdAt: now };

    case 'submissions':
      return {
        id,
        submitterName: '',
        email: '',
        company: '',
        subjectName: '',
        subjectKind: 'plant',
        description: '',
        releaseDate: '',
        links: '',
        imageUrl: '',
        retailAvailability: '',
        status: 'new',
        createdAt: now,
        notes: '',
      };

    case 'partnerEnquiries':
      return {
        id,
        name: '',
        email: '',
        company: '',
        interest: 'sponsorship',
        message: '',
        createdAt: now,
        status: 'new',
      };
  }
}

/** Where the reader can find it, if the reader can find it at all. */
function publicHref(entity: EntityMeta, record: Record<string, unknown>): string | null {
  const slug = typeof record.slug === 'string' ? record.slug : '';
  if (!slug) return null;
  switch (entity.key) {
    case 'issues':
      return `/issues/${slug}`;
    case 'plants':
      return `/plants/${slug}`;
    case 'techniques':
      return `/techniques/${slug}`;
    default:
      return null;
  }
}

export default async function AdminRecordPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity: segment, id } = await params;
  await requireAdmin(`/admin/${segment}/${id}`);

  const entity = resolveEntity(segment);
  if (!entity) notFound();

  const isNew = id === 'new';

  let record: Record<string, unknown>;
  if (isNew) {
    record = blankRecord(entity);
  } else {
    const rows = (await list(entity.key)) as EntityRow[];
    const found = rows.find((r) => r.id === id);
    if (!found) notFound();
    record = found as unknown as Record<string, unknown>;
  }

  const heading = String(record[entity.titleField] ?? '') || `Untitled ${entity.singular.toLowerCase()}`;
  const status = typeof record.status === 'string' ? record.status : null;
  const updated = typeof record.updatedAt === 'string' ? record.updatedAt : undefined;
  const created = typeof record.createdAt === 'string' ? record.createdAt : undefined;

  return (
    <div>
      <header className="mb-8 border-b border-rule pb-6">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
          <Link
            href={`/admin/${entity.slug}`}
            className="text-clay underline decoration-clay/30 underline-offset-4 hover:decoration-clay"
          >
            {entity.label}
          </Link>
          <span className="mx-2 text-rule">/</span>
          {isNew ? 'New' : String(record.id)}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="font-display text-[1.875rem] leading-tight text-ink">
            {isNew ? `New ${entity.singular.toLowerCase()}` : heading}
          </h1>
          {status && <StatusBadge value={status} />}
        </div>

        <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
          {isNew
            ? 'Nothing is written until you press create.'
            : [
                created ? `Created ${formatDate(created)}` : null,
                updated ? `Updated ${formatDate(updated)}` : null,
              ]
                .filter(Boolean)
                .join(' · ') || entity.note}
        </p>

        {entity.inbound && !isNew && (
          <p className="mt-3 max-w-prose border-l-2 border-clay pl-3 text-[0.875rem] leading-relaxed text-ink-soft">
            This record came in from a public form. Edit the status and the notes; leave what the
            sender actually wrote alone, so that the archive still says what they said.
          </p>
        )}
      </header>

      <RecordEditor
        entitySlug={entity.slug}
        entityLabel={entity.label}
        singular={entity.singular}
        titleField={entity.titleField}
        hasStatus={entity.hasStatus}
        hasSlug={entity.hasSlug}
        isNew={isNew}
        inbound={Boolean(entity.inbound)}
        publicHref={status === 'published' ? publicHref(entity, record) : null}
        initial={record}
      />
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { list } from '@/lib/db';
import { resolveEntity, type EntityRow } from '@/lib/entities';
import { requireAdmin } from '../guard';
import { AdminHeader, DataTable, Nothing, StatusBadge, formatDate } from '../ui';

export const dynamic = 'force-dynamic';

const STATUSY = new Set(['status', 'verdict', 'evidenceLevel']);
const DATEY = new Set(['createdAt', 'updatedAt', 'publishDate', 'accessed']);

/** Render whatever the record actually put in that field, without lying about it. */
function Cell({ field, value }: { field: string; value: unknown }) {
  if (value === undefined || value === null || value === '') {
    return <span className="text-ink-faint">—</span>;
  }
  if (typeof value === 'boolean') {
    return (
      <span className="font-mono text-[0.75rem] text-ink-soft">{value ? 'yes' : 'no'}</span>
    );
  }
  if (typeof value === 'number') {
    return <span className="font-mono text-[0.8125rem] tabular-nums text-ink">{value}</span>;
  }
  if (typeof value !== 'string') {
    return <span className="font-mono text-[0.75rem] text-ink-faint">(nested)</span>;
  }
  if (STATUSY.has(field)) return <StatusBadge value={value} />;
  if (DATEY.has(field)) {
    return <span className="font-mono text-[0.75rem] text-ink-faint">{formatDate(value)}</span>;
  }
  return <span className="text-ink">{value}</span>;
}

function sortRows(key: string, rows: EntityRow[]): EntityRow[] {
  const get = (row: EntityRow, field: string): unknown => (row as unknown as Record<string, unknown>)[field];

  return rows.slice().sort((a, b) => {
    if (key === 'issues') {
      return Number(get(b, 'number') ?? 0) - Number(get(a, 'number') ?? 0);
    }
    const aDate = String(get(a, 'createdAt') ?? get(a, 'updatedAt') ?? '');
    const bDate = String(get(b, 'createdAt') ?? get(b, 'updatedAt') ?? '');
    if (aDate && bDate && aDate !== bDate) return bDate.localeCompare(aDate);
    return 0;
  });
}

export default async function AdminEntityList({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity: segment } = await params;
  await requireAdmin(`/admin/${segment}`);

  const entity = resolveEntity(segment);
  if (!entity) notFound();

  const rows = sortRows(entity.key, (await list(entity.key)) as EntityRow[]);

  return (
    <div>
      <AdminHeader
        kicker={`${rows.length} record${rows.length === 1 ? '' : 's'}`}
        title={entity.label}
        intro={entity.note}
        action={
          entity.inbound ? (
            <span className="border border-rule px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
              Created by the public forms
            </span>
          ) : (
            <Link
              href={`/admin/${entity.slug}/new`}
              className="border border-ink bg-ink px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper transition-colors hover:border-clay hover:bg-clay"
            >
              New {entity.singular.toLowerCase()}
            </Link>
          )
        }
      />

      <div className="border border-rule bg-paper">
        {rows.length === 0 ? (
          <Nothing>
            No {entity.label.toLowerCase()} yet.
            {entity.inbound
              ? ' These arrive from the public forms.'
              : ' Use the button above to write the first one.'}
          </Nothing>
        ) : (
          <DataTable
            head={[
              ...entity.columns.map((c) => ({ label: c.label, width: c.width })),
              { label: '', width: '4rem' },
            ]}
          >
            {rows.map((row) => {
              const record = row as unknown as Record<string, unknown>;
              return (
                <tr key={row.id} className="align-top hover:bg-paper-warm">
                  {entity.columns.map((column, i) => (
                    <td key={column.field} className="px-5 py-3 text-[0.9375rem] leading-snug">
                      {i === 0 ? (
                        <Link
                          href={`/admin/${entity.slug}/${row.id}`}
                          className="text-ink underline decoration-rule underline-offset-4 hover:decoration-clay hover:text-clay"
                        >
                          <Cell field={column.field} value={record[column.field]} />
                        </Link>
                      ) : (
                        <Cell field={column.field} value={record[column.field]} />
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/${entity.slug}/${row.id}`}
                      className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-clay underline decoration-clay/30 underline-offset-4 hover:decoration-clay"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </DataTable>
        )}
      </div>

      <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-ink-faint">
        Records are stored whole. The list shows the fields you steer by; the record editor shows
        everything.
      </p>
    </div>
  );
}

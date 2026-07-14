import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import type { DiscoveryCard, Issue, Plant, Technique } from '@/lib/types';
import { alt, src } from '@/lib/images';
import { EvidenceBadge, Kicker, VerdictBadge } from './ui';

const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

// ---------------------------------------------------------------------------

export function IssueCard({
  issue,
  size = 'md',
}: {
  issue: Issue;
  size?: 'md' | 'lg';
}) {
  return (
    <Link
      href={`/issues/${issue.slug}`}
      className="card-hover-media group block focus-visible:outline-none"
    >
      <div
        className={clsx(
          'relative overflow-hidden bg-paper-deep',
          size === 'lg' ? 'aspect-[4/5] md:aspect-[3/2]' : 'aspect-[4/3]',
        )}
      >
        <Image
          src={src(issue.coverImageKey, { w: 1400 })}
          alt={alt(issue.coverImageKey)}
          fill
          sizes={size === 'lg' ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <Kicker tone="paper">
            Issue {String(issue.number).padStart(2, '0')} ·{' '}
            {issue.status === 'published' ? formatDate(issue.publishDate) : 'In the schedule'}
          </Kicker>
          <h3
            className={clsx(
              'mt-2 font-display text-paper',
              size === 'lg' ? 'text-display-md' : 'text-[1.75rem] leading-tight',
            )}
          >
            {issue.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 max-w-prose text-ink-soft transition-colors group-hover:text-ink">
        {issue.standfirst}
      </p>
      <span className="mt-3 inline-block font-mono text-[0.75rem] uppercase tracking-[0.12em] text-clay">
        Read the issue →
      </span>
    </Link>
  );
}

// ---------------------------------------------------------------------------

export function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="card-hover-media group flex h-full flex-col focus-visible:outline-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
        <Image
          src={src(plant.imageKey, { w: 900 })}
          alt={alt(plant.imageKey)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
        <div className="absolute left-4 top-4">
          <VerdictBadge verdict={plant.verdict} size="sm" />
        </div>
        {/* Never let a stock photograph sit silently next to a named cultivar. */}
        <span className="absolute bottom-0 right-0 bg-ink/65 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-paper/85">
          Placeholder
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <Kicker>
          {plant.type} · {plant.releaseYear}
          {plant.releaseChannel ? ` ${plant.releaseChannel}` : ''}
        </Kicker>
        <h3 className="mt-2 font-display text-[1.5rem] leading-tight transition-colors group-hover:text-clay">
          {plant.tradeName ?? plant.cultivar ?? plant.commonName}
        </h3>
        <p className="mt-1 font-display text-[1rem] italic text-ink-faint">{plant.botanicalName}</p>
        <p className="mt-3 flex-1 text-[1rem] leading-relaxed text-ink-soft">{plant.standfirst}</p>
        <p className="mt-4 border-t border-rule pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
          {plant.breeder.split('·')[0].trim()}
        </p>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------

export function TechniqueCard({ technique }: { technique: Technique }) {
  return (
    <Link
      href={`/techniques/${technique.slug}`}
      className="card-hover-media group flex h-full flex-col focus-visible:outline-none"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
        <Image
          src={src(technique.imageKey, { w: 1200 })}
          alt={alt(technique.imageKey)}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex flex-wrap items-center gap-3">
          <EvidenceBadge level={technique.evidenceLevel} />
          <VerdictBadge verdict={technique.verdict} size="sm" />
        </div>
        <h3 className="mt-4 font-display text-[1.625rem] leading-tight transition-colors group-hover:text-clay">
          {technique.name}
        </h3>
        <p className="mt-3 flex-1 text-[1rem] leading-relaxed text-ink-soft">{technique.standfirst}</p>
        <p className="mt-4 border-t border-rule pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-clay">
          Hype risk {technique.scores.hypeRisk.score}/5
        </p>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------

export function DiscoveryItem({ card, index }: { card: DiscoveryCard; index: number }) {
  const href = card.plantSlug
    ? `/plants/${card.plantSlug}`
    : card.techniqueSlug
      ? `/techniques/${card.techniqueSlug}`
      : undefined;

  const Inner = (
    <article className="card-hover-media grid grid-cols-1 gap-6 border-t border-rule py-10 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-1">
        <span className="font-mono text-[0.8125rem] tracking-[0.1em] text-ink-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {card.imageKey && (
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep md:col-span-4 md:aspect-[4/3]">
          <Image
            src={src(card.imageKey, { w: 900 })}
            alt={alt(card.imageKey)}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <span className="absolute bottom-0 right-0 bg-ink/65 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-paper/85">
            Placeholder
          </span>
        </div>
      )}

      <div className={clsx('flex flex-col', card.imageKey ? 'md:col-span-7' : 'md:col-span-11')}>
        <Kicker tone="clay">{card.kicker}</Kicker>
        <h3 className="mt-3 font-display text-display-sm leading-tight">{card.title}</h3>
        <p className="mt-4 max-w-prose text-body-lg leading-relaxed text-ink-soft">{card.body}</p>

        {card.verdict && card.verdictLine && (
          <div className="mt-6 flex flex-col gap-3 border-t border-rule pt-5 sm:flex-row sm:items-center">
            <VerdictBadge verdict={card.verdict} size="sm" />
            <p className="font-display text-[1.125rem] italic leading-snug text-moss">
              {card.verdictLine}
            </p>
          </div>
        )}

        {href && (
          <span className="mt-5 inline-block font-mono text-[0.75rem] uppercase tracking-[0.12em] text-clay">
            Full assessment →
          </span>
        )}
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="group block focus-visible:outline-none">
      {Inner}
    </Link>
  ) : (
    Inner
  );
}

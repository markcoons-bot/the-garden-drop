/**
 * THE DESIGN SYSTEM — small, sharp, and shared.
 *
 * Every page composes from these. If a page needs a new visual idea, it goes
 * here first so the publication keeps one voice.
 */

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import {
  EVIDENCE_LABEL,
  VERDICT_BLURB,
  VERDICT_LABEL,
  type Confidence,
  type EvidenceLevel,
  type Score,
  type ScoreLine,
  type Verdict,
} from '@/lib/types';
import { alt, credit, src } from '@/lib/images';

// ---------------------------------------------------------------------------
// Typography primitives
// ---------------------------------------------------------------------------

export function Kicker({
  children,
  tone = 'faint',
  className,
}: {
  children: React.ReactNode;
  tone?: 'faint' | 'clay' | 'paper';
  className?: string;
}) {
  return (
    <p
      className={clsx(
        'font-mono text-kicker uppercase tracking-[0.14em]',
        tone === 'faint' && 'text-ink-faint',
        tone === 'clay' && 'text-clay',
        tone === 'paper' && 'text-paper/70',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  intro,
  action,
  onDark = false,
}: {
  kicker: string;
  title: string;
  intro?: string;
  action?: { label: string; href: string };
  onDark?: boolean;
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 border-t border-rule pt-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Kicker tone={onDark ? 'paper' : 'clay'}>{kicker}</Kicker>
        <h2
          className={clsx(
            'mt-3 text-display-sm',
            onDark ? 'text-paper' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {intro && (
          <p className={clsx('mt-3 max-w-prose', onDark ? 'text-paper/70' : 'text-ink-soft')}>
            {intro}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className={clsx(
            'shrink-0 font-mono text-[0.8125rem] uppercase tracking-[0.1em] underline underline-offset-8',
            onDark
              ? 'text-paper decoration-paper/30 hover:decoration-paper'
              : 'text-ink decoration-rule hover:decoration-clay hover:text-clay',
          )}
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

/**
 * Body copy. The source is markdown-lite: paragraphs separated by blank lines,
 * **bold** inline, and a leading ## for a subhead. Deliberately not a full
 * markdown engine — an editorial publication should have a small, known set of
 * things a writer can do.
 */
export function Prose({ body, className }: { body: string; className?: string }) {
  const blocks = body.trim().split(/\n{2,}/);
  return (
    <div className={clsx('prose-drop max-w-prose', className)}>
      {blocks.map((block, i) => {
        const text = block.trim();
        if (text.startsWith('## ')) {
          return (
            <h3 key={i} className="mb-3 mt-10 font-display text-display-sm">
              {text.slice(3)}
            </h3>
          );
        }
        if (text.startsWith('> ')) {
          return (
            <blockquote
              key={i}
              className="my-8 border-l-2 border-clay pl-6 font-display text-[1.5rem] leading-snug text-moss"
            >
              {text.slice(2)}
            </blockquote>
          );
        }
        return (
          <p key={i} className="mb-5 text-body-lg leading-[1.75] text-ink">
            <Inline text={text} />
          </p>
        );
      })}
    </div>
  );
}

/** **bold** and *italic*, and nothing else. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <em key={i} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Imagery
// ---------------------------------------------------------------------------

export function Figure({
  imageKey,
  ratio = 'landscape',
  priority = false,
  sizes = '100vw',
  caption,
  showCredit = true,
  className,
  overlay = false,
}: {
  imageKey: string;
  ratio?: 'landscape' | 'portrait' | 'square' | 'cinema' | 'tall';
  priority?: boolean;
  sizes?: string;
  caption?: string;
  showCredit?: boolean;
  className?: string;
  overlay?: boolean;
}) {
  const ratios: Record<string, string> = {
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    cinema: 'aspect-[16/9]',
    tall: 'aspect-[2/3]',
  };
  const c = credit(imageKey);

  return (
    <figure className={clsx('group', className)}>
      <div className={clsx('relative overflow-hidden bg-paper-deep', ratios[ratio])}>
        <Image
          src={src(imageKey, { w: 1800, q: 78 })}
          alt={alt(imageKey)}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
        )}
      </div>
      {(caption || showCredit) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-meta text-ink-faint">
          {caption && <span className="text-ink-soft">{caption}</span>}
          {showCredit && (
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em]">
              Placeholder photography ·{' '}
              <a href={c.url} className="link-quiet" target="_blank" rel="noopener noreferrer">
                {c.name} / {c.source}
              </a>
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Editorial signals
// ---------------------------------------------------------------------------

const VERDICT_STYLES: Record<Verdict, string> = {
  buy: 'border-verdict-buy text-verdict-buy',
  watch: 'border-verdict-watch text-verdict-watch',
  wait: 'border-verdict-wait text-verdict-wait',
  skip: 'border-verdict-skip text-verdict-skip',
};

export function VerdictBadge({
  verdict,
  size = 'md',
  className,
}: {
  verdict: Verdict;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 border bg-paper/60 font-mono uppercase tracking-[0.12em]',
        VERDICT_STYLES[verdict],
        size === 'sm' ? 'px-2 py-1 text-[0.625rem]' : 'px-3 py-1.5 text-[0.6875rem]',
        className,
      )}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {VERDICT_LABEL[verdict]}
    </span>
  );
}

export function VerdictPanel({
  verdict,
  line,
  body,
  howWeWouldTestIt,
}: {
  verdict: Verdict;
  line: string;
  body: string;
  howWeWouldTestIt?: string;
}) {
  return (
    <section
      aria-labelledby="verdict-heading"
      className="border border-ink/15 bg-paper-warm p-8 md:p-12"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Kicker tone="clay">Worth it?</Kicker>
        <VerdictBadge verdict={verdict} />
      </div>
      <h2 id="verdict-heading" className="mt-6 max-w-3xl text-display-sm">
        {line}
      </h2>
      <p className="mt-2 font-mono text-meta uppercase tracking-[0.1em] text-ink-faint">
        {VERDICT_BLURB[verdict]}
      </p>
      <div className="mt-6 max-w-prose text-body-lg leading-relaxed text-ink-soft">
        <Inline text={body} />
      </div>
      {howWeWouldTestIt && (
        <div className="mt-8 border-t border-rule pt-6">
          <Kicker>How we would test it</Kicker>
          <p className="mt-3 max-w-prose text-ink-soft">
            <Inline text={howWeWouldTestIt} />
          </p>
        </div>
      )}
    </section>
  );
}

const EVIDENCE_STYLES: Record<EvidenceLevel, string> = {
  strong: 'border-verdict-buy text-verdict-buy',
  moderate: 'border-moss-light text-moss',
  limited: 'border-verdict-watch text-verdict-watch',
  contested: 'border-clay text-clay',
  insufficient: 'border-verdict-skip text-verdict-skip',
};

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em]',
        EVIDENCE_STYLES[level],
      )}
    >
      Evidence: {EVIDENCE_LABEL[level]}
    </span>
  );
}

const CONFIDENCE_COPY: Record<Confidence, string> = {
  verified: 'Verified',
  reported: 'Reported by introducer',
  unverified: 'Unverified',
  'research-required': 'Research required',
};

export function ConfidenceTag({ level }: { level: Confidence }) {
  if (level === 'verified') return null;
  return (
    <span
      className={clsx(
        'ml-2 inline-block border px-1.5 py-0.5 align-middle font-mono text-[0.5625rem] uppercase tracking-[0.1em]',
        level === 'reported' && 'border-rule text-ink-faint',
        level === 'unverified' && 'border-clay/40 text-clay',
        level === 'research-required' && 'border-verdict-skip/50 text-verdict-skip',
      )}
      title={
        level === 'unverified'
          ? 'The introducer does not publish this. We will not guess it.'
          : level === 'reported'
            ? 'Stated by the introducer; not independently checked.'
            : 'Flagged for human research before publication.'
      }
    >
      {CONFIDENCE_COPY[level]}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Scores
// ---------------------------------------------------------------------------

export function ScoreRow({
  label,
  line,
  inverted = false,
}: {
  label: string;
  line: ScoreLine;
  inverted?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t border-rule py-5 md:grid-cols-[1fr_auto] md:items-start md:gap-8">
      <div>
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-[1.25rem] leading-tight">{label}</h3>
        </div>
        <p className="mt-1.5 max-w-prose text-[1rem] leading-relaxed text-ink-soft">{line.note}</p>
      </div>
      <div className="flex items-center gap-3 md:pt-1">
        <Pips score={line.score} inverted={inverted} />
        <span className="w-8 shrink-0 text-right font-mono text-meta text-ink-faint">
          {line.score}/5
        </span>
      </div>
    </div>
  );
}

export function Pips({ score, inverted = false }: { score: Score; inverted?: boolean }) {
  return (
    <span
      className="inline-flex gap-1"
      role="img"
      aria-label={`${score} out of 5${inverted ? ' (higher is worse)' : ''}`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={clsx(
            'block h-3 w-3 border',
            n <= score
              ? inverted
                ? 'border-verdict-skip bg-verdict-skip'
                : 'border-moss bg-moss'
              : 'border-rule bg-transparent',
          )}
        />
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

export function Shell({
  children,
  className,
  as: As = 'section',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'div' | 'header' | 'footer' | 'main' | 'article';
}) {
  return <As className={clsx('shell', className)}>{children}</As>;
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="border border-dashed border-rule bg-paper-warm px-8 py-20 text-center">
      <h3 className="font-display text-display-sm">{title}</h3>
      <p className="mx-auto mt-3 max-w-measure text-ink-soft">{body}</p>
      {action && (
        <Link href={action.href} className="btn-secondary mt-8">
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function SourceList({ sources }: { sources: { id: string; title: string; url: string; kind: string; publisher?: string }[] }) {
  if (!sources.length) return null;
  return (
    <section aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="kicker mb-6 border-t border-rule pt-6">
        Sources
      </h2>
      <ol className="space-y-4">
        {sources.map((source, i) => (
          <li key={source.id} className="grid grid-cols-[2rem_1fr] gap-2 text-[0.95rem] leading-relaxed">
            <span className="font-mono text-meta text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet text-ink"
              >
                {source.title}
              </a>
              <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                {source.publisher ? `${source.publisher} · ` : ''}
                {source.kind}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ResearchRequired({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="border border-clay/30 bg-clay-wash p-8">
      <Kicker tone="clay">Research required before publication</Kicker>
      <p className="mt-3 max-w-prose text-ink-soft">
        Everything below is unresolved. We publish this list rather than quietly filling the gaps,
        because a publication that never says “we don’t know yet” is not reporting.
      </p>
      <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-2 text-[0.95rem] leading-relaxed text-ink">
            <span aria-hidden className="mt-2 h-px w-3 bg-clay" />
            <span>
              <Inline text={item} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Meta({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="border-t border-rule py-4">
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
            {item.label}
          </dt>
          <dd className="mt-1.5 text-[1.0625rem] leading-snug text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

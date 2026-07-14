import { ImageResponse } from 'next/og';
import siteConfig from '~/site.config';

/**
 * The default Open Graph card, 1200×630.
 *
 * Deliberately built from the default font stack: no remote font fetch, so this
 * can never fail at build time or on a cold edge deploy. It is the wordmark, the
 * tagline, and a clay rule — the same three things the masthead is made of.
 *
 * Runs on the default Node runtime.
 */

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#FBF8F3';
const INK = '#191C17';
const INK_SOFT = '#4E534A';
const CLAY = '#B4522E';
const RULE = '#DDD5C7';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: PAPER,
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative flower — top-right corner */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: -30,
            right: -30,
            width: 320,
            height: 320,
            opacity: 0.12,
          }}
        >
          <svg
            viewBox="0 0 200 200"
            width="320"
            height="320"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Petals */}
            <ellipse cx="100" cy="50" rx="28" ry="45" fill={CLAY} />
            <ellipse cx="100" cy="50" rx="28" ry="45" fill={CLAY} transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="50" rx="28" ry="45" fill={CLAY} transform="rotate(120 100 100)" />
            <ellipse cx="100" cy="50" rx="28" ry="45" fill={CLAY} transform="rotate(180 100 100)" />
            <ellipse cx="100" cy="50" rx="28" ry="45" fill={CLAY} transform="rotate(240 100 100)" />
            <ellipse cx="100" cy="50" rx="28" ry="45" fill={CLAY} transform="rotate(300 100 100)" />
            {/* Center */}
            <circle cx="100" cy="100" r="18" fill={INK} />
          </svg>
        </div>

        {/* Small flower — bottom-left */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 40,
            left: 40,
            width: 120,
            height: 120,
            opacity: 0.08,
          }}
        >
          <svg
            viewBox="0 0 200 200"
            width="120"
            height="120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="100" cy="55" rx="24" ry="40" fill={INK_SOFT} />
            <ellipse cx="100" cy="55" rx="24" ry="40" fill={INK_SOFT} transform="rotate(72 100 100)" />
            <ellipse cx="100" cy="55" rx="24" ry="40" fill={INK_SOFT} transform="rotate(144 100 100)" />
            <ellipse cx="100" cy="55" rx="24" ry="40" fill={INK_SOFT} transform="rotate(216 100 100)" />
            <ellipse cx="100" cy="55" rx="24" ry="40" fill={INK_SOFT} transform="rotate(288 100 100)" />
            <circle cx="100" cy="100" r="14" fill={CLAY} />
          </svg>
        </div>

        {/* Kicker row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: INK_SOFT,
          }}
        >
          <span>{siteConfig.cadence}</span>
          <span style={{ color: CLAY }}>Free</span>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 104,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: INK,
            }}
          >
            <span>{siteConfig.nameParts.lead}&nbsp;</span>
            <span style={{ color: CLAY, fontStyle: 'italic' }}>{siteConfig.nameParts.accent}</span>
          </div>

          {/* The clay rule */}
          <div
            style={{
              display: 'flex',
              width: 200,
              height: 6,
              backgroundColor: CLAY,
              marginTop: 40,
              marginBottom: 40,
            }}
          />

          <div
            style={{
              display: 'flex',
              fontSize: 40,
              lineHeight: 1.35,
              color: INK_SOFT,
              maxWidth: 900,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        {/* Foot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `2px solid ${RULE}`,
            paddingTop: 28,
            fontSize: 22,
            letterSpacing: 2,
            color: INK_SOFT,
          }}
        >
          <span>New plants · New techniques · An honest verdict</span>
          <span>{siteConfig.url.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>
    ),
    size,
  );
}

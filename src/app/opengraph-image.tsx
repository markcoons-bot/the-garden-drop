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
        }}
      >
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

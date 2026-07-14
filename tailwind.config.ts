import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/**
 * Design language: warm paper, deep ink, one botanical green, one signal clay.
 * Photography carries the colour. The interface stays quiet.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './site.config.ts'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FBF8F3', // page
          warm: '#F4EEE4', // sections, cards
          deep: '#EBE3D6', // wells
        },
        ink: {
          DEFAULT: '#191C17', // headlines, body
          soft: '#4E534A', // secondary text
          faint: '#8A8D84', // meta, captions
        },
        moss: {
          DEFAULT: '#2C4433', // botanical accent
          deep: '#1B2B20', // dark sections
          light: '#5C7A63',
        },
        clay: {
          DEFAULT: '#B4522E', // signal: verdicts, links, CTAs
          soft: '#D98A5F',
          wash: '#F6E7DD',
        },
        rule: '#DDD5C7', // hairlines
        // Verdict palette — used by the editorial scoring system.
        verdict: {
          buy: '#2C4433',
          watch: '#B4842E',
          wait: '#8A8D84',
          skip: '#9E3B24',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial scale. Body sits at 18px minimum — readers are 40–75.
        'display-xl': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 3.6vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.6rem, 2.4vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        lede: ['clamp(1.25rem, 1.7vw, 1.6rem)', { lineHeight: '1.45', letterSpacing: '-0.005em' }],
        body: ['1.125rem', { lineHeight: '1.7' }],
        'body-lg': ['1.25rem', { lineHeight: '1.65' }],
        kicker: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.14em' }],
        meta: ['0.8125rem', { lineHeight: '1.45', letterSpacing: '0.02em' }],
      },
      maxWidth: {
        prose: '68ch',
        measure: '38rem',
        shell: '84rem',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 3.5rem)',
        section: 'clamp(4rem, 9vw, 9rem)',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '3px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'rise-in': 'rise-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.2s ease both',
      },
      typography: () => ({
        drop: {
          css: {
            '--tw-prose-body': '#191C17',
            '--tw-prose-headings': '#191C17',
            '--tw-prose-links': '#B4522E',
            '--tw-prose-bold': '#191C17',
            '--tw-prose-quotes': '#2C4433',
            '--tw-prose-quote-borders': '#B4522E',
            '--tw-prose-counters': '#8A8D84',
            '--tw-prose-bullets': '#DDD5C7',
            '--tw-prose-hr': '#DDD5C7',
            maxWidth: '68ch',
            fontSize: '1.1875rem',
            lineHeight: '1.75',
            p: { marginTop: '1.1em', marginBottom: '1.1em' },
            'h2, h3': { fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' },
            blockquote: {
              fontFamily: 'var(--font-display)',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '1.5rem',
              lineHeight: '1.4',
              borderLeftWidth: '2px',
              paddingLeft: '1.5rem',
            },
            a: { textUnderlineOffset: '3px', textDecorationThickness: '1px' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;

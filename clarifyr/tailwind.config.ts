import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content:  ['./src/**/*.{ts,tsx}'],

  theme: {
    // ── Override defaults ──────────────────────────────────────
    borderRadius: {
      none:  '0px',
      sm:    '4px',    // micro elements: badges, tags, progress bars
      DEFAULT:'6px',   // default
      md:    '6px',    // inputs, small buttons
      lg:    '8px',    // buttons, dropdowns
      xl:    '12px',   // cards, panels
      '2xl': '16px',   // modals, large containers
      '3xl': '24px',   // hero elements (if needed)
      full:  '9999px', // pills, avatars
    },

    extend: {

      // ── Brand + semantic color palette ────────────────────────
      colors: {

        /* shadcn/ui semantic tokens */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Primary brand — purple/violet gradient
        // Used for: CTAs, links, focus rings, highlights, badges
        brand: {
          DEFAULT: '#7C3AED', // primary — all main CTAs
          dark:    '#6D28D9', // hover state on brand buttons
          light:   '#A78BFA', // accent text, eyebrow labels
          50:      '#F5F3FF', // tinted bg — feature icon backgrounds
          100:     '#EDE9FE', // tinted bg — hover tints
          200:     '#DDD6FE', // tinted bg — active states
        },

        // Risk severity — used for clause badges, bars, callouts
        risk: {
          critical:    '#EF4444', // red   — must address before signing
          criticalBg:  '#FEF2F2', // red bg tint
          criticalBdr: '#FECACA', // red border
          risky:       '#F97316', // orange — worth pushing back on
          riskyBg:     '#FFF7ED', // orange bg tint
          riskyBdr:    '#FED7AA', // orange border
          standard:    '#22C55E', // green — normal / acceptable
          standardBg:  '#F0FDF4', // green bg tint
          standardBdr: '#BBF7D0', // green border
        },

        // Surface colors — used for section backgrounds, cards
        surface: {
          DEFAULT: '#FAFAFA', // subtle off-white — alternating sections
          raised:  '#F4F4F5', // slightly elevated — inner cards
          overlay: '#FFFFFF', // pure white — modals, dropdowns
        },

      },

      // ── Font family ────────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      // ── Font sizes — named for role, not just size ─────────────
      // Usage: text-hero, text-section, text-body, etc.
      fontSize: {
        'hero':      ['clamp(42px, 6vw, 64px)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'section':   ['clamp(28px, 4vw, 42px)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'subsection':['22px',                   { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        'lead':      ['18px',                   { lineHeight: '1.7',  letterSpacing: '0'       }],
        'body':      ['16px',                   { lineHeight: '1.7',  letterSpacing: '0'       }],
        'body-sm':   ['14px',                   { lineHeight: '1.65', letterSpacing: '0'       }],
        'label':     ['13px',                   { lineHeight: '1.5',  letterSpacing: '0'       }],
        'caption':   ['12px',                   { lineHeight: '1.5',  letterSpacing: '0'       }],
        'eyebrow':   ['11px',                   { lineHeight: '1',    letterSpacing: '0.1em'   }],
        'micro':     ['10px',                   { lineHeight: '1',    letterSpacing: '0.06em'  }],
      },

      // ── Spacing — 4px base grid ────────────────────────────────
      // All layout spacing should use these values only.
      // Custom names document intent, not just number.
      spacing: {
        // Keep all default Tailwind spacing, add named aliases:
        'section-y':  '96px',  // section top/bottom padding (desktop)
        'section-ym': '64px',  // section top/bottom padding (mobile)
        'card':       '28px',  // card internal padding
        'card-sm':    '20px',  // small card padding
      },

      // ── Box shadows ─────────────────────────────────────────────
      boxShadow: {
        // card:       default resting state of all cards
        // card-hover: on mouse enter
        // orange:     brand primary buttons
        // modal:      dialog/drawer containers
        card:        '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover':'0 4px 12px 0 rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06)',
        orange:      '0 4px 14px 0 rgba(124,58,237,0.30)',
        'orange-lg': '0 8px 24px 0 rgba(124,58,237,0.25)',
        modal:       '0 20px 60px -10px rgba(0,0,0,0.18)',
        input:       '0 1px 2px 0 rgba(0,0,0,0.05)',
      },

      // ── Max widths ───────────────────────────────────────────────
      maxWidth: {
        container: '1152px', // main content max-width
        prose:     '680px',  // readable text columns
        modal:     '440px',  // auth modal
        form:      '420px',  // standalone forms
      },

      // ── Transitions ──────────────────────────────────────────────
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        out:    'cubic-bezier(0.0,  0.0,  0.2,  1)',
      },

      // ── Animation keyframes (used by tailwindcss-animate) ────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)'   },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        float:     'float 4s ease-in-out infinite',
        shimmer:   'shimmer 2s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  plugins: [animate],
}

export default config


import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: ['class'],
  content:  ['./src/**/*.{ts,tsx}'],

  theme: {
  	borderRadius: {
  		none: '0px',
  		sm: '4px',
  		DEFAULT: '6px',
  		md: '6px',
  		lg: '8px',
  		xl: '12px',
  		'2xl': '16px',
  		'3xl': '24px',
  		full: '9999px'
  	},
  	extend: {
  		colors: {
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
  			brand: {
  				'50': '#EFF6FF',
  				'100': '#DBEAFE',
  				'200': '#BFDBFE',
  				DEFAULT: '#2563EB',
  				dark: '#1D4ED8',
  				light: '#60A5FA'
  			},
  			risk: {
  				critical: '#EF4444',
  				criticalBg: '#FEF2F2',
  				criticalBdr: '#FECACA',
  				risky: '#F97316',
  				riskyBg: '#FFF7ED',
  				riskyBdr: '#FED7AA',
  				standard: '#22C55E',
  				standardBg: '#F0FDF4',
  				standardBdr: '#BBF7D0'
  			},
  			surface: {
  				DEFAULT: '#FAFAFA',
  				raised: '#F4F4F5',
  				overlay: '#FFFFFF'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'monospace'
  			]
  		},
  		fontSize: {
  			hero: [
  				'clamp(42px, 6vw, 64px)',
  				{
  					lineHeight: '1.08',
  					letterSpacing: '-0.03em'
  				}
  			],
  			section: [
  				'clamp(28px, 4vw, 42px)',
  				{
  					lineHeight: '1.15',
  					letterSpacing: '-0.02em'
  				}
  			],
  			subsection: [
  				'22px',
  				{
  					lineHeight: '1.3',
  					letterSpacing: '-0.01em'
  				}
  			],
  			lead: [
  				'18px',
  				{
  					lineHeight: '1.7',
  					letterSpacing: '0'
  				}
  			],
  			body: [
  				'16px',
  				{
  					lineHeight: '1.7',
  					letterSpacing: '0'
  				}
  			],
  			'body-sm': [
  				'14px',
  				{
  					lineHeight: '1.65',
  					letterSpacing: '0'
  				}
  			],
  			label: [
  				'13px',
  				{
  					lineHeight: '1.5',
  					letterSpacing: '0'
  				}
  			],
  			caption: [
  				'12px',
  				{
  					lineHeight: '1.5',
  					letterSpacing: '0'
  				}
  			],
  			eyebrow: [
  				'11px',
  				{
  					lineHeight: '1',
  					letterSpacing: '0.1em'
  				}
  			],
  			micro: [
  				'10px',
  				{
  					lineHeight: '1',
  					letterSpacing: '0.06em'
  				}
  			]
  		},
  		spacing: {
  			'section-y': '96px',
  			'section-ym': '64px',
  			card: '28px',
  			'card-sm': '20px'
  		},
  		boxShadow: {
  			card: '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
  			'card-hover': '0 4px 12px 0 rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06)',
  			orange: '0 4px 14px 0 rgba(37,99,235,0.28)',
  			'orange-lg': '0 8px 24px 0 rgba(37,99,235,0.22)',
  			modal: '0 20px 60px -10px rgba(0,0,0,0.18)',
  			input: '0 1px 2px 0 rgba(0,0,0,0.05)'
  		},
  		maxWidth: {
  			container: '1152px',
  			prose: '680px',
  			modal: '440px',
  			form: '420px'
  		},
  		transitionTimingFunction: {
  			smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  			spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  			out: 'cubic-bezier(0.0,  0.0,  0.2,  1)'
  		},
  		keyframes: {
  			'fade-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(16px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-8px)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'fade-up': 'fade-up 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) both',
  			'fade-in': 'fade-in 0.4s ease-out both',
  			float: 'float 4s ease-in-out infinite',
  			shimmer: 'shimmer 2s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },

  plugins: [animate, typography],
}

export default config


import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
  weight:   ['300', '400', '500', '600', '700', '800'],
})

const BASE_URL = 'https://clarifyr.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  'Clarifyr – AI Contract Analysis. Understand Every Clause Before You Sign.',
    template: '%s | Clarifyr',
  },
  description:
    'Clarifyr uses AI to analyze any contract in under 30 seconds. Get risk scores, plain-English explanations, clause benchmarking against 50,000+ contracts, and negotiation tips — free.',

  keywords: [
    'contract analysis',
    'AI contract review',
    'employment contract analyzer',
    'NDA review',
    'legal document analysis',
    'contract risk scoring',
    'understand legal contracts',
    'contract red flags',
    'non-compete clause analyzer',
    'plain english contract',
    'legal AI tool',
    'contract benchmarking',
  ],

  authors:   [{ name: 'Clarifyr', url: BASE_URL }],
  creator:   'Clarifyr Inc.',
  publisher: 'Clarifyr Inc.',

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         BASE_URL,
    siteName:    'Clarifyr',
    title:       "Clarifyr \u2013 AI Contract Analysis. Know Exactly What You're Signing.",
    description: 'Upload any contract. Get instant risk scores, plain-English explanations, and negotiation tips. 50,000+ contracts benchmarked. Free to start.',
    images: [
      {
        url:    `${BASE_URL}/og-image.png`,
        width:  1200,
        height: 630,
        alt:    'Clarifyr – AI-powered contract analysis',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Clarifyr – AI Contract Analysis',
    description: "Upload any contract. Know exactly what you're signing. Risk scores, plain English, benchmarking \u2014 free.",
    images:      [`${BASE_URL}/og-image.png`],
    creator:     '@clarifyr',
  },

  robots: {
    index:                  true,
    follow:                 true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  icons: {
    icon:    '/favicon.ico',
    apple:   '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',

  verification: {
    google: 'your-google-site-verification-token',
  },

  category: 'technology',
}

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  themeColor:   '#7C3AED',
}

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type':       'WebSite',
        '@id':         `${BASE_URL}/#website`,
        url:           BASE_URL,
        name:          'Clarifyr',
        description:   'AI-powered legal contract analysis',
        potentialAction: {
          '@type':       'SearchAction',
          target:        `${BASE_URL}/blog?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type':       'Organization',
        '@id':         `${BASE_URL}/#organization`,
        name:          'Clarifyr Inc.',
        url:           BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url:     `${BASE_URL}/logo.png`,
        },
        sameAs: [
          'https://twitter.com/clarifyr',
          'https://linkedin.com/company/clarifyr',
        ],
      },
      {
        '@type':       'SoftwareApplication',
        name:          'Clarifyr',
        applicationCategory: 'LegalService',
        operatingSystem: 'Web',
        offers: {
          '@type':    'Offer',
          price:      '0',
          priceCurrency: 'USD',
        },
        description: 'AI-powered contract analysis tool that extracts clauses, scores risks, and provides plain-English explanations for any legal document.',
        aggregateRating: {
          '@type':       'AggregateRating',
          ratingValue:   '4.8',
          reviewCount:   '2400',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans antialiased bg-white text-zinc-950">
        {children}
      </body>
    </html>
  )
}

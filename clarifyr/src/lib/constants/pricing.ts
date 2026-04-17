export type PricingCTA = 'primary' | 'secondary' | 'disabled'

export interface PricingFeature {
  text:   string
  locked: boolean
}

export interface PricingPlan {
  id:        string
  name:      string
  price:     string
  period:    string
  tagline:   string
  features:  PricingFeature[]
  cta:       string
  ctaStyle:  PricingCTA
  highlight: boolean
  badge?:    string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free', name: 'Basic', price: '$0', period: '/mo',
    tagline: 'For occasional use', highlight: false,
    cta: 'Current Plan', ctaStyle: 'disabled',
    features: [
      { text: '3 document analyses / month',              locked: false },
      { text: 'Critical / Risky / Standard risk summary', locked: false },
      { text: 'Plain English explanations',               locked: false },
      { text: 'Clause benchmarking',                      locked: true  },
      { text: 'Negotiation tips',                         locked: true  },
    ],
  },
  {
    id: 'pro', name: 'Pro', price: '$9', period: '/mo',
    tagline: 'For individuals who sign regularly',
    highlight: true, badge: 'Most popular',
    cta: 'Upgrade to Pro', ctaStyle: 'primary',
    features: [
      { text: '50 documents / month',           locked: false },
      { text: 'All 19 clause types',            locked: false },
      { text: 'Clause benchmarking',            locked: false },
      { text: 'Negotiation tips',               locked: false },
      { text: 'PDF export + lawyer share link', locked: false },
    ],
  },
  {
    id: 'team', name: 'Team', price: '$99', period: '/mo',
    tagline: 'For teams and businesses', highlight: false,
    cta: 'Start Trial', ctaStyle: 'secondary',
    features: [
      { text: 'Up to 5 users',           locked: false },
      { text: 'Shared document library', locked: false },
      { text: 'Team workspace',          locked: false },
      { text: 'Analytics dashboard',     locked: false },
      { text: 'Priority support',        locked: false },
    ],
  },
  {
    id: 'enterprise', name: 'Enterprise', price: 'Custom', period: '',
    tagline: 'For legal teams and large orgs', highlight: false,
    cta: 'Contact Sales', ctaStyle: 'secondary',
    features: [
      { text: 'Unlimited users',           locked: false },
      { text: 'Custom API access',         locked: false },
      { text: 'Dedicated success manager', locked: false },
      { text: 'SSO + Advanced Security',   locked: false },
      { text: 'SLA guarantees',            locked: false },
    ],
  },
]

export const FOOTER_COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',      href: '#features' },
      { label: 'Pricing',       href: '#pricing'  },
      { label: 'Sample Report', href: '#demo'      },
      { label: 'Changelog',     href: '#'          },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   href: '#'     },
      { label: 'Blog',    href: '/blog' },
      { label: 'Careers', href: '#'     },
      { label: 'Contact', href: '#'     },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',   href: '/privacy' },
      { label: 'Terms of Service', href: '/terms'   },
      { label: 'Security',         href: '#'         },
      { label: 'Cookie Policy',    href: '#'         },
    ],
  },
] as const

export const SOCIAL_LINKS = [
  { icon: 'Twitter',  href: '#', label: 'Twitter'  },
  { icon: 'Linkedin', href: '#', label: 'LinkedIn'  },
  { icon: 'Github',   href: '#', label: 'GitHub'    },
] as const

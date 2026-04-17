export interface BlogPost {
  slug:        string
  title:       string
  description: string
  date:        string
  readTime:    string
  category:    string
  keywords:    string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug:        'how-to-read-employment-contract',
    title:       'How to Read an Employment Contract Before Signing: The Complete Guide',
    description: 'Before you sign your next employment contract, learn exactly what to look for — from non-competes and IP clauses to termination conditions and bonus structures.',
    date:        '2025-01-10',
    readTime:    '8 min read',
    category:    'Employment',
    keywords:    ['employment contract', 'how to read a contract', 'job offer contract', 'non-compete clause', 'employment agreement'],
  },
  {
    slug:        'nda-red-flag-clauses',
    title:       '7 Red Flag NDA Clauses That Could Haunt You for Years',
    description: "Most people sign NDAs without reading them. Here are seven clauses that look harmless but could legally bind you for years — and what to do about each one.",
    date:        '2025-01-15',
    readTime:    '6 min read',
    category:    'NDA',
    keywords:    ['NDA clauses', 'non-disclosure agreement red flags', 'NDA review', 'what to look for in an NDA', 'NDA explained'],
  },
  {
    slug:        'non-compete-clause-explained',
    title:       'Non-Compete Clauses Explained: What They Mean and How to Negotiate Them Down',
    description: 'Non-compete clauses are in nearly every employment contract — but most are broader than they need to be. Here is what they mean, when they are enforceable, and exactly how to push back.',
    date:        '2025-01-20',
    readTime:    '7 min read',
    category:    'Employment',
    keywords:    ['non-compete clause', 'non-compete agreement', 'is a non-compete enforceable', 'how to negotiate non-compete', 'non-compete law'],
  },
  {
    slug:        'freelance-contract-checklist',
    title:       'The Freelancer Contract Checklist: 10 Things to Verify Before You Start Any Project',
    description: 'Freelance contracts protect you — or expose you. Before you start any project, run through this checklist to make sure your contract covers the essentials.',
    date:        '2025-01-25',
    readTime:    '5 min read',
    category:    'Freelance',
    keywords:    ['freelance contract', 'freelance agreement', 'contractor contract', 'client contract checklist', 'freelance legal'],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}

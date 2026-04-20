import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/blog/posts'
import AmbientBackground from '@/components/landing/AmbientBackground'
import SimplePageHeader from '@/components/layout/SimplePageHeader'
import SimplePageFooter from '@/components/layout/SimplePageFooter'

export const metadata: Metadata = {
  title:       'Blog – Contract Tips, Legal Guides & AI Insights',
  description: 'Practical guides on reading contracts, understanding legal clauses, and negotiating better terms. Written for people who sign contracts, not lawyers.',
  alternates:  { canonical: 'https://clarifyr.com/blog' },
  openGraph: {
    title:       'Clarifyr Blog – Legal Clarity for Everyone',
    description: 'Practical contract guides, NDA tips, non-compete advice, and more.',
    url:         'https://clarifyr.com/blog',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <SimplePageHeader />

      <div className="relative bg-white py-14 overflow-hidden">
        <AmbientBackground preset="section" />
        <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6">
          <p className="eyebrow-label mb-3">RESOURCES</p>
          <h1 className="text-section font-bold text-zinc-950">Legal clarity, explained.</h1>
          <p className="body-lead mt-3 max-w-xl">
            Practical guides for people who sign contracts — not lawyers.
          </p>
        </div>
      </div>

      <main className="max-w-container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {BLOG_POSTS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group card-base p-7 hover:shadow-card-hover transition-shadow duration-200"
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-widest
                               text-brand bg-brand-50 px-2.5 py-1 rounded-full mb-4">
                {post.category}
              </span>
              <h2 className="text-[17px] font-semibold text-zinc-900 leading-snug
                             group-hover:text-brand transition-colors">
                {post.title}
              </h2>
              <p className="text-body-sm text-zinc-500 mt-2 leading-relaxed line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center gap-3 mt-5 text-caption text-zinc-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <SimplePageFooter />
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog/posts'
import BlogPostContent from '@/components/blog/BlogPostContent'
import AmbientBackground from '@/components/landing/AmbientBackground'
import SimplePageHeader from '@/components/layout/SimplePageHeader'
import SimplePageFooter from '@/components/layout/SimplePageFooter'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title:       post.title,
    description: post.description,
    keywords:    post.keywords,
    alternates:  { canonical: `https://clarifyr.com/blog/${post.slug}` },
    openGraph: {
      title:       post.title,
      description: post.description,
      url:         `https://clarifyr.com/blog/${post.slug}`,
      type:        'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Readonly<Props>) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const schema = {
    '@context':      'https://schema.org',
    '@type':         'Article',
    headline:        post.title,
    description:     post.description,
    datePublished:   post.date,
    author:          { '@type': 'Organization', name: 'Clarifyr' },
    publisher:       { '@type': 'Organization', name: 'Clarifyr Inc.' },
    mainEntityOfPage: `https://clarifyr.com/blog/${post.slug}`,
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <SimplePageHeader backHref="/blog" backLabel="← All articles" />

      <div className="relative bg-white py-14 overflow-hidden">
        <AmbientBackground preset="section" />
        <div className="relative z-10 max-w-prose mx-auto px-4 sm:px-6">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest
                           text-brand bg-brand-50 px-2.5 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-section font-bold text-zinc-950 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 mt-4 text-body-sm text-zinc-400">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      <main className="max-w-prose mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-zinc prose-lg max-w-none
                        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-950
                        prose-h2:text-subsection prose-h2:mt-10 prose-h2:mb-3
                        prose-p:text-body prose-p:leading-relaxed
                        prose-lead:text-lead prose-lead:text-zinc-600 prose-lead:leading-relaxed
                        prose-li:text-body-sm prose-li:leading-relaxed
                        prose-strong:text-zinc-900
                        prose-a:text-brand prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-brand/30 prose-blockquote:text-zinc-600">
          <BlogPostContent slug={post.slug} />
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200">
          <p className="text-body-sm font-semibold text-zinc-900 mb-2">
            Ready to analyze your own contract?
          </p>
          <p className="text-body-sm text-zinc-500 mb-5">
            Upload any contract and get instant risk scores, plain-English explanations,
            and negotiation tips — free.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex"
          >
            Analyze a Contract Free
          </Link>
        </div>
      </main>

      <SimplePageFooter />
    </div>
  )
}

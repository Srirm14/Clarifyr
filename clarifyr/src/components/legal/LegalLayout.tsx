import Link from 'next/link'
import AmbientBackground from '@/components/landing/AmbientBackground'

interface LegalLayoutProps {
  title:       string
  lastUpdated: string
  children:    React.ReactNode
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="relative h-16 flex items-center overflow-hidden">
        <AmbientBackground preset="sectionAlt" />
        <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-zinc-950">
            Clarif<span className="text-brand">yr</span>
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <div className="relative bg-white py-14 overflow-hidden">
        <AmbientBackground preset="section" />
        <div className="relative z-10 max-w-prose mx-auto px-4 sm:px-6">
          <h1 className="text-section font-bold text-zinc-950">{title}</h1>
          <p className="text-body-sm text-zinc-500 mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <main className="max-w-prose mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-zinc prose-lg max-w-none
                        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-950
                        prose-h2:text-subsection prose-h2:mt-10 prose-h2:mb-3
                        prose-p:text-body prose-p:leading-relaxed
                        prose-li:text-body-sm prose-li:leading-relaxed
                        prose-strong:text-zinc-900
                        prose-a:text-brand prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-brand/30 prose-blockquote:text-zinc-600">
          {children}
        </div>
      </main>

      <footer className="border-t border-zinc-200 py-8 mt-8">
        <div className="max-w-container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-caption text-zinc-400">© 2025 Clarifyr Inc.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-caption text-zinc-400 hover:text-zinc-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-caption text-zinc-400 hover:text-zinc-700 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

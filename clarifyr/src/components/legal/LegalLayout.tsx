import AmbientBackground from '@/components/landing/AmbientBackground'
import SimplePageHeader from '@/components/layout/SimplePageHeader'
import SimplePageFooter from '@/components/layout/SimplePageFooter'

interface LegalLayoutProps {
  title:       string
  lastUpdated: string
  children:    React.ReactNode
}

export default function LegalLayout({ title, lastUpdated, children }: Readonly<LegalLayoutProps>) {
  return (
    <div className="min-h-screen bg-white">
      <SimplePageHeader />

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

      <SimplePageFooter />
    </div>
  )
}

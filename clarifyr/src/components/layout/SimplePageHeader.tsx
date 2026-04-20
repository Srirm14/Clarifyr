import Link from 'next/link'
import AmbientBackground from '@/components/landing/AmbientBackground'

export default function SimplePageHeader({
  backHref = '/',
  backLabel = '← Back to home',
}: Readonly<{
  backHref?: string
  backLabel?: string
}>) {
  return (
    <header className="relative h-16 flex items-center overflow-hidden">
      <AmbientBackground preset="sectionAlt" />
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-950">
          Clarif<span className="text-brand">yr</span>
        </Link>
        <Link href={backHref} className="text-sm text-zinc-950/90 hover:text-zinc-950 transition-colors">
          {backLabel}
        </Link>
      </div>
    </header>
  )
}


import Link from 'next/link'

export default function SimplePageFooter() {
  return (
    <footer className="border-t border-zinc-200 py-8 mt-8">
      <div className="max-w-container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
  )
}


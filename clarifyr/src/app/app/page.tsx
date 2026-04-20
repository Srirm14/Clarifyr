'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { clearDemoSession, getDemoSession } from '@/lib/demo-session'

export default function AppPage() {
  const router = useRouter()
  const [email] = useState<string | null>(() => getDemoSession()?.email ?? null)

  useEffect(() => {
    if (!email) router.replace('/')
  }, [router, email])

  if (!email) return null

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-zinc-950">
            Clarif<span className="text-brand">yr</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 hidden sm:inline">
              Signed in as <span className="text-zinc-900 font-medium">{email}</span>
            </span>
            <button
              className="btn-secondary text-sm px-4 py-2"
              onClick={() => {
                clearDemoSession()
                router.replace('/')
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-container mx-auto px-4 sm:px-6 py-14">
        <div className="card-base p-8">
          <h1 className="text-subsection font-semibold text-zinc-950">App Home</h1>
          <p className="text-body text-zinc-600 mt-2">
            This is the real app page. Tell me what should be inside and I’ll build it here.
          </p>
        </div>
      </main>
    </div>
  )
}


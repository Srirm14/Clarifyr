'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { clearDemoSession, getDemoSession } from '@/lib/demo-session'
import AppLayout from '@/components/app/AppLayout'

export default function AppPage() {
  const router = useRouter()
  const [email] = useState<string | null>(() => getDemoSession()?.email ?? null)

  useEffect(() => {
    if (!email) router.replace('/')
  }, [router, email])

  if (!email) return null

  return (
    <AppLayout breadcrumbs={[{ label: 'Home', href: '/app' }]}>
      {/* No page content yet — app shell foundation only */}
      <div />
      <button
        className="sr-only"
        onClick={() => {
          clearDemoSession()
          router.replace('/')
        }}
      >
        Logout
      </button>
    </AppLayout>
  )
}


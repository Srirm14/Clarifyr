'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDemoSession } from '@/lib/demo-session'

export default function RequireDemoSession({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  // Keep server + first client render deterministic (avoid localStorage during render).
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const id = globalThis.window?.setTimeout(() => {
      const hasSession = Boolean(getDemoSession())
      if (!hasSession) router.replace('/')
      setOk(hasSession)
    }, 0)

    return () => {
      if (id) globalThis.window?.clearTimeout(id)
    }
  }, [router])

  if (!ok) return null
  return children
}


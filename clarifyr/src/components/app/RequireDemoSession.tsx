'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDemoSession } from '@/lib/demo-session'

export default function RequireDemoSession({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  // Keep render deterministic; just redirect after mount if missing session.
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const id = globalThis.window?.setTimeout(() => {
      const hasSession = Boolean(getDemoSession())
      if (!hasSession) router.replace('/')
      setChecked(true)
    }, 0)

    return () => {
      if (id) globalThis.window?.clearTimeout(id)
    }
  }, [router])

  // Render shell immediately to avoid "blink"; redirect happens post-mount if needed.
  // For safety, only render children after we've checked once on the client.
  if (!checked) return null
  return children
}


'use client'

import AppLayout from '@/components/app/AppLayout'
import RequireDemoSession from '@/components/app/RequireDemoSession'

export default function AppGroupLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RequireDemoSession>
      <AppLayout>{children}</AppLayout>
    </RequireDemoSession>
  )
}


'use client'

import AppLayout from '@/components/app/AppLayout'
import RequireDemoSession from '@/components/app/RequireDemoSession'

export default function DashboardPage() {
  return (
    <RequireDemoSession>
      <AppLayout breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }]}>
        <div />
      </AppLayout>
    </RequireDemoSession>
  )
}


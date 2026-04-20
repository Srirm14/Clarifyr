'use client'

import AppLayout from '@/components/app/AppLayout'
import RequireDemoSession from '@/components/app/RequireDemoSession'

export default function DocumentsPage() {
  return (
    <RequireDemoSession>
      <AppLayout breadcrumbs={[{ label: 'All Documents', href: '/documents' }]}>
        <div />
      </AppLayout>
    </RequireDemoSession>
  )
}


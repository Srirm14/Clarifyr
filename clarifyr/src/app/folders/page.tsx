'use client'

import AppLayout from '@/components/app/AppLayout'
import RequireDemoSession from '@/components/app/RequireDemoSession'

export default function FoldersPage() {
  return (
    <RequireDemoSession>
      <AppLayout breadcrumbs={[{ label: 'Folders', href: '/folders' }]}>
        <div />
      </AppLayout>
    </RequireDemoSession>
  )
}


'use client'

import { useParams } from 'next/navigation'
import AppLayout from '@/components/app/AppLayout'
import RequireDemoSession from '@/components/app/RequireDemoSession'

export default function DocumentDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id ?? ''

  return (
    <RequireDemoSession>
      <AppLayout
        breadcrumbs={[
          { label: 'All Documents', href: '/documents' },
          { label: `Document ${id}` },
        ]}
      >
        <div />
      </AppLayout>
    </RequireDemoSession>
  )
}


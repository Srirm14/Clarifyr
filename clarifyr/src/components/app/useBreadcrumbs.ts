'use client'

import { useParams, usePathname } from 'next/navigation'
import { getDocumentByIdSync } from '@/lib/mock/documents'

type Crumb = { label: string; href?: string }

export default function useBreadcrumbs(): Crumb[] {
  const pathname = usePathname()
  const params = useParams<{ id?: string }>()

  if (!pathname) return [{ label: 'Home', href: '/app' }]

  if (pathname === '/app') return [{ label: 'Home', href: '/app' }]
  if (pathname.startsWith('/dashboard')) return [{ label: 'Dashboard', href: '/dashboard' }]
  if (pathname === '/documents') return [{ label: 'All Documents', href: '/documents' }]
  if (pathname.startsWith('/documents/')) {
    const id = params?.id ?? pathname.split('/')[2] ?? ''
    const name = id ? getDocumentByIdSync(id)?.name : null
    return [
      { label: 'All Documents', href: '/documents' },
      { label: name ?? (id ? `Document ${id}` : 'Document') },
    ]
  }

  return [{ label: 'Home', href: '/app' }]
}


'use client'

import { useParams, usePathname } from 'next/navigation'
import { getDocumentByIdSync } from '@/lib/mock/documents'

type Crumb = { label: string; href?: string }

export default function useBreadcrumbs(): Crumb[] {
  const pathname = usePathname()
  const params = useParams<{ id?: string }>()

  if (!pathname) return [{ label: 'Dashboard', href: '/dashboard' }]

  if (pathname === '/app') return [{ label: 'Dashboard', href: '/dashboard' }]
  if (pathname.startsWith('/dashboard')) return [{ label: 'Dashboard', href: '/dashboard' }]
  if (pathname === '/documents') return [{ label: 'All Documents', href: '/documents' }]
  if (pathname?.startsWith('/settings')) {
    if (pathname === '/settings') return [{ label: 'Settings', href: '/settings' }]
    const sub = pathname.slice('/settings/'.length).split('/').find(Boolean)
    const subLabel = sub
      ? sub
          .split('-')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ')
      : 'Settings'
    return [{ label: 'Settings', href: '/settings' }, { label: subLabel }]
  }
  if (pathname.startsWith('/documents/')) {
    const id = params?.id ?? pathname.split('/')[2] ?? ''
    const name = id ? getDocumentByIdSync(id)?.name : null
    return [
      { label: 'All Documents', href: '/documents' },
      { label: name ?? (id ? `Document ${id}` : 'Document') },
    ]
  }

  return [{ label: 'Dashboard', href: '/dashboard' }]
}


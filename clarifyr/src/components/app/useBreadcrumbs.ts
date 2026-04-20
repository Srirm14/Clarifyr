'use client'

import { useParams, usePathname } from 'next/navigation'

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
    return [
      { label: 'All Documents', href: '/documents' },
      { label: id ? `Document ${id}` : 'Document' },
    ]
  }
  if (pathname.startsWith('/folders')) return [{ label: 'Folders', href: '/folders' }]

  return [{ label: 'Home', href: '/app' }]
}


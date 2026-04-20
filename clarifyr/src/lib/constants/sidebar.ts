import {
  LayoutDashboard,
  FileText,
  Folder,
} from 'lucide-react'
import { getDocumentByIdSync, RECENT_DOC_IDS } from '@/lib/mock/documents'

// WORKSPACE primary nav items
export const SIDEBAR_NAV = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Documents',
    href: '/documents',
    icon: FileText,
  },
  {
    label: 'Folders',
    href: '/folders',
    icon: Folder,
  },
] as const

// RECENT documents — will be dynamic in real app, static for now
export const SIDEBAR_RECENT: ReadonlyArray<{ label: string; href: string }> = RECENT_DOC_IDS.map(id => {
  const doc = getDocumentByIdSync(id)
  return { label: doc?.name ?? `Document ${id}`, href: `/documents/${id}` }
})

// USER data — will come from auth in real app
export const SIDEBAR_USER = {
  name: 'Sriram V.',
  email: 'sriram@example.com',
  initials: 'SR',
  plan: 'Pro',
  usage: { used: 38, total: 50 },
} as const


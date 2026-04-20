import {
  LayoutDashboard,
  FileText,
  Folder,
} from 'lucide-react'

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
export const SIDEBAR_RECENT = [
  { label: 'Google Offer Letter.pdf', href: '/documents/1' },
  { label: 'Freelance Agreement…', href: '/documents/2' },
  { label: 'Apartment Lease - HS…', href: '/documents/3' },
] as const

// USER data — will come from auth in real app
export const SIDEBAR_USER = {
  name: 'Sriram V.',
  email: 'sriram@example.com',
  initials: 'SR',
  plan: 'Pro',
  usage: { used: 38, total: 50 },
} as const


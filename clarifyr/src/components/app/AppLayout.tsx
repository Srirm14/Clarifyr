'use client'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppNavbar from './AppNavbar'
import AppSidebar from './AppSidebar'

interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs: { label: string; href?: string }[]
}

export default function AppLayout({ children, breadcrumbs }: Readonly<AppLayoutProps>) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          '--sidebar-width': '220px',
          '--sidebar-width-icon': '52px',
          '--sidebar-width-mobile': '280px',
        } as React.CSSProperties
      }
    >
      <AppSidebar />

      <SidebarInset className="flex flex-col min-h-screen bg-white">
        <AppNavbar breadcrumbs={breadcrumbs} />
        <main className="flex-1 px-6 py-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}


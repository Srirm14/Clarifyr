'use client'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppNavbar from '@/components/app/AppNavbar'
import AppSidebar from '@/components/app/AppSidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: Readonly<AppLayoutProps>) {
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

      <SidebarInset className="flex flex-col h-screen overflow-hidden bg-white">
        <AppNavbar />
        <main className="flex-1 px-6 py-6 min-h-0 overflow-hidden flex flex-col">
          <div className="flex-1 min-h-0">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}


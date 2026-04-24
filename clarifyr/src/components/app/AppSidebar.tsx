'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import SidebarFooterUser from '@/components/app/sidebar/SidebarFooterUser'
import SidebarLogo from '@/components/app/sidebar/SidebarLogo'
import SidebarNavMain from '@/components/app/sidebar/SidebarNavMain'
import SidebarNavRecent from '@/components/app/sidebar/SidebarNavRecent'

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-200 bg-white">
      <SidebarHeader className="h-14 flex items-center border-b border-zinc-200 px-2">
        <div className="w-full flex items-center justify-start mt-1">
          <SidebarLogo />
        </div>
      </SidebarHeader>

      <SidebarContent className="py-3">
        <SidebarNavMain />
        <SidebarNavRecent />
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-200 p-3">
        <SidebarFooterUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}


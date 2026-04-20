'use client'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR_NAV } from '@/lib/constants/sidebar'
import { cn } from '@/lib/utils'

export default function SidebarNavMain() {
  const { open } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      {open && (
        <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-1">
          Workspace
        </SidebarGroupLabel>
      )}

      <SidebarMenu>
        {SIDEBAR_NAV.map(item => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.label}
                className={cn(
                  'h-9 rounded-lg gap-2.5 font-medium text-[13px] transition-colors duration-150 relative',
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] before:bg-brand before:rounded-full'
                    : 'text-zinc-600 hover:bg-brand-50/70 hover:text-zinc-950',
                )}
              >
                <Link href={item.href}>
                  <Icon size={16} className={isActive ? 'text-zinc-950' : 'text-zinc-500'} />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}


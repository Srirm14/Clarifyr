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

  const navItemClass = cn(
    'h-9 min-h-9 rounded-lg px-2.5 text-[13px] font-medium text-zinc-600',
    'transition-[background-color,color,box-shadow] duration-150 ease-out',
    'outline-none',
    'hover:!bg-brand-50 hover:!text-zinc-900',
    'active:!bg-brand-100/60',
    'data-[active=true]:!bg-brand-100/85 data-[active=true]:!text-zinc-950 data-[active=true]:hover:!bg-brand-100 data-[active=true]:hover:!text-zinc-950 data-[active=true]:active:!bg-brand-100/90',
    'data-[active=true]:before:pointer-events-none data-[active=true]:before:absolute data-[active=true]:before:left-1 data-[active=true]:before:top-1.5 data-[active=true]:before:bottom-1.5 data-[active=true]:before:w-0.5 data-[active=true]:before:rounded-full data-[active=true]:before:bg-brand',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    'data-[active=true]:focus-visible:ring-brand/25 data-[active=true]:focus-visible:ring-offset-1',
  )

  return (
    <SidebarGroup className="px-1.5">
      {open && (
        <SidebarGroupLabel className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Workspace
        </SidebarGroupLabel>
      )}

      <SidebarMenu className="gap-0.5">
        {SIDEBAR_NAV.map(item => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard' || pathname === '/app'
              : pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.label}
                className={cn('relative', navItemClass)}
              >
                <Link
                  href={item.href}
                  className="flex min-w-0 items-center gap-2.5"
                >
                  <Icon
                    size={16}
                    className={cn(
                      'shrink-0 transition-colors duration-150',
                      isActive
                        ? 'text-brand'
                        : 'text-zinc-500 group-hover/menu-item:text-zinc-700',
                    )}
                    aria-hidden
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}


'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FileText } from 'lucide-react'
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
import { SIDEBAR_RECENT } from '@/lib/constants/sidebar'
import { cn } from '@/lib/utils'

const recentItemClass = cn(
  'h-8 min-h-8 rounded-md px-2 text-[12px] font-medium text-zinc-600',
  'transition-[background-color,color] duration-150 ease-out',
  'outline-none',
  'hover:!bg-brand-50 hover:!text-zinc-900',
  'active:!bg-brand-100/60',
  'data-[active=true]:!bg-brand-100/85 data-[active=true]:!text-zinc-950 data-[active=true]:hover:!bg-brand-100 data-[active=true]:hover:!text-zinc-950 data-[active=true]:active:!bg-brand-100/90',
  'data-[active=true]:before:pointer-events-none data-[active=true]:before:absolute data-[active=true]:before:left-0.5 data-[active=true]:before:top-1 data-[active=true]:before:bottom-1 data-[active=true]:before:w-0.5 data-[active=true]:before:rounded-full data-[active=true]:before:bg-brand/90',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
  'data-[active=true]:focus-visible:ring-brand/25 data-[active=true]:focus-visible:ring-offset-1',
)

export default function SidebarNavRecent() {
  const { open } = useSidebar()
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <SidebarGroup className="mt-1.5 px-1.5">
            <SidebarGroupLabel className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Recent
            </SidebarGroupLabel>

            <SidebarMenu className="gap-0.5">
              {SIDEBAR_RECENT.map(doc => {
                const isActive = pathname === doc.href
                return (
                  <SidebarMenuItem key={doc.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn('relative', recentItemClass)}
                    >
                      <Link href={doc.href} className="flex min-w-0 items-center gap-2 pr-0.5">
                        <FileText
                          size={14}
                          className={cn(
                            'shrink-0 transition-colors duration-150',
                            isActive
                              ? 'text-brand'
                              : 'text-zinc-400 group-hover/menu-item:text-zinc-600',
                          )}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1 truncate text-left" title={doc.label}>
                          {doc.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


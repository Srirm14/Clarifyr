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
import { SIDEBAR_RECENT } from '@/lib/constants/sidebar'

export default function SidebarNavRecent() {
  const { open } = useSidebar()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <SidebarGroup className="mt-2">
            <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-1">
              Recent
            </SidebarGroupLabel>

            <SidebarMenu>
              {SIDEBAR_RECENT.map(doc => (
                <SidebarMenuItem key={doc.label}>
                  <SidebarMenuButton
                    asChild
                    className="h-8 rounded-md gap-2 text-[13px] text-zinc-500 transition-colors
                               hover:bg-brand-50/70 hover:text-zinc-900
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30
                               focus-visible:ring-offset-2 focus-visible:ring-offset-white
                               focus-visible:bg-brand-50/80 focus-visible:text-zinc-900"
                  >
                    <Link href={doc.href}>
                      <FileText size={14} className="flex-shrink-0 text-zinc-400" />
                      <span className="truncate">{doc.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


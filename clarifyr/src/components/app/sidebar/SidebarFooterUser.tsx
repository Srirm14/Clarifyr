'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/components/ui/sidebar'
import { useWorkspaceDisplayName } from '@/hooks/use-workspace-display-name'
import { SIDEBAR_USER } from '@/lib/constants/sidebar'
import { cn } from '@/lib/utils'

export default function SidebarFooterUser() {
  const { open } = useSidebar()
  const pathname = usePathname()
  const onSettings = pathname === '/settings' || pathname?.startsWith('/settings/')
  const user = SIDEBAR_USER
  const { displayName, initials } = useWorkspaceDisplayName(user.name)
  const pct = Math.min(100, Math.max(0, (user.usage.used / user.usage.total) * 100))

  return (
    <div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mb-3 px-1"
          >
            <p className="text-[11px] text-zinc-400 mb-1.5">
              {user.usage.used} / {user.usage.total} docs this month
            </p>
            <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={open ? 'flex items-center gap-2.5 px-1' : 'w-full flex items-center justify-center'}>
        <div className="w-[30px] h-[30px] rounded-full bg-zinc-950 flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-semibold text-white">{initials}</span>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              className="flex-1 min-w-0 overflow-hidden"
            >
              <p className="text-[13px] font-medium text-zinc-900 truncate">{displayName}</p>
              <p className="text-[11px] text-zinc-400 truncate flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
                {user.plan} Plan
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex shrink-0"
            >
              <Link
                href="/settings"
                className={cn(
                  'rounded-md p-1 transition-colors',
                  onSettings
                    ? 'text-brand'
                    : 'text-zinc-400 hover:bg-brand-50 hover:text-zinc-800',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                )}
                aria-label="Open settings"
                aria-current={onSettings ? 'page' : undefined}
              >
                <Settings size={15} className="block" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


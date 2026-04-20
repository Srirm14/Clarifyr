'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSidebar } from '@/components/ui/sidebar'

export default function SidebarLogo() {
  const { open } = useSidebar()

  return (
    <div className={open ? 'flex items-center gap-2.5' : 'flex items-center justify-center w-full'}>
      <div className="w-7 h-7 rounded-full bg-zinc-950 flex items-center justify-center flex-shrink-0">
        <span className="text-[13px] font-bold text-white">C</span>
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="text-[14px] font-semibold text-zinc-950 overflow-hidden whitespace-nowrap"
          >
            Clarifyr Pro
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}


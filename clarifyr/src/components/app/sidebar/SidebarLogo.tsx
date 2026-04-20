'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSidebar } from '@/components/ui/sidebar'

export default function SidebarLogo() {
  const { open } = useSidebar()

  return (
    <div className={open ? 'flex items-center gap-2.5' : 'flex items-center justify-center w-full'}>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white
                   bg-gradient-to-br from-brand-light to-brand
                   shadow-[0_10px_26px_rgba(232,93,4,0.22)] ring-1 ring-white/25"
        aria-hidden
      >
        <span className="text-[13px] font-bold leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]">
          C
        </span>
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="text-[14px] font-semibold overflow-hidden whitespace-nowrap"
          >
            <span className="text-zinc-950">Clarif</span>
            <span className="text-gradient-brand">yr</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}


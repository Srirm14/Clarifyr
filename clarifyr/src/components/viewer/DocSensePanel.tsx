'use client'

import { Sparkles, PanelRightClose } from 'lucide-react'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import DocSenseMetrics from '@/components/viewer/DocSenseMetrics'
import DocSenseChat from '@/components/viewer/DocSenseChat'

export default function DocSensePanel({ onClose }: Readonly<{ onClose: () => void }>) {
  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-[360px] flex-shrink-0 flex flex-col bg-white border-l border-zinc-200 h-full overflow-hidden"
    >
      <div className="h-12 flex items-center justify-between px-4 border-b border-zinc-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-brand" />
          <span className="text-sm font-semibold text-zinc-800">DocSense</span>
          <span className="text-[10px] font-medium bg-brand/10 text-brand px-1.5 py-0.5 rounded-full">AI</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="text-zinc-400 hover:text-zinc-600 transition-colors" onClick={onClose}>
              <PanelRightClose size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Close panel</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DocSenseMetrics />
        <Separator />
        <DocSenseChat />
      </div>
    </motion.aside>
  )
}


'use client'

import { useMemo, useState } from 'react'
import { BarChart2, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { DocSenseMetric, DocSenseMetricVariant } from '@/components/viewer/viewer.types'

const MOCK_METRICS: DocSenseMetric[] = [
  { label: 'Risk Score', value: '72', sub: 'High risk', variant: 'risk-high' },
  { label: 'Clauses', value: '34', sub: 'Detected', variant: 'info' },
  { label: 'Red Flags', value: '6', sub: 'Needs review', variant: 'risk-high' },
  { label: 'Favourable', value: '18', sub: 'Clauses', variant: 'risk-low' },
  { label: 'Neutral', value: '10', sub: 'Clauses', variant: 'default' },
  { label: 'Benchmarks', value: '85%', sub: 'vs industry', variant: 'risk-low' },
]

function metricClasses(variant: DocSenseMetricVariant) {
  switch (variant) {
    case 'risk-high':
      return { box: 'bg-red-50 border border-red-100', value: 'text-red-600' }
    case 'risk-medium':
      return { box: 'bg-amber-50 border border-amber-100', value: 'text-amber-600' }
    case 'risk-low':
      return { box: 'bg-emerald-50 border border-emerald-100', value: 'text-emerald-600' }
    case 'info':
      return { box: 'bg-brand/5 border border-brand/20', value: 'text-brand' }
    default:
      return { box: 'bg-zinc-50 border border-zinc-100', value: 'text-zinc-700' }
  }
}

export default function DocSenseMetrics() {
  const [open, setOpen] = useState(true)
  const updatedLabel = useMemo(() => 'Updated just now', [])

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {/* Sticky header — always visible */}
      <div className="sticky top-0 z-10 bg-white border-b border-zinc-100 px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-zinc-800 leading-tight">Document Analysis</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] text-zinc-400">{updatedLabel}</span>
          </div>
        </div>

        <CollapsibleTrigger asChild>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="w-6 h-6 rounded-md hover:bg-zinc-100 transition-colors flex items-center justify-center text-zinc-400 hover:text-zinc-600 flex-shrink-0"
                aria-label={open ? 'Collapse' : 'Expand'}
              >
                <ChevronDown className={cn('transition-transform duration-200', open ? 'rotate-0' : '-rotate-90')} size={13} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">{open ? 'Collapse' : 'Expand'}</TooltipContent>
          </Tooltip>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="px-3 pt-2.5 pb-3">
          <motion.div
            className="grid grid-cols-2 gap-1.5"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {MOCK_METRICS.map(m => {
              const cls = metricClasses(m.variant)
              return (
                <motion.div
                  key={m.label}
                  variants={{
                    hidden: { opacity: 0, y: 4 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className={cn('rounded-lg p-2.5 flex flex-col', cls.box)}
                >
                  <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest leading-none">{m.label}</span>
                  <span className={cn('text-[22px] font-bold leading-none mt-1.5', cls.value)}>{m.value}</span>
                  <span className="text-[10px] text-zinc-400 mt-0.5">{m.sub}</span>
                </motion.div>
              )
            })}
          </motion.div>

          <button
            type="button"
            className="w-full mt-2.5 h-8 text-[12px] font-medium text-brand border border-brand/25
                       rounded-lg hover:bg-brand/5 hover:border-brand/40 transition-colors
                       flex items-center justify-center gap-1.5"
          >
            <BarChart2 size={12} />
            View Full Report
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}


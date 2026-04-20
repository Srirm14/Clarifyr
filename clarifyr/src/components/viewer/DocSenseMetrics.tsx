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
      {/* Sticky header — collapse toggle always visible */}
      <div className="sticky top-0 z-10 bg-white border-b border-zinc-100 px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-zinc-800 leading-tight">Document Analysis</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] text-zinc-400">{updatedLabel}</span>
          </div>
        </div>

        <CollapsibleTrigger asChild>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="w-7 h-7 rounded-lg hover:bg-zinc-100 transition-colors flex items-center justify-center text-zinc-400 hover:text-zinc-600 flex-shrink-0"
                aria-label={open ? 'Collapse metrics' : 'Expand metrics'}
              >
                <ChevronDown className={cn('transition-transform duration-200', open ? 'rotate-0' : '-rotate-90')} size={15} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">{open ? 'Collapse' : 'Expand'}</TooltipContent>
          </Tooltip>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="px-4 pt-3 pb-4">
          <motion.div
            className="grid grid-cols-2 gap-2"
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
                    hidden: { opacity: 0, y: 6 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className={cn('rounded-xl p-3 flex flex-col gap-0.5', cls.box)}
                >
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">{m.label}</span>
                  <span className={cn('text-2xl font-bold leading-none mt-0.5', cls.value)}>{m.value}</span>
                  <span className="text-[11px] text-zinc-400 mt-0.5">{m.sub}</span>
                </motion.div>
              )
            })}
          </motion.div>

          <button
            type="button"
            className="w-full mt-3 h-9 text-[13px] font-medium text-brand border border-brand/25
                       rounded-xl hover:bg-brand/5 hover:border-brand/40 transition-colors
                       flex items-center justify-center gap-1.5"
          >
            <BarChart2 size={13} />
            View Full Report
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}


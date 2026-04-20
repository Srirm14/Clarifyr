'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type MetricVariant = 'risk-high' | 'risk-medium' | 'risk-low' | 'info' | 'default'

type MetricData = {
  label: string
  numericValue: number
  suffix: string
  sub: string
  variant: MetricVariant
  sparkbar?: boolean
}

const MOCK_METRICS: MetricData[] = [
  { label: 'Risk Score', numericValue: 72, suffix: '', sub: 'High risk', variant: 'risk-high' },
  { label: 'Clauses', numericValue: 34, suffix: '', sub: 'Detected', variant: 'info' },
  { label: 'Red Flags', numericValue: 6, suffix: '', sub: 'Needs review', variant: 'risk-high' },
  { label: 'Favourable', numericValue: 18, suffix: '', sub: 'Clauses', variant: 'risk-low' },
  { label: 'Neutral', numericValue: 10, suffix: '', sub: 'Clauses', variant: 'default' },
  { label: 'Benchmarks', numericValue: 85, suffix: '%', sub: 'vs industry', variant: 'info', sparkbar: true },
]

function metricValueColor(variant: MetricVariant) {
  switch (variant) {
    case 'risk-high': return 'text-[#EF4444]'
    case 'risk-medium': return 'text-amber-500'
    case 'risk-low': return 'text-[#10B981]'
    case 'info': return 'text-brand'
    default: return 'text-[#64748B]'
  }
}

function useAnimatedCounter(target: number, duration = 900, delay = 0) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let startTime: number | null = null
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, delay])

  return count
}

function MetricCard({ metric, index }: Readonly<{ metric: MetricData; index: number }>) {
  const count = useAnimatedCounter(metric.numericValue, 900, index * 60)
  const valueColor = metricValueColor(metric.variant)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      className={cn(
        'group relative rounded-xl p-4 flex flex-col overflow-hidden cursor-default select-none',
        'bg-white border border-[#E2E8F0]',
        'shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
        'hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] hover:-translate-y-px',
        'transition-all duration-200',
      )}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400 leading-none">
        {metric.label}
      </span>
      <span className={cn('relative text-[34px] font-black leading-none mt-2 tabular-nums', valueColor)}>
        {metric.sparkbar && (
          <span
            aria-hidden
            className="absolute left-0 right-0 bottom-1 h-2 rounded-full bg-brand/15 -z-10"
            style={{ width: `${metric.numericValue}%` }}
          />
        )}
        {count}{metric.suffix}
      </span>
      <span className="text-[10px] text-zinc-400 mt-1 leading-none">{metric.sub}</span>
    </motion.div>
  )
}

export default function DocSenseMetrics() {
  const [open, setOpen] = useState(true)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="sticky top-0 z-10 bg-white border-b border-zinc-100 px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-zinc-800 leading-tight">Document Analysis</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] text-zinc-400">Updated just now</span>
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
                <motion.div animate={{ rotate: open ? 0 : -90 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={13} />
                </motion.div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">{open ? 'Collapse' : 'Expand'}</TooltipContent>
          </Tooltip>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="px-4 pt-4 pb-5">
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {MOCK_METRICS.map((m, i) => (
              <MetricCard key={m.label} metric={m} index={i} />
            ))}
          </motion.div>

          <button
            type="button"
            className={cn(
              'w-full mt-3 h-9 text-[12px] font-semibold text-white rounded-xl',
              'bg-gradient-to-r from-brand-light to-brand',
              'flex items-center justify-center gap-1.5',
              'transition-all duration-200',
              'hover:shadow-[0_0_18px_rgba(232,93,4,0.25)] hover:brightness-105',
              'active:brightness-95',
            )}
          >
            <TrendingUp size={13} />
            View Full Report
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

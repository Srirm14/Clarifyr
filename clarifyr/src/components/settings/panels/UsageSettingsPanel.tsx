import { Activity } from 'lucide-react'
import { SectionLead } from '@/components/settings/SectionLead'
import { settingsSectionOffsetClass } from '@/components/settings/settings-layout'
import { settingsCopy } from '@/lib/settings/settings-copy'
import { cn } from '@/lib/utils'
import type { WorkspaceUsage } from '@/lib/settings/types'

const c = settingsCopy.usage

type UsageSettingsPanelProps = Readonly<{
  usage: WorkspaceUsage
}>

function usageMetrics(used: number, total: number) {
  const t = total > 0 ? total : 1
  const usagePct = Math.min(100, Math.max(0, (used / t) * 100))
  const remaining = Math.max(0, total - used)
  return { usagePct, remaining }
}

export function UsageSettingsPanel({ usage: { used, total } }: UsageSettingsPanelProps) {
  const { usagePct, remaining } = usageMetrics(used, total)

  return (
    <>
      <SectionLead icon={Activity} title={c.leadTitle}>
        <p className="text-[12px] leading-relaxed text-zinc-500">{c.leadBody}</p>
      </SectionLead>
      <div className={cn(settingsSectionOffsetClass)}>
        <div className="max-w-md">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-2xl font-semibold tabular-nums text-zinc-900">
              {used}
              <span className="text-base font-medium text-zinc-400"> / {total}</span>
            </p>
            <p className="text-[12px] text-zinc-500 tabular-nums">{c.remaining(remaining)}</p>
          </div>
          <p className="mt-0.5 text-[11px] text-zinc-400">{c.sublabel}</p>
          <div
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200/80"
            role="progressbar"
            aria-valuenow={used}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`${used} of ${total} documents used`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-amber-500/90 transition-[width] duration-500 ease-out"
              style={{ width: `${usagePct}%` }}
            />
          </div>
          <p className="mt-3 text-[11px] text-zinc-400">{c.footnote}</p>
        </div>
      </div>
    </>
  )
}

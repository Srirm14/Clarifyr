import { Shield } from 'lucide-react'
import { SectionLead } from '@/components/settings/SectionLead'
import { settingsSectionOffsetClass } from '@/components/settings/settings-layout'
import { settingsCopy } from '@/lib/settings/settings-copy'
import { cn } from '@/lib/utils'

const c = settingsCopy.documents

export function DocumentsSettingsPanel() {
  return (
    <>
      <SectionLead icon={Shield} title={c.leadTitle}>
        <p className="text-[12px] leading-relaxed text-zinc-500">{c.leadBody}</p>
      </SectionLead>
      <div className={cn('space-y-3 text-[12px] leading-relaxed text-zinc-600', settingsSectionOffsetClass)}>
        <p>{c.p1}</p>
        <p>{c.p2}</p>
      </div>
    </>
  )
}

import { LogOut } from 'lucide-react'
import { SectionLead } from '@/components/settings/SectionLead'
import { settingsSectionOffsetClass } from '@/components/settings/settings-layout'
import { settingsCopy } from '@/lib/settings/settings-copy'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const c = settingsCopy.session

type SessionSettingsPanelProps = Readonly<{
  onSignOut: () => void
}>

export function SessionSettingsPanel({ onSignOut }: SessionSettingsPanelProps) {
  return (
    <>
      <SectionLead icon={LogOut} title={c.leadTitle}>
        <p className="text-[12px] leading-relaxed text-zinc-500">{c.leadBody}</p>
      </SectionLead>
      <div className={cn(settingsSectionOffsetClass)}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-10 gap-2 px-3 text-zinc-700 hover:bg-zinc-100/90 hover:text-zinc-900"
          onClick={onSignOut}
        >
          <LogOut className="size-4 text-zinc-500" />
          {c.logOut}
        </Button>
      </div>
    </>
  )
}

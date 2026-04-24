import { Mail, UserRound } from 'lucide-react'
import { AccountNameForm } from '@/components/settings/AccountNameForm'
import { SectionLead } from '@/components/settings/SectionLead'
import { settingsSectionOffsetClass } from '@/components/settings/settings-layout'
import { settingsCopy } from '@/lib/settings/settings-copy'
import type { WorkspaceUser } from '@/lib/settings/types'
import { cn } from '@/lib/utils'

type AccountSettingsPanelProps = Readonly<{
  user: WorkspaceUser
  displayName: string
  defaultName: string
  onSave: (value: string) => void
  showSaved: boolean
}>

const c = settingsCopy.account

export function AccountSettingsPanel({
  user,
  displayName,
  defaultName,
  onSave,
  showSaved,
}: AccountSettingsPanelProps) {
  return (
    <>
      <SectionLead icon={UserRound} title={c.leadTitle}>
        <p className="text-[12px] leading-relaxed text-zinc-500">{c.leadBody}</p>
      </SectionLead>
      <AccountNameForm
        key={displayName}
        displayName={displayName}
        defaultName={defaultName}
        onSave={onSave}
        showSaved={showSaved}
      />
      <div
        id="account-reference"
        className={cn(
          'flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-zinc-200/50 pt-5 text-[12px] text-zinc-500',
          settingsSectionOffsetClass,
        )}
      >
        <span className="inline-flex items-center gap-1.5 text-zinc-600">
          <Mail className="size-3.5 text-zinc-400" />
          {user.email}
        </span>
        <span className="text-zinc-200">·</span>
        <span>
          <span className="text-zinc-500">{c.planLabel}</span>{' '}
          <span className="font-medium text-zinc-800">{user.plan}</span>
        </span>
      </div>
    </>
  )
}

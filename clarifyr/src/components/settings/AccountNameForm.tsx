'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { settingsCopy } from '@/lib/settings/settings-copy'
import { cn } from '@/lib/utils'
import { settingsSectionOffsetClass } from '@/components/settings/settings-layout'

const FIELD_ID = 'settings-display-name'

type AccountNameFormProps = Readonly<{
  displayName: string
  defaultName: string
  onSave: (value: string) => void
  showSaved: boolean
}>

const c = settingsCopy.account

export function AccountNameForm({ displayName, defaultName, onSave, showSaved }: AccountNameFormProps) {
  const [value, setValue] = React.useState(displayName)
  const canSave = value.trim().length > 0 && value.trim() !== displayName.trim()

  return (
    <div className={cn('flex max-w-2xl flex-col gap-2', settingsSectionOffsetClass)}>
      <Label htmlFor={FIELD_ID} className="text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-400">
        {c.label}
      </Label>
      <p className="text-[12px] leading-relaxed text-zinc-500">{c.fieldHint}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
        <Input
          id={FIELD_ID}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && canSave) onSave(value)
          }}
          className="h-10 max-w-md border-zinc-200/80 bg-white focus-visible:ring-brand/20"
          maxLength={120}
          autoComplete="name"
          placeholder={defaultName}
          aria-describedby="account-reference"
        />
        <div className="flex shrink-0 items-center gap-2">
          <Button type="button" className="h-10 px-4" onClick={() => onSave(value)} disabled={!canSave}>
            {c.save}
          </Button>
          <span
            className={cn(
              'inline-flex min-w-12 items-center gap-0.5 text-[12px] font-medium text-emerald-600 transition-opacity',
              showSaved ? 'opacity-100' : 'pointer-events-none select-none opacity-0',
            )}
            aria-live="polite"
          >
            {showSaved ? (
              <>
                <Check className="size-3.5" strokeWidth={2.5} />
                {c.saved}
              </>
            ) : (
              <span className="invisible h-4">·</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

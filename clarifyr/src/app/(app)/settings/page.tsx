'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { WorkspacePageHeader } from '@/components/workspace'
import { useWorkspaceDisplayName } from '@/hooks/use-workspace-display-name'
import { SIDEBAR_USER } from '@/lib/constants/sidebar'
import { cn } from '@/lib/utils'

const base = SIDEBAR_USER

function SettingsPanel({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  const id = `settings-${title.replaceAll(/\s+/g, '-').toLowerCase()}`
  return (
    <section
      className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-5 ring-1 ring-zinc-950/[0.04]"
      aria-labelledby={id}
    >
      <h2 id={id} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function AccountNameForm({
  displayName,
  defaultName,
  onSave,
  showSaved,
}: Readonly<{
  displayName: string
  defaultName: string
  onSave: (value: string) => void
  showSaved: boolean
}>) {
  const [value, setValue] = React.useState(displayName)
  const canSave = value.trim().length > 0 && value.trim() !== displayName.trim()

  return (
    <div className="mt-4 flex max-w-2xl flex-col gap-2">
      <Label htmlFor="display-name" className="text-[13px] text-zinc-800">
        Display name
      </Label>
      <p className="text-[12px] text-zinc-500">Shown in the sidebar and in export headers when you use them.</p>
      <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
        <Input
          id="display-name"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && canSave) onSave(value)
          }}
          className="h-9 max-w-md"
          maxLength={120}
          autoComplete="name"
          placeholder={defaultName}
          aria-describedby="account-reference"
        />
        <div className="flex shrink-0 items-center gap-2">
          <Button type="button" className="h-9" onClick={() => onSave(value)} disabled={!canSave}>
            Save
          </Button>
          <span
            className={cn(
              'min-w-[3.5rem] text-[12px] text-emerald-700 transition-opacity',
              showSaved ? 'opacity-100' : 'pointer-events-none select-none opacity-0',
            )}
            aria-live="polite"
          >
            {showSaved ? 'Saved' : '\u00a0'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const { displayName, saveDisplayName, fallback: defaultName } = useWorkspaceDisplayName(base.name)
  const [justSaved, setJustSaved] = React.useState(false)
  const saveTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    },
    [],
  )

  const flashSaved = () => {
    setJustSaved(true)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => setJustSaved(false), 2000)
  }

  const saveName = (v: string) => {
    saveDisplayName(v)
    flashSaved()
  }

  const { used, total } = base.usage
  const usagePct = Math.min(100, Math.max(0, (used / total) * 100))
  const remaining = Math.max(0, total - used)

  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <WorkspacePageHeader
        title="Settings"
        description="Account, plan usage, and how documents are stored."
      />

      <div className="mt-6 flex min-h-0 flex-1 flex-col gap-4 pb-2">
        <SettingsPanel title="Account">
          <p className="text-[12px] leading-relaxed text-zinc-500">
            Only your display name can be changed here. Email and plan are reference in this preview.
          </p>

          <AccountNameForm
            key={displayName}
            displayName={displayName}
            defaultName={defaultName}
            onSave={saveName}
            showSaved={justSaved}
          />
          <p id="account-reference" className="mt-3 text-[12px] text-zinc-500">
            <span className="text-zinc-600">Email: </span>
            {base.email}
            <span className="mx-1.5 text-zinc-300">·</span>
            <span className="text-zinc-600">Plan: </span>
            {base.plan}
          </p>
        </SettingsPanel>

        <SettingsPanel title="Usage">
          <p className="text-[12px] leading-relaxed text-zinc-500">
            New document uploads in the current period (Pro plan). Resets on your billing date in production.
          </p>
          <div className="mt-4 max-w-md">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[13px] font-medium text-zinc-900 tabular-nums">
                {used} of {total} documents
              </p>
              <p className="text-[12px] text-zinc-500 tabular-nums">
                {remaining} left
              </p>
            </div>
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200"
              role="progressbar"
              aria-valuenow={used}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`${used} of ${total} documents used`}
            >
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
                style={{ width: `${usagePct}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-zinc-400">Same limits as shown in the sidebar. Demo uses fixed numbers.</p>
          </div>
        </SettingsPanel>

        <SettingsPanel title="Documents">
          <p className="text-[12px] leading-relaxed text-zinc-600">
            Your PDFs are kept in <strong className="font-medium text-zinc-800">private</strong> storage. When you open a file, we
            use a <strong className="font-medium text-zinc-800">short-lived link</strong> to show it in the viewer—not a public or
            permanent URL.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-600">
            <strong className="font-medium text-zinc-800">Analysis</strong> (clauses, risks) is saved so it loads fast when you
            come back. <strong className="font-medium text-zinc-800">Chat</strong> on a document is saved with that document. The
            model runs on <strong className="font-medium text-zinc-800">first upload</strong> only; reopening uses the saved
            results and a fresh link for the PDF.
          </p>
        </SettingsPanel>
      </div>
    </div>
  )
}

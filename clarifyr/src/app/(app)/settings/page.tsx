'use client'

import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Check,
  FileText,
  LogOut,
  Mail,
  Shield,
  UserRound,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkspacePageHeader } from '@/components/workspace'
import {
  useWorkspaceDisplayName,
  WORKSPACE_DISPLAY_NAME_STORAGE_KEY,
} from '@/hooks/use-workspace-display-name'
import { clearDemoSession } from '@/lib/demo-session'
import { SIDEBAR_USER } from '@/lib/constants/sidebar'
import { cn } from '@/lib/utils'

const base = SIDEBAR_USER

const SETTINGS_TABS = ['account', 'usage', 'documents', 'session'] as const
type SettingsTab = (typeof SETTINGS_TABS)[number]

function isSettingsTab(s: string | null): s is SettingsTab {
  return s != null && SETTINGS_TABS.includes(s as SettingsTab)
}

function SectionLead({
  icon: Icon,
  title,
  children,
  className,
}: Readonly<{
  icon: LucideIcon
  title: string
  children: React.ReactNode
  className?: string
}>) {
  return (
    <div className={cn('flex gap-3', className)}>
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100/90 text-zinc-500"
        aria-hidden
      >
        <Icon className="size-[18px] stroke-[1.5]" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="text-[14px] font-semibold leading-tight text-zinc-900">{title}</h3>
        {children}
      </div>
    </div>
  )
}

const tabListClass = cn(
  'h-auto w-full flex-wrap items-stretch justify-start gap-0',
  'border-0 border-b border-zinc-200/50 bg-transparent p-0',
  'sm:flex-nowrap sm:gap-0',
)
const tabTriggerClass = cn(
  'group relative -mb-px inline-flex h-9 shrink-0 items-center justify-center',
  'gap-1.5 rounded-none border-0 border-b-2 border-transparent px-2.5 sm:px-3.5',
  'bg-transparent shadow-none ring-0',
  'text-[12px] font-medium text-zinc-500',
  'data-[state=active]:z-[1] data-[state=active]:border-b-brand data-[state=active]:text-zinc-900',
  'data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:ring-0',
  'hover:text-zinc-800',
  'focus-visible:z-[1] focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
  'disabled:pointer-events-none',
)

const tabIconClass = 'size-3.5 shrink-0 text-zinc-400 group-data-[state=active]:text-brand'

const contentWrapClass = 'max-w-2xl space-y-6 pt-5'

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
    <div className="flex max-w-2xl flex-col gap-2 pl-0 sm:pl-12">
      <Label htmlFor="display-name" className="text-[12px] font-medium uppercase tracking-[0.08em] text-zinc-400">
        Display name
      </Label>
      <p className="text-[12px] leading-relaxed text-zinc-500">Shown in the sidebar and in exports when you use them.</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
        <Input
          id="display-name"
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
            Save
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
                Saved
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

export default function SettingsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: SettingsTab = isSettingsTab(tabParam) ? tabParam : 'account'

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

  const handleLogOut = () => {
    clearDemoSession()
    try {
      globalThis.localStorage.removeItem(WORKSPACE_DISPLAY_NAME_STORAGE_KEY)
    } catch {
      // ignore
    }
    router.replace('/')
  }

  const onTabChange = (value: string) => {
    if (!isSettingsTab(value)) return
    const next = new URLSearchParams(searchParams.toString())
    if (value === 'account') {
      next.delete('tab')
    } else {
      next.set('tab', value)
    }
    const q = next.toString()
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <WorkspacePageHeader
        title="Settings"
        description="Account, plan usage, documents, and sign out."
      />

      <div className="mt-3 min-h-0 flex-1 pb-2 sm:mt-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="flex min-h-0 flex-1 flex-col">
          <TabsList className={tabListClass} aria-label="Settings sections">
            <TabsTrigger className={tabTriggerClass} value="account">
              <UserRound className={tabIconClass} />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger className={tabTriggerClass} value="usage">
              <Activity className={tabIconClass} />
              <span>Usage</span>
            </TabsTrigger>
            <TabsTrigger className={tabTriggerClass} value="documents">
              <FileText className={tabIconClass} />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger className={tabTriggerClass} value="session">
              <LogOut className={tabIconClass} />
              <span>Session</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-0 flex-1 outline-none focus-visible:ring-0 data-[state=active]:mt-0">
            <div className={contentWrapClass}>
              <SectionLead icon={UserRound} title="Profile">
                <p className="text-[12px] leading-relaxed text-zinc-500">
                  Only your display name is editable here. Email and plan are reference in this preview.
                </p>
              </SectionLead>
              <AccountNameForm
                key={displayName}
                displayName={displayName}
                defaultName={defaultName}
                onSave={saveName}
                showSaved={justSaved}
              />
              <div
                id="account-reference"
                className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-zinc-200/50 pt-5 text-[12px] text-zinc-500 pl-0 sm:pl-12"
              >
                <span className="inline-flex items-center gap-1.5 text-zinc-600">
                  <Mail className="size-3.5 text-zinc-400" />
                  {base.email}
                </span>
                <span className="text-zinc-200">·</span>
                <span>
                  <span className="text-zinc-500">Plan</span> <span className="font-medium text-zinc-800">{base.plan}</span>
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="mt-0 flex-1 outline-none focus-visible:ring-0 data-[state=active]:mt-0">
            <div className={contentWrapClass}>
              <SectionLead icon={Activity} title="Document allowance">
                <p className="text-[12px] leading-relaxed text-zinc-500">
                  New uploads in the current period (Pro). Resets on your billing date in production.
                </p>
              </SectionLead>
              <div className="pl-0 sm:pl-12">
                <div className="max-w-md">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-2xl font-semibold tabular-nums text-zinc-900">
                      {used}
                      <span className="text-base font-medium text-zinc-400"> / {total}</span>
                    </p>
                    <p className="text-[12px] text-zinc-500 tabular-nums">{remaining} remaining</p>
                  </div>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Documents this period</p>
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
                  <p className="mt-3 text-[11px] text-zinc-400">Same limits as the sidebar. Fixed numbers in this demo.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-0 flex-1 outline-none focus-visible:ring-0 data-[state=active]:mt-0">
            <div className={contentWrapClass}>
              <SectionLead icon={Shield} title="How documents are handled">
                <p className="text-[12px] leading-relaxed text-zinc-500">
                  Storage and analysis behavior for your PDFs in the product.
                </p>
              </SectionLead>
              <div className="space-y-3 pl-0 text-[12px] leading-relaxed text-zinc-600 sm:pl-12">
                <p>
                  Your PDFs stay in <strong className="font-medium text-zinc-800">private</strong> storage. Each time you open
                  one, we use a <strong className="font-medium text-zinc-800">short-lived</strong> link in the viewer—never a
                  public or permanent URL.
                </p>
                <p>
                  <strong className="font-medium text-zinc-800">Analysis</strong> and chat are kept per document for speed.
                  The model runs on <strong className="font-medium text-zinc-800">first upload</strong> only; when you
                  return, you get saved results and a fresh link for the file.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="session" className="mt-0 flex-1 outline-none focus-visible:ring-0 data-[state=active]:mt-0">
            <div className={contentWrapClass}>
              <SectionLead icon={LogOut} title="Sign out">
                <p className="text-[12px] leading-relaxed text-zinc-500">
                  End this preview session and return to the site. Your demo session and local display name for this tab are
                  cleared.
                </p>
              </SectionLead>
              <div className="pl-0 sm:pl-12">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-10 gap-2 px-3 text-zinc-700 hover:bg-zinc-100/90 hover:text-zinc-900"
                  onClick={handleLogOut}
                >
                  <LogOut className="size-4 text-zinc-500" />
                  Log out
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

import type { LucideIcon } from 'lucide-react'
import { Activity, FileText, LogOut, UserRound } from 'lucide-react'

export const SETTINGS_TAB_QUERY = 'tab' as const

const TAB_IDS = ['account', 'usage', 'documents', 'session'] as const
export type SettingsTabId = (typeof TAB_IDS)[number]

export const SETTINGS_DEFAULT_TAB: SettingsTabId = 'account'

export function isSettingsTabId(s: string | null): s is SettingsTabId {
  return s != null && (TAB_IDS as readonly string[]).includes(s)
}

export const SETTINGS_TABS: ReadonlyArray<{
  id: SettingsTabId
  label: string
  icon: LucideIcon
}> = [
  { id: 'account', label: 'Account', icon: UserRound },
  { id: 'usage', label: 'Usage', icon: Activity },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'session', label: 'Session', icon: LogOut },
]

'use client'

import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  SETTINGS_DEFAULT_TAB,
  SETTINGS_TAB_QUERY,
  isSettingsTabId,
  type SettingsTabId,
} from '@/lib/settings/tabs.config'

export function useSettingsTabParam() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const param = searchParams.get(SETTINGS_TAB_QUERY)
  const activeTab: SettingsTabId = isSettingsTabId(param) ? param : SETTINGS_DEFAULT_TAB

  const setTab = React.useCallback(
    (value: string) => {
      if (!isSettingsTabId(value)) return
      const next = new URLSearchParams(searchParams.toString())
      if (value === SETTINGS_DEFAULT_TAB) {
        next.delete(SETTINGS_TAB_QUERY)
      } else {
        next.set(SETTINGS_TAB_QUERY, value)
      }
      const q = next.toString()
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  return { activeTab, setTab } as const
}

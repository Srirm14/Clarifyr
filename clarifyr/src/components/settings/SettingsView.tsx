'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkspacePageHeader } from '@/components/workspace'
import { useEphemeralFlag } from '@/hooks/use-ephemeral-flag'
import { useSettingsTabParam } from '@/hooks/use-settings-tab-param'
import { useWorkspaceDisplayName } from '@/hooks/use-workspace-display-name'
import { clearAppClientSession } from '@/lib/app/clear-client-session'
import { SIDEBAR_USER } from '@/lib/constants/sidebar'
import { settingsCopy } from '@/lib/settings/settings-copy'
import { SETTINGS_TABS } from '@/lib/settings/tabs.config'
import { AccountSettingsPanel } from '@/components/settings/panels/AccountSettingsPanel'
import { UsageSettingsPanel } from '@/components/settings/panels/UsageSettingsPanel'
import { DocumentsSettingsPanel } from '@/components/settings/panels/DocumentsSettingsPanel'
import { SessionSettingsPanel } from '@/components/settings/panels/SessionSettingsPanel'
import {
  settingsContentWrapClass,
  settingsTabIconClass,
  settingsTabListClass,
  settingsTabTriggerClass,
  settingsTabsContentClass,
} from '@/components/settings/settings-layout'

const defaultUser = SIDEBAR_USER
const c = settingsCopy.page

const FLASH_MS = 2000

export function SettingsView() {
  const router = useRouter()
  const { activeTab, setTab } = useSettingsTabParam()
  const { displayName, saveDisplayName, fallback: defaultName } = useWorkspaceDisplayName(defaultUser.name)
  const { on: justSaved, flash: flashSaved } = useEphemeralFlag(FLASH_MS)

  const onSaveName = React.useCallback(
    (v: string) => {
      saveDisplayName(v)
      flashSaved()
    },
    [saveDisplayName, flashSaved],
  )

  const onSignOut = React.useCallback(() => {
    clearAppClientSession()
    router.replace('/')
  }, [router])

  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <WorkspacePageHeader title={c.title} description={c.description} />

      <div className="mt-3 min-h-0 flex-1 pb-2 sm:mt-4">
        <Tabs value={activeTab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
          <TabsList className={settingsTabListClass} aria-label={settingsCopy.a11y.tabList}>
            {SETTINGS_TABS.map(tab => {
              const Icon = tab.icon
              return (
                <TabsTrigger key={tab.id} className={settingsTabTriggerClass} value={tab.id}>
                  <Icon className={settingsTabIconClass} />
                  <span>{tab.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value="account" className={settingsTabsContentClass}>
            <div className={settingsContentWrapClass}>
              <AccountSettingsPanel
                user={defaultUser}
                displayName={displayName}
                defaultName={defaultName}
                onSave={onSaveName}
                showSaved={justSaved}
              />
            </div>
          </TabsContent>

          <TabsContent value="usage" className={settingsTabsContentClass}>
            <div className={settingsContentWrapClass}>
              <UsageSettingsPanel usage={defaultUser.usage} />
            </div>
          </TabsContent>

          <TabsContent value="documents" className={settingsTabsContentClass}>
            <div className={settingsContentWrapClass}>
              <DocumentsSettingsPanel />
            </div>
          </TabsContent>

          <TabsContent value="session" className={settingsTabsContentClass}>
            <div className={settingsContentWrapClass}>
              <SessionSettingsPanel onSignOut={onSignOut} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

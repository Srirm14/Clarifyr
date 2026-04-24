import { clearWorkspaceDisplayNameStorage } from '@/hooks/use-workspace-display-name'
import { clearDemoSession } from '@/lib/demo-session'

/**
 * Clears the demo app session and local display-name (preview / localStorage).
 */
export function clearAppClientSession() {
  clearDemoSession()
  clearWorkspaceDisplayNameStorage()
}

import { SIDEBAR_USER } from '@/lib/constants/sidebar'

export type WorkspaceUser = typeof SIDEBAR_USER

export type WorkspaceUsage = WorkspaceUser['usage']

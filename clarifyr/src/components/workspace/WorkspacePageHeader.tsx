'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type WorkspacePageHeaderProps = {
  title: React.ReactNode
  description?: React.ReactNode
  /** Primary action(s) on the right (e.g. upload, export). */
  actions?: React.ReactNode
  className?: string
}

/**
 * Standard workspace title block: page heading, optional subcopy, and optional trailing actions.
 */
export function WorkspacePageHeader({
  title,
  description,
  actions,
  className,
}: Readonly<WorkspacePageHeaderProps>) {
  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0">
        {typeof title === 'string' ? (
          <h1 className="text-subsection font-semibold text-zinc-950">{title}</h1>
        ) : (
          title
        )}
        {description != null && (
          <div className="mt-1 text-body-sm text-zinc-500">
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
        )}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  )
}

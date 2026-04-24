'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type WorkspaceTableToolbarProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Full-width bar below the page header: filters, toggles, or other table-level controls.
 */
export function WorkspaceTableToolbar({ children, className }: Readonly<WorkspaceTableToolbarProps>) {
  return <div className={cn('mt-6 flex w-full min-w-0 flex-wrap gap-1', className)}>{children}</div>
}

type WorkspaceToolbarPillLinkProps = {
  href: string
  active?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Rounded “pill” control for filter segments (or similar) in a {@link WorkspaceTableToolbar}.
 */
export function WorkspaceToolbarPillLink({
  href,
  active = false,
  children,
  className,
}: Readonly<WorkspaceToolbarPillLinkProps>) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium transition-colors duration-200',
        active
          ? 'bg-brand text-white'
          : 'text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-900',
        className,
      )}
    >
      {children}
    </Link>
  )
}

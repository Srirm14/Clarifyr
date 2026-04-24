'use client'

import * as React from 'react'
import Link from 'next/link'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

// ─── Shared layout tokens (also used by route loading UIs) ─────────────────
/** Horizontal inset for the table panel. */
export const WORKSPACE_DATA_TABLE_GUTTER = 'px-2 sm:px-3' as const

const panelClass =
  'flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden rounded-2xl bg-zinc-50/50'
const rowInteractive =
  'text-inherit no-underline transition-colors duration-200 hover:bg-zinc-100/80 active:bg-zinc-100 active:scale-[0.998]'

// ─── Internal building blocks (not exported — use `<WorkspaceTable />` only) ─
const TableRoot = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function TableRoot({ className, ...props }, ref) {
    return <div ref={ref} className={cn(panelClass, className)} {...props} />
  },
)

const TableScroll = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function TableScroll({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('min-h-0 flex-1 overflow-x-auto [scrollbar-gutter:stable]', className)}
        {...props}
      />
    )
  },
)

const TableGrid = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'> & { minWidth?: number }>(
  function TableGrid({ className, minWidth = 980, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex h-full min-w-0 flex-col', className)}
        style={{ minWidth, ...style }}
        {...props}
      />
    )
  },
)

const TableHeaderRow = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function TableHeaderRow({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn('grid grid-cols-12 items-center gap-3 py-2.5', className)} {...props} />
    )
  },
)

const TableHead = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { align?: 'left' | 'right' }
>(function TableHead({ className, align = 'left', ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'text-[10px] font-medium uppercase leading-tight tracking-[0.12em] text-zinc-400',
        align === 'right' && 'text-right',
        className,
      )}
      {...props}
    />
  )
})

const TableBody = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function TableBody({ className, ...props }, ref) {
    return <div ref={ref} className={cn('flex flex-col gap-0.5 pb-0.5', className)} {...props} />
  },
)

type TableRowProps = React.ComponentProps<'div'> & { asChild?: boolean }

function TableRow({ asChild, className, children, ...props }: TableRowProps) {
  const base = 'group grid grid-cols-12 items-center gap-3 rounded-lg py-2.5'
  if (asChild) {
    return (
      <Slot className={cn(base, rowInteractive, className)} {...(props as React.ComponentProps<typeof Slot>)}>
        {children}
      </Slot>
    )
  }
  return (
    <div className={cn(base, className)} {...props}>
      {children}
    </div>
  )
}

const TableFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between pt-2.5 pb-1 text-[13px] text-zinc-500', className)}
        {...props}
      />
    )
  },
)

// ─── Public API ───────────────────────────────────────────────────────────
export type WorkspaceTableColumn<T> = {
  id: string
  colClassName: string
  header: React.ReactNode
  headerAlign?: 'left' | 'right'
  cell: (row: T) => React.ReactNode
}

export type WorkspaceTablePagination = {
  from: number
  to: number
  total: number
  page: number
  totalPages: number
  prevHref: string
  nextHref: string
  prevDisabled: boolean
  nextDisabled: boolean
}

type WorkspaceTableProps<T> = {
  columns: ReadonlyArray<WorkspaceTableColumn<T>>
  rows: readonly T[]
  getRowKey: (row: T) => string
  rowHref: (row: T) => string
  emptyState: React.ReactNode
  pagination: WorkspaceTablePagination
  className?: string
  minWidth?: number
}

const paginationLinkBase =
  'h-8 inline-flex items-center rounded-md px-2.5 text-[13px] font-medium transition-colors duration-200'

function WorkspaceTable<T>({
  columns,
  rows,
  getRowKey,
  rowHref,
  emptyState,
  pagination,
  className,
  minWidth = 980,
}: Readonly<WorkspaceTableProps<T>>) {
  const empty = rows.length === 0

  return (
    <TableRoot className={className}>
      <TableScroll>
        <TableGrid className={cn('h-full flex flex-col', WORKSPACE_DATA_TABLE_GUTTER)} minWidth={minWidth}>
          <TableHeaderRow>
            {columns.map(col => (
              <TableHead key={col.id} className={col.colClassName} align={col.headerAlign}>
                {col.header}
              </TableHead>
            ))}
          </TableHeaderRow>

          <TableBody>
            {empty ? (
              <div
                className="flex w-full flex-col items-center justify-center rounded-lg py-14 text-center text-[13px] text-zinc-500"
                role="status"
                aria-live="polite"
              >
                {emptyState}
              </div>
            ) : (
              rows.map(row => (
                <TableRow key={getRowKey(row)} asChild>
                  <Link href={rowHref(row)} className="min-w-0">
                    {columns.map(col => (
                      <div key={col.id} className={cn('min-w-0', col.colClassName)}>
                        {col.cell(row)}
                      </div>
                    ))}
                  </Link>
                </TableRow>
              ))
            )}
          </TableBody>
        </TableGrid>
      </TableScroll>

      <TableFooter className={WORKSPACE_DATA_TABLE_GUTTER}>
        <p className="text-caption">
          Showing{' '}
          <span className="text-zinc-800 font-medium tabular-nums">
            {pagination.from}–{pagination.to}
          </span>{' '}
          of <span className="text-zinc-800 font-medium tabular-nums">{pagination.total}</span>
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={pagination.prevHref}
            className={cn(
              paginationLinkBase,
              pagination.prevDisabled
                ? 'pointer-events-none text-zinc-300'
                : 'text-zinc-500 hover:bg-zinc-100/90 hover:text-zinc-900',
            )}
            aria-disabled={pagination.prevDisabled}
          >
            Prev
          </Link>
          <div className="px-1 text-[13px] text-zinc-500 tabular-nums">
            <span className="text-zinc-800 font-medium">{pagination.page}</span>
            <span className="text-zinc-400"> / {pagination.totalPages}</span>
          </div>
          <Link
            href={pagination.nextHref}
            className={cn(
              paginationLinkBase,
              pagination.nextDisabled
                ? 'pointer-events-none text-zinc-300'
                : 'text-zinc-500 hover:bg-zinc-100/90 hover:text-zinc-900',
            )}
            aria-disabled={pagination.nextDisabled}
          >
            Next
          </Link>
        </div>
      </TableFooter>
    </TableRoot>
  )
}

export { WorkspaceTable }

/** Same panel styles as the table container (for `loading` routes that mirror the shell). */
export { panelClass as WORKSPACE_TABLE_PANEL_CLASS }

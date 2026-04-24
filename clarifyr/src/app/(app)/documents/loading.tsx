import { cn } from '@/lib/utils'
import { WORKSPACE_DATA_TABLE_GUTTER, WORKSPACE_TABLE_PANEL_CLASS } from '@/components/workspace'
import { Skeleton } from '@/components/ui/skeleton'

const filterKeys = ['all', 'emp', 'nda', 'rent', 'free'] as const
const rowKeys = ['1', '2', '3', '4', '5', '6', '7', '8'] as const

function RowSkeleton() {
  return (
    <div className="grid grid-cols-12 items-center gap-3 py-2.5" aria-hidden>
      <div className="col-span-5 flex min-w-0 items-center gap-3">
        <Skeleton className="h-7 w-7 shrink-0 rounded-md bg-zinc-200/80" />
        <Skeleton className="h-4 min-w-0 max-w-full flex-1 bg-zinc-200/80 sm:w-56" />
      </div>
      <div className="col-span-2">
        <Skeleton className="h-3.5 w-20 bg-zinc-200/80" />
      </div>
      <Skeleton className="col-span-2 h-3.5 w-24 bg-zinc-200/80" />
      <Skeleton className="col-span-2 h-3.5 w-32 max-w-full bg-zinc-200/80" />
      <div className="col-span-1 flex justify-end">
        <Skeleton className="h-3.5 w-14 bg-zinc-200/80" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div
      className="flex h-full w-full min-w-0 flex-col"
      aria-busy="true"
      aria-label="Loading documents"
    >
      <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-zinc-200/80 sm:h-7" />
          <Skeleton className="h-4 w-64 max-w-full bg-zinc-200/70" />
        </div>
        <Skeleton className="h-10 w-44 shrink-0 rounded-md bg-zinc-200/80" />
      </div>

      <div className="mt-6 flex w-full min-w-0 flex-wrap gap-1">
        {filterKeys.map((k, i) => (
          <Skeleton
            key={k}
            className={cn('h-8 rounded-full bg-zinc-200/80', i === 0 ? 'w-12' : 'w-[4.5rem]')}
          />
        ))}
      </div>

      <div className={cn(WORKSPACE_TABLE_PANEL_CLASS, 'mt-5')}>
        <div className="min-h-0 flex-1 overflow-x-auto [scrollbar-gutter:stable]">
          <div
            className={cn('flex h-full min-w-0 flex-col', WORKSPACE_DATA_TABLE_GUTTER)}
            style={{ minWidth: 980 }}
          >
            <div className="grid grid-cols-12 items-center gap-3 py-2.5" aria-hidden>
              <Skeleton className="col-span-5 h-3 w-32 bg-zinc-200/50" />
              <Skeleton className="col-span-2 h-3 w-10 bg-zinc-200/50" />
              <Skeleton className="col-span-2 h-3 w-16 bg-zinc-200/50" />
              <Skeleton className="col-span-2 h-3 w-24 bg-zinc-200/50" />
              <div className="col-span-1 flex justify-end">
                <Skeleton className="h-3 w-12 bg-zinc-200/50" />
              </div>
            </div>

            <div className="flex flex-col gap-0.5 pb-0.5">
              {rowKeys.map(k => (
                <RowSkeleton key={k} />
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'flex items-center justify-between pt-2.5 pb-1 text-[13px] text-zinc-500',
            WORKSPACE_DATA_TABLE_GUTTER,
          )}
        >
          <Skeleton className="h-4 w-40 bg-zinc-200/60" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-10 rounded-md bg-zinc-200/60" />
            <Skeleton className="h-4 w-10 bg-zinc-200/60" />
            <Skeleton className="h-8 w-11 rounded-md bg-zinc-200/60" />
          </div>
        </div>
      </div>
    </div>
  )
}

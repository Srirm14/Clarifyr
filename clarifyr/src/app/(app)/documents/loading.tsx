import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  const chipKeys = ['all', 'employment', 'nda', 'rental', 'freelance'] as const
  const rowKeys = ['1', '2', '3', '4', '5', '6'] as const

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-44 rounded-lg" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {chipKeys.map(k => (
          <Skeleton key={k} className="h-8 w-24 rounded-md" />
        ))}
      </div>

      <div className="mt-5 card-base p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-zinc-200 bg-zinc-50/60">
              <Skeleton className="col-span-4 h-4" />
              <Skeleton className="col-span-2 h-4" />
              <Skeleton className="col-span-2 h-4" />
              <Skeleton className="col-span-2 h-4" />
              <Skeleton className="col-span-1 h-4" />
              <Skeleton className="col-span-1 h-4" />
            </div>

            <div className="divide-y divide-zinc-100">
              {rowKeys.map(k => (
                <div key={k} className="grid grid-cols-12 gap-3 px-5 py-4 items-center">
                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-4 w-[260px]" />
                  </div>
                  <div className="col-span-2">
                    <Skeleton className="h-7 w-24 rounded-md" />
                  </div>
                  <Skeleton className="col-span-2 h-4 w-28" />
                  <Skeleton className="col-span-2 h-4 w-40" />
                  <Skeleton className="col-span-1 h-4 w-16 ml-auto" />
                  <div className="col-span-1 flex justify-end">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


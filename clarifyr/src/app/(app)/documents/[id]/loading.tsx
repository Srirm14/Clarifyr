import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="w-full min-w-0 max-w-[1100px]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-2 min-w-0">
            <Skeleton className="h-6 w-[320px]" />
            <Skeleton className="h-4 w-[240px]" />
          </div>
        </div>
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-base p-6">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-[360px] w-full rounded-lg" />
        </div>
        <div className="card-base p-6">
          <Skeleton className="h-4 w-40" />
          <div className="mt-4 space-y-3">
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-3/6" />
          </div>
        </div>
      </div>
    </div>
  )
}


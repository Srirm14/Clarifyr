import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    // Match the full-bleed viewer layout in `page.tsx`
    <div className="-m-6 h-[calc(100%+48px)] flex flex-col overflow-hidden">
      <div className="w-full h-full min-h-0 flex overflow-hidden workspace-canvas workspace-warm-wash">
        {/* Pages rail */}
        <div className="w-[120px] flex-shrink-0 h-full flex flex-col px-3 py-3">
          <div className="workspace-panel rounded-xl overflow-hidden flex flex-col h-full">
            <div className="h-10 flex items-center px-4 border-b border-zinc-100 flex-shrink-0">
              <span className="text-[9px] font-semibold text-zinc-300 uppercase tracking-widest">Pages</span>
            </div>
            <div className="px-3 py-3 flex flex-col gap-3">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="workspace-surface rounded-lg overflow-hidden">
                  <div className="px-2 pt-2 pb-1.5">
                    <Skeleton className="h-[90px] w-[64px] rounded-lg" />
                  </div>
                  <div className="h-7 border-t border-zinc-100/80 flex items-center justify-center">
                    <Skeleton className="h-3 w-5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PDF stage */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          <div className="relative flex-1 min-h-0 overflow-hidden workspace-canvas">
            {/* Analyze bookmark placeholder */}
            <div className="absolute top-6 right-0 z-10">
              <Skeleton className="h-10 w-[120px] rounded-l-xl" />
            </div>

            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-10px_24px_rgba(0,0,0,0.08)]" />

            <div className="h-full overflow-hidden">
              <div className="py-6 flex justify-center">
                <div className="workspace-surface rounded-3xl overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
                  <Skeleton className="h-[520px] w-[680px]" />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
              <div className="px-3 py-1 rounded-full workspace-panel border-zinc-200/70">
                <Skeleton className="h-3 w-14 rounded" />
              </div>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="workspace-canvas flex items-center px-4 h-16 flex-shrink-0">
            <div className="w-full h-11 rounded-2xl workspace-panel flex items-center px-3 gap-2 border-zinc-200/70">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <div className="h-5 w-px bg-zinc-200 mx-1" />
              <Skeleton className="h-4 flex-1 rounded" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


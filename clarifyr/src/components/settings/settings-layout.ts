import { cn } from '@/lib/utils'

export const settingsTabListClass = cn(
  'h-auto w-full flex-wrap items-stretch justify-start gap-0',
  'border-0 border-b border-zinc-200/50 bg-transparent p-0',
  'sm:flex-nowrap sm:gap-0',
)

export const settingsTabTriggerClass = cn(
  'group relative -mb-px inline-flex h-9 shrink-0 items-center justify-center',
  'gap-1.5 rounded-none border-0 border-b-2 border-transparent px-2.5 sm:px-3.5',
  'bg-transparent shadow-none ring-0',
  'text-[12px] font-medium text-zinc-500',
  'data-[state=active]:z-[1] data-[state=active]:border-b-brand data-[state=active]:text-zinc-900',
  'data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:ring-0',
  'hover:text-zinc-800',
  'focus-visible:z-[1] focus-visible:ring-2 focus-visible:ring-brand/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
  'disabled:pointer-events-none',
)

export const settingsTabIconClass =
  'size-3.5 shrink-0 text-zinc-400 group-data-[state=active]:text-brand'

export const settingsContentWrapClass = 'max-w-2xl space-y-6 pt-5'

export const settingsTabsContentClass =
  'mt-0 flex-1 outline-none focus-visible:ring-0 data-[state=active]:mt-0'

export const settingsSectionOffsetClass = 'pl-0 sm:pl-12'

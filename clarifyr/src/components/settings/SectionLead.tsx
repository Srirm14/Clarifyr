import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionLeadProps = Readonly<{
  icon: LucideIcon
  title: string
  children: ReactNode
  className?: string
}>

export function SectionLead({ icon: Icon, title, children, className }: SectionLeadProps) {
  return (
    <div className={cn('flex gap-3', className)}>
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100/90 text-zinc-500"
        aria-hidden
      >
        <Icon className="size-[18px] stroke-[1.5]" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="text-[14px] font-semibold leading-tight text-zinc-900">{title}</h3>
        {children}
      </div>
    </div>
  )
}

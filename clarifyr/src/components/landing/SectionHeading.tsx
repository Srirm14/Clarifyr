import { cn } from '@/lib/utils'
import type { SectionHeadingProps } from '@/types/landing'

export default function SectionHeading({
  eyebrow,
  heading,
  sub,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-14', centered && 'text-center', className)}>
      <p className="eyebrow-label mb-3">{eyebrow}</p>
      <h2 className="heading-section text-balance">{heading}</h2>
      {sub && (
        <p className="body-lead mt-4 max-w-prose mx-auto">{sub}</p>
      )}
    </div>
  )
}

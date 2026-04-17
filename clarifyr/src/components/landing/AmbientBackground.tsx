import { cn } from '@/lib/utils'

type Preset =
  | 'hero'
  | 'section'
  | 'sectionAlt'
  | 'footer'
  | 'dark'

// Blue-only ambient lighting (match reference: blue → white, minimal)
const PRESETS: Record<Preset, { wash: string; glow: string }> = {
  hero: {
    wash:
      'absolute -top-56 left-1/2 -translate-x-1/2 w-[1100px] h-[900px] rounded-full blur-2xl ' +
      'bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.14)_0%,transparent_76%)]',
    glow:
      'absolute top-20 -left-72 w-[860px] h-[860px] rounded-full blur-2xl ' +
      'bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.10)_0%,transparent_78%)]',
  },
  section: {
    wash:
      'absolute -top-56 right-[-220px] w-[820px] h-[720px] rounded-full blur-2xl ' +
      'bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.12)_0%,transparent_84%)]',
    glow:
      'absolute bottom-[-300px] left-[-300px] w-[920px] h-[820px] rounded-full blur-2xl ' +
      'bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.09)_0%,transparent_86%)]',
  },
  sectionAlt: {
    wash:
      'absolute bottom-[-280px] right-[-240px] w-[900px] h-[740px] rounded-full blur-2xl ' +
      'bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.11)_0%,transparent_86%)]',
    glow:
      'absolute -top-52 left-[-320px] w-[980px] h-[820px] rounded-full blur-2xl ' +
      'bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.09)_0%,transparent_86%)]',
  },
  footer: {
    wash:
      'absolute -bottom-60 left-[-260px] w-[900px] h-[780px] rounded-full blur-2xl ' +
      'bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.08)_0%,transparent_90%)]',
    glow:
      'absolute -top-80 right-[-360px] w-[1060px] h-[940px] rounded-full blur-2xl ' +
      'bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08)_0%,transparent_90%)]',
  },
  dark: {
    wash:
      'absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(96,165,250,0.12),transparent_70%)]',
    glow:
      'absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_18%_20%,rgba(37,99,235,0.12),transparent_74%)]',
  },
}

export default function AmbientBackground({
  preset,
  className,
}: Readonly<{
  preset: Preset
  className?: string
}>) {
  const p = PRESETS[preset]

  return (
    <div className={cn('pointer-events-none absolute inset-0 z-0', className)}>
      <div className={p.wash} />
      <div className={p.glow} />
    </div>
  )
}


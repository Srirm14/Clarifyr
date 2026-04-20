'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import type { HeadlineSeg } from './headlines'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.022 } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

const char: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  },
}

export default function AnimatedHeadline({ segments }: Readonly<{ segments: HeadlineSeg[] }>) {
  const items = segments.flatMap((seg, si) => {
    const chars = seg.t
      .split('')
      .map((ch, ci) => ({ kind: 'ch' as const, ch, b: seg.b, id: `${si}-${ci}` }))
    return seg.br ? [...chars, { kind: 'br' as const, id: `${si}-br` }] : chars
  })

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={segments.map(s => s.t).join('')}
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="inline"
      >
        {items.map(item => {
          if (item.kind === 'br') return <br key={item.id} aria-hidden />

          return (
            <motion.span
              key={item.id}
              variants={char}
              className={
                item.b
                  ? 'text-gradient-brand'
                  : 'text-zinc-950'
              }
              style={{ display: 'inline', whiteSpace: 'pre' }}
            >
              {item.ch}
            </motion.span>
          )
        })}
      </motion.span>
    </AnimatePresence>
  )
}


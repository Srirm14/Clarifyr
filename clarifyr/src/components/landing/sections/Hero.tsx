'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import type { CTAProps } from '@/types/landing'
import AmbientBackground from '@/components/landing/AmbientBackground'
import HeroReportMock from '@/components/landing/HeroReportMock'

type Seg = { t: string; b: boolean; br?: boolean }

const HEADLINES: Seg[][] = [
  [
    { t: 'Every contract ', b: false },
    { t: 'hides risks.', b: true, br: true },
    { t: ' We find them in ', b: false },
    { t: '30 seconds.', b: true },
  ],
  [
    { t: 'Signing blind ', b: false },
    { t: 'costs money.', b: true, br: true },
    { t: ' AI analysis ', b: false },
    { t: 'costs nothing.', b: true },
  ],
  [
    { t: "That NDA you're about to sign? ", b: false, br: true },
    { t: 'Read it first.', b: true },
  ],
  [
    { t: 'Know your ', b: false },
    { t: 'leverage', b: true, br: true },
    { t: ' before you negotiate. ', b: false },
    { t: "We'll find it.", b: true },
  ],
  [
    { t: 'Legal jargon ', b: true },
    { t: 'translated into ', b: false, br: true },
    { t: 'plain English.', b: true },
    { t: ' Instantly.', b: false },
  ],
  [
    { t: "Your employer's lawyer wrote it. ", b: false, br: true },
    { t: 'You should understand it.', b: true },
  ],
  [
    { t: '50,000+ contracts analyzed. ', b: false, br: true },
    { t: "We've seen every trick.", b: true },
  ],
  [
    { t: 'That non-compete? It might be ', b: false },
    { t: 'unenforceable.', b: true, br: true },
    { t: " Let's check.", b: false },
  ],
  [
    { t: 'Risky clauses ', b: true },
    { t: 'flagged. Plain English. ', b: false, br: true },
    { t: 'Done in 30s.', b: true },
  ],
  [
    { t: 'Upload. Analyze. ', b: false, br: true },
    { t: 'Negotiate with confidence.', b: true },
  ],
]

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

function AnimatedHeadline({ segments }: Readonly<{ segments: Seg[] }>) {
  const items = segments.flatMap((seg, si) => {
    const chars = seg.t
      .split('')
      .map((ch, ci) => ({ kind: 'ch' as const, ch, b: seg.b, id: `${si}-${ci}` }))
    return seg.br ? [...chars, { kind: 'br' as const, id: `${si}-br` }] : chars
  })

  return (
    <motion.span
      key={segments.map(s => s.t).join('')}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="inline"
    >
      {items.map(item => {
        if (item.kind === 'br') {
          return <br key={item.id} aria-hidden />
        }

        return (
          <motion.span
            key={item.id}
            variants={char}
            className={
              item.b
                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent'
                : 'text-zinc-950'
            }
            style={{ display: 'inline', whiteSpace: 'pre' }}
          >
            {item.ch}
          </motion.span>
        )
      })}
    </motion.span>
  )
}

export default function Hero({ onCTAClick }: CTAProps) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const totalChars = HEADLINES[idx].reduce((n, s) => n + s.t.length, 0)
    const typeDuration = totalChars * 22 + 2600
    const id = setTimeout(() => setIdx(i => (i + 1) % HEADLINES.length), typeDuration)
    return () => clearTimeout(id)
  }, [idx])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center pt-16 overflow-hidden">
      <AmbientBackground preset="hero" />

      <div className="relative z-10 max-w-container mx-auto section-pad px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                             border border-brand-200 bg-brand-50 text-[12px] font-semibold
                             text-brand tracking-wide uppercase">
              <ShieldCheck size={12} />
              AI-Powered Contract Analysis
            </span>
          </motion.div>

          {/* Dynamic headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-section md:text-hero font-extrabold text-balance mt-4 max-w-[860px] mx-auto
                       leading-[1.12] md:leading-[1.08] min-h-[2.9em] flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <AnimatedHeadline key={idx} segments={HEADLINES[idx]} />
            </AnimatePresence>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-lead text-zinc-500 leading-relaxed mt-4 max-w-[540px] mx-auto"
          >
            Clarifyr reads every clause, flags what&apos;s unfair, and explains legal
            jargon in plain English — so you sign with confidence, not crossed fingers.
          </motion.p>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-1.5 mt-5"
          >
            {HEADLINES.map((segs, i) => (
              <button
                key={segs[0].t}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === idx ? 'w-5 h-1.5 bg-brand' : 'w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400'
                }`}
                aria-label={`Headline ${i + 1}`}
              />
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-7"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCTAClick}
              className="btn-primary-lg"
            >
              Analyze a Contract Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCTAClick}
              className="btn-secondary px-8 py-4 text-base"
            >
              View Sample Report
            </motion.button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-caption text-zinc-400 mt-4"
          >
            ✓ No credit card &nbsp;·&nbsp; ✓ 3 free analyses &nbsp;·&nbsp; ✓ Results in 30 seconds
          </motion.p>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-[860px] mx-auto mt-16 relative"
          >
            {/* Soft blue base glow behind mock */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-[72%] h-12
                            bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18)_0%,transparent_70%)]
                            blur-2xl rounded-full -z-10" />
            <HeroReportMock />
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { fadeUp, scaleIn, viewport } from '@/lib/motion'
import type { CTAProps } from '@/types/landing'

export default function Demo({ onCTAClick }: CTAProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(barRef, { once: true, margin: '-100px' })

  return (
    <section id="demo" className="bg-zinc-50 section-pad">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <p className="eyebrow-label">THE BENCHMARK ADVANTAGE</p>
            <h2 className="heading-section text-left mt-3">
              Know what&apos;s &ldquo;normal.&rdquo; Push back with confidence.
            </h2>
            <p className="body-lead text-left mt-4">
              Stop wondering if a clause is standard practice or a red flag. Clarifyr
              benchmarks every clause against industry norms so you can negotiate
              from a position of knowledge, not guesswork.
            </p>

            <div className="mt-8">
              <p className="text-[72px] font-extrabold text-brand leading-none tracking-tight">78%</p>
              <p className="text-lead text-zinc-600 mt-2">
                of reviewed NDAs do not include this clause.
              </p>
            </div>

            <button onClick={onCTAClick} className="btn-secondary mt-8">
              See It In Action →
            </button>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ delay: 0.15 }}
            className="card-base p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-micro font-semibold uppercase tracking-widest text-zinc-400">
                Clause Benchmark
              </span>
              <Badge variant="destructive" className="text-[11px]">● Critical</Badge>
            </div>

            <h3 className="text-[17px] font-semibold text-zinc-900 mt-1">
              Unilateral Indemnification
            </h3>
            <p className="text-body-sm text-zinc-500 leading-relaxed mt-1.5">
              You are agreeing to cover all their legal costs if they are sued,
              but they are not offering the same protection to you.
            </p>

            <div className="mt-5" ref={barRef}>
              <div className="flex justify-between text-caption text-zinc-400 mb-2">
                <span>Rare</span>
                <span>Standard</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-red-400"
                  initial={{ width: 0 }}
                  animate={{ width: inView ? '22%' : 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
              <p className="text-caption text-zinc-400 italic mt-2">
                Only 22% of standard contracts include this severity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

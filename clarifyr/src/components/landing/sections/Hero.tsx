'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import type { CTAProps } from '@/types/landing'
import AmbientBackground from '@/components/landing/AmbientBackground'
import AnimatedHeadline from '@/components/landing/hero/AnimatedHeadline'
import HeroReportMock from '@/components/landing/hero/HeroReportMock'
import { HERO_HEADLINES } from '@/components/landing/hero/headlines'

export default function Hero({ onCTAClick }: Readonly<CTAProps>) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const totalChars = HERO_HEADLINES[idx].reduce((n, s) => n + s.t.length, 0)
    const typeDuration = totalChars * 22 + 2600
    const id = setTimeout(() => setIdx(i => (i + 1) % HERO_HEADLINES.length), typeDuration)
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
            <AnimatedHeadline key={idx} segments={HERO_HEADLINES[idx]} />
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
            {HERO_HEADLINES.map((segs, i) => (
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
            {/* Soft base glow behind mock */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-[72%] h-12
                            bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.10)_0%,transparent_70%)]
                            blur-2xl rounded-full -z-10" />
            <HeroReportMock />
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

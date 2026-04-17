'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewport } from '@/lib/motion'
import type { CTAProps } from '@/types/landing'

export default function FinalCTA({ onCTAClick }: CTAProps) {
  return (
    <section
      id="final-cta"
      className="relative bg-zinc-950 section-pad text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(124,58,237,0.15),transparent)] pointer-events-none" />

      <div className="relative max-w-container mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p
            variants={staggerItem}
            className="text-eyebrow font-semibold uppercase tracking-[0.1em] text-brand-light"
          >
            GET STARTED
          </motion.p>

          <motion.h2
            variants={staggerItem}
            className="text-section font-extrabold text-white text-balance
                       max-w-[640px] mx-auto mt-3"
          >
            Stop signing contracts you don&apos;t understand.
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-lead text-zinc-400 max-w-xl mx-auto mt-5 leading-relaxed"
          >
            Join thousands of people who use Clarifyr to read contracts with confidence.
            Start free — no credit card required.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-10">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(124,58,237,0.40)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onCTAClick}
              className="btn-primary-lg"
            >
              Analyze a Contract Free
            </motion.button>
          </motion.div>

          <motion.p variants={staggerItem} className="text-caption text-zinc-500 mt-5">
            ✓ 3 free analyses &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewport } from '@/lib/motion'
import type { CTAProps } from '@/types/landing'
import AmbientBackground from '@/components/landing/AmbientBackground'

export default function FinalCTA({ onCTAClick }: CTAProps) {
  return (
    <section
      id="final-cta"
      className="relative bg-white section-pad text-center overflow-hidden"
    >
      {/* Light, premium abstract lighting */}
      <AmbientBackground preset="sectionAlt" className="!inset-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_55%)]" />

      <div className="relative max-w-container mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p
            variants={staggerItem}
            className="text-eyebrow font-semibold uppercase tracking-[0.1em] text-brand"
          >
            GET STARTED
          </motion.p>

          <motion.h2
            variants={staggerItem}
            className="text-section font-extrabold text-zinc-950 text-balance
                       max-w-[640px] mx-auto mt-3"
          >
            Stop signing contracts you don&apos;t understand.
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-lead text-zinc-600 max-w-xl mx-auto mt-5 leading-relaxed"
          >
            Join thousands of people who use Clarifyr to read contracts with confidence.
            Start free — no credit card required.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
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

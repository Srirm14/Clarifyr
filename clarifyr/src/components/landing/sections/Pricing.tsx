'use client'

import { motion } from 'framer-motion'
import { Check, Lock } from 'lucide-react'
import { PRICING_PLANS } from '@/lib/constants'
import { fadeUp, staggerContainer, staggerItem, viewport } from '@/lib/motion'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/landing/SectionHeading'
import type { CTAProps } from '@/types/landing'
import AmbientBackground from '@/components/landing/AmbientBackground'

export default function Pricing({ onCTAClick }: Readonly<CTAProps>) {
  return (
    <section id="pricing" className="relative bg-white section-pad overflow-hidden">
      <AmbientBackground preset="section" />
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SectionHeading
            eyebrow="PRICING"
            heading="Transparent Pricing"
            sub="Simple plans for individuals and teams. Start free, upgrade when you need."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
        >
          {PRICING_PLANS.map(plan => (
            <motion.div
              key={plan.id}
              variants={staggerItem}
              whileHover={plan.highlight ? {} : { y: -3 }}
              className={cn(
                'relative rounded-xl p-7 flex flex-col',
                plan.highlight
                  ? 'border-2 border-brand shadow-orange'
                  : 'border border-zinc-200/70',
              )}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2
                                 bg-brand text-white text-[11px] font-semibold
                                 px-3 py-0.5 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <p className="text-eyebrow font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                {plan.name}
              </p>

              <p className="text-[38px] font-bold text-zinc-950 leading-none">
                {plan.price}
                {plan.period && (
                  <span className="text-[15px] font-normal text-zinc-400 ml-0.5">{plan.period}</span>
                )}
              </p>

              <p className="text-body-sm text-zinc-500 mt-2 mb-5">{plan.tagline}</p>

              <div className="h-px bg-zinc-100 mb-5" />

              <ul className="space-y-3 flex-1">
                {plan.features.map(f => (
                  <li key={f.text} className="flex items-start gap-2.5">
                    {f.locked
                      ? <Lock size={13} className="text-zinc-300 mt-0.5 flex-shrink-0" />
                      : <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />}
                    <span className={cn(
                      'text-body-sm leading-snug',
                      f.locked ? 'text-zinc-300' : 'text-zinc-600',
                    )}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {plan.ctaStyle === 'disabled' && (
                  <button
                    disabled
                    className="w-full btn-secondary opacity-50 cursor-not-allowed"
                  >
                    {plan.cta}
                  </button>
                )}
                {plan.ctaStyle === 'primary' && (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCTAClick}
                    className="w-full btn-primary"
                  >
                    {plan.cta}
                  </motion.button>
                )}
                {plan.ctaStyle === 'secondary' && (
                  <button onClick={onCTAClick} className="w-full btn-secondary">
                    {plan.cta}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

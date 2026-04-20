'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { STEPS } from '@/lib/constants'
import { fadeUp, viewport } from '@/lib/motion'
import SectionHeading from '@/components/landing/SectionHeading'
import type { CTAProps } from '@/types/landing'
import AmbientBackground from '@/components/landing/AmbientBackground'

function DynamicIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  const Icon = (Icons as unknown as Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
  >)[name]
  return Icon ? <Icon {...props} /> : null
}

const stepVariant = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const stepsContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

export default function HowItWorks({ onCTAClick }: Readonly<CTAProps>) {
  return (
    <section id="how-it-works" className="relative bg-white section-pad overflow-hidden">
      <AmbientBackground preset="section" />
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SectionHeading
            eyebrow="HOW IT WORKS"
            heading="Clarity from chaos — in three steps."
            sub="Upload your contract, get risks flagged, and understand everything in plain English."
          />
        </motion.div>

        <motion.div
          variants={stepsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col md:flex-row items-start md:items-center mt-14"
        >
          {STEPS.map((step, i) => (
            <Fragment key={step.number}>
              <motion.div variants={stepVariant} className="text-center md:flex-1">
                <p className="eyebrow-label mb-3">{step.number}</p>
                <div className="w-14 h-14 rounded-full bg-brand-50 border border-brand-100
                                flex items-center justify-center mx-auto">
                  <DynamicIcon name={step.icon} size={24} className="text-brand" />
                </div>
                <h3 className="text-[17px] font-semibold text-zinc-900 mt-4">{step.title}</h3>
                <p className="text-body-sm text-zinc-500 mt-2 max-w-[220px] mx-auto leading-relaxed">
                  {step.body}
                </p>
              </motion.div>

              {i < STEPS.length - 1 && (
                <div className="hidden md:block w-16 flex-shrink-0 border-t border-dashed border-zinc-300 mt-7" />
              )}
            </Fragment>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCTAClick}
            className="btn-primary"
          >
            Analyze your first contract free →
          </motion.button>
        </div>
      </div>
    </section>
  )
}

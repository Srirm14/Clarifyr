'use client'

import { motion } from 'framer-motion'
import { COMPANY_NAMES, STATS } from '@/lib/constants'
import { fadeIn, viewport } from '@/lib/motion'

export default function SocialProof() {
  return (
    <section id="social-proof" className="bg-zinc-50 border-y border-zinc-200 py-12">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <span className="text-caption text-zinc-400 mr-2">Trusted by people at</span>
            {COMPANY_NAMES.map(name => (
              <span
                key={name}
                className="text-[15px] font-semibold tracking-tight text-zinc-300
                           select-none transition-colors hover:text-zinc-400"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 max-w-[560px] mx-auto">
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className={`text-center ${i < STATS.length - 1 ? 'border-r border-zinc-200' : ''}`}
              >
                <p className="text-[28px] font-bold text-zinc-900 leading-none">{stat.value}</p>
                <p className="text-caption text-zinc-500 mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

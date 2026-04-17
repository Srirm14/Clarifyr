'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { FEATURES } from '@/lib/constants'
import { fadeUp, staggerContainer, staggerItem, viewport } from '@/lib/motion'
import SectionHeading from '@/components/landing/SectionHeading'

function DynamicIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  const Icon = (Icons as unknown as Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
  >)[name]
  return Icon ? <Icon {...props} /> : null
}

export default function Features() {
  return (
    <section id="features" className="bg-white section-pad">
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SectionHeading
            eyebrow="FEATURES"
            heading="Everything you need before you sign."
            sub="Built specifically for people who receive contracts they didn't write."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map(f => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-zinc-200/70 p-6"
            >
              <div className="w-9 h-9 rounded-md bg-brand-50 flex items-center justify-center">
                <DynamicIcon name={f.icon} size={17} className="text-brand" />
              </div>
              <h3 className="text-[15px] font-semibold text-zinc-900 mt-3">{f.title}</h3>
              <p className="text-body-sm text-zinc-500 leading-relaxed mt-1.5">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

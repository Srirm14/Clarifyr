'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { PROBLEMS } from '@/lib/constants'
import { fadeUp, staggerContainer, staggerItem, viewport } from '@/lib/motion'
import SectionHeading from '@/components/landing/SectionHeading'

function DynamicIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  const Icon = (Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name]
  return Icon ? <Icon {...props} /> : null
}

export default function Problem() {
  return (
    <section id="problem" className="bg-white section-pad">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SectionHeading
            eyebrow="THE PROBLEM"
            heading="Signing blind is the default."
            sub="Most people either skip reading contracts or can't understand them. Both are costly."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PROBLEMS.map(p => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-base p-7 group"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center
                              group-hover:bg-brand-100 transition-colors">
                <DynamicIcon name={p.icon} size={18} className="text-brand" />
              </div>
              <h3 className="heading-sub mt-4 text-[17px]">{p.title}</h3>
              <p className="text-body-sm text-zinc-500 leading-relaxed mt-2">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

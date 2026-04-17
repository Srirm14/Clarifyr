'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/lib/constants'
import { fadeUp, staggerContainer, staggerItem, viewport } from '@/lib/motion'
import SectionHeading from '@/components/landing/SectionHeading'

export default function FAQ() {
  return (
    <section id="faq" className="bg-zinc-50 section-pad">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SectionHeading
            eyebrow="FAQ"
            heading="Questions we actually get asked."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-prose mx-auto mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i} variants={staggerItem}>
                <AccordionItem value={`faq-${i}`} className="border-b border-zinc-200">
                  <AccordionTrigger
                    className="text-[15px] font-medium text-zinc-900 text-left py-5
                               hover:no-underline hover:text-brand transition-colors"
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm text-zinc-500 leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

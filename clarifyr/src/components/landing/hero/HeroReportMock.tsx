'use client'

import { motion, type Variants } from 'framer-motion'
import { AlertTriangle, FileText, ShieldCheck } from 'lucide-react'

const mockContainer: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.06,
    },
  },
}

const mockItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: [0, 0, 0.2, 1] },
  },
}

export default function HeroReportMock() {
  return (
    <motion.div
      variants={mockContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12%' }}
      whileHover={{ y: -3, rotateX: 1.2, rotateY: -1.2, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="will-change-transform"
    >
      <motion.div
        variants={mockItem}
        className="relative rounded-2xl border border-zinc-200/70 overflow-hidden bg-white"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20
                     bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.22)_0%,transparent_72%)]"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5.8, ease: 'easeInOut', repeat: Infinity }}
        />

        <motion.div
          variants={mockItem}
          className="bg-zinc-50/70 backdrop-blur border-b border-zinc-200/70 h-10 px-4 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <div className="bg-white/80 border border-zinc-200/70 rounded-md ml-3 h-6 px-3 flex items-center">
            <span className="text-xs text-zinc-400">clarifyr.com/analyze/acme-nda</span>
          </div>
        </motion.div>

        <div className="flex h-[400px] sm:h-[440px]">
          <motion.div variants={mockItem} className="flex-1 p-5 overflow-hidden bg-white">
            <motion.div variants={mockItem} className="flex items-center gap-2">
              <FileText size={15} className="text-zinc-400" />
              <span className="text-[13px] font-medium text-zinc-700">
                Acme Corp Non-Disclosure Agreement
              </span>
            </motion.div>
            <motion.p variants={mockItem} className="text-[11px] text-zinc-400 leading-relaxed mt-4">
              4.2. Receiving Party agrees that it shall not, during the term and for a period of five (5) years
              thereafter, directly or indirectly, solicit or attempt to solicit any employee, independent contractor,
              or customer...
            </motion.p>

            <motion.div
              variants={mockItem}
              whileHover={{ y: -1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="rounded-lg border border-red-200 bg-red-50 p-3 mt-3"
            >
              <div className="flex items-center gap-1.5">
                <AlertTriangle size={12} className="text-red-500" />
                <span className="text-[11px] font-semibold text-red-700">Overly broad non-solicit clause</span>
              </div>
              <p className="text-[11px] text-red-600 leading-relaxed mt-1">
                5 years is aggressive. Market standard is 1–2 years.
              </p>
            </motion.div>

            <motion.div
              variants={mockItem}
              whileHover={{ y: -1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="rounded-lg border border-brand-200 bg-brand-50 p-3 mt-2.5"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-brand" />
                <span className="text-[11px] font-semibold text-brand">Negotiation tip</span>
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed mt-1">
                Ask to reduce to 12 months and limit to direct competitors only.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={mockItem}
            className="w-52 flex-shrink-0 border-l border-zinc-200/70 bg-zinc-50/70 p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Risk Summary</p>
            {[
              { label: 'Critical Risks', count: '3', bg: 'bg-red-100', text: 'text-red-600' },
              { label: 'Moderate Risks', count: '2', bg: 'bg-orange-100', text: 'text-orange-600' },
              { label: 'Standard Terms', count: '11', bg: 'bg-green-100', text: 'text-green-600' },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={`flex justify-between py-2.5 ${i < arr.length - 1 ? 'border-b border-zinc-100' : ''}`}
              >
                <span className="text-[12px] text-zinc-600">{row.label}</span>
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${row.bg} ${row.text}`}>
                  {row.count}
                </span>
              </div>
            ))}

            <motion.div variants={mockItem} className="mt-4 space-y-2">
              {[
                { w: '30%', c: 'bg-red-400' },
                { w: '20%', c: 'bg-orange-400' },
                { w: '80%', c: 'bg-green-400' },
              ].map(bar => (
                <div key={bar.c} className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${bar.c}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: bar.w }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                </div>
              ))}
            </motion.div>

            <div className="mt-5 pt-4 border-t border-zinc-200/70">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Benchmark</p>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Non-solicit duration is in the <span className="font-semibold text-red-600">top 8%</span> most aggressive
                of 50k contracts.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}


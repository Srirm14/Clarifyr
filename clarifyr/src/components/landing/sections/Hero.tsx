'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { FileText, AlertTriangle, ShieldCheck } from 'lucide-react'
import type { CTAProps } from '@/types/landing'
import AmbientBackground from '@/components/landing/AmbientBackground'

type Seg = { t: string; b: boolean; br?: boolean }

const HEADLINES: Seg[][] = [
  [
    { t: 'Every contract ', b: false },
    { t: 'hides risks.', b: true, br: true },
    { t: ' We find them in ', b: false },
    { t: '30 seconds.', b: true },
  ],
  [
    { t: 'Signing blind ', b: false },
    { t: 'costs money.', b: true, br: true },
    { t: ' AI analysis ', b: false },
    { t: 'costs nothing.', b: true },
  ],
  [
    { t: "That NDA you're about to sign? ", b: false, br: true },
    { t: 'Read it first.', b: true },
  ],
  [
    { t: 'Know your ', b: false },
    { t: 'leverage', b: true, br: true },
    { t: ' before you negotiate. ', b: false },
    { t: "We'll find it.", b: true },
  ],
  [
    { t: 'Legal jargon ', b: true },
    { t: 'translated into ', b: false, br: true },
    { t: 'plain English.', b: true },
    { t: ' Instantly.', b: false },
  ],
  [
    { t: "Your employer's lawyer wrote it. ", b: false, br: true },
    { t: 'You should understand it.', b: true },
  ],
  [
    { t: '50,000+ contracts analyzed. ', b: false, br: true },
    { t: "We've seen every trick.", b: true },
  ],
  [
    { t: 'That non-compete? It might be ', b: false },
    { t: 'unenforceable.', b: true, br: true },
    { t: " Let's check.", b: false },
  ],
  [
    { t: 'Risky clauses ', b: true },
    { t: 'flagged. Plain English. ', b: false, br: true },
    { t: 'Done in 30s.', b: true },
  ],
  [
    { t: 'Upload. Analyze. ', b: false, br: true },
    { t: 'Negotiate with confidence.', b: true },
  ],
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.022 } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}
const char: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  },
}

function AnimatedHeadline({ segments }: Readonly<{ segments: Seg[] }>) {
  const items = segments.flatMap((seg, si) => {
    const chars = seg.t
      .split('')
      .map((ch, ci) => ({ kind: 'ch' as const, ch, b: seg.b, id: `${si}-${ci}` }))
    return seg.br ? [...chars, { kind: 'br' as const, id: `${si}-br` }] : chars
  })

  return (
    <motion.span
      key={segments.map(s => s.t).join('')}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="inline"
    >
      {items.map(item => {
        if (item.kind === 'br') {
          return <br key={item.id} aria-hidden />
        }

        return (
          <motion.span
            key={item.id}
            variants={char}
            className={item.b ? 'text-brand' : 'text-zinc-950'}
            style={{ display: 'inline', whiteSpace: 'pre' }}
          >
            {item.ch}
          </motion.span>
        )
      })}
    </motion.span>
  )
}

export default function Hero({ onCTAClick }: CTAProps) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const totalChars = HEADLINES[idx].reduce((n, s) => n + s.t.length, 0)
    const typeDuration = totalChars * 22 + 2600
    const id = setTimeout(() => setIdx(i => (i + 1) % HEADLINES.length), typeDuration)
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
            <AnimatePresence mode="wait">
              <AnimatedHeadline key={idx} segments={HEADLINES[idx]} />
            </AnimatePresence>
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
            {HEADLINES.map((segs, i) => (
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
            {/* Soft blue base glow behind mock */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-[72%] h-12
                            bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18)_0%,transparent_70%)]
                            blur-2xl rounded-full -z-10" />
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
            >
              <div className="relative rounded-2xl border border-zinc-200/70 overflow-hidden bg-white">
                {/* Subtle top highlight sweep */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-20
                             bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.22)_0%,transparent_72%)]"
                  animate={{ opacity: [0.55, 0.9, 0.55] }}
                  transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity }}
                />

                {/* Browser chrome */}
                <div className="bg-zinc-50/70 backdrop-blur border-b border-zinc-200/70 h-10 px-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="bg-white/80 border border-zinc-200/70 rounded-md ml-3 h-6 px-3 flex items-center">
                    <span className="text-xs text-zinc-400">clarifyr.com/analyze/acme-nda</span>
                  </div>
                </div>

                <div className="flex h-[400px] sm:h-[440px]">
                  <div className="flex-1 p-5 overflow-hidden bg-white">
                    <div className="flex items-center gap-2">
                      <FileText size={15} className="text-zinc-400" />
                      <span className="text-[13px] font-medium text-zinc-700">
                        Acme Corp Non-Disclosure Agreement
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mt-4">
                      4.2. Receiving Party agrees that it shall not, during the term and for a
                      period of five (5) years thereafter, directly or indirectly, solicit or
                      attempt to solicit any employee, independent contractor, or customer...
                    </p>
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 mt-3">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={12} className="text-red-500" />
                        <span className="text-[11px] font-semibold text-red-700">Overly broad non-solicit clause</span>
                      </div>
                      <p className="text-[11px] text-red-600 leading-relaxed mt-1">
                        5 years is aggressive. Market standard is 1–2 years.
                      </p>
                    </div>
                    <div className="rounded-lg border border-brand-200 bg-brand-50 p-3 mt-2.5">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck size={12} className="text-brand" />
                        <span className="text-[11px] font-semibold text-brand">Negotiation tip</span>
                      </div>
                      <p className="text-[11px] text-blue-700 leading-relaxed mt-1">
                        Ask to reduce to 12 months and limit to direct competitors only.
                      </p>
                    </div>
                  </div>

                  <div className="w-52 flex-shrink-0 border-l border-zinc-200/70 bg-zinc-50/70 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Risk Summary</p>
                    {[
                      { label: 'Critical Risks', count: '3',  bg: 'bg-red-100',    text: 'text-red-600'    },
                      { label: 'Moderate Risks', count: '2',  bg: 'bg-orange-100', text: 'text-orange-600' },
                      { label: 'Standard Terms', count: '11', bg: 'bg-green-100',  text: 'text-green-600'  },
                    ].map((row, i, arr) => (
                      <div key={row.label} className={`flex justify-between py-2.5 ${i < arr.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                        <span className="text-[12px] text-zinc-600">{row.label}</span>
                        <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${row.bg} ${row.text}`}>{row.count}</span>
                      </div>
                    ))}
                    <div className="mt-4 space-y-2">
                      {[{w:'w-[30%]',c:'bg-red-400'},{w:'w-[20%]',c:'bg-orange-400'},{w:'w-[80%]',c:'bg-green-400'}].map(bar=>(
                        <div key={bar.c} className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${bar.w} ${bar.c}`} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-zinc-200/70">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Benchmark</p>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">
                        Non-solicit duration is in the{' '}
                        <span className="font-semibold text-red-600">top 8%</span>{' '}
                        most aggressive of 50k contracts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

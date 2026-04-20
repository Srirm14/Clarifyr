'use client'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileText,
  ShieldAlert,
  Wand2,
} from 'lucide-react'
import type { DocMeta } from '@/components/viewer/viewer.types'
import { cn } from '@/lib/utils'

type Clause = {
  title: string
  summary: string
  severity: 'high' | 'medium' | 'low' | 'info'
  whyItMatters: string
  suggestedEdit?: string
  page?: number
}

const MOCK = {
  overallScore: 72,
  riskLabel: 'High risk',
  execSummary:
    'This document includes several clauses that materially increase your obligations without a matching limitation on liability. The biggest issues are unlimited indemnity exposure, broad non‑solicitation, and vague confidentiality carve‑outs.',
  riskOverview: [
    { label: 'High-risk clauses', value: 6, tone: 'high' as const },
    { label: 'Needs negotiation', value: 4, tone: 'medium' as const },
    { label: 'Favourable', value: 18, tone: 'low' as const },
  ],
  importantClauses: [
    {
      title: 'Indemnification is unusually broad',
      summary: 'You may be responsible for third‑party claims without a cap or clear limits.',
      severity: 'high',
      whyItMatters: 'If something goes wrong, costs can far exceed the contract value (legal fees + damages).',
      suggestedEdit: 'Add a mutual indemnity and cap at 12 months of fees paid, excluding fraud/wilful misconduct.',
      page: 4,
    },
    {
      title: 'Non‑solicitation duration is aggressive',
      summary: 'Five (5) years is above market standard for most roles and agreements.',
      severity: 'medium',
      whyItMatters: 'Overly long restrictions can limit future employment and vendor relationships.',
      suggestedEdit: 'Reduce to 12 months and limit scope to direct competitors and active customers.',
      page: 6,
    },
    {
      title: 'Termination is one‑sided',
      summary: 'The other party can exit for convenience while your obligations survive.',
      severity: 'medium',
      whyItMatters: 'You may carry ongoing obligations without the corresponding benefit of the agreement.',
      suggestedEdit: 'Add mutual termination rights + pro‑rata payment and a short cure period.',
      page: 2,
    },
  ] satisfies Clause[],
  missingOrWeak: [
    {
      title: 'No clear liability cap',
      body: 'There is no limitation of liability section or the cap is missing key exclusions/inclusions.',
    },
    {
      title: 'Confidentiality carve‑outs are vague',
      body: 'Public domain and independent development exceptions are unclear.',
    },
    {
      title: 'IP ownership language is incomplete',
      body: 'Assignment / work‑for‑hire terms are not clearly defined for deliverables.',
    },
  ],
  conclusion:
    'Overall, this agreement is workable but should be negotiated before signing. Focus on adding a liability cap, narrowing indemnity, and reducing restrictive covenants.',
  improvements: [
    'Ask for a mutual limitation of liability (cap + excluded damages).',
    'Tighten indemnification to be mutual, scoped, and capped.',
    'Shorten the non‑solicit term and limit it to active customers.',
    'Add a cure period for breach before termination.',
  ],
}

function severityTone(severity: Clause['severity']) {
  switch (severity) {
    case 'high':
      return { icon: ShieldAlert, badge: 'High', cls: 'bg-red-50 text-red-700 border-red-100' }
    case 'medium':
      return { icon: AlertTriangle, badge: 'Medium', cls: 'bg-amber-50 text-amber-800 border-amber-100' }
    case 'low':
      return { icon: CheckCircle2, badge: 'Low', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' }
    default:
      return { icon: FileText, badge: 'Info', cls: 'bg-zinc-50 text-zinc-700 border-zinc-200' }
  }
}

export default function DocSenseReport({
  doc,
  onJumpToPage,
}: Readonly<{
  doc: DocMeta
  onJumpToPage?: (page: number) => void
}>) {
  const scoreMv = useMotionValue(0)
  const score = useTransform(scoreMv, v => Math.round(v))

  const scoreTone = useMemo(() => {
    const s = MOCK.overallScore
    if (s >= 70) return 'text-red-500'
    if (s >= 40) return 'text-amber-600'
    return 'text-emerald-600'
  }, [])

  useEffect(() => {
    const controls = animate(scoreMv, MOCK.overallScore, { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] })
    return () => controls.stop()
  }, [scoreMv])

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Executive summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'rounded-3xl workspace-surface p-4',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Executive summary
            </p>
            <p className="text-[13px] font-semibold text-zinc-900 mt-1 leading-snug line-clamp-2">
              {doc.name}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Overall score
              </p>
              <motion.p className={cn('text-[28px] font-black leading-none tabular-nums mt-1', scoreTone)}>
                {score}
              </motion.p>
            </div>
            <div className="h-10 w-px bg-zinc-200" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Rating
              </p>
              <p className="text-[12px] font-semibold text-zinc-700 mt-1">{MOCK.riskLabel}</p>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-zinc-600 leading-relaxed mt-3">
          {MOCK.execSummary}
        </p>
      </motion.div>

      {/* Risk overview */}
      <div className="rounded-3xl workspace-surface">
        <div className="px-4 pt-4 pb-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Risk overview
          </p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {MOCK.riskOverview.map((r, idx) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.04 * idx, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-2xl border border-zinc-200/70 bg-zinc-50/60 px-3 py-2.5"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  {r.label}
                </p>
                <p className={cn(
                  'text-[22px] font-black tabular-nums leading-none mt-1',
                  r.tone === 'high' ? 'text-red-500' : r.tone === 'medium' ? 'text-amber-600' : 'text-emerald-600',
                )}>
                  {r.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="h-px bg-zinc-100" />
        <div className="px-4 py-3">
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            Focus first on clauses that create uncapped financial exposure (indemnity, liability, termination) before
            negotiating secondary terms.
          </p>
        </div>
      </div>

      {/* Important clauses */}
      <div className="rounded-3xl workspace-surface overflow-hidden">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Important clauses
            </p>
            <p className="text-[12px] text-zinc-500 mt-1">What to review and negotiate first.</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand/10 flex items-center justify-center">
            <ClipboardList size={16} className="text-brand" />
          </div>
        </div>
        <div className="px-4 pb-4 space-y-3">
          {MOCK.importantClauses.map((c, idx) => {
            const tone = severityTone(c.severity)
            const Icon = tone.icon
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.03 * idx, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-3xl border border-zinc-200/70 bg-white p-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-semibold',
                        tone.cls,
                      )}>
                        <Icon size={11} />
                        {tone.badge}
                      </div>
                      {typeof c.page === 'number' && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full border border-zinc-200 text-[9px] font-semibold text-zinc-500 bg-white">
                          Page {c.page}
                        </div>
                      )}
                      <p className="text-[13px] font-semibold text-zinc-900 leading-snug">
                        {c.title}
                      </p>
                    </div>
                    <p className="text-[12px] text-zinc-600 leading-relaxed mt-2">
                      {c.summary}
                    </p>
                    <p className="text-[11px] text-zinc-500 leading-relaxed mt-2">
                      <span className="font-semibold text-zinc-700">Why it matters:</span> {c.whyItMatters}
                    </p>
                  </div>
                </div>
                {typeof c.page === 'number' && onJumpToPage && (
                  <div className="mt-3 flex">
                    <button
                      type="button"
                      onClick={() => onJumpToPage(c.page)}
                      className="text-[11px] font-semibold text-brand hover:text-brand-dark transition-colors"
                    >
                      View in PDF →
                    </button>
                  </div>
                )}
                {c.suggestedEdit && (
                  <div className="mt-3 rounded-xl bg-brand-50/60 border border-brand/10 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Wand2 size={12} className="text-brand" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
                        Suggested improvement
                      </p>
                    </div>
                    <p className="text-[11px] text-zinc-700 leading-relaxed mt-1">
                      {c.suggestedEdit}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Missing / weak clauses */}
      <div className="rounded-3xl workspace-surface">
        <div className="px-4 pt-4 pb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Missing or weak protections
            </p>
            <p className="text-[12px] text-zinc-500 mt-1">Clauses you should ask to add or tighten.</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-center">
            <FileText size={16} className="text-zinc-500" />
          </div>
        </div>
        <div className="px-4 pb-4 space-y-2">
          {MOCK.missingOrWeak.map(item => (
            <div key={item.title} className="rounded-xl border border-zinc-200/70 bg-zinc-50/60 px-3 py-2.5">
              <p className="text-[12px] font-semibold text-zinc-900">{item.title}</p>
              <p className="text-[11px] text-zinc-600 leading-relaxed mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div className="rounded-3xl workspace-surface p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Conclusion
        </p>
        <p className="text-[12px] text-zinc-600 leading-relaxed mt-2">{MOCK.conclusion}</p>
        <div className="mt-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/70 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Recommended improvements
          </p>
          <ul className="mt-2 space-y-1.5">
            {MOCK.improvements.map(text => (
              <li key={text} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                <span className="text-[11px] text-zinc-700 leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


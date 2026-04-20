'use client'

import Link from 'next/link'
import { ArrowRight, FileText, Sparkles, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getDashboardStatsSync } from '@/lib/mock/dashboard'
import { useUploadDialog } from '@/lib/upload/useUploadDialog'

function StatCard({
  label,
  value,
  hint,
  tone = 'neutral',
}: Readonly<{
  label: string
  value: string
  hint?: string
  tone?: 'neutral' | 'brand' | 'risk' | 'good'
}>) {
  const toneClasses =
    tone === 'brand'
      ? 'bg-brand-50/60 border-brand/15'
      : tone === 'risk'
        ? 'bg-red-50/70 border-red-200/60'
        : tone === 'good'
          ? 'bg-emerald-50/70 border-emerald-200/60'
          : 'bg-white border-zinc-200/80'

  const valueClasses =
    tone === 'risk'
      ? 'text-red-600'
      : tone === 'good'
        ? 'text-emerald-700'
        : 'text-zinc-950'

  return (
    <motion.div
      className={cn(
        'rounded-3xl border shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-5 py-4',
        'hover:shadow-[0_10px_34px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] transition-all',
        toneClasses,
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </p>
      <p className={cn('mt-2 text-[30px] leading-none font-black tabular-nums', valueClasses)}>
        {value}
      </p>
      {hint && <p className="mt-2 text-[12px] text-zinc-500">{hint}</p>}
    </motion.div>
  )
}

export default function DashboardPage() {
  const stats = getDashboardStatsSync()
  const upload = useUploadDialog()

  return (
    <div className="w-full min-w-0 h-full flex flex-col">
      {upload.dialog}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Workspace
          </p>
          <h1 className="text-subsection font-semibold text-zinc-950 mt-2">
            Dashboard
          </h1>
          <p className="text-body-sm text-zinc-500 mt-1">
            Upload contracts, run DocSense, and keep risk under control.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-10 px-4" asChild>
            <Link href="/documents">
              <FileText size={16} />
              View documents
            </Link>
          </Button>
          <Button className="h-10 px-4" onClick={upload.openDialog}>
            <Upload size={16} />
            Upload document
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Documents"
          value={String(stats.total)}
          hint={`${stats.ready} ready • ${stats.processing} processing`}
          tone="neutral"
        />
        <StatCard
          label="Analysis coverage"
          value={`${stats.coveragePct}%`}
          hint={`${stats.analyzed} analyzed`}
          tone="brand"
        />
        <StatCard
          label="Critical risks"
          value={String(stats.critical)}
          hint="Immediate attention recommended"
          tone="risk"
        />
        <StatCard
          label="Risky clauses"
          value={String(stats.risky)}
          hint="Worth reviewing before signing"
          tone="neutral"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="xl:col-span-8 rounded-3xl workspace-surface p-5 min-h-0 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Continue
              </p>
              <h2 className="text-[14px] font-semibold text-zinc-950 mt-2">
                Recent documents
              </h2>
              <p className="text-[12px] text-zinc-500 mt-1">
                Jump back into analysis where you left off.
              </p>
            </div>
            <Link
              href="/documents"
              className="text-[12px] font-semibold text-brand hover:text-brand-dark transition-colors inline-flex items-center gap-1"
            >
              All documents <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-200/70 bg-white overflow-hidden">
            {stats.recent.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-[12px] text-zinc-500">No recent documents yet.</p>
              </div>
            ) : (
              stats.recent.map(doc => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  className="px-4 py-4 flex items-center justify-between gap-4 hover:bg-brand-50/40 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-zinc-900 truncate">{doc.name}</p>
                    <p className="text-[12px] text-zinc-500 mt-1">
                      {doc.type} • Uploaded {doc.uploaded}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {doc.status === 'Ready' ? (
                      <Badge variant="standard">Ready</Badge>
                    ) : (
                      <Badge variant="standard">Processing</Badge>
                    )}
                    <span className="text-[12px] text-zinc-500 tabular-nums">
                      <span className="text-red-600 font-semibold">{doc.risks.critical}</span> C •{' '}
                      <span className="text-orange-600 font-semibold">{doc.risks.risky}</span> R
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-3xl workspace-panel workspace-edge-glow p-5 min-h-0 flex flex-col">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Quick actions
            </p>
            <h2 className="text-[14px] font-semibold text-zinc-950 mt-2">Run DocSense</h2>
            <p className="text-[12px] text-zinc-500 mt-1">
              Best next step: upload a new contract and start analysis.
            </p>
          </div>

          <div className="mt-4 rounded-3xl bg-[linear-gradient(135deg,rgba(251,146,60,0.16)_0%,rgba(232,93,4,0.10)_35%,rgba(0,0,0,0.00)_100%)] border border-brand/15 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-brand/15 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-brand" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-zinc-950">Upload → Analyze → Negotiate</p>
                <p className="text-[12px] text-zinc-600 mt-1">
                  We’ll flag unfair clauses and summarise obligations in plain English.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Button className="w-full justify-center" onClick={upload.openDialog}>
              <Upload size={16} />
              Upload document
            </Button>
            <Button variant="outline" className="w-full justify-center" asChild>
              <Link href="/documents">
                <FileText size={16} />
                Browse documents
              </Link>
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-100">
            <p className="text-[12px] text-zinc-500">
              Tip: open any document to see the <span className="text-zinc-800 font-medium">Report</span> and{' '}
              <span className="text-zinc-800 font-medium">Chat</span> tabs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


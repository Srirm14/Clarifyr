'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock3, FileText, Sparkles, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { WorkspacePageHeader } from '@/components/workspace'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getDashboardStatsSync } from '@/lib/mock/dashboard'
import { useUploadDialog } from '@/lib/upload/useUploadDialog'

const springIn = { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const }

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
      ? 'bg-brand-50/35 ring-brand/15'
      : tone === 'risk'
        ? 'bg-red-50/50 ring-red-200/40'
        : tone === 'good'
          ? 'bg-emerald-50/50 ring-emerald-200/40'
          : 'bg-zinc-50/60 ring-zinc-200/45'

  const valueClasses =
    tone === 'risk' ? 'text-red-600' : tone === 'good' ? 'text-emerald-700' : 'text-zinc-950'

  return (
    <motion.div
      className={cn(
        'rounded-2xl px-4 py-4 ring-1 ring-inset',
        'shadow-[0_1px_2px_rgba(0,0,0,0.04)]',
        toneClasses,
      )}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springIn}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className={cn('mt-1.5 text-2xl font-bold tabular-nums leading-none sm:text-[1.65rem]', valueClasses)}>
        {value}
      </p>
      {hint ? <p className="mt-2 text-[12px] leading-snug text-zinc-500">{hint}</p> : null}
    </motion.div>
  )
}

export default function DashboardPage() {
  const stats = getDashboardStatsSync()
  const upload = useUploadDialog()
  const hasNoDocs = stats.total === 0

  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      {upload.dialog}

      <WorkspacePageHeader
        title="Dashboard"
        description="Upload contracts, run DocSense, and keep risk under control."
        actions={
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="outline" className="h-10 px-4" asChild>
              <Link href="/documents">
                <FileText size={16} />
                Documents
              </Link>
            </Button>
            <Button className="h-10 px-4" onClick={upload.openDialog}>
              <Upload size={16} />
              Upload
            </Button>
          </div>
        }
      />

      {hasNoDocs ? (
        <motion.p
          className="mt-4 rounded-2xl bg-amber-50/60 px-4 py-3 text-[13px] text-amber-950/90 ring-1 ring-amber-200/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={springIn}
        >
          No documents yet — upload a contract to populate metrics and recent activity.
        </motion.p>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <StatCard
          label="Documents"
          value={String(stats.total)}
          hint={
            hasNoDocs
              ? 'Upload to get started'
              : `${stats.ready} ready · ${stats.processing} processing`
          }
          tone="neutral"
        />
        <StatCard
          label="Analysis coverage"
          value={`${stats.coveragePct}%`}
          hint={hasNoDocs ? '—' : `${stats.analyzed} analyzed`}
          tone="brand"
        />
        <StatCard
          label="Critical risks"
          value={String(stats.critical)}
          hint={stats.critical === 0 ? 'None flagged' : 'Review soon'}
          tone="risk"
        />
        <StatCard
          label="Risky clauses"
          value={String(stats.risky)}
          hint="Across all documents"
          tone="neutral"
        />
      </div>

      <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-12">
        <motion.section
          className="flex min-h-0 flex-col xl:col-span-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springIn, delay: 0.05 }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400">Continue</p>
              <h2 className="mt-1.5 text-[15px] font-semibold text-zinc-950">Recent documents</h2>
              <p className="mt-0.5 text-[12px] text-zinc-500">Open a file to view reports and chat.</p>
            </div>
            <Link
              href="/documents"
              className="shrink-0 text-[12px] font-semibold text-brand transition-colors hover:text-brand-dark inline-flex items-center gap-1"
            >
              All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-3 flex min-h-0 max-h-[min(420px,52vh)] flex-1 flex-col overflow-hidden rounded-2xl bg-zinc-50/50">
            {stats.recent.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-1 px-6 py-12 text-center">
                <p className="text-[13px] font-medium text-zinc-800">No recent activity</p>
                <p className="max-w-sm text-[12px] text-zinc-500">
                  Upload a document or open one from the full list. Recent items will appear here.
                </p>
                <Button className="mt-3" size="sm" onClick={upload.openDialog}>
                  <Upload size={14} />
                  Upload document
                </Button>
              </div>
            ) : (
              <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-1.5" role="list">
                {stats.recent.map(doc => (
                  <li key={doc.id}>
                    <Link
                      href={`/documents/${doc.id}`}
                      className={cn(
                        'flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors',
                        'hover:bg-zinc-100/80 active:bg-zinc-100/90',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50',
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-zinc-900">{doc.name}</p>
                        <p className="mt-0.5 text-[12px] text-zinc-500">
                          {doc.type} · {doc.uploaded}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2.5 text-[12px] text-zinc-500 tabular-nums">
                        {doc.status === 'Ready' ? (
                          <span className="inline-flex items-center gap-1 text-zinc-600">
                            <CheckCircle2 className="text-emerald-600" size={14} />
                            <span className="hidden min-[400px]:inline">Ready</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-zinc-500">
                            <Clock3 className="text-zinc-400" size={14} />
                            <span className="hidden min-[400px]:inline">…</span>
                          </span>
                        )}
                        <span>
                          <span className="font-semibold text-red-600/90">{doc.risks.critical}</span>
                          <span className="text-zinc-300"> · </span>
                          <span className="font-semibold text-orange-600/90">{doc.risks.risky}</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>

        <motion.aside
          className="flex flex-col rounded-2xl border border-zinc-200/60 bg-zinc-50/40 p-5 ring-1 ring-zinc-950/5 xl:col-span-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springIn, delay: 0.1 }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400">Quick actions</p>
          <h2 className="mt-1.5 text-[15px] font-semibold text-zinc-950">Run DocSense</h2>
          <p className="mt-0.5 text-[12px] text-zinc-500">Analyse a contract in a few minutes.</p>

          <div className="mt-4 rounded-xl border border-brand/10 bg-gradient-to-br from-amber-50/80 to-white/30 p-3.5">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/10 bg-white shadow-sm">
                <Sparkles className="text-brand" size={18} />
              </div>
              <p className="min-w-0 text-[12px] leading-relaxed text-zinc-600">
                We flag one-sided terms and sum up obligations in plain language.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Button className="h-9 w-full justify-center sm:h-10" onClick={upload.openDialog}>
              <Upload size={16} />
              Upload
            </Button>
            <Button variant="outline" className="h-9 w-full justify-center sm:h-10" asChild>
              <Link href="/documents">
                <FileText size={16} />
                Browse
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-zinc-500">
            In the viewer, use the <span className="font-medium text-zinc-700">Report</span> and{' '}
            <span className="font-medium text-zinc-700">Chat</span> tabs.
          </p>
        </motion.aside>
      </div>
    </div>
  )
}

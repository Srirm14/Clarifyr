'use client'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { DocumentRow } from '@/lib/mock/documents'

export default function DocumentAnalysisPanel({ doc }: Readonly<{ doc: DocumentRow }>) {
  return (
    <div className="flex flex-col min-h-0 h-full">
      <div
        className="h-12 flex items-center justify-between px-4 border-b border-zinc-200
                   bg-white/90 backdrop-blur-sm"
      >
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-zinc-900 truncate">Analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="critical" className="text-[11px]">
            {doc.risks.critical} Critical
          </Badge>
          <Badge variant="risky" className="text-[11px]">
            {doc.risks.risky} Risky
          </Badge>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto bg-gradient-to-b from-white to-zinc-50/50">
        <div className="p-5 space-y-5">
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight text-zinc-950">
              Non‑Compete Clause
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="critical" className="text-[11px]">
                Critical Risk
              </Badge>
              <Badge variant="standard" className="text-[11px]">
                24 months duration
              </Badge>
              <Badge variant="standard" className="text-[11px]">
                Nationwide scope
              </Badge>
            </div>
          </div>

          <div className="card-base p-4">
            <p className="text-micro font-semibold uppercase tracking-widest text-zinc-400">
              What this means
            </p>
            <p className="text-body-sm text-zinc-600 leading-relaxed mt-2">
              This clause can prevent you from working for a competitor anywhere in the country
              for up to 2 years after leaving. It’s unusually broad and highly restrictive.
            </p>
          </div>

          <div className="card-base p-4">
            <p className="text-micro font-semibold uppercase tracking-widest text-zinc-400">
              How this compares
            </p>
            <p className="text-body-sm text-zinc-600 leading-relaxed mt-2">
              Market standard for tech roles is typically 6–12 months or less.
            </p>

            <Separator className="my-4" />

            <div className="flex items-end justify-between">
              <p className="text-body-sm text-zinc-500">
                % of similar roles with non‑compete ≤ 12 months
              </p>
              <p className="text-[20px] font-semibold text-brand">78%</p>
            </div>

            <div className="mt-3 h-2 rounded-full bg-zinc-100 overflow-hidden">
              <div className="h-full bg-brand" style={{ width: '78%' }} />
            </div>
            <div className="mt-2 text-[11px] text-zinc-400 flex justify-between">
              <span>0</span>
              <span>6m</span>
              <span>12m</span>
              <span>18m</span>
              <span>24m+</span>
            </div>
          </div>

          <div className="card-base p-4">
            <p className="text-micro font-semibold uppercase tracking-widest text-zinc-400">
              What to push back on
            </p>
            <div className="mt-3 space-y-2">
              {[
                {
                  t: 'Reduce duration',
                  d: 'Request reduction from 24 months to 6–12 months.',
                },
                {
                  t: 'Narrow geographic scope',
                  d: 'Limit “nationwide” to states where the company actively operates.',
                },
                {
                  t: 'Define “competitor”',
                  d: 'Require a specific list of named competitors rather than a broad definition.',
                },
              ].map(item => (
                <div key={item.t} className="rounded-lg border border-zinc-200 bg-white p-3">
                  <p className="text-[13px] font-semibold text-zinc-900">{item.t}</p>
                  <p className="text-[12px] text-zinc-600 mt-1">{item.d}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-zinc-400">
            Mock analysis for dev — will be replaced by real backend output.
          </p>
        </div>
      </div>
    </div>
  )
}


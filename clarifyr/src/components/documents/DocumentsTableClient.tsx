'use client'

import Link from 'next/link'
import { CheckCircle2, Clock3, FileText, Upload, Wand2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DocFilter, DocumentRow } from '@/lib/mock/documents'
import { DOC_FILTERS } from '@/lib/mock/documents'
import { useToast } from '@/hooks/use-toast'
import { useUploadDialog } from '@/lib/upload/useUploadDialog'

export default function DocumentsTableClient({
  filter,
  rows,
  page,
  pageSize,
  total,
  totalPages,
}: Readonly<{
  filter: DocFilter
  rows: DocumentRow[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}>) {
  const { toast } = useToast()
  const upload = useUploadDialog()
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(total, page * pageSize)
  const filterPrefix =
    filter === 'All' ? '' : `filter=${encodeURIComponent(filter)}&`

  return (
    <div className="w-full min-w-0 h-full flex flex-col">
      {upload.dialog}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-subsection font-semibold text-zinc-950">All Documents</h1>
          <p className="text-body-sm text-zinc-500 mt-1">
            Mock data from the Next.js backend (server) for now.
          </p>
        </div>

        <Button variant="default" className="h-10 px-4" onClick={upload.openDialog}>
          <Upload size={16} />
          Upload document
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {DOC_FILTERS.map(f => {
          const href =
            f === 'All' ? '/documents' : `/documents?filter=${encodeURIComponent(f)}&page=1`
          const active = filter === f
          return (
            <Link
              key={f}
              href={href}
              className={cn(
                'h-8 px-3 inline-flex items-center rounded-md text-[13px] font-medium transition-colors',
                active
                  ? 'bg-brand text-white shadow-[0_10px_28px_-18px_rgba(37,99,235,0.45)]'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-brand-50/70 hover:text-zinc-950',
              )}
            >
              {f}
            </Link>
          )
        })}
      </div>

      <div className="mt-5 card-base p-0 overflow-hidden flex-1 min-h-0 flex flex-col">
        <div className="overflow-x-auto flex-1 min-h-0">
          <div className="min-w-[980px] h-full flex flex-col">
            <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-zinc-200 bg-zinc-50/60">
              <div className="col-span-4 text-micro font-semibold uppercase tracking-widest text-zinc-400">
                Document Name
              </div>
              <div className="col-span-2 text-micro font-semibold uppercase tracking-widest text-zinc-400">
                Type
              </div>
              <div className="col-span-2 text-micro font-semibold uppercase tracking-widest text-zinc-400">
                Uploaded
              </div>
              <div className="col-span-2 text-micro font-semibold uppercase tracking-widest text-zinc-400">
                Risk Summary
              </div>
              <div className="col-span-1 text-micro font-semibold uppercase tracking-widest text-zinc-400 text-right">
                Status
              </div>
              <div className="col-span-1 text-micro font-semibold uppercase tracking-widest text-zinc-400 text-right">
                Analyze
              </div>
            </div>

            <div className="divide-y divide-zinc-100">
              {rows.map(doc => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  className="grid grid-cols-12 gap-3 px-5 py-4 items-center hover:bg-brand-50/40 transition-colors"
                >
                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center flex-shrink-0">
                      <FileText size={16} className="text-zinc-500" />
                    </div>
                    <span className="text-[13px] font-medium text-zinc-900 truncate">{doc.name}</span>
                  </div>

                  <div className="col-span-2">
                    <span className="inline-flex items-center h-7 px-2.5 rounded-md bg-zinc-100 text-zinc-700 text-[12px]">
                      {doc.type}
                    </span>
                  </div>

                  <div className="col-span-2 text-[13px] text-zinc-500">{doc.uploaded}</div>

                  <div className="col-span-2 flex items-center gap-2 text-[12px]">
                    <span className="text-zinc-500">
                      <span className="text-red-600 font-semibold">{doc.risks.critical}</span> Critical
                    </span>
                    <span className="text-zinc-300">·</span>
                    <span className="text-zinc-500">
                      <span className="text-orange-600 font-semibold">{doc.risks.risky}</span> Risky
                    </span>
                    {doc.risks.critical === 0 && doc.risks.risky === 0 && (
                      <Badge variant="standard" className="ml-1">
                        —
                      </Badge>
                    )}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    {doc.status === 'Ready' ? (
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-zinc-600">
                        <CheckCircle2 size={14} className="text-green-600" />
                        Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-zinc-500">
                        <Clock3 size={14} className="text-zinc-400" />
                        Processing
                      </span>
                    )}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <button
                      type="button"
                      title="Analyze"
                      aria-label={`Analyze ${doc.name}`}
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        toast({
                          title: 'Queued for analysis',
                          description: `Starting analysis for “${doc.name}” (demo).`,
                        })
                      }}
                      className="w-8 h-8 rounded-md flex items-center justify-center
                                 text-brand hover:text-brand-dark hover:bg-brand-50
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30
                                 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                                 transition-colors"
                    >
                      <Wand2 size={16} />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 bg-white px-5 py-3 flex items-center justify-between">
          <p className="text-caption text-zinc-400">
            Showing <span className="text-zinc-700 font-medium">{from}</span>–<span className="text-zinc-700 font-medium">{to}</span> of{' '}
            <span className="text-zinc-700 font-medium">{total}</span>
          </p>

          <div className="flex items-center gap-2">
            <Link
              href={`/documents?${filterPrefix}page=${Math.max(1, page - 1)}`}
              aria-disabled={page <= 1}
              className={cn(
                'h-9 px-3 rounded-md border text-[13px] font-medium inline-flex items-center transition-colors',
                page <= 1
                  ? 'border-zinc-200 text-zinc-300 pointer-events-none'
                  : 'border-zinc-200 text-zinc-600 hover:bg-brand-50/70 hover:text-zinc-950',
              )}
            >
              Prev
            </Link>
            <div className="text-[13px] text-zinc-500 px-2">
              Page <span className="text-zinc-900 font-medium">{page}</span> / {totalPages}
            </div>
            <Link
              href={`/documents?${filterPrefix}page=${Math.min(totalPages, page + 1)}`}
              aria-disabled={page >= totalPages}
              className={cn(
                'h-9 px-3 rounded-md border text-[13px] font-medium inline-flex items-center transition-colors',
                page >= totalPages
                  ? 'border-zinc-200 text-zinc-300 pointer-events-none'
                  : 'border-zinc-200 text-zinc-600 hover:bg-brand-50/70 hover:text-zinc-950',
              )}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Clock3, FileText, Upload, Wand2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

const FILTERS = ['All', 'Employment', 'NDA', 'Rental', 'Freelance'] as const
type Filter = (typeof FILTERS)[number]

type DocRow = {
  id: string
  name: string
  type: Exclude<Filter, 'All'> | 'Unknown'
  uploaded: string
  risks: { critical: number; risky: number }
  status: 'Ready' | 'Processing'
}

const DOCS: DocRow[] = [
  {
    id: '1',
    name: 'Google Offer Letter.pdf',
    type: 'Employment',
    uploaded: 'Apr 14, 2025',
    risks: { critical: 2, risky: 3 },
    status: 'Ready',
  },
  {
    id: '2',
    name: 'Freelance Agreement – Acme.docx',
    type: 'Freelance',
    uploaded: 'Apr 12, 2025',
    risks: { critical: 0, risky: 1 },
    status: 'Ready',
  },
  {
    id: '3',
    name: 'Apartment Lease – HSR Layout.pdf',
    type: 'Rental',
    uploaded: 'Apr 10, 2025',
    risks: { critical: 1, risky: 4 },
    status: 'Ready',
  },
  {
    id: '4',
    name: 'NDA – Series A.pdf',
    type: 'NDA',
    uploaded: 'Apr 08, 2025',
    risks: { critical: 0, risky: 2 },
    status: 'Ready',
  },
  {
    id: '5',
    name: 'Vendor Contract Draft.pdf',
    type: 'Unknown',
    uploaded: 'Apr 05, 2025',
    risks: { critical: 0, risky: 0 },
    status: 'Processing',
  },
] as const

export default function DocumentsPage() {
  const [filter, setFilter] = useState<Filter>('All')
  const { toast } = useToast()

  const rows = useMemo(() => {
    if (filter === 'All') return DOCS
    return DOCS.filter(d => d.type === filter)
  }, [filter])

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-subsection font-semibold text-zinc-950">All Documents</h1>
          <p className="text-body-sm text-zinc-500 mt-1">
            Dummy data for now — wiring real uploads next.
          </p>
        </div>

        <Button variant="default" className="h-10 px-4">
          <Upload size={16} />
          Upload document
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'h-8 px-3 rounded-md text-[13px] font-medium transition-colors',
              filter === f
                ? 'bg-zinc-900 text-white'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-brand-50/70 hover:text-zinc-950',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 card-base p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
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
      </div>
    </div>
  )
}


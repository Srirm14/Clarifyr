'use client'

import { FileText, Wand2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import type { DocumentRow } from '@/lib/mock/documents'

export default function DocumentDetailClient({ doc }: Readonly<{ doc: DocumentRow }>) {
  const { toast } = useToast()

  return (
    <div className="w-full min-w-0 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-zinc-600" />
            </div>
            <div className="min-w-0">
              <h1 className="text-subsection font-semibold text-zinc-950 truncate">{doc.name}</h1>
              <p className="text-body-sm text-zinc-500 mt-1">
                Uploaded {doc.uploaded} · Type {doc.type}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="critical" className="text-[11px]">
              {doc.risks.critical} Critical
            </Badge>
            <Badge variant="risky" className="text-[11px]">
              {doc.risks.risky} Risky
            </Badge>
            <Badge variant="standard" className="text-[11px]">
              Status: {doc.status}
            </Badge>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            toast({
              title: 'Queued for analysis',
              description: `Starting analysis for “${doc.name}” (demo).`,
            })
          }
          className="btn-primary h-10 px-4"
        >
          <Wand2 size={16} />
          Analyze
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 card-base p-6 flex flex-col min-h-0">
          <p className="text-micro font-semibold uppercase tracking-widest text-zinc-400">
            Document Preview
          </p>
          <div className="mt-4 flex-1 min-h-[320px] rounded-lg border border-zinc-200 bg-zinc-50" />
        </div>

        <div className="card-base p-6 flex flex-col min-h-0">
          <p className="text-micro font-semibold uppercase tracking-widest text-zinc-400">
            Summary (mock)
          </p>
          <div className="mt-4 space-y-3">
            <div className="h-3 w-5/6 bg-zinc-100 rounded" />
            <div className="h-3 w-4/6 bg-zinc-100 rounded" />
            <div className="h-3 w-5/6 bg-zinc-100 rounded" />
            <div className="h-3 w-3/6 bg-zinc-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}


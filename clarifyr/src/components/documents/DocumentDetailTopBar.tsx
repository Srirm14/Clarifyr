'use client'

import { useMemo } from 'react'
import { Loader2, RefreshCcw, Wand2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { DocumentRow } from '@/lib/mock/documents'
import { cn } from '@/lib/utils'

export default function DocumentDetailTopBar({
  doc,
  analyzed,
  isAnalyzing,
  lastAnalyzedAt,
  analysisDisabled,
  onAnalyze,
}: Readonly<{
  doc: DocumentRow
  analyzed: boolean
  isAnalyzing: boolean
  lastAnalyzedAt: Date | null
  analysisDisabled: boolean
  onAnalyze: () => void
}>) {
  const titleBadges = useMemo(
    () => (
      <>
        <Badge variant="critical" className="text-[11px]">
          {doc.risks.critical} Critical
        </Badge>
        <Badge variant="risky" className="text-[11px]">
          {doc.risks.risky} Risky
        </Badge>
        <Badge variant="standard" className="text-[11px]">
          Status: {doc.status}
        </Badge>
      </>
    ),
    [doc.risks.critical, doc.risks.risky, doc.status],
  )

  const analysisStatus = analyzed ? (isAnalyzing ? 'Analyzing…' : 'Analyzed') : 'Not analyzed'

  return (
    <div className="shrink-0 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-subsection font-semibold text-zinc-950 truncate">{doc.name}</h1>
        {!analyzed && (
          <>
            <p className="text-body-sm text-zinc-500 mt-1">
              Uploaded {doc.uploaded} · Type {doc.type}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">{titleBadges}</div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0 flex-wrap justify-end">
        {analyzed && (
          <Badge variant="standard" className="text-[11px]">
            {isAnalyzing && <Loader2 className="size-3 animate-spin" />}
            {analysisStatus}
            {!isAnalyzing && lastAnalyzedAt ? (
              <span className="ml-1 text-zinc-400">
                · {lastAnalyzedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            ) : null}
          </Badge>
        )}

        <Button
          type="button"
          onClick={onAnalyze}
          disabled={analysisDisabled}
          variant={analyzed ? 'outline' : 'default'}
          size="lg"
          className={cn(
            'gap-2 rounded-xl',
            analyzed ? 'border-zinc-200 bg-white hover:bg-zinc-50' : 'shadow-orange-lg',
          )}
        >
          <Wand2 size={16} />
          {isAnalyzing ? 'Analyzing…' : analyzed ? 'Analyzed' : 'Analyze document'}
        </Button>

        {analyzed && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={analysisDisabled || isAnalyzing}
            onClick={onAnalyze}
            aria-label="Re-run analysis"
            className="rounded-xl"
          >
            <RefreshCcw />
          </Button>
        )}
      </div>
    </div>
  )
}


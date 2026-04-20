'use client'

import { useEffect, useState } from 'react'
import type { DocumentRow } from '@/lib/mock/documents'
import DocumentPreview from '@/components/documents/DocumentPreview'
import DocumentAnalysisPanel from '@/components/documents/DocumentAnalysisPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import DocumentDetailTopBar from '@/components/documents/DocumentDetailTopBar'
import DocumentInfoPanel from '@/components/documents/DocumentInfoPanel'
import { useDocumentAnalysis } from '@/components/documents/hooks/useDocumentAnalysis'

export default function DocumentDetailClient({ doc }: Readonly<{ doc: DocumentRow }>) {
  const [page, setPage] = useState(1)
  const [tab, setTab] = useState<'preview' | 'analysis'>('preview')
  const { analyzed, isAnalyzing, lastAnalyzedAt, analysisDisabled, queueAnalysis } = useDocumentAnalysis(doc)

  useEffect(() => {
    function isEditableTarget(t: EventTarget | null) {
      if (!(t instanceof HTMLElement)) return false
      const tag = t.tagName.toLowerCase()
      return tag === 'input' || tag === 'textarea' || t.isContentEditable
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isEditableTarget(e.target)) return

      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        if (analysisDisabled) return
        return queueAnalysis()
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setPage(p => Math.max(1, p - 1))
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setPage(p => p + 1)
        return
      }

      if (e.key === 'Escape') {
        // no-op (kept for future dialogs)
      }
    }

    globalThis.addEventListener('keydown', onKeyDown)
    return () => globalThis.removeEventListener('keydown', onKeyDown)
  }, [analysisDisabled, queueAnalysis])

  return (
    <div className="w-full min-w-0 h-full flex flex-col gap-4 overflow-hidden">
      <div className="hidden lg:block">
        <DocumentDetailTopBar
          doc={doc}
          analyzed={analyzed}
          isAnalyzing={isAnalyzing}
          lastAnalyzedAt={lastAnalyzedAt}
          analysisDisabled={analysisDisabled}
          onAnalyze={queueAnalysis}
        />
      </div>

      {/* Mobile: tabs instead of split */}
      <div className="lg:hidden flex-1 min-h-0">
        <div className="shrink-0">
          <DocumentDetailTopBar
            doc={doc}
            analyzed={analyzed}
            isAnalyzing={isAnalyzing}
            lastAnalyzedAt={lastAnalyzedAt}
            analysisDisabled={analysisDisabled}
            onAnalyze={queueAnalysis}
          />
        </div>
        <Tabs
          value={analyzed ? tab : 'preview'}
          onValueChange={v => setTab((v as 'preview' | 'analysis') ?? 'preview')}
          className="h-full min-h-0 flex flex-col mt-4"
        >
          <TabsList className="w-full justify-start bg-zinc-100 shrink-0">
            <TabsTrigger value="preview" className="text-sm">
              Preview
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-sm" disabled={!analyzed}>
              Analysis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-3 flex-1 min-h-0">
            <div className="card-base p-0 overflow-hidden h-full min-h-0">
              <DocumentPreview page={page} setPage={setPage} />
            </div>
          </TabsContent>
          <TabsContent value="analysis" className="mt-3 flex-1 min-h-0">
            <div className="card-base p-0 overflow-hidden h-full min-h-0">
              <DocumentAnalysisPanel doc={doc} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop: split preview + analysis */}
      <div className="hidden lg:flex flex-1 min-h-0 gap-4 overflow-hidden">
        {!analyzed && (
          <div className="w-[320px] xl:w-[360px] shrink-0 min-h-0">
            <DocumentInfoPanel doc={doc} />
          </div>
        )}

        <div className={cn('card-base p-0 overflow-hidden min-h-0', analyzed ? 'flex-[1.15]' : 'flex-1')}>
          <DocumentPreview page={page} setPage={setPage} />
        </div>

        {analyzed && (
          <div className="card-base p-0 overflow-hidden min-h-0 flex-1">
            <DocumentAnalysisPanel doc={doc} />
          </div>
        )}
      </div>
    </div>
  )
}


'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import type { DocumentRow } from '@/lib/mock/documents'

export function useDocumentAnalysis(doc: DocumentRow) {
  const { toast } = useToast()
  const [analyzed, setAnalyzed] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lastAnalyzedAt, setLastAnalyzedAt] = useState<Date | null>(null)

  const analysisDisabled = doc.status === 'Processing'

  const queueAnalysis = useCallback(() => {
    if (analysisDisabled) return

    setAnalyzed(true)
    setIsAnalyzing(true)
    toast({
      title: 'Queued for analysis',
      description: `Starting analysis for “${doc.name}” (demo).`,
    })

    globalThis.setTimeout(() => {
      setIsAnalyzing(false)
      setLastAnalyzedAt(new Date())
    }, 900)
  }, [analysisDisabled, doc.name, toast])

  return {
    analyzed,
    isAnalyzing,
    lastAnalyzedAt,
    analysisDisabled,
    queueAnalysis,
    setAnalyzed,
  }
}


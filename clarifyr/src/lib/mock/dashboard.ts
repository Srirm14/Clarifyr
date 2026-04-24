import { MOCK_DOCS, RECENT_DOC_IDS, type DocumentRow } from '@/lib/mock/documents'

export function getDashboardStatsSync() {
  const total = MOCK_DOCS.length
  const ready = MOCK_DOCS.filter(d => d.status === 'Ready').length
  const processing = total - ready

  const critical = MOCK_DOCS.reduce((acc, d) => acc + d.risks.critical, 0)
  const risky = MOCK_DOCS.reduce((acc, d) => acc + d.risks.risky, 0)

  const analyzed = ready
  const coveragePct = total === 0 ? 0 : Math.round((analyzed / total) * 100)

  const recent: DocumentRow[] = RECENT_DOC_IDS.map(id => MOCK_DOCS.find(d => d.id === id)).filter(
    (d): d is DocumentRow => d != null,
  )

  return {
    total,
    ready,
    processing,
    critical,
    risky,
    analyzed,
    coveragePct,
    recent,
  }
}


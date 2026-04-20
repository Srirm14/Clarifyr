'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const MOCK_PAGES = [
  {
    title: 'Offer Letter Summary',
    lines: [
      'This Employment Agreement (the “Agreement”) is entered into as of the Effective Date between the Company and the Employee.',
      '1. POSITION AND DUTIES. Employee shall devote full business time, attention, and best efforts to the performance of duties.',
      '2. COMPENSATION AND BENEFITS. Base salary, equity, and benefits are described in accordance with Company policy.',
      '3. CONFIDENTIALITY. Employee agrees to keep Company information confidential during and after employment.',
      '4. NON‑SOLICITATION. During employment and for 12 months thereafter, Employee shall not solicit Company employees or customers.',
      '5. RETURN OF PROPERTY. Upon termination, Employee will promptly return all Company property, including documents and devices.',
      '6. GOVERNING LAW. This Agreement shall be governed by the laws of the state where the Company is incorporated.',
      '7. ENTIRE AGREEMENT. This Agreement constitutes the entire agreement and supersedes prior discussions and representations.',
    ],
  },
  {
    title: 'Termination & Non‑Compete',
    lines: [
      '4. TERM OF EMPLOYMENT. Employment shall commence on the Effective Date and continue until terminated.',
      '5. TERMINATION. Either party may terminate employment at any time; certain obligations may survive termination.',
      '6. NON‑COMPETITION. Employee agrees not to engage in competing business for a period of 24 months after termination.',
      '7. INTELLECTUAL PROPERTY. All inventions and works conceived during employment are assigned to the Company.',
      '8. NON‑DISCLOSURE. Employee shall not disclose confidential information to any third party without prior written consent.',
      '9. SEVERABILITY. If any provision is held unenforceable, the remaining provisions shall remain in full force and effect.',
      '10. AMENDMENTS. Any amendment must be in writing and signed by both parties.',
      '11. NOTICES. Notices shall be sent to the addresses on file, by certified mail or reputable courier.',
    ],
  },
] as const

export default function DocumentPreview({
  page,
  setPage,
}: Readonly<{
  page: number
  setPage: (p: number) => void
}>) {
  const pageCount = MOCK_PAGES.length
  const current = Math.min(pageCount, Math.max(1, page))
  const [zoom, setZoom] = useState(1)

  const zoomPct = useMemo(() => Math.round(zoom * 100), [zoom])
  const canZoomOut = zoom > 0.75
  const canZoomIn = zoom < 1.5

  function zoomOut() {
    setZoom(z => Math.max(0.75, Math.round((z - 0.1) * 100) / 100))
  }

  function zoomIn() {
    setZoom(z => Math.min(1.5, Math.round((z + 0.1) * 100) / 100))
  }

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div
        className="h-12 flex items-center justify-between px-4 border-b border-zinc-200
                   bg-white/90 backdrop-blur-sm"
      >
        <p className="text-[13px] font-medium text-zinc-900">Preview</p>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-1.5 h-8">
            <button
              type="button"
              onClick={zoomOut}
              disabled={!canZoomOut}
              className="w-7 h-7 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-[12px] text-zinc-600 px-1 tabular-nums">{zoomPct}%</span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={!canZoomIn}
              className="w-7 h-7 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-1.5 h-8">
            <button
              type="button"
              onClick={() => setPage(Math.max(1, current - 1))}
              disabled={current <= 1}
              className={cn(
                'w-7 h-7 rounded-md transition-colors',
                current <= 1
                  ? 'text-zinc-300 cursor-not-allowed'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100',
              )}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[12px] text-zinc-600 px-1.5">
              Page {current} of {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage(Math.min(pageCount, current + 1))}
              disabled={current >= pageCount}
              className={cn(
                'w-7 h-7 rounded-md transition-colors',
                current >= pageCount
                  ? 'text-zinc-300 cursor-not-allowed'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100',
              )}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto bg-gradient-to-b from-zinc-50/80 to-white">
        <div className="max-w-[980px] mx-auto px-4 py-6">
          <div className="mx-auto w-full max-w-[860px]">
            <div
              className="rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-zinc-200 overflow-hidden"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
            >
              <div className="px-7 py-8 min-h-[980px]">
                <p className="text-[12px] font-semibold tracking-widest text-zinc-400 text-center">
                  EMPLOYMENT AGREEMENT
                </p>
                <h2 className="text-[17px] font-semibold text-zinc-900 text-center mt-2.5">
                  {MOCK_PAGES[current - 1].title}
                </h2>
                <div className="mt-6 space-y-3">
                  {MOCK_PAGES[current - 1].lines.map((t, i) => (
                    <p key={t + i} className="text-[12.5px] leading-relaxed text-zinc-700">
                      {t}
                    </p>
                  ))}
                </div>
              </div>
              <div className="border-t border-zinc-200 bg-white/80 px-4 py-2 text-center text-[11px] text-zinc-400">
                Page {current} of {pageCount}
              </div>
            </div>
            {/* Spacer to account for scaling so the page doesn't get clipped at larger zooms */}
            <div className="h-10" style={{ height: Math.max(40, Math.round((zoom - 1) * 220) + 40) }} />
          </div>
        </div>
      </div>
    </div>
  )
}


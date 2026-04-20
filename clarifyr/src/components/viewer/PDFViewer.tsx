'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileWarning,
  Sparkles,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import DocSensePanel from '@/components/viewer/DocSensePanel'
import type { DocMeta } from '@/components/viewer/viewer.types'
import { cn } from '@/lib/utils'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const
// Thumbnail dimensions — A4 ratio (1:√2), computed once
const THUMB_W = 64
const THUMB_H = Math.round(THUMB_W * 1.414) // 90px

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: Readonly<{
  label: string
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            'w-8 h-8 rounded-lg transition-colors flex items-center justify-center',
            disabled
              ? 'text-zinc-300 cursor-not-allowed'
              : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100',
          )}
          aria-label={label}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  )
}

function ViewerError({ message }: Readonly<{ message: string }>) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center px-8 py-16">
      <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
        <FileWarning className="text-red-500" size={18} />
      </div>
      <p className="text-sm font-semibold text-zinc-900">Couldn&apos;t load PDF</p>
      <p className="text-xs text-zinc-500 max-w-[320px] leading-relaxed">{message}</p>
    </div>
  )
}

function PageSkeleton({ width, height }: Readonly<{ width: number; height: number }>) {
  return (
    <div
      className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] ring-1 ring-zinc-200/80 overflow-hidden"
      style={{ width, height }}
    >
      <div className="h-full w-full bg-gradient-to-b from-zinc-50 to-zinc-100/60 animate-pulse" />
    </div>
  )
}

export default function PDFViewer({ doc }: Readonly<{ doc: DocMeta }>) {
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)
  const [zoomIdx, setZoomIdx] = useState(2) // default 1.0×
  const [showPanel, setShowPanel] = useState(true)
  const [thumbsReady, setThumbsReady] = useState(false)

  // Measure the main canvas container to compute responsive page width
  const canvasRef = useRef<HTMLDivElement>(null)
  const [canvasWidth, setCanvasWidth] = useState(720)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width
      if (w) setCanvasWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const zoom = ZOOMS[zoomIdx] ?? 1
  const zoomPct = useMemo(() => `${Math.round(zoom * 100)}%`, [zoom])
  const pageCount = Math.max(1, numPages)
  // Clamp page to valid range — read-time derivation avoids setState-in-effect
  const safePage = Math.min(pageCount, Math.max(1, page))

  // Base page width fills available canvas width (minus 96px padding), max 780px
  const baseWidth = Math.min(Math.max(400, canvasWidth - 96), 780)
  const pageWidth = Math.round(baseWidth * zoom)
  const pageSkelHeight = Math.round(baseWidth * 1.414) // A4 aspect at base width

  const handleLoad = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n)
    setThumbsReady(true)
  }, [])

  return (
    <TooltipProvider>
      <div className="w-full h-full min-h-0 flex overflow-hidden bg-zinc-100">

        {/* ── Thumbnail strip ──────────────────────────────────────── */}
        <div className="w-[80px] flex-shrink-0 bg-white border-r border-zinc-200 h-full flex flex-col">
          <div className="h-9 flex items-center px-3 border-b border-zinc-100 flex-shrink-0">
            <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">Pages</span>
          </div>

          <ScrollArea className="flex-1 min-h-0">
            <div className="px-2 py-2 flex flex-col gap-2">
              <Document
                file={doc.fileUrl}
                loading={
                  <div className="flex flex-col gap-2">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="rounded-md overflow-hidden">
                        <div
                          className="rounded-md bg-zinc-100 animate-pulse"
                          style={{ width: THUMB_W, height: THUMB_H }}
                        />
                        <div className="mt-1 flex justify-center">
                          <div className="h-1.5 w-4 rounded bg-zinc-100 animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                }
                error={null}
                onLoadSuccess={handleLoad}
              >
                {thumbsReady &&
                  Array.from({ length: pageCount }, (_, i) => i + 1).map(p => {
                    const active = p === safePage
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className={cn(
                          'relative w-full rounded-md transition-all overflow-hidden group',
                          active ? 'ring-1 ring-brand/50' : 'hover:ring-1 hover:ring-zinc-300',
                        )}
                        aria-label={`Go to page ${p}`}
                      >
                        {/* Left accent bar for active */}
                        {active && (
                          <motion.div
                            layoutId="thumb-bar"
                            className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-brand"
                          />
                        )}
                        <div className={cn(
                          'rounded-md overflow-hidden transition-colors',
                          active ? 'bg-brand/5' : 'bg-zinc-50 group-hover:bg-zinc-100/60',
                        )}>
                          <div className="p-0.5">
                            <div className="rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                              <Page
                                pageNumber={p}
                                width={THUMB_W}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                                loading={
                                  <div
                                    className="bg-zinc-100 animate-pulse"
                                    style={{ width: THUMB_W, height: THUMB_H }}
                                  />
                                }
                              />
                            </div>
                          </div>
                          <div className="py-1 text-center">
                            <span className={cn(
                              'text-[9px] tabular-nums font-semibold',
                              active ? 'text-brand' : 'text-zinc-400',
                            )}>
                              {p}
                            </span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
              </Document>
            </div>
          </ScrollArea>
        </div>

        {/* ── Main canvas ──────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          <div ref={canvasRef} className="relative flex-1 min-h-0 overflow-hidden bg-zinc-100">
            {/* Floating Analyze toggle */}
            <div className="absolute top-4 right-4 z-10">
              <AnimatePresence mode="wait">
                {showPanel ? null : (
                  <motion.button
                    key="open"
                    initial={{ opacity: 0, scale: 0.9, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -4 }}
                    transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    onClick={() => setShowPanel(true)}
                    className="flex items-center gap-1.5 h-8 pl-2.5 pr-3 rounded-full
                               bg-white/90 backdrop-blur-sm border border-zinc-200
                               shadow-sm hover:shadow-md hover:border-brand/40 hover:bg-brand/5
                               text-zinc-600 hover:text-brand transition-all"
                  >
                    <Sparkles size={13} className="text-brand flex-shrink-0" />
                    <span className="text-[12px] font-semibold tracking-tight">Analyze</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <ScrollArea className="h-full">
              <div className="py-6 flex justify-center">
                {thumbsReady ? (
                  <Document
                    file={doc.fileUrl}
                    loading={<PageSkeleton width={baseWidth} height={pageSkelHeight} />}
                    error={
                      <ViewerError message="PDF not found. Make sure /public/sample.pdf exists and reload." />
                    }
                    onLoadSuccess={handleLoad}
                  >
                    <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] ring-1 ring-zinc-200/80 overflow-hidden">
                      <Page
                        pageNumber={safePage}
                        width={pageWidth}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        loading={<PageSkeleton width={pageWidth} height={Math.round(pageWidth * 1.414)} />}
                      />
                    </div>
                  </Document>
                ) : (
                  <PageSkeleton width={baseWidth} height={pageSkelHeight} />
                )}
              </div>
              <div className="h-8" />
            </ScrollArea>
          </div>

          {/* ── Bottom toolbar ─────────────────────────────────────── */}
          <div className="bg-white border-t border-zinc-200 flex items-center px-3 h-11 flex-shrink-0 gap-2">
            {/* Page nav */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <IconButton
                label="Previous page"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage <= 1}
              >
                <ChevronLeft size={15} />
              </IconButton>
              <span className="text-[13px] font-medium text-zinc-600 tabular-nums px-1.5 min-w-[64px] text-center">
                {safePage} / {pageCount}
              </span>
              <IconButton
                label="Next page"
                onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                disabled={safePage >= pageCount}
              >
                <ChevronRight size={15} />
              </IconButton>
            </div>

            <Separator orientation="vertical" className="h-5 mx-1" />

            {/* Document name — fills the empty middle space */}
            <span className="flex-1 min-w-0 text-[13px] text-zinc-400 truncate px-1 select-none">
              {doc.name}
            </span>

            {/* Zoom + panel toggle */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <IconButton
                label="Zoom out"
                onClick={() => setZoomIdx(i => Math.max(0, i - 1))}
                disabled={zoomIdx === 0}
              >
                <ZoomOut size={15} />
              </IconButton>
              <span className="text-[13px] font-medium text-zinc-600 tabular-nums w-12 text-center">{zoomPct}</span>
              <IconButton
                label="Zoom in"
                onClick={() => setZoomIdx(i => Math.min(ZOOMS.length - 1, i + 1))}
                disabled={zoomIdx === ZOOMS.length - 1}
              >
                <ZoomIn size={15} />
              </IconButton>
            </div>
          </div>
        </div>

        {/* ── Right panel ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showPanel && <DocSensePanel onClose={() => setShowPanel(false)} />}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}

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

function AnalyzeBookmark({
  onClick,
}: Readonly<{
  onClick: () => void
}>) {
  const [hover, setHover] = useState(false)

  return (
    <div className="absolute top-6 right-0 z-10">
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -4 }}
        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={onClick}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileHover={{ y: -1, scale: 1.008 }}
        whileTap={{ scale: 0.995 }}
        className={cn(
          'relative group h-10 px-4 pr-3 flex items-center gap-2 select-none',
          'text-zinc-950',
          'focus-visible:outline-none',
        )}
        style={{
          // Directional bookmark/tab silhouette (points into the document stage)
          clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
        }}
        aria-label="Open DocSense panel"
      >
        {/* Border layer */}
        <div
          aria-hidden
          className="absolute inset-0 bg-brand/35"
          style={{
            clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
          }}
        />

        {/* Ambient hover bloom (very soft, controlled) */}
        <motion.div
          aria-hidden
          className="absolute -inset-8 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(251,146,60,0.16), transparent 72%)',
          }}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Fill layer (refined orange material + gentle drift on hover) */}
        <motion.div
          aria-hidden
          className="absolute inset-px backdrop-blur-sm"
          style={{
            clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
            background:
              // Material base: warm tonal blend
              'linear-gradient(120deg, rgba(255,237,213,0.94) 0%, rgba(253,186,116,0.70) 28%, rgba(251,146,60,0.58) 52%, rgba(232,93,4,0.62) 74%, rgba(154,52,18,0.46) 100%),' +
              // Soft apricot highlight near leading edge
              'radial-gradient(260px 80px at 18% 22%, rgba(255,255,255,0.42), transparent 62%),' +
              // Depth vignette on the far edge
              'radial-gradient(220px 90px at 92% 58%, rgba(154,52,18,0.22), transparent 68%)',
            backgroundSize: '260% 100%, 100% 100%, 100% 100%',
            backgroundPosition: '18% 50%, 0% 0%, 0% 0%',
          }}
          animate={{
            backgroundPosition: hover ? ['18% 50%, 0% 0%, 0% 0%', '82% 50%, 0% 0%, 0% 0%'] : '18% 50%, 0% 0%, 0% 0%',
          }}
          transition={
            hover
              ? { duration: 3.2, ease: [0.25, 0.1, 0.25, 1], repeat: Infinity, repeatType: 'mirror' }
              : { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
          }
        />

        {/* Inset highlight / top-edge sheen */}
        <div
          aria-hidden
          className="absolute inset-px opacity-65"
          style={{
            clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.40), transparent 48%)',
            pointerEvents: 'none',
          }}
        />

        {/* Specular highlight (moves subtly on hover) */}
        <motion.div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-6 opacity-40"
          style={{
            clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 40%, transparent 78%)',
            filter: 'blur(0.2px)',
          }}
          animate={{ x: hover ? [0, 10, 0] : 0, opacity: hover ? 0.55 : 0.4 }}
          transition={
            hover
              ? { duration: 2.8, ease: [0.25, 0.1, 0.25, 1], repeat: Infinity, repeatType: 'mirror' }
              : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
          }
        />

        {/* Elevation */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{
            boxShadow: hover
              ? '0 18px 46px rgba(0,0,0,0.12), 0 14px 30px rgba(232,93,4,0.09), inset 0 1px 0 rgba(255,255,255,0.28)'
              : '0 12px 34px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.22)',
          }}
          transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
          }}
        />

        {/* Content */}
        <Sparkles size={13} className="text-[#7C2D12] flex-shrink-0 relative z-10" />
        <span className="text-[12px] font-semibold tracking-tight relative z-10">Analyze</span>
      </motion.button>
    </div>
  )
}

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
  const [showPanel, setShowPanel] = useState(false)
  const [thumbsReady, setThumbsReady] = useState(false)
  const [flashPage, setFlashPage] = useState<number | null>(null)

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
  const pageSkelHeight = Math.round(baseWidth * 1.414) // A4 aspect at base width

  const handleLoad = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n)
    setThumbsReady(true)
  }, [])

  const jumpToPage = useCallback((p: number) => {
    setPage(Math.min(pageCount, Math.max(1, p)))
    setFlashPage(p)
  }, [pageCount])

  useEffect(() => {
    if (!flashPage) return
    const id = globalThis.setTimeout(() => setFlashPage(null), 700)
    return () => globalThis.clearTimeout(id)
  }, [flashPage])

  return (
    <TooltipProvider>
      <div className="w-full h-full min-h-0 flex overflow-hidden workspace-canvas workspace-warm-wash">

        {/* ── Thumbnail strip ──────────────────────────────────────── */}
        <div className="w-[130px] flex-shrink-0 h-full flex flex-col px-3 py-3">
          <div className="workspace-panel rounded-xl overflow-hidden flex flex-col h-full">
          <div className="h-10 flex items-center px-4 border-b border-zinc-100 flex-shrink-0">
            <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">Pages</span>
          </div>

          <ScrollArea className="flex-1 min-h-0">
            <div className="px-3 py-3 flex flex-col gap-3">
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
                    const flashing = flashPage === p
                    return (
                      <motion.button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        whileTap={{ scale: 0.98 }}
                        animate={{ scale: active ? 1.03 : 1 }}
                        className={cn(
                          'relative w-full rounded-lg transition-all overflow-hidden group',
                          'workspace-surface',
                          active ? 'workspace-selected bg-brand-50/20' : 'hover:border-zinc-300',
                          flashing && 'ring-1 ring-brand/20',
                        )}
                        aria-label={`Go to page ${p}`}
                      >
                        {/* Left accent bar for active */}
                        {active && (
                          <motion.div
                            layoutId="thumb-bar"
                            className="absolute left-0 top-3 bottom-8 w-[2px] rounded-full bg-brand"
                          />
                        )}
                        <div className="flex flex-col items-center">
                          <div className="w-full px-2 pt-2 pb-1.5">
                            <div className="rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] bg-white">
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

                          {/* Fixed footer slot for page number (locks alignment) */}
                          <div className={cn(
                            'w-full h-7 flex items-center justify-center border-t border-zinc-100/80',
                            active ? 'bg-brand-50/25' : 'bg-white/40',
                          )}>
                            <span className={cn(
                              'text-[9px] tabular-nums font-semibold tracking-wide',
                              active ? 'text-[#9A3412]' : 'text-zinc-400',
                            )}>
                              {p}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
              </Document>
            </div>
          </ScrollArea>
          </div>
        </div>

        {/* ── Main canvas ──────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          <div ref={canvasRef} className="relative flex-1 min-h-0 overflow-hidden workspace-canvas">
            {/* Bookmark-style Analyze toggle */}
            <AnimatePresence mode="wait">
              {showPanel ? null : <AnalyzeBookmark onClick={() => setShowPanel(true)} />}
            </AnimatePresence>
            {/* Inner shadow makes it feel like paper in a tray */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-10px_24px_rgba(0,0,0,0.08)]" />

            <ScrollArea className="h-full relative">
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
                    <motion.div
                      animate={{ scale: zoom }}
                      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                      style={{ transformOrigin: 'top center' }}
                      className="workspace-surface rounded-3xl overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
                    >
                      <Page
                        pageNumber={safePage}
                        width={baseWidth}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        loading={<PageSkeleton width={baseWidth} height={Math.round(baseWidth * 1.414)} />}
                      />
                    </motion.div>
                  </Document>
                ) : (
                  <PageSkeleton width={baseWidth} height={pageSkelHeight} />
                )}
              </div>
              <div className="h-8" />
            </ScrollArea>

            {/* Page pill */}
            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
              <div className="px-3 py-1 rounded-full workspace-panel border-zinc-200/70">
                <span className="text-[11px] font-medium text-zinc-600 tabular-nums">
                  {safePage} / {pageCount}
                </span>
              </div>
            </div>
          </div>

          {/* ── Bottom toolbar ─────────────────────────────────────── */}
          <div className="workspace-canvas flex items-center px-4 h-16 flex-shrink-0">
            <div className="w-full h-11 rounded-2xl workspace-panel flex items-center px-3 gap-2 border-zinc-200/70">
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
        </div>

        {/* ── Right panel ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showPanel && (
            <DocSensePanel
              key={doc.id}
              doc={doc}
              onJumpToPage={jumpToPage}
              onClose={() => setShowPanel(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
}

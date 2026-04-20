'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PDFDocumentLoadingTask, PDFDocumentProxy, PDFPageProxy, RenderTask } from 'pdfjs-dist'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Copy,
  Eye,
  TextQuote,
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

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const
// Thumbnail dimensions — A4 ratio (1:√2), computed once
const THUMB_W = 64
const A4_RATIO = 1.414
const THUMB_H = Math.round(THUMB_W * A4_RATIO) // 90px

const BOOKMARK_CLIP = 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)'
const BOOKMARK_FILL_BG = [
  // Material base: warm tonal blend
  'linear-gradient(120deg, rgba(255,237,213,0.94) 0%, rgba(253,186,116,0.70) 28%, rgba(251,146,60,0.58) 52%, rgba(232,93,4,0.62) 74%, rgba(154,52,18,0.46) 100%)',
  // Soft apricot highlight near leading edge
  'radial-gradient(260px 80px at 18% 22%, rgba(255,255,255,0.42), transparent 62%)',
  // Depth vignette on the far edge
  'radial-gradient(220px 90px at 92% 58%, rgba(154,52,18,0.22), transparent 68%)',
].join(',')
const BOOKMARK_OUTLINE_BG = 'linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.78))'
const BOOKMARK_SPECULAR_BG = 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 40%, transparent 78%)'
const BOOKMARK_BLOOM_BG = 'radial-gradient(closest-side, rgba(251,146,60,0.16), transparent 72%)'

function loadPdfTask(fileUrl: string): PDFDocumentLoadingTask {
  return getDocument(fileUrl)
}

function PdfThumb({
  pdf,
  pageNumber,
  width,
  active,
}: Readonly<{
  pdf: PDFDocumentProxy
  pageNumber: number
  width: number
  active: boolean
}>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let cancelled = false
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    let renderTask: RenderTask | null = null

    async function run(canvas: HTMLCanvasElement) {
      const page = await pdf.getPage(pageNumber)
      if (cancelled) return
      const viewport1 = page.getViewport({ scale: 1 })
      const scale = width / viewport1.width
      const viewport = page.getViewport({ scale })

      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      // Avoid blurry thumbnails on retina
      const dpr = globalThis.devicePixelRatio || 1
      canvas.style.width = `${Math.floor(viewport.width)}px`
      canvas.style.height = `${Math.floor(viewport.height)}px`
      canvas.width = Math.floor(viewport.width * dpr)
      canvas.height = Math.floor(viewport.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      renderTask = page.render({ canvasContext: ctx, viewport, canvas })
      await renderTask.promise
    }

    run(canvasEl)
    return () => {
      cancelled = true
      renderTask?.cancel()
    }
  }, [pdf, pageNumber, width])

  return (
    <canvas
      ref={canvasRef}
      className={cn('block', active ? 'opacity-100' : 'opacity-95')}
    />
  )
}

function PdfPage({
  pdf,
  pageNumber,
  width,
}: Readonly<{
  pdf: PDFDocumentProxy
  pageNumber: number
  width: number
}>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let cancelled = false
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    let renderTask: RenderTask | null = null

    async function run(canvas: HTMLCanvasElement) {
      const page: PDFPageProxy = await pdf.getPage(pageNumber)
      if (cancelled) return

      const viewport1 = page.getViewport({ scale: 1 })
      const scale = width / viewport1.width
      const viewport = page.getViewport({ scale })

      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      const dpr = globalThis.devicePixelRatio || 1
      canvas.style.width = `${Math.floor(viewport.width)}px`
      canvas.style.height = `${Math.floor(viewport.height)}px`
      canvas.width = Math.floor(viewport.width * dpr)
      canvas.height = Math.floor(viewport.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Render raster layer
      renderTask = page.render({ canvasContext: ctx, viewport, canvas })
      await renderTask.promise
    }

    run(canvasEl)
    return () => {
      cancelled = true
      renderTask?.cancel()
    }
  }, [pdf, pageNumber, width])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}

type ParsedTextPiece = {
  str: string
  x: number
  y: number
  h: number
  w: number
  hasEOL: boolean
}

function median(nums: number[]): number {
  if (nums.length === 0) return 0
  const s = [...nums].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  if (s.length % 2 === 1) {
    const v = s.at(mid)
    return typeof v === 'number' ? v : 0
  }
  const a = s.at(mid - 1)
  const b = s.at(mid)
  if (typeof a === 'number' && typeof b === 'number') return (a + b) / 2
  return 0
}

function parseTextPieces(items: unknown[]): { pieces: ParsedTextPiece[]; heights: number[] } {
  const pieces: ParsedTextPiece[] = []
  const heights: number[] = []

  for (const raw of items) {
    if (!raw || typeof raw !== 'object') continue
    const it = raw as {
      str?: string
      transform?: number[]
      height?: number
      width?: number
      hasEOL?: boolean
    }
    if (typeof it.str !== 'string' || !it.str.length) continue
    const t = it.transform
    if (!Array.isArray(t) || t.length < 6) continue
    const x = Number(t[4])
    const y = Number(t[5])
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue
    const h = typeof it.height === 'number' && Number.isFinite(it.height) ? it.height : Math.abs(Number(t[3])) || 12
    const w = typeof it.width === 'number' && Number.isFinite(it.width) ? it.width : 0
    heights.push(h)
    pieces.push({
      str: it.str,
      x,
      y,
      h,
      w,
      hasEOL: it.hasEOL === true,
    })
  }

  return { pieces, heights }
}

function clusterIntoLines(sortedPieces: ParsedTextPiece[], lineTol: number): { y: number; parts: ParsedTextPiece[] }[] {
  const lines: { y: number; parts: ParsedTextPiece[] }[] = []
  for (const p of sortedPieces) {
    const last = lines.at(-1)
    const sameLine = last !== undefined && Math.abs(p.y - last.y) <= lineTol
    if (last === undefined || !sameLine) {
      lines.push({ y: p.y, parts: [p] })
      continue
    }
    last.parts.push(p)
  }
  return lines
}

function appendPieceToLine(s: string, prev: ParsedTextPiece | undefined, cur: ParsedTextPiece): string {
  const piece = cur.str
  if (s.length === 0) return piece

  const prevEndX =
    prev === undefined ? cur.x : prev.x + (prev.w > 0 ? prev.w : prev.str.length * prev.h * 0.5)
  const gap = cur.x - prevEndX
  const needsSpace =
    !/\s$/.test(s) &&
    !/^\s/.test(piece) &&
    (gap > cur.h * 0.15 || /^[\wÀ-ÿ]/u.test(piece))
  return s + (needsSpace ? ' ' : '') + piece
}

function joinLineParts(parts: ParsedTextPiece[]): string {
  let s = ''
  for (let i = 0; i < parts.length; i++) {
    const cur = parts[i]
    if (cur === undefined) continue
    const prev = i > 0 ? parts[i - 1] : undefined
    s = appendPieceToLine(s, prev, cur)
    if (cur.hasEOL) s += '\n'
  }
  return s.trimEnd()
}

function mergeLineIntoParagraphs(paragraphs: string[], gap: number, paragraphGap: number, lineStr: string) {
  if (paragraphs.length === 0 || gap > paragraphGap) {
    paragraphs.push(lineStr)
    return
  }
  const lastIdx = paragraphs.length - 1
  const prevPara = paragraphs[lastIdx]
  if (prevPara === undefined) {
    paragraphs.push(lineStr)
    return
  }
  paragraphs[lastIdx] = `${prevPara} ${lineStr}`
}

function linesToParagraphs(
  lines: { y: number; parts: ParsedTextPiece[] }[],
  lineStrings: string[],
  paragraphGap: number,
): string[] {
  const paragraphs: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const lineMeta = lines[i]
    const lineStrRaw = lineStrings[i]
    if (lineMeta === undefined || lineStrRaw === undefined) continue
    const curY = lineMeta.y
    const prevMeta = i > 0 ? lines[i - 1] : undefined
    const prevY = prevMeta === undefined ? curY : prevMeta.y
    const gap = prevY - curY
    const lineStr = lineStrRaw.trim()
    if (lineStr.length === 0) continue
    mergeLineIntoParagraphs(paragraphs, gap, paragraphGap, lineStr)
  }
  return paragraphs
}

function hash32(input: string): string {
  let h = 2166136261
  for (const codePoint of input) {
    h ^= codePoint.codePointAt(0) ?? 0
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16)
}

/** Layout-aware plain text: group pdf.js items into lines using transform matrix, then paragraphs using vertical gaps. */
function textContentToFormattedPlain(items: unknown[]): string {
  const { pieces, heights } = parseTextPieces(items)
  if (pieces.length === 0) return ''

  const approxLine = median(heights) || 12
  const lineTol = Math.max(2, approxLine * 0.35)
  const paragraphGap = Math.max(approxLine * 1.25, 14)

  const sorted = [...pieces].sort((a, b) => {
    const dy = b.y - a.y
    if (Math.abs(dy) > lineTol) return dy
    return a.x - b.x
  })

  const lines = clusterIntoLines(sorted, lineTol)
  for (const line of lines) {
    line.parts.sort((a, b) => a.x - b.x)
  }

  const lineStrings = lines.map(({ parts }) => joinLineParts(parts))
  const paragraphs = linesToParagraphs(lines, lineStrings, paragraphGap)

  return paragraphs
    .map(p => p.replaceAll(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n\n')
    .trim()
}

function PageStringsView({
  pdf,
  pageNumber,
}: Readonly<{
  pdf: PDFDocumentProxy
  pageNumber: number
}>) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    void Promise.resolve()
      .then(() => {
        if (cancelled) return
        setLoading(true)
        setError(null)
        setText('')
      })
      .then(() =>
        pdf.getPage(pageNumber).then(page =>
          page.getTextContent({
            includeMarkedContent: false,
            disableNormalization: false,
          }),
        ),
      )
      .then(content => {
        if (cancelled) return
        setText(textContentToFormattedPlain(content.items as unknown[]))
      })
      .catch(() => {
        if (!cancelled) setError('Could not extract text for this page.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [pdf, pageNumber])

  useEffect(() => {
    if (!copied) return
    const id = globalThis.setTimeout(() => setCopied(false), 1600)
    return () => globalThis.clearTimeout(id)
  }, [copied])

  const onCopy = async () => {
    if (!text) return
    try {
      await globalThis.navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-zinc-100 flex-shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 tabular-nums">
          Strings · Page {pageNumber}
        </p>
        <IconButton
          label={copied ? 'Copied' : 'Copy page text'}
          disabled={!text || loading}
          onClick={() => void onCopy()}
        >
          {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
        </IconButton>
      </div>
      <ScrollArea className="flex-1 min-h-0 px-4 py-3">
        {loading ? (
          <div className="space-y-2">
            <div className="h-3 w-2/3 rounded bg-zinc-100 animate-pulse" />
            <div className="h-3 w-full rounded bg-zinc-100 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-zinc-100 animate-pulse" />
          </div>
        ) : error ? (
          <p className="text-[12px] text-zinc-600">{error}</p>
        ) : text ? (
          <article
            className="select-text max-w-none text-[12px] sm:text-[13px] leading-[1.62] text-zinc-700 font-normal tracking-normal antialiased"
            style={{ fontFeatureSettings: '"kern" 1, "liga" 1' }}
          >
            {text.split('\n\n').map(para => (
              <p
                key={`${pageNumber}-${hash32(para)}-${para.length}`}
                className="mb-3 last:mb-0 text-left"
              >
                {para}
              </p>
            ))}
          </article>
        ) : (
          <p className="text-[12px] text-zinc-500">No extractable text on this page (may be image-only).</p>
        )}
      </ScrollArea>
    </div>
  )
}

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
          clipPath: BOOKMARK_CLIP,
        }}
        aria-label="Open DocSense panel"
      >
        {/* Border layer (outlined by default) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-brand/40"
          style={{
            clipPath: BOOKMARK_CLIP,
          }}
        />

        {/* Outline fill (default state) */}
        <motion.div
          aria-hidden
          className="absolute inset-px backdrop-blur-sm"
          style={{
            clipPath: BOOKMARK_CLIP,
            background: BOOKMARK_OUTLINE_BG,
          }}
          animate={{ opacity: hover ? 0 : 1 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Ambient hover bloom (very soft, controlled) */}
        <motion.div
          aria-hidden
          className="absolute -inset-8 blur-3xl"
          style={{
            background: BOOKMARK_BLOOM_BG,
          }}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Fill layer (refined orange material + gentle drift on hover) */}
        <motion.div
          aria-hidden
          className="absolute inset-px backdrop-blur-sm"
          style={{
            clipPath: BOOKMARK_CLIP,
            background: BOOKMARK_FILL_BG,
            backgroundSize: '260% 100%, 100% 100%, 100% 100%',
            backgroundPosition: '18% 50%, 0% 0%, 0% 0%',
          }}
          animate={{
            backgroundPosition: hover ? ['18% 50%, 0% 0%, 0% 0%', '82% 50%, 0% 0%, 0% 0%'] : '18% 50%, 0% 0%, 0% 0%',
            opacity: hover ? 1 : 0,
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
            clipPath: BOOKMARK_CLIP,
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
            clipPath: BOOKMARK_CLIP,
            background: BOOKMARK_SPECULAR_BG,
            filter: 'blur(0.2px)',
          }}
          animate={{ x: hover ? [0, 10, 0] : 0, opacity: hover ? 0.55 : 0 }}
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
            clipPath: BOOKMARK_CLIP,
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
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)
  const [zoomIdx, setZoomIdx] = useState(2) // default 1.0×
  const [showPanel, setShowPanel] = useState(true)
  const [thumbsReady, setThumbsReady] = useState(false)
  const [flashPage, setFlashPage] = useState<number | null>(null)
  const [mode, setMode] = useState<'preview' | 'strings'>('preview')
  const panningRef = useRef(false)
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 })
  const stageRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLElement | null>(null)

  // Measure the main canvas container to compute responsive page width
  const canvasRef = useRef<HTMLDivElement>(null)
  const [canvasWidth, setCanvasWidth] = useState(720)

  useEffect(() => {
    let cancelled = false
    const task = loadPdfTask(doc.fileUrl)

    task.promise
      .then(p => {
        if (cancelled) return
        setPdf(p)
        setLoadError(null)
        setNumPages(p.numPages)
        setThumbsReady(true)
      })
      .catch(err => {
        if (cancelled) return
        setPdf(null)
        setThumbsReady(false)
        setLoadError(err instanceof Error ? err.message : String(err))
      })

    return () => {
      cancelled = true
      task.destroy()
    }
  }, [doc.fileUrl])

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
  const renderWidth = Math.round(baseWidth * zoom)
  const cardWidth = useMemo(
    () => (mode === 'strings' ? Math.min(920, Math.max(renderWidth, 640)) : renderWidth),
    [mode, renderWidth],
  )
  const pageSkelHeight = Math.round(baseWidth * A4_RATIO) // A4 aspect at base width

  // pdf load handled by effect above

  const jumpToPage = useCallback((p: number) => {
    setPage(Math.min(pageCount, Math.max(1, p)))
    setFlashPage(p)
  }, [pageCount])

  useEffect(() => {
    if (!flashPage) return
    const id = globalThis.setTimeout(() => setFlashPage(null), 700)
    return () => globalThis.clearTimeout(id)
  }, [flashPage])

  const refreshViewportRef = useCallback(() => {
    const root = stageRef.current
    viewportRef.current = root?.querySelector<HTMLElement>('[data-radix-scroll-area-viewport]') ?? null
    return viewportRef.current
  }, [])

  useEffect(() => {
    const vp = refreshViewportRef()
    if (!vp) return

    // Preview: drag to pan (grab). Strings: extracted text view (default cursor).
    vp.style.cursor = mode === 'preview' ? 'grab' : ''

    const onWindowMove = (e: MouseEvent) => {
      if (!panningRef.current) return
      const viewport = viewportRef.current
      if (!viewport) return
      const dx = e.clientX - panStartRef.current.x
      const dy = e.clientY - panStartRef.current.y
      viewport.scrollLeft = panStartRef.current.scrollLeft - dx
      viewport.scrollTop = panStartRef.current.scrollTop - dy
    }

    const onWindowUp = () => {
      if (!panningRef.current) return
      panningRef.current = false
      const viewport = viewportRef.current
      if (!viewport) return
      viewport.style.cursor = mode === 'preview' ? 'grab' : ''
      viewport.style.userSelect = ''
      globalThis.removeEventListener('mousemove', onWindowMove)
      globalThis.removeEventListener('mouseup', onWindowUp)
    }

    const onDown = (e: MouseEvent) => {
      if (mode !== 'preview') return
      if (e.button !== 0) return
      e.preventDefault()

      const viewport = viewportRef.current ?? refreshViewportRef()
      if (!viewport) return

      panningRef.current = true
      viewport.style.cursor = 'grabbing'
      viewport.style.userSelect = 'none'
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        scrollLeft: viewport.scrollLeft,
        scrollTop: viewport.scrollTop,
      }
      globalThis.addEventListener('mousemove', onWindowMove)
      globalThis.addEventListener('mouseup', onWindowUp)
    }

    vp.addEventListener('mousedown', onDown)
    return () => {
      vp.removeEventListener('mousedown', onDown)
      onWindowUp()
      vp.style.cursor = ''
    }
  }, [mode, refreshViewportRef])

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
              {!thumbsReady || !pdf ? (
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
              ) : (
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
                              <PdfThumb pdf={pdf} pageNumber={p} width={THUMB_W} active={active} />
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
                  })
              )}
            </div>
          </ScrollArea>
          </div>
        </div>

        {/* ── Main canvas ──────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          <div
            ref={canvasRef}
            className="relative flex-1 min-h-0 overflow-hidden workspace-canvas bg-brand-50/15"
          >
            {/* Bookmark-style Analyze toggle */}
            <AnimatePresence mode="wait">
              {showPanel ? null : <AnalyzeBookmark onClick={() => setShowPanel(true)} />}
            </AnimatePresence>
            {/* Inner shadow makes it feel like paper in a tray */}
            <div className="absolute inset-0 pointer-events-none
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-10px_24px_rgba(0,0,0,0.08)]" />

            <div ref={stageRef} className="h-full relative">
              <ScrollArea
                className={cn(
                  'h-full relative',
                )}
              >
                {!thumbsReady || !pdf ? (
                  loadError ? (
                    <ViewerError message={loadError} />
                  ) : (
                    <PageSkeleton width={baseWidth} height={pageSkelHeight} />
                  )
                ) : (
                  <div
                    className={cn(
                      'py-6 px-8',
                      cardWidth <= canvasWidth - 96 ? 'flex justify-center' : 'flex justify-start',
                    )}
                  >
                    <motion.div
                      key={`${safePage}-${zoomIdx}-${mode}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ width: cardWidth }}
                      className="rounded-[28px] p-px flex-shrink-0
                                 bg-[linear-gradient(135deg,rgba(251,146,60,0.22)_0%,rgba(232,93,4,0.12)_22%,rgba(0,0,0,0.06)_60%,rgba(0,0,0,0.00)_100%)]
                                 shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
                    >
                      <div className="rounded-[27px] workspace-surface overflow-hidden w-full h-full">
                        {mode === 'strings' ? (
                          <PageStringsView pdf={pdf} pageNumber={safePage} />
                        ) : (
                          <PdfPage pdf={pdf} pageNumber={safePage} width={renderWidth} />
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              <div className="h-8" />
              </ScrollArea>
            </div>

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

            {/* Preview (pan) vs Strings (extracted plain text) */}
            <div className="flex items-center rounded-lg border border-zinc-200/80 bg-zinc-50/80 p-0.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setMode('preview')}
                aria-pressed={mode === 'preview'}
                className={cn(
                  'h-8 px-2.5 rounded-md inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors',
                  mode === 'preview'
                    ? 'bg-white text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-brand/15'
                    : 'text-zinc-500 hover:text-zinc-800',
                )}
              >
                <Eye size={14} className={mode === 'preview' ? 'text-brand' : 'text-zinc-400'} />
                Preview
              </button>
              <button
                type="button"
                onClick={() => setMode('strings')}
                aria-pressed={mode === 'strings'}
                className={cn(
                  'h-8 px-2.5 rounded-md inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors',
                  mode === 'strings'
                    ? 'bg-white text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-brand/15'
                    : 'text-zinc-500 hover:text-zinc-800',
                )}
              >
                <TextQuote size={14} className={mode === 'strings' ? 'text-brand' : 'text-zinc-400'} />
                Strings
              </button>
            </div>

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

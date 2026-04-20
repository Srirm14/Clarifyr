'use client'

import { useEffect, useRef, useState } from 'react'
import { Expand, Minimize2, PanelRightClose, Sparkles, Wand2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DocSenseChat from '@/components/viewer/DocSenseChat'
import DocSenseReport from '@/components/viewer/DocSenseReport'
import type { DocMeta } from '@/components/viewer/viewer.types'

const MIN_W = 280
const DEFAULT_W = 360

function getMaxWidthPx() {
  // Cap the panel at 60% of the viewport for a responsive layout.
  // Keep a sensible floor so small screens don't clamp below MIN_W.
  const vw = globalThis.innerWidth || 1200
  return Math.max(MIN_W, Math.floor(vw * 0.6))
}

export default function DocSensePanel({
  doc,
  onJumpToPage,
  onClose,
}: Readonly<{
  doc: DocMeta
  onJumpToPage?: (page: number) => void
  onClose: () => void
}>) {
  const [width, setWidth] = useState(() => {
    const maxW = getMaxWidthPx()
    const saved = globalThis.localStorage?.getItem('docsense-panel-width')
    if (!saved) return Math.min(maxW, Math.max(MIN_W, DEFAULT_W))
    const parsed = Number.parseInt(saved)
    if (Number.isNaN(parsed)) return Math.min(maxW, Math.max(MIN_W, DEFAULT_W))
    return Math.min(maxW, Math.max(MIN_W, parsed))
  })
  const [tab, setTab] = useState<'report' | 'chat'>('report')
  const [chatFullscreen, setChatFullscreen] = useState(false)
  const [reportReady, setReportReady] = useState(false)
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const startWRef = useRef(0)

  function handleDragStart(e: React.MouseEvent) {
    e.preventDefault()
    draggingRef.current = true
    startXRef.current = e.clientX
    startWRef.current = width
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    function clampToViewport() {
      const maxW = getMaxWidthPx()
      setWidth(w => Math.min(maxW, Math.max(MIN_W, w)))
    }

    function onMouseMove(e: MouseEvent) {
      if (!draggingRef.current) return
      const delta = startXRef.current - e.clientX
      const maxW = getMaxWidthPx()
      setWidth(Math.min(maxW, Math.max(MIN_W, startWRef.current + delta)))
    }
    function onMouseUp() {
      if (!draggingRef.current) return
      draggingRef.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      setWidth(w => {
        localStorage.setItem('docsense-panel-width', String(w))
        return w
      })
    }
    globalThis.addEventListener('mousemove', onMouseMove)
    globalThis.addEventListener('mouseup', onMouseUp)
    globalThis.addEventListener('resize', clampToViewport)
    clampToViewport()
    return () => {
      globalThis.removeEventListener('mousemove', onMouseMove)
      globalThis.removeEventListener('mouseup', onMouseUp)
      globalThis.removeEventListener('resize', clampToViewport)
    }
  }, [])

  return (
    <>
      <motion.aside
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width }}
        className="relative flex-shrink-0 flex flex-col h-full overflow-hidden workspace-edge-glow workspace-panel border-l-0 rounded-l-3xl"
      >
        {/* Drag handle */}
        <div
          onMouseDown={handleDragStart}
          className="absolute left-0 top-0 bottom-0 w-2 cursor-col-resize z-20 group flex items-center justify-center"
          aria-hidden
        >
          <div className="w-[3px] h-10 rounded-full bg-zinc-200 group-hover:bg-brand transition-colors duration-150" />
        </div>

        {/* Header + tabs */}
        <div className="border-b border-zinc-100 flex-shrink-0">
          <div className="h-12 flex items-center justify-between pl-5 pr-4">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles size={15} className="text-brand flex-shrink-0" />
              <span className="text-sm font-semibold text-zinc-800">DocSense</span>
              <span
                className={[
                  'text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none',
                  'bg-white/70 backdrop-blur-sm border',
                  'border-brand/20 text-brand shadow-sm',
                ].join(' ')}
              >
                AI
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {tab === 'chat' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                      onClick={() => setChatFullscreen(true)}
                      aria-label="Expand chat"
                    >
                      <Expand size={15} />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Fullscreen chat</TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                    onClick={onClose}
                    aria-label="Close panel"
                  >
                    <PanelRightClose size={15} />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="left">Close panel</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="px-4 pb-3">
            <p className="text-[11px] text-zinc-400 truncate">{doc.name}</p>
            <Tabs value={tab} onValueChange={v => setTab(v as 'report' | 'chat')} className="mt-2">
              <TabsList className="w-full h-9 bg-white/70 border border-zinc-200/70 rounded-xl p-1 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <TabsTrigger
                  value="report"
                  className="flex-1 rounded-lg text-[12px] font-semibold text-zinc-600
                             data-[state=active]:text-[#9A3412]
                             data-[state=active]:bg-brand-50/70
                             data-[state=active]:shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                             data-[state=active]:border data-[state=active]:border-brand/20"
                >
                  Report
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="flex-1 rounded-lg text-[12px] font-semibold text-zinc-600
                             data-[state=active]:text-[#9A3412]
                             data-[state=active]:bg-brand-50/70
                             data-[state=active]:shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                             data-[state=active]:border data-[state=active]:border-brand/20"
                >
                  Chat
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0">
          <Tabs value={tab} onValueChange={v => setTab(v as 'report' | 'chat')} className="h-full">
            <TabsContent value="report" className="mt-0 h-full overflow-y-auto">
              {reportReady ? (
                <DocSenseReport doc={doc} onJumpToPage={onJumpToPage} />
              ) : (
                <div className="h-full flex items-center justify-center px-6 py-10">
                  <div className="max-w-[360px] w-full text-center">
                    <div className="mx-auto w-11 h-11 rounded-2xl bg-brand-50 border border-brand/10 flex items-center justify-center">
                      <Wand2 size={18} className="text-brand" />
                    </div>
                    <p className="text-[13px] font-semibold text-zinc-900 mt-4">Generate a premium report</p>
                    <p className="text-[12px] text-zinc-500 leading-relaxed mt-2">
                      Create an executive summary, key risks, important clauses, and suggested improvements for this document.
                    </p>
                    <motion.button
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setReportReady(true)}
                      className="mt-5 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl
                                 bg-gradient-to-r from-brand-light to-brand text-white font-semibold text-[12px]
                                 shadow-[0_10px_26px_rgba(232,93,4,0.18)]
                                 hover:shadow-[0_14px_34px_rgba(232,93,4,0.22)]
                                 transition-shadow"
                    >
                      <Wand2 size={14} />
                      Generate report
                    </motion.button>
                    <p className="text-[10px] text-zinc-400 mt-3">
                      Tip: you can still use Chat for quick questions without generating.
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="chat" className="mt-0 h-full flex flex-col min-h-0">
              <div className="px-4 py-3 border-b border-zinc-100">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Document context
                </p>
                <p className="text-[12px] font-semibold text-zinc-900 mt-1 leading-snug line-clamp-2">
                  {doc.name}
                </p>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Ask about risks, obligations, negotiation levers, or rewrite suggestions — answers stay tied to this document.
                </p>
              </div>
              <DocSenseChat docName={doc.name} />
            </TabsContent>
          </Tabs>
        </div>
      </motion.aside>

      {/* Fullscreen Chat Overlay */}
      <AnimatePresence>
        {chatFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-[60]"
          >
            <button
              type="button"
              className="absolute inset-0 bg-zinc-950/30 backdrop-blur-sm"
              onClick={() => setChatFullscreen(false)}
              aria-label="Close fullscreen chat"
            />
            <motion.div
              initial={{ y: 14, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 14, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-4 md:inset-8 bg-white rounded-3xl border border-zinc-200 shadow-[0_24px_80px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              <div className="h-12 px-4 flex items-center justify-between border-b border-zinc-100">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    DocSense chat
                  </p>
                  <p className="text-[12px] font-semibold text-zinc-900 truncate">{doc.name}</p>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors"
                  onClick={() => setChatFullscreen(false)}
                  aria-label="Exit fullscreen"
                >
                  <Minimize2 size={16} />
                </motion.button>
              </div>
              <div className="flex-1 min-h-0">
                <DocSenseChat docName={doc.name} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUp, MessageSquare, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/components/viewer/viewer.types'

const MOCK_REPLIES = [
  'This document contains **6 high-risk clauses** including an unlimited liability provision in Section 4.2. I recommend legal review before signing.',
  'The indemnification clause (§8.1) is unusually broad — it covers third-party claims without a cap. This deviates from market standard.',
  'Based on my analysis, this agreement is **72% unfavorable** to you as the counterparty. The termination clause gives the other party unilateral exit rights.',
] as const

function streamAssistantMessage(args: {
  reply: string
  id: string
  createdAt: number
  onChunk: (content: string) => void
  onDone: () => void
}) {
  const { reply, id, createdAt, onChunk, onDone } = args
  let idx = 0
  const tick = () => {
    idx += Math.max(2, Math.round(reply.length / 28))
    onChunk(reply.slice(0, idx))
    if (idx < reply.length) globalThis.setTimeout(tick, 40)
    else onDone()
  }
  tick()
  return { id, createdAt }
}

function upsertAssistantMessage(
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  args: { id: string; createdAt: number; content: string },
) {
  setMessages(prev => {
    const existing = prev.find(m => m.id === args.id)
    if (existing) return prev.map(m => (m.id === args.id ? { ...m, content: args.content } : m))
    return [...prev, { id: args.id, role: 'assistant', content: args.content, createdAt: args.createdAt }]
  })
}

function TypingDots() {
  return (
    <div className="flex items-start gap-2 px-1">
      <div className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Sparkles size={10} className="text-brand" />
      </div>
      <div className="workspace-surface rounded-2xl rounded-tl-sm px-3 py-2.5">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.2s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.1s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
        </div>
      </div>
    </div>
  )
}

export default function DocSenseChat({
  docName,
  suggestedPrompts = ['What are the key risks?', 'Summarise the obligations', 'What should I negotiate first?'],
}: Readonly<{
  docName: string
  suggestedPrompts?: string[]
}>) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const canSend = input.trim().length > 0 && !isTyping

  const emptyState = useMemo(
    () => (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6 py-8">
        <div className="w-10 h-10 rounded-2xl bg-brand-50 flex items-center justify-center opacity-70">
          <Sparkles size={18} className="text-brand" />
        </div>
        <div>
          <p className="text-[12px] font-medium text-zinc-600 leading-relaxed">Ask about this document</p>
          <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5 max-w-[180px]">
            I’m ready to answer questions about clauses, risks, and negotiation points.
          </p>
          <p className="text-[10px] text-zinc-400 mt-2 max-w-[220px] truncate">
            {docName}
          </p>
        </div>
        <div className="flex flex-col gap-1.5 w-full max-w-[200px]">
          {suggestedPrompts.map(hint => (
            <button
              key={hint}
              type="button"
              onClick={() => setInput(hint)}
              className="text-[11px] text-zinc-500 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg px-3 py-1.5 transition-colors text-left truncate"
            >
              {hint}
            </button>
          ))}
        </div>
      </div>
    ),
    [docName, suggestedPrompts],
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, isTyping])

  function pushAssistantReply() {
    const reply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)] ?? MOCK_REPLIES[0]
    const id = crypto.randomUUID()
    const createdAt = Date.now()
    setIsTyping(true)
    globalThis.setTimeout(() => {
      setIsTyping(false)
      streamAssistantMessage({
        reply,
        id,
        createdAt,
        onChunk: content => upsertAssistantMessage(setMessages, { id, createdAt, content }),
        onDone: () => {},
      })
    }, 1200)
  }

  function handleSend() {
    const text = input.trim()
    if (!text || isTyping) return
    setInput('')
    setMessages(prev => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', content: text, createdAt: Date.now() },
    ])
    pushAssistantReply()
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-2 px-4 py-2 border-t border-zinc-100">
        <MessageSquare size={12} className="text-zinc-400" />
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Ask DocSense</span>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="px-3 py-2 flex flex-col gap-3 min-h-full">
          {messages.length === 0 && !isTyping ? (
            emptyState
          ) : (
            <>
              {messages.map(m => {
                const isUser = m.role === 'user'
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}
                  >
                    {isUser ? (
                      <div className="max-w-[220px] px-3 py-2 text-xs leading-relaxed bg-brand text-white rounded-2xl rounded-br-sm">
                        {m.content}
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 max-w-[240px]">
                        <div className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles size={10} className="text-brand" />
                        </div>
                        <div className="workspace-surface rounded-2xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed text-zinc-800">
                          <div className="prose prose-xs prose-zinc max-w-none">
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    )}
                    <span className="text-[10px] text-zinc-400 tabular-nums">
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                )
              })}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TypingDots />
                </motion.div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 border-t border-zinc-100 px-3 py-2.5">
        <div
          className={cn(
            'flex items-end gap-2 bg-zinc-50 rounded-xl border border-zinc-200 px-2.5 py-1.5',
            'transition-all duration-200',
            'focus-within:border-brand/40 focus-within:ring-[3px] focus-within:ring-[#FED7AA]',
          )}
        >
          <textarea
            rows={1}
            value={input}
            placeholder="Ask about this document..."
            className="flex-1 resize-none bg-transparent text-[12px] text-zinc-800 placeholder:text-zinc-400 outline-none leading-relaxed max-h-20 overflow-y-auto"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <AnimatePresence>
            {canSend && (
              <motion.button
                key="send"
                type="button"
                initial={{ opacity: 0, x: 8, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.8 }}
                transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={handleSend}
                className="w-6 h-6 rounded-lg bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-colors flex-shrink-0"
                aria-label="Send"
              >
                <ArrowUp size={12} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <p className="text-[9px] text-zinc-400 mt-1 px-0.5">Shift+Enter for new line · Enter to send</p>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUp, MessageSquare, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
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
    <div className="flex items-center gap-1 px-3 py-2">
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.2s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.1s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
    </div>
  )
}

export default function DocSenseChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const canSend = input.trim().length > 0 && !isTyping

  const emptyState = useMemo(
    () => (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-center px-5 py-4">
        <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center">
          <Sparkles size={13} className="text-brand" />
        </div>
        <p className="text-[12px] text-zinc-400 leading-relaxed max-w-[200px]">
          Ask me anything about this document — clauses, risks, or obligations.
        </p>
      </div>
    ),
    [],
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, isTyping])

  function pushAssistantReply() {
    const reply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)] ?? MOCK_REPLIES[0]
    const id = crypto.randomUUID()
    const createdAt = Date.now()

    // Simulated "streaming" effect
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
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', content: text, createdAt: Date.now() }])
    pushAssistantReply()
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-2 px-4 py-2 border-t border-zinc-100">
        <MessageSquare size={12} className="text-zinc-400" />
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Ask DocSense</span>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="px-3 py-2 flex flex-col gap-2.5 min-h-full">
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
                    className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[220px] px-3 py-2 text-xs leading-relaxed',
                        isUser
                          ? 'bg-brand text-white rounded-2xl rounded-br-sm'
                          : 'bg-zinc-100 text-zinc-800 rounded-2xl rounded-bl-sm',
                      )}
                    >
                      {isUser ? (
                        m.content
                      ) : (
                        <div className="prose prose-xs prose-zinc max-w-none">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 tabular-nums">
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                )
              })}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start">
                  <div className="bg-zinc-100 text-zinc-800 rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 border-t border-zinc-100 px-3 py-2.5">
        <div
          className="flex items-end gap-2 bg-zinc-50 rounded-xl border border-zinc-200
                     focus-within:border-brand/50 focus-within:ring-2 focus-within:ring-brand/10
                     transition-all px-2.5 py-1.5"
        >
          <textarea
            rows={1}
            value={input}
            placeholder="Ask about this document..."
            className="flex-1 resize-none bg-transparent text-[12px] text-zinc-800
                       placeholder:text-zinc-400 outline-none leading-relaxed
                       max-h-20 overflow-y-auto"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="w-6 h-6 rounded-lg bg-brand text-white flex items-center justify-center
                       hover:bg-brand/90 disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all flex-shrink-0"
            aria-label="Send"
          >
            <ArrowUp size={12} />
          </button>
        </div>
        <p className="text-[9px] text-zinc-400 mt-1 px-0.5">Shift+Enter for new line · Enter to send</p>
      </div>
    </div>
  )
}


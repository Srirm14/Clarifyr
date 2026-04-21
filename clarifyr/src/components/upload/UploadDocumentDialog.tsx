'use client'

import { useId, useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { createCategory, loadCategories, type Category } from '@/lib/categories/storage'
import { FileText, FolderPlus, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

type UploadPayload = {
  file: File
  category: Category
}

export default function UploadDocumentDialog({
  open,
  onOpenChange,
  onUploaded,
}: Readonly<{
  open: boolean
  onOpenChange: (v: boolean) => void
  onUploaded?: (payload: UploadPayload) => void
}>) {
  const { toast } = useToast()
  const [categories, setCategories] = useState<Category[]>(() => loadCategories())
  const [file, setFile] = useState<File | null>(null)
  const [selectedId, setSelectedId] = useState<string>(() => loadCategories()[0]?.id ?? 'legal')
  const [query, setQuery] = useState('')
  const [newCat, setNewCat] = useState('')
  const fileInputId = useId()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories
    return categories.filter(c => c.name.toLowerCase().includes(q))
  }, [categories, query])

  const selected = useMemo(
    () => categories.find(c => c.id === selectedId) ?? categories[0] ?? null,
    [categories, selectedId],
  )

  const canSubmit = Boolean(file && selected)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'w-[calc(100%-2rem)] gap-0 p-0 overflow-hidden rounded-3xl',
          'max-w-xl sm:max-w-2xl md:max-w-3xl xl:max-w-4xl',
          'flex max-h-[min(90dvh,880px)] flex-col',
          'workspace-panel workspace-edge-glow',
        )}
      >
        <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-zinc-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-[15px] font-semibold text-zinc-950">Upload document</DialogTitle>
              <p className="text-[12px] text-zinc-500 mt-1">
                Pick a category so your workspace stays organized.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null)
                setQuery('')
                setNewCat('')
                onOpenChange(false)
              }}
              className="w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 transition-colors inline-flex items-center justify-center"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </DialogHeader>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-y-auto lg:grid-cols-12">
          <div className="lg:col-span-7 px-6 py-5">
            <div className="rounded-3xl bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-brand" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-zinc-950">Document file</p>
                  <p className="text-[12px] text-zinc-500 mt-1">
                    Upload a PDF or DOCX to analyze with DocSense.
                  </p>
                </div>
              </div>

              <div className="mt-4 min-w-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <input
                    id={fileInputId}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={e => setFile(e.target.files?.[0] ?? null)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={fileInputId}
                    className={cn(
                      'inline-flex h-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg',
                      'bg-brand-50 px-3 text-[12px] font-semibold text-brand transition-colors',
                      'hover:bg-brand-100',
                    )}
                  >
                    Choose file
                  </label>
                  <p
                    className="min-w-0 flex-1 text-[12px] text-zinc-600 sm:py-0.5"
                    title={file?.name ?? 'No file chosen'}
                  >
                    <span className="block truncate">
                      {file?.name ?? 'No file chosen'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-3xl bg-[linear-gradient(135deg,rgba(251,146,60,0.12)_0%,rgba(232,93,4,0.08)_35%,rgba(0,0,0,0.00)_100%)] border border-brand/15 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Category</p>
              <p className="mt-2 text-[13px] font-semibold text-zinc-950">
                {selected?.name ?? 'Choose a category'}
              </p>
              <p className="mt-1 text-[12px] text-zinc-600">
                Used in Documents, filters, and dashboard metrics.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-zinc-100 bg-white">
            <div className="px-6 py-5">
              <div className="flex items-end justify-between gap-3">
                <div className="flex-1">
                  <Label className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Pick category</Label>
                  <Input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search categories…"
                    className="mt-2"
                  />
                </div>
              </div>

              <ScrollArea className="mt-3 h-[220px] rounded-2xl border border-zinc-200/70">
                <div className="divide-y divide-zinc-100">
                  {filtered.map(c => {
                    const active = c.id === selectedId
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedId(c.id)}
                        className={cn(
                          'w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors',
                          active ? 'bg-brand-50/60' : 'hover:bg-zinc-50',
                        )}
                      >
                        <span className="text-[13px] font-medium text-zinc-900">{c.name}</span>
                        <span
                          className={cn(
                            'w-5 h-5 rounded-md border flex-shrink-0',
                            active
                              ? 'border-brand bg-brand shadow-[0_0_0_3px_rgba(251,146,60,0.18)]'
                              : 'border-zinc-300 bg-white',
                          )}
                          aria-hidden
                        />
                      </button>
                    )
                  })}
                  {filtered.length === 0 && (
                    <div className="px-4 py-8 text-center text-[12px] text-zinc-500">
                      No categories found.
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-zinc-50/60 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Create category
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    placeholder="e.g. Tax, Visa, Client work…"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 px-3"
                    onClick={() => {
                      const created = createCategory(newCat)
                      setCategories(loadCategories())
                      if (created) {
                        setSelectedId(created.id)
                        setNewCat('')
                        toast({ title: 'Category created', description: `Added “${created.name}”.` })
                      }
                    }}
                  >
                    <FolderPlus size={16} />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 gap-3 border-t border-zinc-100 bg-white px-6 py-4 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (!file || !selected) return
              toast({
                title: 'Uploaded',
                description: `Added “${file.name}” to “${selected.name}” (demo).`,
              })
              onUploaded?.({ file, category: selected })
              onOpenChange(false)
            }}
            disabled={!canSubmit}
            className="w-full min-w-0 sm:w-auto sm:min-w-[160px]"
          >
            <Upload size={16} />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


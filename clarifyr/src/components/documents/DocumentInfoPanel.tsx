'use client'

import type { DocumentRow } from '@/lib/mock/documents'

export default function DocumentInfoPanel({ doc }: Readonly<{ doc: DocumentRow }>) {
  return (
    <div className="card-base p-0 overflow-hidden min-h-0 h-full">
      <div className="p-5 space-y-5 overflow-y-auto">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-micro font-semibold uppercase tracking-widest text-zinc-400">Details</p>
          <div className="mt-3 space-y-2 text-[13px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-500">Type</span>
              <span className="text-zinc-900 font-medium">{doc.type}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-500">Uploaded</span>
              <span className="text-zinc-900 font-medium">{doc.uploaded}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-zinc-500">Status</span>
              <span className="text-zinc-900 font-medium">{doc.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


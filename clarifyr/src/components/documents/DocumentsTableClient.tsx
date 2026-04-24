'use client'

import { CheckCircle2, Clock3, FileText, Upload } from 'lucide-react'
import {
  WorkspacePageHeader,
  WorkspaceTable,
  WorkspaceTableToolbar,
  WorkspaceToolbarPillLink,
  type WorkspaceTableColumn,
} from '@/components/workspace'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { DocFilter, DocumentRow } from '@/lib/mock/documents'
import { DOC_FILTERS } from '@/lib/mock/documents'
import { useUploadDialog } from '@/lib/upload/useUploadDialog'

const documentTableColumns: WorkspaceTableColumn<DocumentRow>[] = [
  {
    id: 'name',
    colClassName: 'col-span-5',
    header: 'Document Name',
    cell: doc => (
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-400 group-hover:text-zinc-500">
          <FileText size={16} strokeWidth={1.75} />
        </div>
        <span className="truncate text-[13px] font-medium text-zinc-900 group-hover:text-zinc-950">
          {doc.name}
        </span>
      </div>
    ),
  },
  {
    id: 'type',
    colClassName: 'col-span-2',
    header: 'Type',
    cell: doc => (
      <span className="text-[12px] text-zinc-500 group-hover:text-zinc-600">{doc.type}</span>
    ),
  },
  {
    id: 'uploaded',
    colClassName: 'col-span-2',
    header: 'Uploaded',
    cell: doc => <span className="text-[13px] text-zinc-500">{doc.uploaded}</span>,
  },
  {
    id: 'risks',
    colClassName: 'col-span-2',
    header: 'Risk Summary',
    cell: doc => (
      <div className="flex items-center gap-2 text-[12px]">
        <span className="text-zinc-500">
          <span className="font-semibold text-red-600/90">{doc.risks.critical}</span> Critical
        </span>
        <span className="text-zinc-300">·</span>
        <span className="text-zinc-500">
          <span className="font-semibold text-orange-600/90">{doc.risks.risky}</span> Risky
        </span>
        {doc.risks.critical === 0 && doc.risks.risky === 0 && (
          <Badge variant="standard" className="ml-1">
            —
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: 'status',
    colClassName: 'col-span-1',
    header: 'Status',
    headerAlign: 'right',
    cell: doc =>
      doc.status === 'Ready' ? (
        <div className="flex justify-end">
          <span className="inline-flex items-center gap-1.5 text-[12px] text-zinc-600">
            <CheckCircle2 size={14} className="text-emerald-600" />
            Ready
          </span>
        </div>
      ) : (
        <div className="flex justify-end">
          <span className="inline-flex items-center gap-1.5 text-[12px] text-zinc-500">
            <Clock3 size={14} className="text-zinc-400" />
            Processing
          </span>
        </div>
      ),
  },
]

export default function DocumentsTableClient({
  filter,
  rows,
  page,
  pageSize,
  total,
  totalPages,
}: Readonly<{
  filter: DocFilter
  rows: DocumentRow[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}>) {
  const upload = useUploadDialog()
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(total, page * pageSize)
  const filterPrefix = filter === 'All' ? '' : `filter=${encodeURIComponent(filter)}&`

  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      {upload.dialog}

      <WorkspacePageHeader
        title="All Documents"
        description="Mock data from the Next.js backend (server) for now."
        actions={
          <Button variant="default" className="h-10 px-4" onClick={upload.openDialog}>
            <Upload size={16} />
            Upload document
          </Button>
        }
      />

      <WorkspaceTableToolbar>
        {DOC_FILTERS.map(f => {
          const href = f === 'All' ? '/documents' : `/documents?filter=${encodeURIComponent(f)}&page=1`
          return (
            <WorkspaceToolbarPillLink key={f} href={href} active={filter === f}>
              {f}
            </WorkspaceToolbarPillLink>
          )
        })}
      </WorkspaceTableToolbar>

      <WorkspaceTable<DocumentRow>
        className="mt-5"
        columns={documentTableColumns}
        rows={rows}
        getRowKey={row => row.id}
        rowHref={row => `/documents/${row.id}`}
        emptyState={<p>Nothing in this list yet. Try a different filter or upload a document.</p>}
        pagination={{
          from,
          to,
          total,
          page,
          totalPages,
          prevHref: `/documents?${filterPrefix}page=${Math.max(1, page - 1)}`,
          nextHref: `/documents?${filterPrefix}page=${Math.min(totalPages, page + 1)}`,
          prevDisabled: page <= 1,
          nextDisabled: page >= totalPages,
        }}
        minWidth={980}
      />
    </div>
  )
}

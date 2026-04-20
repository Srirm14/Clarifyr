export const DOC_FILTERS = ['All', 'Employment', 'NDA', 'Rental', 'Freelance'] as const
export type DocFilter = (typeof DOC_FILTERS)[number]

export type DocumentRow = {
  id: string
  name: string
  type: Exclude<DocFilter, 'All'> | 'Unknown'
  uploaded: string
  risks: { critical: number; risky: number }
  status: 'Ready' | 'Processing'
}

export const MOCK_DOCS: DocumentRow[] = [
  {
    id: '1',
    name: 'Google Offer Letter.pdf',
    type: 'Employment',
    uploaded: 'Apr 14, 2025',
    risks: { critical: 2, risky: 3 },
    status: 'Ready',
  },
  {
    id: '2',
    name: 'Freelance Agreement – Acme.docx',
    type: 'Freelance',
    uploaded: 'Apr 12, 2025',
    risks: { critical: 0, risky: 1 },
    status: 'Ready',
  },
  {
    id: '3',
    name: 'Apartment Lease – HSR Layout.pdf',
    type: 'Rental',
    uploaded: 'Apr 10, 2025',
    risks: { critical: 1, risky: 4 },
    status: 'Ready',
  },
  {
    id: '4',
    name: 'NDA – Series A.pdf',
    type: 'NDA',
    uploaded: 'Apr 08, 2025',
    risks: { critical: 0, risky: 2 },
    status: 'Ready',
  },
  {
    id: '5',
    name: 'Vendor Contract Draft.pdf',
    type: 'Unknown',
    uploaded: 'Apr 05, 2025',
    risks: { critical: 0, risky: 0 },
    status: 'Processing',
  },
  {
    id: '6',
    name: 'Employment Contract – Startup.pdf',
    type: 'Employment',
    uploaded: 'Mar 28, 2025',
    risks: { critical: 1, risky: 2 },
    status: 'Ready',
  },
  {
    id: '7',
    name: 'NDA – Advisor Agreement.pdf',
    type: 'NDA',
    uploaded: 'Mar 19, 2025',
    risks: { critical: 0, risky: 1 },
    status: 'Ready',
  },
  {
    id: '8',
    name: 'Rental Addendum – Repairs.pdf',
    type: 'Rental',
    uploaded: 'Mar 11, 2025',
    risks: { critical: 0, risky: 2 },
    status: 'Ready',
  },
  {
    id: '9',
    name: 'Freelance SOW – Website Redesign.pdf',
    type: 'Freelance',
    uploaded: 'Feb 26, 2025',
    risks: { critical: 0, risky: 1 },
    status: 'Ready',
  },
  {
    id: '10',
    name: 'NDA – Seed Round.pdf',
    type: 'NDA',
    uploaded: 'Feb 10, 2025',
    risks: { critical: 1, risky: 0 },
    status: 'Ready',
  },
] as const

function normalizeFilter(filter?: string): DocFilter {
  const f = (filter ?? 'All').trim()
  return (DOC_FILTERS as readonly string[]).includes(f) ? (f as DocFilter) : 'All'
}

export async function getDocuments(args?: {
  filter?: string
  page?: number
  pageSize?: number
  simulateMs?: number
}) {
  const filter = normalizeFilter(args?.filter)
  const simulateMs = args?.simulateMs ?? 350

  // Simulate a Next.js "backend" call.
  await new Promise<void>(resolve => setTimeout(resolve, simulateMs))

  const allRows = filter === 'All' ? MOCK_DOCS : MOCK_DOCS.filter(d => d.type === filter)

  const pageSize = Math.max(1, Math.min(50, args?.pageSize ?? 8))
  const requestedPage = Math.max(1, Number(args?.page ?? 1))
  const total = allRows.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(requestedPage, totalPages)
  const start = (page - 1) * pageSize
  const rows = allRows.slice(start, start + pageSize)

  return { filter, rows, total, page, pageSize, totalPages }
}

export function getDocumentByIdSync(id: string) {
  return MOCK_DOCS.find(d => d.id === id) ?? null
}

export async function getDocumentById(args: { id: string; simulateMs?: number }) {
  const simulateMs = args.simulateMs ?? 250
  await new Promise<void>(resolve => setTimeout(resolve, simulateMs))
  return getDocumentByIdSync(args.id)
}

export const RECENT_DOC_IDS = ['1', '2', '3'] as const


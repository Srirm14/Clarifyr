import DocumentsTableClient from '@/components/documents/DocumentsTableClient'
import { getDocuments } from '@/lib/mock/documents'

export default async function DocumentsPage({
  searchParams,
}: Readonly<{
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}>) {
  const sp = (await searchParams) ?? {}
  const filter = Array.isArray(sp.filter) ? sp.filter[0] : sp.filter
  const pageRaw = Array.isArray(sp.page) ? sp.page[0] : sp.page
  const page = pageRaw ? Number(pageRaw) : 1

  const data = await getDocuments({ filter, page, pageSize: 8, simulateMs: 450 })

  return (
    <DocumentsTableClient
      filter={data.filter}
      rows={data.rows}
      page={data.page}
      pageSize={data.pageSize}
      total={data.total}
      totalPages={data.totalPages}
    />
  )
}


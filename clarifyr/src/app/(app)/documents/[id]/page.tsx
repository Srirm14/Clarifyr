import { notFound } from 'next/navigation'
import { getDocumentById } from '@/lib/mock/documents'
import DocumentDetailClient from '@/components/documents/DocumentDetailClient'

export default async function DocumentDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params
  const doc = await getDocumentById({ id, simulateMs: 300 })
  if (!doc) notFound()

  return (
    <div className="h-full min-h-0 flex flex-col overflow-hidden">
      <DocumentDetailClient doc={doc} />
    </div>
  )
}


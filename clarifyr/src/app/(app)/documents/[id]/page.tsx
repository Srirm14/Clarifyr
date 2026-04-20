import { notFound } from 'next/navigation'
import { getDocumentById } from '@/lib/mock/documents'
import PDFViewer from '@/components/viewer/PDFViewer'
import type { DocMeta } from '@/components/viewer/viewer.types'

export default async function DocumentDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params
  const doc = await getDocumentById({ id, simulateMs: 300 })
  if (!doc) notFound()

  const viewDoc: DocMeta = {
    id: doc.id,
    name: doc.name,
    fileUrl: '/sample.pdf',
    uploadedAt: new Date().toISOString(),
  }

  return (
    // Negate AppLayout's px-6 py-6 so the viewer is full-bleed
    <div className="-m-6 h-[calc(100%+48px)] flex flex-col overflow-hidden">
      <PDFViewer doc={viewDoc} />
    </div>
  )
}


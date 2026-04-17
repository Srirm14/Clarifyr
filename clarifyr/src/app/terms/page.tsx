import type { Metadata } from 'next'
import LegalLayout from '@/components/legal/LegalLayout'
import TermsContent from '@/components/legal/TermsContent'

export const metadata: Metadata = {
  title:       'Terms of Service – Clarifyr',
  description: 'Terms and conditions for using Clarifyr.',
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="January 1, 2025">
      <TermsContent />
    </LegalLayout>
  )
}

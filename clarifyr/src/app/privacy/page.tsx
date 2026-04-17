import type { Metadata } from 'next'
import LegalLayout from '@/components/legal/LegalLayout'
import PrivacyContent from '@/components/legal/PrivacyContent'

export const metadata: Metadata = {
  title:       'Privacy Policy – Clarifyr',
  description: 'How Clarifyr collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 1, 2025">
      <PrivacyContent />
    </LegalLayout>
  )
}

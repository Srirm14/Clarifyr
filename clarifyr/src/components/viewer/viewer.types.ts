export type DocMeta = {
  id: string
  name: string
  fileUrl: string
  uploadedAt: string
}

export type DocSenseMetricVariant = 'risk-high' | 'risk-medium' | 'risk-low' | 'info' | 'default'

export type DocSenseMetric = {
  label: string
  value: string
  sub: string
  variant: DocSenseMetricVariant
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}


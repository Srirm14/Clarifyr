'use client'

import { useCallback, useMemo, useState } from 'react'
import UploadDocumentDialog from '@/components/upload/UploadDocumentDialog'

export function useUploadDialog() {
  const [open, setOpen] = useState(false)

  const openDialog = useCallback(() => setOpen(true), [])
  const closeDialog = useCallback(() => setOpen(false), [])

  const dialog = useMemo(() => {
    if (!open) return null
    return <UploadDocumentDialog open={open} onOpenChange={setOpen} />
  }, [open])

  return { open, openDialog, closeDialog, dialog }
}


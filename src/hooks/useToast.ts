import { useState, useCallback } from 'react'

interface ToastState {
  message: string
  key: number
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string) => {
    setToast({ message, key: Date.now() })
  }, [])

  const clearToast = useCallback(() => {
    setToast(null)
  }, [])

  return { toast, showToast, clearToast }
}

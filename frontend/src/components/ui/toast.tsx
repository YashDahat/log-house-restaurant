import * as React from "react"

// Minimal toast type definitions required by use-toast.ts
export type ToastProps = {
  id?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

export type ToastActionElement = React.ReactElement

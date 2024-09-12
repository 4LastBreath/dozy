import { createContext, useContext } from "react";

type ToastContextValue = {
  close: (id: number) => void
  info: (message: string) => void
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const currentToastContext = useContext(ToastContext)

  if (!currentToastContext) {
    throw new Error('useToast must be used within <ToastContext.Provider>')
  }

  return currentToastContext
}
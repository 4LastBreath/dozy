import { PropsWithChildren, useState, useMemo, useEffect } from "react";
import { ToastContext } from "./toastContext";
import Toast from "@/components/ui/toast";

export type ToastVariant = "info" | "warning" | "error" | "success";

type ToastType = {
  message: string;
  variant: ToastVariant;
  id: number;
}

export function ToastProvider({children} : PropsWithChildren) {

  const [toasts, setToasts] = useState<ToastType[]>([])

  function openToast(message: string, variant: ToastVariant) {
    const newToast = {
      id: Date.now(),
      message,
      variant, 
    }

    setToasts((prev) => [...prev, newToast])
  }

  function closeToast(id: number) {
    return setToasts((prev) =>
      prev.filter((toast) => toast.id !== id) 
    )
  }

  const contextValue = useMemo(() => ({
    info: (message: string) => openToast(message, 'info'),
    warning: (message: string) => openToast(message, 'warning'),
    success: (message: string) => openToast(message, 'success'),
    error: (message: string) => openToast(message, 'error'),
    close: closeToast
  }), [])

  useEffect(() => {
    const firstToast = toasts[0]

    if (toasts.length > 3) {
      closeToast(firstToast.id)
    }
  }, [toasts])


  return (
    <ToastContext.Provider value={contextValue}>
        {children}

        {toasts.length !== 0 &&
          <div className="fixed top-[calc(theme(height.header)+0.25rem)] left-[50%] translate-x-[-50%] flex flex-col gap-2 z-50">
            {toasts.map(toast => {
              return (
                <Toast 
                  key={toast.id}
                  variant={toast.variant}
                  message={toast.message}
                  close={() => closeToast(toast.id)}
                />
              )
            })}

          </div>
        }

    </ToastContext.Provider>
  )
}
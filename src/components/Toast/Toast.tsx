import type { ReactNode } from 'react'
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastItem = {
  id: string
  variant: ToastVariant
  message: string
  duration?: number
  onDismiss?: () => void
}

type ToastContextValue = {
  toasts: ToastItem[]
  addToast: (opts: Omit<ToastItem, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

type ToastProviderProps = {
  children: ReactNode
  /** Placement of the toast container. Defaults to top-right. */
  position?: ToastPosition
}

/**
 * Provides toast context. Render once at app root. Use useToast() to show toasts.
 */
export function ToastProvider({ children, position = 'top-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((opts: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const duration = opts.duration ?? 5000
    const item: ToastItem = { ...opts, id }
    setToasts((prev) => [...prev, item])
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
        opts.onDismiss?.()
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => {
      const t = prev.find((x) => x.id === id)
      t?.onDismiss?.()
      return prev.filter((x) => x.id !== id)
    })
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {typeof document !== 'undefined' && (
        <ToastContainer toasts={toasts} onDismiss={removeToast} position={position} />
      )}
    </ToastContext.Provider>
  )
}

type ToastContainerProps = {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
  position: ToastPosition
}

function ToastContainer({ toasts, onDismiss, position }: ToastContainerProps) {
  if (toasts.length === 0) return null
  const positionClass = `fs-toast-container--${position}`
  const container = (
    <div
      className={`fs-toast-container ${positionClass}`}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`fs-toast fs-toast--${t.variant}`}
          role="status"
          aria-live="polite"
        >
          <span className="fs-toast-message">{t.message}</span>
          <button
            type="button"
            className="fs-toast-dismiss"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
  return createPortal(container, document.body)
}

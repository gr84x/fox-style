import type { MouseEvent, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { Button } from '../Button'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  /** Footer content (e.g. buttons, links, or other controls). Any ReactNode is valid. */
  actions?: ReactNode
  className?: string
}

/**
 * Modal dialog using native <dialog>. Focus trapping and backdrop via showModal().
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  className = '',
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    function handleCancel(e: Event) {
      e.preventDefault()
      onClose()
    }
    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [onClose])

  function handleBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      className={`fs-modal ${className}`.trim()}
      onClick={handleBackdropClick}
      onClose={onClose}
      aria-modal="true"
      aria-labelledby={title ? 'fs-modal-title' : undefined}
    >
      <div className="fs-modal-panel">
        <div className="fs-modal-header">
          {title != null && (
            <h2 id="fs-modal-title" className="fs-modal-title">
              {title}
            </h2>
          )}
          <Button
            type="button"
            variant="ghost"
            className="fs-modal-close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </Button>
        </div>
        <div className="fs-modal-body">{children}</div>
        {actions != null && <div className="fs-modal-actions">{actions}</div>}
      </div>
    </dialog>
  )
}

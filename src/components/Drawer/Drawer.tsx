import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export type DrawerPosition = 'left' | 'right'

type Props = {
  open: boolean
  onClose: () => void
  position?: DrawerPosition
  width?: string | number
  title?: string
  children: ReactNode
  className?: string
}

/**
 * Slide-in panel from left or right. Uses a portal and overlay; Escape or backdrop click closes.
 */
export function Drawer({
  open,
  onClose,
  position = 'right',
  width = 320,
  title,
  children,
  className = '',
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const widthVal = typeof width === 'number' ? `${width}px` : width

  const drawer = (
    <div className="fs-drawer-overlay" role="presentation">
      <div
        ref={overlayRef}
        className="fs-drawer-backdrop"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-hidden
      />
      <div
        className={`fs-drawer-panel fs-drawer-panel--${position} ${className}`.trim()}
        style={{ width: widthVal }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'fs-drawer-title' : undefined}
      >
        {title != null && (
          <h2 id="fs-drawer-title" className="fs-drawer-title">
            {title}
          </h2>
        )}
        <div className="fs-drawer-body">{children}</div>
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(drawer, document.body) : null
}

import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right'

type Props = {
  trigger: ReactNode
  children: ReactNode
  position?: PopoverPosition
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

/**
 * Wraps a trigger and shows floating content on click. Uses portal and click-outside to close.
 */
export function Popover({
  trigger,
  children,
  position = 'bottom',
  open: controlledOpen,
  onOpenChange,
  className = '',
}: Props) {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v)
    onOpenChange?.(v)
  }

  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  function updatePosition() {
    const triggerEl = triggerRef.current
    const panelEl = panelRef.current
    if (!triggerEl || !panelEl) return
    const rect = triggerEl.getBoundingClientRect()
    const panelRect = panelEl.getBoundingClientRect()
    const gap = 4
    let top = 0
    let left = rect.left
    switch (position) {
      case 'bottom':
        top = rect.bottom + gap
        left = rect.left + rect.width / 2 - panelRect.width / 2
        break
      case 'top':
        top = rect.top - panelRect.height - gap
        left = rect.left + rect.width / 2 - panelRect.width / 2
        break
      case 'left':
        top = rect.top + rect.height / 2 - panelRect.height / 2
        left = rect.left - panelRect.width - gap
        break
      case 'right':
        top = rect.top + rect.height / 2 - panelRect.height / 2
        left = rect.right + gap
        break
    }
    setCoords({ top, left })
  }

  useEffect(() => {
    if (!open) return
    const t = setTimeout(updatePosition, 0)
    return () => clearTimeout(t)
  }, [open, position])

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      const triggerEl = triggerRef.current
      const panelEl = panelRef.current
      const target = e.target as Node
      if (triggerEl?.contains(target) || panelEl?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const panelEl = open && typeof document !== 'undefined' && (
    <div
      ref={panelRef}
      className={`fs-popover fs-popover--${position}`}
      role="dialog"
      style={{ position: 'fixed', top: coords.top, left: coords.left, zIndex: 9998 }}
    >
      {children}
    </div>
  )

  return (
    <>
      <div
        ref={triggerRef}
        className={className}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </div>
      {typeof document !== 'undefined' && panelEl && createPortal(panelEl, document.body)}
    </>
  )
}

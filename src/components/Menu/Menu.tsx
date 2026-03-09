import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export type MenuItem = {
  label: string
  onClick: () => void
  disabled?: boolean
  icon?: ReactNode
}

type Props = {
  trigger: ReactNode
  items: MenuItem[]
  className?: string
}

/**
 * Trigger button that opens a dropdown list of menu items. Uses popover-style positioning.
 */
export function Menu({ trigger, items, className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  function updatePosition() {
    const triggerEl = triggerRef.current
    const panelEl = panelRef.current
    if (!triggerEl || !panelEl) return
    const rect = triggerEl.getBoundingClientRect()
    const panelRect = panelEl.getBoundingClientRect()
    let top = rect.bottom + 4
    let left = rect.left
    if (left + panelRect.width > window.innerWidth) left = window.innerWidth - panelRect.width - 8
    if (left < 8) left = 8
    if (top + panelRect.height > window.innerHeight) top = rect.top - panelRect.height - 4
    setCoords({ top, left })
  }

  useEffect(() => {
    if (!open) return
    const t = setTimeout(updatePosition, 0)
    return () => clearTimeout(t)
  }, [open, items.length])

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
      className="fs-menu-panel"
      role="menu"
      style={{ position: 'fixed', top: coords.top, left: coords.left, zIndex: 9998 }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          role="menuitem"
          className={`fs-menu-item ${item.disabled ? 'fs-menu-item--disabled' : ''}`}
          onClick={() => {
            if (!item.disabled) {
              item.onClick()
              setOpen(false)
            }
          }}
          disabled={item.disabled}
        >
          {item.icon != null && <span className="fs-menu-item-icon" aria-hidden>{item.icon}</span>}
          <span>{item.label}</span>
        </button>
      ))}
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

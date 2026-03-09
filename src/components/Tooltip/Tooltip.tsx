import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

type Props = {
  content: string
  children: ReactNode
  position?: TooltipPosition
  className?: string
}

/**
 * Wraps a trigger element and shows a tooltip on hover/focus. Uses a portal for the tooltip content.
 */
export function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
}: Props) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  function updatePosition() {
    const trigger = triggerRef.current
    const tooltip = tooltipRef.current
    if (!trigger || !tooltip || !visible) return
    const rect = trigger.getBoundingClientRect()
    const tipRect = tooltip.getBoundingClientRect()
    const gap = 8
    let top = 0
    let left = rect.left + rect.width / 2 - tipRect.width / 2
    switch (position) {
      case 'top':
        top = rect.top - tipRect.height - gap
        break
      case 'bottom':
        top = rect.bottom + gap
        break
      case 'left':
        top = rect.top + rect.height / 2 - tipRect.height / 2
        left = rect.left - tipRect.width - gap
        break
      case 'right':
        top = rect.top + rect.height / 2 - tipRect.height / 2
        left = rect.right + gap
        break
    }
    setCoords({ top, left })
  }

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(updatePosition, 0)
    return () => clearTimeout(t)
  }, [visible, position, content])

  function show() {
    setVisible(true)
  }
  function hide() {
    setVisible(false)
  }

  const tooltipEl = visible && typeof document !== 'undefined' && (
    <div
      ref={tooltipRef}
      className={`fs-tooltip fs-tooltip--${position}`}
      role="tooltip"
      style={{ position: 'fixed', top: coords.top, left: coords.left, zIndex: 9999 }}
    >
      {content}
    </div>
  )

  return (
    <>
      <div
        ref={triggerRef}
        className={className}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </div>
      {typeof document !== 'undefined' && tooltipEl && createPortal(tooltipEl, document.body)}
    </>
  )
}

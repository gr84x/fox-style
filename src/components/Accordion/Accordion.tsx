import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

type AccordionContextValue = {
  openValues: Set<string>
  toggle: (value: string) => void
  allowMultiple: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

type AccordionProps = {
  children: ReactNode
  allowMultiple?: boolean
  className?: string
}

/**
 * Accordion container. Pass allowMultiple to allow more than one item open.
 */
export function Accordion({
  children,
  allowMultiple = false,
  className = '',
}: AccordionProps) {
  const [openValues, setOpenValues] = useState<Set<string>>(new Set())

  function toggle(value: string) {
    setOpenValues((prev) => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        if (!allowMultiple) next.clear()
        next.add(value)
      }
      return next
    })
  }

  return (
    <AccordionContext.Provider value={{ openValues, toggle, allowMultiple }}>
      <div className={`fs-accordion ${className}`.trim()}>{children}</div>
    </AccordionContext.Provider>
  )
}

type AccordionItemProps = {
  value: string
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

/**
 * Single accordion item. Use defaultOpen for initial open state (uncontrolled is not fully supported; prefer controlled via Accordion).
 */
export function AccordionItem({
  value,
  title,
  children,
  defaultOpen = false,
  className = '',
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('AccordionItem must be used within Accordion')

  const isOpen = ctx.openValues.has(value)

  return (
    <div className={`fs-accordion-item ${className}`.trim()}>
      <button
        type="button"
        className={`fs-accordion-trigger ${isOpen ? 'fs-accordion-trigger--open' : ''}`}
        onClick={() => ctx.toggle(value)}
        aria-expanded={isOpen}
        aria-controls={`fs-accordion-panel-${value}`}
        id={`fs-accordion-trigger-${value}`}
      >
        {title}
        <span className="fs-accordion-chevron" aria-hidden>▼</span>
      </button>
      <div
        id={`fs-accordion-panel-${value}`}
        className={`fs-accordion-panel ${isOpen ? 'fs-accordion-panel--open' : ''}`}
        role="region"
        aria-labelledby={`fs-accordion-trigger-${value}`}
        hidden={!isOpen}
      >
        <div className="fs-accordion-content">{children}</div>
      </div>
    </div>
  )
}

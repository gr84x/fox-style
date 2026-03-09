import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

type TabsContextValue = {
  value: string
  onChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

type TabsProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  children: ReactNode
  className?: string
}

/**
 * Tabs container. Provides value/onChange to TabList and TabPanel. Uncontrolled if defaultValue is used.
 */
export function Tabs({
  value: controlledValue,
  defaultValue,
  onChange,
  children,
  className = '',
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const setValue = (v: string) => {
    if (!isControlled) setInternalValue(v)
    onChange?.(v)
  }

  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={`fs-tabs ${className}`.trim()}>{children}</div>
    </TabsContext.Provider>
  )
}

type TabListProps = {
  children: ReactNode
  className?: string
}

/**
 * Tab list (tab bar). Uses same visual as SegmentedControl (fs-segmented).
 */
export function TabList({ children, className = '' }: TabListProps) {
  return (
    <div className={`fs-segmented fs-tabs-list ${className}`.trim()} role="tablist">
      {children}
    </div>
  )
}

type TabProps = {
  value: string
  children: ReactNode
  className?: string
}

/**
 * Single tab button. Must be used inside TabList.
 */
export function Tab({ value, children, className = '' }: TabProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tab must be used within Tabs')
  const isSelected = ctx.value === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={`fs-segmented-btn ${isSelected ? 'fs-segmented-btn--active' : ''} ${className}`.trim()}
      onClick={() => ctx.onChange(value)}
    >
      {children}
    </button>
  )
}

type TabPanelProps = {
  value: string
  children: ReactNode
  className?: string
}

/**
 * Panel content for a tab. Rendered when its value matches the selected tab.
 */
export function TabPanel({ value, children, className = '' }: TabPanelProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabPanel must be used within Tabs')
  const isSelected = ctx.value === value

  if (!isSelected) return null

  return (
    <div className={`fs-tabs-panel ${className}`.trim()} role="tabpanel">
      {children}
    </div>
  )
}

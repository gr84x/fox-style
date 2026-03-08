import { useState } from 'react'

export type NavItem = {
  id: string
  label: string
  icon: React.ReactNode
}

type Props = {
  items: NavItem[]
  activeId?: string
  onNavigate?: (id: string) => void
  'aria-label'?: string
}

export function NavTray({
  items,
  activeId,
  onNavigate,
  'aria-label': ariaLabel = 'Main navigation',
}: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <nav className="fs-nav-tray" aria-label={ariaLabel}>
      <div className="fs-nav-tray-items">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`fs-nav-tray-btn${item.id === activeId ? ' fs-nav-tray-btn--active' : ''}`}
            onClick={() => onNavigate?.(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={item.label}
            aria-current={item.id === activeId ? 'page' : undefined}
            title={item.label}
          >
            {item.icon}
            {hoveredId === item.id && (
              <span className="fs-nav-tray-tooltip">{item.label}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

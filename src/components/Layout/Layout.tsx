import type { ReactNode } from 'react'
import { NavTray } from '../NavTray'
import type { NavItem } from '../NavTray'

type Props = {
  /** Left sidebar content (e.g. task list). */
  sidebar: ReactNode
  /** Main content area. */
  children: ReactNode
  /** When true (desktop) sidebar is visible; when false (mobile) main is visible. Toggle via your own state. */
  showSidebar: boolean
  /** Optional nav tray; when provided, tray is rendered on the far left. */
  navItems?: NavItem[]
  /** Active nav item id when using navItems. */
  activeNavId?: string
  /** Called when a nav item is clicked. */
  onNavigate?: (id: string) => void
  className?: string
}

export function Layout({
  sidebar,
  children,
  showSidebar,
  navItems,
  activeNavId,
  onNavigate,
  className = '',
}: Props) {
  return (
    <div className={`fs-app-shell ${className}`.trim()}>
      {navItems && navItems.length > 0 && (
        <NavTray
          items={navItems}
          activeId={activeNavId}
          onNavigate={onNavigate}
        />
      )}
      <div className={`fs-app-sidebar ${showSidebar ? 'fs-app-sidebar--visible' : ''}`}>
        {sidebar}
      </div>
      <div className={`fs-app-main ${showSidebar ? '' : 'fs-app-main--visible'}`}>
        {children}
      </div>
    </div>
  )
}

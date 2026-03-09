import type { ReactNode } from 'react'
import { NavTray } from '../NavTray'
import type { NavItem } from '../NavTray'

type Props = {
  /** Left sidebar content (e.g. task list). Omit for main-only layout. */
  sidebar?: ReactNode
  /** Main content area. */
  children: ReactNode
  /** When true (desktop) sidebar is visible; when false (mobile) main is visible. Only used when sidebar is provided. */
  showSidebar?: boolean
  /** Optional nav tray; when provided, tray is rendered on the far left unless showNavTray is false. */
  navItems?: NavItem[]
  /** When false, do not render the nav tray even if navItems is provided. Default true when navItems present. */
  showNavTray?: boolean
  /** Active nav item id when using navItems. */
  activeNavId?: string
  /** Called when a nav item is clicked. */
  onNavigate?: (id: string) => void
  className?: string
}

export function Layout({
  sidebar,
  children,
  showSidebar = true,
  navItems,
  showNavTray = true,
  activeNavId,
  onNavigate,
  className = '',
}: Props) {
  const hasTray = Boolean(navItems && navItems.length > 0 && showNavTray)
  const hasSidebar = sidebar != null

  return (
    <div className={`fs-app-shell ${className}`.trim()}>
      {hasTray && (
        <NavTray
          items={navItems!}
          activeId={activeNavId}
          onNavigate={onNavigate!}
        />
      )}
      {hasSidebar && (
        <div className={`fs-app-sidebar ${showSidebar ? 'fs-app-sidebar--visible' : ''}`}>
          {sidebar}
        </div>
      )}
      <div className={`fs-app-main ${!hasSidebar || showSidebar ? 'fs-app-main--visible' : ''}`}>
        {children}
      </div>
    </div>
  )
}

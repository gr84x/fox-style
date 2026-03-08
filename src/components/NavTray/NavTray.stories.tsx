import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NavTray } from './NavTray'
import type { NavItem } from './NavTray'

/** Example icon: monitor/screen (24×24). Use currentColor so it inherits text color. */
const IconMonitor = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

/** Example icon: document/file. */
const IconDocument = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
)

/** Example icon: calendar. */
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

/** Example icon: chart/analytics. */
const IconChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

/** Example icon: settings/gear. */
const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08Z" />
  </svg>
)

const defaultItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <IconMonitor /> },
  { id: 'content', label: 'Content', icon: <IconDocument /> },
  { id: 'settings', label: 'Settings', icon: <IconSettings /> },
]

/** Example items with distinct icons for each nav entry. */
const itemsWithIcons: NavItem[] = [
  { id: 'orchestrator', label: 'Orchestrator', icon: <IconMonitor /> },
  { id: 'content', label: 'Content', icon: <IconDocument /> },
  { id: 'calendar', label: 'Calendar', icon: <IconCalendar /> },
  { id: 'analytics', label: 'Analytics', icon: <IconChart /> },
  { id: 'settings', label: 'Settings', icon: <IconSettings /> },
]

const meta: Meta<typeof NavTray> = {
  title: 'Components/NavTray',
  component: NavTray,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'NavTray accepts an `items` array. Each item has `id`, `label`, and `icon`. ' +
          '**Icon options:** There is no built-in icon set. Pass any `ReactNode` as `icon` (e.g. inline SVG, or a component that renders an icon). ' +
          'Use `currentColor` in SVGs so icons inherit the tray text color. Recommended size: 20×20. ' +
          'The "Icon options" story below shows example inline SVGs you can copy or replace with your own icon library.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof NavTray>

export const Default: Story = {
  render: function Render() {
    const [activeId, setActiveId] = useState('home')
    return (
      <div style={{ height: 320, display: 'flex' }}>
        <NavTray items={defaultItems} activeId={activeId} onNavigate={setActiveId} />
        <div style={{ flex: 1, padding: 16, background: 'var(--fs-bg-primary)' }}>
          Active: {activeId}
        </div>
      </div>
    )
  },
}

/** Example nav with a different icon per item. Icons are any ReactNode (inline SVG here). */
export const IconOptions: Story = {
  render: function Render() {
    const [activeId, setActiveId] = useState('orchestrator')
    return (
      <div style={{ height: 320, display: 'flex' }}>
        <NavTray items={itemsWithIcons} activeId={activeId} onNavigate={setActiveId} />
        <div style={{ flex: 1, padding: 16, background: 'var(--fs-bg-primary)', fontFamily: 'var(--fs-font-sans)' }}>
          Active: {activeId}. Hover items to see tooltips.
        </div>
      </div>
    )
  },
}

export const NoSelection: Story = {
  args: { items: defaultItems },
}

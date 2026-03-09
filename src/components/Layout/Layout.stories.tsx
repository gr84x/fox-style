import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'
import type { NavItem } from '../NavTray'

const navIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const navItems: NavItem[] = [
  { id: 'orchestrator', label: 'Orchestrator', icon: navIcon },
  { id: 'content', label: 'Content', icon: navIcon },
  { id: 'settings', label: 'Settings', icon: navIcon },
]

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof Layout>

export const WithNavAndSidebar: Story = {
  render: function Render() {
    const [showSidebar, setShowSidebar] = useState(true)
    const [activeNav, setActiveNav] = useState('orchestrator')
    return (
      <Layout
        showSidebar={showSidebar}
        navItems={navItems}
        activeNavId={activeNav}
        onNavigate={setActiveNav}
        sidebar={
          <div style={{ padding: 16 }}>
            <p style={{ marginBottom: 8 }}>Sidebar content</p>
            <button
              type="button"
              onClick={() => setShowSidebar(!showSidebar)}
              style={{ fontSize: 12 }}
            >
              Toggle sidebar (mobile sim)
            </button>
          </div>
        }
      >
        <div style={{ padding: 24, flex: 1 }}>
          Main content. Nav: {activeNav}.
        </div>
      </Layout>
    )
  },
}

export const SidebarOnly: Story = {
  render: function Render() {
    return (
      <Layout
        showSidebar={true}
        sidebar={<div style={{ padding: 16 }}>Sidebar only (no nav tray)</div>}
      >
        <div style={{ padding: 24 }}>Main area</div>
      </Layout>
    )
  },
}

export const MainOnly: Story = {
  render: function Render() {
    return (
      <Layout>
        <div style={{ padding: 24 }}>Main content only. No tray, no sidebar.</div>
      </Layout>
    )
  },
}

export const TrayAndMain: Story = {
  render: function Render() {
    const [activeNav, setActiveNav] = useState('orchestrator')
    return (
      <Layout
        navItems={navItems}
        activeNavId={activeNav}
        onNavigate={setActiveNav}
        showNavTray={true}
      >
        <div style={{ padding: 24 }}>Tray + main. No sidebar. Nav: {activeNav}.</div>
      </Layout>
    )
  },
}

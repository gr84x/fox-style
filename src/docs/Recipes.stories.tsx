import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Layout } from '../components/Layout'
import { ModeBanner } from '../components/ModeBanner'
import { NavTray } from '../components/NavTray'
import { ProgressBar } from '../components/ProgressBar'
import { SearchInput } from '../components/SearchInput'
import { SegmentedControl } from '../components/SegmentedControl'
import { StatusDot } from '../components/StatusDot'
import type { NavItem } from '../components/NavTray'

const navIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: navIcon },
  { id: 'settings', label: 'Settings', icon: navIcon },
]

const meta: Meta = {
  title: 'Documentation/Recipes',
  parameters: { layout: 'padded' },
}
export default meta

/** Header bar: mode pill + title + badge + primary action. */
export const HeaderBar: StoryObj = {
  render: () => (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 20px',
        background: 'var(--fs-bg-surface)',
        borderBottom: '1px solid var(--fs-border-subtle)',
      }}
    >
      <ModeBanner visible label="Demo" />
      <h1 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, flex: 1 }}>My App</h1>
      <Badge variant="accent">Active</Badge>
      <Button variant="primary" onClick={() => {}}>Save</Button>
    </header>
  ),
}

/** Filter row: segmented status + search + clear. */
export const FilterRow: StoryObj = {
  render: function FilterRowRecipe() {
    const [status, setStatus] = useState('all')
    const [search, setSearch] = useState('')
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <SegmentedControl
          options={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'done', label: 'Done' },
          ]}
          value={status}
          onChange={(v) => setStatus(v)}
        />
        <div style={{ width: 280 }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search…" />
        </div>
        <Button variant="ghost" onClick={() => { setStatus('all'); setSearch(''); }}>Clear</Button>
      </div>
    )
  },
}

/** Task row: card with status dot, title, badge, and meta. */
export const TaskRow: StoryObj = {
  render: () => (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <StatusDot variant="accent" pulse />
        <span className="fs-card-title" style={{ flex: 1, margin: 0 }}>Implement login flow</span>
        <Badge variant="warning">Pending</Badge>
      </div>
      <p className="fs-card-body" style={{ margin: 0, fontSize: '0.8rem' }}>
        T-123 · 2 min ago
      </p>
    </Card>
  ),
}

/** App shell: layout with nav tray, sidebar (search + filters + list), and main content with progress. */
export const AppShell: StoryObj = {
  parameters: { layout: 'fullscreen' },
  render: function AppShellRecipe() {
    const [activeNav, setActiveNav] = useState('home')
    const [showSidebar, setShowSidebar] = useState(true)
    return (
      <Layout
        showSidebar={showSidebar}
        navItems={navItems}
        activeNavId={activeNav}
        onNavigate={setActiveNav}
        sidebar={
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SearchInput value="" onChange={() => {}} placeholder="Search tasks…" />
            <SegmentedControl
              options={[{ value: 'a', label: 'All' }, { value: 'b', label: 'Active' }]}
              value="a"
              onChange={() => {}}
            />
            <Card padded><span className="fs-card-body">Task list item 1</span></Card>
            <Card padded><span className="fs-card-body">Task list item 2</span></Card>
            <button type="button" onClick={() => setShowSidebar(!showSidebar)} style={{ fontSize: 12 }}>Toggle sidebar</button>
          </div>
        }
      >
        <div style={{ padding: 24 }}>
          <ProgressBar value={60} label="Planning" successAtFull />
          <p style={{ marginTop: 16, color: 'var(--fs-text-secondary)' }}>Main content area.</p>
        </div>
      </Layout>
    )
  },
}

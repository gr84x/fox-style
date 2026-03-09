import { render, screen } from '@testing-library/react'
import { Layout } from '@/components/Layout'

describe('Layout', () => {
  it('renders main content only when no sidebar or navItems', () => {
    render(<Layout>Main content</Layout>)
    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByText('Main content').closest('.fs-app-main')).toBeInTheDocument()
    expect(document.querySelector('.fs-app-sidebar')).not.toBeInTheDocument()
    expect(document.querySelector('.fs-nav-tray')).not.toBeInTheDocument()
  })

  it('renders sidebar when sidebar prop is provided', () => {
    render(<Layout sidebar={<aside>Sidebar</aside>}>Main</Layout>)
    expect(screen.getByText('Sidebar')).toBeInTheDocument()
    expect(document.querySelector('.fs-app-sidebar')).toBeInTheDocument()
  })

  it('applies visible class to sidebar when showSidebar is true', () => {
    render(
      <Layout sidebar={<span>Side</span>} showSidebar>
        Main
      </Layout>
    )
    expect(document.querySelector('.fs-app-sidebar--visible')).toBeInTheDocument()
  })

  it('renders nav tray when navItems is provided', () => {
    const navItems = [
      { id: 'home', label: 'Home', icon: <span>H</span> },
      { id: 'settings', label: 'Settings', icon: <span>S</span> },
    ]
    const onNavigate = vi.fn()
    render(
      <Layout navItems={navItems} onNavigate={onNavigate} activeNavId="home">
        Main
      </Layout>
    )
    expect(document.querySelector('.fs-nav-tray')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
  })

  it('merges custom className on app shell', () => {
    const { container } = render(<Layout className="my-layout">Main</Layout>)
    expect(container.querySelector('.fs-app-shell')).toHaveClass('my-layout')
  })
})

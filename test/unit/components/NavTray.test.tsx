import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavTray } from '@/components/NavTray'

const navItems = [
  { id: 'home', label: 'Home', icon: <span data-testid="icon-home">H</span> },
  { id: 'settings', label: 'Settings', icon: <span data-testid="icon-settings">S</span> },
]

describe('NavTray', () => {
  it('renders nav with items', () => {
    render(<NavTray items={navItems} />)
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
  })

  it('applies active class to button matching activeId', () => {
    render(<NavTray items={navItems} activeId="settings" />)
    const settingsBtn = screen.getByRole('button', { name: 'Settings' })
    expect(settingsBtn).toHaveClass('fs-nav-tray-btn--active')
    expect(settingsBtn).toHaveAttribute('aria-current', 'page')
  })

  it('calls onNavigate with item id when item is clicked', async () => {
    const onNavigate = vi.fn()
    render(<NavTray items={navItems} onNavigate={onNavigate} />)
    await userEvent.click(screen.getByRole('button', { name: 'Home' }))
    expect(onNavigate).toHaveBeenCalledWith('home')
  })

  it('uses custom aria-label when provided', () => {
    render(<NavTray items={navItems} aria-label="App navigation" />)
    expect(screen.getByRole('navigation', { name: 'App navigation' })).toBeInTheDocument()
  })
})

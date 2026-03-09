import { render, screen } from '@testing-library/react'
import { ModeBanner } from '@/components/ModeBanner'

describe('ModeBanner', () => {
  it('renders nothing when visible is false', () => {
    const { container } = render(<ModeBanner visible={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders label with default "Demo" when visible', () => {
    render(<ModeBanner visible />)
    const banner = screen.getByRole('status', { name: 'Demo mode active' })
    expect(banner).toBeInTheDocument()
    expect(banner).toHaveTextContent('Demo')
    expect(banner).toHaveClass('fs-mode-banner')
  })

  it('renders custom label when provided', () => {
    render(<ModeBanner visible label="Beta" />)
    expect(screen.getByRole('status', { name: 'Beta mode active' })).toHaveTextContent('Beta')
  })

  it('merges custom className', () => {
    render(<ModeBanner visible label="Test" className="my-banner" />)
    expect(screen.getByRole('status')).toHaveClass('my-banner')
  })
})

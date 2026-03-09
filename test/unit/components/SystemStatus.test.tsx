import { render, screen } from '@testing-library/react'
import { SystemStatus } from '@/components/SystemStatus'

describe('SystemStatus', () => {
  it('renders message with role status', () => {
    render(<SystemStatus variant="info" message="Processing…" />)
    const status = screen.getByRole('status')
    expect(status).toBeInTheDocument()
    expect(status).toHaveTextContent('Processing…')
    expect(status).toHaveClass('fs-system-status', 'fs-system-info')
  })

  it('applies variant classes for success, warning, error', () => {
    const { rerender } = render(<SystemStatus variant="success" message="Done" />)
    expect(screen.getByRole('status')).toHaveClass('fs-system-success')

    rerender(<SystemStatus variant="warning" message="Caution" />)
    expect(screen.getByRole('status')).toHaveClass('fs-system-warning')

    rerender(<SystemStatus variant="error" message="Failed" />)
    expect(screen.getByRole('status')).toHaveClass('fs-system-error')
  })

  it('renders detail when provided', () => {
    render(
      <SystemStatus variant="error" message="Error" detail="Stack trace here" />
    )
    expect(screen.getByText('Stack trace here')).toBeInTheDocument()
    expect(document.querySelector('.fs-system-status-detail')).toHaveTextContent('Stack trace here')
  })

  it('renders timestamp when provided', () => {
    render(
      <SystemStatus variant="info" message="Saved" timestamp="12:00" />
    )
    expect(screen.getByText('12:00')).toBeInTheDocument()
    expect(document.querySelector('.fs-system-status-time')).toHaveTextContent('12:00')
  })

  it('sets aria-live for error and warning variants', () => {
    const { rerender } = render(<SystemStatus variant="error" message="Err" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')

    rerender(<SystemStatus variant="warning" message="Warn" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  })

  it('merges custom className', () => {
    render(<SystemStatus variant="info" message="X" className="my-status" />)
    expect(screen.getByRole('status')).toHaveClass('my-status')
  })
})

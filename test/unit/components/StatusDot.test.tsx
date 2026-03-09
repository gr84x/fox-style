import { render, screen } from '@testing-library/react'
import { StatusDot } from '@/components/StatusDot'

describe('StatusDot', () => {
  it('renders with default variant and role img', () => {
    render(<StatusDot />)
    const dot = screen.getByRole('img', { name: 'default status' })
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveClass('fs-status-dot', 'fs-status-dot--default')
  })

  it('applies variant classes', () => {
    const { rerender } = render(<StatusDot variant="success" />)
    expect(screen.getByRole('img')).toHaveClass('fs-status-dot--success')

    rerender(<StatusDot variant="warning" />)
    expect(screen.getByRole('img')).toHaveClass('fs-status-dot--warning')

    rerender(<StatusDot variant="danger" />)
    expect(screen.getByRole('img')).toHaveClass('fs-status-dot--danger')

    rerender(<StatusDot variant="accent" />)
    expect(screen.getByRole('img')).toHaveClass('fs-status-dot--accent')
  })

  it('applies pulse class when pulse is true', () => {
    render(<StatusDot pulse />)
    expect(screen.getByRole('img')).toHaveClass('fs-status-dot--pulse')
  })

  it('uses custom aria-label when provided', () => {
    render(<StatusDot aria-label="Connection active" />)
    expect(screen.getByRole('img', { name: 'Connection active' })).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(<StatusDot className="my-dot" />)
    expect(screen.getByRole('img')).toHaveClass('my-dot')
  })
})

import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/Badge'

describe('Badge', () => {
  it('renders children with default variant', () => {
    render(<Badge>New</Badge>)
    const badge = screen.getByText('New')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('fs-badge', 'fs-badge-default')
    expect(badge).toHaveAttribute('role', 'status')
  })

  it('applies success variant class', () => {
    render(<Badge variant="success">Done</Badge>)
    expect(screen.getByRole('status')).toHaveClass('fs-badge-success')
  })

  it('applies warning variant class', () => {
    render(<Badge variant="warning">Pending</Badge>)
    expect(screen.getByRole('status')).toHaveClass('fs-badge-warning')
  })

  it('applies danger variant class', () => {
    render(<Badge variant="danger">Error</Badge>)
    expect(screen.getByRole('status')).toHaveClass('fs-badge-danger')
  })

  it('applies accent variant class', () => {
    render(<Badge variant="accent">Highlight</Badge>)
    expect(screen.getByRole('status')).toHaveClass('fs-badge-accent')
  })

  it('merges custom className', () => {
    render(<Badge className="my-badge">Tag</Badge>)
    expect(screen.getByRole('status')).toHaveClass('my-badge')
  })
})

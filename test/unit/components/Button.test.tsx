import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('renders with default variant and children', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: /click me/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Click me')
    expect(btn).toHaveClass('fs-btn', 'fs-btn-primary')
    expect(btn).toHaveAttribute('type', 'button')
  })

  it('applies secondary variant class when variant is secondary', () => {
    render(<Button variant="secondary">Save</Button>)
    expect(screen.getByRole('button')).toHaveClass('fs-btn-secondary')
  })

  it('applies ghost variant class when variant is ghost', () => {
    render(<Button variant="ghost">Cancel</Button>)
    expect(screen.getByRole('button')).toHaveClass('fs-btn-ghost')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Submit</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Submit
      </Button>
    )
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders with type submit when specified', () => {
    render(
      <Button type="submit">
        Submit
      </Button>
    )
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('merges custom className', () => {
    render(<Button className="custom-class">OK</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('applies aria-label when provided', () => {
    render(<Button aria-label="Close dialog">×</Button>)
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link } from '@/components/Link'

describe('Link', () => {
  it('renders anchor with href and children', () => {
    render(<Link href="/about">About</Link>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
    expect(link).toHaveClass('fs-link')
  })

  it('applies external target and rel when external is true', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders as span with aria-disabled when disabled', () => {
    render(
      <Link href="/page" disabled>
        Disabled link
      </Link>
    )
    const el = screen.getByText('Disabled link')
    expect(el.tagName).toBe('SPAN')
    expect(el).toHaveAttribute('aria-disabled', 'true')
    expect(el).toHaveClass('fs-link--disabled')
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('applies aria-label when provided', () => {
    render(
      <Link href="/go" aria-label="Go to home">
        Home
      </Link>
    )
    expect(screen.getByRole('link', { name: 'Go to home' })).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(
      <Link href="/x" className="custom-link">
        Link
      </Link>
    )
    expect(screen.getByRole('link')).toHaveClass('custom-link')
  })
})

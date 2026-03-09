import { render, screen } from '@testing-library/react'
import { Card } from '@/components/Card'

describe('Card', () => {
  it('renders children with padded class by default', () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText('Card content').closest('.fs-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('fs-card--padded')
  })

  it('omits padded class when padded is false', () => {
    render(<Card padded={false}>Content</Card>)
    const card = screen.getByText('Content').closest('.fs-card')
    expect(card).not.toHaveClass('fs-card--padded')
  })

  it('merges custom className', () => {
    render(<Card className="my-card">Content</Card>)
    expect(screen.getByText('Content').closest('.fs-card')).toHaveClass('my-card')
  })
})

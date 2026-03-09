import { render, screen } from '@testing-library/react'
import { Avatar } from '@/components/Avatar'

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/photo.jpg" alt="User" />)
    const img = screen.getByRole('img', { name: 'User' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/photo.jpg')
    expect(img.closest('.fs-avatar')).toHaveClass('fs-avatar--img', 'fs-avatar--md')
  })

  it('renders initials when initials prop is provided', () => {
    render(<Avatar initials="JD" />)
    const el = screen.getByText('JD')
    expect(el).toBeInTheDocument()
    expect(el.closest('.fs-avatar')).toHaveClass('fs-avatar--initials')
  })

  it('limits initials to two characters', () => {
    render(<Avatar initials="John Doe" />)
    expect(screen.getByText('JO')).toBeInTheDocument()
  })

  it('renders icon when icon prop is provided', () => {
    render(<Avatar icon={<span data-testid="icon">★</span>} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByTestId('icon').closest('.fs-avatar')).toHaveClass('fs-avatar--icon')
  })

  it('renders placeholder when no src, initials, or icon', () => {
    const { container } = render(<Avatar />)
    const avatar = container.querySelector('.fs-avatar--placeholder')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('aria-hidden')
  })

  it('applies size class sm, md, lg', () => {
    const { rerender } = render(<Avatar initials="A" size="sm" />)
    expect(screen.getByText('A').closest('.fs-avatar')).toHaveClass('fs-avatar--sm')

    rerender(<Avatar initials="B" size="lg" />)
    expect(screen.getByText('B').closest('.fs-avatar')).toHaveClass('fs-avatar--lg')
  })

  it('merges custom className', () => {
    render(<Avatar initials="X" className="custom" />)
    expect(screen.getByText('X').closest('.fs-avatar')).toHaveClass('custom')
  })
})

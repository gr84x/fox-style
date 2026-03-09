import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from '@/components/Breadcrumbs'

describe('Breadcrumbs', () => {
  it('returns null when items is empty', () => {
    const { container } = render(<Breadcrumbs items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders single item as current page', () => {
    render(<Breadcrumbs items={[{ label: 'Home' }]} />)
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(nav).toBeInTheDocument()
    const current = screen.getByText('Home')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(current).toHaveClass('fs-breadcrumbs-current')
  })

  it('renders multiple items with links for non-last items', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Detail' },
        ]}
      />
    )
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products')
    expect(screen.getByText('Detail')).toHaveAttribute('aria-current', 'page')
  })

  it('uses custom separator', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'A', href: '/a' },
          { label: 'B' },
        ]}
        separator="|"
      />
    )
    const sep = document.querySelector('.fs-breadcrumbs-sep')
    expect(sep).toHaveTextContent('|')
  })

  it('merges custom className', () => {
    render(<Breadcrumbs items={[{ label: 'X' }]} className="my-breadcrumbs" />)
    expect(screen.getByRole('navigation').closest('.fs-breadcrumbs')).toHaveClass('my-breadcrumbs')
  })
})

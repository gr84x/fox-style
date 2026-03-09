import { render, screen } from '@testing-library/react'
import { Skeleton } from '@/components/Skeleton'

describe('Skeleton', () => {
  it('renders single rect variant by default', () => {
    const { container } = render(<Skeleton />)
    const el = container.querySelector('.fs-skeleton.fs-skeleton--rect')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('aria-hidden')
  })

  it('applies circle variant class', () => {
    const { container } = render(<Skeleton variant="circle" />)
    expect(container.querySelector('.fs-skeleton')).toHaveClass('fs-skeleton--circle')
  })

  it('applies text variant class', () => {
    const { container } = render(<Skeleton variant="text" />)
    expect(container.querySelector('.fs-skeleton')).toHaveClass('fs-skeleton--text')
  })

  it('applies width and height as inline style when provided as number', () => {
    const { container } = render(<Skeleton width={100} height={20} />)
    const el = container.querySelector('.fs-skeleton') as HTMLElement
    expect(el.style.width).toBe('100px')
    expect(el.style.height).toBe('20px')
  })

  it('applies width and height as string when provided', () => {
    const { container } = render(<Skeleton width="50%" height="1em" />)
    const el = container.querySelector('.fs-skeleton') as HTMLElement
    expect(el.style.width).toBe('50%')
    expect(el.style.height).toBe('1em')
  })

  it('renders count number of skeletons when count > 1', () => {
    const { container } = render(<Skeleton count={3} />)
    const group = container.querySelector('.fs-skeleton-group')
    expect(group).toBeInTheDocument()
    const skeletons = container.querySelectorAll('.fs-skeleton')
    expect(skeletons).toHaveLength(3)
  })

  it('merges custom className', () => {
    const { container } = render(<Skeleton className="my-skeleton" />)
    expect(container.querySelector('.fs-skeleton')).toHaveClass('my-skeleton')
  })
})

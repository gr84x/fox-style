import { render, screen } from '@testing-library/react'
import { Loader } from '@/components/Loader'

describe('Loader', () => {
  it('renders with status role and default aria-label', () => {
    render(<Loader />)
    const loader = screen.getByRole('status', { name: 'Loading' })
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveClass('fs-loader')
  })

  it('renders label when provided', () => {
    render(<Loader label="Please wait" />)
    expect(screen.getByRole('status', { name: 'Please wait' })).toBeInTheDocument()
    expect(screen.getByText('Please wait')).toBeInTheDocument()
  })

  it('applies inline class when inline is true', () => {
    render(<Loader inline />)
    expect(screen.getByRole('status')).toHaveClass('fs-loader--inline')
  })

  it('renders grid with row layout when layout is row', () => {
    const { container } = render(<Loader layout="row" />)
    const grid = container.querySelector('.fs-loader-grid--row')
    expect(grid).toBeInTheDocument()
  })

  it('renders nine cells', () => {
    const { container } = render(<Loader />)
    const cells = container.querySelectorAll('.fs-loader-cell')
    expect(cells).toHaveLength(9)
  })
})

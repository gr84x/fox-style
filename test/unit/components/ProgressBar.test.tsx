import { render, screen } from '@testing-library/react'
import { ProgressBar } from '@/components/ProgressBar'

describe('ProgressBar', () => {
  it('renders with value and progressbar role', () => {
    render(<ProgressBar value={40} />)
    const bar = screen.getByRole('progressbar', { name: 'Progress' })
    expect(bar).toBeInTheDocument()
    expect(bar).toHaveAttribute('aria-valuenow', '40')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
    const wrapper = bar.closest('.fs-progress-bar')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('fs-progress-bar')
  })

  it('clamps value between 0 and 100', () => {
    render(<ProgressBar value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('renders label when provided', () => {
    render(<ProgressBar value={60} label="Planning" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Planning')
    expect(screen.getByText('Planning')).toBeInTheDocument()
  })

  it('applies success class when value is 100 and successAtFull is true', () => {
    render(<ProgressBar value={100} successAtFull />)
    expect(screen.getByRole('progressbar').closest('.fs-progress-bar')).toHaveClass('fs-progress-bar--success')
  })

  it('merges custom className', () => {
    render(<ProgressBar value={0} className="my-progress" />)
    expect(screen.getByRole('progressbar').closest('.fs-progress-bar')).toHaveClass('my-progress')
  })
})

import { render, screen } from '@testing-library/react'
import { Divider, PhaseDivider } from '@/components/Divider'

describe('Divider', () => {
  it('renders horizontal line without label when label is omitted', () => {
    const { container } = render(<Divider />)
    const hr = container.querySelector('hr.fs-divider-line')
    expect(hr).toBeInTheDocument()
    expect(hr).toHaveAttribute('role', 'separator')
  })

  it('renders label and lines when label is provided with default center alignment', () => {
    render(<Divider label="Phase 1" />)
    expect(screen.getByText('Phase 1')).toBeInTheDocument()
    const wrapper = screen.getByText('Phase 1').closest('[role="separator"]')
    expect(wrapper).toHaveAttribute('aria-label', 'Phase 1')
    expect(wrapper).toHaveClass('fs-divider--label-center')
  })

  it('applies labelAlign left class and renders single line on right', () => {
    render(<Divider label="Left" labelAlign="left" />)
    const wrapper = screen.getByText('Left').closest('[role="separator"]')
    expect(wrapper).toHaveClass('fs-divider--label-left')
  })

  it('renders vertical separator when orientation is vertical', () => {
    const { container } = render(<Divider orientation="vertical" />)
    const span = container.querySelector('span[aria-orientation="vertical"]')
    expect(span).toBeInTheDocument()
    expect(span).toHaveClass('fs-divider--vertical')
  })

  it('applies spacing class when spacing is provided', () => {
    const { container } = render(<Divider spacing="md" />)
    const el = container.querySelector('.fs-divider--spacing-md')
    expect(el).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(<Divider label="X" className="my-divider" />)
    expect(screen.getByText('X').closest('[role="separator"]')).toHaveClass('my-divider')
  })
})

describe('PhaseDivider', () => {
  it('renders Divider with label and center alignment', () => {
    render(<PhaseDivider label="Phase 2" />)
    expect(screen.getByText('Phase 2')).toBeInTheDocument()
    expect(screen.getByText('Phase 2').closest('[role="separator"]')).toHaveClass('fs-divider--label-center')
  })

  it('merges custom className', () => {
    render(<PhaseDivider label="Step" className="phase" />)
    expect(screen.getByText('Step').closest('[role="separator"]')).toHaveClass('phase')
  })
})

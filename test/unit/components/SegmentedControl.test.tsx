import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SegmentedControl } from '@/components/SegmentedControl'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

describe('SegmentedControl', () => {
  it('renders options with selected value', () => {
    const onChange = vi.fn()
    render(<SegmentedControl options={options} value="a" onChange={onChange} />)
    const tablist = screen.getByRole('tablist', { name: 'Segmented control' })
    expect(tablist).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Option A', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Option B', selected: false })).toBeInTheDocument()
  })

  it('calls onChange with value when different option is clicked', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl options={options} value="a" onChange={onChange} />)
    await userEvent.click(screen.getByRole('tab', { name: 'Option B' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('uses custom aria-label when provided', () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl options={options} value="a" onChange={onChange} aria-label="View mode" />
    )
    expect(screen.getByRole('tablist', { name: 'View mode' })).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(
      <SegmentedControl options={options} value="a" onChange={vi.fn()} className="my-segmented" />
    )
    expect(container.querySelector('.fs-segmented')).toHaveClass('my-segmented')
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '@/components/Checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default when checked is false', () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} />)
    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox' })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  it('renders checked when checked is true', () => {
    const onChange = vi.fn()
    render(<Checkbox checked onChange={onChange} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onChange with true when user checks', async () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when user unchecks', async () => {
    const onChange = vi.fn()
    render(<Checkbox checked onChange={onChange} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('renders label when provided', () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Accept terms')
  })

  it('applies disabled class and disables input', () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} disabled label="Disabled" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
    expect(checkbox.closest('.fs-checkbox')).toHaveClass('fs-checkbox--disabled')
  })

  it('sets aria-checked to mixed when indeterminate', () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} indeterminate />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed')
  })

  it('merges custom className', () => {
    const onChange = vi.fn()
    render(<Checkbox checked={false} onChange={onChange} className="my-checkbox" />)
    expect(screen.getByRole('checkbox').closest('.fs-checkbox')).toHaveClass('my-checkbox')
  })
})

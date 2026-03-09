import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '@/components/Select'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

describe('Select', () => {
  it('renders options and selected value', () => {
    const onChange = vi.fn()
    render(<Select value="a" onChange={onChange} options={options} />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('a')
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument()
  })

  it('calls onChange with selected value when user selects option', async () => {
    const onChange = vi.fn()
    render(<Select value="a" onChange={onChange} options={options} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'b')
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('renders placeholder option when placeholder provided', () => {
    const onChange = vi.fn()
    render(<Select value="" onChange={onChange} options={options} placeholder="Choose…" />)
    expect(screen.getByRole('option', { name: 'Choose…' })).toBeInTheDocument()
  })

  it('applies disabled', () => {
    const onChange = vi.fn()
    render(<Select value="a" onChange={onChange} options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('applies aria-label when provided', () => {
    const onChange = vi.fn()
    render(<Select value="a" onChange={onChange} options={options} aria-label="Choose one" />)
    expect(screen.getByRole('combobox', { name: 'Choose one' })).toBeInTheDocument()
  })

  it('merges custom className on wrapper', () => {
    const onChange = vi.fn()
    const { container } = render(<Select value="a" onChange={onChange} options={options} className="my-select" />)
    expect(container.querySelector('.fs-select-wrap')).toHaveClass('my-select')
  })
})

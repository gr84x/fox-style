import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/Input'

describe('Input', () => {
  it('renders with value and type text by default', () => {
    const onChange = vi.fn()
    render(<Input value="" onChange={onChange} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveValue('')
  })

  it('displays controlled value', () => {
    const onChange = vi.fn()
    render(<Input value="hello" onChange={onChange} />)
    expect(screen.getByRole('textbox')).toHaveValue('hello')
  })

  it('calls onChange with new value when user types', async () => {
    const onChange = vi.fn()
    render(<Input value="" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('applies disabled and does not focus when disabled', () => {
    const onChange = vi.fn()
    render(<Input value="" onChange={onChange} disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('applies error class and aria-invalid when error is true', () => {
    const onChange = vi.fn()
    render(<Input value="" onChange={onChange} error />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('fs-input--error')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders placeholder and passes id', () => {
    const onChange = vi.fn()
    render(<Input value="" onChange={onChange} placeholder="Enter name" id="name-field" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter name')
    expect(input).toHaveAttribute('id', 'name-field')
  })

  it('applies aria-label when provided', () => {
    const onChange = vi.fn()
    render(<Input value="" onChange={onChange} aria-label="Username" />)
    expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const onChange = vi.fn()
    render(<Input value="" onChange={onChange} className="my-input" />)
    expect(screen.getByRole('textbox')).toHaveClass('my-input')
  })
})

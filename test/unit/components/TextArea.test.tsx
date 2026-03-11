import { render, screen, fireEvent } from '@testing-library/react'
import { TextArea } from '@/components/TextArea'

describe('TextArea', () => {
  it('renders textarea with value and placeholder', () => {
    const onChange = vi.fn()
    render(
      <TextArea value="hello" onChange={onChange} placeholder="Type here…" />
    )
    const textarea = screen.getByPlaceholderText('Type here…')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveValue('hello')
  })

  it('calls onChange when value changes', () => {
    const onChange = vi.fn()
    render(<TextArea value="" onChange={onChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'new' } })
    expect(onChange).toHaveBeenCalledWith('new')
  })

  it('applies error class and aria-invalid when error', () => {
    const onChange = vi.fn()
    render(<TextArea value="" onChange={onChange} error />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('fs-textarea--error')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies disabled', () => {
    render(<TextArea value="x" onChange={() => {}} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('uses custom aria-label', () => {
    render(<TextArea value="" onChange={() => {}} aria-label="Comment" />)
    expect(screen.getByRole('textbox', { name: 'Comment' })).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(
      <TextArea value="" onChange={() => {}} className="my-ta" />
    )
    const textarea = container.querySelector('.fs-textarea')
    expect(textarea).toHaveClass('my-ta')
  })

  it('respects rows prop', () => {
    render(<TextArea value="" onChange={() => {}} rows={8} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8')
  })
})

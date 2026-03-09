import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, Radio } from '@/components/RadioGroup'

describe('RadioGroup', () => {
  it('renders fieldset with radios and selected value', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup name="choice" value="a" onChange={onChange}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    )
    const fieldset = screen.getByRole('group')
    expect(fieldset).toBeInTheDocument()
    const radioA = screen.getByRole('radio', { name: 'Option A' })
    const radioB = screen.getByRole('radio', { name: 'Option B' })
    expect(radioA).toBeChecked()
    expect(radioB).not.toBeChecked()
  })

  it('calls onChange with value when user selects different radio', async () => {
    const onChange = vi.fn()
    render(
      <RadioGroup name="choice" value="a" onChange={onChange}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    )
    await userEvent.click(screen.getByRole('radio', { name: 'Option B' }))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('applies disabled on Radio when specified', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup name="choice" value="a" onChange={onChange}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" disabled />
      </RadioGroup>
    )
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeDisabled()
  })

  it('applies aria-label on fieldset when provided', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup name="choice" value="a" onChange={onChange} aria-label="Choose one">
        <Radio value="a" label="A" />
      </RadioGroup>
    )
    expect(screen.getByRole('group', { name: 'Choose one' })).toBeInTheDocument()
  })

  it('merges custom className on fieldset', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup name="x" value="a" onChange={onChange} className="my-group">
        <Radio value="a" label="A" />
      </RadioGroup>
    )
    expect(screen.getByRole('group').closest('.fs-radio-group')).toHaveClass('my-group')
  })
})

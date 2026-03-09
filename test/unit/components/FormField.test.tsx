import { render, screen } from '@testing-library/react'
import { FormField } from '@/components/FormField'

describe('FormField', () => {
  it('renders label and children', () => {
    render(
      <FormField label="Email">
        <input type="email" id="email" />
      </FormField>
    )
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('associates label with control via htmlFor', () => {
    render(
      <FormField label="Name" htmlFor="name-id">
        <input type="text" id="name-id" />
      </FormField>
    )
    const label = screen.getByText('Name').closest('label')
    expect(label).toHaveAttribute('for', 'name-id')
  })

  it('renders hint when provided and no error', () => {
    render(
      <FormField label="Field" hint="Optional helper text">
        <input type="text" />
      </FormField>
    )
    expect(screen.getByText('Optional helper text')).toBeInTheDocument()
    expect(screen.getByText('Optional helper text')).toHaveClass('fs-form-field-hint')
  })

  it('renders error with role alert when error is provided', () => {
    render(
      <FormField label="Field" error="This field is required">
        <input type="text" />
      </FormField>
    )
    const error = screen.getByRole('alert')
    expect(error).toHaveTextContent('This field is required')
    expect(error).toHaveClass('fs-form-field-error')
  })

  it('does not render hint when error is present', () => {
    render(
      <FormField label="Field" hint="Hint" error="Error">
        <input type="text" />
      </FormField>
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Error')
    expect(screen.queryByText('Hint')).not.toBeInTheDocument()
  })

  it('shows required indicator when required is true', () => {
    render(
      <FormField label="Required field" required>
        <input type="text" />
      </FormField>
    )
    const requiredSpan = document.querySelector('.fs-form-field-required')
    expect(requiredSpan).toBeInTheDocument()
    expect(requiredSpan).toHaveAttribute('aria-hidden')
  })

  it('merges custom className', () => {
    const { container } = render(
      <FormField label="X" className="my-field">
        <input type="text" />
      </FormField>
    )
    expect(container.querySelector('.fs-form-field')).toHaveClass('my-field')
  })
})

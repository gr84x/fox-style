import type { ChangeEvent } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  placeholder?: string
  disabled?: boolean
  /** When true, applies error border styling and aria-invalid. */
  error?: boolean
  className?: string
  id?: string
  'aria-label'?: string
}

/**
 * Single-line text input. Reuses elevated bg and border styling from the design system.
 */
export function Input({
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
  error = false,
  className = '',
  id,
  'aria-label': ariaLabel,
}: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }

  return (
    <input
      type={type}
      id={id}
      className={`fs-input ${error ? 'fs-input--error' : ''} ${className}`.trim()}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-label={ariaLabel}
    />
  )
}

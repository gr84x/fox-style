import type { ChangeEvent } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** When true, applies error border styling and aria-invalid. */
  error?: boolean
  /** Number of visible text rows. */
  rows?: number
  className?: string
  id?: string
  'aria-label'?: string
}

/**
 * Long-form multi-line text input. Styled like Input; use with FormField for labels and hints.
 */
export function TextArea({
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  rows = 4,
  className = '',
  id,
  'aria-label': ariaLabel,
}: Props) {
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value)
  }

  return (
    <textarea
      id={id}
      className={`fs-textarea ${error ? 'fs-textarea--error' : ''} ${className}`.trim()}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      aria-invalid={error ? true : undefined}
      aria-label={ariaLabel}
    />
  )
}

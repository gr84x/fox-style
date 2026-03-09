import type { ChangeEvent } from 'react'

export type SelectOption = { value: string; label: string }

type Props = {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  'aria-label'?: string
}

/**
 * Native select with custom chevron styling. Keeps built-in accessibility.
 */
export function Select({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
}: Props) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value)
  }

  return (
    <div className={`fs-select-wrap ${className}`.trim()}>
      <select
        id={id}
        className="fs-select"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {placeholder != null && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="fs-select-chevron" aria-hidden>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  )
}

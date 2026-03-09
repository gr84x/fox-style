import type { ChangeEvent } from 'react'
import { useRef, useEffect } from 'react'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  /** Indeterminate state (e.g. "some selected"). */
  indeterminate?: boolean
  className?: string
  id?: string
  'aria-label'?: string
}

/**
 * Custom-styled checkbox. Native input is hidden; visual box uses accent color when checked.
 */
export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  className = '',
  id,
  'aria-label': ariaLabel,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = inputRef.current
    if (el) el.indeterminate = indeterminate
  }, [indeterminate])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked)
  }

  const inputId = id ?? `fs-checkbox-${Math.random().toString(36).slice(2)}`

  return (
    <label className={`fs-checkbox ${disabled ? 'fs-checkbox--disabled' : ''} ${className}`.trim()}>
      <input
        ref={inputRef}
        type="checkbox"
        id={inputId}
        className="fs-checkbox-input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel ?? (label ? undefined : 'Checkbox')}
        aria-checked={indeterminate ? 'mixed' : checked}
      />
      <span className="fs-checkbox-box" aria-hidden />
      {label != null && (
        <span className="fs-checkbox-label">{label}</span>
      )}
    </label>
  )
}

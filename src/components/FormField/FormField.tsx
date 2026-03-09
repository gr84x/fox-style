import type { ReactNode } from 'react'

type Props = {
  /** Label text shown above the control. */
  label: ReactNode
  /** The form control (input, select, etc.). */
  children: ReactNode
  /** Hint text below the control. */
  hint?: ReactNode
  /** Error message. When set, shown in danger color and often sets aria-invalid on children. */
  error?: ReactNode
  required?: boolean
  disabled?: boolean
  /** id of the control for label association. */
  htmlFor?: string
  className?: string
}

/**
 * Wraps a form control with label, optional hint, and error message.
 * Use htmlFor to associate the label with the control's id.
 */
export function FormField({
  label,
  children,
  hint,
  error,
  required = false,
  disabled = false,
  htmlFor,
  className = '',
}: Props) {
  return (
    <div className={`fs-form-field ${className}`.trim()}>
      <label className="fs-form-field-label" htmlFor={htmlFor}>
        {label}
        {required && <span className="fs-form-field-required" aria-hidden> *</span>}
      </label>
      <div className="fs-form-field-control">{children}</div>
      {hint && !error && <p className="fs-form-field-hint">{hint}</p>}
      {error && <p className="fs-form-field-error" role="alert">{error}</p>}
    </div>
  )
}

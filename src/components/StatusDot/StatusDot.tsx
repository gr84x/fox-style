export type StatusDotVariant = 'default' | 'success' | 'warning' | 'danger' | 'accent'

type Props = {
  variant?: StatusDotVariant
  pulse?: boolean
  'aria-label'?: string
  className?: string
}

const variantClass: Record<StatusDotVariant, string> = {
  default: 'fs-status-dot--default',
  success: 'fs-status-dot--success',
  warning: 'fs-status-dot--warning',
  danger: 'fs-status-dot--danger',
  accent: 'fs-status-dot--accent',
}

export function StatusDot({
  variant = 'default',
  pulse = false,
  'aria-label': ariaLabel,
  className = '',
}: Props) {
  return (
    <span
      className={`fs-status-dot ${variantClass[variant]} ${pulse ? 'fs-status-dot--pulse' : ''} ${className}`.trim()}
      role="img"
      aria-label={ariaLabel ?? `${variant} status`}
    />
  )
}

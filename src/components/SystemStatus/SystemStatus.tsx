/**
 * Status message block: info, success, warning, or error.
 * Optional detail block and timestamp.
 */
export type SystemStatusVariant = 'info' | 'success' | 'warning' | 'error'

type Props = {
  variant: SystemStatusVariant
  /** Main message text. */
  message: string
  /** Optional expandable or secondary detail. */
  detail?: string
  /** Optional timestamp or secondary label. */
  timestamp?: string
  className?: string
}

const variantClass: Record<SystemStatusVariant, string> = {
  info: 'fs-system-info',
  success: 'fs-system-success',
  warning: 'fs-system-warning',
  error: 'fs-system-error',
}

export function SystemStatus({ variant, message, detail, timestamp, className = '' }: Props) {
  return (
    <div
      className={`fs-system-status ${variantClass[variant]} ${className}`.trim()}
      role="status"
      aria-live={variant === 'error' || variant === 'warning' ? 'polite' : undefined}
    >
      <span className="fs-system-status-dot" aria-hidden />
      <span className="fs-system-status-text">{message}</span>
      {timestamp && <span className="fs-system-status-time">{timestamp}</span>}
      {detail && <div className="fs-system-status-detail">{detail}</div>}
    </div>
  )
}

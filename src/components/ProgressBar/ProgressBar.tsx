type Props = {
  /** 0–100 */
  value: number
  /** Optional label (e.g. step name) shown beside the bar */
  label?: string
  /** Use success color when value is 100 */
  successAtFull?: boolean
  className?: string
}

export function ProgressBar({
  value,
  label,
  successAtFull = false,
  className = '',
}: Props) {
  const pct = Math.min(100, Math.max(0, value))
  const isFull = pct >= 100
  const successClass = successAtFull && isFull ? 'fs-progress-bar--success' : ''

  return (
    <div className={`fs-progress-bar ${successClass} ${className}`.trim()}>
      <div className="fs-progress-bar-track">
        <div
          className="fs-progress-bar-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? 'Progress'}
        />
      </div>
      {label && <span className="fs-progress-bar-label">{label}</span>}
    </div>
  )
}

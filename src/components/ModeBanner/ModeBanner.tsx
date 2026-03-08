type Props = {
  /** When false, nothing is rendered. */
  visible: boolean
  /** Label shown in the pill (e.g. "Demo", "Beta"). */
  label?: string
  className?: string
}

export function ModeBanner({ visible, label = 'Demo', className = '' }: Props) {
  if (!visible) return null
  return (
    <span
      className={`fs-mode-banner ${className}`.trim()}
      role="status"
      aria-label={`${label} mode active`}
    >
      {label}
    </span>
  )
}

/**
 * Horizontal or vertical divider. Optional label (chip) with left/center/right alignment.
 * Use for section breaks, phase transitions, or simple rules.
 */
export type DividerLabelAlign = 'left' | 'center' | 'right'
export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerSpacing = 'sm' | 'md' | 'lg'

type Props = {
  /** Optional label shown in the chip. When omitted, only the line(s) render. */
  label?: string
  /** Label alignment: center = lines both sides; left = line only on right; right = line only on left. */
  labelAlign?: DividerLabelAlign
  orientation?: DividerOrientation
  /** Margin spacing around the divider. */
  spacing?: DividerSpacing
  className?: string
}

export function Divider({
  label,
  labelAlign = 'center',
  orientation = 'horizontal',
  spacing,
  className = '',
}: Props) {
  const isVertical = orientation === 'vertical'
  const hasLabel = label != null && label !== ''

  const rootClass = [
    'fs-divider',
    isVertical ? 'fs-divider--vertical' : 'fs-divider--horizontal',
    hasLabel ? `fs-divider--label-${labelAlign}` : '',
    spacing ? `fs-divider--spacing-${spacing}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (isVertical) {
    return <span className={`${rootClass} ${className}`.trim()} role="separator" aria-orientation="vertical" />
  }

  if (!hasLabel) {
    return <hr className={`fs-divider-line fs-divider-line--solo ${spacing ? `fs-divider--spacing-${spacing}` : ''} ${className}`.trim()} role="separator" />
  }

  return (
    <div className={`${rootClass} ${className}`.trim()} role="separator" aria-label={label}>
      {(labelAlign === 'center' || labelAlign === 'right') && <span className="fs-divider-line" />}
      <span className="fs-divider-chip">{label}</span>
      {(labelAlign === 'center' || labelAlign === 'left') && <span className="fs-divider-line" />}
    </div>
  )
}

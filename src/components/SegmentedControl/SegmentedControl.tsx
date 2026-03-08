import type { ReactNode } from 'react'

export type SegmentOption<T extends string = string> = {
  value: T
  label: ReactNode
}

type Props<T extends string = string> = {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  'aria-label'?: string
  className?: string
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  'aria-label': ariaLabel = 'Segmented control',
  className = '',
}: Props<T>) {
  return (
    <div className={`fs-segmented ${className}`.trim()} role="tablist" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={opt.value === value}
          className={`fs-segmented-btn${opt.value === value ? ' fs-segmented-btn--active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

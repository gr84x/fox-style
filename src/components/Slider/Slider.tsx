import type { ChangeEvent } from 'react'

type Props = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  id?: string
  'aria-label'?: string
}

/**
 * Range slider. Native input with custom track/thumb styling.
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = '',
  id,
  'aria-label': ariaLabel,
}: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(Number(e.target.value))
  }

  const range = max - min
  const percent = range === 0 ? 0 : ((value - min) / range) * 100

  return (
    <input
      type="range"
      id={id}
      className={`fs-slider ${className}`.trim()}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{ ['--fs-slider-percent' as string]: `${percent}%` }}
    />
  )
}

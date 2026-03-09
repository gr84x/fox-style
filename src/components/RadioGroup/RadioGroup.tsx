import type { ReactNode, ChangeEvent } from 'react'
import { createContext, useContext } from 'react'

type RadioGroupContextValue<T extends string = string> = {
  name: string
  value: T
  onChange: (value: T) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue<string> | null>(null)

type RadioGroupProps<T extends string = string> = {
  name: string
  value: T
  onChange: (value: T) => void
  children: ReactNode
  className?: string
  'aria-label'?: string
}

/**
 * Provides name and value context for Radio options. Renders a fieldset.
 */
export function RadioGroup<T extends string = string>({
  name,
  value,
  onChange,
  children,
  className = '',
  'aria-label': ariaLabel,
}: RadioGroupProps<T>) {
  const contextValue: RadioGroupContextValue<string> = {
    name,
    value,
    onChange: (v: string) => onChange(v as T),
  }
  return (
    <RadioGroupContext.Provider value={contextValue}>
      <fieldset className={`fs-radio-group ${className}`.trim()} aria-label={ariaLabel}>
        {children}
      </fieldset>
    </RadioGroupContext.Provider>
  )
}

type RadioProps<T extends string = string> = {
  value: T
  label: ReactNode
  disabled?: boolean
  /** Optional when inside RadioGroup. */
  name?: string
  /** Optional when inside RadioGroup. */
  checked?: boolean
  onChange?: (value: T) => void
  className?: string
}

/**
 * Single radio option. Use inside RadioGroup or provide name/checked/onChange for standalone use.
 */
export function Radio<T extends string = string>({
  value,
  label,
  disabled = false,
  name: nameProp,
  checked: checkedProp,
  onChange: onChangeProp,
  className = '',
}: RadioProps<T>) {
  const ctx = useContext(RadioGroupContext)
  const name = nameProp ?? ctx?.name ?? `fs-radio-${value}`
  const checked = checkedProp ?? (ctx ? (ctx.value as T) === value : false)
  const onChange = onChangeProp ?? (ctx ? (v: string) => { ctx.onChange(v) } : undefined)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value as T)
  }

  const inputId = `fs-radio-${name}-${value}`.replace(/\s/g, '-')

  return (
    <label className={`fs-radio ${disabled ? 'fs-radio--disabled' : ''} ${className}`.trim()}>
      <input
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="fs-radio-input"
      />
      <span className="fs-radio-dot" aria-hidden />
      <span className="fs-radio-label">{label}</span>
    </label>
  )
}

import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type Props = {
  children: ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  'aria-label'?: string
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'fs-btn-primary',
  secondary: 'fs-btn-secondary',
  ghost: 'fs-btn-ghost',
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  'aria-label': ariaLabel,
}: Props) {
  return (
    <button
      type={type}
      className={`fs-btn ${variantClass[variant]} ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

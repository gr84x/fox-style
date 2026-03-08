import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'accent'

type Props = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClass: Record<BadgeVariant, string> = {
  default: 'fs-badge-default',
  success: 'fs-badge-success',
  warning: 'fs-badge-warning',
  danger: 'fs-badge-danger',
  accent: 'fs-badge-accent',
}

export function Badge({ children, variant = 'default', className = '' }: Props) {
  return (
    <span className={`fs-badge ${variantClass[variant]} ${className}`.trim()} role="status">
      {children}
    </span>
  )
}

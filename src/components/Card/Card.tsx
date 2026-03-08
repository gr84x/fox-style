import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Optional padding; default is padded. */
  padded?: boolean
}

export function Card({ children, className = '', padded = true }: Props) {
  return (
    <div className={`fs-card ${padded ? 'fs-card--padded' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}

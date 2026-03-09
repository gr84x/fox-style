import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href: string
  /** Opens in new tab and sets rel="noopener noreferrer". */
  external?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

/**
 * Styled anchor. Uses accent color. Optional external (target _blank) and disabled state.
 */
export function Link({
  children,
  href,
  external = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: Props) {
  const classes = [`fs-link`, disabled ? 'fs-link--disabled' : '', className].filter(Boolean).join(' ')

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true" aria-label={ariaLabel}>
        {children}
      </span>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}

import type { ReactNode } from 'react'

export type AvatarSize = 'sm' | 'md' | 'lg'

type Props = {
  /** Image URL. */
  src?: string
  alt?: string
  /** Fallback when no image: initials (e.g. "JD"). */
  initials?: string
  /** Fallback when no image: icon node. */
  icon?: ReactNode
  size?: AvatarSize
  className?: string
}

/**
 * Circular avatar. Image, initials, or icon fallback.
 */
export function Avatar({
  src,
  alt = '',
  initials,
  icon,
  size = 'md',
  className = '',
}: Props) {
  const sizeClass = `fs-avatar--${size}`

  if (src != null) {
    return (
      <span className={`fs-avatar fs-avatar--img ${sizeClass} ${className}`.trim()}>
        <img src={src} alt={alt} className="fs-avatar-img" />
      </span>
    )
  }

  if (initials != null && initials !== '') {
    return (
      <span className={`fs-avatar fs-avatar--initials ${sizeClass} ${className}`.trim()} title={alt || undefined}>
        {initials.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  if (icon != null) {
    return (
      <span className={`fs-avatar fs-avatar--icon ${sizeClass} ${className}`.trim()} title={alt || undefined}>
        {icon}
      </span>
    )
  }

  return (
    <span className={`fs-avatar fs-avatar--placeholder ${sizeClass} ${className}`.trim()} aria-hidden>
      ?
    </span>
  )
}

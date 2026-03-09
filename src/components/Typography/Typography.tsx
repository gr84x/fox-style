import type { ReactNode } from 'react'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type HeadingProps = {
  children: ReactNode
  level?: HeadingLevel
  className?: string
}

/**
 * Heading component. Renders h1–h6 using design token typography.
 */
export function Heading({ children, level = 1, className = '' }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <Tag className={`fs-heading fs-heading--${level} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

export type TextVariant = 'primary' | 'secondary' | 'tertiary'

type TextProps = {
  children: ReactNode
  as?: 'p' | 'span'
  variant?: TextVariant
  className?: string
}

/**
 * Text component. Renders paragraph or span with primary/secondary/tertiary color variant.
 */
export function Text({
  children,
  as: Component = 'p',
  variant = 'primary',
  className = '',
}: TextProps) {
  return (
    <Component className={`fs-text fs-text--${variant} ${className}`.trim()}>
      {children}
    </Component>
  )
}

type CodeProps = {
  children: ReactNode
  className?: string
}

/**
 * Inline or block code. Uses monospace font token.
 */
export function Code({ children, className = '' }: CodeProps) {
  return <code className={`fs-code ${className}`.trim()}>{children}</code>
}

export type SkeletonVariant = 'text' | 'circle' | 'rect'

type Props = {
  width?: string | number
  height?: string | number
  variant?: SkeletonVariant
  /** Number of repeated skeletons (e.g. for list placeholders). */
  count?: number
  className?: string
}

/**
 * Animated placeholder block. Use for loading states.
 */
export function Skeleton({
  width,
  height,
  variant = 'rect',
  count = 1,
  className = '',
}: Props) {
  const style: React.CSSProperties = {}
  if (width != null) style.width = typeof width === 'number' ? `${width}px` : width
  if (height != null) style.height = typeof height === 'number' ? `${height}px` : height

  const single = (
    <span
      className={`fs-skeleton fs-skeleton--${variant} ${className}`.trim()}
      style={Object.keys(style).length > 0 ? style : undefined}
      aria-hidden
    />
  )

  if (count <= 1) return single

  return (
    <span className="fs-skeleton-group">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`fs-skeleton fs-skeleton--${variant} ${className}`.trim()}
          style={Object.keys(style).length > 0 ? style : undefined}
          aria-hidden
        />
      ))}
    </span>
  )
}

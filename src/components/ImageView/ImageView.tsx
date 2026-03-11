type Props = {
  /** Image URL (e.g. from upload or CDN). */
  src: string
  /** Accessible description of the image. */
  alt: string
  /** CSS object-fit for the image. */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none'
  className?: string
}

/**
 * Display-only image from URL or object URL.
 * Use after upload or to show a stored image; pairs with ImageUpload.
 */
export function ImageView({
  src,
  alt,
  objectFit = 'cover',
  className = '',
}: Props) {
  return (
    <div className={`fs-image-view ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        className="fs-image-view-img"
        style={{ objectFit }}
      />
    </div>
  )
}

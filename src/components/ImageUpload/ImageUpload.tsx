import type { ChangeEvent } from 'react'
import { useRef, useState, useEffect } from 'react'

type Props = {
  /** Current file or null when none selected. */
  value: File | null
  onChange: (file: File | null) => void
  accept?: string
  disabled?: boolean
  /** Show a thumbnail preview when a file is selected. */
  preview?: boolean
  /** Max file size in bytes. Files over this are rejected. */
  maxSize?: number
  className?: string
  id?: string
  'aria-label'?: string
}

/**
 * Image (or file) upload control. Styled file input with optional preview and clear.
 */
export function ImageUpload({
  value,
  onChange,
  accept = 'image/*',
  disabled = false,
  preview = true,
  maxSize,
  className = '',
  id,
  'aria-label': ariaLabel,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!value || !preview) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value, preview])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (!file) {
      onChange(null)
      return
    }
    if (maxSize != null && file.size > maxSize) {
      onChange(null)
      if (inputRef.current) inputRef.current.value = ''
      return
    }
    onChange(file)
  }

  function handleClear() {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const inputId = id ?? `fs-image-upload-${Math.random().toString(36).slice(2)}`

  return (
    <div className={`fs-image-upload ${className}`.trim()}>
      <input
        ref={inputRef}
        type="file"
        id={inputId}
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        className="fs-image-upload-input"
        aria-label={ariaLabel ?? 'Upload image'}
      />
      {preview && value && previewUrl ? (
        <div className="fs-image-upload-preview">
          <img src={previewUrl} alt="" className="fs-image-upload-img" />
          {!disabled && (
            <button
              type="button"
              className="fs-image-upload-clear"
              onClick={handleClear}
              aria-label="Remove image"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <label htmlFor={inputId} className="fs-image-upload-label">
          <span className="fs-image-upload-text">
            {value ? value.name : 'Choose image…'}
          </span>
        </label>
      )}
    </div>
  )
}

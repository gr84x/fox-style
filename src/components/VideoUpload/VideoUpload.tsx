import type { ChangeEvent } from 'react'
import { useRef, useState, useEffect } from 'react'

type Props = {
  /** Current file or null when none selected. */
  value: File | null
  onChange: (file: File | null) => void
  accept?: string
  disabled?: boolean
  /** Show a video preview when a file is selected. */
  preview?: boolean
  /** Max file size in bytes. Files over this are rejected. */
  maxSize?: number
  className?: string
  id?: string
  'aria-label'?: string
}

/**
 * Video (or file) upload control. Styled file input with optional preview and clear.
 */
export function VideoUpload({
  value,
  onChange,
  accept = 'video/*',
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

  const inputId = id ?? `fs-video-upload-${Math.random().toString(36).slice(2)}`

  return (
    <div className={`fs-video-upload ${className}`.trim()}>
      <input
        ref={inputRef}
        type="file"
        id={inputId}
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        className="fs-video-upload-input"
        aria-label={ariaLabel ?? 'Upload video'}
      />
      {preview && value && previewUrl ? (
        <div className="fs-video-upload-preview">
          <video
            src={previewUrl}
            className="fs-video-upload-video"
            controls
            muted
            playsInline
          />
          {!disabled && (
            <button
              type="button"
              className="fs-video-upload-clear"
              onClick={handleClear}
              aria-label="Remove video"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <label htmlFor={inputId} className="fs-video-upload-label">
          <span className="fs-video-upload-text">
            {value ? value.name : 'Choose video…'}
          </span>
        </label>
      )}
    </div>
  )
}

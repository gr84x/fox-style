/**
 * Chat input bar: auto-resizing textarea, send button, optional hint.
 * Use for message composition in chat UIs.
 */
import { useState, useRef, useEffect, useCallback } from 'react'

type Props = {
  placeholder?: string
  onSend: (content: string) => void
  disabled?: boolean
  hint?: string
  'aria-label'?: string
  className?: string
}

export function ChatInput({
  placeholder = 'Type a message...',
  onSend,
  disabled = false,
  hint = 'Press Enter to send, Shift+Enter for new line',
  'aria-label': ariaLabel = 'Message input',
  className = '',
}: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [])

  useEffect(() => {
    resize()
  }, [value, resize])

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    textareaRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className={`fs-chat-input-container ${className}`.trim()}>
      <div className="fs-chat-input-bar">
        <textarea
          ref={textareaRef}
          className="fs-chat-textarea"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          aria-label={ariaLabel}
        />
        <button
          type="button"
          className={`fs-chat-send-btn${value.trim() ? ' fs-chat-send-btn--active' : ''}`}
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
      {hint && <p className="fs-chat-input-hint">{hint}</p>}
    </div>
  )
}

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { ToastProvider, useToast } from '@/components/Toast'

function ToastTester() {
  const { addToast, removeToast, toasts } = useToast()
  return (
    <div>
      <button type="button" onClick={() => addToast({ variant: 'info', message: 'Hello toast' })}>
        Add
      </button>
      <button
        type="button"
        onClick={() => toasts[0] && removeToast(toasts[0].id)}
      >
        Remove first
      </button>
    </div>
  )
}

describe('Toast', () => {
  it('ToastProvider renders children', () => {
    render(
      <ToastProvider>
        <span>Child</span>
      </ToastProvider>
    )
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  it('useToast throws when used outside ToastProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      function Bad() {
        useToast()
        return null
      }
      expect(() => render(<Bad />)).toThrow('useToast must be used within ToastProvider')
    } finally {
      consoleSpy.mockRestore()
    }
  })

  it('addToast adds a toast visible in the notifications region', async () => {
    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>
    )
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    const region = document.body.querySelector('[aria-label="Notifications"]')
    expect(region).toBeInTheDocument()
    expect(region).toHaveTextContent('Hello toast')
    expect(document.body.querySelector('.fs-toast-message')).toHaveTextContent('Hello toast')
  })

  it('removeToast removes the toast when dismiss is clicked', async () => {
    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>
    )
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(document.body).toHaveTextContent('Hello toast')
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(document.body.querySelector('.fs-toast')).not.toBeInTheDocument()
  })

  it('removeToast removes toast when Remove first is clicked', async () => {
    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>
    )
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(document.body).toHaveTextContent('Hello toast')
    await userEvent.click(screen.getByRole('button', { name: 'Remove first' }))
    expect(document.body.querySelector('.fs-toast')).not.toBeInTheDocument()
  })
})

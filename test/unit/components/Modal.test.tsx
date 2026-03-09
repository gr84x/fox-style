import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from '@/components/Modal'

describe('Modal', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <Modal open={false} onClose={vi.fn()}>
        Body
      </Modal>
    )
    expect(container.querySelector('dialog')).not.toBeInTheDocument()
  })

  it('renders dialog with body when open is true', () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose}>
        Modal body content
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText('Modal body content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Modal open onClose={vi.fn()} title="Modal Title">
        Body
      </Modal>
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Modal Title' })).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'fs-modal-title')
  })

  it('renders actions when provided', () => {
    render(
      <Modal open onClose={vi.fn()} actions={<button type="button">OK</button>}>
        Body
      </Modal>
    )
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument()
  })

  it('calls onClose when cancel event is fired on dialog', () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose}>
        Body
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    fireEvent(dialog, new Event('cancel', { bubbles: false }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('merges custom className on dialog', () => {
    render(
      <Modal open onClose={vi.fn()} className="my-modal">
        Body
      </Modal>
    )
    expect(screen.getByRole('dialog')).toHaveClass('my-modal')
  })
})

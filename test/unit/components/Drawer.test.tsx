import { render, screen, fireEvent } from '@testing-library/react'
import { Drawer } from '@/components/Drawer'

describe('Drawer', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <Drawer open={false} onClose={vi.fn()}>
        Content
      </Drawer>
    )
    expect(container.querySelector('.fs-drawer-overlay')).not.toBeInTheDocument()
  })

  it('renders overlay and panel when open is true', () => {
    const onClose = vi.fn()
    render(
      <Drawer open onClose={onClose}>
        Drawer body
      </Drawer>
    )
    expect(document.body.querySelector('.fs-drawer-overlay')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText('Drawer body')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Drawer open onClose={vi.fn()} title="Drawer Title">
        Body
      </Drawer>
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Drawer Title' })).toBeInTheDocument()
  })

  it('applies position class for right by default', () => {
    render(
      <Drawer open onClose={vi.fn()}>
        Body
      </Drawer>
    )
    expect(document.body.querySelector('.fs-drawer-panel--right')).toBeInTheDocument()
  })

  it('applies position class for left when position is left', () => {
    render(
      <Drawer open onClose={vi.fn()} position="left">
        Body
      </Drawer>
    )
    expect(document.body.querySelector('.fs-drawer-panel--left')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(
      <Drawer open onClose={onClose}>
        Body
      </Drawer>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('merges custom className on panel', () => {
    render(
      <Drawer open onClose={vi.fn()} className="my-drawer">
        Body
      </Drawer>
    )
    expect(document.body.querySelector('.fs-drawer-panel.my-drawer')).toBeInTheDocument()
  })
})

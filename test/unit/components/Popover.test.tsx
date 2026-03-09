import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover } from '@/components/Popover'

describe('Popover', () => {
  it('renders trigger and does not show panel initially', () => {
    render(
      <Popover trigger={<button type="button">Open</button>}>
        <span>Popover content</span>
      </Popover>
    )
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('shows panel when trigger is clicked', async () => {
    render(
      <Popover trigger={<button type="button">Open</button>}>
        <span>Popover content</span>
      </Popover>
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Popover content')).toBeInTheDocument()
    expect(document.body.querySelector('.fs-popover')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('hides panel when trigger is clicked again', async () => {
    render(
      <Popover trigger={<button type="button">Toggle</button>}>
        <span>Content</span>
      </Popover>
    )
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.getByText('Content')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }))
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('respects controlled open prop', () => {
    render(
      <Popover trigger={<button type="button">Trigger</button>} open>
        <span>Controlled content</span>
      </Popover>
    )
    expect(screen.getByText('Controlled content')).toBeInTheDocument()
  })

  it('calls onOpenChange when opened or closed', async () => {
    const onOpenChange = vi.fn()
    render(
      <Popover trigger={<button type="button">Open</button>} onOpenChange={onOpenChange}>
        <span>Content</span>
      </Popover>
    )
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('applies position class', () => {
    render(
      <Popover trigger={<button type="button">Open</button>} open position="top">
        <span>Content</span>
      </Popover>
    )
    expect(document.body.querySelector('.fs-popover--top')).toBeInTheDocument()
  })
})

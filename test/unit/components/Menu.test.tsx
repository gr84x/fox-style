import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Menu } from '@/components/Menu'

describe('Menu', () => {
  it('renders trigger and does not show menu initially', () => {
    const items = [{ label: 'Save', onClick: vi.fn() }]
    render(<Menu trigger={<button type="button">Menu</button>} items={items} />)
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('shows menu with items when trigger is clicked', async () => {
    const onClick = vi.fn()
    const items = [
      { label: 'Edit', onClick },
      { label: 'Delete', onClick: vi.fn() },
    ]
    render(<Menu trigger={<button type="button">Open</button>} items={items} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
  })

  it('calls item onClick and closes menu when item is clicked', async () => {
    const onEdit = vi.fn()
    const items = [{ label: 'Edit', onClick: onEdit }]
    render(<Menu trigger={<button type="button">Open</button>} items={items} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    await userEvent.click(screen.getByRole('menuitem', { name: 'Edit' }))
    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('disables menu item when disabled is true', async () => {
    const items = [{ label: 'Disabled', onClick: vi.fn(), disabled: true }]
    render(<Menu trigger={<button type="button">Open</button>} items={items} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('menuitem', { name: 'Disabled' })).toBeDisabled()
  })

  it('merges custom className on trigger wrapper', () => {
    const { container } = render(
      <Menu trigger={<button type="button">X</button>} items={[]} className="my-menu" />
    )
    expect(container.querySelector('.my-menu')).toBeInTheDocument()
  })
})

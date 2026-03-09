import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table } from '@/components/Table'

type Row = { id: number; name: string }

const columns = [
  { key: 'id' as const, header: 'ID' },
  { key: 'name' as const, header: 'Name' },
]
const data: Row[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]

describe('Table', () => {
  it('renders headers and rows from data', () => {
    render(<Table columns={columns} data={data} />)
    expect(screen.getByRole('columnheader', { name: 'ID' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Alice' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Bob' })).toBeInTheDocument()
  })

  it('calls onSort with column key when header is clicked', async () => {
    const onSort = vi.fn()
    render(<Table columns={columns} data={data} onSort={onSort} />)
    await userEvent.click(screen.getByRole('columnheader', { name: 'Name' }))
    expect(onSort).toHaveBeenCalledWith('name')
  })

  it('calls onRowClick with row and index when row is clicked', async () => {
    const onRowClick = vi.fn()
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />)
    await userEvent.click(screen.getByRole('cell', { name: 'Alice' }).closest('tr')!)
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0)
  })

  it('merges custom className on wrapper', () => {
    const { container } = render(<Table columns={columns} data={[]} className="my-table" />)
    expect(container.querySelector('.fs-table-wrap')).toHaveClass('my-table')
  })
})

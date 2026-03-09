import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'

type Row = { name: string; status: string; count: number }

const meta: Meta<typeof Table<Row>> = {
  title: 'Components/Data/Table',
  component: Table,
  tags: ['autodocs'],
}
export default meta

const columns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'status' as const, header: 'Status' },
  { key: 'count' as const, header: 'Count' },
]

const data: Row[] = [
  { name: 'Item A', status: 'Active', count: 42 },
  { name: 'Item B', status: 'Pending', count: 0 },
  { name: 'Item C', status: 'Active', count: 7 },
]

type Story = StoryObj<typeof Table<Row>>

export const Default: Story = {
  args: { columns, data },
}

export const WithSort: Story = {
  args: {
    columns,
    data,
    onSort: (key) => console.log('Sort by', key),
  },
}

export const WithRowClick: Story = {
  args: {
    columns,
    data,
    onRowClick: (row) => console.log('Row', row),
  },
}

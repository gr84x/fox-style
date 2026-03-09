import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    siblingCount: { control: 'number' },
  },
}
export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(1)
    return (
      <Pagination
        page={page}
        totalPages={10}
        onPageChange={setPage}
        siblingCount={1}
      />
    )
  },
}

export const ManyPages: Story = {
  render: function Render() {
    const [page, setPage] = useState(5)
    return (
      <Pagination
        page={page}
        totalPages={20}
        onPageChange={setPage}
        siblingCount={2}
      />
    )
  },
}

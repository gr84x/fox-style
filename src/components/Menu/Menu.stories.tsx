import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from './Menu'
import { Button } from '../Button'

const meta: Meta<typeof Menu> = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Actions</Button>,
    items: [
      { label: 'Edit', onClick: () => {} },
      { label: 'Duplicate', onClick: () => {} },
      { label: 'Delete', onClick: () => {}, disabled: true },
    ],
  },
}

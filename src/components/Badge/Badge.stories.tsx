import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'accent'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: 'Label', variant: 'default' },
}

export const Success: Story = {
  args: { children: 'Done', variant: 'success' },
}

export const Warning: Story = {
  args: { children: 'Pending', variant: 'warning' },
}

export const Danger: Story = {
  args: { children: 'Failed', variant: 'danger' },
}

export const Accent: Story = {
  args: { children: 'Active', variant: 'accent' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  ),
}

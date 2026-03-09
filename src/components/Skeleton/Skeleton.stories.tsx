import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'circle', 'rect'] },
  },
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Rect: Story = {
  args: { width: 200, height: 24, variant: 'rect' },
}

export const Circle: Story = {
  args: { width: 40, height: 40, variant: 'circle' },
}

export const Text: Story = {
  args: { width: '100%', height: 16, variant: 'text' },
}

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton width="80%" height={16} variant="text" />
      <Skeleton width="60%" height={16} variant="text" />
      <Skeleton width="90%" height={16} variant="text" />
    </div>
  ),
}

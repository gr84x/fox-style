import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    labelAlign: { control: 'select', options: ['left', 'center', 'right'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    spacing: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof Divider>

export const NoLabel: Story = {
  args: {},
}

export const LabelCenter: Story = {
  args: { label: 'Planning', labelAlign: 'center' },
}

export const LabelLeft: Story = {
  args: { label: 'Section', labelAlign: 'left' },
}

export const LabelRight: Story = {
  args: { label: 'Complete', labelAlign: 'right' },
}

export const WithSpacing: Story = {
  args: { label: 'Phase', spacing: 'md' },
}

export const Stacked: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Divider label="Planning" labelAlign="center" />
      <Divider label="Executing" labelAlign="center" />
      <Divider />
      <Divider label="Complete" labelAlign="right" />
    </div>
  ),
}

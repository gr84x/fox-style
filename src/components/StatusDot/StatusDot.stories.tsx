import type { Meta, StoryObj } from '@storybook/react'
import { StatusDot } from './StatusDot'

const meta: Meta<typeof StatusDot> = {
  title: 'Components/Feedback/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'accent'] },
    pulse: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof StatusDot>

export const Default: Story = { args: { variant: 'default' } }
export const Success: Story = { args: { variant: 'success' } }
export const Warning: Story = { args: { variant: 'warning' } }
export const Danger: Story = { args: { variant: 'danger' } }
export const Accent: Story = { args: { variant: 'accent' } }
export const Pulsing: Story = { args: { variant: 'accent', pulse: true } }

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <StatusDot variant="success" />
      <span>Running</span>
      <StatusDot variant="danger" pulse />
      <span>Failed</span>
    </div>
  ),
}

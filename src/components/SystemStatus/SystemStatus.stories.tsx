import type { Meta, StoryObj } from '@storybook/react'
import { SystemStatus } from './SystemStatus'

const meta: Meta<typeof SystemStatus> = {
  title: 'Components/Feedback/SystemStatus',
  component: SystemStatus,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] } },
}
export default meta

type Story = StoryObj<typeof SystemStatus>

export const Info: Story = { args: { variant: 'info', message: 'Processing your request.' } }
export const Success: Story = { args: { variant: 'success', message: 'Task completed successfully.' } }
export const Warning: Story = { args: { variant: 'warning', message: 'Updates may be delayed.' } }
export const Error: Story = { args: { variant: 'error', message: 'Something went wrong.' } }

export const WithDetail: Story = {
  args: {
    variant: 'error',
    message: 'Validation failed.',
    detail: 'The provided value must be between 0 and 100.',
  },
}

export const WithTimestamp: Story = {
  args: {
    variant: 'info',
    message: 'Session started.',
    timestamp: '2:45 PM',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SystemStatus variant="info" message="Info message." />
      <SystemStatus variant="success" message="Success message." />
      <SystemStatus variant="warning" message="Warning message." />
      <SystemStatus variant="error" message="Error message." />
    </div>
  ),
}

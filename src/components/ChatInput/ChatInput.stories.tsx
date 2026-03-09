import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { ChatInput } from './ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'Components/Forms/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  args: { onSend: fn() },
}
export default meta

type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  args: { placeholder: 'Type a message...' },
}

export const CustomHint: Story = {
  args: { hint: 'Enter to send' },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled…' },
}

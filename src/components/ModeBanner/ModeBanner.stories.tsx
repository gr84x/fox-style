import type { Meta, StoryObj } from '@storybook/react'
import { ModeBanner } from './ModeBanner'

const meta: Meta<typeof ModeBanner> = {
  title: 'Components/ModeBanner',
  component: ModeBanner,
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
    label: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof ModeBanner>

export const Visible: Story = {
  args: { visible: true, label: 'Demo' },
}

export const Hidden: Story = {
  args: { visible: false, label: 'Demo' },
}

export const CustomLabel: Story = {
  args: { visible: true, label: 'Beta' },
}

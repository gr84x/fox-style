import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Components/Navigation/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    external: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: { children: 'Go to docs', href: 'https://example.com' },
}

export const External: Story = {
  args: { children: 'Open in new tab', href: 'https://example.com', external: true },
}

export const Disabled: Story = {
  args: { children: 'Disabled link', href: '#', disabled: true },
}

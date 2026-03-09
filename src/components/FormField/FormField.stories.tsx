import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from './FormField'

const meta: Meta<typeof FormField> = {
  title: 'Components/Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof FormField>

export const Default: Story = {
  args: {
    label: 'Email',
    children: <input type="email" id="email-demo" className="fs-input" placeholder="you@example.com" readOnly />,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Username',
    hint: 'Choose a unique username.',
    children: <input type="text" id="user-demo" className="fs-input" placeholder="jane" readOnly />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters.',
    children: <input type="password" id="pw-demo" className="fs-input fs-input--error" placeholder="••••••••" readOnly />,
  },
}

export const Required: Story = {
  args: {
    label: 'Name',
    required: true,
    children: <input type="text" id="name-demo" className="fs-input" placeholder="Your name" readOnly />,
  },
}

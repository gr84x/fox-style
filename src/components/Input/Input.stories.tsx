import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input } from './Input'
import { FormField } from '../FormField'

const meta: Meta<typeof Input> = {
  title: 'Components/Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return <Input value={value} onChange={setValue} placeholder="Enter text" />
  },
}

export const WithFormField: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <FormField label="Email" htmlFor="input-email" hint="We'll never share your email.">
        <Input id="input-email" value={value} onChange={setValue} type="email" placeholder="you@example.com" />
      </FormField>
    )
  },
}

export const Error: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <FormField label="Username" error="Username is already taken." htmlFor="input-err">
        <Input id="input-err" value={value} onChange={setValue} error placeholder="jane" />
      </FormField>
    )
  },
}

export const Disabled: Story = {
  args: { value: 'Disabled', onChange: () => {}, disabled: true },
}

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TextArea } from './TextArea'
import { FormField } from '../FormField'

const meta: Meta<typeof TextArea> = {
  title: 'Components/Forms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    rows: { control: 'number' },
  },
}
export default meta

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <TextArea value={value} onChange={setValue} placeholder="Enter description…" />
    )
  },
}

export const WithFormField: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <FormField label="Description" hint="Optional long-form text." htmlFor="desc-ta">
        <TextArea id="desc-ta" value={value} onChange={setValue} rows={5} />
      </FormField>
    )
  },
}

export const Error: Story = {
  render: function Render() {
    const [value, setValue] = useState('Required but empty')
    return (
      <FormField label="Notes" error="This field is required." htmlFor="notes-ta">
        <TextArea id="notes-ta" value={value} onChange={setValue} error />
      </FormField>
    )
  },
}

export const Disabled: Story = {
  args: {
    value: 'Read-only content.',
    onChange: () => {},
    disabled: true,
  },
}

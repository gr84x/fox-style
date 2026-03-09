import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'
import { FormField } from '../FormField'

const meta: Meta<typeof Select> = {
  title: 'Components/Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
}
export default meta

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder="Choose…"
      />
    )
  },
}

export const WithFormField: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <FormField label="Country" htmlFor="select-country">
        <Select
          id="select-country"
          value={value}
          onChange={setValue}
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'de', label: 'Germany' },
          ]}
          placeholder="Select country"
        />
      </FormField>
    )
  },
}

export const Disabled: Story = {
  args: {
    value: 'a',
    onChange: () => {},
    options,
    disabled: true,
  },
}

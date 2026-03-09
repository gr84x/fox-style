import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false)
    return <Checkbox checked={checked} onChange={setChecked} label="Accept terms" />
  },
}

export const Checked: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(true)
    return <Checkbox checked={checked} onChange={setChecked} label="Subscribe" />
  },
}

export const Indeterminate: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false)
    return <Checkbox checked={checked} onChange={setChecked} label="Select all" indeterminate />
  },
}

export const Disabled: Story = {
  args: { checked: false, onChange: () => {}, label: 'Disabled', disabled: true },
}

export const NoLabel: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false)
    return <Checkbox checked={checked} onChange={setChecked} aria-label="Toggle" />
  },
}

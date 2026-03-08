import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SearchInput>

export const Uncontrolled: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: 280 }}>
        <SearchInput value={value} onChange={setValue} placeholder="Search tasks…" />
      </div>
    )
  },
}

export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = useState('hello')
    return (
      <div style={{ width: 280 }}>
        <SearchInput value={value} onChange={setValue} placeholder="Search…" />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: function Render() {
    return (
      <div style={{ width: 280 }}>
        <SearchInput value="" onChange={() => {}} placeholder="Search…" disabled />
      </div>
    )
  },
}

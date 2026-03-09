import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SegmentedControl } from './SegmentedControl'

const options = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Done' },
  { value: 'failed', label: 'Interrupted' },
] as const

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Forms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SegmentedControl<typeof options[number]['value']>>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<'all' | 'active' | 'done' | 'failed'>('all')
    return (
      <SegmentedControl
        options={[...options]}
        value={value}
        onChange={(v) => setValue(v as typeof value)}
      />
    )
  },
}

export const TwoOptions: Story = {
  render: function Render() {
    const [value, setValue] = useState('on')
    return (
      <SegmentedControl
        options={[{ value: 'on', label: 'On' }, { value: 'off', label: 'Off' }]}
        value={value}
        onChange={setValue}
      />
    )
  },
}

/** Long labels truncate with ellipsis and control can wrap when narrow. */
export const LongLabels: Story = {
  render: function Render() {
    const [value, setValue] = useState('all')
    return (
      <div style={{ maxWidth: 320 }}>
        <SegmentedControl
          options={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'done', label: 'Done' },
            { value: 'interrupted', label: 'Interrupted' },
          ]}
          value={value}
          onChange={(v) => setValue(v as 'all' | 'active' | 'done' | 'interrupted')}
        />
      </div>
    )
  },
}

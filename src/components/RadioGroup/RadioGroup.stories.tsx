import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup, Radio } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof RadioGroup>

/* Each story uses a unique name so multiple stories on the same page do not share radio state. */
export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<'a' | 'b' | 'c'>('a')
    return (
      <RadioGroup name="radiogroup-default" value={value} onChange={setValue} aria-label="Choose one">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" />
      </RadioGroup>
    )
  },
}

export const WithFormField: Story = {
  render: function Render() {
    const [value, setValue] = useState<'yes' | 'no'>('yes')
    return (
      <div className="fs-form-field">
        <span className="fs-form-field-label">Notify by email?</span>
        <div className="fs-form-field-control" style={{ display: 'flex', gap: '12px', marginTop: 4 }}>
          <RadioGroup name="radiogroup-notify" value={value} onChange={setValue} aria-label="Notify by email">
            <Radio value="yes" label="Yes" />
            <Radio value="no" label="No" />
          </RadioGroup>
        </div>
      </div>
    )
  },
}

export const DisabledOption: Story = {
  render: function Render() {
    const [value, setValue] = useState<'a' | 'b'>('a')
    return (
      <RadioGroup name="radiogroup-disabled" value={value} onChange={setValue} aria-label="Choose">
        <Radio value="a" label="Available" />
        <Radio value="b" label="Unavailable" disabled />
      </RadioGroup>
    )
  },
}

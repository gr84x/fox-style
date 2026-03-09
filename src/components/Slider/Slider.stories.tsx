import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from './Slider'
import { FormField } from '../FormField'

const meta: Meta<typeof Slider> = {
  title: 'Components/Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
}
export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState(50)
    return (
      <div style={{ width: 200 }}>
        <Slider value={value} onChange={setValue} aria-label="Volume" />
        <span style={{ fontSize: '0.75rem', color: 'var(--fs-text-tertiary)' }}>{value}</span>
      </div>
    )
  },
}

export const WithFormField: Story = {
  render: function Render() {
    const [value, setValue] = useState(30)
    return (
      <FormField label="Progress" hint={`${value}%`} htmlFor="slider-progress">
        <Slider id="slider-progress" value={value} onChange={setValue} min={0} max={100} aria-label="Progress" />
      </FormField>
    )
  },
}

export const Disabled: Story = {
  args: { value: 40, onChange: () => {}, disabled: true },
}

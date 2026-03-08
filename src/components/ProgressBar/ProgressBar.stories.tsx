import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = { args: { value: 40 } }
export const WithLabel: Story = { args: { value: 60, label: 'Planning' } }
export const Full: Story = { args: { value: 100, label: 'Done', successAtFull: true } }
export const Empty: Story = { args: { value: 0, label: 'Starting' } }

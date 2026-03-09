import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
}
export default meta

type Story = StoryObj<typeof Tooltip>

export const Top: Story = {
  args: {
    content: 'Save your changes',
    position: 'top',
    children: <Button variant="secondary">Save</Button>,
  },
}

export const Bottom: Story = {
  args: {
    content: 'Click to submit',
    position: 'bottom',
    children: <Button variant="primary">Submit</Button>,
  },
}

export const Left: Story = {
  args: {
    content: 'Previous page',
    position: 'left',
    children: <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Back</span>,
  },
}

export const Right: Story = {
  args: {
    content: 'Next page',
    position: 'right',
    children: <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Next</span>,
  },
}

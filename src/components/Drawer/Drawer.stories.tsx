import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Drawer } from './Drawer'
import { Button } from '../Button'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: ['left', 'right'] },
  },
}
export default meta

type Story = StoryObj<typeof Drawer>

export const Right: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Settings">
          <p style={{ margin: 0 }}>Drawer content from the right.</p>
        </Drawer>
      </>
    )
  },
}

export const Left: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open from left</Button>
        <Drawer open={open} onClose={() => setOpen(false)} position="left" title="Menu" width={280}>
          <p style={{ margin: 0 }}>Content from the left.</p>
        </Drawer>
      </>
    )
  },
}

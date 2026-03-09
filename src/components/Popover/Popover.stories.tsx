import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Popover } from './Popover'
import { Button } from '../Button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Controlled:** Pass `open` and `onOpenChange` to control visibility from the parent. The popover does not toggle on its own unless the parent updates state in `onOpenChange`. **Uncontrolled:** Omit `open` to let the popover toggle on trigger click.',
      },
    },
  },
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
}
export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Open</Button>,
    children: (
      <div style={{ padding: 12 }}>
        <p style={{ margin: 0, fontSize: '0.82rem' }}>Popover content here.</p>
      </div>
    ),
  },
}

export const ControlledStaysClosed: Story = {
  render: function Render() {
    return (
      <Popover
        open={false}
        onOpenChange={() => {}}
        trigger={<Button variant="primary">Controlled (stays closed)</Button>}
      >
        <div style={{ padding: 12 }}>Content</div>
      </Popover>
    )
  },
}

export const ControlledToggle: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="secondary">Toggle (controlled)</Button>}
      >
        <div style={{ padding: 12 }}>
          <p style={{ margin: 0 }}>Open/close is driven by parent state.</p>
        </div>
      </Popover>
    )
  },
}

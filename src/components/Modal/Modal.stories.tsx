import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../Button'
import { Link } from '../Link'

const meta: Meta<typeof Modal> = {
  title: 'Components/Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm"
          actions={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>OK</Button>
            </div>
          }
        >
          <p style={{ margin: 0 }}>Are you sure you want to continue?</p>
        </Modal>
      </>
    )
  },
}

export const NoTitle: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <p style={{ margin: 0 }}>Content without title.</p>
        </Modal>
      </>
    )
  },
}

export const ActionsWithLink: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Terms"
          actions={
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'center' }}>
              <span onClickCapture={(e) => { e.preventDefault(); setOpen(false) }}>
                <Link href="#">Cancel</Link>
              </span>
              <Button variant="primary" onClick={() => setOpen(false)}>Accept</Button>
            </div>
          }
        >
          <p style={{ margin: 0 }}>Actions can be links and buttons, or any other controls.</p>
        </Modal>
      </>
    )
  },
}

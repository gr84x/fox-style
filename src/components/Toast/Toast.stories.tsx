import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './Toast'
import { Button } from '../Button'

function Demo() {
  const { addToast } = useToast()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button variant="primary" onClick={() => addToast({ variant: 'info', message: 'Info message' })}>
        Info
      </Button>
      <Button variant="primary" onClick={() => addToast({ variant: 'success', message: 'Saved successfully.' })}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => addToast({ variant: 'warning', message: 'Please review.' })}>
        Warning
      </Button>
      <Button variant="ghost" onClick={() => addToast({ variant: 'error', message: 'Something went wrong.' })}>
        Error
      </Button>
    </div>
  )
}

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ToastProvider>

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
}

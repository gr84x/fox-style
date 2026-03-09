import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatInput } from '@/components/ChatInput'

describe('ChatInput', () => {
  it('renders textarea and send button with default placeholder', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)
    expect(screen.getByRole('textbox', { name: 'Message input' })).toHaveAttribute(
      'placeholder',
      'Type a message...'
    )
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()
  })

  it('send button is disabled when input is empty', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled()
  })

  it('calls onSend with trimmed content when send is clicked', async () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)
    await userEvent.type(screen.getByRole('textbox'), '  Hello  ')
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }))
    expect(onSend).toHaveBeenCalledWith('Hello')
  })

  it('clears input after send', async () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} />)
    await userEvent.type(screen.getByRole('textbox'), 'Hi')
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }))
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('applies disabled to textarea and send button', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled()
  })

  it('renders hint when provided', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} hint="Custom hint" />)
    expect(screen.getByText('Custom hint')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(<ChatInput onSend={vi.fn()} className="my-chat" />)
    expect(container.querySelector('.fs-chat-input-container')).toHaveClass('my-chat')
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from '@/components/Tooltip'

describe('Tooltip', () => {
  it('renders trigger and does not show tooltip initially', () => {
    render(
      <Tooltip content="Help text">
        <button type="button">Hover me</button>
      </Tooltip>
    )
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip with content on focus', async () => {
    render(
      <Tooltip content="Help text">
        <button type="button">Focus me</button>
      </Tooltip>
    )
    await userEvent.tab()
    expect(screen.getByRole('button', { name: 'Focus me' })).toHaveFocus()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text')
  })

  it('shows tooltip on hover', async () => {
    render(
      <Tooltip content="Hover help">
        <span>Trigger</span>
      </Tooltip>
    )
    await userEvent.hover(screen.getByText('Trigger'))
    expect(screen.getByRole('tooltip')).toHaveTextContent('Hover help')
  })

  it('hides tooltip on blur', async () => {
    render(
      <Tooltip content="Help">
        <button type="button">Btn</button>
      </Tooltip>
    )
    await userEvent.tab()
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    await userEvent.tab()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('renders tooltip in portal', async () => {
    render(
      <Tooltip content="Portal content">
        <button type="button">Trigger</button>
      </Tooltip>
    )
    await userEvent.tab()
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip.closest('body')).toBe(document.body)
    expect(document.body.querySelector('.fs-tooltip')).toBeInTheDocument()
  })

  it('applies position class', async () => {
    render(
      <Tooltip content="Tip" position="bottom">
        <button type="button">Trigger</button>
      </Tooltip>
    )
    await userEvent.tab()
    expect(document.body.querySelector('.fs-tooltip--bottom')).toBeInTheDocument()
  })
})

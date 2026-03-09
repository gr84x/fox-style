import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionItem } from '@/components/Accordion'

describe('Accordion', () => {
  it('renders items with panels hidden by default', () => {
    render(
      <Accordion>
        <AccordionItem value="one" title="One">
          Content one
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole('button', { name: /one/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    const panel = document.getElementById('fs-accordion-panel-one')
    expect(panel).toHaveAttribute('hidden')
    expect(panel).toHaveAttribute('role', 'region')
  })

  it('opens panel when trigger is clicked', async () => {
    render(
      <Accordion>
        <AccordionItem value="a" title="Section A">
          Content A
        </AccordionItem>
      </Accordion>
    )
    await userEvent.click(screen.getByRole('button', { name: /section a/i }))
    expect(screen.getByRole('button', { name: /section a/i })).toHaveAttribute('aria-expanded', 'true')
    const panel = document.getElementById('fs-accordion-panel-a')
    expect(panel).not.toHaveAttribute('hidden')
    expect(screen.getByText('Content A')).toBeVisible()
  })

  it('closes panel when trigger is clicked again', async () => {
    render(
      <Accordion>
        <AccordionItem value="a" title="Section A">
          Content A
        </AccordionItem>
      </Accordion>
    )
    const trigger = screen.getByRole('button', { name: /section a/i })
    await userEvent.click(trigger)
    await userEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('fs-accordion-panel-a')).toHaveAttribute('hidden')
  })

  it('opens only one panel at a time when allowMultiple is false', async () => {
    render(
      <Accordion>
        <AccordionItem value="1" title="First">
          First content
        </AccordionItem>
        <AccordionItem value="2" title="Second">
          Second content
        </AccordionItem>
      </Accordion>
    )
    await userEvent.click(screen.getByRole('button', { name: /first/i }))
    expect(screen.getByRole('button', { name: /first/i })).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(screen.getByRole('button', { name: /second/i }))
    expect(screen.getByRole('button', { name: /second/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /first/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('allows multiple panels open when allowMultiple is true', async () => {
    render(
      <Accordion allowMultiple>
        <AccordionItem value="1" title="First">
          First content
        </AccordionItem>
        <AccordionItem value="2" title="Second">
          Second content
        </AccordionItem>
      </Accordion>
    )
    await userEvent.click(screen.getByRole('button', { name: /first/i }))
    await userEvent.click(screen.getByRole('button', { name: /second/i }))
    expect(screen.getByRole('button', { name: /first/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /second/i })).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById('fs-accordion-panel-1')).not.toHaveAttribute('hidden')
    expect(document.getElementById('fs-accordion-panel-2')).not.toHaveAttribute('hidden')
  })

  it('merges custom className on accordion root', () => {
    const { container } = render(
      <Accordion className="my-accordion">
        <AccordionItem value="x" title="X">
          Y
        </AccordionItem>
      </Accordion>
    )
    expect(container.querySelector('.fs-accordion')).toHaveClass('my-accordion')
  })
})

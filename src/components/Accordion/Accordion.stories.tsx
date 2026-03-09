import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Purpose:** Accordion lets users expand and collapse sections of content so only one (or a few) sections are visible at a time, reducing scroll and focusing attention. **Use cases:** FAQs, settings groups, "How it works" steps, filters/options panels, terms and conditions, multi-section forms where only one section is active. Use when you have multiple blocks of content and want to avoid long scrolling or overwhelming the user.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="a" title="Section A">
        <p style={{ margin: 0 }}>Content for section A.</p>
      </AccordionItem>
      <AccordionItem value="b" title="Section B">
        <p style={{ margin: 0 }}>Content for section B.</p>
      </AccordionItem>
      <AccordionItem value="c" title="Section C">
        <p style={{ margin: 0 }}>Content for section C.</p>
      </AccordionItem>
    </Accordion>
  ),
}

export const AllowMultiple: Story = {
  render: () => (
    <Accordion allowMultiple>
      <AccordionItem value="1" title="First">
        <p style={{ margin: 0 }}>First panel content.</p>
      </AccordionItem>
      <AccordionItem value="2" title="Second">
        <p style={{ margin: 0 }}>Second panel content.</p>
      </AccordionItem>
    </Accordion>
  ),
}

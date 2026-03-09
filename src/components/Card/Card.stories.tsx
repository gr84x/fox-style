import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: { padded: { control: 'boolean' } },
}
export default meta

type Story = StoryObj<typeof Card>

export const Padded: Story = {
  args: {
    padded: true,
    children: 'Card content with default padding. Use for panels and content blocks.',
  },
}

export const NoPadding: Story = {
  args: {
    padded: false,
    children: (
      <div style={{ padding: '16px' }}>
        Card with padded: false. Add your own padding or inner structure.
      </div>
    ),
  },
}

export const WithHeading: Story = {
  args: {
    children: (
      <>
        <h3 className="fs-card-title">Section title</h3>
        <p className="fs-card-body">
          Body text inside the card. Uses design tokens for consistent typography.
        </p>
      </>
    ),
  },
}

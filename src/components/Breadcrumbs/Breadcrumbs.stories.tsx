import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Current project' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Docs', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'Breadcrumbs' },
    ],
    separator: '›',
  },
}

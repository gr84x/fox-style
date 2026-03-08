import type { Meta, StoryObj } from '@storybook/react'
import { Loader } from './Loader'

const allAnimations = ['binary', 'gray-code', 'ripple', 'sparkle', 'fill-drain', 'life', 'wave'] as const

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    animation: { control: 'select', options: [...allAnimations] },
    layout: { control: 'select', options: ['grid', 'row'] },
    inline: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: { label: 'Loading' },
}

export const Binary: Story = {
  args: { animation: 'binary', label: 'Binary count' },
}

export const GrayCode: Story = {
  args: { animation: 'gray-code', label: 'Gray code' },
}

export const Ripple: Story = {
  args: { animation: 'ripple', label: 'Ripple' },
}

export const Sparkle: Story = {
  args: { animation: 'sparkle', label: 'Sparkle' },
}

export const FillDrain: Story = {
  args: { animation: 'fill-drain', label: 'Fill & drain' },
}

export const Life: Story = {
  args: { animation: 'life', label: 'Game of Life' },
}

export const Wave: Story = {
  args: { animation: 'wave', label: 'Wave' },
}

export const Inline: Story = {
  args: { label: 'Loading', inline: true },
}

export const Row: Story = {
  args: { layout: 'row', label: 'Processing' },
}

export const AllAnimations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {allAnimations.map((animation) => (
        <div key={animation} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Loader animation={animation} label="" />
          <span style={{ fontFamily: 'var(--fs-font-sans)', fontSize: '0.85rem', color: 'var(--fs-text-secondary)' }}>
            {animation}
          </span>
        </div>
      ))}
    </div>
  ),
}

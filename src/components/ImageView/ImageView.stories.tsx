import type { Meta, StoryObj } from '@storybook/react'
import { ImageView } from './ImageView'

const meta: Meta<typeof ImageView> = {
  title: 'Components/Data/ImageView',
  component: ImageView,
  tags: ['autodocs'],
  argTypes: {
    objectFit: { control: 'select', options: ['contain', 'cover', 'fill', 'none'] },
  },
}
export default meta

type Story = StoryObj<typeof ImageView>

const sampleSrc = 'https://picsum.photos/320/200'

export const Default: Story = {
  args: {
    src: sampleSrc,
    alt: 'Sample image',
  },
}

export const ObjectFitContain: Story = {
  args: {
    src: sampleSrc,
    alt: 'Sample image',
    objectFit: 'contain',
  },
}

export const ObjectFitFill: Story = {
  args: {
    src: sampleSrc,
    alt: 'Sample image',
    objectFit: 'fill',
  },
}

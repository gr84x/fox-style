import type { Meta, StoryObj } from '@storybook/react'
import { VideoViewer } from './VideoViewer'

const meta: Meta<typeof VideoViewer> = {
  title: 'Components/Data/VideoViewer',
  component: VideoViewer,
  tags: ['autodocs'],
  argTypes: {
    controls: { control: 'boolean' },
    autoPlay: { control: 'boolean' },
    muted: { control: 'boolean' },
    loop: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof VideoViewer>

const sampleSrc = 'https://www.w3schools.com/html/mov_bbb.mp4'

export const Default: Story = {
  args: {
    src: sampleSrc,
  },
}

export const WithPoster: Story = {
  args: {
    src: sampleSrc,
    poster: 'https://picsum.photos/320/180',
  },
}

export const AutoplayMuted: Story = {
  args: {
    src: sampleSrc,
    autoPlay: true,
    muted: true,
  },
}

export const Loop: Story = {
  args: {
    src: sampleSrc,
    loop: true,
  },
}

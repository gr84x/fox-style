import type { Meta, StoryObj } from '@storybook/react'
import { AudioPlayer } from './AudioPlayer'

const meta: Meta<typeof AudioPlayer> = {
  title: 'Components/Data/AudioPlayer',
  component: AudioPlayer,
  tags: ['autodocs'],
  argTypes: {
    autoPlay: { control: 'boolean' },
    loop: { control: 'boolean' },
    volume: { control: 'boolean' },
    speed: { control: 'boolean' },
    skip: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof AudioPlayer>

const sampleSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export const Default: Story = {
  args: {
    src: sampleSrc,
  },
}

export const Autoplay: Story = {
  args: {
    src: sampleSrc,
    autoPlay: true,
  },
}

export const Loop: Story = {
  args: {
    src: sampleSrc,
    loop: true,
  },
}

export const WithVolume: Story = {
  args: {
    src: sampleSrc,
    volume: true,
  },
}

export const WithSpeed: Story = {
  args: {
    src: sampleSrc,
    speed: true,
  },
}

export const WithSkip: Story = {
  args: {
    src: sampleSrc,
    skip: true,
  },
}

export const AllControls: Story = {
  args: {
    src: sampleSrc,
    volume: true,
    speed: true,
    skip: true,
  },
}

export const CustomSkipSeconds: Story = {
  args: {
    src: sampleSrc,
    skip: true,
    skipSeconds: 15,
  },
}

export const CustomPlaybackRates: Story = {
  args: {
    src: sampleSrc,
    speed: true,
    playbackRates: [0.5, 1, 1.5, 2],
  },
}

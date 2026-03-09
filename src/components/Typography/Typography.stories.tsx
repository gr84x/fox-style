import type { Meta, StoryObj } from '@storybook/react'
import { Heading, Text, Code } from './Typography'

const meta: Meta<typeof Heading> = {
  title: 'Components/Typography',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
  },
}
export default meta

type HeadingStory = StoryObj<typeof Heading>

export const HeadingLevels: HeadingStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ),
}

export const TextVariants: StoryObj<typeof Text> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text variant="primary">Primary body text.</Text>
      <Text variant="secondary">Secondary muted text.</Text>
      <Text variant="tertiary">Tertiary hint text.</Text>
      <p>
        Inline <Code>code</Code> in a sentence.
      </p>
    </div>
  ),
}

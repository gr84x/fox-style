import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { VideoUpload } from './VideoUpload'
import { FormField } from '../FormField'

const meta: Meta<typeof VideoUpload> = {
  title: 'Components/Forms/VideoUpload',
  component: VideoUpload,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    preview: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof VideoUpload>

export const Default: Story = {
  render: function Render() {
    const [file, setFile] = useState<File | null>(null)
    return (
      <VideoUpload value={file} onChange={setFile} />
    )
  },
}

export const WithFormField: Story = {
  render: function Render() {
    const [file, setFile] = useState<File | null>(null)
    return (
      <FormField label="Video" hint="MP4 or WebM, max 50MB">
        <VideoUpload value={file} onChange={setFile} maxSize={50 * 1024 * 1024} />
      </FormField>
    )
  },
}

export const NoPreview: Story = {
  render: function Render() {
    const [file, setFile] = useState<File | null>(null)
    return (
      <VideoUpload value={file} onChange={setFile} preview={false} />
    )
  },
}

export const Disabled: Story = {
  args: { value: null, onChange: () => {}, disabled: true },
}

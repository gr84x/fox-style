import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ImageUpload } from './ImageUpload'
import { FormField } from '../FormField'

const meta: Meta<typeof ImageUpload> = {
  title: 'Components/Forms/ImageUpload',
  component: ImageUpload,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    preview: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof ImageUpload>

export const Default: Story = {
  render: function Render() {
    const [file, setFile] = useState<File | null>(null)
    return (
      <ImageUpload value={file} onChange={setFile} />
    )
  },
}

export const WithFormField: Story = {
  render: function Render() {
    const [file, setFile] = useState<File | null>(null)
    return (
      <FormField label="Avatar" hint="PNG or JPG, max 2MB">
        <ImageUpload value={file} onChange={setFile} maxSize={2 * 1024 * 1024} />
      </FormField>
    )
  },
}

export const NoPreview: Story = {
  render: function Render() {
    const [file, setFile] = useState<File | null>(null)
    return (
      <ImageUpload value={file} onChange={setFile} preview={false} />
    )
  },
}

export const Disabled: Story = {
  args: { value: null, onChange: () => {}, disabled: true },
}

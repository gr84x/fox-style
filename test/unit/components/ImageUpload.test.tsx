import { render, screen, fireEvent } from '@testing-library/react'
import { ImageUpload } from '@/components/ImageUpload'

describe('ImageUpload', () => {
  it('renders file input and label', () => {
    const onChange = vi.fn()
    render(<ImageUpload value={null} onChange={onChange} />)
    const fileInput = document.querySelector('.fs-image-upload-input') as HTMLInputElement
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).toHaveAttribute('accept', 'image/*')
    expect(screen.getByText('Choose image…')).toBeInTheDocument()
  })

  it('calls onChange with null when clear is clicked', async () => {
    const onChange = vi.fn()
    const file = new File(['x'], 'test.png', { type: 'image/png' })
    render(<ImageUpload value={file} onChange={onChange} />)
    const clearBtn = screen.getByRole('button', { name: 'Remove image' })
    clearBtn.click()
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('applies disabled to input', () => {
    const onChange = vi.fn()
    render(<ImageUpload value={null} onChange={onChange} disabled />)
    const fileInput = document.querySelector('.fs-image-upload-input')
    expect(fileInput).toBeDisabled()
  })

  it('uses custom aria-label when provided', () => {
    const onChange = vi.fn()
    render(<ImageUpload value={null} onChange={onChange} aria-label="Upload photo" />)
    const input = document.querySelector('.fs-image-upload-input')
    expect(input).toHaveAttribute('aria-label', 'Upload photo')
  })

  it('calls onChange when file is selected', () => {
    const onChange = vi.fn()
    const file = new File(['content'], 'pic.png', { type: 'image/png' })
    render(<ImageUpload value={null} onChange={onChange} />)
    const input = document.querySelector('.fs-image-upload-input') as HTMLInputElement
    fireEvent.change(input, { target: { files: [file] } })
    expect(onChange).toHaveBeenCalledWith(file)
  })

  it('merges custom className', () => {
    const { container } = render(
      <ImageUpload value={null} onChange={vi.fn()} className="my-upload" />
    )
    expect(container.querySelector('.fs-image-upload')).toHaveClass('my-upload')
  })
})

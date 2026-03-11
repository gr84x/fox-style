import { render, screen, fireEvent } from '@testing-library/react'
import { VideoUpload } from '@/components/VideoUpload'

describe('VideoUpload', () => {
  it('renders file input and label', () => {
    const onChange = vi.fn()
    render(<VideoUpload value={null} onChange={onChange} />)
    const fileInput = document.querySelector('.fs-video-upload-input') as HTMLInputElement
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).toHaveAttribute('accept', 'video/*')
    expect(screen.getByText('Choose video…')).toBeInTheDocument()
  })

  it('calls onChange with null when clear is clicked', () => {
    const onChange = vi.fn()
    const file = new File(['x'], 'test.mp4', { type: 'video/mp4' })
    render(<VideoUpload value={file} onChange={onChange} />)
    const clearBtn = screen.getByRole('button', { name: 'Remove video' })
    clearBtn.click()
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('applies disabled to input', () => {
    const onChange = vi.fn()
    render(<VideoUpload value={null} onChange={onChange} disabled />)
    const fileInput = document.querySelector('.fs-video-upload-input')
    expect(fileInput).toBeDisabled()
  })

  it('uses custom aria-label when provided', () => {
    const onChange = vi.fn()
    render(<VideoUpload value={null} onChange={onChange} aria-label="Upload clip" />)
    const input = document.querySelector('.fs-video-upload-input')
    expect(input).toHaveAttribute('aria-label', 'Upload clip')
  })

  it('calls onChange when file is selected', () => {
    const onChange = vi.fn()
    const file = new File(['content'], 'clip.mp4', { type: 'video/mp4' })
    render(<VideoUpload value={null} onChange={onChange} />)
    const input = document.querySelector('.fs-video-upload-input') as HTMLInputElement
    fireEvent.change(input, { target: { files: [file] } })
    expect(onChange).toHaveBeenCalledWith(file)
  })

  it('rejects file over maxSize', () => {
    const onChange = vi.fn()
    const file = new File(['x'.repeat(100)], 'big.mp4', { type: 'video/mp4' })
    render(<VideoUpload value={null} onChange={onChange} maxSize={50} />)
    const input = document.querySelector('.fs-video-upload-input') as HTMLInputElement
    fireEvent.change(input, { target: { files: [file] } })
    expect(onChange).toHaveBeenCalledWith(null)
  })

  it('merges custom className', () => {
    const { container } = render(
      <VideoUpload value={null} onChange={vi.fn()} className="my-upload" />
    )
    expect(container.querySelector('.fs-video-upload')).toHaveClass('my-upload')
  })
})

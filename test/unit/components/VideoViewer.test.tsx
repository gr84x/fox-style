import { render, screen } from '@testing-library/react'
import { VideoViewer } from '@/components/VideoViewer'

describe('VideoViewer', () => {
  it('renders video with src', () => {
    render(<VideoViewer src="https://example.com/video.mp4" />)
    const video = document.querySelector('.fs-video-viewer-video') as HTMLVideoElement
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', 'https://example.com/video.mp4')
  })

  it('passes poster and controls', () => {
    render(
      <VideoViewer
        src="/v.mp4"
        poster="/poster.jpg"
        controls
      />
    )
    const video = document.querySelector('.fs-video-viewer-video') as HTMLVideoElement
    expect(video).toHaveAttribute('poster', '/poster.jpg')
    expect(video).toHaveAttribute('controls')
  })

  it('respects controls false', () => {
    render(<VideoViewer src="/v.mp4" controls={false} />)
    const video = document.querySelector('.fs-video-viewer-video') as HTMLVideoElement
    expect(video).not.toHaveAttribute('controls')
  })

  it('merges custom className', () => {
    const { container } = render(
      <VideoViewer src="/v.mp4" className="my-viewer" />
    )
    expect(container.querySelector('.fs-video-viewer')).toHaveClass('my-viewer')
  })

  it('calls onPlay when video plays', () => {
    const onPlay = vi.fn()
    render(<VideoViewer src="/v.mp4" onPlay={onPlay} />)
    const video = document.querySelector('.fs-video-viewer-video') as HTMLVideoElement
    video.dispatchEvent(new Event('play'))
    expect(onPlay).toHaveBeenCalled()
  })
})

import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AudioPlayer } from '@/components/AudioPlayer'

describe('AudioPlayer', () => {
  it('renders audio element with src', () => {
    render(<AudioPlayer src="https://example.com/audio.mp3" />)
    const audio = document.querySelector('audio')
    expect(audio).toBeInTheDocument()
    expect(audio).toHaveAttribute('src', 'https://example.com/audio.mp3')
  })

  it('renders play button and time display', () => {
    render(<AudioPlayer src="/test.mp3" />)
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
    expect(screen.getByText(/0:00 \/ 0:00/)).toBeInTheDocument()
  })

  it('has region with aria-label', () => {
    render(<AudioPlayer src="/test.mp3" />)
    expect(screen.getByRole('region', { name: 'Audio player' })).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(
      <AudioPlayer src="/test.mp3" className="my-player" />
    )
    expect(container.querySelector('.fs-audio-player')).toHaveClass('my-player')
  })

  it('shows Pause button when audio fires play event', async () => {
    render(<AudioPlayer src="/test.mp3" />)
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
    const audio = document.querySelector('audio')
    expect(audio).toBeInTheDocument()
    await act(() => {
      audio?.dispatchEvent(new Event('play'))
    })
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
  })

  it('has seek range input', () => {
    render(<AudioPlayer src="/test.mp3" />)
    const seek = screen.getByRole('slider', { name: 'Seek' })
    expect(seek).toBeInTheDocument()
    expect(seek).toHaveAttribute('type', 'range')
  })

  it('does not render volume, speed, or skip controls by default', () => {
    render(<AudioPlayer src="/test.mp3" />)
    expect(screen.queryByLabelText(/Volume/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Playback speed')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Skip backward/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Skip forward/)).not.toBeInTheDocument()
  })

  it('renders volume slider when volume is true', () => {
    render(<AudioPlayer src="/test.mp3" volume />)
    const volume = screen.getByLabelText(/Volume/)
    expect(volume).toBeInTheDocument()
    expect(volume).toHaveAttribute('type', 'range')
  })

  it('renders speed select when speed is true', () => {
    render(<AudioPlayer src="/test.mp3" speed />)
    expect(screen.getByLabelText('Playback speed')).toBeInTheDocument()
  })

  it('renders skip buttons when skip is true', () => {
    render(<AudioPlayer src="/test.mp3" skip />)
    expect(screen.getByRole('button', { name: 'Skip backward 10 seconds' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Skip forward 10 seconds' })).toBeInTheDocument()
  })

  it('uses custom skip seconds for skip button labels', () => {
    render(<AudioPlayer src="/test.mp3" skip skipSeconds={15} />)
    expect(screen.getByRole('button', { name: 'Skip backward 15 seconds' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Skip forward 15 seconds' })).toBeInTheDocument()
  })

  it('skip backward seeks by configured seconds', async () => {
    render(<AudioPlayer src="/test.mp3" skip skipSeconds={10} />)
    const audio = document.querySelector('audio') as HTMLAudioElement
    Object.defineProperty(audio, 'currentTime', { value: 25, writable: true })
    await userEvent.click(screen.getByRole('button', { name: 'Skip backward 10 seconds' }))
    expect(audio.currentTime).toBe(15)
  })

  it('skip forward seeks by configured seconds', async () => {
    render(<AudioPlayer src="/test.mp3" skip skipSeconds={10} />)
    const audio = document.querySelector('audio') as HTMLAudioElement
    Object.defineProperty(audio, 'currentTime', { value: 5, writable: true })
    Object.defineProperty(audio, 'duration', { value: 100, writable: true })
    await userEvent.click(screen.getByRole('button', { name: 'Skip forward 10 seconds' }))
    expect(audio.currentTime).toBe(15)
  })

  it('applies playback rate when speed option is selected', async () => {
    render(<AudioPlayer src="/test.mp3" speed />)
    const audio = document.querySelector('audio') as HTMLAudioElement
    const speedSelect = screen.getByLabelText('Playback speed')
    await userEvent.selectOptions(speedSelect, '1.5')
    expect(audio.playbackRate).toBe(1.5)
  })
})

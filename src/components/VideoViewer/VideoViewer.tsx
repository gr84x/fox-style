import type { SyntheticEvent } from 'react'

type Props = {
  /** Video URL. */
  src: string
  /** Poster image URL shown before playback. */
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  /** Show native video controls. Default true. */
  controls?: boolean
  className?: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

/**
 * Display and play video from URL. Wraps native video with design-token styling.
 */
export function VideoViewer({
  src,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  className = '',
  onPlay,
  onPause,
  onEnded,
}: Props) {
  function handlePlay(_e: SyntheticEvent<HTMLVideoElement>) {
    onPlay?.()
  }

  function handlePause(_e: SyntheticEvent<HTMLVideoElement>) {
    onPause?.()
  }

  function handleEnded(_e: SyntheticEvent<HTMLVideoElement>) {
    onEnded?.()
  }

  return (
    <div className={`fs-video-viewer ${className}`.trim()}>
      <video
        className="fs-video-viewer-video"
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />
    </div>
  )
}

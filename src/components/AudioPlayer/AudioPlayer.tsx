import { useRef, useState, useEffect } from 'react'

const DEFAULT_PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

type Props = {
  /** Audio source URL. */
  src: string
  autoPlay?: boolean
  loop?: boolean
  className?: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (currentTime: number, duration: number) => void
  /** When true, show volume slider. */
  volume?: boolean
  /** Initial volume 0–1; only used when volume is true. */
  defaultVolume?: number
  /** When true, show playback speed selector. */
  speed?: boolean
  /** Allowed playback rates when speed is true; 1 should be included for normal. */
  playbackRates?: number[]
  /** When true, show skip backward/forward buttons. */
  skip?: boolean
  /** Seconds to seek on each skip (both directions). */
  skipSeconds?: number
  /** Override for backward skip only. */
  skipBackwardSeconds?: number
  /** Override for forward skip only. */
  skipForwardSeconds?: number
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Ensures playback rates include 1x for normal playback.
 */
function normalizePlaybackRates(rates: number[]): number[] {
  const set = new Set(rates)
  if (!set.has(1)) set.add(1)
  return [...set].sort((a, b) => a - b)
}

/**
 * Audio playback widget: play/pause, progress bar, time display.
 * Optional: volume, playback speed (.5x–2x), skip forward/backward.
 * Uses native <audio> with a styled control strip.
 */
export function AudioPlayer({
  src,
  autoPlay = false,
  loop = false,
  className = '',
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  volume: showVolume = false,
  defaultVolume = 1,
  speed: showSpeed = false,
  playbackRates = DEFAULT_PLAYBACK_RATES,
  skip: showSkip = false,
  skipSeconds = 10,
  skipBackwardSeconds,
  skipForwardSeconds,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volumeLevel, setVolumeLevel] = useState(
    showVolume ? Math.max(0, Math.min(1, defaultVolume)) : 1
  )
  const [playbackRate, setPlaybackRate] = useState(1)

  const rates = normalizePlaybackRates(playbackRates)
  const backSec = skipBackwardSeconds ?? skipSeconds
  const fwdSec = skipForwardSeconds ?? skipSeconds

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const handleLoadedMetadata = () => setDuration(el.duration)
    const handleTimeUpdate = () => {
      setCurrentTime(el.currentTime)
      onTimeUpdate?.(el.currentTime, el.duration)
    }
    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }
    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      onEnded?.()
    }
    el.addEventListener('loadedmetadata', handleLoadedMetadata)
    el.addEventListener('timeupdate', handleTimeUpdate)
    el.addEventListener('play', handlePlay)
    el.addEventListener('pause', handlePause)
    el.addEventListener('ended', handleEnded)
    return () => {
      el.removeEventListener('loadedmetadata', handleLoadedMetadata)
      el.removeEventListener('timeupdate', handleTimeUpdate)
      el.removeEventListener('play', handlePlay)
      el.removeEventListener('pause', handlePause)
      el.removeEventListener('ended', handleEnded)
    }
  }, [onPlay, onPause, onEnded, onTimeUpdate])

  // Sync volume and playback rate to audio element.
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.volume = volumeLevel
  }, [volumeLevel])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.playbackRate = playbackRate
  }, [playbackRate])

  function togglePlay() {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      const p = el.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      el.pause()
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const el = audioRef.current
    const value = parseFloat(e.target.value)
    if (el && Number.isFinite(value)) {
      el.currentTime = value
      setCurrentTime(value)
    }
  }

  function handleSkipBack() {
    const el = audioRef.current
    if (!el) return
    const next = Math.max(0, el.currentTime - backSec)
    el.currentTime = next
    setCurrentTime(next)
  }

  function handleSkipForward() {
    const el = audioRef.current
    if (!el) return
    const dur =
      Number.isFinite(duration) && duration > 0 ? duration : (el.duration ?? 0)
    const maxTime = Number.isFinite(dur) && dur >= 0 ? dur : el.currentTime + fwdSec
    const next = Math.min(maxTime, el.currentTime + fwdSec)
    el.currentTime = next
    setCurrentTime(next)
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value)
    if (Number.isFinite(value)) setVolumeLevel(Math.max(0, Math.min(1, value / 100)))
  }

  function handleSpeedChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = parseFloat(e.target.value)
    if (Number.isFinite(value) && value > 0) setPlaybackRate(value)
  }

  const durationNum = Number.isFinite(duration) && duration >= 0 ? duration : 0
  const currentNum = Number.isFinite(currentTime) && currentTime >= 0 ? currentTime : 0
  const volumePercent = Math.round(volumeLevel * 100)

  return (
    <div className={`fs-audio-player ${className}`.trim()} role="region" aria-label="Audio player">
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        preload="metadata"
        aria-hidden
      />
      {showSkip && (
        <div className="fs-audio-player-skip-group">
          <button
            type="button"
            className="fs-audio-player-skip-btn"
            onClick={handleSkipBack}
            aria-label={`Skip backward ${backSec} seconds`}
          >
            −{backSec}s
          </button>
          <button
            type="button"
            className="fs-audio-player-skip-btn"
            onClick={handleSkipForward}
            aria-label={`Skip forward ${fwdSec} seconds`}
          >
            +{fwdSec}s
          </button>
        </div>
      )}
      <button
        type="button"
        className="fs-audio-player-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="fs-audio-player-progress-wrap">
        <input
          type="range"
          className="fs-audio-player-progress"
          min={0}
          max={durationNum || 100}
          step={0.1}
          value={currentNum}
          onChange={handleSeek}
          aria-label="Seek"
        />
      </div>
      <span className="fs-audio-player-time" aria-live="polite">
        {formatTime(currentNum)} / {formatTime(durationNum)}
      </span>
      {showSpeed && (
        <div className="fs-audio-player-speed-wrap">
          <select
            className="fs-audio-player-speed-select"
            value={playbackRate}
            onChange={handleSpeedChange}
            aria-label="Playback speed"
          >
            {rates.map((r) => (
              <option key={r} value={r}>
                {r === 1 ? '1×' : `${r}×`}
              </option>
            ))}
          </select>
        </div>
      )}
      {showVolume && (
        <div className="fs-audio-player-volume-wrap">
          <input
            type="range"
            className="fs-audio-player-volume"
            min={0}
            max={100}
            value={volumePercent}
            onChange={handleVolumeChange}
            aria-label={`Volume, ${volumePercent}%`}
            aria-valuetext={`${volumePercent}%`}
          />
        </div>
      )}
    </div>
  )
}

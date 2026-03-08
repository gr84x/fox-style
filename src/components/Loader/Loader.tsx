/**
 * Animated loading indicator: nine cells that animate using one of seven strategies.
 * Layout: 3×3 grid or 9×1 row. Optional label and inline (compact) mode.
 */
import { useEffect, useMemo, useRef, useState } from 'react'

export type LoaderAnimation =
  | 'binary'
  | 'gray-code'
  | 'ripple'
  | 'sparkle'
  | 'fill-drain'
  | 'life'
  | 'wave'

const CELL_COUNT = 9
const MAX_BINARY = (1 << CELL_COUNT) - 1

function intToBits(n: number): boolean[] {
  const bits: boolean[] = []
  for (let i = CELL_COUNT - 1; i >= 0; i--) {
    bits.push(((n >> i) & 1) === 1)
  }
  return bits
}

function randomSeed(): boolean[] {
  let cells: boolean[]
  do {
    cells = Array.from({ length: CELL_COUNT }, () => Math.random() > 0.5)
  } while (cells.filter(Boolean).length < 2)
  return cells
}

function countNeighbors(grid: boolean[], idx: number): number {
  const row = Math.floor(idx / 3)
  const col = idx % 3
  let count = 0
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      if (grid[((row + dr + 3) % 3) * 3 + ((col + dc + 3) % 3)]) count++
    }
  }
  return count
}

function evolveLife(grid: boolean[]): boolean[] {
  return grid.map((alive, i) => {
    const n = countNeighbors(grid, i)
    return alive ? n === 2 || n === 3 : n === 3
  })
}

type Props = {
  label?: string
  intervalMs?: number
  inline?: boolean
  layout?: 'grid' | 'row'
  animation?: LoaderAnimation
}

export function Loader({
  label,
  intervalMs = 180,
  inline = false,
  layout = 'grid',
  animation = 'binary',
}: Props) {
  const [tick, setTick] = useState(0)
  const lifeGrid = useRef(randomSeed())
  const lifePrevKey = useRef('')
  const lastLifeTick = useRef(-1)
  const sparkleCache = useRef<boolean[]>(randomSeed())
  const lastSparkleTick = useRef(-1)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  const cells = useMemo((): boolean[] => {
    switch (animation) {
      case 'gray-code': {
        const n = tick % (MAX_BINARY + 1)
        return intToBits(n ^ (n >> 1))
      }
      case 'ripple': {
        const pos = tick % CELL_COUNT
        return Array.from({ length: CELL_COUNT }, (_, i) =>
          i === pos ||
          i === (pos - 1 + CELL_COUNT) % CELL_COUNT ||
          i === (pos - 2 + CELL_COUNT) % CELL_COUNT
        )
      }
      case 'sparkle': {
        if (tick !== lastSparkleTick.current) {
          lastSparkleTick.current = tick
          sparkleCache.current = Array.from({ length: CELL_COUNT }, () => Math.random() > 0.5)
        }
        return sparkleCache.current
      }
      case 'fill-drain': {
        const cycle = tick % (CELL_COUNT * 2)
        if (cycle < CELL_COUNT) {
          return Array.from({ length: CELL_COUNT }, (_, i) => i <= cycle)
        }
        const drained = cycle - CELL_COUNT + 1
        return Array.from({ length: CELL_COUNT }, (_, i) => i >= drained)
      }
      case 'life': {
        if (tick !== lastLifeTick.current) {
          lastLifeTick.current = tick
          const next = evolveLife(lifeGrid.current)
          const key = next.map((b) => (b ? '1' : '0')).join('')
          if (key === lifePrevKey.current || next.every((b) => !b)) {
            lifeGrid.current = randomSeed()
            lifePrevKey.current = ''
          } else {
            lifeGrid.current = next
            lifePrevKey.current = key
          }
        }
        return lifeGrid.current
      }
      case 'wave':
        return Array.from({ length: CELL_COUNT }, (_, i) =>
          Math.sin(tick * 0.4 - i * 0.7) > 0.3
        )
      case 'binary':
      default:
        return intToBits(tick % (MAX_BINARY + 1))
    }
  }, [tick, animation])

  const gridClass = layout === 'row' ? 'fs-loader-grid fs-loader-grid--row' : 'fs-loader-grid'

  return (
    <div
      className={`fs-loader ${inline ? 'fs-loader--inline' : ''}`}
      role="status"
      aria-label={label ?? 'Loading'}
    >
      <div className={gridClass}>
        {cells.map((on, i) => (
          <span key={i} className={`fs-loader-cell${on ? ' fs-loader-cell--on' : ''}`} />
        ))}
      </div>
      {label && <span className="fs-loader-label">{label}</span>}
    </div>
  )
}

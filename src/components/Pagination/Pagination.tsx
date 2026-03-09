type Props = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  /** Number of page buttons to show on each side of current (e.g. 1 = prev, current, next). */
  siblingCount?: number
  className?: string
  'aria-label'?: string
}

/**
 * Page navigation: prev/next and page number buttons.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
  'aria-label': ariaLabel = 'Pagination',
}: Props) {
  const hasPrev = page > 1
  const hasNext = page < totalPages

  const start = Math.max(1, page - siblingCount)
  const end = Math.min(totalPages, page + siblingCount)
  const pages: number[] = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className={`fs-pagination ${className}`.trim()} aria-label={ariaLabel}>
      <ul className="fs-pagination-list">
        <li>
          <button
            type="button"
            className="fs-pagination-btn fs-pagination-btn--prev"
            disabled={!hasPrev}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            ‹
          </button>
        </li>
        {pages.map((p) => (
          <li key={p}>
            <button
              type="button"
              className={`fs-pagination-btn ${p === page ? 'fs-pagination-btn--active' : ''}`}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="fs-pagination-btn fs-pagination-btn--next"
            disabled={!hasNext}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  )
}

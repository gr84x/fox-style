export type BreadcrumbItem = {
  label: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
  separator?: string
  className?: string
}

/**
 * Breadcrumb trail. Last item is current page (no link). Uses nav and aria.
 */
export function Breadcrumbs({ items, separator = '/', className = '' }: Props) {
  if (items.length === 0) return null

  return (
    <nav className={`fs-breadcrumbs ${className}`.trim()} aria-label="Breadcrumb">
      <ol className="fs-breadcrumbs-list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="fs-breadcrumbs-item">
              {isLast ? (
                <span className="fs-breadcrumbs-current" aria-current="page">{item.label}</span>
              ) : item.href != null ? (
                <a href={item.href} className="fs-breadcrumbs-link">{item.label}</a>
              ) : (
                <span className="fs-breadcrumbs-label">{item.label}</span>
              )}
              {!isLast && <span className="fs-breadcrumbs-sep" aria-hidden>{separator}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

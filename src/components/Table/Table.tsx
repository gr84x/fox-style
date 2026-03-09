import type { ReactNode } from 'react'

export type TableColumn<T> = {
  key: keyof T | string
  header: string
  width?: string | number
}

type Props<T extends Record<string, unknown>> = {
  columns: TableColumn<T>[]
  data: T[]
  onSort?: (key: keyof T | string) => void
  onRowClick?: (row: T, index: number) => void
  className?: string
}

/**
 * Simple data table. Optional sortable headers and row click.
 */
export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  onSort,
  onRowClick,
  className = '',
}: Props<T>) {
  function getCellValue(row: T, key: keyof T | string): ReactNode {
    const v = row[key as keyof T]
    return v != null ? String(v) : ''
  }

  return (
    <div className={`fs-table-wrap ${className}`.trim()}>
      <table className="fs-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={onSort ? 'fs-table-th--sortable' : ''}
                style={col.width != null ? { width: typeof col.width === 'number' ? `${col.width}px` : col.width } : undefined}
                scope="col"
                onClick={onSort ? () => onSort(col.key) : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={onRowClick ? 'fs-table-tr--clickable' : ''}
              onClick={onRowClick ? () => onRowClick(row, i) : undefined}
            >
              {columns.map((col) => (
                <td key={String(col.key)}>{getCellValue(row, col.key)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

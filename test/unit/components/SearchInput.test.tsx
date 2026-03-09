import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from '@/components/SearchInput'

describe('SearchInput', () => {
  it('renders with default placeholder and aria-label', () => {
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)
    const input = screen.getByRole('searchbox', { name: 'Search' })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Search…')
    expect(input).toHaveValue('')
  })

  it('displays controlled value', () => {
    const onChange = vi.fn()
    render(<SearchInput value="query" onChange={onChange} />)
    expect(screen.getByRole('searchbox')).toHaveValue('query')
  })

  it('calls onChange with new value when user types', async () => {
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)
    await userEvent.type(screen.getByRole('searchbox'), 'x')
    expect(onChange).toHaveBeenCalledWith('x')
  })

  it('applies disabled', () => {
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} disabled />)
    expect(screen.getByRole('searchbox')).toBeDisabled()
  })

  it('uses custom placeholder and aria-label when provided', () => {
    const onChange = vi.fn()
    render(
      <SearchInput
        value=""
        onChange={onChange}
        placeholder="Filter…"
        aria-label="Filter list"
      />
    )
    const input = screen.getByRole('searchbox', { name: 'Filter list' })
    expect(input).toHaveAttribute('placeholder', 'Filter…')
  })

  it('merges custom className on wrapper', () => {
    const onChange = vi.fn()
    const { container } = render(<SearchInput value="" onChange={onChange} className="my-search" />)
    expect(container.querySelector('.fs-search-wrap')).toHaveClass('my-search')
  })
})

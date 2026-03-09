import { render, screen, fireEvent } from '@testing-library/react'
import { Slider } from '@/components/Slider'

describe('Slider', () => {
  it('renders with value and slider role', () => {
    const onChange = vi.fn()
    render(<Slider value={50} onChange={onChange} />)
    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
    expect(slider).toHaveValue('50')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '100')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
  })

  it('calls onChange with number when value changes', () => {
    const onChange = vi.fn()
    render(<Slider value={50} onChange={onChange} min={0} max={100} />)
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '75' } })
    expect(onChange).toHaveBeenCalledWith(75)
  })

  it('applies min, max, and step', () => {
    const onChange = vi.fn()
    render(<Slider value={5} onChange={onChange} min={0} max={10} step={1} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '10')
    expect(slider).toHaveAttribute('step', '1')
  })

  it('applies disabled', () => {
    const onChange = vi.fn()
    render(<Slider value={0} onChange={onChange} disabled />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })

  it('applies aria-label when provided', () => {
    const onChange = vi.fn()
    render(<Slider value={0} onChange={onChange} aria-label="Volume" />)
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const onChange = vi.fn()
    render(<Slider value={0} onChange={onChange} className="my-slider" />)
    expect(screen.getByRole('slider')).toHaveClass('my-slider')
  })
})

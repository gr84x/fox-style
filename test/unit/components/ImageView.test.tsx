import { render, screen } from '@testing-library/react'
import { ImageView } from '@/components/ImageView'

describe('ImageView', () => {
  it('renders img with src and alt', () => {
    render(<ImageView src="https://example.com/img.png" alt="Example image" />)
    const img = screen.getByRole('img', { name: 'Example image' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/img.png')
    expect(img).toHaveAttribute('alt', 'Example image')
  })

  it('applies objectFit via style', () => {
    render(
      <ImageView
        src="/test.jpg"
        alt="Test"
        objectFit="contain"
      />
    )
    const img = screen.getByRole('img')
    expect(img).toHaveStyle({ objectFit: 'contain' })
  })

  it('merges custom className on container', () => {
    const { container } = render(
      <ImageView src="/a" alt="A" className="my-view" />
    )
    expect(container.querySelector('.fs-image-view')).toHaveClass('my-view')
  })

  it('uses cover as default objectFit', () => {
    render(<ImageView src="/x" alt="X" />)
    const img = screen.getByRole('img')
    expect(img).toHaveStyle({ objectFit: 'cover' })
  })
})

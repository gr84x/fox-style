import { render, screen } from '@testing-library/react'
import { Heading, Text, Code } from '@/components/Typography'

describe('Heading', () => {
  it('renders h1 by default with level 1 class', () => {
    render(<Heading>Title</Heading>)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Title')
    expect(h1).toHaveClass('fs-heading', 'fs-heading--1')
  })

  it('renders correct tag for level 2–6', () => {
    const { rerender } = render(<Heading level={2}>Sub</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('fs-heading--2')

    rerender(<Heading level={6}>Small</Heading>)
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent('Small')
  })

  it('merges custom className', () => {
    render(<Heading className="my-heading">X</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('my-heading')
  })
})

describe('Text', () => {
  it('renders as p with primary variant by default', () => {
    render(<Text>Paragraph</Text>)
    const p = screen.getByText('Paragraph')
    expect(p.tagName).toBe('P')
    expect(p).toHaveClass('fs-text', 'fs-text--primary')
  })

  it('renders as span when as is span', () => {
    render(<Text as="span">Inline</Text>)
    expect(screen.getByText('Inline').tagName).toBe('SPAN')
  })

  it('applies secondary and tertiary variant classes', () => {
    const { rerender } = render(<Text variant="secondary">Sec</Text>)
    expect(screen.getByText('Sec')).toHaveClass('fs-text--secondary')

    rerender(<Text variant="tertiary">Ter</Text>)
    expect(screen.getByText('Ter')).toHaveClass('fs-text--tertiary')
  })

  it('merges custom className', () => {
    render(<Text className="my-text">X</Text>)
    expect(screen.getByText('X')).toHaveClass('my-text')
  })
})

describe('Code', () => {
  it('renders code element with children', () => {
    render(<Code>const x = 1</Code>)
    const code = screen.getByText('const x = 1')
    expect(code.tagName).toBe('CODE')
    expect(code).toHaveClass('fs-code')
  })

  it('merges custom className', () => {
    render(<Code className="my-code">x</Code>)
    expect(screen.getByText('x')).toHaveClass('my-code')
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabList, Tab, TabPanel } from '@/components/Tabs'

describe('Tabs', () => {
  it('renders tablist and first tab selected when defaultValue is set', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Panel 1</TabPanel>
        <TabPanel value="tab2">Panel 2</TabPanel>
      </Tabs>
    )
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 1', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 2', selected: false })).toBeInTheDocument()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel 1')
  })

  it('switches panel when different tab is clicked (uncontrolled)', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Panel 1</TabPanel>
        <TabPanel value="tab2">Panel 2</TabPanel>
      </Tabs>
    )
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByRole('tab', { name: 'Tab 2', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel 2')
  })

  it('calls onChange when tab is selected', async () => {
    const onChange = vi.fn()
    render(
      <Tabs defaultValue="tab1" onChange={onChange}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Panel 1</TabPanel>
        <TabPanel value="tab2">Panel 2</TabPanel>
      </Tabs>
    )
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  it('respects controlled value when value prop is set', () => {
    const onChange = vi.fn()
    render(
      <Tabs value="tab2" onChange={onChange}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Panel 1</TabPanel>
        <TabPanel value="tab2">Panel 2</TabPanel>
      </Tabs>
    )
    expect(screen.getByRole('tab', { name: 'Tab 2', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel 2')
  })

  it('merges custom className on tabs root', () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <TabList>
          <Tab value="a">A</Tab>
        </TabList>
        <TabPanel value="a">Content</TabPanel>
      </Tabs>
    )
    expect(container.querySelector('.fs-tabs')).toHaveClass('fs-tabs')
  })
})

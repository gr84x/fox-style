import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabList, Tab, TabPanel } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: function Render() {
    return (
      <Tabs defaultValue="one">
        <TabList style={{ marginBottom: 12 }}>
          <Tab value="one">One</Tab>
          <Tab value="two">Two</Tab>
          <Tab value="three">Three</Tab>
        </TabList>
        <TabPanel value="one"><p style={{ margin: 0 }}>Content one</p></TabPanel>
        <TabPanel value="two"><p style={{ margin: 0 }}>Content two</p></TabPanel>
        <TabPanel value="three"><p style={{ margin: 0 }}>Content three</p></TabPanel>
      </Tabs>
    )
  },
}

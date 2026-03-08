import type { Preview } from '@storybook/react'
import '../src/tokens/theme.css'
import '../src/components/components.css'

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0c0c0c' },
        { name: 'surface', value: '#141414' },
      ],
    },
    layout: 'centered',
  },
}

export default preview

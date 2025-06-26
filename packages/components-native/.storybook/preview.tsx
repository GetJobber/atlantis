import type { Preview } from '@storybook/react-vite'
import { AtlantisThemeContextProvider } from '../src/AtlantisThemeContext';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <AtlantisThemeContextProvider>
        <Story />
      </AtlantisThemeContextProvider>
    ),
  ],
};

export default preview;
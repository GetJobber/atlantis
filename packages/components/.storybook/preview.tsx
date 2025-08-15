import React from "react";
import type { Preview } from '@storybook/react-vite'
import "../../design/dist/foundation.css";
import "../../design/dist/dark.mode.css";
import { SBProvider } from './components/SBProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
      expanded: true,
      sort: "alpha",
    },
  },
  globalTypes: {
    theme: {
      description: 'Toggle the Atlantis theme',
      toolbar: {
        icon: "sun",
        items: [{
          title: 'Light',
          value: 'light',
          icon: 'sun',
        }, {
          title: 'Dark',
          value: 'dark',
          icon: 'moon',
        }],
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => (
      <SBProvider theme={context.globals.theme}>
        <Story />
      </SBProvider>
    )
  ]
};

export default preview;

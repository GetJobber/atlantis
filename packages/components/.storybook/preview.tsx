import type { Preview } from '@storybook/react-vite'
import "../../design/dist/foundation.css";
import "../../design/dist/dark.mode.css";

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
};

export default preview;

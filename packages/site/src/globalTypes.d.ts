interface AtlantisWindow extends Window {
  env?: {
    VITE_STORYBOOK_URL?: string;
  };
}

declare let window: AtlantisWindow;

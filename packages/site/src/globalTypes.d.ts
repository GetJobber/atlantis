interface AtlantisWindow extends Window {
  env?: {
    VITE_STORYBOOK_URL?: string;
  };
}

declare let window: AtlantisWindow;

/** Toc injected by remark-extract-toc for MDX files with H2 headings */
declare module "*.mdx" {
  import type { ComponentType } from "react";

  const Component: ComponentType;
  export default Component;
  export const toc: Array<{ id: string; label: string }>;
}

declare module "*.stories.mdx" {
  import type { ComponentType } from "react";

  const Component: ComponentType;
  export default Component;
  export const toc: Array<{ id: string; label: string }>;
}

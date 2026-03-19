import { createContext, useContext } from "react";

export interface StorybookSourceContextValue {
  readonly mdxPath?: string;
}

export const StorybookSourceContext =
  createContext<StorybookSourceContextValue>({});

export function useStorybookSourceContext() {
  return useContext(StorybookSourceContext);
}

import { createContext, useContext } from "react";

export interface RegisteredComponents {
  backButton: boolean;
}

interface SideDrawerContextValue {
  readonly actionPortal?: HTMLElement | null;
  readonly titlePortal?: HTMLElement | null;
  readonly toolbarPortal?: HTMLElement | null;
  readonly backPortal?: HTMLElement | null;
  readonly footerPortal?: HTMLElement | null;
  readonly components: RegisteredComponents;
  readonly registerComponent: (key: keyof RegisteredComponents) => void;
  readonly unRegisterComponent: (key: keyof RegisteredComponents) => void;
}

const SideDrawerContext = createContext<SideDrawerContextValue>({
  components: {
    backButton: false,
  },
  registerComponent: () => undefined,
  unRegisterComponent: () => undefined,
});

function useSideDrawerContext(): SideDrawerContextValue {
  const context = useContext(SideDrawerContext);

  return context;
}

export { SideDrawerContext, useSideDrawerContext };

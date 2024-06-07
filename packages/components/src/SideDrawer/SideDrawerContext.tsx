import { createContext, useContext } from "react";
import { ButtonProps } from "../Button";

export interface RegisteredComponents {
  backButton?: Pick<ButtonProps, "onClick">;
}

interface SideDrawerContextValue {
  readonly actionPortal?: HTMLElement | null;
  readonly titlePortal?: HTMLElement | null;
  readonly toolbarPortal?: HTMLElement | null;
  readonly backPortal?: HTMLElement | null;
  readonly footerPortal?: HTMLElement | null;
  readonly components: RegisteredComponents;
  readonly registerComponent: (params: RegisteredComponents) => void;
  readonly unRegisterComponent: (key: keyof RegisteredComponents) => void;
}

const SideDrawerContext = createContext<SideDrawerContextValue>({
  components: {},
  registerComponent: () => undefined,
  unRegisterComponent: () => undefined,
});

function useSideDrawerContext(): SideDrawerContextValue {
  const context = useContext(SideDrawerContext);

  return context;
}

export { SideDrawerContext, useSideDrawerContext };

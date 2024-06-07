import { createContext, useContext } from "react";

interface SideDrawerContextValue {
  readonly actionPortal?: HTMLElement | null;
  readonly titlePortal?: HTMLElement | null;
  readonly toolbarPortal?: HTMLElement | null;
  readonly backPortal?: HTMLElement | null;
  readonly footerPortal?: HTMLElement | null;
}

const SideDrawerContext = createContext<SideDrawerContextValue>({});

function useSideDrawerContext(): SideDrawerContextValue {
  const context = useContext(SideDrawerContext);

  return context;
}

export { SideDrawerContext, useSideDrawerContext };

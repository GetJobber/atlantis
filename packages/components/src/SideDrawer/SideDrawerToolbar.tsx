import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useSideDrawerContext } from "./SideDrawerContext";

export function SideDrawerToolbar({ children }: PropsWithChildren) {
  const { toolbarPortal } = useSideDrawerContext();

  if (!toolbarPortal) return null;

  return createPortal(children, toolbarPortal);
}

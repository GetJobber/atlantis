import type { PropsWithChildren } from "react";
import React from "react";
import { createPortal } from "react-dom";
import { useSideDrawerContext } from "./SideDrawerContext";

export function SideDrawerActions({ children }: PropsWithChildren) {
  const { actionPortal } = useSideDrawerContext();

  if (!actionPortal) return null;

  return createPortal(<>{children}</>, actionPortal);
}

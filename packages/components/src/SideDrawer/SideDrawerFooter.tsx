import type { PropsWithChildren } from "react";
import React from "react";
import { createPortal } from "react-dom";
import { useSideDrawerContext } from "./SideDrawerContext";

export function SideDrawerFooter({ children }: PropsWithChildren) {
  const { footerPortal } = useSideDrawerContext();

  if (!footerPortal) return null;

  return createPortal(<>{children}</>, footerPortal);
}

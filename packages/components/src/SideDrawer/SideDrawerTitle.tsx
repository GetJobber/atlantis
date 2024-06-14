import React from "react";
import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { useSideDrawerContext } from "./SideDrawerContext";
import { Heading } from "../Heading";

export function SideDrawerTitle({ children }: Required<PropsWithChildren>) {
  const { titlePortal } = useSideDrawerContext();

  if (!titlePortal) return null;

  if (typeof children === "string") {
    return createPortal(<Heading level={2}>{children}</Heading>, titlePortal);
  }

  return createPortal(children, titlePortal);
}

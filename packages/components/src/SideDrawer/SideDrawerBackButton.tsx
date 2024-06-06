import React from "react";
import { createPortal } from "react-dom";
import { useSideDrawerContext } from "./SideDrawerContext";
import { Button, ButtonProps } from "../Button";

export function SideDrawerBackButton({
  onClick,
}: Pick<ButtonProps, "onClick">) {
  const { backPortal } = useSideDrawerContext();

  if (!backPortal) return null;

  return createPortal(
    <Button
      ariaLabel="Back"
      icon="longArrowLeft"
      variation="subtle"
      type="tertiary"
      onClick={onClick}
    />,
    backPortal,
  );
}

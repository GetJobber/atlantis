import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSideDrawerContext } from "./SideDrawerContext";
import type { ButtonProps } from "../Button";
import { Button } from "../Button";

export function SideDrawerBackButton({
  onClick,
}: Pick<ButtonProps, "onClick">) {
  const { backPortal, registerComponent, unRegisterComponent } =
    useSideDrawerContext();

  useEffect(() => {
    registerComponent("backButton");

    return () => {
      unRegisterComponent("backButton");
    };
  }, []);

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

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSideDrawerContext } from "./SideDrawerContext";
import { Button } from "../Button";

// Use a type that's specific to button elements since this will never be a link/anchor
interface ButtonOnlyProps {
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function SideDrawerBackButton({ onClick }: ButtonOnlyProps) {
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

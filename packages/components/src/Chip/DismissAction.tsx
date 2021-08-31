import React from "react";
import { DismissibleAction as DismissActionProps } from "./ChipProps";
import { ButtonDismiss } from "../ButtonDismiss";

export function DismissAction({
  ariaLabel,
  onRequestDismiss,
}: DismissActionProps) {
  return (
    <ButtonDismiss ariaLabel={ariaLabel} onClick={handleOnClick} size="small" />
  );

  function handleOnClick(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    onRequestDismiss(event);
  }
}

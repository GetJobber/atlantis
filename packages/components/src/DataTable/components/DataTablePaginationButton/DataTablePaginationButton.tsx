import React from "react";
import { Button } from "../../../Button";

export interface DataTablePaginationButtonProps {
  /**
   * The direction of the pagination button
   */
  readonly direction: "previous" | "next";

  /**
   * Callback function when the pagination button is clicked
   */
  readonly onClick?: () => void;

  /**
   * Whether the pagination button is disabled
   */
  readonly disabled?: boolean;

  /**
   * Function that returns the aria-label for the button. Required for accessibility.
   * Should return translated strings based on the direction parameter.
   */
  readonly ariaLabel: (direction: "previous" | "next") => string;
}

export function DataTablePaginationButton({
  direction,
  onClick,
  disabled = false,
  ariaLabel,
}: DataTablePaginationButtonProps) {
  const isNext = direction === "next";

  return (
    <Button
      label=""
      onClick={onClick}
      icon={isNext ? "arrowRight" : "arrowLeft"}
      type="secondary"
      variation="learning"
      disabled={disabled}
      ariaLabel={ariaLabel(direction)}
    />
  );
}

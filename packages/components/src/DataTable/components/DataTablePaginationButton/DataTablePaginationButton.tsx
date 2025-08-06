import React from "react";
import { Button } from "../../../Button";

export interface DataTablePaginationButtonProps {
  readonly direction: "previous" | "next";
  readonly onClick?: () => void;
  readonly disabled?: boolean;
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

import React from "react";
import { Button } from "../../../Button";

export interface DataTablePaginationButtonProps {
  readonly direction: "previous" | "next";
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}

export function DataTablePaginationButton({
  direction,
  onClick,
  disabled = false,
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
      ariaLabel={isNext ? "Next page" : "Previous page"}
    />
  );
}

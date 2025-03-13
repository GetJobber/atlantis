import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Button, ButtonProps } from "../Button";

// If you need to pass children use Button directly instead of this component
interface InputFileButtonProps
  extends Omit<
    ButtonProps,
    "submit" | "name" | "value" | "to" | "url" | "children"
  > {}

export function InputFileButton({
  label,
  size,
  fullWidth = false,
  ...buttonProps
}: InputFileButtonProps) {
  const { buttonLabel: contextLabel, size: contextSize } =
    useInputFileContentContext();

  return (
    <Button
      {...buttonProps}
      ariaLabel="Upload file"
      label={label || contextLabel}
      size={size ?? contextSize}
      type="secondary"
      fullWidth={fullWidth}
    />
  );
}

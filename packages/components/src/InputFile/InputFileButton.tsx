import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Button, ButtonProps } from "../Button";

// Extract the button-specific variant of ButtonProps (no url or to props)
type ButtonOnlyProps = ButtonProps & {
  readonly url?: never;
  readonly to?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
};

// If you need to pass children use Button directly instead of this component
interface InputFileButtonProps
  extends Omit<
    ButtonOnlyProps,
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
      label={label || contextLabel}
      size={size ?? contextSize}
      type="secondary"
      fullWidth={fullWidth}
    />
  );
}

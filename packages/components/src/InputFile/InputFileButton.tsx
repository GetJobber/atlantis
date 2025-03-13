import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Button, ButtonProps } from "../Button";

export function InputFileButton({
  label,
  size,
  fullWidth = false,
  ...buttonProps
}: Omit<ButtonProps, "submit" | "name" | "value" | "to" | "url">) {
  const context = useInputFileContentContext();
  const finalLabel = getDefaultLabel(
    label || context.buttonLabel,
    context.allowMultiple,
    context.fileType,
  );

  return (
    <Button
      {...buttonProps}
      ariaLabel="Upload file"
      label={finalLabel}
      size={size ?? context.size}
      type="secondary"
      fullWidth={fullWidth}
    />
  );
}

function getDefaultLabel(
  providedButtonLabel: string | undefined,
  multiple: boolean,
  fileType: string,
) {
  return (
    providedButtonLabel ||
    (multiple ? `Upload ${fileType}s` : `Upload ${fileType}`)
  );
}

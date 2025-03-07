import React from "react";
import { useInputFileContentContext } from "./InputFileContentContext";
import { Button } from "../Button";

export function InputFileButton({
  label,
  size,
  fullWidth,
}: {
  readonly label?: string;
  readonly size?: "small" | "base";
  readonly fullWidth: boolean;
}) {
  const context = useInputFileContentContext();
  const finalLabel = getLabel(
    label || context.buttonLabel,
    context.allowMultiple,
    context.fileType,
  );

  return (
    <Button
      label={finalLabel}
      size={size || context.size}
      type="secondary"
      fullWidth={fullWidth}
    />
  );
}

function getLabel(
  providedButtonLabel: string | undefined,
  multiple: boolean,
  fileType: string,
) {
  return (
    providedButtonLabel ||
    (multiple ? `Upload ${fileType}s` : `Upload ${fileType}`)
  );
}

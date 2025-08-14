import { createContext, useContext } from "react";
import type { ButtonSize } from "../Button";

export interface InputFileContentContextValue {
  readonly fileType: string;
  readonly allowMultiple: boolean;
  readonly description: string | undefined;
  readonly hintText: string;
  readonly buttonLabel: string;
  readonly size: ButtonSize;
}

const InputFileContentContext = createContext<InputFileContentContextValue>({
  fileType: "File",
  allowMultiple: false,
  description: undefined,
  hintText: getDefaultHintText("File", false),
  buttonLabel: getDefaultLabel(false, "File"),
  size: "base",
});

function useInputFileContentContext(): InputFileContentContextValue {
  const context = useContext(InputFileContentContext);
  const computedHintText =
    context.hintText ||
    getDefaultHintText(context.fileType, context.allowMultiple);
  const computedButtonLabel =
    context.buttonLabel ||
    getDefaultLabel(context.allowMultiple, context.fileType);

  return {
    ...context,
    hintText: computedHintText,
    buttonLabel: computedButtonLabel,
  };
}

export { InputFileContentContext, useInputFileContentContext };

function getDefaultLabel(multiple: boolean, fileType: string) {
  return multiple ? `Upload ${fileType}s` : `Upload ${fileType}`;
}

function getDefaultHintText(fileType: string, multiple: boolean) {
  const fileTypeDeterminer = fileType === "Image" ? "an" : "a";
  const hintText = multiple
    ? `Select or drag ${fileType.toLowerCase()}s here to upload`
    : `Select or drag ${fileTypeDeterminer} ${fileType.toLowerCase()} here to upload`;

  return hintText;
}

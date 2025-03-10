import { createContext, useContext } from "react";
import { ButtonSize } from "../Button";

export interface InputFileContentContextValue {
  readonly fileType: string;
  readonly allowMultiple: boolean;
  readonly description: string | undefined;
  readonly hintText: string | undefined;
  readonly buttonLabel: string | undefined;
  readonly size: ButtonSize;
}

const InputFileContentContext = createContext<InputFileContentContextValue>({
  fileType: "File",
  allowMultiple: false,
  description: undefined,
  hintText: undefined,
  buttonLabel: undefined,
  size: "base",
});

function useInputFileContentContext(): InputFileContentContextValue {
  const context = useContext(InputFileContentContext);

  return context;
}

export { InputFileContentContext, useInputFileContentContext };

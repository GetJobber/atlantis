import { createContext, useContext } from "react";

interface InputFileContentContextValue {
  readonly fileType: string;
  readonly allowMultiple: boolean;
  readonly description: string | undefined;
  readonly buttonLabel: string | undefined;
  readonly size: "small" | "base";
}

const InputFileContentContext = createContext<InputFileContentContextValue>({
  fileType: "File",
  allowMultiple: false,
  description: undefined,
  buttonLabel: undefined,
  size: "base",
});

function useInputFileContentContext(): InputFileContentContextValue {
  const context = useContext(InputFileContentContext);

  return context;
}

export { InputFileContentContext, useInputFileContentContext };

import type { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode } from "react";

export interface UseInputEmailFormFieldProps {
  readonly id: string;
  readonly name: string;
  readonly disabled?: boolean;
  readonly autofocus?: boolean;
  readonly error?: string;
  readonly inline?: boolean;
  readonly description?: ReactNode;
  readonly invalid?: boolean;
  readonly value?: string;
  readonly handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly handleBlur: (event?: FocusEvent<HTMLInputElement>) => void;
  readonly handleFocus: (event: FocusEvent<HTMLInputElement>) => void;
  readonly handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export interface UseInputEmailFormFieldReturn {
  readonly fieldProps: {
    readonly id: string;
    readonly name: string;
    readonly disabled?: boolean;
    readonly autofocus?: boolean;
    readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    readonly onBlur: (event?: FocusEvent<HTMLInputElement>) => void;
    readonly onFocus: (event: FocusEvent<HTMLInputElement>) => void;
    readonly onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    readonly value?: string;
    readonly "aria-describedby"?: string;
  };
  readonly descriptionIdentifier: string;
}

export function useInputEmailFormField({
  id,
  name,
  disabled,
  autofocus,
  description,
  inline,
  value,
  handleChange,
  handleBlur,
  handleFocus,
  handleKeyDown,
  error,
  ...rest
}: UseInputEmailFormFieldProps): UseInputEmailFormFieldReturn {
  const descriptionIdentifier = `descriptionUUID--${id}`;

  const fieldProps = {
    ...rest,
    id,
    name,
    disabled,
    autoFocus: autofocus,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    value,
    invalid: error || rest.invalid ? "true" : undefined,
    ...(description &&
      !inline && { "aria-describedby": descriptionIdentifier }),
  };

  return { fieldProps, descriptionIdentifier };
}

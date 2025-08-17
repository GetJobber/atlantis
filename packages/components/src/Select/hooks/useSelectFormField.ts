import type { ChangeEvent, ReactNode } from "react";

export interface UseSelectFormFieldProps {
  readonly id: string;
  readonly name: string;
  readonly disabled?: boolean;
  readonly autofocus?: boolean;
  readonly description?: ReactNode;
  readonly inline?: boolean;
  readonly error?: string;
  readonly invalid?: boolean;
  readonly value?: string | number;
  readonly handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  readonly handleBlur: () => void;
  readonly handleFocus: () => void;
}

export interface UseSelectFormFieldReturn {
  readonly fieldProps: {
    readonly id: string;
    readonly name: string;
    readonly disabled?: boolean;
    readonly autoFocus?: boolean;
    readonly onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    readonly onBlur: () => void;
    readonly onFocus: () => void;
    readonly value?: string | number;
    readonly "aria-describedby"?: string;
  };
  readonly descriptionIdentifier: string;
}

/**
 * Hook for managing the props of a Select component.
 * Extracted from FormField's useAtlantisFormField.
 */
export function useSelectFormField({
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
}: UseSelectFormFieldProps): UseSelectFormFieldReturn {
  const descriptionIdentifier = `descriptionUUID--${id}`;

  const fieldProps = {
    id,
    name,
    disabled,
    autoFocus: autofocus,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    value,
    ...(description &&
      !inline && { "aria-describedby": descriptionIdentifier }),
  };

  return { fieldProps, descriptionIdentifier };
}

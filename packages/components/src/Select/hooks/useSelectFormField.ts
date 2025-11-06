import type { ChangeEvent, FocusEvent, ReactNode } from "react";

export interface UseSelectFormFieldProps {
  readonly id: string;
  readonly name: string;
  readonly disabled?: boolean;
  readonly autofocus?: boolean;
  readonly autoFocus?: boolean;
  readonly description?: ReactNode;
  readonly inline?: boolean;
  readonly error?: string;
  readonly invalid?: boolean;
  readonly value?: string | number;
  readonly handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  readonly handleBlur: (event: FocusEvent<HTMLSelectElement>) => void;
  readonly handleFocus: (event: FocusEvent<HTMLSelectElement>) => void;
  readonly "aria-label"?: string;
  readonly "aria-describedby"?: string;
  readonly "aria-invalid"?: boolean | "true" | "false";
  readonly "aria-required"?: boolean;
}

export interface UseSelectFormFieldReturn {
  readonly fieldProps: {
    readonly id: string;
    readonly name: string;
    readonly disabled?: boolean;
    readonly autoFocus?: boolean;
    readonly onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    readonly onBlur: (event: FocusEvent<HTMLSelectElement>) => void;
    readonly onFocus: (event: FocusEvent<HTMLSelectElement>) => void;
    readonly value?: string | number;
    readonly "aria-label"?: string;
    readonly "aria-describedby"?: string;
    readonly "aria-invalid"?: boolean | "true" | "false";
    readonly "aria-required"?: boolean;
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
  autoFocus = autofocus,
  description,
  inline,
  value,
  handleChange,
  handleBlur,
  handleFocus,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
}: UseSelectFormFieldProps): UseSelectFormFieldReturn {
  const descriptionIdentifier = `descriptionUUID--${id}`;

  const fieldProps = {
    id,
    name,
    disabled,
    autoFocus,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    value,
    "aria-label": ariaLabel,
    "aria-describedby":
      ariaDescribedBy ||
      (description && !inline ? descriptionIdentifier : undefined),
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
  };

  return { fieldProps, descriptionIdentifier };
}

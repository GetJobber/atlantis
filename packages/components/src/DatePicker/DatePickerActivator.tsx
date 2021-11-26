import React, {
  ChangeEvent,
  ReactElement,
  Ref,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { Button } from "../Button";

export interface DatePickerActivatorProps
  extends Pick<
    ReactDatePickerProps,
    | "value"
    | "id"
    | "ariaDescribedBy"
    | "ariaInvalid"
    | "ariaLabelledBy"
    | "ariaRequired"
  > {
  readonly activator?:
    | ReactElement
    | ((props: DatePickerActivatorProps) => ReactElement);
  readonly fullWidth?: boolean;
  onBlur?(): void;
  onChange?(
    event?: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;
  onClick?(): void;
  onFocus?(): void;
  onKeyDown?(): void;
}

export const DatePickerActivator = forwardRef(InternalActivator);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InternalActivator(
  props: DatePickerActivatorProps,
  ref: Ref<HTMLElement>,
) {
  const { activator } = props;
  if (activator) {
    return isValidElement(activator)
      ? cloneElement(activator, { ...props, ref })
      : activator(props);
  } else {
    return (
      <Button
        variation="work"
        type="tertiary"
        icon="calendar"
        ariaLabel="Open Datepicker"
        {...props}
      />
    );
  }
}

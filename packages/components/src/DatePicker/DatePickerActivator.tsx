import React, {
  ChangeEvent,
  ReactElement,
  Ref,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";
import { ReactDatePickerProps } from "react-datepicker";
import omit from "lodash/omit";
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

function InternalActivator(
  props: DatePickerActivatorProps,
  ref: Ref<HTMLElement>,
) {
  const { activator, fullWidth } = props;
  const newActivatorProps = omit(props, ["activator", "fullWidth"]);

  if (activator) {
    if (isValidElement(activator)) {
      const isAComponent = typeof activator.type === "function";

      return cloneElement(activator, {
        ...newActivatorProps,
        ...(isAComponent && { fullWidth: fullWidth }),
        // @ts-expect-error - Issue with react types not including `ref` in
        // cloneElement. https://github.com/DefinitelyTyped/DefinitelyTyped/issues/40888
        ref,
      });
    } else {
      // @ts-expect-error this is mistyped elsewhere as ReactElement.
      return activator(props);
    }
  } else {
    return (
      // @ts-expect-error - we need to desctructure the newActivatorProps with more care to XOR prop types.
      <Button
        variation="work"
        type="tertiary"
        icon="calendar"
        ariaLabel="Open Datepicker"
        fullWidth={fullWidth}
        {...newActivatorProps}
      />
    );
  }
}

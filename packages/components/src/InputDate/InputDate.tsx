import omit from "lodash/omit";
import React, { useRef, useState } from "react";
import {
  CommonFormFieldProps,
  FieldActionsRef,
  FormField,
  FormFieldProps,
  Suffix,
} from "../FormField";
import { DatePicker } from "../DatePicker";

interface InputDateProps
  extends Omit<CommonFormFieldProps, "clearable">,
    Pick<
      FormFieldProps,
      | "readonly"
      | "disabled"
      | "onEnter"
      | "onFocus"
      | "inputRef"
      | "validations"
      | "placeholder"
      | "onChange"
      | "onBlur"
    > {
  /**
   * A Date object value
   * (e.g., `new Date("11/11/2011")`)
   * */
  readonly value?: Date;
  onChange(newValue: Date): void;
  /**
   * The maximum selectable date.
   */
  readonly maxDate?: Date;

  /**
   * The minimum selectable date.
   */
  readonly minDate?: Date;

  /**
   * Whether to show the calendar icon
   * @default true
   */
  readonly showIcon?: boolean;

  /**
   * Text to display instead of a date value
   */
  readonly emptyValuePlaceholder?: string;
}

export function InputDate(inputProps: InputDateProps) {
  const formFieldActionsRef = useRef<FieldActionsRef>(null);

  return (
    <DatePicker
      selected={inputProps.value}
      onChange={inputProps.onChange}
      disabled={inputProps.disabled}
      readonly={inputProps.readonly}
      fullWidth={!inputProps.inline}
      minDate={inputProps.minDate}
      maxDate={inputProps.maxDate}
      smartAutofocus={false}
      activator={activatorProps => {
        const { onChange, onClick, value } = activatorProps;
        const newActivatorProps = omit(activatorProps, ["activator"]);
        const [showEmptyPlaceholder, setShowEmptyPlaceholder] = useState(
          !value,
        );
        const suffix =
          inputProps.showIcon !== false
            ? ({
                icon: "calendar",
                ariaLabel: "Show calendar",
                onClick: onClick && onClick,
              } as Suffix)
            : {};

        // Set form field to formatted date string immediately, to avoid validations
        //  triggering incorrectly when it blurs (to handle the datepicker UI click)
        value && formFieldActionsRef.current?.setValue(value);

        return (
          // We prevent the picker from opening on focus for keyboard navigation, so to maintain a good UX for mouse users we want to open the picker on click
          <div onClick={onClick}>
            <FormField
              {...newActivatorProps}
              {...inputProps}
              value={
                showEmptyPlaceholder ? inputProps.emptyValuePlaceholder : value
              }
              placeholder={inputProps.placeholder}
              onChange={(_, event) => {
                onChange && onChange(event);
                setShowEmptyPlaceholder(false);
              }}
              onBlur={() => {
                inputProps.onBlur && inputProps.onBlur();
                activatorProps.onBlur && activatorProps.onBlur();
                setShowEmptyPlaceholder(!value);
              }}
              onFocus={() => {
                inputProps.onFocus && inputProps.onFocus();
                activatorProps.onFocus && activatorProps.onFocus();
              }}
              onKeyUp={event => {
                if (
                  inputProps.showIcon === false &&
                  event.key === "ArrowDown"
                ) {
                  activatorProps.onClick?.();
                }
              }}
              actionsRef={formFieldActionsRef}
              suffix={suffix}
              emptyValuePlaceholder={inputProps.emptyValuePlaceholder}
            />
          </div>
        );
      }}
    />
  );
}

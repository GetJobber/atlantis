import omit from "lodash/omit";
import React, { useEffect, useRef, useState } from "react";
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
  readonly emptyValueLabel?: string;
}

export function InputDate(inputProps: InputDateProps) {
  const formFieldActionsRef = useRef<FieldActionsRef>(null);
  console.log("inputProps", inputProps);

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
        const [isFocused, setIsFocused] = useState(false);
        const suffix =
          inputProps.showIcon !== false
            ? ({
                icon: "calendar",
                ariaLabel: "Show calendar",
                onClick: onClick && onClick,
              } as Suffix)
            : undefined;

        // Set form field to formatted date string immediately, to avoid validations
        //  triggering incorrectly when it blurs (to handle the datepicker UI click)
        useEffect(() => {
          value && formFieldActionsRef.current?.setValue(value);
        }, [value]);
        const showEmptyValueLabel = !value && !isFocused;

        return (
          // We prevent the picker from opening on focus for keyboard navigation, so to maintain a good UX for mouse users we want to open the picker on click
          <div onClick={onClick}>
            <FormField
              {...newActivatorProps}
              {...inputProps}
              value={
                showEmptyValueLabel ? inputProps.emptyValueLabel || "" : value
              }
              placeholder={inputProps.placeholder}
              onChange={(_, event) => {
                onChange && onChange(event);
              }}
              onBlur={() => {
                inputProps.onBlur && inputProps.onBlur();
                activatorProps.onBlur && activatorProps.onBlur();
                setIsFocused(false);
              }}
              onFocus={() => {
                inputProps.onFocus && inputProps.onFocus();
                activatorProps.onFocus && activatorProps.onFocus();
                setIsFocused(true);
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
            />
          </div>
        );
      }}
    />
  );
}

import omit from "lodash/omit";
import React, { useRef } from "react";
import {
  CommonFormFieldProps,
  FieldActionsRef,
  FormField,
  FormFieldProps,
  Suffix,
} from "../FormField";
import { DatePicker } from "../DatePicker";

interface InputDateProps
  extends CommonFormFieldProps,
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

        const suffix = {
          icon: "calendar",
          ...(onClick && {
            onClick: onClick,
            ariaLabel: "Show calendar",
          }),
        } as Suffix;

        // Set form field to formatted date string immediately, to avoid validations
        //  triggering incorrectly when it blurs (to handle the datepicker UI click)
        value && formFieldActionsRef.current?.setValue(value);

        return (
          <div onClick={onClick}>
            <FormField
              {...newActivatorProps}
              {...inputProps}
              value={value}
              onChange={(_, event) => onChange && onChange(event)}
              onBlur={() => {
                inputProps.onBlur && inputProps.onBlur();
                activatorProps.onBlur && activatorProps.onBlur();
              }}
              onFocus={() => {
                inputProps.onFocus && inputProps.onFocus();
                activatorProps.onFocus && activatorProps.onFocus();
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

import { omit } from "lodash";
import React from "react";
import { CommonFormFieldProps, FormField, FormFieldProps } from "../FormField";
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
  value?: Date;
  onChange(newValue: Date): void;
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

export function InputDate(inputProps: InputDateProps) {
  return (
    <DatePicker
      selected={inputProps.value}
      onChange={inputProps.onChange}
      disabled={inputProps.disabled}
      fullWidth={!inputProps.inline}
      activator={activatorProps => {
        const { onChange, value } = activatorProps;
        const newActivatorProps = omit(activatorProps, ["activator"]);

        return (
          <FormField
            {...newActivatorProps}
            {...inputProps}
            value={value}
            onChange={(_, event) => onChange && onChange(event)}
            onBlur={() => {
              inputProps.onBlur?.();
              activatorProps.onBlur?.();
            }}
            onFocus={() => {
              inputProps.onFocus?.();
              activatorProps.onFocus?.();
            }}
          />
        );
      }}
    />
  );
}

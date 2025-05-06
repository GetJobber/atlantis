import omit from "lodash/omit";
import React, { useEffect, useRef, useState } from "react";
import { InputDateProps } from "./InputDate.types";
import { FieldActionsRef, FormField, Suffix } from "../FormField";
import { DatePicker } from "../DatePicker";

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
        // MAYBE NEED TO re-setValue IN THIS CASE? Because `value` didn't change if the owner skipped the onChange event
        useEffect(() => {
          value && formFieldActionsRef.current?.setValue(value);
          console.log(`🔥 SET VALUE`, value);
        }, [value]);
        const showEmptyValueLabel = !value && !isFocused;

        console.log(`🔥 CURR VALUE`, value);

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
                console.log(`🔥 FormField onChange`, event);
              }}
              onBlur={() => {
                inputProps.onBlur && inputProps.onBlur();
                activatorProps.onBlur && activatorProps.onBlur();
                setIsFocused(false);
                console.log(`🔥 BLURRR`);
              }}
              onFocus={() => {
                inputProps.onFocus && inputProps.onFocus();
                activatorProps.onFocus && activatorProps.onFocus();
                setIsFocused(true);
                console.log(`🔥 FOCUS`);
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

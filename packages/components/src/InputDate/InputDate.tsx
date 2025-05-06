import omit from "lodash/omit";
import React, { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import { InputDateProps } from "./InputDate.types";
import { FieldActionsRef, FormField, Suffix } from "../FormField";
import { DatePicker } from "../DatePicker";
import { useAtlantisContext } from "../AtlantisContext";

export function InputDate(inputProps: InputDateProps) {
  const formFieldActionsRef = useRef<FieldActionsRef>(null);
  const { dateFormat } = useAtlantisContext();

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

                /**
                 * This is an experimental workaround to solve a specific UX problem we have under certain conditions.
                 * When you click to focus InputDate, ReactDatePicker becomes visible. If you delete the current date and blur
                 * the input field by clicking away, ReactDatePicker will automatically set the date to whatever date was
                 * currently selected.
                 *
                 * The above works great and is the expected user experience. ReactDatePicker fills in the empty value for us.
                 *
                 * However, there's a specific scenario where ReactDatePicker isn't visible: when you tab into the input date.
                 * When you tab into it, clear the value, and tab away to blur, ReactDatePicker doesn't automatically fill in
                 * the empty value because it wasn't visible/active.
                 *
                 * To solve this, we need to handle the blur event here and check if the value is empty or invalid. If it is,
                 * we have to call onChange with the original input value which informs ReactDatePicker that is the current value.
                 */
                if (inputProps.restoreLastValueOnBlur) {
                  if ((!value || !isValid(value)) && inputProps.value) {
                    onChange?.({
                      // @ts-expect-error -- This is a hack to sync the value back to ReactDatePicker
                      target: {
                        value: format(inputProps.value, dateFormat),
                      },
                    });
                  }
                }
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

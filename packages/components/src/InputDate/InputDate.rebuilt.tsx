import React, { forwardRef } from "react";
import { useInputDateActivatorActions } from "./useInputDateActivatorActions";
import { InputDateRebuiltProps } from "./InputDate.types";
import { Suffix } from "../FormField";
import { DatePicker } from "../DatePicker";
import { DatePickerActivatorProps } from "../DatePicker/DatePickerActivator";
import { InputText } from "../InputText";

export const InputDateRebuilt = forwardRef(function InputDateInternal(
  props: InputDateRebuiltProps,
  inputRefs: React.Ref<HTMLInputElement>,
) {
  const { onChange } = props;

  return (
    <DatePicker
      selected={props.value}
      onChange={newValue => {
        onChange(newValue);
      }}
      disabled={props.disabled}
      readonly={props.readOnly}
      fullWidth={!props.inline}
      minDate={props.minDate}
      maxDate={props.maxDate}
      smartAutofocus={false}
      activator={InputDateActivator}
    />
  );

  function InputDateActivator(activatorProps: DatePickerActivatorProps) {
    const { onClick, value } = activatorProps;

    const { handleChange, handleFocus, handleBlur, isFocused } =
      useInputDateActivatorActions({
        onChange: activatorProps.onChange,
        onFocus: event => {
          activatorProps.onFocus?.();
          props.onFocus?.(event);
        },
        onBlur: event => {
          props.onBlur?.(event);
        },
      });
    const suffix =
      props.showIcon !== false
        ? ({
            icon: "calendar",
            ariaLabel: "Show calendar",
            onClick: onClick && onClick,
          } as Suffix)
        : undefined;

    // Set form field to formatted date string immediately, to avoid validations
    //  triggering incorrectly when it blurs (to handle the datepicker UI click)

    const showEmptyValueLabel = !value && !isFocused;

    return (
      // We prevent the picker from opening on focus for keyboard navigation, so to maintain a good UX for mouse users we want to open the picker on click
      <div onClick={onClick}>
        <InputText
          {...props}
          version={2}
          value={
            showEmptyValueLabel ? props.emptyValueLabel || "" : value || ""
          }
          ref={inputRefs}
          suffix={suffix}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={event => {
            if (props.showIcon === false && event.key === "ArrowDown") {
              activatorProps.onClick?.();
            }
            props.onKeyDown?.(event);
          }}
          onChange={handleChange}
        />
      </div>
    );
  }
});

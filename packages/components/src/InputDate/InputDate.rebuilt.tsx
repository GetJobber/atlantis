import React, { forwardRef } from "react";
import { useInputDateActivatorActions } from "./useInputDateActivatorActions";
import type { InputDateRebuiltProps } from "./InputDate.types";
import type { Suffix } from "../FormField";
import { DatePicker } from "../DatePicker";
import type { DatePickerActivatorProps } from "../DatePicker/DatePickerActivator";
import { InputText } from "../InputText";

export const InputDateRebuilt = forwardRef<
  HTMLInputElement,
  InputDateRebuiltProps
>((props, forwardedRef) => {
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
          props.onFocus?.(event);
          activatorProps.onFocus?.();
        },
        onBlur: event => {
          props.onBlur?.(event);
          activatorProps.onBlur?.();
        },
      });

    const suffix =
      props.showIcon !== false
        ? ({
            icon: "calendar",
            ariaLabel: "Show calendar",
            onClick: !props.disabled && onClick && onClick,
          } as Suffix)
        : undefined;

    const showEmptyValueLabel = !value && !isFocused;

    return (
      // We prevent the picker from opening on focus for keyboard navigation, so to maintain a good UX for mouse users we want to open the picker on click
      <div onClick={onClick}>
        <InputText
          aria-describedby={activatorProps.ariaDescribedBy}
          aria-labelledby={activatorProps.ariaLabelledBy}
          aria-required={activatorProps.ariaRequired === "true" ? true : false}
          autoFocus={props.autoFocus}
          id={activatorProps.id}
          disabled={props.disabled}
          error={props.error}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          size={props.size}
          inline={props.inline}
          align={props.align}
          description={props.description}
          invalid={props.invalid}
          name={props.name}
          version={2}
          value={
            showEmptyValueLabel ? props.emptyValueLabel || "" : value || ""
          }
          ref={forwardedRef}
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

InputDateRebuilt.displayName = "InputDateRebuilt";

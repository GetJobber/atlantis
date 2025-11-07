import React, { forwardRef, useState } from "react";
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
    const [isFocused, setIsFocused] = useState(false);

    function handleChange(
      _newValue: string,
      event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      activatorProps.onChange?.(event);
    }

    function handleFocus(
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      props.onFocus?.(event as React.FocusEvent<HTMLInputElement>);
      activatorProps.onFocus?.();
      setIsFocused(true);
    }

    function handleBlur(
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      props.onBlur?.(event as React.FocusEvent<HTMLInputElement>);
      activatorProps.onBlur?.();
      setIsFocused(false);
    }

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
          aria-invalid={activatorProps.ariaInvalid === "true" ? true : false}
          aria-labelledby={activatorProps.ariaLabelledBy}
          aria-required={activatorProps.ariaRequired === "true" ? true : false}
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

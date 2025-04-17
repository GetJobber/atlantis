import React, { forwardRef } from "react";
import omit from "lodash/omit";
import { useInputDateActivatorActions } from "./useInputDateActivatorActions";
import { InputDateRebuiltProps } from "./InputDate.types";
import { DatePicker } from "../DatePicker";
import { DatePickerActivatorProps } from "../DatePicker/DatePickerActivator";
import { InputText } from "../InputText";
import { Suffix } from "../FormField";

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
    const newActivatorProps = omit(activatorProps, ["activator", "fullWidth"]);

    const { handleChange, handleFocus, handleBlur, isFocused } =
      useInputDateActivatorActions({
        onChange: newActivatorProps.onChange,
        onFocus: event => {
          props.onFocus?.(event);
          newActivatorProps.onFocus?.();
        },
        onBlur: event => {
          props.onBlur?.(event);
          newActivatorProps.onBlur?.();
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

    const showEmptyValueLabel = !value && !isFocused;

    return (
      // We prevent the picker from opening on focus for keyboard navigation, so to maintain a good UX for mouse users we want to open the picker on click
      <div onClick={onClick}>
        <InputText
          {...newActivatorProps}
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

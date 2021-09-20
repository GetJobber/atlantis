import React, { Ref, createRef, forwardRef, useImperativeHandle } from "react";
import { CommonFormFieldProps, FormField, FormFieldProps } from "../FormField";

interface InputNumberProps
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      | "maxLength"
      | "autocomplete"
      | "max"
      | "min"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
      | "readonly"
    > {
  value?: number;
}

export interface InputNumberRef {
  blur(): void;
  focus(): void;
}

function InputNumberInternal(
  props: InputNumberProps,
  ref: Ref<InputNumberRef>,
) {
  const inputRef = createRef<HTMLTextAreaElement | HTMLInputElement>();

  useImperativeHandle(ref, () => ({
    blur: () => {
      const input = inputRef.current;
      if (input) {
        input.blur();
      }
    },
    focus: () => {
      const input = inputRef.current;
      if (input) {
        input.focus();
      }
    },
  }));

  return (
    <FormField
      {...props}
      type="number"
      inputRef={inputRef}
      onChange={handleChange}
      validations={{
        ...props.validations,
        validate: getOverLimitMessage,
      }}
    />
  );

  function handleChange(newValue: number) {
    props.onChange && props.onChange(newValue);
  }

  function getOverLimitMessage(
    value: InputNumberProps["value"],
  ): string | true {
    const isOverMax = props.max != undefined && value && value > props.max;
    const isUnderMin = props.min != undefined && value && value < props.min;

    if (isOverMax || isUnderMin || (value && value.toString() === "")) {
      if (props.min != undefined && props.max === undefined) {
        return `Enter a number that is greater than or equal to ${props.min}`;
      } else if (props.max != undefined && props.min === undefined) {
        return `Enter a number that is less than or equal to ${props.max}`;
      } else if (props.min != undefined && props.max != undefined) {
        return `Enter a number between ${props.min} and ${props.max}`;
      }
    }

    return true;
  }
}

export const InputNumber = forwardRef(InputNumberInternal);
